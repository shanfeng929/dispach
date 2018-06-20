package com.sunyard.dispatch.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.sunyard.dispatch.model.FlowGroupModel;
import com.sunyard.dispatch.model.form.FlowGroupForm;

public interface FlowGroupDao {

	/**
	 * 分页查询流程组列表
	 * @param form
	 * @return
	 */
	List<FlowGroupModel> getFlowGroupPageList(FlowGroupForm form);
	
	/**
	 * 条件查询流程组列表
	 * @param form
	 * @return
	 */
	List<FlowGroupModel> getFlowGroupList(FlowGroupForm form);

	/**
	 * 条件查询流程组列表总条数
	 * @param form
	 * @return
	 */
	Integer getFlowGroupListCount(FlowGroupForm form);

	/**
	 * 通过ID查询流程组
	 * @param id
	 * @return
	 */
	FlowGroupModel findFlowById(@Param("id")Integer id);

	/**
	 * 流程组新增
	 * @param form
	 */
	void flowGroupAdd(FlowGroupForm form);

	/**
	 * 流程组修改
	 * @param form
	 */
	void flowGroupEdit(FlowGroupForm form);

//	/**
//	 * 根据ID删除流程组
//	 * @param id
//	 */
//	void flowGroupDel(@Param("id")String id);

	/**
	 * 根据拼接而成的ids,批量删除流程分组
	 * @param ids
	 */
	void flowGroupDelByIds(@Param("ids")String ids);
	
	/**
	 * 获取流程组，做为流程树的节点
	 * @param name
	 * @return
	 */
	List<Map<String, Object>> selectRootFlow(@Param("parentId")String parentId);
	
	List<Map<String, Object>> selectChildFlowGroup(@Param("parentId")String parentId);
	
	List<Map<String, Object>> getFlowGroupTreeData(@Param("pid")String pid);
	
	List<Map<String, Object>> getChildPackage(@Param("pid")String pid);
	
	void insertFlowGroup(FlowGroupForm form);
	
	void insertFlowGroupRoot(FlowGroupForm form);
	
	void updateFlowGroup(FlowGroupForm form);
	
	void deleteFlowGroup(@Param("id")String id);


}
