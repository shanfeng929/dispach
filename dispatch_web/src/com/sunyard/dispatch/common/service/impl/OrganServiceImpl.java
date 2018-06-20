package com.sunyard.dispatch.common.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.sunyard.dispatch.common.dao.OrganDao;
import com.sunyard.dispatch.common.model.Organ;
import com.sunyard.dispatch.common.model.form.OrganForm;
import com.sunyard.dispatch.common.service.OrganService;
import com.sunyard.dispatch.util.Constant;

@Service("organService")
public class OrganServiceImpl implements OrganService {

	@Resource
	private OrganDao organDao;

	@Override
	public void addOraganItem(Organ form) {
		// TODO Auto-generated method stub
		organDao.addOraganItem(form);
	}

//	@Override
//	public List<Organ> selectOrganTreeList() {
//		// TODO Auto-generated method stub
//		return organDao.selectOrganTreeList();
//	}

	// 查出机构组的树
	public List<Map<String, Object>> revealOrganTree(Integer organId) {
		// List<Map<String, Object>> tree = new ArrayList<Map<String,
		// Object>>();
		List<Map<String, Object>> datas = new ArrayList<Map<String, Object>>();

		List<Map<String, Object>> nodes = organDao.selectRootOrganGroup(organId);
		for (Map<String, Object> node : nodes) {
			Map<String, Object> treeMap = convertToLowercaseMap(node);
			// treeMap.put("parent_id", 1);
			List<Map<String, Object>> childrens = recursiveTree(Integer.parseInt(treeMap.get("id").toString()));
			if (childrens != null && childrens.size() > 0) {
				treeMap.put("children", childrens);
				treeMap.put("leaf", false);
			} else {
				treeMap.put("leaf", true);
			}
			datas.add(treeMap);
		}

		return datas;
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
		List<Map<String, Object>> childrenNodes = organDao.selectChildrenByOrganId(organId);
		if (childrenNodes != null && childrenNodes.size() > 0) {
			for (Map<String, Object> map : childrenNodes) {
				child = convertToLowercaseMap(map);
				child.put("expanded", true);
				List<Map<String, Object>> children = recursiveTree(Integer.parseInt(child.get("id").toString()));
				if (children != null && children.size() > 0) {
					child.put("children", children);
					child.put("expanded", true);
					child.put("leaf", false);
				} else {
					child.put("expanded", false);
					child.put("leaf", true);
				}
				data.add(child);
			}
		}
		return data;
	}

	public Map<String, Object> queryParentName(Integer id) {
		return organDao.queryParentName(id);
	}

	public Integer repeatedOrganName(OrganForm organForm) {
		return organDao.repeatedOrganName(organForm);
	}
	
	public Integer repeatedOrganCode(OrganForm organForm) {
		return organDao.repeatedOrganCode(organForm);
	}

	public Organ selectOrganById(OrganForm organForm) {
		return organDao.selectOrganById(organForm.getId());
	}

	public void modifyOrgan(OrganForm organForm) {
		organDao.modifyOrgan(organForm);
	}

	public void insertOrgan(OrganForm organForm) {
//		if (organForm.getParentId() == 1) {
//			organForm.setParentId(null);
//		}
		organDao.insertOrgan(organForm);
	}

	public void deleteOrgan(Integer id) {
		organDao.deleteOrgan(id);
	}
	
	public List<Integer> selectUserIdByOrganId(Integer id){
		return organDao.selectUserIdByOrganId(id);
	}
	
	@Override
	public List<Map<String, Object>> getOrganTreeComBox(String type ,String organId ) {
		
		if(null == organId || organId.trim().equals("")){
			 // 如果所传id为空，抓去当前用户机构ID
			organId = "";
		}
		
		List<Map<String, Object>> data = new ArrayList<Map<String, Object>>();
		Map<String, Object> child = new HashMap<String, Object>();
		List<Map<String, Object>> childrenNodes = organDao.selectOrganByOrganId(organId,Constant.DataStatus.DATA_STATUS_COMMIT);
		
		
		if ( null != childrenNodes  && childrenNodes.size() > 0) {
			for (Map<String, Object> map : childrenNodes) {
				child = convertToLowercaseMap(map);
				if( null != child.get("id") ||  child.get("id").equals("") ){
					
					List<Map<String, Object>> children = getOrganTreeComBox(type,child.get("id").toString());
					if (children != null && children.size() > 0) {
						child.put("children", children);
					} else {
						child.put("leaf", true);
					}
					
					if(type.toLowerCase().equals("code")){
						child.put("id", child.get("code")==null?"":child.get("code"));
					}
					
				}else{
					continue ;
				}
				
				data.add(child);
			}
		}
		return data;
	}

	@Override
	public Integer selectOrganByUserId(Integer userId) {
		// TODO Auto-generated method stub
		return organDao.selectOrganByUserId(userId);
	}
}