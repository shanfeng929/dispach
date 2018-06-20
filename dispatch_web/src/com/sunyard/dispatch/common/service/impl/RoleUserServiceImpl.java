package com.sunyard.dispatch.common.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.sunyard.dispatch.common.dao.RoleUserDao;
import com.sunyard.dispatch.common.model.Role;
import com.sunyard.dispatch.common.service.RoleUserService;

/**
 * @author fengqibei
 * @date 2015-8-15 下午4:58:00
 */
@Service
public class RoleUserServiceImpl implements RoleUserService {
	@Resource
	private RoleUserDao roleUserDao;

	@Override
	public List<Role> getRoles() {
		return roleUserDao.getRoles();
	}

}
