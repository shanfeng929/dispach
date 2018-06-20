package com.sunyard.dispatch.job_bak;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.apache.log4j.Logger;
import org.dom4j.DocumentException;

import ch.ethz.ssh2.Connection;
import ch.ethz.ssh2.Session;

import com.sunyard.dispatch.common.Const;
import com.sunyard.dispatch.common.Table;
import com.sunyard.dispatch.common.TerminatedJobException;
import com.sunyard.dispatch.common.ThreadPool;
import com.sunyard.dispatch.common.Tool;

public class JobTask extends Base implements Runnable {
	/**记录运行的线程数量*/
	static AtomicInteger threadNum = new AtomicInteger(1);
	protected Logger LOG = Logger.getLogger(getClass());
	/**对应TASKNAME表的一个任务*/
	public Task task = null;
	/**任务脚本执行出错时记录*/
	String errMsg = null;
	/**任务脚本正常输出的信息*/
	String stdMsg = null;
	/**任务脚本正常运行的状态*/
	String retCode ="1";
	public JobTask(Task task) {
		this.task =task;
	}

	//子流程关心进入 和 退出
	@Override
	public void run() {//jumpErr > xor   taskNum==1  
		LOG.debug("正在运行的TASK数："+threadNum.getAndIncrement());
		try {
			super.openConnection();
			beforeAction();
			conn.setAutoCommit(false);
			taskStart();
			conn.commit();
		} catch (TerminatedJobException e) {
			LOG.warn("流程["+task.getJobDefID()+"]终止，下个任务不继续执行");
			closeAll();
			return;
		} catch (Exception e) {
			Tool.rollBack(conn);
			LOG.error("", e);
		}finally{
			//在这里应该关闭DB连接，因为在执行SHELL期间会一直占用
			super.closeAll();
		}
		

		try {
			doAction();
		} catch (TerminatedJobException e) {
			LOG.warn("流程["+task.getJobDefID()+"]终止，下个任务 不继续执行");
			closeAll();
			return;
		}
		// 三次
		
			
		
		try {
			conn.setAutoCommit(true);//下面的都是查询，不用开启事务
			HashSet<String> nextDefIDs = findNextNodeDefIDs(task.getJobDefID(), task.getTaskDefID());
			int taskNum = nextDefIDs.size();
			LOG.info("流程["+task.getJobDefID()+"]下个要处理的节点："+Arrays.toString(nextDefIDs.toArray(new String[]{})));
			if(taskNum ==0){
				//去查是否已经完成流程了,更新endtime
				//再看create_job是否有的，若有的话，再看它parentJOB所有的TASK都结束了
				long pid = getParentJobID(task.getJobID());
				if(pid ==0){//说明是父流程，可能有子流程的，应该不能填end_time todo
					completeJOB(task.getJobID(), task.getJobDefID());
				}else{
					completeJOB(task.getJobID(), task.getJobDefID()); //说明子流程结束
					
					//要开始父JOB的下个节点
					String defID = getJobDefID(pid);  
					HashSet<String> nextIDs = findNextNodeDefIDs(defID, task.getJobDefID());//这里的task.getJobDefID()是父流程节点的taskDefID
					if(nextIDs.size()==0){//说明子流程结束，同时也结束父流程的 todo
						completeJOB(pid, defID);
					}else{//子流节点后面的是分裂节点
						for(String taskDefID : nextIDs){
							nextNodeTask(taskDefID, pid);
						}
					}
					
				}
			}else{
				//taskNum==1时，不关心xor ，要关心join_Num>1
				//taskNum > 1时，关心xor, 不关心joinNum
				for(String taskDefID : nextDefIDs){
					nextNodeTask(taskDefID, 0);
				}
			}
		} catch (Exception e) {
			LOG.error("", e);
		}finally{
			super.closeAll();
		}
		threadNum.getAndDecrement();
	}
	
