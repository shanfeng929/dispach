package com.sunyard.dispatch.common.model;

import java.util.Comparator;

public class MenuModel implements Comparator<MenuModel>{

	/**
	 * 菜单名
	 */
	private String text;

	/**
	 * 菜单ID
	 */
	private String id;

	/**
	 * 菜单对应的view
	 */
	private String view;

	/**
	 * 菜单对应的controller
	 */
	private String controller;

	/**
	 * 是否叶子节点标识
	 */
	private Boolean leaf;

	/**
	 * 菜单序列
	 */
	private String disOrder;

	/**
	 * 父节点
	 * */
	private String parentId;
	
	/**
	 * 菜单编码
	 */
	private String code;
	/**
	 * 用来标示是否显示选择框
	 */
	private Boolean checked;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getView() {
		return view;
	}

	public void setView(String view) {
		this.view = view;
	}

	public String getController() {
		return controller;
	}

	public void setController(String controller) {
		this.controller = controller;
	}

	public Boolean getLeaf() {
		return leaf;
	}

	public void setLeaf(Boolean leaf) {
		this.leaf = leaf;
	}

	public String getDisOrder() {
		return disOrder;
	}

	public void setDisOrder(String disOrder) {
		this.disOrder = disOrder;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Boolean getChecked() {
		return checked;
	}

	public void setChecked(Boolean checked) {
		this.checked = checked;
	}
	
	@Override
	public int compare(MenuModel o1, MenuModel o2) {
		// TODO 根据菜单序列比较
		if(Integer.parseInt(o1.disOrder) < Integer.parseInt(o2.disOrder))
			return -1;
		if(Integer.parseInt(o1.disOrder) > Integer.parseInt(o2.disOrder))
			return 1;
		return 0;
	}
}
