package com.sunyard.dispatch.common;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.concurrent.atomic.AtomicLong;

import javax.sql.DataSource;

public class ConnPool {
	static DataSource dataSource;

	public static Connection getConn(){
		Connection conn = null;
		try {
			if(dataSource ==null){//测试用的
				String url ="jdbc:mysql://172.16.4.177:3306/dispatch?characterEncoding=UTF8";
				conn = DriverManager.getConnection(url, "root", "root-password");
				
				//String url ="jdbc:mysql://172.16.4.203:3306/chaocc?characterEncoding=UTF8";
				//conn = DriverManager.getConnection(url, "chaocc", "123456");
			}else{
				conn = dataSource.getConnection();
			}
		} catch (SQLException e) {
			throw new Err(e);
		}
		return conn;
	}
	
	public static void setDataSource(DataSource ds) {
		dataSource = ds;
		prepare();
	}
	
	private static void prepare() {
		String sql ="SELECT MAX(JOB_ID) FROM DISPATCH_RUNTIME_JOB";
		Connection conn = getConn();
		Statement stmt = null;
		ResultSet rs = null;
		try {
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			rs.next();
			long jobid = rs.getLong(1);
			rs.close();
			Const.JobPk = new AtomicLong(jobid);
			sql ="SELECT MAX(TASK_ID) FROM DISPATCH_RUNTIME_TASK";
			rs = stmt.executeQuery(sql);
			rs.next();
			long taskid = rs.getLong(1);
			Const.TaskPk = new AtomicLong(taskid);
		} catch (Exception e) {
			throw new Err(e);
		}finally{
			Tool.safeClose(rs);
			Tool.safeClose(stmt);
			Tool.safeClose(conn);
		}
	}

}
