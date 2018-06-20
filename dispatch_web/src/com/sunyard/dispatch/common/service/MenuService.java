package com.sunyard.dispatch.common.service;

import java.util.List;
import java.util.Map;

import com.sunyard.dispatch.common.model.MenuBean;
import com.sunyard.dispatch.common.model.MenuModel;
import com.sunyard.dispatch.common.model.User;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


public interface MenuService {
	/**
	 * @description
	 * 			修改权限部分菜单的加载方式，变为直接加载
	 * @author 	lss
	 * @param  authId 权限编码
	 * @return 	List<MenuModel>
	 * @version 1.0.1
	 * @date    2015/10/30
	 * */
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	List<Map<String, Object>> revealMenuTree(Integer authId);

	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	List<Map<String, Object>> revealMenuTree();
	
	@Transactional
	void updateMenu(MenuBean menuForm);

	@Transactional
	void deleteMenu(MenuBean menuForm);
	
	/**
	 * @description 
	 * 			修改页面展示结构,将原有Menu组件类型菜单转换成左侧功能树样式,提供父级菜单查询接口
	 * @author 	LiHao
	 * @param  	父节点ID、主键ID
	 * @return 	List<ExtMenu>
	 * @version 1.0.1
	 * @date    2015/10/21   
	 * */
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	List<MenuModel> selectRootMenuList(Integer pid, Integer id);
	
	/**
	 * @description 
	 * 			修改页面展示结构,将原有Menu组件类型菜单转换成左侧功能树样式,提供下级菜单查询接口
	 * @author 	LiHao
	 * @param  	父节点ID
	 * @return 	List<ExtMenu>
	 * @version 1.0.1
	 * @date    2015/10/21
	 * @update 2015/10/26 添加User 用来权限控制
	 * */
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	List<MenuModel> selectChildMenuList(Integer pid,User user);

}
