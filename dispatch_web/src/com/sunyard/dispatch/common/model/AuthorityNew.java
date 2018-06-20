package com.sunyard.dispatch.common.model;

import java.util.Date;
import java.util.List;

public class AuthorityNew {
	/**
	 * 主键
	 */
	private Integer id;

	/**
	 * 权限编码
	 */
	private String code;

	/**
	 * 权限名称
	 */
	private String name;

	/**
	 * 权限描述
	 */
	private String description;

	/**
	 * 权限类型
	 */
	private String type;
	
	private List<AuthMenu> authMenu;
	
	private List<AuthOperation> authOperation;
	
	private List<MenuBean> menus;
	
	private List<OperationNew> opeas;
	
	private Integer creator;
	
	private Integer modifier;
	
	private Date dateCreated;
	
	private Date dateUpdated;
	
	private Integer dataStatus;
	

	public Integer getCreator() {
		return creator;
	}

	public void setCreator(Integer creator) {
		this.creator = creator;
	}

	public Integer getModifier() {
		return modifier;
	}

	public void setModifier(Integer modifier) {
		this.modifier = modifier;
	}

	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}

	public Date getDateUpdated() {
		return dateUpdated;
	}

	public void setDateUpdated(Date dateUpdated) {
		this.dateUpdated = dateUpdated;
	}

	public Integer getDataStatus() {
		return dataStatus;
	}

	public void setDataStatus(Integer dataStatus) {
		this.dataStatus = dataStatus;
	}

	public List<MenuBean> getMenus() {
		return menus;
	}

	public void setMenus(List<MenuBean> menus) {
		this.menus = menus;
	}

	public List<OperationNew> getOpeas() {
		return opeas;
	}

	public void setOpeas(List<OperationNew> opeas) {
		this.opeas = opeas;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<AuthMenu> getAuthMenu() {
		return authMenu;
	}

	public void setAuthMenu(List<AuthMenu> authMenu) {
		this.authMenu = authMenu;
	}

	public List<AuthOperation> getAuthOperation() {
		return authOperation;
	}

	public void setAuthOperation(List<AuthOperation> authOperation) {
		this.authOperation = authOperation;
	}
	
}
