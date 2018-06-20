package com.sunyard.dispatch.common.model.form;

import java.util.Date;
import java.util.List;

import com.sunyard.dispatch.common.model.Organ;
import com.sunyard.dispatch.common.model.Role;
import com.sunyard.dispatch.model.form.Form;

/** 
 * @author lihongde
 * @date 2015-8-13 下午1:30:29 
 */
public class UserForm extends Form {
	/**
	 * 主键
	 */
	private Integer id;

	/**
	 * 用户编码
	 */
	private String code;

	/**
	 * 用户登陆名称
	 */
	private String loginName;

	/**
	 * 用户真实姓名
	 */
	private String realName;

	/**
	 * 用户姓首字母
	 */
	private Character alpha;

	/**
	 * 所属机构
	 */
	private Organ organ;

	/**
	 * 所含角色
	 */
	private List<Role> roles;

	/**
	 * 用户密码
	 */
	private String password;

	/**
	 * 用户联系方式
	 */
	private String phone;

	/**
	 * 用户邮箱
	 */
	private String post;


	/**
	 * 用户有效日期
	 */
	private Date expiredAt;

	/**
	 * 密码有效日期
	 */
	private Date passwordExpiredAt;
	
	private String userName;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public Character getAlpha() {
		return alpha;
	}

	public void setAlpha(Character alpha) {
		this.alpha = alpha;
	}

	public Organ getOrgan() {
		return organ;
	}

	public void setOrgan(Organ organ) {
		this.organ = organ;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPost() {
		return post;
	}

	public void setPost(String post) {
		this.post = post;
	}


	public Date getExpiredAt() {
		return expiredAt;
	}

	public void setExpiredAt(Date expiredAt) {
		this.expiredAt = expiredAt;
	}

	public Date getPasswordExpiredAt() {
		return passwordExpiredAt;
	}

	public void setPasswordExpiredAt(Date passwordExpiredAt) {
		this.passwordExpiredAt = passwordExpiredAt;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

}
