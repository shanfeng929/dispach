package com.sunyard.dispatch.job_bak;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.ParseException;
import java.util.Date;

import org.apache.log4j.Logger;

import com.sunyard.dispatch.common.ConnPool;
import com.sunyard.dispatch.common.Const;
import com.sunyard.dispatch.common.Table;
import com.sunyard.dispatch.common.Tool;

/**
 * 每分钟检查待启动的定时任务
 * @author weiwei
 *
 */
public class TimedJobLauncher extends Thread {
	Logger LOG = Logger.getLogger(getClass());
	public static final int ScanPeriod = 60;//一分钟
	@Override
	public void run() {
		while(true){
			
			Connection conn = ConnPool.getConn();
			Date now = new Date();
			String nowtime = Const.format.format(now);
			//dispatch_taskctl_fwdependency 的前置FLOW_PREV_ID，不看starttime了,没有的话，或独立流程才看
			
			String sql ="SELECT A.START_TIME,A.FLOW_NAME ,A.ID FROM "+Table.JOB_DEF_NAME+" A WHERE WORK_DATE=? AND FLOW_TYPE='4' AND JOB_ID=0 AND CREATOR=?"
					+ "AND A.ID NOT IN (SELECT FLOW_ID FROM  "+Table.JOB_DEPENDENCE+")";//ACTIVATE  JOB_ID>0 与xml表关联
			PreparedStatement ps = null;
			ResultSet rs = null;
			try {
				LOG.debug("定时任务"+sql);
				ps = conn.prepareStatement(sql);
				String workdate = nowtime.substring(0, 10);
				ps.setString(1, workdate);
				ps.setString(2, "1");//定时的，0是人工的
				rs = ps.executeQuery();
				while(rs.next()){
					String id = rs.getString("ID");
					String starttime = rs.getString("START_TIME");
					try {
						Date time = Const.format.parse(workdate+" "+starttime);
						long period = (now.getTime() - time.getTime())/1000;
						if((period < ScanPeriod) && (period >0) ){ // 小于分钟内的 ，才发起流程
						
							LOG.info("开始发起流程:"+id+","+rs.getString("FLOW_NAME"));
							Base.startJOB(0, id);
						}
						
					} catch (ParseException e) {
						LOG.error(Table.JOB_DEF_NAME+"字段start_time数据格式出错,id:"+id, e);
					}
				}
			} catch (Exception e) {
				LOG.error("定时启动JOB", e);
			}finally{
				Tool.safeClose(rs);
				Tool.safeClose(ps);
				Tool.safeClose(conn);
			}
			try {Thread.sleep(ScanPeriod *1000);} catch (InterruptedException e) {}
		}
		
		
	}
}
