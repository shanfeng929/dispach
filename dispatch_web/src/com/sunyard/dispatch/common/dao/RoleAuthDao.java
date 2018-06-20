package com.sunyard.dispatch.common.dao;

import java.util.List;

import com.sunyard.dispatch.common.model.RoleAuth;

public interface RoleAuthDao {

	void saveRoleAuth(RoleAuth roleAuth);

	void updateRoleAuth(RoleAuth roleAuth);

	void deleteRoleAuth(Integer roleId);
	
	List<Integer> selectUserAuth(int id);
}
