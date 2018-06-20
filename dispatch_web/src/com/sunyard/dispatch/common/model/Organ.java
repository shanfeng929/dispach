package com.sunyard.dispatch.common.model;

import com.sunyard.dispatch.model.Model;

/**
 * 机构实体
 * <p/>
 * 
 * @author Guoyan
 * @version 1.0
 */
public class Organ extends Model {

	private static final long serialVersionUID = 1L;

	public Organ() {
		super();
	}

	public Organ(Integer id) {
		super();
		this.id = id;
	}

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
	 * 父级机构
	 */
	private Organ parent;

	/**
	 * 机构序列
	 */
	private Integer disOrder;

	/**
	 * 机构描述
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

	public String getShortName() {
		return shortName;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
	}

	public Organ getParent() {
		return parent;
	}

	public void setParent(Organ parent) {
		this.parent = parent;
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

	public void setId(Integer id) {
		this.id = id;
	}
}
