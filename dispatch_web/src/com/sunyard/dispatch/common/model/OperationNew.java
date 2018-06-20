package com.sunyard.dispatch.common.model;

public class OperationNew {
	/**
	 * 主键
	 */
	private Integer id;

	/**
	 * 操作编码
	 */
	private String code;

	/**
	 * 操作名称
	 */
	private String name;
	/**
	 * 是否叶子结点
	 */
	private Boolean leaf;

	/**
	 * 操作序列
	 */
	private Integer disOrder;

	/**
	 * 拦截前缀
	 */
	private String prefix;

	/**
	 * 拦截后缀
	 */
	private String suffix;

	/**
	 * 操作描述
	 */
	private String description;
	


	
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

	public Boolean getLeaf() {
		return leaf;
	}

	public void setLeaf(Boolean leaf) {
		this.leaf = leaf;
	}

	public Integer getDisOrder() {
		return disOrder;
	}

	public void setDisOrder(Integer disOrder) {
		this.disOrder = disOrder;
	}

	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public String getSuffix() {
		return suffix;
	}

	public void setSuffix(String suffix) {
		this.suffix = suffix;
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
