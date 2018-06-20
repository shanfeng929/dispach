package com.sunyard.dispatch.common.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sunyard.dispatch.common.dao.AuthorityGroupDao;
import com.sunyard.dispatch.common.model.AuthAuthGroup;
import com.sunyard.dispatch.common.model.Authority;
import com.sunyard.dispatch.common.model.form.AuthorityGroupForm;
import com.sunyard.dispatch.common.service.AuthorityGroupService;

/**
 * @author fengqibei
 * @date 2015-8-24 上午11:55:26
 */
@Service("authorityGroupService")
public class AuthorityGroupServiceImpl implements AuthorityGroupService {
	@Resource
	private AuthorityGroupDao authorityGroupDao;
	
	private final Logger logger = LoggerFactory.getLogger(AuthorityGroupServiceImpl.class);

	public List<Map<String, Object>> revealAuthorityGroupTree() {
		try{
			List<Map<String, Object>> datas = new ArrayList<Map<String, Object>>();
			List<Map<String, Object>> nodes = authorityGroupDao.selectRootAuthorityGroup();
			for (Map<String, Object> node : nodes) {
				Map<String, Object> treeMap = convertToLowercaseMap(node);
				List<Map<String, Object>> childrens = recursiveTree(Integer.parseInt(treeMap.get("id").toString()));
				if (childrens != null && childrens.size() > 0) {
					treeMap.put("children", childrens);
				} else {
					treeMap.put("leaf", true);
				}
				datas.add(treeMap);
			}
			return datas;
		}catch(Exception e){
			logger.info("[权限组]---[AuthorityGroup]---[异常功能点]---"+e);
			return null;
		}
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

	public List<Map<String, Object>> recursiveTree(Integer organId) {
		List<Map<String, Object>> data = new ArrayList<Map<String, Object>>();
		Map<String, Object> child = new HashMap<String, Object>();
		List<Map<String, Object>> childrenNodes = authorityGroupDao.selectChildrenByGroupId(organId);
		if (childrenNodes != null && childrenNodes.size() > 0) {
			for (Map<String, Object> map : childrenNodes) {
				child = convertToLowercaseMap(map);
				child.put("expanded", true);
				List<Map<String, Object>> children = recursiveTree(Integer.parseInt(child.get("id").toString()));
				if (children != null && children.size() > 0) {
					child.put("children", children);
				} else {
					child.put("leaf", true);
				}
				data.add(child);
			}
		}
		return data;
	}

	public List<Authority> queryAuthority() {
		return authorityGroupDao.queryAuthority();
	}

	public List<Authority> querySelectedAuthority(Integer id) {
		return authorityGroupDao.querySelectAuthority(id);
	}

	public Integer repeatedAuthority(AuthorityGroupForm authorityGroupForm) {
		return authorityGroupDao.repeatedAuthority(authorityGroupForm);
	}

	public String selectNameById(Integer id) {
		return authorityGroupDao.selectNameById(id);
	}

	public void momdifyAuthorityGroup(AuthorityGroupForm authorityGroupForm, List<Integer> authoritys) {
		authorityGroupDao.updateAuthorityGroup(authorityGroupForm);
		authorityGroupDao.deleteAuthAuthGroup(authorityGroupForm.getId());
		List<AuthAuthGroup> list = new ArrayList<AuthAuthGroup>();
		for (int i = 0; i < authoritys.size(); i++) {
			AuthAuthGroup authAuthGroup = new AuthAuthGroup();
			authAuthGroup.setAuthId(authoritys.get(i));
			authAuthGroup.setAuthGroupId(authorityGroupForm.getId());
			list.add(authAuthGroup);
		}
		authorityGroupDao.insertAuthAuthGroup(list);
	}

	public void insertAuthorityGroup(AuthorityGroupForm authorityGroupForm, List<Integer> authoritys) {
		authorityGroupDao.insertAuthGroup(authorityGroupForm);
		Integer authorityGroupId = authorityGroupForm.getId();
		List<AuthAuthGroup> list = new ArrayList<AuthAuthGroup>();
		for (int i = 0; i < authoritys.size(); i++) {
			AuthAuthGroup authAuthGroup = new AuthAuthGroup();
			authAuthGroup.setAuthId(authoritys.get(i));
			authAuthGroup.setAuthGroupId(authorityGroupId);
			list.add(authAuthGroup);
		}
		authorityGroupDao.insertAuthAuthGroup(list);
	}
	public void deleteAuthorityGroup(Integer id) {
		authorityGroupDao.deleteAuthorityGroup(id);//删除权限组
		authorityGroupDao.deleteAuthorityGroups(id);//删除权限组下面对应的权限
	}
}
