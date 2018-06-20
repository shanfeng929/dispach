package com.sunyard.dispatch.common.model;

import com.sunyard.dispatch.model.Model;

public class UserGroup extends Model {

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

    /**
     * 用户组父节点ID
     */
    private Integer parentId;
    
    public Integer getId() {
        return id;
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

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public void setId(Integer id) {
        this.id = id;
    }

}
