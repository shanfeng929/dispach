package com.sunyard.dispatch.common.model;

/**
 * @author fengqibei
 * @date 2015-8-15 下午2:22:38
 */
public class UserRole {

    /**
     * 关联表中用户ID
     */
    private Integer userId;

    /**
     * 关联表中角色ID
     */
    private Integer roleId;

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
