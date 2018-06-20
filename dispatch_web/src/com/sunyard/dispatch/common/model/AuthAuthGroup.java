package com.sunyard.dispatch.common.model;

/**
 * @author lihongde
 * @date 2015-8-24 下午4:30:10
 */
public class AuthAuthGroup {
	/**
	 * 关联表中权限ID
	 */
	private Integer authId;
	/**
	 * 关联表中权限组ID
	 */
	private Integer authGroupId;

	public Integer getAuthId() {
		return authId;
	}

	public void setAuthId(Integer authId) {
		this.authId = authId;
	}

	public Integer getAuthGroupId() {
		return authGroupId;
	}

	public void setAuthGroupId(Integer authGroupId) {
		this.authGroupId = authGroupId;
	}

}
