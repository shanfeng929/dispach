package com.sunyard.dispatch.job;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Method;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.log4j.Logger;
import org.dom4j.DocumentException;
import org.hibernate.procedure.ProcedureCall;

import ch.ethz.ssh2.Connection;
import ch.ethz.ssh2.Session;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sunyard.dispatch.common.Const;
import com.sunyard.dispatch.common.Table;
import com.sunyard.dispatch.common.TerminatedJobException;
import com.sunyard.dispatch.common.ThreadPool;
import com.sunyard.dispatch.common.Tool;
import com.sunyard.dispatch.job.extraModel.ProcedureModel;
import com.sunyard.dispatch.job.serverModel.DispatchDataSource;
import com.sunyard.dispatch.util.EncryptionDecryption;

public class JobTask_bak extends Base implements Runnable {
	/** 记录运行的线程数量 */
	static AtomicInteger threadNum = new AtomicInteger(1);
	protected Logger LOG = Logger.getLogger(getClass());
	/** 对应TASKNAME表的一个任务 */
	public Task task = null;
	/** 任务脚本执行出错时记录 */
	String errMsg = null;
	/** 任务脚本正常输出的信息 */
	String stdMsg = null;
	/** 任务脚本正常运行的状态 */
	String retCode = "1";

	public JobTask_bak(Task task) {
		this.task = task;
	}

	// 子流程关心进入 和 退出
	@Override
	public void run() {// jumpErr > xor taskNum==1
		LOG.debug("正在运行的TASK数：" + threadNum.getAndIncrement());
		LOG.debug("本次执行任务的是:" + (task.isReal() ? "执行" : "遍历")
				+ task.getTaskID() + "节点。");
		if (task.isReal()) {// 如果是真实JOB
			try {
				super.openConnection();
				beforeAction();
				conn.setAutoCommit(false);
				taskStart();
				conn.commit();
			} catch (TerminatedJobException e) {
				LOG.warn("流程[" + task.getJobDefID() + "]终止，下个任务不继续执行");
				closeAll();
				return;
			} catch (Exception e) {
				Tool.rollBack(conn);
				LOG.error("", e);
			} finally {
				// 在这里应该关闭DB连接，因为在执行SHELL期间会一直占用
				super.closeAll();
			}
			try {
				doAction();
			} catch (TerminatedJobException e) {
				LOG.warn("流程[" + task.getJobDefID() + "]终止，下个任务 不继续执行");
				closeAll();
				return;
			}
		} else {// 如果是虚工作
			try {
				super.openConnection();
				conn.setAutoCommit(false);
				taskJump();
				conn.commit();
			} catch (Exception e) {
				Tool.rollBack(conn);
				LOG.error("", e);
			} finally {
				// 在这里应该关闭DB连接，因为在执行SHELL期间会一直占用
				super.closeAll();
				openConnection();
			}

		}

		// 三次

		try {
			conn.setAutoCommit(true);// 下面的都是查询，不用开启事务
			checkNextNode(); // 检测所有后继节点是否符合标准，如果符合，则向下运行
		} catch (Exception e) {
			LOG.error("", e);
			System.out.println(task.taskDefID);
		} finally {
			super.closeAll();
		}
		threadNum.getAndDecrement();
	}

	/**
	 * 判断后继节点是否要运行，如果要运行，执行对应的nextNodeTask方法
	 * 
	 * @throws Exception
	 */
	public void checkNextNode() throws Exception {
		HashMap<String, String> nextDefIDs = findNextNodeDefIDs(
				task.getJobDefID(), task.getTaskDefID());
		int taskNum = nextDefIDs.size();
		LOG.info("流程[" + task.getJobDefID() + "]下个要处理的节点："
				+ Arrays.toString(nextDefIDs.keySet().toArray(new String[] {})));
		if (taskNum == 0) {// 如果该flow没有后续节点
			long pid = getParentJobID(task.getJobID());// 查看是否有父流程ID
			if (pid == 0) {// 说明是父流程，可能有子流程的，应该不能填end_time todo
				completeJOB(task.getJobID(), task.getJobDefID());
			} else {
				completeJOB(task.getJobID(), task.getJobDefID()); // 子流程结束，要开始父JOB的下个节点
				String defID = getJobDefID(pid);
				Set<String> nextIDs = findNextNodeDefIDs(defID,
						task.getJobDefID()).keySet();// 这里的task.getJobDefID()是父流程节点的taskDefID
				if (nextIDs.size() == 0) {// 说明子流程结束，同时也结束父流程的 todo
					completeJOB(pid, defID);
				} else {// 子流节点后面的是分裂节点
					for (String taskDefID : nextIDs) {
						// System.out.println("【测试】注意，进入了任务" + taskDefID);
						nextNodeTask(taskDefID, pid, true);
						// 子流程结束时，暂时后面的都算并行，可能将来需要修改_weilai
					}
				}

			}
		} else {
			boolean bingFlag = true;
			// System.out.println("【debug】任务"+task.taskDefID+"的branch是"+task.getBranch());
			for (Entry<String, String> taskDefID : nextDefIDs.entrySet()) {
				// 要在这里添加选择语句 weilai //June 6th 2016

				if (bingFlag
						&& task.isReal()
						&& ((this.stdMsg.indexOf(taskDefID.getValue()) > -1)
								|| taskDefID.getValue() == null || ""
									.equals(taskDefID.getValue()))) {

					nextNodeTask(taskDefID.getKey(), 0, true);
					if ("1".equals(task.getBranch())) {
						bingFlag = false;
					}
				} else {
					nextNodeTask(taskDefID.getKey(), 0, false);
					System.out.println(task.getTaskDefID());
					System.out.println(this.stdMsg);
					System.out.println(taskDefID.getValue() + '\n');
				}
			}
		}
	}

	public static final ConcurrentHashMap<String, AtomicInteger> taskJoinMap = new ConcurrentHashMap<String, AtomicInteger>();// key是jobID,value是JoinNum
	public static final ConcurrentHashMap<String, AtomicBoolean> taskSignalMap = new ConcurrentHashMap<String, AtomicBoolean>();// key是jobID,value是传入的dummy值
	static final Object lock = new Object();

	/**
	 * 在运行中备份两张HASHMAP到数据库，以期从中断恢复
	 * 
	 * @param nextTaskDefID
	 * @param pid
	 */
	public void writeHash(String nextTaskDefID) {
		long pid = 0;
		synchronized (JobTask_bak.class) {
			try {
				super.openConnection();
				conn.setAutoCommit(false);
				String taskRunningID = nextTaskDefID;
				String jobDefID = task.getJobDefID();
				String sql = "SELECT JOINS,SIGNALS FROM " + Table.JOB_HASH
						+ " WHERE PID=? AND TASKDEFID=?";
				Object elements[] = { pid, nextTaskDefID };
				rs = select(sql, elements);
				int currentJoin = taskJoinMap.get(taskRunningID).get();
				boolean currentSignal = taskSignalMap.get(taskRunningID).get();
				if (rs.next()) {
					int join = rs.getInt("JOINS");
					boolean signal = rs.getBoolean("SIGNALS");
					elements = new Object[] {
							currentJoin > join ? currentJoin : join,
							currentSignal ? currentSignal : signal, pid,
							nextTaskDefID };
					sql = "UPDATE "
							+ Table.JOB_HASH
							+ " SET JOINS=?,SIGNALS=? WHERE PID=? AND TASKDEFID=?";
					update(sql, elements);
				} else {
					elements = new Object[] { pid, nextTaskDefID, currentJoin,
							currentSignal, jobDefID };
					sql = "INSERT INTO "
							+ Table.JOB_HASH
							+ " (PID,TASKDEFID,JOINS,SIGNALS,JOBDEFID) VALUES(?,?,?,?,?)";
					update(sql, elements);
					// System.out.println("写入了");
				}
				conn.commit();
			} catch (SQLException e) {
				Tool.rollBack(conn);
				e.printStackTrace();
			} finally {
				super.openConnection();
			}
		}

	}

