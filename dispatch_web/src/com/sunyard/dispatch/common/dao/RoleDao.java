package com.sunyard.dispatch.common.dao;

import java.util.List;

import com.sunyard.dispatch.common.model.RoleNew;
import com.sunyard.dispatch.common.model.form.RoleForm;

public interface RoleDao {
	List<RoleNew> queryAllRole(RoleForm roleForm);

	int getCount(RoleForm roleForm);

	void saveRole(RoleNew role);

	void updateRole(RoleNew role);

	RoleNew selectOneRoleById(Integer id);

	void batchDelete(List<Integer> list);

	Integer repeatedRole(RoleNew roleNew);

	String selectRoleNameById(Integer id);


}
