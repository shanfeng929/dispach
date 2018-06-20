package com.sunyard.dispatch.service;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.model.FlowGroupModel;
import com.sunyard.dispatch.model.form.FlowGroupForm;

/**
 * 流程组 业务逻辑处理层
 * @author quan.shen
 *
 */
public interface FlowGroupService {
	
	/**
	 * 分页查询流程分组
	 * @param form
	 * @return
	 */
	@Transactional
	Page<FlowGroupModel> getFlowGroupPageList(FlowGroupForm form);
	
	/**
	 * 条件查询流程分组
	 * @param form
	 * @return
	 */
	@Transactional
	List<FlowGroupModel> getFlowGroupList(FlowGroupForm form);
	
	/**
	 * 根据ID查询流程分组
	 * @param id
	 * @return
	 */
	@Transactional
	FlowGroupModel findFlowById(Integer id);

	/**
	 * 流程分组新增
	 * @param form
	 */
	@Transactional
	void flowGroupAdd(FlowGroupForm form);
	
	/**
	 * 流程分组修改
	 * @param form
	 */
	@Transactional
	void flowGroupEdit(FlowGroupForm form);
	
//	/**
//	 * 根据ID删除流程分组
//	 * @param id
//	 */
//	@Transactional
//	void flowGroupDel(String id)  throws Exception;

	/**
	 * 根据拼接而成的ids,批量删除流程分组
	 * @param ids
	 */
	@Transactional
	void flowGroupDelByIds(String ids) throws Exception;
	
	/**
	 * 加载流程树
	 * @param parentId
	 * @return
	 */
	List<Map<String, Object>> getFlowTreeData(String parentId,String name);
	
	List<Map<String, Object>> getFlowGroupTreeData(String pid);
	
	List<Map<String, Object>> getChildPackage(String pid);
	
	@Transactional
	Integer insertOrUpateFlowGroup(List<FlowGroupForm> forms);
	
	String deleteFlowGroup(String id);

	List<Map<String, Object>> getGroupTreeData(String parentId);
	
	



}
