package com.sunyard.dispatch.common.dao;

import java.util.List;
import java.util.Map;

import com.sunyard.dispatch.common.model.Role;
import com.sunyard.dispatch.common.model.RoleUserGroup;
import com.sunyard.dispatch.common.model.User;
import com.sunyard.dispatch.common.model.UserGroup;
import com.sunyard.dispatch.common.model.UserUserGroup;

/**
 * @author fengqibei
 * @date 2015-8-19 下午5:00:02
 */
public interface UserGroupDao {
	List<Map<String, Object>> selectRootUserGroup();

	List<Map<String, Object>> selectChildrenByGroupId(Integer groupId);

	List<Map<String, Object>> selectUserByGroupId(Integer groupId);

	List<User> queryUsers();

	List<User> querySelectUser(Integer id);

	List<Role> querySelectRole(Integer id);

	Integer repeatedUserGroup(UserGroup userGroup);

	Integer insertUserGroup(UserGroup userGroup);

	void insertUserUserGroup(List<UserUserGroup> lists);

	void insertRoleUserGroup(List<RoleUserGroup> list);

	// 根据ID查找该用户原来得用户组名字
	String selectUserGpName(Integer id);

	// 更新用户组表数据
	void updateUserGroup(UserGroup userGroup);

	// 删除中间表数据
	void deleteUserUserGroup(Integer id);

	void deleteRoleUserGroup(Integer id);

	// 删除UserGroup
	void deleteUserGroup(Integer id);
	
	Integer selectUserGpId(Integer id);
	
	List<Integer> selectUserGpRole(Integer id);

}