	private static final ConcurrentHashMap<Long, AtomicInteger> taskJoinMap = new ConcurrentHashMap<Long, AtomicInteger>();//key是jobID,value是JoinNum  
	static final Object lock = new Object();
	private void nextNodeTask(String nextTaskDefID, long pid) throws SQLException, DocumentException {
		long jobID = task.getJobID();
		if(pid !=0){
			jobID = pid;
		}
		if(nextTaskDefID.startsWith("flow")){ //任务节点是子流程
			LOG.info("启动流程["+task.getJobDefID()+"]的子流程["+nextTaskDefID+"]");
			int joinNum = super.getNodeJoinNum(task.getJobDefID(), nextTaskDefID);
			if(joinNum >1 ){//若它做为汇聚节点时
				//让前面所有已完成的节点任务线程先停下来，并停止线程，直到最后一个
				taskJoinMap.putIfAbsent(jobID, new AtomicInteger(1));
				int currNum =taskJoinMap.get(jobID).getAndIncrement();
				if(currNum < joinNum){
					LOG.info("结束当前这个线程,汇聚节点(子流程)["+nextTaskDefID+"] 先不执行");
					return;  
				}else{ //当currNum =joinNum时
					taskJoinMap.remove(jobID);
					LOG.info("执行汇聚节点(子流程)-->"+nextTaskDefID);
					while(!isJoinPreTasksDone(jobID,task.getJobDefID(),nextTaskDefID)){ // 聚合节点前的任务都执行完成
						try {
							LOG.info("等待...汇聚节点(子流程)["+nextTaskDefID+"]前的任务还没完成！");
							Thread.sleep(Scanperiod);
							task = super.getTask(task.getTaskDefID());
						} catch (InterruptedException e) {}
					}
					//new Job().startJob(jobID, nextTaskDefID);
					startJOB(jobID, nextTaskDefID);
				}
			}else{
				//new Job().startJob(jobID, nextTaskDefID);
				startJOB(jobID, nextTaskDefID);
			}
		}else{
			Task tsk = super.getTask(nextTaskDefID);
			tsk.setJobID(jobID);
			int joinNum = tsk.getDefJoinNum();
			if(joinNum >1 ){//让前面所有已完成的节点任务线程先停下来，并停止线程，直到最后一个
				taskJoinMap.putIfAbsent(jobID, new AtomicInteger(1));
				int currNum =taskJoinMap.get(jobID).getAndIncrement();
				if(currNum < joinNum){
					LOG.info("结束当前这个线程,汇聚节点"+tsk+" 先不执行");
					return;  
				}else{ //当currNum =joinNum时
					taskJoinMap.remove(jobID);
					LOG.info("执行汇聚节点-->"+tsk);
					
					while(!isJoinPreTasksDone(jobID, tsk.getJobDefID(),tsk.getTaskDefID())){ // 聚合节点前的任务都执行完成
						try {
							LOG.info("等待...汇聚节点["+tsk+"]前的任务还没完成！");
							Thread.sleep(Scanperiod);
							task = super.getTask(task.getTaskDefID());
						} catch (InterruptedException e) {}
					}
					ThreadPool.execute(new JobTask(tsk));
				}
			}else{
				String xor = tsk.getXorCondition();
				if(isPass(xor)){ 
					ThreadPool.execute(new JobTask(tsk));//tsk中的taskID 还不存在
				}else{
					LOG.error(task+"后的任务"+tsk+"不继续执行！");
				}

			}
		}
	}

