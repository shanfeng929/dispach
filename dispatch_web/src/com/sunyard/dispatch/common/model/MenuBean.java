package com.sunyard.dispatch.common.model;

import com.sunyard.dispatch.model.Model;

/**
 * 菜单实体 统一使用 controller view 驼峰命名规则
 */
public class MenuBean extends Model{

	
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	
	private String text;

	private String code;

	private String controller;
	
	private String cls;
	
	private Integer parentId;
	
	private String view;
	
	private Integer leaf;
	
	private String description;
	
	private Integer disOrder;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getCls() {
		return cls;
	}

	public void setCls(String cls) {
		this.cls = cls;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public String getView() {
		return view;
	}

	public void setView(String view) {
		this.view = view;
	}

	public Integer getLeaf() {
		return leaf;
	}

	public void setLeaf(Integer leaf) {
		this.leaf = leaf;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getDisOrder() {
		return disOrder;
	}

	public void setDisOrder(Integer disOrder) {
		this.disOrder = disOrder;
	}

	public String getController() {
		return controller;
	}

	public void setController(String controller) {
		this.controller = controller;
	}
}
