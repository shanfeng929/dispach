package com.sunyard.dispatch.job_bak;

import com.sunyard.dispatch.common.Tool;


public class Task {
	long jobID;
	long taskID;
	String taskDefID;
	String jobDefID;
	String jumpErr;
	String taskType;//3是子流程
	String xor;
	String name;
	int joinNum;
	String address;
	String parameter;
	String timeout;//分钟
	ShellServer shellServer;
	int errNum;
	String active = "1";
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "任务定义ID["+getTaskDefID()+"],名称["+getName()+"]";
	}
	
	public boolean isJumpErr(){
		
		return "1".equals(jumpErr) ? true : false;
	}

	public boolean isSubFlow() {//现在开flowid来判断是否子流程
		
		return "3".equals(taskType) ? true : false;
	}

	public int getErrNumer(){
		if(errNum ==0)
			return 1;
		return errNum;
	}

	public void setTaskID(long taskID) {
		this.taskID = taskID;
	}

	public String getXorCondition() {
		// TODO Auto-generated method stub
		return xor;
	}

	public String getName() {
		// TODO Auto-generated method stub
		return this.name;
	}

	public String getTaskDefID() {
		// TODO Auto-generated method stub
		return this.taskDefID;
	}

	public long getJobID() {
		// TODO Auto-generated method stub
		return this.jobID;
	}

	public long getTaskID() {
		// TODO Auto-generated method stub
		return taskID;
	}

	public int getDefJoinNum() {
		if(joinNum ==0)
			return 1;
		return joinNum;
	}

	public void setJobID(long jobID) {
		// TODO Auto-generated method stub
		this.jobID = jobID;
	}

	public String getJobDefID() {
		// TODO Auto-generated method stub
		return this.jobDefID;
	}

	public long getTimeOut(){
		if(Tool.isBlank(timeout))
			return 0;
		
		return Long.parseLong(timeout) * 60 *1000;
	}

	public String getAddress() {
		return this.address;
	}

	public String getParameter() {
		// TODO Auto-generated method stub
		return this.parameter;
	}
	public boolean isActivated(){
		
		return active.trim().equals("1");
	}
}
class ShellServer{
	String ip;
	String user;
	String pwd;
	public String getHost() {
		
		return ip;
	}
	public String getUser(){
		return user;
	}
	public String getPwd(){
		return pwd;
	}
}
