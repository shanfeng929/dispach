package com.sunyard.dispatch.common.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.sunyard.dispatch.common.dao.AuthMenuDao;
import com.sunyard.dispatch.common.dao.AuthOperationDao;
import com.sunyard.dispatch.common.dao.AuthorityDao;
import com.sunyard.dispatch.common.model.AuthMenu;
import com.sunyard.dispatch.common.model.Authority;
import com.sunyard.dispatch.common.model.AuthorityNew;
import com.sunyard.dispatch.common.service.AuthorityService;

@Service("authorityService")
public class AuthorityServiceImpl implements AuthorityService {

	@Resource
	private AuthorityDao authorityDao;
	@Resource
	private AuthMenuDao authMenuDao;
	@Resource
	private AuthOperationDao authOpeaDao;

	@Override
	public List<Authority> selectAuthorityContainsOperations() {
		return authorityDao.selectAuthorityContainsOperations();
	}

	@Override
	public List<Map<String, Object>> revealAuthorityGroupTree() {
		List<Map<String, Object>> ret = new LinkedList<Map<String, Object>>();

		List<Map<String, Object>> rootNodes = authorityDao.selectRootAuthorityGroup();
		for (Map<String, Object> root : rootNodes) {
			ret.add(selectChildAndAuthorityByGroup(root));
		}
		return ret;
	}

	private Map<String, Object> selectChildAndAuthorityByGroup(Map<String, Object> node) {
		node = this.convertToLowercaseMap(node);
		if (null != node.get("id") && !"".equals(node.get("id"))) {
			List<Map<String, Object>> children = authorityDao
					.selectChildrenByGroupId(((BigDecimal) node.get("id")).intValue());
			List<Map<String, Object>> transferChildren = new ArrayList<Map<String, Object>>();
			List<Map<String, Object>> authorities = authorityDao
					.selectAuthorityByGroupId(((BigDecimal) node.get("id")).intValue());
			if (children.size() > 0) {
				for (Map<String, Object> child : children) {
					transferChildren.add(this.selectChildAndAuthorityByGroup(child));
				}
			}
			authorities.addAll(transferChildren);
			if (!authorities.isEmpty()) {
				node.put("children", authorities);
				node.put("expanded", true);
			}
		}
		return node;
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

	@Override
	public List<Authority> getAuthList() {
		return authorityDao.queryAllAuth();
	}

	@Override
	public List<Map<String, Object>> revealAuthorityTree() {
		List<Map<String, Object>> tree  = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> datas  = new ArrayList<Map<String, Object>>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("text", "权限");
		map.put("expanded", "true");
		map.put("leaf", "false");
		List<Map<String, Object>> nodes = authorityDao.selectRootAuthority();
		for(Map<String, Object> node :nodes){
			Map<String, Object> treeMap = convertToLowercaseMap(node);
				treeMap.put("leaf", true);
			datas.add(treeMap);
		}
		map.put("children", datas);
		tree.add(map);
		return tree;
	}

	@Override
	public void saveAuth(AuthorityNew auth, Integer[] opeaIds, Integer[] menuIds) {
		auth.setDataStatus(1);
		authorityDao.insertAuth(auth);
//		if (null == menuIds || menuIds.length < 1){
//			List<Integer> list = authorityDao.selectAllMenu();
//			if(null != list && list.size() > 0){
//				menuIds = new Integer[list.size()];
//			}				
//			for (int i = 0;i < list.size(); i++){
//				menuIds[i] = list.get(i);
//			}
//		}
		for (Integer menuId : menuIds) {
			AuthMenu authMenu = new AuthMenu();
			authMenu.setAuthId(auth.getId());
			authMenu.setMenuId(menuId);
			authMenuDao.insertAuthMenu(authMenu);
		}
		
//		for (Integer opeaId : opeaIds) {
//			AuthOperation authOperation = new AuthOperation();
//			authOperation.setAuthId(auth.getId());
//			authOperation.setOperationId(opeaId);
//			authOpeaDao.insertAuthOpea(authOperation);
//		}
	}

	@Override
	public void updateAuth(AuthorityNew auth, Integer[] opeaIds,
			Integer[] menuIds) {
		auth.setDataStatus(1);
		authorityDao.updateAuth(auth);
//		authOpeaDao.delete(auth.getId());
		authMenuDao.delete(auth.getId());
		for (Integer menuId : menuIds) {
			AuthMenu authMenu = new AuthMenu();
			authMenu.setAuthId(auth.getId());
			authMenu.setMenuId(menuId);
			//authMenuDao.updateAuthMenu(authMenu);
			authMenuDao.insertAuthMenu(authMenu);
		}
//		for (Integer opeaId : opeaIds) {
//			AuthOperation authOperation = new AuthOperation();
//			authOperation.setAuthId(auth.getId());
//			authOperation.setOperationId(opeaId);
//			//authOpeaDao.updateAuthOpea(authOperation);
//			authOpeaDao.insertAuthOpea(authOperation);
//		}
	}

	@Override
	public void delete(Integer authId) {
		authorityDao.delete(authId);
		authorityDao.deleteAuthGrp(authId);
		authorityDao.deleteAuthMenu(authId);
		authorityDao.deleteAuthRole(authId);
	}

	@Override
	public Integer repeatedAuthName(AuthorityNew auth){
		return authorityDao.repeatedAuthName(auth);
	}
	
	@Override
	public Integer repeatedAuthCode(AuthorityNew auth){
		return authorityDao.repeatedAuthCode(auth);
	}
}
