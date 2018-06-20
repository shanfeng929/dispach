package com.sunyard.dispatch.common.model;

import com.sunyard.dispatch.model.Model;

public class RoleAuth extends Model{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Integer roleId;
	
	private Integer authId;

	public Integer getId() {
		return null;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public Integer getAuthId() {
		return authId;
	}

	public void setAuthId(Integer authId) {
		this.authId = authId;
	}
}
