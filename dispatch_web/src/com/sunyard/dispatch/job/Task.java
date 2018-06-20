package com.sunyard.dispatch.job;

import com.sunyard.dispatch.common.Tool;
import com.sunyard.dispatch.job.serverModel.DispatchDataSource;
import com.sunyard.dispatch.job.serverModel.ShellServer;

public class Task {
	public long jobID;
	public long taskID;
	public String taskDefID;
	public String jobDefID;
	public String jumpErr;
	public String taskType;// 3是子流程
	public String xor;
	public String name;
	public int joinNum;
	public String className;
	public String address;
	public String parameter;
	public String timeout;// 分钟
	public ShellServer shellServer;
	public DispatchDataSource dataSource;
	public int errNum;
	private String state;
	public String active = "1";
	public Object[] sqlParameter = new Object[] {};
	String branch;// 1是分支，0是并行
	boolean real = true; // 是否真实需要运行，add by weilai

	public ShellServer getShellServer() {
		return shellServer;
	}

	public void setShellServer(ShellServer shellServer) {
		this.shellServer = shellServer;
	}

	public DispatchDataSource getDataSource() {
		return dataSource;
	}

	public void setDataSource(DispatchDataSource dataSource) {
		this.dataSource = dataSource;
	}

	public boolean isReal() {
		return real;
	}

	public void setReal(boolean real) {
		this.real = real;
	}

	@Override
	public String toString() {
		return "任务定义ID[" + getTaskDefID() + "],名称[" + getName() + "]";
	}

	public boolean isJumpErr() {
		return "1".equals(jumpErr) ? true : false;
	}

	public boolean isSubFlow() {// 现在开flowid来判断是否子流程
		return "3".equals(taskType) ? true : false;
	}

	public int getErrNumer() {
		if (errNum == 0)
			return 1;
		return errNum;
	}

	public void setTaskID(long taskID) {
		this.taskID = taskID;
	}

	public String getBranch() {
		return branch;
	}

	public String getName() {
		return this.name;
	}

	public String getTaskDefID() {
		return this.taskDefID;
	}

	public long getJobID() {
		return this.jobID;
	}

	public long getTaskID() {
		return taskID;
	}

	public int getDefJoinNum() {
		if (joinNum == 0)
			return 1;
		return joinNum;
	}

	public void setJobID(long jobID) {
		this.jobID = jobID;
	}

	public String getJobDefID() {
		return this.jobDefID;
	}

	public long getTimeOut() {
		if (Tool.isBlank(timeout))
			return 0;
		return Long.parseLong(timeout) * 60 * 1000;
	}

	public String getAddress() {
		return this.address;
	}

	public String getParameter() {
		return this.parameter;
	}

	public Object[] getSqlParameter() {
		return this.sqlParameter;
	}

	public boolean isActivated() {
		return active.trim().equals("1");
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getTaskType() {
		return taskType;
	}

	public void setTaskType(String taskType) {
		this.taskType = taskType;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}
}
