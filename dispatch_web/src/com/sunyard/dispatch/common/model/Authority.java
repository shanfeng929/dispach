package com.sunyard.dispatch.common.model;

import java.util.List;

import com.sunyard.dispatch.model.Model;

/**
 * 资源实体
 * <p/>
 * 
 * @author Guoyan
 * @version 1.0
 */
public class Authority extends Model {

	private static final long serialVersionUID = 1L;

	public Authority() {
		super();
	}

	public Authority(Integer id) {
		this.id = id;
	}

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
	 * 资源列表
	 */
	private List<Resource> resources;

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

	public List<Resource> getResources() {
		return resources;
	}

	public void setResources(List<Resource> resources) {
		this.resources = resources;
	}

	public void setId(Integer id) {
		this.id = id;
	}
}
