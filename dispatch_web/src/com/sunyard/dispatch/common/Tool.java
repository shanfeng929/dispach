package com.sunyard.dispatch.common;

import java.io.Closeable;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.log4j.Logger;
import org.wltea.expression.ExpressionEvaluator;
import org.wltea.expression.datameta.Variable;

public class Tool {
	static Logger LOG =Logger.getLogger(Tool.class);

	public static boolean isBlank(Object o){
		if(o ==null){
			return true;
		}
		if(o.toString().trim().equals("")){
			return true;
		}
		return false;
	}

	
	public static void rollBack(Connection conn){
		try {
			if(conn !=null)
				conn.rollback();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void safeClose(Closeable closeable) {
        if (closeable != null) {
            try {
                closeable.close();
            } catch (IOException e) {
            }
        }
    }
	public static void safeClose(Statement closeable) {
        if (closeable != null) {
            try {
                closeable.close();
            } catch (SQLException e) {
            }
        }
    }
	public static void safeClose(Connection closeable) {
        if (closeable != null) {
            try {
            	if( !closeable.isClosed()){
            		closeable.close();
            	}
            	closeable = null;
            } catch (SQLException e) {
            }
        }
    }

	public static void safeClose(ResultSet rs) {
		if (rs != null) {
            try {
            	rs.close();
            } catch (SQLException e) {
            }
        }
		
	}
	
	public static String readShell(InputStream instream) {
		InputStreamReader reader = new InputStreamReader(instream);
		StringBuilder sb = new StringBuilder();
		while (true) {
			char[] arr = new char[512];
			int read = 0;
			try {
				read = reader.read(arr, 0, arr.length);
			} catch (IOException e) {e.printStackTrace();}
			if (read < 0)
				break;
			sb.append(new String(arr, 0, read));
		}
		Tool.safeClose(reader);
		Tool.safeClose(instream);
		return sb.toString();
	}
	
	public static synchronized long generatePK(String tname) throws SQLException{
		java.sql.Connection cn = null;
		try {
			 cn= ConnPool.getConn();
			 CallableStatement pc = cn.prepareCall("{call getID(?)}");
			 pc.setString(1, tname);
			 pc.execute();
			 Tool.safeClose(pc);
			 Statement stmt = cn.createStatement();
			 ResultSet res = stmt.executeQuery("select current_val from "+tname);
			 res.next();
			 long lg = res.getLong(1);
			 Tool.safeClose(res);
			 Tool.safeClose(stmt);
			 return lg;
		}finally{
			Tool.safeClose(cn);
		}
	}
	
	public static boolean pass(HashMap<String, Object> paramsMap,String expression) {
		if(isBlank(expression)){
			return true;
		}
		expression = expression.replaceAll("&gt;", ">");
		expression = expression.replaceAll("&lt;", "<");
		expression = expression.replaceAll("&quot;", "'");
		List<String> vals = getVariables_(expression);
		List<Variable> variables = new ArrayList<Variable>();
		for (String val : vals) {
			Object value = paramsMap.get(val);
			if(value ==null){
				//continue;
				throw new Err("没有定义过流程变量["+val+"]");
			}
			if(value instanceof String){
				value =value.toString().replaceAll("'", "");
			}
			System.out.println(val+"----"+value);
			variables.add(Variable.createVariable(val, value));
		}
		expression = expression.replaceAll("'", "");
		return (Boolean) ExpressionEvaluator.evaluate(expression, variables);
	}
	
	private static List<String> getVariables_(String expression) {
		List<String> ls=new ArrayList<String>();
		String regex="[\"'](.*?)[\"']|(([\"']){0,}[a-zA-Z_0-9]([\"']){0,}){1,}";
		Pattern pt = Pattern.compile(regex);
		Matcher mt = pt.matcher(expression);
		String str="";
		while (mt.find()) {
			str=mt.group().replaceAll("([\"'](.*?)[\"'])|(^([0-9]){1,})", "");
			if(!"".equals(str)&&str!=null){
				ls.add(str);
				System.out.println(str);
			}
		}
		return ls;
	}
	
	public static void main(String[] args) {
		HashMap<String , Object> paramsMap = new HashMap<String, Object>();
		paramsMap.put("name", "Lucien");
		paramsMap.put("age", new Integer(20));
//		String expression = 
		boolean flag = Tool.pass(paramsMap, "name==\"Lucien\"&&age<25");
		System.out.println(flag);
	}

}
