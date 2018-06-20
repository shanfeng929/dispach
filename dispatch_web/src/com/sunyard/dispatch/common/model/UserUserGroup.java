package com.sunyard.dispatch.common.model;

/**
 * @author fengqibei
 * @date 2015-8-22 下午4:36:22
 */
public class UserUserGroup {

    /**
     * 关联表中用户ID
     */
    private Integer userId;
    /**
     * 关联表中用户组ID
     */
    private Integer userGroupId;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getUserGroupId() {
        return userGroupId;
    }

    public void setUserGroupId(Integer userGroupId) {
        this.userGroupId = userGroupId;
    }
}
