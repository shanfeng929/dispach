package com.sunyard.dispatch.common.model.form;

import java.util.Date;
import java.util.List;

import com.sunyard.dispatch.common.model.Authority;
import com.sunyard.dispatch.model.form.Form;

public class RoleForm extends Form{
	/**
	 * 主键
	 */
	private Integer id;

	/**
	 * 角色编码
	 */
	private String code;

	/**
	 * 角色名称
	 */
	private String name;

	/**
	 * 权限列表
	 */
	private List<Authority> authorities;

	/**
	 * 角色描述
	 */
	private String description;

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

	public List<Authority> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(List<Authority> authorities) {
		this.authorities = authorities;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
