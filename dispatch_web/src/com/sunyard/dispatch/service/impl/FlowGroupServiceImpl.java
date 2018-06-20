package com.sunyard.dispatch.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.dao.FlowGroupDao;
import com.sunyard.dispatch.dao.FlowManageDao;
import com.sunyard.dispatch.model.FlowGroupModel;
import com.sunyard.dispatch.model.form.FlowGroupForm;
import com.sunyard.dispatch.service.FlowGroupService;

@Service("flowGroupService")
public class FlowGroupServiceImpl implements FlowGroupService {
	
	@Resource
	private FlowGroupDao flowGroupDao;
	@Resource
	private FlowManageDao flowManageDao;

	@Override
	public Page<FlowGroupModel> getFlowGroupPageList(FlowGroupForm form) {
		// TODO Auto-generated method stub
		List<FlowGroupModel> flowGroupModels = flowGroupDao.getFlowGroupPageList(form);
		Integer count = flowGroupDao.getFlowGroupListCount(form);
		return new Page<FlowGroupModel>(form.getStart(), form.getLimit(), count, flowGroupModels);
	}
	

	@Override
	public List<FlowGroupModel> getFlowGroupList(FlowGroupForm form) {
		return flowGroupDao.getFlowGroupList(form);
	}
	
	@Override
	public FlowGroupModel findFlowById(Integer id) {
		// TODO Auto-generated method stub
		return flowGroupDao.findFlowById(id);
	}

	@Override
	public void flowGroupAdd(FlowGroupForm form) {
		flowGroupDao.flowGroupAdd(form);
	}

	@Override
	public void flowGroupEdit(FlowGroupForm form) {
		flowGroupDao.flowGroupEdit(form);
	}

//	@Override
//	public void flowGroupDel(String id) throws Exception{
//		Integer count = flowManageDao.findFlowByGroupId(id).size();
//		if(count > 0){
//			throw new Exception("该流程组被流程关联");
//		}
//		flowGroupDao.flowGroupDel(id);
//	}
	
	@Override
	public void flowGroupDelByIds(String ids) throws Exception{
//		Integer count = flowManageDao.findFlowByGroupId(id).size();
		Integer count = flowManageDao.findFlowByGroupIds(ids).size();
		if(count > 0){
			throw new Exception("该流程组被流程关联");
		}
		flowGroupDao.flowGroupDelByIds(ids);
	}

	@Override
	public List<Map<String, Object>> getFlowTreeData(String parentId,
			String name) {
		// List<Map<String, Object>> tree = new ArrayList<Map<String,
		// Object>>();
		List<Map<String, Object>> datas = new ArrayList<Map<String, Object>>();
		// map.put("text", "流程管理");
		// map.put("expanded", "true");
		// map.put("leaf", "false");
		List<Map<String, Object>> roots = flowGroupDao.selectRootFlow(parentId);
		for (Map<String, Object> node : roots) {
			Map<String, Object> treeMap = convertToLowercaseMap(node);
			List<Map<String, Object>> childrens = new ArrayList<Map<String, Object>>();
			if ("".equals(name) || null == name) {
				recursiveTree(Integer.parseInt(treeMap.get("id").toString()),
						null, childrens);
			} else {
				recursiveTreeByName(
						Integer.parseInt(treeMap.get("id").toString()), name,
						childrens);
			}
			if (childrens != null && childrens.size() > 0) {
				treeMap.put("children", childrens);
			} else {
				// treeMap.put("checked", true);
				treeMap.put("leaf", true);
			}
			datas.add(treeMap);
		}
		// map.put("children", datas);
		// tree.add(map);
		// return tree;
		return datas;
	}
	
	/**
	 * 遍历map中的KEY值，全部格式化为小写
	 * @param node
	 * @return
	 */
	private Map<String, Object> convertToLowercaseMap(Map<String, Object> node) {
		Map<String, Object> ret = new HashMap<String, Object>();
		Iterator<Entry<String, Object>> iterator = node.entrySet().iterator();
		while (iterator.hasNext()) {
			Entry<String, Object> tmp = iterator.next();
			ret.put(tmp.getKey().toLowerCase(), tmp.getValue());
		}
		return ret;
	}
	
