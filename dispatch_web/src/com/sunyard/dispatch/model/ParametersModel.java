package com.sunyard.dispatch.model;

/**
 * 参数设定功能的MODEL
 * 
 * @author WeiLai
 *
 */
public class ParametersModel {
	private Integer para_id;
	private String para_name;
	private String para_comment;
	private String para_type;
	private String para_value;
	private String static_para;
	private String create_by;
	private String create_date;
	private String update_by;
	private String update_date;

	public Integer getPara_id() {
		return para_id;
	}

	public void setPara_id(Integer para_id) {
		this.para_id = para_id;
	}

	public String getPara_name() {
		return para_name;
	}

	public void setPara_name(String para_name) {
		this.para_name = para_name;
	}

	public String getPara_comment() {
		return para_comment;
	}

	public void setPara_comment(String para_comment) {
		this.para_comment = para_comment;
	}

	public String getPara_type() {
		return para_type;
	}

	public void setPara_type(String para_type) {
		this.para_type = para_type;
	}

	public String getPara_value() {
		return para_value;
	}

	public void setPara_value(String para_value) {
		this.para_value = para_value;
	}

	public String getStatic_para() {
		return static_para;
	}

	public void setStatic_para(String static_para) {
		this.static_para = static_para;
	}

	public String getCreate_by() {
		return create_by;
	}

	public void setCreate_by(String create_by) {
		this.create_by = create_by;
	}

	public String getCreate_date() {
		return create_date;
	}

	public void setCreate_date(String create_date) {
		this.create_date = create_date;
	}

	public String getUpdate_by() {
		return update_by;
	}

	public void setUpdate_by(String update_by) {
		this.update_by = update_by;
	}

	public String getUpdate_date() {
		return update_date;
	}

	public void setUpdate_date(String update_date) {
		this.update_date = update_date;
	}
}
