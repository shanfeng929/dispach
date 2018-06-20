package com.sunyard.dispatch.job_bak;

import java.sql.SQLException;
import java.util.Arrays;
import java.util.HashSet;

import org.apache.log4j.Logger;
import org.dom4j.DocumentException;

import com.sunyard.dispatch.common.Const;
import com.sunyard.dispatch.common.Err;
import com.sunyard.dispatch.common.Table;
import com.sunyard.dispatch.common.ThreadPool;
import com.sunyard.dispatch.common.Tool;

public class Job extends Base {
	protected Logger LOG = Logger.getLogger(getClass());

	/**
	 * 启动JOB流程
	 * @param parentJobID 0是启动主流程，非0启动该ID的子流程
	 * @param jobDefID 对应FLOWNAME表的ID
	 * @return
	 * @throws Exception 
	 */
	public long startJob(long parentJobID, String jobDefID) throws Exception { // 非子JOB的的parentJobID=0
		super.openConnection();
		long jobID= 0;
		try {
			conn.setAutoCommit(false);//开启事务时，会偶尔发生Lock wait timeout出错
//			checkJobRunning(jobDefID);
			HashSet<String> taskDefIDs = getFirstNodeDefIDs(jobDefID);
			jobID = generateJobID();
			insertJOB(jobID, jobDefID, parentJobID);
			conn.commit();//先提交，该conn与JobTask里的conn不是同一个
			LOG.debug("开始执行流程["+jobDefID+"],它将要执行:"+Arrays.toString(taskDefIDs.toArray(new String[]{})));
			for (String taskDefID : taskDefIDs) {
				if (taskDefID.startsWith("flow")) {
					// creator_job =jobID jobDefID = taskDefID
					startJOB(jobID, taskDefID);
				} else {
					Task task = super.getTask(taskDefID);
					task.setJobID(jobID);
					ThreadPool.execute(new JobTask(task));
				}
			}
		} catch (Exception e) {
			jobID = 0;
			String msg = "启动流程出错:"+e.getMessage();
			Tool.rollBack(conn);
			try {//为了让前端看到为什么流程没启动
				String sql = "UPDATE "+Table.JOB_DEF_NAME+" SET FLOW_STATUS=?, EXEC_RESULT=? WHERE ID=?";
				Object[] elements =new Object[]{Const.JOB_STATE_TERMINATE,msg, jobDefID};
				update(sql, elements);
				if(parentJobID >0){
					msg ="启动["+jobDefID+"]的子流程出错:"+e.getMessage();
					sql = "UPDATE "+Table.JOB_DEF_NAME+" SET FLOW_STATUS=?, EXEC_RESULT=? WHERE JOB_ID=?";
					elements =new Object[]{Const.JOB_STATE_TERMINATE, msg, parentJobID};
					update(sql, elements);
				}
				conn.commit();
			} catch (Exception e2) {
				e2.printStackTrace();
				Tool.rollBack(conn);
			}
			LOG.error("", e);
			throw e;
		} finally {
			closeAll();
		}
		return jobID;
	}


	public boolean suspendJob(long jobID) throws Exception{
		boolean back = false;
		try {
			super.openConnection();
			conn.setAutoCommit(false);
			checkJOB(jobID);
			int num = changeJobState(jobID, Const.JOB_STATE_SUSPEND);
			if(num >0){
				LOG.info("该job_id["+jobID+"]下的所有流程都被暂停了");
			}
			conn.commit();
			back = true;
		} catch (Exception e) {
			Tool.rollBack(conn);
			LOG.error("", e);
			throw e;
		}finally{
			closeAll();
		}
		
		return back;
	}

	public boolean resumeJob(long jobID) throws Exception {
		boolean back = false;
		try {
			super.openConnection();
			conn.setAutoCommit(false);
			checkJOB(jobID);
			int num = changeJobState(jobID, Const.JOB_STATE_RUNNING);
			if(num >0){
				LOG.info("该job_id["+jobID+"]下的所有流程都被恢复了");
			}
			
			conn.commit();
			back = true;
		} catch (Exception e) {
			Tool.rollBack(conn);
			LOG.error("", e);
			throw e;
		}finally{
			closeAll();
		}
		
		return back;
	}

