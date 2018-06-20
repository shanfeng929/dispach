package com.sunyard.dispatch.common.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.sunyard.dispatch.common.dao.AuthMenuDao;
import com.sunyard.dispatch.common.dao.MenuDao;
import com.sunyard.dispatch.common.dao.RoleAuthDao;
import com.sunyard.dispatch.common.dao.UserDao;
import com.sunyard.dispatch.common.dao.UserGroupDao;
import com.sunyard.dispatch.common.model.AuthMenu;
import com.sunyard.dispatch.common.model.MenuBean;
import com.sunyard.dispatch.common.model.MenuModel;
import com.sunyard.dispatch.common.model.Role;
import com.sunyard.dispatch.common.model.User;
import com.sunyard.dispatch.common.service.MenuService;
import com.sunyard.dispatch.util.Constant;

@Service
public class MenuServiceImpl implements MenuService{
	@Resource
	MenuDao menuDao;
	@Resource
	AuthMenuDao authMenu;
	@Resource	
	UserDao userDao;
	@Resource
	UserGroupDao userGroupDao;
	@Resource
	RoleAuthDao roleAuthDao;

	/**
	 * 1 在权限处用到了 用作给菜单赋权限
	 * @param authId
	 * @return
	 */
	@Override
	public List<Map<String, Object>> revealMenuTree(Integer authId) {
		List<Map<String, Object>> tree  = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> datas  = new ArrayList<Map<String, Object>>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("text", "菜单管理");
		map.put("expanded", "true");
		map.put("leaf", "false");
		List<Map<String, Object>> nodes = menuDao.selectRootMenu();
		List<AuthMenu> selectAllAuthMenu = authMenu.selectAllAuthMenu(authId);
		for(Map<String, Object> node :nodes){
			Map<String, Object> treeMap = convertToLowercaseMap(node);
			if(selectAllAuthMenu!=null&&selectAllAuthMenu.size()>0){
				for(AuthMenu auth : selectAllAuthMenu){
					if(auth.getMenuId()==Integer.parseInt(treeMap.get("id").toString())){
						treeMap.put("checked", true);
						break;
					}else{
						treeMap.put("checked", false);
					}
				}
				map.put("checked", true);
			}else{
				map.put("checked", false);
				treeMap.put("checked", false);
			}
			List<Map<String, Object>> childrens = recursiveTree(Integer.parseInt(treeMap.get("id").toString()),selectAllAuthMenu);
			if( childrens != null && childrens.size() > 0){
				treeMap.put("children", childrens);
			}else{
				treeMap.put("leaf", true);
			}
			//treeMap.put("checked", false);
			datas.add(treeMap);
		}
		map.put("children", datas);
		//map.put("checked", false);
		tree.add(map);
		return tree;
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
	
	public List<Map<String, Object>> recursiveTree(Integer organId,List<AuthMenu> authMenu) {
		List<Map<String, Object>> data = new ArrayList<Map<String, Object>>();
		Map<String, Object> child = new HashMap<String ,Object>();
		List<Map<String, Object>> childrenNodes = menuDao.selectChildrenByGroupId(organId);
		if(childrenNodes != null && childrenNodes.size() > 0){
		for (Map<String, Object> map : childrenNodes) {
			child = convertToLowercaseMap(map);
			child.put("expanded", true);
			if(authMenu!=null&&authMenu.size()>0){
				for (AuthMenu  auth: authMenu) {
					if(auth.getMenuId()==Integer.parseInt(map.get("ID").toString())){
						child.put("checked", true);
						break;
					}else{
						child.put("checked", false);
					}
				}
			}else{
				child.put("checked", false);
			}
			List<Map<String, Object>> children = recursiveTree(Integer.parseInt(child.get("id").toString()),authMenu);
			if(children != null && children.size() > 0){
				child.put("children", children);
			}else{
				child.put("leaf", true);
			}
			//child.put("checked", false);
			data.add(child);
		}
	}
		return data;
	}

	@Override
	public List<Map<String, Object>> revealMenuTree() {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List<MenuModel> transList(List<MenuBean> menuShowList){
		List<MenuModel> extMenu = new ArrayList<MenuModel>();
		if(null!=menuShowList&&menuShowList.size()>0)
		{
			for(MenuBean node: menuShowList){
				MenuModel menu = new MenuModel();
				menu.setController(node.getController());
				menu.setId(String.valueOf(node.getId()));
				menu.setParentId(String.valueOf(node.getParentId()));
				menu.setLeaf(node.getLeaf()==0?false:true);
				menu.setText(node.getText());
				menu.setView(node.getView());
				menu.setDisOrder(String.valueOf(node.getDisOrder()));
				extMenu.add(menu);
			}
		}
		return extMenu;
	}

	/**
	 * 增加和更新功能
	 * @param menuForm
	 */
	@Override
	public void updateMenu(MenuBean menuForm) {
        if (menuForm != null && null == menuForm.getId()) {
			MenuBean map = new MenuBean();
				map.setId(menuForm.getParentId());
         	//插入的这个节点的父节点原来是子节点,那就更改节点的数据状态;
         	if(menuDao.selectChildrenById(map).size()==1){
				MenuBean form = new MenuBean();
         		form.setId(menuForm.getParentId());
         		form.setLeaf(0);
				form.setDateUpdated(new Date());
         		menuDao.updateMenu(form);
         	};
       		menuForm.setDateUpdated(new Date());
            menuForm.setLeaf(1); //默认是叶子节点;
            menuForm.setDataStatus(Constant.DataStatus.DATA_STATUS_COMMIT);
            menuDao.insertMenu(menuForm);
        } else {
			menuForm.setDateUpdated(new Date());
            menuDao.updateMenu(menuForm);
        }
	}
	@Override
	public void deleteMenu(MenuBean menuForm) {
		List<Integer> result =new ArrayList<Integer>();
			result = menuDao.selectChildrenById(menuForm);//递归查询
		if(result.size()>0){
			menuDao.deleteMenu(result);//批量处理
		}
		//插入的这个节点的父节点原来是子节点,那就更改节点的数据状态;
		MenuBean map = new MenuBean();
		map.setId(menuForm.getParentId());
		if(menuDao.selectChildrenById(map).size()==1){
			MenuBean form = new MenuBean();
			form.setId(menuForm.getParentId());
			form.setLeaf(1);
			form.setDateUpdated(new Date());
			menuDao.updateMenu(form);
		};
	}

	@Override
	public List<MenuModel> selectRootMenuList(Integer pid, Integer id) {
		List<MenuModel> list = new ArrayList<MenuModel>();
		List<MenuBean> menuList = menuDao.selectRootMenuList(pid, id);
		for (MenuBean node : menuList) {
			MenuModel menu = new MenuModel();
			menu.setController(node.getController());
			menu.setId(String.valueOf(node.getId()));
			menu.setParentId(String.valueOf(node.getParentId()));
			menu.setLeaf(node.getLeaf()==0?false:true);
			menu.setText(node.getText());
			menu.setView(node.getView());
			menu.setDisOrder(String.valueOf(node.getDisOrder()));
			list.add(menu);
			menu = null;
		}
		return list;
	}

	@Override
	public List<MenuModel> selectChildMenuList(Integer pid,User user) {
		List<MenuModel> list = new ArrayList<MenuModel>();
		List<MenuBean> menuList = menuDao.selectChildMenuList(pid,user.getLoginName());
		if(user != null){
			for (MenuBean node : menuList) {
				MenuModel menu = new MenuModel();
				menu.setController(node.getController());
				menu.setId(String.valueOf(node.getId()));
				menu.setParentId(String.valueOf(node.getParentId()));
				menu.setLeaf(node.getLeaf()==0?false:true);
				menu.setText(node.getText());
				menu.setView(node.getView());
				menu.setCode(node.getCode());
				menu.setDisOrder(String.valueOf(node.getDisOrder()));
				list.add(menu);
				menu = null;
			}
			Collections.sort(list, new MenuModel());
			return list;
		}
		Set<Integer> authMenus = getAuthMenuByUserName(user);
		for(Integer authMenuId:authMenus){
			for (MenuBean node : menuList) {
				if(authMenuId.equals(node.getId())){
					MenuModel menu = new MenuModel();
					menu.setController(node.getController());
					menu.setId(String.valueOf(node.getId()));
					menu.setParentId(String.valueOf(node.getParentId()));
					menu.setLeaf(node.getLeaf()==0?false:true);
					menu.setText(node.getText());
					menu.setView(node.getView());
					menu.setCode(node.getCode());
					menu.setDisOrder(String.valueOf(node.getDisOrder()));
					list.add(menu);
					menu = null;
				}
			}
		}
		Collections.sort(list, new MenuModel());
		return list;
	}
	/**
	 * 通过用户loginName查找角色 一对多的关系
	 * 通过角色查找权限 角色可能对应重复的权限
	 * 不同的权限可能对应相同的菜单
	 * userName->roleList->AuthList->menuList
	 */
	private Set<Integer> getAuthMenuByUserName(User user){
		Set<Integer> authSet = new HashSet<Integer>();
		Set<Integer> authMenuSet = new HashSet<Integer>();
		List<Role> roleList = user.getRoles();
		if(roleList.size()>0){
			for(Role role:roleList){
				List<Integer> tempAuthList = roleAuthDao.selectUserAuth(role.getId());
				if(tempAuthList.size()>0){
					for(Integer intg:tempAuthList){
						authSet.add(intg);
					}
				}
			}
		}
		if(authSet.size()>0){
			for(Integer intg:authSet){
				List<AuthMenu> tempAuthMenu = authMenu.selectAllAuthMenu(intg);
				if(tempAuthMenu.size()>0){
					for(AuthMenu authMenu:tempAuthMenu){
						authMenuSet.add(authMenu.getMenuId());
					}
				}
			}
		}
		return authMenuSet;
	}
}
