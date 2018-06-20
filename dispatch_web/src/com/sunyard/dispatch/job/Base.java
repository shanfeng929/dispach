package com.sunyard.dispatch.job;

import java.io.StringReader;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.sunyard.dispatch.common.ConnPool;
import com.sunyard.dispatch.common.Const;
import com.sunyard.dispatch.common.Err;
import com.sunyard.dispatch.common.Table;
import com.sunyard.dispatch.common.ThreadPool;
import com.sunyard.dispatch.common.Tool;
import com.sunyard.dispatch.job.serverModel.DispatchDataSource;
import com.sunyard.dispatch.job.serverModel.ShellServer;
import com.sunyard.dispatch.util.EncryptionDecryption;

public class Base {
	protected Connection conn;
	protected PreparedStatement ps;
	protected ResultSet rs;
	protected static long Scanperiod = 5000L;
	protected Logger LOG = Logger.getLogger(getClass());

	protected int update(String sql, Object[] elements) throws SQLException {
		int vINT = 0;
		try {
			setPreparedValues(sql, elements);
			vINT = ps.executeUpdate();
		} finally {
			Tool.safeClose(ps);
		}
		return vINT;
	}

	protected ResultSet select(String sql, Object[] elements)
			throws SQLException {
		setPreparedValues(sql, elements);
		// rowset.populate(new ResultSetWrapper(rs));//Invalid precision value.
		// Cannot be less than zero
		rs = ps.executeQuery();
		return rs;
	}

	protected void setPreparedValues(String sql, Object[] elements)
			throws SQLException {
		if (conn == null) {
			throw new Err("没有连接DB");
		}
		// if(elements ==null){
		// LOG.debug(sql);
		// }else{
		// LOG.debug(sql +"|"+Arrays.toString(elements));
		// }
		ps = conn.prepareStatement(sql);
		if (elements != null && elements.length != 0) {
			for (int i = 0; i < elements.length; i++) {
				Object obj = elements[i];
				if (obj instanceof java.util.Date) {
					Date d = (java.util.Date) obj;
					ps.setDate(i + 1, new java.sql.Date(d.getTime()));
				} else {
					ps.setObject(i + 1, obj);
				}
			}
		}
	}

