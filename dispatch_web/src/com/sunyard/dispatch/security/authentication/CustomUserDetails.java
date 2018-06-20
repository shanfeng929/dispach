package com.sunyard.dispatch.security.authentication;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.sunyard.dispatch.common.model.MenuModel;
import com.sunyard.dispatch.common.model.Organ;

public class CustomUserDetails extends User {

	private static final long serialVersionUID = 1L;

	private com.sunyard.dispatch.common.model.User user;
	private Organ organ;
	private String loginName;
	private String realName;
	private String code;
	private List<MenuModel> menuTree;

	public CustomUserDetails(com.sunyard.dispatch.common.model.User user,
			Collection<? extends GrantedAuthority> authorities) {
		super(user.getLoginName(), user.getPassword(),true, true,
				true, true, authorities);
		this.user = user;
		this.organ = user.getOrgan();
		this.loginName = user.getLoginName();
		this.realName = user.getRealName();
		this.code = user.getCode();
		this.menuTree = buildMenus();
	}

	@Override
	public String toString() {
		return super.toString() ; // + "; Code: " + code + "; Organ: " + realName + "; Organ: " + organ.getId();
	}

	public com.sunyard.dispatch.common.model.User getUser() {
		return user;
	}

	public void setUser(com.sunyard.dispatch.common.model.User user) {
		this.user = user;
	}

	public Organ getOrgan() {
		return organ;
	}

	public void setOrgan(Organ organ) {
		this.organ = organ;
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

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public List<MenuModel> getMenuTree() {
		return menuTree;
	}

	public void setMenuTree(List<MenuModel> menuTree) {
		this.menuTree = menuTree;
	}

	private List<MenuModel> buildMenus() {
		return null;
	}

	@Override
	public boolean equals(Object rhs) {
		if(rhs instanceof User) {
			return loginName.equals(((CustomUserDetails)rhs).loginName);
		}
		return super.equals(rhs);
	}
}
