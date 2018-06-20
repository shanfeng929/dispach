package com.sunyard.dispatch.common.model;

import java.util.List;

import com.sunyard.dispatch.model.Model;

/**
 * 角色实体
 * <p/>
 * 
 * @author Guoyan
 * @version 1.0
 */
public class Role extends Model {

	private static final long serialVersionUID = 1L;

	public Role() {
		super();
	}

	public Role(Integer id) {
		super();
		this.id = id;
	}

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

	public void setId(Integer id) {
		this.id = id;
	}
}
