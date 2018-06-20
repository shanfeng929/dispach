package com.sunyard.dispatch.common.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.sunyard.dispatch.common.model.MenuBean;


public interface MenuDao{
    
	List<Map<String, Object>> selectRootMenu();
	
	List<Map<String, Object>> selectChildrenByGroupId(Integer groupId);
	
	List<Integer> selectChildrenById(MenuBean menuBean);
	
	List<MenuBean> selectHeaderMenu(int id);
	
	void updateMenu(MenuBean menuForm);

	void insertMenu(MenuBean menuForm);

	void deleteMenu(List<Integer> ids);
	
	List<MenuBean> selectRootMenuList(@Param("pid") Integer pid, @Param("id") Integer id);
	
	List<MenuBean> selectChildMenuList(@Param("pid") Integer pid,@Param("login_name") String loginName);

}
