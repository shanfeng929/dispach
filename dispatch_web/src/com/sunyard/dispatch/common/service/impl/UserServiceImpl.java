package com.sunyard.dispatch.common.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.common.dao.UserDao;
import com.sunyard.dispatch.common.model.Authority;
import com.sunyard.dispatch.common.model.Role;
import com.sunyard.dispatch.common.model.User;
import com.sunyard.dispatch.common.model.UserGrid;
import com.sunyard.dispatch.common.model.UserGroup;
import com.sunyard.dispatch.common.model.UserOrgan;
import com.sunyard.dispatch.common.model.UserRole;
import com.sunyard.dispatch.common.model.UserUserGroup;
import com.sunyard.dispatch.common.model.form.UserForm;
import com.sunyard.dispatch.common.service.UserService;
import com.sunyard.dispatch.security.SecurityUtil;
import com.sunyard.dispatch.security.authentication.CustomUserDetails;
import com.sunyard.dispatch.util.Configuration;

@Service("userService")
public class UserServiceImpl implements UserService {

	@Resource
	private UserDao userDao;

	@Override
	public void updatePassword(Integer id, String oldPassword, String rawPassword) throws IllegalArgumentException {
	}

	@Override
	public User findUniqueUserByLoginName(String loginName) {
		return userDao.findUniqueUserByLoginName(loginName);
	}

	@Override
	public UserDetails loadUserByUsername(String loginName) throws UsernameNotFoundException {
		User user = this.findUniqueUserByLoginName(loginName);
		Configuration configuration = Configuration.getInstance();
		configuration.setUser(user);
		if (null == user) {
			throw new UsernameNotFoundException(loginName);
		}
		Set<SimpleGrantedAuthority> authorities = new HashSet<SimpleGrantedAuthority>();
		for (Role role : user.getRoles()) {
			for (Authority authority : role.getAuthorities()) {
				authorities.add(SecurityUtil.createAuthority("AUTH_" + authority.getCode()));
			}
		}
		CustomUserDetails ret = new CustomUserDetails(user, authorities);
		return ret;
	}

	@Override
	public Page<UserGrid> getUserListByName(UserForm form) {
		try {
			form.setLoginName( java.net.URLDecoder.decode(form.getLoginName(),"UTF-8"));
		} catch (UnsupportedEncodingException e) {
			  
			// TODO Auto-generated catch block  
			e.printStackTrace();  
			
		}
		
		Integer total = userDao.count(form);
		List<User> userList = userDao.findUserListByName(form);
		List<UserGrid> userGrids = new ArrayList<UserGrid>();
		for (int i = 0; i < userList.size(); i++) {
			UserGrid userGrid = new UserGrid();
			userGrid.setId(userList.get(i).getId());
			userGrid.setLoginName(userList.get(i).getLoginName());
			userGrid.setRealName(userList.get(i).getRealName());
			userGrid.setOrganName(userList.get(i).getOrgan()==null ? null:userList.get(i).getOrgan().getName());
			userGrid.setDataStatus(userList.get(i).getDataStatus());
			userGrid.setPhone(userList.get(i).getPhone());
			userGrid.setPost(userList.get(i).getPost());
			StringBuffer roleName = new StringBuffer();
			if(userList.get(i).getRoles() != null){
				
				for (int j = 0; j < userList.get(i).getRoles().size(); j++) {
					roleName.append(userList.get(i).getRoles().get(j).getName() + " ");
					
				}
			}
			userGrid.setRoles(roleName.toString());
			userGrids.add(userGrid);
		}
		return new Page<UserGrid>(form.getPage(), form.getLimit(), total, userGrids);
	}

	@Override
	public String selectLgName(UserForm userForm) {
		return userDao.selectLgNameById(userForm.getId());
	}

	@Override
	public void disabledUser(ArrayList<Integer> list) {
		userDao.disabledUser(list);
	}