	public backUpSet readHash(String nextTaskDefID, long pid) {
		backUpSet bbSet = null;
		try {
			super.openConnection();
			String sql = "SELECT JOINS,SIGNALS FROM " + Table.JOB_HASH
					+ " WHERE PID=? AND TASKDEFID=?";
			Object elements[] = { pid, nextTaskDefID };
			rs = select(sql, elements);
			if (rs.next()) {
				bbSet = new backUpSet(nextTaskDefID, pid, rs.getInt("JOINS"),
						rs.getBoolean("SIGNALS"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			super.closeAll();
		}
		return bbSet;
	}

	public void cleanHash(String jobDefID) {
		try {
			super.openConnection();
			conn.setAutoCommit(false);
			String sql = "DELETE FROM " + Table.JOB_HASH + " WHERE JOBDEFID=?";
			Object[] elements = new Object[] { jobDefID };
			update(sql, elements);
		} catch (SQLException e) {
			e.printStackTrace();
			Tool.rollBack(conn);
		} finally {
			super.openConnection();
			try {
				conn.setAutoCommit(true);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	class backUpSet {
		public String nextTaskDefID;
		public long pid;
		public int joins;
		public boolean signals;

		public backUpSet() {
		};

		public backUpSet(String nextTaskDefID, long pid, int joins,
				boolean signals) {
			this.nextTaskDefID = nextTaskDefID;
			this.pid = pid;
			this.joins = joins;
			this.signals = signals;
		}
	}

	/**
	 * 
	 * @param nextTaskDefID
	 *            下一个节点的taskID或flowID
	 * @param pid
	 *            如果是子流程，则为parentID;若不是子流程，则为0
	 * @param real
	 *            若为true，即为正常流程，需要执行流程内容；若为false，则是虚工作，只向后传值而不执行流程内容。
	 * @throws SQLException
	 * @throws DocumentException
	 */
	private void nextNodeTask(String nextTaskDefID, long pid, boolean real)
			throws SQLException, DocumentException {
		long jobID = task.getJobID();
		if (pid != 0) {
			jobID = pid;
		}
		if (nextTaskDefID.startsWith("flow")) { // 任务节点是子流程
			LOG.info("启动流程[" + task.getJobDefID() + "]的子流程[" + nextTaskDefID
					+ "]");
			int joinNum = super.getNodeJoinNum(task.getJobDefID(),
					nextTaskDefID);
			if (joinNum > 1) {// 若它做为汇聚节点时
				String taskRunningID = nextTaskDefID;
				// 让前面所有已完成的节点任务线程先停下来，并停止线程，直到最后一个
				taskJoinMap.putIfAbsent(taskRunningID, new AtomicInteger(1));
				taskSignalMap.putIfAbsent(taskRunningID, new AtomicBoolean(
						false));

				if (real) {
					taskSignalMap.get(taskRunningID).set(real);// 如果存在任一前趋传过来的real为true，则标记此job的signal为true
				}
				// 上面关于SignalMap的语句必须放在获取currNum之前！
				int currNum = taskJoinMap.get(taskRunningID).getAndIncrement();
				writeHash(nextTaskDefID); // 将哈希表备份到数据库。
				if (currNum < joinNum) {
					LOG.info("结束当前这个线程,汇聚节点(子流程)[" + nextTaskDefID + "] 先不执行");
					return;
				} else { // 当currNum =joinNum时
					taskJoinMap.remove(taskRunningID);
					LOG.info("执行汇聚节点(子流程)-->" + nextTaskDefID);
					while (!isJoinPreTasksDone(jobID, task.getJobDefID(),
							nextTaskDefID)) { // 聚合节点前的任务都执行完成
						try {
							LOG.info("等待...汇聚节点(子流程)[" + nextTaskDefID
									+ "]前的任务还没完成！");
							Thread.sleep(Scanperiod);
							task = super.getTask(task.getTaskDefID());
						} catch (InterruptedException e) {
						}
					}
					// new Job().startJob(jobID, nextTaskDefID);
					startJOB(jobID, nextTaskDefID);
				}
			} else {
				// new Job().startJob(jobID, nextTaskDefID);
				startJOB(jobID, nextTaskDefID);
			}
		} else {// task不是子流程的情况
			Task tsk = super.getTask(nextTaskDefID);
			tsk.setJobID(jobID);
			// System.out.println("【测试】下一个节点的taskDefId是" + nextTaskDefID);
			int joinNum = tsk.getDefJoinNum();
			if (joinNum > 1) {// 让前面所有已完成的节点任务线程先停下来，并停止线程，直到最后一个
				String taskRunningID = nextTaskDefID;
				taskJoinMap.putIfAbsent(taskRunningID, new AtomicInteger(1));
				taskSignalMap.putIfAbsent(taskRunningID, new AtomicBoolean(
						false));
				System.out.println("【debug】taskName is " + task.getTaskDefID()
						+ ",real is " + real);
				if (real) {
					taskSignalMap.get(taskRunningID).set(real);// 如果存在任一前趋传过来的real为true，则标记此job的signal为true
				}
				// 上面关于SignalMap的语句必须放在获取currNum之前！
				int currNum = taskJoinMap.get(taskRunningID).getAndIncrement();
				/*
				 * System.out.println("注意：" + currNum + "," + joinNum + "," +
				 * jobID);
				 */
				// 而下一句必须放在获取currNum之后
				boolean isReal = taskSignalMap.get(taskRunningID).get();
				writeHash(nextTaskDefID); // 将哈希表备份到数据库。
				if (currNum < joinNum) {
					LOG.info("结束当前这个线程,汇聚节点" + tsk + " 先不执行");
					return;
				} else { // 当currNum =joinNum时
					taskJoinMap.remove(taskRunningID);
					taskSignalMap.remove(taskRunningID);
					if (isReal) {
						LOG.info("执行汇聚节点-->" + tsk);
					} else {
						LOG.info("遍历汇聚节点-->" + tsk);
					}
					while (!isJoinPreTasksDone(jobID, tsk.getJobDefID(),
							tsk.getTaskDefID())) { // 聚合节点前的任务都执行完成
						try {
							LOG.info("等待...汇聚节点[" + tsk + "]前的任务还没完成或没遍历！");
							Thread.sleep(Scanperiod);
							task = super.getTask(task.getTaskDefID());
						} catch (InterruptedException e) {
						}
					}
					tsk.setReal(isReal); // 执行和遍历
											// 共用execute方法，如果是遍历，不会实际执行shell脚本
					ThreadPool.execute(new JobTask_bak(tsk));
				}
			} else {
				// String xor = tsk.getXorCondition();
				// if (true) { // edit on June 6th 2016 by weilai
				tsk.setReal(real);
				ThreadPool.execute(new JobTask_bak(tsk));// tsk中的taskID 还不存在
				// }// else{
				// LOG.error(task+"后的任务"+tsk+"不继续执行！");
				// }

			}
		}
	}

	private boolean isJoinPreTasksDone(long jobID, String jobDefID,
			String taskDefID) throws SQLException, DocumentException {
		HashSet<String> set = super.findPreNodes(jobDefID, taskDefID);
		if ("2".equals(taskDefID)) {
			LOG.info("查看结束节点前所有任务["
					+ Arrays.toString(set.toArray(new String[] {}))
					+ "]是否都已经完成(若没完成的话，主流程不能结束)");
		} else
			LOG.info("查看该汇聚节点" + taskDefID + "前的所有前置节点["
					+ Arrays.toString(set.toArray(new String[] {}))
					+ "]是否都已经完成");
		for (String tskdefID : set) {
			if (!isDone(jobID, tskdefID)) {
				return false;
			}
		}
		return true;
	}

	boolean isDone(long jobID, String tskdefID) throws SQLException {
		String sql = null;
		Object id = null;
		if (tskdefID.startsWith("flow")) {
			sql = "SELECT 1 FROM "
					+ Table.JOB_NAME
					+ " WHERE PARENT_JOB_ID=? AND (STATE=? OR STATE=?) AND JOB_DEF_ID=?";
			id = super.queryForObject(sql, new Object[] { jobID,
					Const.JOB_STATE_COMPLETE, Const.JOB_STATE_JUMP, tskdefID });
		} else {
			sql = "SELECT 1 FROM "
					+ Table.TASK_NAME
					+ " WHERE JOB_ID=? AND TASK_DEF_ID=? AND (STATE=? OR STATE=?)";
			id = super.queryForObject(sql, new Object[] { jobID, tskdefID,
					Const.TASK_STATE_OK, Const.TASK_STATE_JUMP });
		}
		if (id == null) {
			return false;
		} else {
			return true;
		}
	}

	private void beforeAction() throws SQLException, TerminatedJobException {
		int i = 0;
		while (!task.isActivated()) {
			try {
				String msg = task + "还没激活！等待手工激活";
				if (i++ == 3) {
					String sql = "UPDATE " + Table.JOB_LOG_NAME
							+ " SET EXEC_RESULT=? WHERE ID=?";
					Object[] elements = new Object[] { msg, task.getJobID() };
					update(sql, elements);
					sql = "UPDATE " + Table.JOB_NAME
							+ " SET EXEC_RESULT=? WHERE ID=?";
					elements = new Object[] { msg, task.getJobDefID() };
					update(sql, elements);
				}
				LOG.warn(msg);
				Thread.sleep(Scanperiod);
				task = super.getTask(task.getTaskDefID());
			} catch (InterruptedException e) {
			}

		}
		// 查看该流程 任务 是否被暂停，周期查看
		// 若是终止 流程的状态，停止该线程
		makeSureTaskGoingon("");

	}

	void makeSureTaskGoingon(String msg) throws SQLException,
			TerminatedJobException {
		String sql = "SELECT STATE FROM " + Table.JOB_NAME + " WHERE JOB_ID=?";
		Object[] elements = new Object[] { task.getJobID() };
		Object state = queryForObject(sql, elements);
		if (Const.JOB_STATE_TERMINATE.equals(state)) {
			throw new TerminatedJobException();
		}
		if (Const.JOB_STATE_SUSPEND.equals(state)) {// ||
													// Const.JOB_STATE_ERROR.equals(state)
			closeAll();
			try {
				LOG.warn("流程[" + task.getJobDefID() + "]因为" + msg
						+ " 已经暂停，等待手工恢复流程");
				Thread.sleep(Scanperiod);
			} catch (InterruptedException e) {
			}
			openConnection();
			state = queryForObject(sql, elements);
			if (Const.JOB_STATE_SUSPEND.equals(state)) {
				makeSureTaskGoingon(msg);
			} else if (Const.JOB_STATE_TERMINATE.equals(state)) {
				throw new TerminatedJobException();
			}
		}
	}

	private void doAction() throws TerminatedJobException {
		String taskType = task.getTaskType();
		if (Const.TASK_TYPE_LINUX.equals(taskType)) {
			this.doLinuxAction();
		} else if (Const.TASK_TYPE_SQL.equals(taskType)) {
			this.doSqlAction();
		} else if (Const.TASK_TYPE_JAVA.equals(taskType)) {
			this.doJavaAction();
		} else if (Const.TASK_TYPE_ALARM_SINGLE.equals(taskType)
				|| Const.TASK_TYPE_ALARM_TITLE.equals(taskType)
				|| Const.TASK_TYPE_ALARM_MULTIPLE.equals(taskType)) {
			this.doAlarmAction();
		}
	}

	private void doLinuxAction() throws TerminatedJobException {
		String host = task.shellServer.getHost(), user = task.shellServer
				.getUser(), pwd = task.shellServer.getPwd();
		Connection connection = new Connection(host);
		Session session = null;
		try {
			connection.connect();
			boolean isAuthenticated = connection.authenticateWithPassword(user,
					pwd);
			if (!isAuthenticated) {
				this.errMsg = "用户[" + user + "]密码[" + pwd + "]不能登录" + host;
				return;
			}
			session = connection.openSession();
			// session.requestPTY("vt"+task.getTaskID(), 80, 24, 640, 480,
			// null);

			// String cmd =
			// "source ~/.bash_profile;"+task.getAddress()+"  2>&1 ";
			String cmd = task.getAddress();
			if (!Tool.isBlank(task.getParameter())) {
				if (task.getParameter().endsWith(";"))
					cmd = task.getParameter() + cmd;
				else
					cmd = task.getParameter() + ";" + cmd;
			}
			LOG.info("开始执行id[" + task.getTaskDefID() + "]taskname["
					+ task.getName() + "]的脚本：" + cmd);
			session.execCommand(cmd);
			// session.execCommand(cmd);
			// this.stdMsg = readShell(session.getStdout());//正常输出

			if (Tool.isBlank(stdMsg = readShell(session.getStdout()))) {// 要先读取正常输出才可以
				this.errMsg = Tool.readShell(session.getStderr());// 错误输出
			}
			System.out.println("[early]" + stdMsg);
			if (Tool.isBlank(errMsg)) {
				this.retCode = Const.TASK_STATE_OK;
			} else {
				this.retCode = Const.TASK_STATE_ERROR;
			}
		} catch (Exception e) {
			if (Tool.isBlank(this.errMsg))
				this.errMsg = e.getMessage();
			this.retCode = Const.TASK_STATE_ERROR;
			LOG.error("", e);
		} finally {
			if (session != null) {
				session.close();
			}
			connection.close();

			try {
				openConnection();
				conn.setAutoCommit(false);
				doActionAfter();
				conn.commit();

			} catch (TerminatedJobException ee) {
				throw ee;
			} catch (Exception e) {
				Tool.rollBack(conn);
				LOG.error("", e);
			}
		}
	}

	private void doSqlAction() throws TerminatedJobException {
		java.sql.Connection connectionA = null;
		java.sql.PreparedStatement statement = null;
		try {
			System.out.println("数据库操作Action");
			// String url = "jdbc:mysql://" + task.shellServer.getHost() + ":"
			// + task.shellServer.getPort() + "/"
			// + task.shellServer.getNamespace();
			// String username = task.shellServer.getUser();
			// String password = task.shellServer.getPwd();
			DispatchDataSource dds = task.getDataSource();
			String driverName = dds.getDriverName();
			String url = dds.getDbUrl();
			String username = dds.getUserName();
			String password = dds.getPassword();
			Class.forName(driverName);
			connectionA = DriverManager.getConnection(url, username, password);
			String sql = task.getAddress();
			statement = connectionA.prepareStatement(sql);
			Object[] sqlPara = task.getSqlParameter();
			if (sqlPara != null && sqlPara.length != 0) {
				for (int i = 0; i < sqlPara.length; i++) {
					Object obj = sqlPara[i];
					if (obj instanceof java.util.Date) {
						Date d = (java.util.Date) obj;
						statement
								.setDate(i + 1, new java.sql.Date(d.getTime()));
					} else {
						statement.setObject(i + 1, obj);
					}
				}
			}
			if (sql.toUpperCase().trim().startsWith("SELECT")) {
				statement.execute();
			} else {
				statement.executeUpdate();
			}
			statement.close();
			connectionA.close();
			stdMsg = "数据库命令已执行";
			retCode = Const.TASK_STATE_OK;
		} catch (SQLException e) {
			e.printStackTrace();
			retCode = Const.TASK_STATE_ERROR;
			errMsg = "数据库命令执行失败";
		} catch (Exception e) {

		} finally {
			if (statement != null) {
				try {
					statement.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			try {
				openConnection();
				conn.setAutoCommit(false);
				doActionAfter();
				conn.commit();
			} catch (TerminatedJobException ee) {
				throw ee;
			} catch (Exception e) {
				Tool.rollBack(conn);
				LOG.error("", e);
			}
		}
	}

	private void doAlarmAction() throws TerminatedJobException {
		DispatchDataSource dds = task.getDataSource();
		String motherURL = "http://172.16.4.164:8081/CRWM/";
		List<ProcedureModel> proceList = new ArrayList<ProcedureModel>();
		if (Const.TASK_TYPE_ALARM_SINGLE.equals(task.taskType)) {
			InputStream in = null;
			CloseableHttpClient hClient = null;
			CloseableHttpResponse remoteResponse = null;
			try {
				// 单个model的情况
				String fullURL = motherURL + "model/getByModelCode"
						+ "?modelCode=" + task.getAddress(); // 此地址返回model具体的JSON
				hClient = HttpClients.createDefault();
				remoteResponse = null;
				HttpGet hGet = new HttpGet(fullURL);
				remoteResponse = hClient.execute(hGet);
				HttpEntity remoteEntity = remoteResponse.getEntity();
				in = remoteEntity.getContent();
				byte[] read = new byte[1024];
				byte[] all = new byte[0];
				int num;
				while ((num = in.read(read)) > 0) {
					byte[] temp = new byte[all.length + num];
					System.arraycopy(all, 0, temp, 0, all.length);
					System.arraycopy(read, 0, temp, all.length, num);
					all = temp;
				}
				String result = new String(all, "UTF-8");
				System.out.println(result);
				JSONObject JSONresult = JSONObject.parseObject(result);
				if (JSONresult.getJSONArray("modelRuleList").size() > 0) {
					String sql = ((JSONresult.getJSONArray("modelRuleList")
							.getJSONObject(0))).getString("ruleContent");
					List<Object> paraArray = new ArrayList<Object>();
					JSONArray jsonParas = ((JSONresult
							.getJSONArray("modelRuleList").getJSONObject(0)))
							.getJSONArray("modelRuleParamList");
					for (int i = 0; i < jsonParas.size(); i++) {
						paraArray.add(jsonParas.getJSONObject(i).getString(
								"paramValue"));
					}
					ProcedureModel thisModel = new ProcedureModel();
					thisModel.setSql(sql);
					thisModel.setParas(paraArray);
					thisModel.setModelCode(task.getAddress());
					proceList.add(thisModel);
				}

			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				try {
					if (in != null) {
						in.close();
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				try {
					if (remoteResponse != null) {
						remoteResponse.close();
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				try {
					if (hClient != null) {
						hClient.close();
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		} else if (Const.TASK_TYPE_ALARM_TITLE.equals(task.taskType)) {
			String fullURL = motherURL
					+ "model"
					+ "?searchData="
					+ "[{\"name\":\"titleId\",\"operator\":\"EQUAL\",\"valueType\":\"INTEGER\",\"value\":"
					+ task.getAddress() + "}]&page=1&start=0&limit=1000000";
			InputStream in = null;
			CloseableHttpClient hClient = null;
			CloseableHttpResponse remoteResponse = null;
			try {
				hClient = HttpClients.createDefault();
				remoteResponse = null;
				HttpGet hGet = new HttpGet(fullURL);
				remoteResponse = hClient.execute(hGet);
				HttpEntity remoteEntity = remoteResponse.getEntity();
				in = remoteEntity.getContent();
				byte[] read = new byte[1024];
				byte[] all = new byte[0];
				int num;
				while ((num = in.read(read)) > 0) {
					byte[] temp = new byte[all.length + num];
					System.arraycopy(all, 0, temp, 0, all.length);
					System.arraycopy(read, 0, temp, all.length, num);
					all = temp;
				}
				String result = new String(all, "UTF-8");
				System.out.println(result);
				JSONObject JSONResult = JSONObject.parseObject(result);
				JSONArray results = JSONResult.getJSONArray("root");
				for (int i = 0; i < results.size(); i++) {
					JSONObject singleResult = results.getJSONObject(i);
					if (singleResult.getJSONArray("modelRuleList").size() > 0) {
						String sql = ((singleResult
								.getJSONArray("modelRuleList").getJSONObject(0)))
								.getString("ruleContent");
						List<Object> paraArray = new ArrayList<Object>();
						JSONArray jsonParas = ((singleResult
								.getJSONArray("modelRuleList").getJSONObject(0)))
								.getJSONArray("modelRuleParamList");
						for (int j = 0; j < jsonParas.size(); j++) {
							paraArray.add(jsonParas.getJSONObject(j).getString(
									"paramValue"));
						}
						ProcedureModel thisModel = new ProcedureModel();
						thisModel.setModelCode(singleResult.getString("modelCode"));
						thisModel.setSql(sql);
						thisModel.setParas(paraArray);
						proceList.add(thisModel);
					}
				}
			} catch (Exception e) {
			} finally {
				try {
					if (in != null) {
						in.close();
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				try {
					if (remoteResponse != null) {
						remoteResponse.close();
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				try {
					if (hClient != null) {
						hClient.close();
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		} else if (Const.TASK_TYPE_ALARM_MULTIPLE.equals(task.taskType)) {
			JSONArray models = JSONArray.parseArray(task.getAddress());
			Iterator<Object> i = models.iterator();
			while (i.hasNext()) {
				InputStream in = null;
				CloseableHttpClient hClient = null;
				CloseableHttpResponse remoteResponse = null;
				HttpEntity remoteEntity = null;
				JSONObject model = (JSONObject) i.next();
				String modelCode = model.getString("modelCode");
				String fullURL = motherURL + "model/getByModelCode"
						+ "?modelCode=" + modelCode;
				try {
					hClient = HttpClients.createDefault();
					HttpGet hGet = new HttpGet(fullURL);
					remoteResponse = hClient.execute(hGet);
					remoteEntity = remoteResponse.getEntity();
					in = remoteEntity.getContent();
					byte[] read = new byte[1024];
					byte[] all = new byte[0];
					int num;
					while ((num = in.read(read)) > 0) {
						byte[] temp = new byte[all.length + num];
						System.arraycopy(all, 0, temp, 0, all.length);
						System.arraycopy(read, 0, temp, all.length, num);
						all = temp;
					}
					String result = new String(all, "UTF-8");
					System.out.println("【测试】" + result);
					JSONObject JSONresult = JSONObject.parseObject(result);
					if (JSONresult.getJSONArray("modelRuleList").size() > 0) {
						String sql = ((JSONObject) (JSONresult
								.getJSONArray("modelRuleList").get(0)))
								.getString("ruleContent");
						List<Object> paraArray = new ArrayList<Object>();
						JSONArray jsonParas = ((JSONresult
								.getJSONArray("modelRuleList").getJSONObject(0)))
								.getJSONArray("modelRuleParamList");
						for (int j = 0; j < jsonParas.size(); j++) {
							paraArray.add(jsonParas.getJSONObject(j).getString(
									"paramValue"));
						}
						ProcedureModel thisModel = new ProcedureModel();
						thisModel.setModelCode(modelCode);
						thisModel.setSql(sql);
						thisModel.setParas(paraArray);
						proceList.add(thisModel);
					}
				} catch (Exception e) {
					e.printStackTrace();
				} finally {
					try {
						if (in != null) {
							in.close();
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
					try {
						if (remoteResponse != null) {
							remoteResponse.close();
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
					try {
						if (hClient != null) {
							hClient.close();
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
		java.sql.Connection connectionA = null;
		java.sql.CallableStatement callStatement = null;
		try {
			Class.forName(dds.getDriverName());
			JSONObject fullJSON = new JSONObject();
			JSONArray resultArray = new JSONArray();
			for (int ii = 0; ii < proceList.size(); ii++) {
				ProcedureModel currentModel = proceList.get(ii);
				JSONObject singleResult = new JSONObject();
				singleResult.put("index", ii);
				singleResult.put("sql", currentModel.getSql());
				String sql = currentModel.getSql();
				System.out.println("【测试】" + sql);
				if(stdMsg==null){
					stdMsg="";
				}
				stdMsg+=currentModel.getModelCode()+":";
				connectionA = DriverManager.getConnection(dds.getDbUrl(),
						dds.getUserName(), dds.getPassword());
				callStatement = connectionA.prepareCall("call " + sql);
				List<Object> currentList = currentModel.getParas();
				// Iterator paraItr=currentList.iterator();
				for (int i = 0; i < currentList.size(); i++) {
					callStatement.setObject(i + 1, currentList.get(i));
				}
				callStatement.registerOutParameter(currentList.size() + 1,
						java.sql.Types.VARCHAR);
				callStatement.registerOutParameter(currentList.size() + 2,
						java.sql.Types.VARCHAR);
				callStatement.execute();
				String result1=callStatement.getString(2);
				String result2=callStatement.getString(3);
				singleResult.put("result1",result1);
				singleResult.put("result2",result2);
				resultArray.add(singleResult);
				try {
					callStatement.close();
					connectionA.close();
				} catch (Exception e) {
				}

				stdMsg+="成功, 结果1:"+result1+", 结果2:"+result2+"; ";
			}
			fullJSON.put("resultSet",resultArray );
			fullJSON.put("result", "预警任务已执行");
			String extraMsg = fullJSON.toJSONString();
			retCode = Const.TASK_STATE_OK;
		} catch (Exception e) {
			e.printStackTrace();
			retCode = Const.TASK_STATE_ERROR;
			stdMsg+="失败; ";
			errMsg=stdMsg;
			String extraMsg = "{\"result\":\"预警任务执行失败\",\"resultSet\":[]}";
		} finally {
			if (callStatement != null) {
				try {
					callStatement.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if (connectionA != null) {
				try {
					connectionA.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			try {
				openConnection();
				conn.setAutoCommit(false);
				doActionAfter();
				conn.commit();
			} catch (TerminatedJobException ee) {
				throw ee;
			} catch (Exception e) {
				Tool.rollBack(conn);
				LOG.error("", e);
			}
		}

		// ///下面是旧的，上面是新的/////
		/*
		 * java.sql.Connection connectionA = null; java.sql.CallableStatement
		 * callStatement = null; // DispatchDataSource dds =
		 * task.getDataSource(); // String motherURL =
		 * "http://172.16.4.164:8081/CRWM/"; HttpClient hClient =
		 * HttpClients.createDefault(); HttpResponse remoteResponse = null;
		 * HttpEntity remoteEntity = null; InputStream in = null; String result
		 * = null; try { Class.forName(dds.getDriverName());
		 * 
		 * } catch (Exception e) { e.printStackTrace(); } if
		 * (Const.TASK_TYPE_ALARM_MULTIPLE.equals(task.taskType)) { try { String
		 * modelCodesJson = task.getAddress(); JSONArray models =
		 * JSONArray.parseArray(modelCodesJson); Iterator<Object> i =
		 * models.iterator(); while (i.hasNext()) { JSONObject model =
		 * (JSONObject) i.next(); String modelCode =
		 * model.getString("modelCode"); String fullURL = motherURL +
		 * "model/getByModelCode" + "?modelCode=" + modelCode;
		 * System.out.println(fullURL); HttpGet hGet = new HttpGet(fullURL);
		 * remoteResponse = hClient.execute(hGet); remoteEntity =
		 * remoteResponse.getEntity(); in = remoteEntity.getContent(); byte[]
		 * read = new byte[1024]; byte[] all = new byte[0]; int num; while ((num
		 * = in.read(read)) > 0) { byte[] temp = new byte[all.length + num];
		 * System.arraycopy(all, 0, temp, 0, all.length); System.arraycopy(read,
		 * 0, temp, all.length, num); all = temp; } result = new String(all,
		 * "UTF-8"); System.out.println("【测试】" + result); JSONObject JSONresult
		 * = JSONObject.parseObject(result);
		 * 
		 * String sql = "{call SEL_CANSTART_SP(?,?,?)}"; connectionA =
		 * DriverManager.getConnection(dds.getDbUrl(), dds.getUserName(),
		 * dds.getPassword()); callStatement = connectionA.prepareCall(sql);
		 * callStatement.setString(1, "测试模");
		 * callStatement.registerOutParameter(2, java.sql.Types.VARCHAR);
		 * callStatement.registerOutParameter(3, java.sql.Types.VARCHAR);
		 * 
		 * callStatement.execute();
		 * 
		 * System.out.println(callStatement.getString(2) + "------------" +
		 * callStatement.getString(3)); stdMsg = "预警存储过程已执行"; retCode =
		 * Const.TASK_STATE_OK; hGet.abort(); } } catch (Exception e) {
		 * e.printStackTrace(); retCode = Const.TASK_STATE_ERROR; errMsg =
		 * "预警命令执行失败"; } finally { if (conn != null) { try { conn.close(); }
		 * catch (SQLException e) { e.printStackTrace(); } } try {
		 * openConnection(); conn.setAutoCommit(false); doActionAfter();
		 * conn.commit(); } catch (Exception e) { Tool.rollBack(conn);
		 * LOG.error("", e); }
		 * 
		 * } // // if (Const.TASK_TYPE_ALARM_SINGLE.equals(task.taskType)) {
		 * String fullURL = motherURL + "model/getByModelCode" + "?modelCode=" +
		 * task.getAddress(); System.out.println(fullURL); HttpGet hGet = new
		 * HttpGet(fullURL); try { remoteResponse = hClient.execute(hGet);
		 * remoteEntity = remoteResponse.getEntity(); in =
		 * remoteEntity.getContent(); byte[] read = new byte[1024]; byte[] all =
		 * new byte[0]; int num; while ((num = in.read(read)) > 0) { byte[] temp
		 * = new byte[all.length + num]; System.arraycopy(all, 0, temp, 0,
		 * all.length); System.arraycopy(read, 0, temp, all.length, num); all =
		 * temp; } result = new String(all, "UTF-8");
		 * System.out.println(result); } catch (Exception e) {
		 * e.printStackTrace(); } finally { try { if (in != null) { in.close();
		 * } hGet.abort();
		 * 
		 * } catch (Exception e) { e.printStackTrace(); } } JSONObject
		 * JSONresult = JSONObject.parseObject(result); String sql =
		 * ((JSONObject) (JSONresult .getJSONArray("modelRuleList").get(0)))
		 * .getString("ruleContent"); sql = "{call SEL_CANSTART_SP(?,?,?)}"; try
		 * { Class.forName(dds.getDriverName()); connectionA =
		 * DriverManager.getConnection(dds.getDbUrl(), dds.getUserName(),
		 * dds.getPassword()); callStatement = connectionA.prepareCall(sql);
		 * callStatement.setString(1, "测试模");
		 * callStatement.registerOutParameter(2, java.sql.Types.VARCHAR);
		 * callStatement.registerOutParameter(3, java.sql.Types.VARCHAR);
		 * callStatement.execute(); callStatement.execute();
		 * System.out.println(callStatement.getString(2) + "------------" +
		 * callStatement.getString(3)); stdMsg = "预警存储过程已执行"; retCode =
		 * Const.TASK_STATE_OK; } catch (Exception e) { e.printStackTrace();
		 * retCode = Const.TASK_STATE_ERROR; errMsg = "预警命令执行失败"; } finally { if
		 * (conn != null) { try { conn.close(); } catch (SQLException e) {
		 * e.printStackTrace(); } } try { openConnection();
		 * conn.setAutoCommit(false); doActionAfter(); conn.commit(); } catch
		 * (Exception e) { Tool.rollBack(conn); LOG.error("", e); } } } else if
		 * (Const.TASK_TYPE_ALARM_TITLE.equals(task.taskType)) { String fullURL
		 * = motherURL + "model" + "?searchData=" +
		 * "[{\"name\":\"titleId\",\"operator\":\"EQUAL\",\"valueType\":\"INTEGER\",\"value\":"
		 * + task.getAddress() + "}]&page=1&start=0&limit=1000000"; HttpGet hGet
		 * = new HttpGet(fullURL); try { remoteResponse = hClient.execute(hGet);
		 * remoteEntity = remoteResponse.getEntity(); in =
		 * remoteEntity.getContent(); byte[] read = new byte[1024]; byte[] all =
		 * new byte[0]; int num; while ((num = in.read(read)) > 0) { byte[] temp
		 * = new byte[all.length + num]; System.arraycopy(all, 0, temp, 0,
		 * all.length); System.arraycopy(read, 0, temp, all.length, num); all =
		 * temp; } result = new String(all, "UTF-8");
		 * System.out.println(result); } catch (Exception e) {
		 * e.printStackTrace(); } finally { try { if (in != null) { in.close();
		 * } hGet.abort();
		 * 
		 * } catch (Exception e) { e.printStackTrace(); } } JSONObject
		 * JSONResult = JSONObject.parseObject(result); JSONArray results =
		 * JSONResult.getJSONArray("root"); int size = results.size(); try { for
		 * (int i = 0; i < results.size(); i++) { String sql =
		 * results.getJSONObject(0).getString( "ruleContent");
		 * 
		 * Class.forName(dds.getDriverName()); connectionA =
		 * DriverManager.getConnection(dds.getDbUrl(), dds.getUserName(),
		 * dds.getPassword()); callStatement = connectionA.prepareCall(sql);
		 * callStatement.setString(1, "测试模");
		 * callStatement.registerOutParameter(2, java.sql.Types.VARCHAR);
		 * callStatement.registerOutParameter(3, java.sql.Types.VARCHAR);
		 * callStatement.execute(); callStatement.execute();
		 * System.out.println(callStatement.getString(2) + "------------" +
		 * callStatement.getString(3)); stdMsg = "预警存储过程已执行"; retCode =
		 * Const.TASK_STATE_OK; } } catch (Exception e) { e.printStackTrace();
		 * retCode = Const.TASK_STATE_ERROR; errMsg = "预警命令执行失败"; } } else if
		 * (Const.TASK_TYPE_ALARM_MULTIPLE.equals(task.taskType)) {
		 * 
		 * }}
		 */
	}

	private void doJavaAction() throws TerminatedJobException {
		try {
			String className = task.getParameter();// 获取 类名
			String methodFullName = task.getAddress();// 获取 带参的方法
			String methodName = null;
			int length = methodFullName.length();
			int left = methodFullName.indexOf("(");
			int right = methodFullName.indexOf(")");
			if (left < 0) {
				throw new Exception("\"(\" not found");
			}
			if (right < left) {
				throw new Exception("parse Error");
			}
			methodName = methodFullName.substring(0, left);
			String methodArgs = methodFullName.substring(left + 1, right);
			List<Object> arguments = new ArrayList<Object>();
			int argLength = methodArgs.length();
			Object[] finalArgs = null;
			if (argLength > 0) {
				boolean slashFlag = false; // 斜杠标示
				// boolean quoteFlag = false; // 引号标示
				boolean startOne = true;
				// boolean noQuote = false;
				int start = 0;
				for (int p = 0; p < argLength;) {
					// System.out.println(p);//用于测试
					char c = methodArgs.charAt(p);
					if (startOne && c != '"') {
						// noQuote = true;
						int jump = methodArgs.indexOf("','", start);
						p = methodArgs.indexOf(',', p);
						if (jump == start && p == start + 1) {
							p = methodArgs.indexOf(',', jump);
						}
						if (p < 0) {// args中没有用于间隔的逗号
							arguments
									.add(argParse(methodArgs.substring(start)));
							break;
						} else {
							// System.out.println("【测试】"+start+","+p);
							arguments.add(argParse(methodArgs.substring(start,
									p)));
							start = ++p;
							continue;
						}
					}
					if (slashFlag || c == '\\') {
						slashFlag = !slashFlag;
						p++;
					} else if (c == '"') {
						if (startOne) {
							startOne = false;
							p++;
						} else {
							// System.out.println("【测试】：start:"+start+",p:"+p+",startOne"+startOne);
							arguments.add(methodArgs.substring(start + 1, p));
							if (p + 2 < argLength) {
								p += 2;
								start = p;
								startOne = true;
							} else {
								break;
							}
						}
					} else {// 当指针指向常规字符
						p++;
					}
				}
				finalArgs = arguments.toArray();
			}
			// System.out.println("方法的名字是" + methodName);
			/*
			 * for(Object o1:arguments){ System.out.println(o1); }
			 * System.out.println(finalArgs.)
			 */
			Class<?> cc = Class.forName(className);
			;
			Method[] methods = cc.newInstance().getClass().getDeclaredMethods();
			Object cIns = cc.newInstance();
			boolean successful = false;
			for (Method mm : methods) {
				// System.out.println(mm.getName());
				if (mm.getName().equals(methodName)) {
					try {
						mm.invoke(cIns, finalArgs);
						successful = true;
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
			if (!successful) {
				throw new Exception("方法未执行成功");
			}
			// Method method1 = cc.getMethod(methodName);
			// method1.invoke(cc.newInstance());
			/*
			 * for (Method mm : methods) { System.out.println("当前遍历到的方法名字叫" +
			 * mm.getName()); if (mm.getName().equals(methodName)) {
			 * mm.invoke(cc.newInstance(), new Object[] {}); // 要修改 } }
			 */
			stdMsg = "Java命令已执行";
			retCode = Const.TASK_STATE_OK;
		} catch (Exception e) {
			e.printStackTrace();
			retCode = Const.TASK_STATE_ERROR;
			errMsg = "JAVA命令执行失败";
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			try {
				openConnection();
				conn.setAutoCommit(false);
				doActionAfter();
				conn.commit();
			} catch (TerminatedJobException ee) {
				throw ee;
			} catch (Exception e) {
				Tool.rollBack(conn);
				LOG.error("", e);
			}
		}
	}

	private Object argParse(String a) throws Exception {
		String arg = a.trim();
		if ("true".equals(arg)) {
			return new Boolean(true);
		} else if ("false".equals(arg)) {
			return new Boolean(false);
		} else {
			String regexInt = "^-?\\d+$";
			String regexFloat = "^(-?\\d+)(\\.\\d+)?$";
			if (arg.matches(regexInt)) {
				return Integer.parseInt(arg);
			} else if (arg.matches(regexFloat)) {
				return Double.parseDouble(arg);
			}
			if (arg.length() == 3) {
				if (arg.indexOf("'") == 0 && arg.lastIndexOf("'") == 2) {
					return arg.charAt(1);
				}
			}
			throw new Exception("parse Error");
		}
	}

	/**
	 * 日志更新
	 * 
	 * @throws TerminatedJobException
	 */
	private void doActionAfter() throws SQLException, TerminatedJobException {
		String msg = Const.TASK_STATE_OK.equals(retCode) ? this.stdMsg
				: this.errMsg;
		String time = Const.currentDateTime();
		String sql = "UPDATE " + Table.TASK_DEF_NAME
				+ " SET END_TIME=?,TASK_STATUS=?,EXEC_RESULT=? WHERE ID=?";
		Object[] elements = new Object[] { time, retCode, msg,
				task.getTaskDefID() };
		update(sql, elements);
		sql = "UPDATE " + Table.TASK_LOG_NAME
				+ " SET END_TIME=?,TASK_STATUS=?,EXEC_RESULT=? WHERE ID=?";
		elements = new Object[] { time, retCode, msg, task.getTaskID() };
		update(sql, elements);

		if (Const.TASK_STATE_OK.equals(retCode)) {// 记录dispatch_runtime_task表的时候，要看
			sql = "UPDATE " + Table.TASK_NAME
					+ " SET STATE=?,END_TIME=? WHERE TASK_ID=?";
			elements = new Object[] { Const.TASK_STATE_OK, time,
					task.getTaskID() };
			update(sql, elements);
		} else {
			String logdesc = task + "脚本执行出错" + msg;
			/*
			 * if (task.isJumpErr()) { sql = "UPDATE " + Table.TASK_NAME +
			 * " SET STATE=?,END_TIME=? WHERE TASK_ID=?"; elements = new
			 * Object[] { Const.TASK_STATE_OK, time, task.getTaskID() };
			 * update(sql, elements); LOG.error("流程出错" + msg + ", 但是" + task +
			 * "设置为忽略出错，执行下一任务"); sql = "UPDATE " + Table.JOB_DEF_NAME +
			 * " SET EXEC_RESULT=? WHERE ID=?"; elements = new Object[] {
			 * logdesc, task.getJobDefID() }; update(sql, elements);
			 * 
			 * sql = "UPDATE " + Table.JOB_LOG_NAME +
			 * " SET EXEC_RESULT=? WHERE ID=?"; elements = new Object[] {
			 * logdesc, task.getJobID() }; update(sql, elements); } else {
			 */
			sql = "UPDATE " + Table.TASK_NAME
					+ " SET STATE=?,END_TIME=? WHERE TASK_ID=?";
			elements = new Object[] { Const.TASK_STATE_ERROR, time,
					task.getTaskID() };// 流程是可恢复的，不应设置为
			update(sql, elements);
			// 同时更新JOB表的状态，更新流程状态 暂停(是可恢复的)
			sql = "UPDATE " + Table.JOB_NAME + " SET STATE=? WHERE JOB_ID=?";
			elements = new Object[] { Const.JOB_STATE_SUSPEND, task.getJobID() };
			update(sql, elements);
			sql = "UPDATE " + Table.JOB_DEF_NAME
					+ " SET FLOW_STATUS=? , EXEC_RESULT=? WHERE ID=?";
			elements = new Object[] { Const.JOB_STATE_SUSPEND, logdesc,
					task.getJobDefID() };
			update(sql, elements);

			sql = "UPDATE " + Table.JOB_LOG_NAME
					+ " SET FLOW_STATUS=?,EXEC_RESULT=? WHERE ID=?";
			elements = new Object[] { Const.JOB_STATE_SUSPEND, logdesc,
					task.getJobID() };
			update(sql, elements);
			conn.commit();
			// /会重新执行任务
			conn.setAutoCommit(true);
			makeSureTaskGoingon(logdesc);

			this.task = super.getTask(task.getTaskDefID());
			closeAll();
			doAction();
			/* } */
		}

		if ("1".equals(task.getTaskType())) {
			// 删除文件
			String host = task.shellServer.getHost(), user = task.shellServer
					.getUser(), pwd = task.shellServer.getPwd();
			Connection connection = new Connection(host);
			Session session = null;
			try {
				connection.connect();
				boolean isAuthenticated = connection.authenticateWithPassword(
						user, pwd);
				if (!isAuthenticated) {
					this.errMsg = "用户[" + user + "]密码[" + pwd + "]不能登录" + host;
					return;
				}
				session = connection.openSession();
				String command = "rm -f " + task.getTaskDefID() + ".stdout "
						+ task.getTaskDefID() + ".stderr";
				session.execCommand(command);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	HashMap<String, String> findNextNodeDefIDs(String jobDefID, String taskDefID)
			throws SQLException, DocumentException {
		return super.findWorkFlowNextNodes(jobDefID, taskDefID);
	}

	private boolean isPass(String xor) {// xor 1走正确分支，2走错误分支 0，不走分支
		if (Tool.isBlank(xor) || "0".equals(xor))
			return true;
		LOG.warn("retCode[" + retCode + "],走task_branch[" + xor + "]分支路线");
		if (Const.TASK_STATE_OK.equals(retCode) && "1".equals(xor.trim()))
			return true;
		if (Const.TASK_STATE_ERROR.equals(retCode) && "2".equals(xor.trim()))
			return true;

		return false;
	}

	private String readShell(InputStream instream) { // 读取返回值
		InputStreamReader isReader = new InputStreamReader(instream);
		StringBuffer sb = new StringBuffer();
		try {
			long startDate = System.currentTimeMillis();
			long stopDate = 0L;
			int n = 0;
			while ((n = isReader.read()) != -1) {
				sb.append((char) n);
				stopDate = System.currentTimeMillis();
				if ((stopDate - startDate) >= 2000) {// 2秒钟更新一次LOG
					startDate = stopDate;
					// logDetail(task.getTaskID(), sb.toString());
					try {
						openConnection();
						conn.setAutoCommit(true);
						String sql = "UPDATE " + Table.TASK_LOG_NAME
								+ " SET EXEC_RESULT=? WHERE ID=?";
						Object[] elements = new Object[] { sb.toString(),
								task.getTaskID() };
						update(sql, elements);
					} finally {
						closeAll();
					}
				}
			}
		} catch (Exception e) {
			LOG.error("", e);
		} finally {
			Tool.safeClose(isReader);
			Tool.safeClose(instream);
		}
		return sb.toString();
	}

	String getJobDefID(long jobID) throws SQLException {
		String sql = "SELECT JOB_DEF_ID FROM " + Table.JOB_NAME
				+ " WHERE JOB_ID=?";
		Object[] elements = new Object[] { jobID };
		return queryForObject(sql, elements).toString();
	}

	long getParentJobID(long jobID) throws SQLException {
		String sql = "SELECT PARENT_JOB_ID FROM " + Table.JOB_NAME
				+ " WHERE JOB_ID=?";
		Object[] elements = new Object[] { jobID };
		Object o = queryForObject(sql, elements);
		if (Tool.isBlank(o))
			return 0;
		return Long.parseLong(o.toString());
	}

	void taskStart() throws SQLException {
		// SimpleDateFormat format = new
		// SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time = Const.currentDateTime(); // MYSQL
		String sql = "INSERT INTO "
				+ Table.TASK_NAME
				+ "(JOB_ID,TASK_ID,TASK_DEF_ID,TASK_NAME,START_TIME,STATE) VALUES(?,?,?,?,?,?)";
		Object[] elements = null;
		if (task.getTaskID() == 0) {// 重启 恢复的TASK就有task_id的
			this.task.setTaskID(generateTaskID());
		}
		elements = new Object[] { task.getJobID(), task.getTaskID(),
				task.getTaskDefID(), task.getName(), time,
				Const.TASK_STATE_RUNNING };
		update(sql, elements);

		sql = "UPDATE " + Table.TASK_DEF_NAME
				+ " SET START_TIME=?,TASK_STATUS=? WHERE ID=?"; // date
		elements = new Object[] { time, Const.TASK_STATE_RUNNING,
				task.getTaskDefID() };
		update(sql, elements);

		sql = "INSERT INTO "
				+ Table.TASK_LOG_NAME
				+ "(ID,TASK_ID,START_TIME,TASK_STATUS,FLOW_LOG_ID) VALUES(?,?,?,?,?)";// 该表主键与任务表主键设为一致
		elements = new Object[] { task.getTaskID(), task.getTaskDefID(), time,
				Const.TASK_STATE_RUNNING, task.getJobID() };
		update(sql, elements);

	}

	/**
	 * add by wl on June 8th 2016 用于替代taskStart()等一系列方法,用于执行虚工作。
	 * 
	 * @throws SQLException
	 */
	void taskJump() throws SQLException {
		String time = Const.currentDateTime();
		String sql = "INSERT INTO "
				+ Table.TASK_NAME
				+ "(JOB_ID,TASK_ID,TASK_DEF_ID,TASK_NAME,START_TIME,STATE) VALUES(?,?,?,?,?,?)";
		Object[] elements = null;
		if (task.getTaskID() == 0) {// 重启 恢复的TASK就有task_id的
			this.task.setTaskID(generateTaskID());
		}
		elements = new Object[] { task.getJobID(), task.getTaskID(),
				task.getTaskDefID(), task.getName(), time,
				Const.TASK_STATE_JUMP };
		update(sql, elements);
	}

	static final ConcurrentHashMap<String, AtomicInteger> endtasksJoinMap = new ConcurrentHashMap<String, AtomicInteger>();// key是jobID,value是JoinNum

	/**
	 * 正常结束流程
	 * 
	 * @param jobDefID
	 * @throws ParseException
	 */
	void completeJOB(long jobID, String jobDefID) throws Exception {
		// while(!isJobTasksDone(jobID)){
		// try {
		// LOG.info("等待.. JOB流程jobID["+jobID+"]的现有任务都完成");
		// Thread.sleep(Scanperiod);
		// } catch (InterruptedException e) {}
		//
		// }
		try {
			conn.setAutoCommit(false);

			String sql = "SELECT  FLOW_TYPE FROM " + Table.JOB_DEF_NAME
					+ " WHERE ID=?";
			Object[] elements = new Object[] { jobDefID };
			Object mainFlowFlag = queryForObject(sql, elements);
			if ("4".equals(mainFlowFlag)) {// 是主流程
				// 看结束节点前有多条汇聚的话，
				HashSet<String> set = super.findPreNodes(jobDefID, "2");
				// 还要排除下分支的情况
				int branchNum = getDiffBranch(set);
				if (branchNum > 1) {
					endtasksJoinMap.putIfAbsent(jobDefID, new AtomicInteger(
							branchNum));
					int cnum = endtasksJoinMap.get(jobDefID).getAndDecrement();
					System.out.println("============================cnum="
							+ cnum);
					if (cnum <= 1) {
						endtasksJoinMap.remove(jobDefID);
						completeJobState(jobID, jobDefID);
						// 设置下次要执行的时间（更新start_time）
						updateJobDefTableStartTime(jobDefID);
						conn.commit();
						startNextJobOnCondition(jobDefID);// 查看dispatch_taskctl_fwdependency表，是否执行有依赖关系的下个流程
					}
				} else {
					completeJobState(jobID, jobDefID);
					// 设置下次要执行的时间（更新start_time）
					updateJobDefTableStartTime(jobDefID);
					conn.commit();
					startNextJobOnCondition(jobDefID);// 查看dispatch_taskctl_fwdependency表，是否执行有依赖关系的下个流程
				}
			} else {
				completeJobState(jobID, jobDefID);
			}
			conn.commit();
			conn.setAutoCommit(true);// 再次取消手工提交事务
			// this.cleanHash(jobDefID);
			// 如果job执行成功，清空数据库里备份的hash表
		} catch (Exception e) {
			Tool.rollBack(conn);
			throw e;
		}
	}

	/**
	 * 或取结束节点前的并发条数，（分支节点算1条）要排除分支情况
	 * 
	 * @throws SQLException
	 */
	private int getDiffBranch(HashSet<String> set) throws SQLException {
		if (set.isEmpty())
			return 1;
		StringBuffer buff = new StringBuffer();
		for (String taskDefID : set) {
			buff.append("'" + taskDefID + "',");
		}
		String idstr = buff.substring(0, buff.length() - 1);
		String sql = "SELECT COUNT( DISTINCT TASK_BRANCH) FROM "
				+ Table.TASK_DEF_NAME + " WHERE ID IN (" + idstr
				+ ") AND TASK_BRANCH<>'0'";// and pid=?
		System.out.println(sql);
		if (queryForLong(sql, null) > 1)
			return 1;
		return set.size();
	}

	/** 找到JOB结束前，还有多少任务未执行 */
	private int taskUndoNum(long jobID, String jobDefID) throws SQLException,
			DocumentException {
		HashSet<String> set = super.findPreNodes(jobDefID, "2");
		System.out.println("set.size()=" + set.size());
		if (set.size() == 1)
			return 0;
		int ret = 0;
		for (String tskdefID : set) {
			if (!isDone(jobID, tskdefID)) {
				ret++;
			}
		}
		return ret;
	}

	void completeJobState(long job_id, String jobDefID) throws SQLException {
		LOG.info("结束流程[" + jobDefID + "]");
		String time = Const.currentDateTime();
		String sql = "UPDATE " + Table.JOB_NAME
				+ " SET STATE=?,END_TIME=? WHERE JOB_ID=?";
		Object[] elements = new Object[] { Const.JOB_STATE_COMPLETE, time,
				job_id };
		update(sql, elements);

		String result = "";

		sql = "UPDATE " + Table.TASK_DEF_NAME
				+ " SET TASK_STATUS=?,EXEC_RESULT=? WHERE PID=?";
		elements = new Object[] { Const.TASK_STATE_COMPLETE, result, jobDefID };

		// sql = "UPDATE " + Table.TASK_DEF_NAME
		// + " SET TASK_STATUS=?,EXEC_RESULT=? WHERE PID=?";
		// elements = new Object[] { Const.TASK_STATE_COMPLETE, result, jobDefID
		// };
		update(sql, elements);

		// 同时更新定义表
		sql = "UPDATE " + Table.JOB_DEF_NAME + " SET FLOW_STATUS=? ,"
				+ Table.COLUMN_JOBID_FLUSH + "=0 WHERE ID=?";
		elements = new Object[] { Const.JOB_STATE_COMPLETE, jobDefID };

		// sql = "UPDATE " + Table.JOB_DEF_NAME
		// + " SET END_TIME=?,FLOW_STATUS=?,EXEC_RESULT=?,"
		// + Table.COLUMN_JOBID_FLUSH + "=0 WHERE ID=?";
		// elements = new Object[] { time, Const.JOB_STATE_COMPLETE, result,
		// jobDefID };
		update(sql, elements);

		// 更新日志表
		sql = "UPDATE " + Table.JOB_LOG_NAME
				+ " SET END_TIME=?,FLOW_STATUS=?,EXEC_RESULT=? WHERE ID=?";
		elements = new Object[] { time, Const.JOB_STATE_COMPLETE, result,
				job_id };
		update(sql, elements);
	}

	// 是主流程才更新
	void updateJobDefTableStartTime(String jobDefID) throws SQLException,
			ParseException {
		String sql = "SELECT START_TIME,WORK_DATE, NEXT_STARTTIME, NEXT_STARTUNIT FROM "
				+ Table.JOB_DEF_NAME + " WHERE ID=? AND FLOW_TYPE=?";
		Object[] elements = new Object[] { jobDefID, "4" };// 4是主流程
		rs = select(sql, elements);
		if (!rs.next()) {
			Tool.safeClose(rs);
			Tool.safeClose(ps);
			return;
		}
		// -------------------------------------以下只有主流程才会执行
		String startTime = rs.getString("START_TIME");
		String workDate = rs.getString("WORK_DATE");
		int count = rs.getInt("NEXT_STARTTIME");
		String unit = rs.getString("NEXT_STARTUNIT");
		Tool.safeClose(rs);
		Tool.safeClose(ps);
		// 必须要更新workDate，是否更新START_TIME，要看情况
		Calendar c = Calendar.getInstance();
		Date wd = new SimpleDateFormat("yyyy-MM-dd").parse(workDate);
		c.setTime(wd);
		c.add(Calendar.DAY_OF_YEAR, 1);
		LOG.info("更新了" + Table.JOB_DEF_NAME + "[" + jobDefID + "]的启动日期");
		sql = "UPDATE " + Table.JOB_DEF_NAME + " SET WORK_DATE=? WHERE ID=?";
		elements = new Object[] {
				new SimpleDateFormat("yyyy-MM-dd").format(c.getTime()),
				jobDefID };
		update(sql, elements);

		if (count == 0 || Tool.isBlank(unit) || Tool.isBlank(startTime)) {
			return;
		}
		Date starttime = null;
		try {
			starttime = Const.format.parse(workDate + " " + startTime);
		} catch (ParseException e) {
			LOG.error("", e);
			return;
		}
		c.setTime(starttime);
		// 根据周期更新 执行日期 和 执行时间
		if (unit.equalsIgnoreCase(Const.TASK_CYCLE_DAY)) {
			c.add(Calendar.DAY_OF_YEAR, 1);
		} else if (unit.equalsIgnoreCase(Const.TASK_CYCLE_MONTH)) {
			c.add(Calendar.MONTH, 1);
		} else if (unit.equalsIgnoreCase(Const.TASK_CYCLE_YEAR)) {
			c.add(Calendar.YEAR, 1);
		} else if (unit.equalsIgnoreCase(Const.TASK_CYCLE_SEASON)) {
			c.add(Calendar.MONTH, 3);
		} else {
			return;
		}
		// c.add(Calendar.MONTH, 1);
		String newdate = Const.format.format(c.getTime());
		String newstartTime = newdate.substring(10).trim();
		String newworkDate = newdate.substring(0, 10);

		LOG.info("更新了" + Table.JOB_DEF_NAME + "[" + jobDefID + "]的启动时间 "
				+ newdate);
		sql = "UPDATE " + Table.JOB_DEF_NAME
				+ " SET START_TIME=?, WORK_DATE=? WHERE ID=?";
		elements = new Object[] { newstartTime, newworkDate, jobDefID };
		update(sql, elements);

	}

	static HashSet<String> preFlows = new HashSet<String>();

	private void startNextJobOnCondition(String jobDefID) throws SQLException {
		preFlows.add(jobDefID);
		String sql = "SELECT FLOW_ID, FLOW_PREV_ID FROM "
				+ Table.JOB_DEPENDENCE + " WHERE FLOW_PREV_ID LIKE '%"
				+ jobDefID + "%'";
		rs = select(sql, null);// 后置流程可以有多个
		ArrayList<HashMap<String, String>> list = new ArrayList<HashMap<String, String>>();
		while (rs.next()) {
			HashMap<String, String> map = new HashMap<String, String>();
			map.put("FLOW_ID", rs.getString("FLOW_ID"));
			map.put("FLOW_PREV_ID", rs.getString("FLOW_PREV_ID"));
			list.add(map);
		}
		Tool.safeClose(rs);
		Tool.safeClose(ps);
		if (list.size() == 0) {
			LOG.info("[" + jobDefID + "]在" + Table.JOB_DEPENDENCE + "中没有后置流程");
			return;
		}
		for (HashMap<String, String> map : list) {
			String preFlowIDs = map.get("FLOW_PREV_ID");
			String waitTostartID = map.get("FLOW_ID");
			String[] jobDefIDs = preFlowIDs.split(",");
			boolean startFlag = true;
			for (String jobDef : jobDefIDs) {
				if (Tool.isBlank(jobDef))
					continue;
				if (jobDefID.equals(jobDef))
					continue;
				if (!preFlows.contains(jobDef)) {
					LOG.info("流程[" + jobDef + "]还没完成，不能开始下一流程:" + waitTostartID);
					startFlag = false;
				}
				// sql ="SELECT JOB_ID FROM "+Table.JOB_DEF_NAME +" WHERE ID=?";
				// long jid = queryForLong(sql, new Object[]{jobDef});
				// if(jid >0){
				// LOG.info("流程["+jobDef+"]还没结束，不能开始下一流程");
				// startFlag = false;
				// break;
				// }
			}
			if (startFlag) {
				LOG.info("开始执行流程[" + jobDefID + "]的后置流程[" + waitTostartID + "]");
				// new Job().startJob(0, waitTostartID);
				System.out.println("前preFlows=" + preFlows);
				for (String jobDef : jobDefIDs) {
					if (Tool.isBlank(jobDef))
						continue;
					preFlows.remove(jobDef);
				}
				System.out.println("后preFlows=" + preFlows);
				startJOB(0, waitTostartID);
			}
		}

	}

	long generateTaskID() {
		// String tname = Table.TASK_NAME+"_SEQ";
		// return Tool.generatePK(tname);
		return Const.TaskPk.incrementAndGet();
	}
}
