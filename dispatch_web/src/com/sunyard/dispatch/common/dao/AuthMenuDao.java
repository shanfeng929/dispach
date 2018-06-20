package com.sunyard.dispatch.common.dao;

import java.util.List;

import com.sunyard.dispatch.common.model.AuthMenu;

public interface AuthMenuDao {
	
	void insertAuthMenu(AuthMenu authMenu);
	
	void updateAuthMenu(AuthMenu authMenu);
	
	void delete(Integer id);
	
	List<AuthMenu> selectAllAuthMenu(Integer authId);
}
