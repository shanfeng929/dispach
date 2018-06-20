package com.sunyard.dispatch.model;

public class TaskManageModel {
	
	private String id;//
	private String pid;//所属流程ID
	private String pname;//所属流程名称
	private String taskName;//任务名称
	private String taskCnName;//任务中文名称
	private String startTime;//任务开始时间
	private String endTime;//任务结束时间
	private Integer taskBelong;//任务组件所属类型 
	private String taskBelongName;//任务组件所属类型名称
	private String taskStatus;//任务状态
	private String taskAddress;//任务执行地址或执行代码或ID
	private String taskParameter;//任务执行参数
	private String execResult;//任务执行返回结果
	private String taskDesc;//任务备注
	private String createBy;//创建者
	private String createDate;//创建日期
	private String updatedBy;//更新者
	private String updatedDate;//更新日期
	private Integer joinNum;//聚合数量
	private String taskRemote;//远程地址
	private String taskError;//是否容错
	private String taskActive;//是否激活
	private String taskCustom;//任务自定义条件
	private Integer errorNum;//错误次数
	private String taskBranch;//是否分支
	private Integer taskLoop;//循环次数
	
	public Integer getTaskLoop() {
		return taskLoop;
	}
	public void setTaskLoop(Integer taskLoop) {
		this.taskLoop = taskLoop;
	}
	public String getTaskBranch() {
		return taskBranch;
	}
	public void setTaskBranch(String taskBranch) {
		this.taskBranch = taskBranch;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	public String getTaskBelongName() {
		return taskBelongName;
	}
	public void setTaskBelongName(String taskBelongName) {
		this.taskBelongName = taskBelongName;
	}
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
	public String getTaskCnName() {
		return taskCnName;
	}
	public void setTaskCnName(String taskCnName) {
		this.taskCnName = taskCnName;
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
	public Integer getTaskBelong() {
		return taskBelong;
	}
	public void setTaskBelong(Integer taskBelong) {
		this.taskBelong = taskBelong;
	}
	public String getTaskStatus() {
		return taskStatus;
	}
	public void setTaskStatus(String taskStatus) {
		this.taskStatus = taskStatus;
	}
	public String getTaskAddress() {
		return taskAddress;
	}
	public void setTaskAddress(String taskAddress) {
		this.taskAddress = taskAddress;
	}
	public String getTaskParameter() {
		return taskParameter;
	}
	public void setTaskParameter(String taskParameter) {
		this.taskParameter = taskParameter;
	}
	public String getExecResult() {
		return execResult;
	}
	public void setExecResult(String execResult) {
		this.execResult = execResult;
	}
	public String getTaskDesc() {
		return taskDesc;
	}
	public void setTaskDesc(String taskDesc) {
		this.taskDesc = taskDesc;
	}
	public String getCreateBy() {
		return createBy;
	}
	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public String getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
	public String getUpdatedDate() {
		return updatedDate;
	}
	public void setUpdatedDate(String updatedDate) {
		this.updatedDate = updatedDate;
	}
	public Integer getJoinNum() {
		return joinNum;
	}
	public void setJoinNum(Integer joinNum) {
		this.joinNum = joinNum;
	}
	public String getTaskRemote() {
		return taskRemote;
	}
	public void setTaskRemote(String taskRemote) {
		this.taskRemote = taskRemote;
	}
	public String getTaskError() {
		return taskError;
	}
	public void setTaskError(String taskError) {
		this.taskError = taskError;
	}
	public String getTaskActive() {
		return taskActive;
	}
	public void setTaskActive(String taskActive) {
		this.taskActive = taskActive;
	}
	public String getTaskCustom() {
		return taskCustom;
	}
	public void setTaskCustom(String taskCustom) {
		this.taskCustom = taskCustom;
	}
	public Integer getErrorNum() {
		return errorNum;
	}
	public void setErrorNum(Integer errorNum) {
		this.errorNum = errorNum;
	}
	
	

}
