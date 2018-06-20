package com.sunyard.dispatch.model.form;


/**
 * 
 * ClassName: EtlFlowDisPatchForm <br/>  
 * Function: 流程表单. <br/>  
 * Reason: TODO ADD REASON(可选). <br/>  
 * date: 2016年3月23日 下午4:34:56 <br/>  
 *  
 * @author CCC  
 * @version   
 * @since JDK 1.6
 */
public class EtlFlowDisPatchForm {

	private String id; // id
	private String flowName; //流程名称
//	private String flowCnName;//流程中文名称
	private String flowGroup;//流程分组
	private String flowDesc;//流程备注
	private String workDate;//开始执行日期
	private String startTime;//开始执行时间
	private String creator;//手工还是定时触发
	private String branch;//是否主流程
	private String updateBy;//更新人
	private String createBy;//创建人
//	private String nextStart;//下次更新时间;
	private String nextStartUnit;//下次更新时间单位;
	private Integer joinNum;
	
	public Integer getJoinNum() {
		return joinNum;
	}
	public void setJoinNum(Integer joinNum) {
		this.joinNum = joinNum;
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
//	public String getFlowCnName() {
//		return flowCnName;
//	}
//	public void setFlowCnName(String flowCnName) {
//		this.flowCnName = flowCnName;
//	}
	public String getFlowGroup() {
		return flowGroup;
	}
	public void setFlowGroup(String flowGroup) {
		this.flowGroup = flowGroup;
	}
	public String getFlowDesc() {
		return flowDesc;
	}
	public void setFlowDesc(String flowDesc) {
		this.flowDesc = flowDesc;
	}
	public String getWorkDate() {
		return workDate;
	}
	public void setWorkDate(String workDate) {
		this.workDate = workDate;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public String getUpdateBy() {
		return updateBy;
	}
	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}
	public String getCreateBy() {
		return createBy;
	}
	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
//	public String getNextStart() {
//		return nextStart;
//	}
//	public void setNextStart(String nextStart) {
//		this.nextStart = nextStart;
//	}
	public String getNextStartUnit() {
		return nextStartUnit;
	}
	public void setNextStartUnit(String nextStartUnit) {
		this.nextStartUnit = nextStartUnit;
	}
}
