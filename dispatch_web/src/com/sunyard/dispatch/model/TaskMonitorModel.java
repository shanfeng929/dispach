package com.sunyard.dispatch.model;

public class TaskMonitorModel {

	private String id;
	private String pid;
	private String taskName;
	private String taskDesc;
	private String startTime;
	private String endTime;
	private Integer duration;
	private String taskBelong;
	private String taskStatus;
	private String execResult;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public String getTaskDesc() {
		return taskDesc;
	}
	public void setTaskDesc(String taskDesc) {
		this.taskDesc = taskDesc;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public Integer getDuration() {
		return duration;
	}
	public void setDuration(Integer duration) {
		this.duration = duration;
	}
	public String getTaskBelong() {
		return taskBelong;
	}
	public void setTaskBelong(String taskBelong) {
		this.taskBelong = taskBelong;
	}
	public String getTaskStatus() {
		return taskStatus;
	}
	public void setTaskStatus(String taskStatus) {
		this.taskStatus = taskStatus;
	}
	public String getExecResult() {
		return execResult;
	}
	public void setExecResult(String execResult) {
		this.execResult = execResult;
	}
	
}