	private boolean isJoinPreTasksDone(long jobID, String jobDefID, String taskDefID) throws SQLException, DocumentException {
		HashSet<String> set = super.findPreNodes(jobDefID, taskDefID);
		if("2".equals(taskDefID)){
			LOG.info("查看结束节点前所有任务["+Arrays.toString(set.toArray(new String[]{}))+"]是否都已经完成(若没完成的话，主流程不能结束)");
		}else
			LOG.info("查看该汇聚节点"+taskDefID+"前的所有前置节点["+Arrays.toString(set.toArray(new String[]{}))+"]是否都已经完成");
		for(String tskdefID : set){
			if(!isDone(jobID, tskdefID)){
				return false;
			}
		}
		return true;
	}
	boolean isDone(long jobID, String tskdefID) throws SQLException{
		String sql =null;
		Object id = null;
		if(tskdefID.startsWith("flow")){
			sql ="SELECT 1 FROM "+Table.JOB_NAME +" WHERE PARENT_JOB_ID=? AND STATE=? AND JOB_DEF_ID=?";
			id = super.queryForObject(sql, new Object[]{jobID,Const.JOB_STATE_COMPLETE, tskdefID});
		}else{
			sql ="SELECT 1 FROM "+Table.TASK_NAME+" WHERE JOB_ID=? AND TASK_DEF_ID=? AND STATE=?";
			id = super.queryForObject(sql, new Object[]{jobID, tskdefID, Const.TASK_STATE_OK});
		}
		if(id ==null){
			return false;
		}else{
			return true;
		}
	}

	private void beforeAction() throws SQLException, TerminatedJobException {
		int i=0;
		while(!task.isActivated()){
			try {
				String msg = task+"还没激活！等待手工激活";
				if(i++ ==3){
					String sql = "UPDATE "+Table.JOB_LOG_NAME+" SET EXEC_RESULT=? WHERE ID=?";
					Object[] elements = new Object[]{msg, task.getJobID()};
					update(sql, elements);
					sql = "UPDATE "+Table.JOB_NAME+" SET EXEC_RESULT=? WHERE ID=?";
					elements = new Object[]{msg, task.getJobDefID()};
					update(sql, elements);
				}
				LOG.warn(msg);
				Thread.sleep(Scanperiod);
				task = super.getTask(task.getTaskDefID());
			} catch (InterruptedException e) {}
			
		}
		//查看该流程 任务 是否被暂停，周期查看
		//若是终止 流程的状态，停止该线程
		makeSureTaskGoingon("");
		
	}
	void makeSureTaskGoingon(String msg) throws SQLException, TerminatedJobException {
		String sql = "SELECT STATE FROM "+Table.JOB_NAME+" WHERE JOB_ID=?";
		Object[] elements = new Object[]{task.getJobID()};
		Object state = queryForObject(sql, elements);
		if(Const.JOB_STATE_TERMINATE.equals(state)){
			throw new TerminatedJobException();
		}
		if(Const.JOB_STATE_SUSPEND.equals(state)){// || Const.JOB_STATE_ERROR.equals(state)
			
			closeAll();
			
			try {
				LOG.warn("流程["+task.getJobDefID()+"]因为"+msg+" 已经暂停，等待手工恢复流程");
				Thread.sleep(Scanperiod);
			} catch (InterruptedException e) {}
			
			openConnection();
			state = queryForObject(sql, elements);
			if(Const.JOB_STATE_SUSPEND.equals(state)){
				makeSureTaskGoingon(msg);
			}else if(Const.JOB_STATE_TERMINATE.equals(state)){
				throw new TerminatedJobException();
			}
		}
	}

