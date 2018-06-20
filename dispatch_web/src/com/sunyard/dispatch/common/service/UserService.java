package com.sunyard.dispatch.common.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.common.model.User;
import com.sunyard.dispatch.common.model.UserGrid;
import com.sunyard.dispatch.common.model.UserGroup;
import com.sunyard.dispatch.common.model.form.UserForm;
import com.sunyard.dispatch.security.authentication.CustomUserDetailsService;

public interface UserService extends CustomUserDetailsService {

	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	User findUniqueUserByLoginName(String loginName);

	public Page<UserGrid> getUserListByName(UserForm from);

	@Transactional
	public void disabledUser(ArrayList<Integer> list);

	public List<User> selectUserById(Integer id);

	@Transactional
	public Integer repeatedUser(UserForm userForm);

	public String selectLgName(UserForm userForm);

	@Transactional
	public void repeatedPwd(String[] idsArray);
	
	@Transactional
	public void modifyPwd(Integer id, String password);

	@Transactional
	public void modifyUser(UserForm userForm, List<Integer> roleIds, Integer organCode, Integer userGroupId);

	@Transactional
	public void insertUser(UserForm userForm, List<Integer> roleIds, Integer organCode, Integer userGroupId);

	UserGroup defaultUserGroup();
	@Transactional
	public void deleteById(String[] idsArray);
	@Transactional
	List<Map<String, Object>> getCurrency();
}
