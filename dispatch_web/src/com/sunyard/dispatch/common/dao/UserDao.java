package com.sunyard.dispatch.common.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.sunyard.dispatch.common.model.User;
import com.sunyard.dispatch.common.model.UserGroup;
import com.sunyard.dispatch.common.model.UserOrgan;
import com.sunyard.dispatch.common.model.UserRole;
import com.sunyard.dispatch.common.model.UserUserGroup;
import com.sunyard.dispatch.common.model.form.UserForm;

public interface UserDao {

	User findUniqueUserByLoginName(String loginName);

	Integer count(UserForm form);

	List<User> findUserListByName(UserForm form);

	void saveUser(User user);

	void disabledUser(ArrayList<Integer> list);

	User selectUserById(Integer id);

	String selectLgNameById(Integer id);

	Integer repeatedUser(UserForm userForm);

	void resetPwd(Integer id);

	// 修改已经存在的用户
	void modifyUserTb(UserForm userForm); // 更新用户表中的数据
	
	void modifyUserOrganTb(UserOrgan userOrgan); // 更新用户机构关联表中的数据

	void deleteUrRe(UserForm userForm); // 删除中间表的该用户数据

	void insertUrRe(List<UserRole> list); // 插入中间表记录
	// 新增用户

	Integer insertUserTb(UserForm userForm);

	// 查出默认用户组
	UserGroup defaultUserGroup();

	// 删除用户组用户组表中的数据
	void deleteUserUserGroup(Integer id);

	// 插入用户用户组表
	void insertUserUserGroup(List<UserUserGroup> list);
	
	void modifyPassword(Integer id, String password);
	//删除用户
	void deleteUserById(Integer id);
	
	List<Integer> selectUserRole(Integer id);

	void insertUserOrgan(UserOrgan userOrgan);

	List<Map<String, Object>> selectCurrency();
}