	/**
	 * 递归加载流程树
	 * @param parentId
	 * @param name
	 * @return
	 */
	public void recursiveTree(Integer parentId,String name,List<Map<String, Object>> data) {
		Map<String, Object> child = new HashMap<String ,Object>();
		Map<String, Object> childFlowGroup = new HashMap<String ,Object>();
		List<Map<String, Object>> childrenFlow = flowManageDao.selectChildrenByGroupId(parentId,name);
		List<Map<String, Object>> childrenFlowGroup = flowGroupDao.selectChildFlowGroup(parentId.toString());
		if(childrenFlow != null && childrenFlow.size() > 0){
			for (Map<String, Object> map : childrenFlow) {
				child = convertToLowercaseMap(map);
				child.put("expanded", true);
//				List<Map<String, Object>> children = recursiveTree(Integer.parseInt(child.get("id").toString()));
//				if(children != null && children.size() > 0){
//					child.put("children", children);
//				}else{
//					child.put("leaf", true);
//				}
				child.put("leaf", true);
				child.put("checked", false);
				data.add(child);
			}
		}
		if(childrenFlowGroup != null && childrenFlowGroup.size() > 0){
			for (Map<String, Object> map : childrenFlowGroup) {
				childFlowGroup = convertToLowercaseMap(map);
				childFlowGroup.put("expanded", true);
				List<Map<String, Object>> children = new ArrayList<Map<String,Object>>();
				recursiveTree(Integer.parseInt(childFlowGroup.get("id").toString()),name,children);
				if(children != null && children.size() > 0){
					childFlowGroup.put("children", children);
					childFlowGroup.put("leaf", false);
					data.add(childFlowGroup);
				}
			}
		}
	}

	public void recursiveTreeByName(Integer parentId,String name,List<Map<String, Object>> data) {
		Map<String, Object> child = new HashMap<String ,Object>();
		Map<String, Object> childFlowGroup = new HashMap<String ,Object>();
		List<Map<String, Object>> childrenFlow = flowManageDao.selectChildrenByGroupId(parentId,name);
		List<Map<String, Object>> childrenFlowGroup = flowGroupDao.selectChildFlowGroup(parentId.toString());
		if(childrenFlow != null && childrenFlow.size() > 0){
			for (Map<String, Object> map : childrenFlow) {
				child = convertToLowercaseMap(map);
				child.put("expanded", true);
//				List<Map<String, Object>> children = recursiveTree(Integer.parseInt(child.get("id").toString()));
//				if(children != null && children.size() > 0){
//					child.put("children", children);
//				}else{
//					child.put("leaf", true);
//				}
				child.put("leaf", true);
				child.put("checked", false);
				data.add(child);
			}
		}
		if(childrenFlowGroup != null && childrenFlowGroup.size() > 0){
			for (Map<String, Object> map : childrenFlowGroup) {
				childFlowGroup = convertToLowercaseMap(map);
				childFlowGroup.put("expanded", true);
				List<Map<String, Object>> children = new ArrayList<Map<String,Object>>();
				recursiveTree(Integer.parseInt(childFlowGroup.get("id").toString()),name,children);
				childFlowGroup.put("leaf", false);
				if(children != null && children.size() > 0){
					childFlowGroup.put("children", children);
					data.add(childFlowGroup);
				}
			}
		}
	}

	@Override
	public List<Map<String, Object>> getFlowGroupTreeData(String pid) {
		List<Map<String, Object>> list = flowGroupDao.getFlowGroupTreeData(pid);
		List<Map<String, Object>> list2 = new ArrayList<Map<String,Object>>();
		for(Map<String, Object> map : list){
			list2.add(convertToLowercaseMap(map));
		}
		return list2;
	}


	@Override
	public List<Map<String, Object>> getChildPackage(String pid) {
		List<Map<String, Object>> list = flowGroupDao.getChildPackage(pid);
		List<Map<String, Object>> list2 = new ArrayList<Map<String,Object>>();
		for(Map<String, Object> map : list){
			list2.add(convertToLowercaseMap(map));
		}
		return list2;
	}


