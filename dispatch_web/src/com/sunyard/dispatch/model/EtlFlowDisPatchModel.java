package com.sunyard.dispatch.model;


/**
 * 
 * ClassName: EtlFlowDisPatchModel <br/>  
 * Function: 流程模型. <br/>  
 * Reason: TODO ADD REASON(可选). <br/>  
 * date: 2016年3月31日 上午11:38:53 <br/>  
 *  
 * @author CCC  
 * @version   
 * @since JDK 1.6
 */
public class EtlFlowDisPatchModel {

	private String id;//ID号
	private String pid;//pid
	private String flowGroupName;//流程分组名称
	private String flowName;//流程名称
//	private String flowCnName;//流程中文名称
	private String isSubflow;//是否为子流程
	private String joinNum;//聚合数量
	private String flowId;//流程名称
	private String username;//操作人
	private String xml;//流程xml格式
	private String SQL;//sql代码
	private String loadData;//前台界面样式
	private String flowDesc;//流程备注
	private String updateBy;//修改人
	private String tempId;//临时ID；

	public String getFlowGroupName() {
		return flowGroupName;
	}
	public void setFlowGroupName(String flowGroupName) {
		this.flowGroupName = flowGroupName;
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
	public String getIsSubflow() {
		return isSubflow;
	}
	public void setIsSubflow(String isSubflow) {
		this.isSubflow = isSubflow;
	}

	public String getFlowId() {
		return flowId;
	}
	public void setFlowId(String flowId) {
		this.flowId = flowId;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getXml() {
		return xml;
	}
	public void setXml(String xml) {
		this.xml = xml;
	}
	public String getSQL() {
		return SQL;
	}
	public void setSQL(String sQL) {
		SQL = sQL;
	}
	public String getJoinNum() {
		return joinNum;
	}
	public void setJoinNum(String joinNum) {
		this.joinNum = joinNum;
	}
	public String getLoadData() {
		return loadData;
	}
	public void setLoadData(String loadData) {
		this.loadData = loadData;
	}
	public String getFlowDesc() {
		return flowDesc;
	}
	public void setFlowDesc(String flowDesc) {
		this.flowDesc = flowDesc;
	}
	public String getUpdateBy() {
		return updateBy;
	}
	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}
	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	public String getTempId() {
		return tempId;
	}
	public void setTempId(String tempId) {
		this.tempId = tempId;
	}
	

}
