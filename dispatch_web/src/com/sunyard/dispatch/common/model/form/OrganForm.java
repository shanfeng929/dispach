package com.sunyard.dispatch.common.model.form;

import com.sunyard.dispatch.model.Model;

/**
 * 
 * 
 * @author fengqibei
 * @version 1.0
 */
public class OrganForm extends Model {

	/**
	 * 主键
	 */
	private Integer id;

	/**
	 * 机构编码(CODE)
	 */
	private String code;

	/**
	 * 机构名称
	 */
	private String name;

	/**
	 * 机构名称缩写
	 */
	private String shortName;

	/**
	 * 机构层级关系
	 */
	private String path;

	/**
	 * 父级机构
	 */
	private Integer parentId;

	/**
	 * 是否叶子结点
	 */
	private Boolean leaf;

	/**
	 * 机构序列
	 */
	private Integer disOrder;

	/**
	 * 机构描述
	 */
	private String description;

	/**
	 * 机构类型
	 */
	private String type;
	
	
	private String loginName;

	// private Integer dataStatus;

	@Override
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

	public String getShortName() {
		return shortName;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
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

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public Integer getDataStatus() {
		return dataStatus;
	}

	public void setDataStatus(Integer dataStatus) {
		this.dataStatus = dataStatus;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

}