	@Override
	@Transactional
	public Integer insertOrUpateFlowGroup(List<FlowGroupForm> forms) {
		Integer id = null;
		for(FlowGroupForm form : forms){
			if((Integer.valueOf(0)).equals(form.getId())){
				if("".equals(form.getParentId())){
					form.setParentId(id.toString());
					flowGroupDao.insertFlowGroup(form);
				}else{
					flowGroupDao.insertFlowGroup(form);
				}
			}else if("".equals(form.getId()) || null == form.getId()){
				flowGroupDao.insertFlowGroupRoot(form);
				id = form.getId();
				
			}else{
				flowGroupDao.updateFlowGroup(form);
			}
		}
		return id;
	}


	@Override
	@Transactional
	public String deleteFlowGroup(String id) {
		String s = "";
		List<Map<String, Object>> childrenF = new ArrayList<Map<String,Object>>();
		List<Map<String, Object>> childrenFG = new ArrayList<Map<String,Object>>();
		getChildrenFlow(id, childrenF, childrenFG);
		if(childrenF.isEmpty()){
			if(childrenFG != null && childrenFG.size() > 0){
				for (Map<String, Object> map : childrenFG) {
					flowGroupDao.deleteFlowGroup(map.get("ID").toString());
				}
			}
			flowGroupDao.deleteFlowGroup(id);
			s = "1";
		}else{
			s = "2";
		}
		return s;
	}
	
	private void getChildrenFlow(String id,List<Map<String, Object>> childrenF, List<Map<String, Object>> childrenFG){
		List<Map<String, Object>> childrenFlow = flowManageDao
				.selectChildrenByGroupId(Integer.valueOf(id), null);
		List<Map<String, Object>> childrenFlowGroup = flowGroupDao
				.selectChildFlowGroup(id);
		
		if(childrenFlow != null && childrenFlow.size() > 0){
			for (Map<String, Object> map : childrenFlow) {
				childrenF.add(map);
			}
		}
		if(childrenFlowGroup != null && childrenFlowGroup.size() > 0){
			for (Map<String, Object> map : childrenFlowGroup) {
				childrenFG.add(map);
				getChildrenFlow(map.get("ID").toString(),childrenF,childrenFG);
			}
		}
	}


	@Override
	public List<Map<String, Object>> getGroupTreeData(String parentId) {
		// TODO Auto-generated method stub
		List<Map<String, Object>> datas = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> roots = flowGroupDao.selectRootFlow(parentId);
		for (Map<String, Object> node : roots) {
			Map<String, Object> treeMap = convertToLowercaseMap(node);
			treeMap.put("leaf", false);
			treeMap.put("checked", false);
			List<Map<String, Object>> childrens = new ArrayList<Map<String, Object>>();
			recursiveGroupTree(Integer.parseInt(treeMap.get("id").toString()), childrens);
			if (childrens != null && childrens.size() > 0) {
				treeMap.put("children", childrens);
			}
			datas.add(treeMap);
		}
		return datas;
	}


	private void recursiveGroupTree(Integer parentId, List<Map<String, Object>> childrens) {

		Map<String, Object> childFlowGroup = new HashMap<String ,Object>();
		List<Map<String, Object>> childrenFlowGroup = flowGroupDao.selectChildFlowGroup(parentId.toString());
		if(childrenFlowGroup != null && childrenFlowGroup.size() > 0){
			for (Map<String, Object> map : childrenFlowGroup) {
				childFlowGroup = convertToLowercaseMap(map);
				childFlowGroup.put("leaf", false);
				childFlowGroup.put("checked",false);
				List<Map<String, Object>> children = new ArrayList<Map<String,Object>>();
				recursiveGroupTree(Integer.parseInt(childFlowGroup.get("id").toString()),children);
//				if(children != null && children.size() > 0){
					childFlowGroup.put("children", children);
//				}
					/*else{
					childFlowGroup.put("expanded", true);
				}*/
				childrens.add(childFlowGroup);
			}
		}
	}
}