	private void doAction() throws TerminatedJobException {
		String host=task.shellServer.getHost(), user = task.shellServer.getUser(), pwd =task.shellServer.getPwd();
		Connection connection = new Connection(host);
		Session session = null;
		try {
			connection.connect();
			boolean isAuthenticated = connection.authenticateWithPassword(user, pwd);
			if(!isAuthenticated){
				this.errMsg ="用户["+user+"]密码["+pwd+"]不能登录"+host;
				return;
			}
			session = connection.openSession();
//			session.requestPTY("vt"+task.getTaskID(), 80, 24, 640, 480, null);
			
//			String cmd = "source ~/.bash_profile;"+task.getAddress()+"  2>&1 ";
			String cmd = task.getAddress();
			if(!Tool.isBlank(task.getParameter())){
				if(task.getParameter().endsWith(";"))
					cmd = task.getParameter() +cmd;
				else
					cmd = task.getParameter() +";" +cmd;
			}
			LOG.info("开始执行id["+task.getTaskDefID()+"]taskname["+task.getName()+"]的脚本："+cmd);
			session.execCommand(cmd);
			
//			this.stdMsg = readShell(session.getStdout());//正常输出
			if(Tool.isBlank(stdMsg = readShell(session.getStdout()))){//要先读取正常输出才可以
				this.errMsg = Tool.readShell(session.getStderr());//错误输出
			}
			if(Tool.isBlank(errMsg)){
				this.retCode = Const.TASK_STATE_OK;
			}else{
				this.retCode = Const.TASK_STATE_ERROR;
			}
		} catch (Exception e) {
			if(Tool.isBlank(this.errMsg))
				this.errMsg = e.getMessage();
			this.retCode = Const.TASK_STATE_ERROR;
			LOG.error("", e);
		}finally{
			if(session !=null){
				session.close();
			}
			connection.close();
			
			try {
				openConnection();
				conn.setAutoCommit(false);
				doActionAfter();
				conn.commit();
				
			}catch(TerminatedJobException ee){
				throw ee;
			} catch (Exception e) {
				Tool.rollBack(conn);
				LOG.error("", e);
			}
		}
	}
	/**日志更新
	 * @throws TerminatedJobException */
	private void doActionAfter() throws SQLException, TerminatedJobException {
		String msg = Const.TASK_STATE_OK.equals(retCode) ? this.stdMsg : this.errMsg;
		String time = Const.currentDateTime();
		String sql = "UPDATE "+Table.TASK_DEF_NAME+" SET END_TIME=?,TASK_STATUS=?,EXEC_RESULT=? WHERE ID=?";
		Object[] elements =new Object[]{time, retCode,msg, task.getTaskDefID()};
		update(sql, elements);
		sql = "UPDATE "+Table.TASK_LOG_NAME+" SET END_TIME=?,TASK_STATUS=?,EXEC_RESULT=? WHERE ID=?";
		elements =new Object[]{time, retCode,msg, task.getTaskID()};
		update(sql, elements);
		
		
		if(Const.TASK_STATE_OK.equals(retCode)){//记录dispatch_runtime_task表的时候，要看 
			sql ="UPDATE "+Table.TASK_NAME+" SET STATE=?,END_TIME=? WHERE TASK_ID=?";
			elements = new Object[]{Const.TASK_STATE_OK, time, task.getTaskID()};
			update(sql, elements);
		}else{
			String logdesc =task+"脚本执行出错"+msg;
			if(task.isJumpErr()){
				sql ="UPDATE "+Table.TASK_NAME+" SET STATE=?,END_TIME=? WHERE TASK_ID=?";
				elements =new Object[]{Const.TASK_STATE_OK, time, task.getTaskID()}; 
				update(sql, elements);
				LOG.error("流程出错"+msg+", 但是"+task+"设置为忽略出错，执行下一任务");
				sql ="UPDATE "+Table.JOB_DEF_NAME+" SET EXEC_RESULT=? WHERE ID=?";
				elements = new Object[]{logdesc, task.getJobDefID()};
				update(sql, elements);
				
				sql = "UPDATE "+Table.JOB_LOG_NAME+" SET EXEC_RESULT=? WHERE ID=?";
				elements =new Object[]{logdesc, task.getJobID()};
				update(sql, elements);
			}else{
				sql ="UPDATE "+Table.TASK_NAME+" SET STATE=?,END_TIME=? WHERE TASK_ID=?";
				elements =new Object[]{Const.TASK_STATE_ERROR, time, task.getTaskID()};//流程是可恢复的，不应设置为
				update(sql, elements);
				//同时更新JOB表的状态，更新流程状态 暂停(是可恢复的)
				sql ="UPDATE "+Table.JOB_NAME+" SET STATE=? WHERE JOB_ID=?";
				elements = new Object[]{Const.JOB_STATE_SUSPEND, task.getJobID()};
				update(sql, elements);
				sql ="UPDATE "+Table.JOB_DEF_NAME+" SET FLOW_STATUS=? , EXEC_RESULT=? WHERE ID=?";
				elements = new Object[]{Const.JOB_STATE_SUSPEND, logdesc, task.getJobDefID()};
				update(sql, elements);
				
				sql = "UPDATE "+Table.JOB_LOG_NAME+" SET TASK_STATUS=?,EXEC_RESULT=? WHERE ID=?";
				elements =new Object[]{Const.JOB_STATE_SUSPEND,logdesc, task.getJobID()};
				update(sql, elements);
				conn.commit();
				///会重新执行任务
				conn.setAutoCommit(true);
				makeSureTaskGoingon(logdesc);
				this.task = super.getTask(task.getTaskDefID());//
				closeAll();
				doAction();
			}
		}

		
	}

