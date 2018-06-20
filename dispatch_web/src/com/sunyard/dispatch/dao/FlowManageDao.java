package com.sunyard.dispatch.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.sunyard.dispatch.model.FlowHistoryModel;
import com.sunyard.dispatch.model.FlowManageModel;
import com.sunyard.dispatch.model.TaskMonitorModel;
import com.sunyard.dispatch.model.TimeChartModel;
import com.sunyard.dispatch.model.form.FlowDependencyForm;
import com.sunyard.dispatch.model.form.FlowManageForm;
import com.sunyard.dispatch.model.form.FlowMonitorForm;


/**
 * @author Administrator
 *
 */
public interface FlowManageDao {

	/**
	 * 查询流程列表
	 * @param form
	 * @return
	 */
	List<FlowManageModel> getFlowManageList(FlowManageForm form);

	/**
	 * 条件查询流程列表总条数
	 * @param form
	 * @return
	 */
	Integer getFlowManageListCount(FlowManageForm form);
	
	/**
	 * 条件查询所有流程
	 * @param form
	 * @return
	 */
	List<FlowManageModel> getFlowList(FlowManageForm form); 

	/**
	 * 根据ID查流程
	 * @param id
	 * @return
	 */
	FlowManageModel findFlowById(@Param("id")String id);
	
	/**
	 * 查找PID下所有子流程
	 * @param pid
	 * @return
	 */
	List<FlowManageModel> findFlowByPid(@Param("pid")String pid);

	/**
	 * 批量查找PID下所有流程
	 * @param pid 格式（'1','2','3','4',...）
	 * @return
	 */
	List<FlowManageModel> findFlowByPids(@Param("pid")String pid);
	
	/**
	 * 根据流程组ID查询流程
	 * @param flowGroupid
	 * @return
	 */
	List<FlowManageModel> findFlowByGroupId(@Param("flowGroupid")String flowGroupid);
	
	/**
	 * 根据流程组ids查询流程
	 * @param ids
	 * @return
	 */
	List<FlowManageModel> findFlowByGroupIds(@Param("ids")String ids);

	/**
	 * 流程修改
	 * @param form
	 */
	void flowManageEdit(FlowManageForm form);

	/**
	 * 根据ID删除流程
	 * @param id
	 */
	void flowManageDel(@Param("id")String id);

	/**
	 * 根据流程ID查询是否存在流程依赖关系
	 * @param flowId
	 * @return
	 */
	Integer checkDependency(@Param("flowId")String flowId);
	
	/**
	 * 根据流程ID查询是否被其他流程配置为前置流程
	 * @param flowId
	 * @return
	 */
	Integer checkFlowPrev(@Param("flowId")String flowId);

	/**
	 * 根据流程ID删除流程XML
	 * @param flowId
	 */
	void xmlDel(@Param("flowId")String flowId);

	/**
	 * 获取最近几次的流程执行时间趋势数据 
	 * @param flowId
	 * @param times
	 * @return
	 */ 
	List<TimeChartModel> findTimeChartData(@Param("flowId")String flowId, @Param("times")Integer times);

	/**
	 * 根据流程组加载流程
	 * @param parentId
	 * @param name
	 * @return
	 */
	List<Map<String, Object>> selectChildrenByGroupId(@Param("parentId")Integer parentId, @Param("name")String name);

	/**
	 * 检查流程ID在依赖关系中的唯一性
	 * @param flowId
	 * @return
	 */
	Integer flowIdUnique(@Param("flowId")String flowId);

	/**
	 * 新增流程依赖关系
	 * @param form
	 */
	void addFlowDependency(FlowDependencyForm form);

	/**
	 * 根据条件查询流程依赖关系
	 * @param form
	 * @return
	 */
	Map<String, Object> findDependencyByFlowId(FlowDependencyForm form);
	
	/**
	 * 更新流程依赖关系
	 * @param form
	 */
	void updateFlowDependency(FlowDependencyForm form);

	/**
	 * 删除流程依赖关系
	 * @param form
	 */
	void deleteFlowDependency(FlowDependencyForm form);
	
	/**
	 * 根据flowId查找流程下任务节点
	 * @param flowId
	 * @return
	 */
	List<Map<String, Object>> findTaskNodesByFlowId(@Param("flowId")String flowId);
	
	/**
	 * 根据flowId查找流程下子流程节点
	 * @param flowId
	 * @return
	 */
	List<Map<String, Object>> findFlowNodesByFlowId(@Param("flowId")String flowId);
	
	void updateFlowGroup(@Param("flowGroupId")String flowGroupId,@Param("flowIds")String flowIds);

	List<FlowManageModel> getFlowMonitorList(FlowMonitorForm form);

	Integer getFlowMonitorListCount(FlowMonitorForm form);

	List<FlowHistoryModel> getFlowHistoryList(FlowMonitorForm form);

	Integer getFlowHistoryListCount(FlowMonitorForm form);

	List<TaskMonitorModel> getTaskMonitorList(@Param("flowId")String flowId);

	List<TaskMonitorModel> getTaskHistoryMonitorList(@Param("flowLogId")String flowLogId);

	void flowManageDelLogs(@Param("flowId")String flowId);
	
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
}
