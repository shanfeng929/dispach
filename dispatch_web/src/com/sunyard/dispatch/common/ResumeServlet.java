package com.sunyard.dispatch.common;

import java.io.IOException;
import java.io.StringReader;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import ch.ethz.ssh2.Session;

import com.sunyard.dispatch.common.ConnPool;
import com.sunyard.dispatch.common.Const;
import com.sunyard.dispatch.common.Err;
import com.sunyard.dispatch.common.Table;
import com.sunyard.dispatch.common.TerminatedJobException;
import com.sunyard.dispatch.common.ThreadPool;
import com.sunyard.dispatch.common.Tool;
import com.sunyard.dispatch.job.JobTask;
import com.sunyard.dispatch.job.Task;
import com.sunyard.dispatch.job.serverModel.ShellServer;
import com.sunyard.dispatch.util.SSHUtils;

public class ResumeServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private static final Logger LOG = Logger.getLogger(ResumeServlet.class);

	@Override
	public void init() throws ServletException {
		// 建立数据库连接
		Connection conn = ConnPool.getConn();
		try {
			// 手动提交
			conn.setAutoCommit(false);
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		// 查询所有状态为正在执行的任务
		String sql = "SELECT MAX(ta.TASK_ID) TASK_ID,ta.STATE, "
				+ "na.ID, na.PID,na.TASK_NAME,na.TASK_ADDRESS,na.TASK_PARAMETER,na.TASK_REMOTE,na.TASK_ERROR,na.TASK_ACTIVE,na.ERROR_NUM,na.JOIN_NUM,na.TASK_BELONG,na.TASK_BRANCH "
				+ "FROM DISPATCH_TASKETL_TASKNAME na LEFT JOIN "
				+ "DISPATCH_TASKETL_FLOWNAME fa on fa.ID = na.PID LEFT JOIN "
				+ "DISPATCH_RUNTIME_TASK ta on ta.TASK_DEF_ID = na.id "
				+ "WHERE fa.FLOW_STATUS = 1 GROUP BY na.ID AND na.TASK_BELONG != 5";
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();
			List<Task> taskList = new ArrayList<Task>();
			Set<String> flowIds = new HashSet<String>();
			while (rs.next()) {
				Task task = new Task();
				task.taskID = rs.getLong("TASK_ID");
				task.setState(rs.getString("STATE"));
				String flowId = rs.getString("PID");
				// 获取所有正在运行的流程
				task.jobDefID = flowId;
				flowIds.add(flowId);

				task.taskDefID = rs.getString("ID");
				task.joinNum = rs.getInt("JOIN_NUM");
				task.errNum = rs.getInt("ERROR_NUM");
				task.jumpErr = rs.getString("TASK_ERROR");
				task.name = rs.getString("TASK_NAME");
				task.xor = rs.getString("TASK_BRANCH");
				task.taskType = rs.getInt("TASK_BELONG") + "";
				task.address = rs.getString("TASK_ADDRESS");
				task.parameter = rs.getString("TASK_PARAMETER");
				task.active = rs.getString("TASK_ACTIVE");
				String shellID = rs.getString("TASK_REMOTE");

				ShellServer ss = getShellServer(shellID, conn);

				task.shellServer = ss;
				taskList.add(task);
			}
			Tool.safeClose(ps);
			Tool.safeClose(rs);
			// 遍历运行流程下的任务
			for (String id : flowIds) {
				//判断流程的起始节点是否已启动
				boolean flag = true;
				try {
					HashMap<String, String> firstnodes = findWorkFlowNextNodes(conn,id,"1");

					if (firstnodes.isEmpty()) {
						throw new Err("没有开始节点！");
					}
					HashSet<String> result = new HashSet<String>();
					result.add(firstnodes.keySet().iterator().next());
					for(String firstnode:result){
						Task t = getTask(firstnode, conn);
						if(null == t.getState()){
							flag = false;
							ThreadPool.execute(new JobTask(t));
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				if(flag){
					for (Task task : taskList) {
						if (task.getJobDefID().equals(id)) {
							
							//如果任务正在执行
							if ("0".equals(task.getState())
									|| "1".equals(task.getState())) {
								try {
									String fileName = task.getTaskDefID()
											+ ".stdout";
									String fileNameErr = task.getTaskDefID()
											+ ".stderr";
									SSHUtils sshUtils = new SSHUtils(
											task.shellServer.getHost(),
											task.shellServer.getUser(),
											task.shellServer.getPwd());

									String content = sshUtils.getContent(fileName);
									String contentErr = sshUtils
											.getContent(fileNameErr);
									sshUtils.closeClient();
									String status = null;
									String msg = null;
									if ("".equals(contentErr)) {
										status = Const.TASK_STATE_OK;
										msg = content;
									} else if ("".equals(content)) {
										status = Const.TASK_STATE_ERROR;
										msg = contentErr;
									}
									if (null != status) {
										updateTable(task, msg, status, conn);
										// 如果出错并且不跳过错误
										if (!"".equals(content)
												&& task.jumpErr.equals("1")) {
											// msg = content;
											// updateTable(task, msg, status, conn);
										} else {
											Document doc = readXml(
													task.getJobDefID(), conn);
											HashSet<String> nodes = findWorkFlowNextNodes(
													task.getJobDefID(),
													task.getTaskDefID(), doc);
											for (String node : nodes) {
												Task t = getTask(node, conn);
												//从数据库读取数据初始化hashmap
												initHashMap(conn, task, JobTask.taskJoinMap, JobTask.taskSignalMap);
												ThreadPool.execute(new JobTask(t));
											}
										}
									} else if("2".equals(task.getState())//执行成功或者失败
									|| "3".equals(task.getState())){
										Document doc = readXml(
												task.getJobDefID(), conn);
										HashSet<String> nodes = findWorkFlowNextNodes(
												task.getJobDefID(),
												task.getTaskDefID(), doc);
										for (String node : nodes) {
											Task t = getTask(node, conn);
											if("4".equals(task.getState()) || null == task.getState()){
												//从数据库读取数据初始化hashmap
												initHashMap(conn, t, JobTask.taskJoinMap, JobTask.taskSignalMap);
												ThreadPool.execute(new JobTask(t));
											}
										}
									} else{//未执行
										continue;
									}
								} catch (Exception ee) {

								}
							} else if("2".equals(task.getState())){//如果任务执行结束，看下一个节点的执行状态
								try {
									Document doc = readXml(
											task.getJobDefID(), conn);
									HashSet<String> nodes = findWorkFlowNextNodes(task.getJobDefID(), task.getTaskDefID(), doc);
									for(String node : nodes){
										Task t = getTask(node, conn);
										//下一个节点未执行
										if(null == t.getState() || "".equals(t.getState())){
											initHashMap(conn, t, JobTask.taskJoinMap, JobTask.taskSignalMap);
											ThreadPool.execute(new JobTask(t));
										}
									}
									
								} catch (Exception e) {
									// TODO: handle exception
								}
								
							}
						}
					}
				}
		
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		Tool.safeClose(conn);
	}

	private HashSet<String> findWorkFlowNextNodes(String jobDefID,
			String fromID, Document doc) throws SQLException, DocumentException {
		List<Element> arraws = doc.getRootElement().element("arrows")
				.elements();
		HashSet<String> nodes = new HashSet<String>();
		for (Element arraw : arraws) {
			String from = arraw.attributeValue("from");
			if (from.equals(fromID)) {
				String to = arraw.attributeValue("to");
				if (Tool.isBlank(to) || "2".equals(to)) {
					continue;
				}
				nodes.add(arraw.attributeValue("to"));
			}
		}
		return nodes;
	}

	private Document readXml(String jobDefID, Connection conn)
			throws SQLException, DocumentException {
		String sql = "SELECT XML FROM " + Table.JOB_DEF_XML
				+ " WHERE FLOW_ID = ?";
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, jobDefID);
		ResultSet rs = ps.executeQuery();
		Object xml = null;
		if (rs.next()) {
			xml = rs.getObject(1);
		}
		if (xml == null)
			throw new Err(Table.JOB_DEF_XML + "中没有flow_id=" + jobDefID);
		SAXReader reader = new SAXReader();
		Document doc = reader.read(new StringReader(xml.toString()));
		Tool.safeClose(rs);
		Tool.safeClose(ps);
		return doc;
	}

	private Task getTask(String taskDefID, Connection conn) throws SQLException {
		String sql = "SELECT ta.STATE, na.PID,na.TASK_NAME,na.TASK_ADDRESS,na.TASK_PARAMETER,na.TASK_REMOTE,na.TASK_ERROR,na.TASK_ACTIVE,na.ERROR_NUM,na.JOIN_NUM,na.TASK_BELONG,na.TASK_BRANCH "
				+ "FROM " + Table.TASK_DEF_NAME + " na LEFT JOIN DISPATCH_RUNTIME_TASK ta on ta.TASK_DEF_ID = na.id WHERE na.ID = ?";// and pid=?
		Task task = null;
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, taskDefID);
		try {
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				task = new Task();
				task.setState(rs.getString("STATE"));
				task.jobDefID = rs.getString("PID");
				task.taskDefID = taskDefID;
				task.joinNum = rs.getInt("JOIN_NUM");
				task.errNum = rs.getInt("ERROR_NUM");
				task.jumpErr = rs.getString("TASK_ERROR");
				task.name = rs.getString("TASK_NAME");
				task.xor = rs.getString("TASK_BRANCH");
				task.taskType = rs.getInt("TASK_BELONG") + "";
				task.address = rs.getString("TASK_ADDRESS");
				task.parameter = rs.getString("TASK_PARAMETER");
				task.active = rs.getString("TASK_ACTIVE");
				String shellID = rs.getString("TASK_REMOTE");
				Tool.safeClose(ps);
				Tool.safeClose(rs);
				ShellServer ss = getShellServer(shellID, conn);
				task.shellServer = ss;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (task == null)
			throw new Err(Table.TASK_DEF_NAME + "没有数据id[" + taskDefID + "]");
		return task;
	}

	// 查询任务执行的服务器
	private ShellServer getShellServer(String shellID, Connection conn)
			throws SQLException {
		String sql = "SELECT REMOTE_IP,REMOTE_USER_NAME,REMOTE_PASSWD FROM DISPATCH_TASKETL_REMOTE WHERE REMOTE_IP = ?";
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, shellID);
		ResultSet rs = ps.executeQuery();
		if (!rs.next()) {
			throw new Err(shellID +":没有对应的server!");
		}
		ShellServer ss = new ShellServer();
		ss.ip = rs.getString("REMOTE_IP");
		ss.user = rs.getString("REMOTE_USER_NAME");
		ss.pwd = rs.getString("REMOTE_PASSWD");
		Tool.safeClose(ps);
		Tool.safeClose(rs);
		return ss;
	}

	private void updateTable(Task task, String msg, String status,
			Connection conn) throws SQLException, TerminatedJobException {
		// String msg = Const.TASK_STATE_OK.equals(retCode) ? this.stdMsg :
		// this.errMsg;
		String time = Const.currentDateTime();
		String sql = "UPDATE " + Table.TASK_DEF_NAME
				+ " SET END_TIME=?,TASK_STATUS=?,EXEC_RESULT=? WHERE ID=?";
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, time);
		ps.setString(2, status);
		ps.setString(3, msg);
		ps.setString(4, task.getTaskDefID());
		ps.executeUpdate();
		sql = "UPDATE " + Table.TASK_LOG_NAME
				+ " SET END_TIME=?,TASK_STATUS=?,EXEC_RESULT=? WHERE ID=?";
		ps = conn.prepareStatement(sql);
		ps.setString(1, time);
		ps.setString(2, status);
		ps.setString(3, msg);
		ps.setLong(4, task.getTaskID());
		ps.executeUpdate();

		if (Const.TASK_STATE_OK.equals(status)) {// 记录dispatch_runtime_task表的时候，要看
			sql = "UPDATE " + Table.TASK_NAME
					+ " SET STATE=?,END_TIME=? WHERE TASK_ID=?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, Const.TASK_STATE_OK);
			ps.setString(2, time);
			ps.setLong(3, task.getTaskID());
			ps.executeUpdate();
		} else {
			String logdesc = task + "脚本执行出错" + msg;
			if (task.isJumpErr()) {
				sql = "UPDATE " + Table.TASK_NAME
						+ " SET STATE=?,END_TIME=? WHERE TASK_ID=?";

				ps = conn.prepareStatement(sql);
				ps.setString(1, Const.TASK_STATE_OK);
				ps.setString(2, time);
				ps.setLong(3, task.getTaskID());
				ps.executeUpdate();
				LOG.error("流程出错" + msg + ", 但是" + task + "设置为忽略出错，执行下一任务");
				sql = "UPDATE " + Table.JOB_DEF_NAME
						+ " SET EXEC_RESULT=? WHERE ID=?";
				ps = conn.prepareStatement(sql);
				ps.setString(1, logdesc);
				ps.setString(2, task.getJobDefID());
				ps.executeUpdate();

				sql = "UPDATE " + Table.JOB_LOG_NAME
						+ " SET EXEC_RESULT=? WHERE ID=?";

				ps = conn.prepareStatement(sql);
				ps.setString(1, logdesc);
				ps.setLong(2, task.getJobID());
				ps.executeUpdate();
			} else {
				sql = "UPDATE " + Table.TASK_NAME
						+ " SET STATE=?,END_TIME=? WHERE TASK_ID=?";

				ps = conn.prepareStatement(sql);
				ps.setString(1, Const.TASK_STATE_ERROR);
				ps.setString(2, time);
				ps.setLong(3, task.getTaskID());
				ps.executeUpdate();

				// 同时更新JOB表的状态，更新流程状态 暂停(是可恢复的)
				sql = "UPDATE " + Table.JOB_NAME
						+ " SET STATE=? WHERE JOB_ID=?";

				ps = conn.prepareStatement(sql);
				ps.setString(1, Const.JOB_STATE_SUSPEND);
				ps.setLong(2, task.getJobID());
				ps.executeUpdate();

				sql = "UPDATE " + Table.JOB_DEF_NAME
						+ " SET FLOW_STATUS=? , EXEC_RESULT=? WHERE ID=?";

				ps = conn.prepareStatement(sql);
				ps.setString(1, Const.JOB_STATE_SUSPEND);
				ps.setString(2, logdesc);
				ps.setString(3, task.getJobDefID());
				ps.executeUpdate();

				sql = "UPDATE " + Table.JOB_LOG_NAME
						+ " SET TASK_STATUS=?,EXEC_RESULT=? WHERE ID=?";

				ps = conn.prepareStatement(sql);
				ps.setString(1, Const.JOB_STATE_SUSPEND);
				ps.setString(2, logdesc);
				ps.setLong(3, task.getJobID());
				ps.executeUpdate();

				// conn.commit();
				// // /会重新执行任务
				// conn.setAutoCommit(true);
				// makeSureTaskGoingon(logdesc, task, conn);

			}
		}

		conn.commit();

		// 删除文件
		String host = task.shellServer.getHost(), user = task.shellServer
				.getUser(), pwd = task.shellServer.getPwd();
		ch.ethz.ssh2.Connection connection = new ch.ethz.ssh2.Connection(host);
		Session session = null;
		try {
			connection.connect();
			boolean isAuthenticated = connection.authenticateWithPassword(user,
					pwd);
			if (!isAuthenticated) {
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
	
	private HashMap<String, String> findWorkFlowNextNodes(Connection conn,String jobDefID,
			String fromID) throws SQLException, DocumentException {
		Document doc = readXml(jobDefID,conn);
		List<Element> arraws = doc.getRootElement().element("arrows")
				.elements();
		HashMap<String, String> nodes = new HashMap<String, String>();
		for (Element arraw : arraws) {
			String from = arraw.attributeValue("from");
			if (from.equals(fromID)) {
				String to = arraw.attributeValue("to");
				if (Tool.isBlank(to) || "2".equals(to)) {
					continue;
				}
				String condition = arraw.attributeValue("name");
				nodes.put(arraw.attributeValue("to"), condition);
			}
		}
		return nodes;
	}
	
	private void initHashMap(Connection conn,Task task,ConcurrentHashMap<String, AtomicInteger> taskJoinMap,ConcurrentHashMap<String, AtomicBoolean> taskSignalMap) throws SQLException{
		String sql = "SELECT PID,TASKDEFID,JOINS,SIGNALS FROM DISPATCH_TASKETL_SIGNALHASH where TASKDEFID = ?";
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, task.getTaskDefID());
		ResultSet rs = ps.executeQuery();
		if(rs.next()){
			String key = rs.getString("PID")+"_"+task.getJobDefID();
			taskJoinMap.putIfAbsent(key, new AtomicInteger(rs.getInt("JOINS")));
			taskSignalMap.putIfAbsent(key, new AtomicBoolean(rs.getBoolean("SIGNALS")));
		}
		Tool.safeClose(rs);
		Tool.safeClose(ps);
	}

}
