package com.sunyard.dispatch.common.model;

import java.util.List;

import com.sunyard.dispatch.model.Model;

public class RoleNew extends Model {

	private static final long serialVersionUID = 1L;
	/**
	 * 主键
	 */
	private Integer id;
	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * 角色编码
	 */
	private String code;

	/**
	 * 角色名称
	 */
	private String name;

	/**
	 * 角色权限
	 */
	private List<RoleAuth> roleAuth;

	/**
	 * 角色描述
	 */
	private String description;
	private String creatorName;
	private String modifierName;
	
	public String getCreatorName() {
		return creatorName;
	}

	public void setCreatorName(String creatorName) {
		this.creatorName = creatorName;
	}

	public String getModifierName() {
		return modifierName;
	}

	public void setModifierName(String modifierName) {
		this.modifierName = modifierName;
	}

	
	private List<Authority> authorities;

	/**
	 * 权限列表
	 */
	public List<Authority> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(List<Authority> authorities) {
		this.authorities = authorities;
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

	public List<RoleAuth> getRoleAuth() {
		return roleAuth;
	}

	public void setRoleAuth(List<RoleAuth> roleAuth) {
		this.roleAuth = roleAuth;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}

