package com.sunyard.dispatch.model.form;

public class FlowManageForm extends Form{
	
	private String id;
	private String flowName;//流程名称
//	private String flowCnName;//流程中文名称
	private String startTime; //流程开始时间
	private String endTime; //流程结束时间
	private String flowGroupid;//流程分组ID
	private String flowGroupName;//流程分组名称
	private String flowStatus;//流程状态
	private String execResult;//最新任务错误日志
	private String workDate;//业务日期 格式YYYYMMDD或者YYYYMMDDHH
	private String creator;// 人工发起人 或，定时发起
	private String flowDesc;//流程备注
	private String createBy;//创建者
	private String createDate;//创建日期
	private String updatedBy;//更新者
	private String updatedDate;//更新日期
	private String flowNote;//操作备注
	private String flowBranch;//是否分支
	private String flowType;
	private Long jobId;
//	private Integer nextStarttime;//下一次执行时间间隔
	private String nextStartunit;//下一次执行时间间隔单位
	private String dayOfWeek;
	
	public String getDayOfWeek() {
		return dayOfWeek;
	}
	public void setDayOfWeek(String dayOfWeek) {
		this.dayOfWeek = dayOfWeek;
	}
	public Long getJobId() {
		return jobId;
	}
	public void setJobId(Long jobId) {
		this.jobId = jobId;
	}
//	public Integer getNextStarttime() {
//		return nextStarttime;
//	}
//	public void setNextStarttime(Integer nextStarttime) {
//		this.nextStarttime = nextStarttime;
//	}
	public String getNextStartunit() {
		return nextStartunit;
	}
	public void setNextStartunit(String nextStartunit) {
		this.nextStartunit = nextStartunit;
	}
	public String getFlowType() {
		return flowType;
	}
	public void setFlowType(String flowType) {
		this.flowType = flowType;
	}
	public String getFlowBranch() {
		return flowBranch;
	}
	public void setFlowBranch(String flowBranch) {
		this.flowBranch = flowBranch;
	}
	public String getFlowName() {
		return flowName;
	}
	public void setFlowName(String flowName) {
		this.flowName = flowName;
	}
//	public String getFlowCnName() {
//		return flowCnName;
//	}
//	public void setFlowCnName(String flowCnName) {
//		this.flowCnName = flowCnName;
//	}
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
	public String getWorkDate() {
		return workDate;
	}
	public void setWorkDate(String workDate) {
		this.workDate = workDate;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public String getFlowDesc() {
		return flowDesc;
	}
	public void setFlowDesc(String flowDesc) {
		this.flowDesc = flowDesc;
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
	public String getFlowNote() {
		return flowNote;
	}
	public void setFlowNote(String flowNote) {
		this.flowNote = flowNote;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
}
