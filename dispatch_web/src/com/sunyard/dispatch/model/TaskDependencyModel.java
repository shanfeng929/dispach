package com.sunyard.dispatch.model;

public class TaskDependencyModel {
	
	private Integer id;
	private String flowId;//流程号
	private String flowName;//流程名称
	private String taskId;//任务号
	private String taskName;//任务名称
	private String taskStatus;//任务状态
	private String taskDesc;//任务描述
	private String taskType;//任务类型
	private String taskPrevId;//前置任务号
	private String taskPrevName;//前置任务名称
	private String taskPrevStatus;//前置任务状态
	private String taskPrevDesc;//前置任务描述
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getFlowId() {
		return flowId;
	}
	public void setFlowId(String flowId) {
		this.flowId = flowId;
	}
	public String getFlowName() {
		return flowName;
	}
	public void setFlowName(String flowName) {
		this.flowName = flowName;
	}
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public String getTaskStatus() {
		return taskStatus;
	}
	public void setTaskStatus(String taskStatus) {
		this.taskStatus = taskStatus;
	}
	public String getTaskDesc() {
		return taskDesc;
	}
	public void setTaskDesc(String taskDesc) {
		this.taskDesc = taskDesc;
	}
	public String getTaskType() {
		return taskType;
	}
	public void setTaskType(String taskType) {
		this.taskType = taskType;
	}
	public String getTaskPrevId() {
		return taskPrevId;
	}
	public void setTaskPrevId(String taskPrevId) {
		this.taskPrevId = taskPrevId;
	}
	public String getTaskPrevName() {
		return taskPrevName;
	}
	public void setTaskPrevName(String taskPrevName) {
		this.taskPrevName = taskPrevName;
	}
	public String getTaskPrevStatus() {
		return taskPrevStatus;
	}
	public void setTaskPrevStatus(String taskPrevStatus) {
		this.taskPrevStatus = taskPrevStatus;
	}
	public String getTaskPrevDesc() {
		return taskPrevDesc;
	}
	public void setTaskPrevDesc(String taskPrevDesc) {
		this.taskPrevDesc = taskPrevDesc;
	}
	
	

}
