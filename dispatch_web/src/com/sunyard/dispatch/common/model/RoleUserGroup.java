package com.sunyard.dispatch.common.model;

/** 
 * @author fengqibei
 * @date 2015-8-22 下午4:36:50 
 */
public class RoleUserGroup {
	/**
	 * 关联表中角色ID
	 */
	private Integer roleId;
	/**
	 * 关联表中用户组ID
	 */
	private Integer userGroupId;
	public Integer getRoleId() {
		return roleId;
	}
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	public Integer getUserGroupId() {
		return userGroupId;
	}
	public void setUserGroupId(Integer userGroupId) {
		this.userGroupId = userGroupId;
	}
	
}
