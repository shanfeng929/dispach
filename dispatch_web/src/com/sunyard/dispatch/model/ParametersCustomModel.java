package com.sunyard.dispatch.model;
/**
 * 用户自定义常用参数的MODEL
 * @author WeiLai
 *
 */
public class ParametersCustomModel {
	private Integer custom_para_id;
	private String custom_para_type;
	private String custom_para_name;
	private String custom_para_value;
	private Integer deletable;
	public Integer getCustom_para_id() {
		return custom_para_id;
	}
	public void setCustom_para_id(Integer custom_para_id) {
		this.custom_para_id = custom_para_id;
	}
	public String getCustom_para_type() {
		return custom_para_type;
	}
	public void setCustom_para_type(String custom_para_type) {
		this.custom_para_type = custom_para_type;
	}
	public String getCustom_para_name() {
		return custom_para_name;
	}
	public void setCustom_para_name(String custom_para_name) {
		this.custom_para_name = custom_para_name;
	}
	public String getCustom_para_value() {
		return custom_para_value;
	}
	public void setCustom_para_value(String custom_para_value) {
		this.custom_para_value = custom_para_value;
	}
	public Integer getDeletable() {
		return deletable;
	}
	public void setDeletable(Integer deletable) {
		this.deletable = deletable;
	}
	
}
