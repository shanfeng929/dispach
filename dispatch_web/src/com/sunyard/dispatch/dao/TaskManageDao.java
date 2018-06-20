package com.sunyard.dispatch.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sunyard.dispatch.model.TaskDependencyModel;
import com.sunyard.dispatch.model.TaskManageModel;
import com.sunyard.dispatch.model.form.TaskManageForm;


public interface TaskManageDao {

	/**
	 * 查询任务列表
	 * @param form
	 * @return
	 */
	List<TaskManageModel> getTaskManageList(TaskManageForm form);

	/**
	 * 条件查询任务列表总条数
	 * @param form
	 * @return
	 */
	Integer getTaskManageListCount(TaskManageForm form);

	/**
	 * 根据ID查询任务
	 * @param form
	 * @return
	 */
	TaskManageModel findTaskById(TaskManageForm form);

	/**
	 * 根据PID查询任务列表
	 * @param pid
	 * @return
	 */
	List<TaskManageModel> findTaskByPId(@Param("pid")String pid);
	
	/**
	 * 批量查询PID下任务依赖关系
	 * @param pid 格式('1','2','3','4',...)
	 * @return
	 */
	List<TaskDependencyModel> findTaskByPids(@Param("pid")String pid);
	
	/**
	 * 任务修改
	 * @param form
	 */
	void taskManageEdit(TaskManageForm form);

	/**
	 * 根据ID删除任务
	 * @param id
	 */
	void taskManageDel(@Param("id")String id);

	/**
	 * 根据流程ID批量删除任务依赖关系
	 * @param flowId
	 */
	void delTaskDependencyByFlowId(@Param("flowId")String flowId);

	/**
	 * 根据任务ID批量删除任务
	 * @param taskIds 格式为1,2,3,...
	 */
	void delTaskByIds(@Param("taskIds")String taskIds);

	void delTaskLogsByIds(@Param("taskIds")String taskIds);

	void delTaskLogsByPids(@Param("pids")String pids);


}
