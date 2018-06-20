package com.sunyard.dispatch.model;

public class FlowGroupModel {
	
	private Integer id;
	private String flowGroupName;//流程分组名称
	private String flowGroupDesc;//流程分组备注
	private String createBy; //创建者
	private String createDate;//创建日期
	private String updatedBy;//更新者
	private String updatedDate;//更新日期
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getFlowGroupName() {
		return flowGroupName;
	}
	public void setFlowGroupName(String flowGroupName) {
		this.flowGroupName = flowGroupName;
	}
	public String getFlowGroupDesc() {
		return flowGroupDesc;
	}
	public void setFlowGroupDesc(String flowGroupDesc) {
		this.flowGroupDesc = flowGroupDesc;
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
	
}