	HashSet<String> findNextNodeDefIDs(String jobDefID, String taskDefID) throws SQLException, DocumentException {
		return super.findWorkFlowNextNodes(jobDefID, taskDefID);
	}

	private boolean isPass(String xor) {//xor 1走正确分支，2走错误分支 0，不走分支
		if(Tool.isBlank(xor) || "0".equals(xor)) 
			return true;
		LOG.warn("retCode["+retCode+"],走task_branch["+xor+"]分支路线");
		if(Const.TASK_STATE_OK.equals(retCode) && "1".equals(xor.trim()))
			return true;
		if(Const.TASK_STATE_ERROR.equals(retCode) && "2".equals(xor.trim()))
			return true;
		
		return false;
	}
	
	private String readShell(InputStream instream){
		InputStreamReader isReader = new InputStreamReader(instream);
		StringBuffer sb = new StringBuffer();
		try {
			long startDate = System.currentTimeMillis();
			long stopDate = 0L;
			int n = 0;
			while((n = isReader.read()) != -1){
				sb.append((char)n);
				stopDate = System.currentTimeMillis();
				if((stopDate-startDate)>=2000){//2秒钟更新一次LOG
					startDate = stopDate;
//					logDetail(task.getTaskID(), sb.toString());
					try{
						openConnection();
						conn.setAutoCommit(true);
						String sql ="UPDATE "+Table.TASK_LOG_NAME+" SET EXEC_RESULT=? WHERE ID=?";
						Object[] elements = new Object[]{sb.toString(), task.getTaskID()};
						update(sql, elements);
					}finally{
						closeAll();
					}
				}
			}
		} catch (Exception e) {
			LOG.error("", e);
		}finally{
			Tool.safeClose(isReader);
			Tool.safeClose(instream);
		}
		return sb.toString();
	}

	String getJobDefID(long jobID) throws SQLException{
		String sql ="SELECT JOB_DEF_ID FROM "+Table.JOB_NAME+" WHERE JOB_ID=?";
		Object[] elements = new Object[]{jobID};
		return queryForObject(sql, elements).toString();
	}

	long getParentJobID(long jobID) throws SQLException {
		String sql ="SELECT PARENT_JOB_ID FROM "+Table.JOB_NAME+" WHERE JOB_ID=?";
		Object[] elements = new Object[]{jobID};
		Object o = queryForObject(sql, elements);
		if(Tool.isBlank(o))
			return 0;
		return Long.parseLong(o.toString());
	}

