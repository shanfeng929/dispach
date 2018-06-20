package com.sunyard.dispatch.model;

public class FlowHistoryModel {
	
	private String id;
	private String flowId;
	private String flowName;//流程名称
	private String flowDesc;//流程备注
	private String startTime; //流程开始时间
	private String endTime; //流程结束时间
	private String duration;//endTime - startTime
	private String flowGroupid;//流程分组ID
	private String flowGroupName;//流程分组名称
	private String flowStatus;//流程状态
	private String execResult;//最新任务错误日志
	
	public String getFlowId() {
		return flowId;
	}
	public void setFlowId(String flowId) {
		this.flowId = flowId;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFlowName() {
		return flowName;
	}
	public void setFlowName(String flowName) {
		this.flowName = flowName;
	}
	public String getFlowDesc() {
		return flowDesc;
	}
	public void setFlowDesc(String flowDesc) {
		this.flowDesc = flowDesc;
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
	public String getFlowGroupid() {
		return flowGroupid;
	}
	public void setFlowGroupid(String flowGroupid) {
		this.flowGroupid = flowGroupid;
	}
	public String getFlowGroupName() {
		return flowGroupName;
	}
	public void setFlowGroupName(String flowGroupName) {
		this.flowGroupName = flowGroupName;
	}
	public String getFlowStatus() {
		return flowStatus;
	}
	public void setFlowStatus(String flowStatus) {
		this.flowStatus = flowStatus;
	}
	public String getExecResult() {
		return execResult;
	}
	public void setExecResult(String execResult) {
		this.execResult = execResult;
	}
	
}
