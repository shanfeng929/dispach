package com.sunyard.dispatch.common.dao;

import java.util.List;
import java.util.Map;

import com.sunyard.dispatch.common.model.Authority;
import com.sunyard.dispatch.common.model.AuthorityNew;

public interface AuthorityDao {

	List<Authority> selectAuthorityContainsOperations();

	List<Map<String, Object>> selectRootAuthorityGroup();

	List<Map<String, Object>> selectChildrenByGroupId(Integer groupId);

	List<Map<String, Object>> selectAuthorityByGroupId(Integer groupId);
	
	List<Authority> queryAllAuth();
	
	List<Map<String, Object>> selectRootAuthority();
	
	void insertAuth(AuthorityNew auth);
	
	void updateAuth(AuthorityNew auth);
	
	AuthorityNew selectOneAuth(Integer authId);
	
	void delete(Integer authId);
	
	void deleteAuthMenu(Integer authId);
	
	void deleteAuthGrp(Integer authId);
	
	void deleteAuthRole(Integer authId);
	
	List<Integer> selectAllMenu();
	
	Integer repeatedAuthName(AuthorityNew auth);
	
	Integer repeatedAuthCode(AuthorityNew auth);
	
}