	public boolean terminateJob(long jobID) throws Exception{// 更新流程定义表 , 不在这里做
		boolean back = false;
		try {
			super.openConnection();
			conn.setAutoCommit(false);
			checkJOB(jobID);
			int num = changeJobState(jobID, Const.JOB_STATE_TERMINATE);
			if(num >0){
				LOG.info("该job_id["+jobID+"]下的所有流程都被终止了");
			}
			conn.commit();
			back = true;
		} catch (Exception e) {
			Tool.rollBack(conn);
			LOG.error("", e);
			throw e;
		}finally{
			closeAll();
		}
		
		return back;
	}


	private int changeJobState(long jobID, String state) throws SQLException {
		//String dateTime = Const.currentDateTime();
		String sql = "SELECT STATE ,JOB_DEF_ID FROM "+Table.JOB_NAME+" WHERE JOB_ID=?";
		rs = select(sql, new Object[]{jobID});
		if(!rs.next()){
			throw new SQLException("数据不存在job_id["+jobID+"]："+sql);
		}
		String job_def_id=rs.getString("JOB_DEF_ID");
		Tool.safeClose(rs);
		Tool.safeClose(ps);
		
		
		sql = "UPDATE "+Table.JOB_NAME+" SET STATE=? WHERE JOB_ID=?";
		Object[] elements = new Object[] { state, jobID };
		update(sql, elements);
		
		sql = "UPDATE "+Table.JOB_NAME+" SET STATE=? WHERE PARENT_JOB_ID=?";
		elements = new Object[] { state, jobID };
		int num = update(sql, elements);
		
		//---------更新流程定义表
		sql = "UPDATE "+Table.JOB_DEF_NAME+" SET FLOW_STATUS=? WHERE ID=?";
		elements = new Object[] {state,job_def_id };
		int i = update(sql, elements);
		if(i <=0){
			throw new SQLException("状态没更新："+sql +","+Arrays.toString(elements));
		}
		
		sql = "UPDATE "+Table.JOB_LOG_NAME+" SET TASK_STATUS=? WHERE ID=?";
		elements = new Object[] {state,jobID };
		update(sql, elements);

		return num;
	}
	void checkJOB(long jobID) throws SQLException {
		if(jobID ==0){
			throw new SQLException("流程表字段job_id=0,说明流程已终止或有异常");
		}
	}

	void insertJOB(long jobID, String jobDef, long parentJobID)
			throws SQLException {
		String sql ="SELECT FLOW_NAME FROM "+Table.JOB_DEF_NAME+" WHERE ID=?";
		Object flowName = queryForObject(sql,  new Object[] {jobDef});
		String time = Const.currentDateTime();
		sql = "INSERT INTO "+Table.JOB_NAME+"(JOB_ID,JOB_DEF_ID, PARENT_JOB_ID,START_TIME,STATE,JOB_NAME) VALUES(?,?,?,?,?,?)";
		Object[] elements = new Object[] { jobID, jobDef, parentJobID, time, Const.JOB_STATE_RUNNING,flowName};
		update(sql, elements);
		
		sql = "UPDATE "+Table.JOB_DEF_NAME +" SET "+Table.COLUMN_JOBID_FLUSH+"=?,FLOW_STATUS=? WHERE ID=?";//把当前jobID刷新到JOB定义表中
		elements = new Object[]{jobID,Const.JOB_STATE_RUNNING , jobDef};
		update(sql, elements);
		
		//日志表
		String flowType = "4";
		if(parentJobID>0)
			flowType ="3";
		sql = "INSERT INTO "+Table.JOB_LOG_NAME+"(ID,FLOW_ID,START_TIME,HIS_WORK_DATE,FLOW_TYPE,TASK_STATUS) VALUES(?,?,?,?,?,?)";
		elements = new Object[] { jobID, jobDef,  time,time.substring(0, 10),flowType,Const.JOB_STATE_RUNNING};
		update(sql, elements);
	}

	// 可以有多个开始节点
	HashSet<String> getFirstNodeDefIDs(String flowDefID) throws SQLException, DocumentException {
		HashSet<String> nodes = super.findWorkFlowNextNodes(flowDefID, "1");

		if (nodes.isEmpty()) {
			throw new Err("没有开始节点！");
		}
		return nodes;
	}

	long generateJobID() {
//		String tabname = Table.JOB_NAME+"_SEQ";
//		return Tool.generatePK(tabname);
		return Const.JobPk.incrementAndGet();
	}
}
