package com.sunyard.dispatch.common.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.common.model.RoleGrid;
import com.sunyard.dispatch.common.model.RoleNew;
import com.sunyard.dispatch.common.model.form.RoleForm;

public interface RoleService {
	
    Page<RoleGrid> getRoleByName(RoleForm roleForm);
	
	@Transactional
	void saveRole(RoleNew role);
	
	@Transactional
	void updateOneRole(RoleNew role);
	
	@Transactional
	void batchDeleteRole(List<Integer> list);
	
	List<RoleNew> queryOneRole(Integer id);
	
	Integer repeatedRole(RoleNew roleNew);

	String selectRoleName(RoleNew roleNew);

}