	@Override
	public List<User> selectUserById(Integer id) {
		User user = userDao.selectUserById(id);
		List<User> list = new ArrayList<User>();
		list.add(user);
		return list;
	}

	@Override
	public Integer repeatedUser(UserForm userForm) {
		return userDao.repeatedUser(userForm);
	}

	@Override
	public void repeatedPwd(String[] idsArray) {
		for(String id : idsArray){
			
			userDao.resetPwd(Integer.valueOf(id));
		}
	}

	@Override
	public void modifyUser(UserForm userForm, List<Integer> roleIds, Integer organCode, Integer userGroupId) {
		List<UserRole> list = new ArrayList<UserRole>();
		BCryptPasswordEncoder passen= new BCryptPasswordEncoder();
		Integer id = userForm.getId();
		if(userForm.getPassword().length() < 13){
			userForm.setPassword(passen.encode(userForm.getPassword()));
		}
		// 删除用户用户组中间表数据
		userDao.deleteUserUserGroup(id);
		List<UserUserGroup> list1 = new ArrayList<UserUserGroup>();
		UserUserGroup userUserGroup = new UserUserGroup();
		userUserGroup.setUserId(id);
		userUserGroup.setUserGroupId(userGroupId);
		list1.add(userUserGroup);
		// 插入用户用户组表
		//userDao.insertUserUserGroup(list1);

		for (int i = 0; i < roleIds.size(); i++) {
			UserRole userRole = new UserRole();
			userRole.setUserId(id);
			userRole.setRoleId(roleIds.get(i));
			list.add(userRole);
		}
		UserOrgan userOrgan = new UserOrgan();
		userOrgan.setUserId(id);
		userOrgan.setOrganId(organCode);
		userDao.modifyUserTb(userForm);
		userDao.modifyUserOrganTb(userOrgan);
		userDao.deleteUrRe(userForm);
		userDao.insertUrRe(list);
	}

	@Override
	public void insertUser(UserForm userForm, List<Integer> roleIds, Integer organCode, Integer userGroupId) {
		BCryptPasswordEncoder passen= new BCryptPasswordEncoder();
		List<UserRole> list = new ArrayList<UserRole>();
		if(userForm.getPassword().isEmpty())
		{
			userForm.setPassword("$2a$10$D6enx5E4W3JvKHus8YcAPOrj8OLnjL.y9eTUvY91EMIA9yejYwiTa");
		}
		else
		{
			userForm.setPassword(passen.encode(userForm.getPassword()));
		}
		userDao.insertUserTb(userForm); // 插入用户表
		Integer id = userForm.getId();
		UserOrgan userOrgan = new UserOrgan();
		userOrgan.setUserId(id);
		userOrgan.setOrganId(organCode);
		userDao.insertUserOrgan(userOrgan);

		List<UserUserGroup> list1 = new ArrayList<UserUserGroup>();
		UserUserGroup userUserGroup = new UserUserGroup();
		userUserGroup.setUserId(id);
		userUserGroup.setUserGroupId(userGroupId);
		list1.add(userUserGroup);
		// 插入用户用户组表
		//userDao.insertUserUserGroup(list1);

		for (int i = 0; i < roleIds.size(); i++) {
			UserRole userRole = new UserRole();
			userRole.setUserId(id);
			userRole.setRoleId(roleIds.get(i));
			list.add(userRole);
		}
		userDao.insertUrRe(list); // 批量插入中间表
	}

	public UserGroup defaultUserGroup() {
		return userDao.defaultUserGroup();
	}

	@Override
	public void modifyPwd(Integer id, String password) {
		userDao.modifyPassword(id, password);
	}
	
	@Override
	public void deleteById(String[] idsArray) {
		for(String id : idsArray){
			System.out.println(id);
			userDao.deleteUserById(Integer.valueOf(id));
		}
		
	}

	@Override
	public List<Map<String, Object>> getCurrency() {
		// TODO Auto-generated method stub
		return userDao.selectCurrency();
	}
}