	protected void closeAll() {
		Tool.safeClose(rs);
		Tool.safeClose(ps);
		try {
			if (conn != null && !conn.isClosed()) {
				conn.setAutoCommit(true);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		Tool.safeClose(conn);
	}

	protected void openConnection() {
		closeAll();// 为确保之前的DB连接已释放
		this.conn = ConnPool.getConn();
		/* this.conn = ConnPool_TCP.getConn(); */
	}

	protected long queryForLong(String sql, Object[] elements)
			throws SQLException {
		Object o = queryForObject(sql, elements);
		return Long.parseLong(o.toString());
	}

	protected Object queryForObject(String sql, Object[] elements)
			throws SQLException {
		Object o = null;
		rs = select(sql, elements);
		if (rs.next()) {
			o = rs.getObject(1);
		}
		Tool.safeClose(rs);
		Tool.safeClose(ps);
		return o;
	}

	protected String queryForString(String sql, Object[] elements)
			throws SQLException {
		String str = null;
		rs = select(sql, elements);
		if (rs.next()) {
			str = rs.getString(1);
		}
		Tool.safeClose(rs);
		Tool.safeClose(ps);
		return str;
	}

	protected void primaryKeyIncrease(String tabName) throws SQLException {
		CallableStatement pc = conn.prepareCall("{CALL GETID(?)}");
		pc.setString(1, tabName);
		pc.execute();
		Tool.safeClose(pc);
	}

	protected Task getTask(String taskDefID) {
		String sql = "SELECT PID,TASK_NAME,TASK_ADDRESS,TASK_PARAMETER,TASK_REMOTE,TASK_ERROR,TASK_ACTIVE,ERROR_NUM,JOIN_NUM,TASK_BELONG,TASK_BRANCH "
				+ "FROM " + Table.TASK_DEF_NAME + " WHERE ID=? ";// and pid=?
		Object[] elements = new Object[] { taskDefID };
		Task task = null;
		try {
			rs = select(sql, elements);
			if (rs.next()) {
				task = new Task();
				task.jobDefID = rs.getString("PID");
				task.taskDefID = taskDefID;
				task.joinNum = rs.getInt("JOIN_NUM");
				task.errNum = rs.getInt("ERROR_NUM");
				task.jumpErr = rs.getString("TASK_ERROR");
				task.name = rs.getString("TASK_NAME");
				task.branch = rs.getString("TASK_BRANCH");
				task.taskType = rs.getInt("TASK_BELONG") + "";
				task.address = rs.getString("TASK_ADDRESS");
				task.parameter = rs.getString("TASK_PARAMETER");
				task.active = rs.getString("TASK_ACTIVE");
				String shellID = rs.getString("TASK_REMOTE");
				task.shellServer = null;
				task.dataSource = null;
				if (Const.TASK_TYPE_LINUX.equals(task.taskType)) {
					ShellServer ss = new ShellServer();
					Tool.safeClose(ps);
					Tool.safeClose(rs);
					sql = "SELECT REMOTE_IP,REMOTE_USER_NAME,REMOTE_PASSWD,REMOTE_PORT,REMOTE_NAMESPACE FROM "
							+ Table.SHELL_SERVER + " WHERE ID=?";
					rs = select(sql, new Object[] { shellID });
					if (!rs.next()) {
						throw new Err("任务id[" + taskDefID + "]对应的task_remote为["
								+ shellID + "], 而表[" + Table.SHELL_SERVER
								+ "]中没有对应的服务器信息");
					}
					ss.ip = rs.getString("REMOTE_IP");
					ss.user = rs.getString("REMOTE_USER_NAME");
					ss.pwd = new EncryptionDecryption().decrypt(rs
							.getString("REMOTE_PASSWD"));
					task.shellServer = ss;
				} else if (Const.TASK_TYPE_SQL.equals(task.taskType)
						|| Const.TASK_TYPE_ALARM_SINGLE.equals(task.taskType)
						|| Const.TASK_TYPE_ALARM_TITLE.equals(task.taskType)
						|| Const.TASK_TYPE_ALARM_MULTIPLE.equals(task.taskType)) {
					DispatchDataSource dds = new DispatchDataSource();
					Tool.safeClose(ps);
					Tool.safeClose(rs);
					sql = "SELECT * FROM DISPATCH_TASKETL_DATASOURCE WHERE DB_ID=?";
					rs = select(sql, new Object[] { shellID });
					if (!rs.next()) {
						throw new Err("任务id[" + taskDefID + "]对应的task_remote为["
								+ shellID + "], 而表[" + Table.DATA_SOURCE
								+ "]中没有对应的数据源信息");
					}
					dds.setDbId(rs.getInt(1));
					dds.setDbName(rs.getString(2));
					dds.setDriverName(rs.getString(3));
					dds.setDbUrl(rs.getString(4));
					dds.setUserName(rs.getString(5));
					dds.setPassword(rs.getString(6));
					dds.setPassword(new EncryptionDecryption().decrypt(dds
							.getPassword()));
					task.dataSource = dds;
				} else if (Const.TASK_TYPE_JAVA.equals(task.taskType)) {
					task.setClassName(task.getParameter());// 注意这句
																			// 是把暂时放在parameter字段的ClassName取出来，要放在真的parameters赋值之前。
				}

				
				Tool.safeClose(ps);
				Tool.safeClose(rs);

				/*
				 * sql =
				 * "SELECT PARANAME,PARAVALUE FROM DISPATCH_TASKETL_TASKPARAS WHERE TASKID=?"
				 * ; rs = select(sql, new Object[] { taskDefID }); if
				 * (Const.TASK_TYPE_LINUX.equals(task.taskType)) { StringBuffer
				 * parameter = new StringBuffer(); while (rs.next()) {
				 * parameter.append(" ").append(rs.getString("PARANAME"))
				 * .append('=').append(rs.getString("PARAVALUE")); }
				 * task.parameter = parameter.toString().trim(); } else if
				 * (Const.TASK_TYPE_SQL.equals(task.taskType)) { List<Object>
				 * parameterlist = new ArrayList<Object>(); while (rs.next()) {
				 * parameterlist.add(rs.getString("PARAVALUE")); }
				 * task.sqlParameter = parameterlist.toArray(); }
				 */

				/*
				 * // if (task.taskType.equals(Const.TASK_TYPE_LINUX)) { sql =
				 * "SELECT REMOTE_IP,REMOTE_USER_NAME,REMOTE_PASSWD,REMOTE_PORT,REMOTE_NAMESPACE FROM "
				 * + Table.SHELL_SERVER + " WHERE ID=?"; rs = select(sql, new
				 * Object[] { shellID }); if (!rs.next()) { throw new
				 * Err("任务id[" + taskDefID + "]对应的task_remote为[" + shellID +
				 * "], 而表[" + Table.SHELL_SERVER + "]中没有对应的服务器信息"); } ss.ip =
				 * rs.getString("REMOTE_IP"); ss.user =
				 * rs.getString("REMOTE_USER_NAME"); ss.pwd = new
				 * EncryptionDecryption
				 * ().decrypt(rs.getString("REMOTE_PASSWD")); if
				 * ("5".equals(task.taskType)) { DBServer ss1 = (DBServer) ss;
				 * ss1.port = rs.getInt("REMOTE_PORT"); ss1.namespace =
				 * rs.getString("REMOTE_NAMESPACE"); ss = ss1; // }
				 * task.shellServer = ss; }
				 */
				Tool.safeClose(ps);
				Tool.safeClose(rs);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (task == null)
			throw new Err(Table.TASK_DEF_NAME + "没有数据id[" + taskDefID + "]");
		return task;
	}

	// 用来找到汇聚节点前的前置节点，因为执行该汇聚节点前，这些前置节点必须都已经完成
	protected HashSet<String> findPreNodes(String jobDefID, String toID)
			throws SQLException, DocumentException {
		Document doc = this.readXml(jobDefID);
		List<Element> arraws = doc.getRootElement().element("arrows")
				.elements();
		HashSet<String> nodes = new HashSet<String>();
		for (Element arraw : arraws) {
			String to = arraw.attributeValue("to");
			if (to.equals(toID)) {
				nodes.add(arraw.attributeValue("from"));
			}
		}
		return nodes;
	}

	protected HashMap<String, String> findWorkFlowNextNodes(String jobDefID,
			String fromID) throws SQLException, DocumentException {
		Document doc = this.readXml(jobDefID);
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

	Document readXml(String jobDefID) throws SQLException, DocumentException {
		String sql = "SELECT XML FROM " + Table.JOB_DEF_XML
				+ " WHERE FLOW_ID=?";
		String xml = this.queryForString(sql, new Object[] { jobDefID });
		if (xml == null)
			throw new Err(Table.JOB_DEF_XML + "中没有flow_id=" + jobDefID);
		SAXReader reader = new SAXReader();
		// System.out.println(xml);//测试
		Document doc = reader.read(new StringReader(xml));
		return doc;
	}

	/**
	 * 子流程做为节点时，需要通过XML获取joinNum值
	 */
	protected int getNodeJoinNum(String jobDefID, String nodeID)
			throws SQLException, DocumentException {
		Document doc = this.readXml(jobDefID);
		Element ele = doc.getRootElement().elementByID(nodeID);
		if (ele == null) {
			// return 1;
			throw new Err(Table.JOB_DEF_XML + "中flow_id[" + jobDefID
					+ "]的xml中，ID属性(ID必须大写)值为" + nodeID + "的节点不存在");
		}
		String joinNum = ele.attributeValue("joinNum");
		return Tool.isBlank(joinNum) ? 1 : Integer.parseInt(joinNum);
	}

	public static void startJOB(final long parentJobID, final String jobDefID) {
		Runnable runnable = new Runnable() {
			@Override
			public void run() {
				try {
					new Job().startJob(parentJobID, jobDefID);
				} catch (Exception e) {
					e.printStackTrace();
				}

			}
		};
		ThreadPool.execute(runnable);
	}
}
