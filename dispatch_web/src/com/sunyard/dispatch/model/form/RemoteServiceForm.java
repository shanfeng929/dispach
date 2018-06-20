package com.sunyard.dispatch.model.form;

public class RemoteServiceForm extends Form{

	
	private Integer id;
	private String name;
	private String remoteIp;
	private String remoteType;
	private String remoteUserName;
	private String remotePasswd;
	private int remotePort;
	private String remoteNameSpace;
	public int getRemotePort() {
		return remotePort;
	}
	public void setRemotePort(int remotePort) {
		this.remotePort = remotePort;
	}
	public String getRemoteNameSpace() {
		return remoteNameSpace;
	}
	public void setRemoteNameSpace(String remoteNameSpace) {
		this.remoteNameSpace = remoteNameSpace;
	}
	private String remoteDesc;
	private String createBy;
	private String createDate;
	private String updatedBy;
	private String updatedDate;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getRemoteIp() {
		return remoteIp;
	}
	public void setRemoteIp(String remoteIp) {
		this.remoteIp = remoteIp;
	}
	public String getRemoteType() {
		return remoteType;
	}
	public void setRemoteType(String remoteType) {
		this.remoteType = remoteType;
	}
	public String getRemoteUserName() {
		return remoteUserName;
	}
	public void setRemoteUserName(String remoteUserName) {
		this.remoteUserName = remoteUserName;
	}
	public String getRemotePasswd() {
		return remotePasswd;
	}
	public void setRemotePasswd(String remotePasswd) {
		this.remotePasswd = remotePasswd;
	}
	public String getRemoteDesc() {
		return remoteDesc;
	}
	public void setRemoteDesc(String remoteDesc) {
		this.remoteDesc = remoteDesc;
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
