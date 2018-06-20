package com.sunyard.dispatch.common.dao;

import java.util.List;
import java.util.Map;

import com.sunyard.dispatch.common.model.AuthAuthGroup;
import com.sunyard.dispatch.common.model.Authority;
import com.sunyard.dispatch.common.model.form.AuthorityGroupForm;

/**
 * @author fengqibei
 * @date 2015-8-24 上午11:57:17
 */
public interface AuthorityGroupDao {

	List<Map<String, Object>> selectRootAuthorityGroup();

	List<Map<String, Object>> selectChildrenByGroupId(Integer groupId);

	List<Authority> queryAuthority();

	List<Authority> querySelectAuthority(Integer id);

	Integer repeatedAuthority(AuthorityGroupForm authorityGroupForm);

	String selectNameById(Integer id);

	void updateAuthorityGroup(AuthorityGroupForm authorityGroupForm);

	void deleteAuthAuthGroup(Integer id);

	void insertAuthAuthGroup(List<AuthAuthGroup> authAuthGroup);

	Integer insertAuthGroup(AuthorityGroupForm authorityGroupForm);

	void deleteAuthorityGroup(Integer id);//删除权限组（1）
	
	void deleteAuthorityGroups(Integer id);//删除权限组下面的对应权限（2）
}
