package com.sunyard.dispatch.common.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.sunyard.dispatch.common.dao.AuthOperationDao;
import com.sunyard.dispatch.common.dao.OperationDao;
import com.sunyard.dispatch.common.model.AuthOperation;
import com.sunyard.dispatch.common.model.Operation;
import com.sunyard.dispatch.common.model.OperationIncludeAuthorityVO;
import com.sunyard.dispatch.common.service.OperationService;

@Service("operationService")
public class OperationServiceImpl implements OperationService {

	@Resource
	private OperationDao operationDao;
	@Resource
	private AuthOperationDao authOpea;

	@Override
	public List<Operation> selectOperationByAuthority(Integer id) {
		return operationDao.selectOperationByAuthority(id);
	}

	@Override
	public List<OperationIncludeAuthorityVO> selectOperationWithAuthorityCode() {
		return operationDao.selectOperationWithAuthorityCode();
	}

	@Override
	public List<Map<String, Object>> revealOperationTree(Integer authId) {
		List<Map<String, Object>> tree  = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> datas  = new ArrayList<Map<String, Object>>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("name", "功能管理");
		map.put("expanded", "true");
		map.put("leaf", "false");
		List<Map<String, Object>> nodes = operationDao.selectRootOperation();
		List<AuthOperation> selectAllAuthOpea = authOpea.selectAllAuthOpea(authId);
		for(Map<String, Object> node :nodes){
			Map<String, Object> treeMap = convertToLowercaseMap(node);
			if(selectAllAuthOpea!=null&&selectAllAuthOpea.size()>0){
				for(AuthOperation auth : selectAllAuthOpea){
					if(auth.getOperationId()==Integer.parseInt(treeMap.get("id").toString())){
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
			List<Map<String, Object>> childrens = recursiveTree(Integer.parseInt(treeMap.get("id").toString()),selectAllAuthOpea);
			if( childrens != null && childrens.size() > 0){
				treeMap.put("children", childrens);
			}else{
				treeMap.put("leaf", true);
			}
			datas.add(treeMap);
		}
		map.put("children", datas);
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
	
	public List<Map<String, Object>> recursiveTree(Integer organId,List<AuthOperation> authOpea) {
		List<Map<String, Object>> data = new ArrayList<Map<String, Object>>();
		Map<String, Object> child = new HashMap<String ,Object>();
		List<Map<String, Object>> childrenNodes = operationDao.selectChildrenByGroupId(organId);
		if(childrenNodes != null && childrenNodes.size() > 0){
		for (Map<String, Object> map : childrenNodes) {
			child = convertToLowercaseMap(map);
			child.put("expanded", true);
			if(authOpea!=null&&authOpea.size()>0){
				for (AuthOperation  auth: authOpea) {
					if(auth.getOperationId()==Integer.parseInt(map.get("ID").toString())){
						child.put("checked", true);
					}else{
						child.put("checked", false);
					}
				}
			}else{
				child.put("checked", false);
			}
			List<Map<String, Object>> children = recursiveTree(Integer.parseInt(child.get("id").toString()),authOpea);
			if(children != null && children.size() > 0){
				child.put("children", children);
			}else{
				child.put("leaf", true);
			}
			
			data.add(child);
		}
	}
		return data;
	}
}
