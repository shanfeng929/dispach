package com.sunyard.dispatch.common.service;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.sunyard.dispatch.common.model.Role;
import com.sunyard.dispatch.common.model.User;
import com.sunyard.dispatch.common.model.UserGroup;

/**
 * @author fengqibei
 * @date 2015-8-19 下午4:58:08
 */
public interface UserGroupService {

	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	List<Map<String, Object>> revealUserGroupTree();

	List<User> queryUsers();

	List<User> querySelectUser(Integer id);

	List<Role> querySelectRole(Integer id);

	Integer repeatedUserGroup(UserGroup userGroup);

	@Transactional
	void insertUserGroup(UserGroup userGroup, List<Integer> roles);

	String selectUserGpName(UserGroup userGroup);

	@Transactional
	void momdifyUserGroup(UserGroup userGroup, List<Integer> roles);

	@Transactional
	void deleteUserGroup(Integer id);

}
