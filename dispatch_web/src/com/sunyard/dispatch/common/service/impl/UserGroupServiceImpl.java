package com.sunyard.dispatch.common.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.sunyard.dispatch.common.dao.UserGroupDao;
import com.sunyard.dispatch.common.model.Role;
import com.sunyard.dispatch.common.model.RoleUserGroup;
import com.sunyard.dispatch.common.model.User;
import com.sunyard.dispatch.common.model.UserGroup;
import com.sunyard.dispatch.common.service.UserGroupService;

/**
 * @author fengqibei
 * @date 2015-8-19 下午4:58:45
 */
@Service("userGroupService")
public class UserGroupServiceImpl implements UserGroupService {
	@Resource
	private UserGroupDao userGroupDao;

	// 查出用户组的树
	public List<Map<String, Object>> revealUserGroupTree() {
		// List<Map<String, Object>> tree = new ArrayList<Map<String,
		// Object>>();
		List<Map<String, Object>> datas = new ArrayList<Map<String, Object>>();

		List<Map<String, Object>> nodes = userGroupDao.selectRootUserGroup();
		for (Map<String, Object> node : nodes) {
			Map<String, Object> treeMap = convertToLowercaseMap(node);
			List<Map<String, Object>> childrens = recursiveTree(Integer.parseInt(treeMap.get("id").toString()));
			if (childrens != null && childrens.size() > 0) {
				treeMap.put("children", childrens);
			} else {
				treeMap.put("leaf", true);
			}
			datas.add(treeMap);
		}

		return datas;
	}

	private Map<String, Object> convertToLowercaseMap(Map<String, Object> node) {
		Map<String, Object> ret = new HashMap<String, Object>();
		Iterator<Entry<String, Object>> iterator = node.entrySet().iterator();
		while (iterator.hasNext()) {
			Entry<String, Object> tmp = iterator.next();
			ret.put(tmp.getKey().toLowerCase(), tmp.getValue());
		}
		return ret;
	}

	public List<Map<String, Object>> recursiveTree(Integer organId) {
		List<Map<String, Object>> data = new ArrayList<Map<String, Object>>();
		Map<String, Object> child = new HashMap<String, Object>();
		List<Map<String, Object>> childrenNodes = userGroupDao.selectChildrenByGroupId(organId);
		if (childrenNodes != null && childrenNodes.size() > 0) {
			for (Map<String, Object> map : childrenNodes) {
				child = convertToLowercaseMap(map);
				child.put("expanded", true);
				List<Map<String, Object>> children = recursiveTree(Integer.parseInt(child.get("id").toString()));
				if (children != null && children.size() > 0) {
					child.put("children", children);
				} else {
					child.put("leaf", true);
				}
				data.add(child);
			}
		}
		return data;
	}

	public List<User> queryUsers() {
		return userGroupDao.queryUsers();
	}

	public List<User> querySelectUser(Integer id) {
		return userGroupDao.querySelectUser(id);
	}

	public List<Role> querySelectRole(Integer id) {
		return userGroupDao.querySelectRole(id);
	}

	public Integer repeatedUserGroup(UserGroup userGroup) {
		return userGroupDao.repeatedUserGroup(userGroup);
	}

	public void insertUserGroup(UserGroup userGroup, List<Integer> roles) {
		userGroupDao.insertUserGroup(userGroup); // 获取插入用户组表的ID
		Integer userGroupId = userGroup.getId();
		List<RoleUserGroup> list2 = new ArrayList<RoleUserGroup>();

		for (int j = 0; j < roles.size(); j++) {
			RoleUserGroup roleUserGroup = new RoleUserGroup();
			roleUserGroup.setUserGroupId(userGroupId);
			roleUserGroup.setRoleId(roles.get(j));
			list2.add(roleUserGroup);
		}

		// 批量插入角色用户组表
		userGroupDao.insertRoleUserGroup(list2);
	}

	public String selectUserGpName(UserGroup userGroup) {
		return userGroupDao.selectUserGpName(userGroup.getId());
	}

	public void momdifyUserGroup(UserGroup userGroup, List<Integer> roles) {
		userGroupDao.updateUserGroup(userGroup); // 更新用户组表
		userGroupDao.deleteRoleUserGroup(userGroup.getId());// 删除角色用户组表

		List<RoleUserGroup> list2 = new ArrayList<RoleUserGroup>();

		for (int j = 0; j < roles.size(); j++) {
			RoleUserGroup roleUserGroup = new RoleUserGroup();
			roleUserGroup.setUserGroupId(userGroup.getId());
			roleUserGroup.setRoleId(roles.get(j));
			list2.add(roleUserGroup);
		}

		// 批量插入角色用户组表
		userGroupDao.insertRoleUserGroup(list2);

	}

	public void deleteUserGroup(Integer id) {
		userGroupDao.deleteUserGroup(id);
	}

}
