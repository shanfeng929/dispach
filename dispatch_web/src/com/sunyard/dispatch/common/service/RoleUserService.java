package com.sunyard.dispatch.common.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.sunyard.dispatch.common.model.Role;

/**
 * @author fengqibei
 * @date 2015-8-15 下午4:56:22
 */
public interface RoleUserService {

	@Transactional
	public List<Role> getRoles();
}