	void taskStart() throws SQLException{
		String time = Const.currentDateTime();
		String sql = "INSERT INTO "+Table.TASK_NAME+"(JOB_ID,TASK_ID,TASK_DEF_ID,TASK_NAME,START_TIME,STATE) VALUES(?,?,?,?,?,?)";
		Object[] elements = null;
		if(task.getTaskID() ==0){//重启 恢复的TASK就有task_id的
			this.task.setTaskID(generateTaskID());
		}
		elements = new Object[]{task.getJobID(),task.getTaskID(),task.getTaskDefID(),task.getName(),time,Const.TASK_STATE_RUNNING};
		update(sql, elements);
		
		sql = "UPDATE "+Table.TASK_DEF_NAME+" SET START_TIME=?,TASK_STATUS=? WHERE ID=?";
		elements =new Object[]{time, Const.TASK_STATE_RUNNING,task.getTaskDefID()};
		update(sql, elements);
		
		sql ="INSERT INTO "+Table.TASK_LOG_NAME+"(ID,TASK_ID,START_TIME,TASK_STATUS) VALUES(?,?,?,?)";//该表主键与任务表主键设为一致
		elements = new Object[]{task.getTaskID(), task.getTaskDefID(), time,Const.TASK_STATE_RUNNING};
		update(sql, elements);
		
	}
	
	
	static final ConcurrentHashMap<String, AtomicInteger> endtasksJoinMap = new ConcurrentHashMap<String, AtomicInteger>();//key是jobID,value是JoinNum
	/**正常结束流程
	 * @param jobDefID 
	 * @throws ParseException */
	void completeJOB(long jobID, String jobDefID ) throws Exception {
//		while(!isJobTasksDone(jobID)){
//			try {
//				LOG.info("等待.. JOB流程jobID["+jobID+"]的现有任务都完成");
//				Thread.sleep(Scanperiod);
//			} catch (InterruptedException e) {}
//			
//		}
		try{
			conn.setAutoCommit(false);
			
			String sql = "SELECT  FLOW_TYPE FROM "+Table.JOB_DEF_NAME+" WHERE ID=?";
			Object[]  elements =new Object[]{ jobDefID};
			Object mainFlowFlag = queryForObject(sql, elements);
			if("4".equals(mainFlowFlag)){//是主流程
				//看结束节点前有多条汇聚的话，
				HashSet<String> set = super.findPreNodes(jobDefID, "2");
				//还要排除下分支的情况
				int branchNum = getDiffBranch(set);
				if(branchNum>1){
					endtasksJoinMap.putIfAbsent(jobDefID, new AtomicInteger(branchNum));
					int cnum = endtasksJoinMap.get(jobDefID).getAndDecrement();
					System.out.println("============================cnum="+cnum);
					if(cnum<=1){
						endtasksJoinMap.remove(jobDefID);
						completeJobState(jobID, jobDefID);
						//设置下次要执行的时间（更新start_time）
						updateJobDefTableStartTime(jobDefID);
						conn.commit();
						startNextJobOnCondition(jobDefID);//查看dispatch_taskctl_fwdependency表，是否执行有依赖关系的下个流程
					}
				}else{
					completeJobState(jobID, jobDefID);
					//设置下次要执行的时间（更新start_time）
					updateJobDefTableStartTime(jobDefID);
					conn.commit();
					startNextJobOnCondition(jobDefID);//查看dispatch_taskctl_fwdependency表，是否执行有依赖关系的下个流程
				}
			}else{
				completeJobState(jobID, jobDefID);
			}
			conn.commit();
			conn.setAutoCommit(true);//再次取消手工提交事务
		}catch(Exception e){
			Tool.rollBack(conn);
			throw e;
		}
	}
	/**或取结束节点前的并发条数，（分支节点算1条）要排除分支情况
	 * @throws SQLException */
	private int getDiffBranch(HashSet<String> set) throws SQLException {
		if(set.isEmpty())
			return 1;
		StringBuffer buff = new StringBuffer();
		for(String taskDefID : set){
			buff.append("'" +taskDefID + "',");
		}
		String idstr = buff.substring(0, buff.length()-1);
		String sql ="SELECT COUNT( DISTINCT TASK_BRANCH) FROM "+Table.TASK_DEF_NAME+" WHERE ID IN ("+idstr+") AND TASK_BRANCH<>'0'";//and pid=?
		System.out.println(sql);
		if(queryForLong(sql, null) >1)
			return 1;
		return set.size();
	}

