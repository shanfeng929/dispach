package com.sunyard.dispatch.service;  

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.model.FlowHistoryModel;
import com.sunyard.dispatch.model.FlowManageModel;
import com.sunyard.dispatch.model.TaskMonitorModel;
import com.sunyard.dispatch.model.TimeChartModel;
import com.sunyard.dispatch.model.form.FlowDependencyForm;
import com.sunyard.dispatch.model.form.FlowManageForm;
import com.sunyard.dispatch.model.form.FlowMonitorForm;

/**
 * 流程 业务逻辑处理层
 * @author Administrator
 *
 */
public interface FlowManageService {

	
	/**
	 * 分页查询流程列表
	 * @param form
	 * @return
	 */
	@Transactional
	Page<FlowManageModel> getFlowManageList(FlowManageForm form);
	
	/**
	 * 条件查询所有流程
	 * @param form
	 * @return
	 */
	List<FlowManageModel> getFlowList(FlowManageForm form);

	/**
	 * 根据ID查询流程
	 * @param id
	 * @return
	 */
	@Transactional
	FlowManageModel findFlowById(String id);
	
	/**
	 * 流程修改
	 * 
	 * @param form
	 * @throws Exception
	 */
	@Transactional
	void flowManageEdit(FlowManageForm form) throws Exception;
	
	/**
	 * 根据ID删除流程及流程相关数据
	 * @param id
	 */
	@Transactional
	void flowManageDel(String id)  throws Exception;

	/**
	 * 获取最近多少次的流程执行时间趋势数据
	 * @param flowId
	 * @param times
	 * @return
	 */
	@Transactional
	List<TimeChartModel> timeChartData(String flowId, Integer times);
	
	/**
	 * 根据条件查询流程依赖关系
	 * @param form
	 * @return
	 */
	@Transactional
	Map<String, Object> findDependencyByFlowId(FlowDependencyForm form);

	/**
	 * 新增或修改流程依赖
	 * @param form
	 */
	@Transactional
	void saveOrUpdateDependency(FlowDependencyForm form);

	/**
	 * 调用工作流，执行流程
	 * @param form
	 */
	@Transactional
	void flowStart(FlowManageForm form) throws Exception;

	/**
	 * 调用工作流，暂停/挂起流程
	 * @param form
	 */
	@Transactional
	void flowStop(FlowManageForm form) throws Exception;

	/**
	 * 调用工作流，重启/恢复流程
	 * @param form
	 */
	@Transactional
	void flowRestart(FlowManageForm form) throws Exception;

	/**
	 * 调用工作流终止流程
	 * @param form
	 */
	@Transactional
	void flowTerminate(FlowManageForm form) throws Exception;
	
	/**
	 * 根据flowId获取流程所有节点（包括任务节点以及子流程节点）
	 * @param flowId
	 * @return
	 */
	@Transactional
	List<Map<String, Object>> findTaskNodes(String flowId);
	
	@Transactional
	void updateFlowGroup(String flowGroupId,String flowIds);

	
	/**
	 * 分页查询执行中任务链 
	 * @param form
	 * version 3.0
	 * @return
	 */
	@Transactional
	Page<FlowManageModel> getFlowMonitorList(FlowMonitorForm form);

	/**
	 * 分页查询历史任务链 
	 * @param form
	 * @return
	 */
	Page<FlowHistoryModel> getFlowHistoryList(FlowMonitorForm form);

	List<TaskMonitorModel> getTaskMonitorList(String flowId,Boolean isHistory);

	/**
	 * 查询所有流程列表
	 * @param form
	 * @return
	 */
	List<FlowManageModel> getAllFlowManageList(FlowManageForm form);
	
	/**
	 * 查询历史任务链 
	 * @param form
	 * @return
	 */
	List<FlowHistoryModel> queryFlowHistoryList(FlowMonitorForm form);
	
	List<TaskMonitorModel> getTaskHistoryList(String flowId);
	
}
	