	/**找到JOB结束前，还有多少任务未执行*/
	private int taskUndoNum(long jobID, String jobDefID) throws SQLException, DocumentException {
		HashSet<String> set = super.findPreNodes(jobDefID, "2");
		System.out.println("set.size()="+set.size());
		if(set.size()==1)
			return 0;
		int ret = 0;
		for(String tskdefID : set){
			if(!isDone(jobID, tskdefID)){
				ret ++;
			}
		}
		return ret;
	}

	void completeJobState(long job_id, String jobDefID) throws SQLException{
		LOG.info("结束流程["+jobDefID+"]");
		String time = Const.currentDateTime();
		String sql ="UPDATE "+Table.JOB_NAME+" SET STATE=?,END_TIME=? WHERE JOB_ID=?";
		Object[] elements = new Object[]{Const.JOB_STATE_COMPLETE, time, job_id};
		update(sql, elements);

		String result = "";
		sql = "UPDATE "+Table.TASK_DEF_NAME+" SET TASK_STATUS=?,EXEC_RESULT=? WHERE PID=?";
		elements =new Object[]{Const.TASK_STATE_COMPLETE,result, jobDefID};
		update(sql, elements);

		//同时更新定义表
		sql = "UPDATE "+Table.JOB_DEF_NAME+" SET END_TIME=?,FLOW_STATUS=?,EXEC_RESULT=?,"+Table.COLUMN_JOBID_FLUSH+"=0 WHERE ID=?";
		elements =new Object[]{time, Const.JOB_STATE_COMPLETE,result, jobDefID};
		update(sql, elements);
		
		//更新日志表
		sql = "UPDATE "+Table.JOB_LOG_NAME+" SET END_TIME=?,TASK_STATUS=?,EXEC_RESULT=? WHERE ID=?";
		elements =new Object[]{time, Const.JOB_STATE_COMPLETE,result, job_id};
		update(sql, elements);
	}
	//是主流程才更新
	void updateJobDefTableStartTime(String jobDefID) throws SQLException, ParseException{
		String sql ="SELECT START_TIME,WORK_DATE, NEXT_STARTTIME, NEXT_STARTUNIT FROM "+Table.JOB_DEF_NAME+" WHERE ID=? AND FLOW_TYPE=?";
		Object[] elements =new Object[]{jobDefID,"4"};//4是主流程
		rs = select(sql, elements);
		if(!rs.next()){
			Tool.safeClose(rs);
			Tool.safeClose(ps);
			return;
		}
		//-------------------------------------以下只有主流程才会执行
		String startTime =rs.getString("START_TIME");
		String workDate = rs.getString("WORK_DATE");
		int count = rs.getInt("NEXT_STARTTIME");
		String unit = rs.getString("NEXT_STARTUNIT");
		Tool.safeClose(rs);
		Tool.safeClose(ps);
		//必须要更新workDate，是否更新START_TIME，要看情况
		Calendar c = Calendar.getInstance();
		Date wd = new SimpleDateFormat("yyyy-MM-dd").parse(workDate);
		c.setTime(wd);
		c.add(Calendar.DAY_OF_YEAR, 1);
		LOG.info("更新了"+Table.JOB_DEF_NAME+"["+jobDefID+"]的启动日期");
		sql = "UPDATE "+Table.JOB_DEF_NAME+" SET WORK_DATE=? WHERE ID=?";
		elements = new Object[]{new SimpleDateFormat("yyyy-MM-dd").format(c.getTime()),jobDefID};
		update(sql, elements);
		
		if(count ==0 || Tool.isBlank(unit) || Tool.isBlank(startTime)){
			return;
		}
		Date starttime =null;
		try {
			starttime = Const.format.parse(workDate+" "+startTime);
		} catch (ParseException e) {
			LOG.error("", e);
			return;
		}
		c.setTime(starttime);
		if(unit.equalsIgnoreCase("Hours")){
			c.add(Calendar.HOUR_OF_DAY, count);
		}else if(unit.equalsIgnoreCase("Day")){
			c.add(Calendar.DAY_OF_YEAR, count);
		}else if(unit.equalsIgnoreCase("Week")){
			c.add(Calendar.WEEK_OF_YEAR, count);
		}else{
			return;
		}
		//c.add(Calendar.MONTH, 1);
		String newdate = Const.format.format(c.getTime());
		String newstartTime = newdate.substring(10).trim();
		String newworkDate = newdate.substring(0, 10);
		
		LOG.info("更新了"+Table.JOB_DEF_NAME+"["+jobDefID+"]的启动时间 "+newdate);
		sql = "UPDATE "+Table.JOB_DEF_NAME+" SET START_TIME=?, WORK_DATE=? WHERE ID=?";
		elements = new Object[]{newstartTime,newworkDate, jobDefID};
		update(sql, elements);
		
		
	}
	static HashSet<String> preFlows = new HashSet<String>();
	private void startNextJobOnCondition(String jobDefID) throws SQLException {
		preFlows.add(jobDefID);
		String sql ="SELECT FLOW_ID, FLOW_PREV_ID FROM "+Table.JOB_DEPENDENCE+" WHERE FLOW_PREV_ID LIKE '%"+jobDefID+"%'";
		rs = select(sql, null);//后置流程可以有多个
		ArrayList<HashMap<String, String>> list = new ArrayList<HashMap<String, String>>();
		while(rs.next()){
			HashMap<String, String> map = new HashMap<String, String>();
			map.put("FLOW_ID", rs.getString("FLOW_ID"));
			map.put("FLOW_PREV_ID", rs.getString("FLOW_PREV_ID"));
			list.add(map);
		}
		Tool.safeClose(rs);
		Tool.safeClose(ps);
		if(list.size() ==0){
			LOG.info("["+jobDefID+"]在"+Table.JOB_DEPENDENCE+"中没有后置流程");
			return;
		}
		for(HashMap<String, String> map : list){
			String preFlowIDs = map.get("FLOW_PREV_ID");
			String waitTostartID =  map.get("FLOW_ID");
			String[] jobDefIDs = preFlowIDs.split(",");
			boolean startFlag = true;
			for(String jobDef : jobDefIDs){
				if(Tool.isBlank(jobDef))
					continue;
				if(jobDefID.equals(jobDef))
					continue;
				if(!preFlows.contains(jobDef)){
					LOG.info("流程["+jobDef+"]还没完成，不能开始下一流程:"+waitTostartID);
					startFlag = false;
				}
//				sql ="SELECT JOB_ID FROM "+Table.JOB_DEF_NAME +" WHERE ID=?";
//				long jid = queryForLong(sql, new Object[]{jobDef});
//				if(jid >0){
//					LOG.info("流程["+jobDef+"]还没结束，不能开始下一流程");
//					startFlag = false;
//					break;
//				}
			}
			if(startFlag){
				LOG.info("开始执行流程["+jobDefID+"]的后置流程["+waitTostartID+"]");
				//new Job().startJob(0, waitTostartID);
				System.out.println("前preFlows="+preFlows);
				for(String jobDef : jobDefIDs){
					if(Tool.isBlank(jobDef))
						continue;
					preFlows.remove(jobDef);
				}
				System.out.println("后preFlows="+preFlows);
				startJOB(0, waitTostartID);
			}
		}
		
	}

	long generateTaskID(){
//		String tname = Table.TASK_NAME+"_SEQ";
//		return Tool.generatePK(tname);
		return Const.TaskPk.incrementAndGet();
	}
}
