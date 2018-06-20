package com.sunyard.dispatch.service;  

import org.springframework.transaction.annotation.Transactional;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.model.TaskManageModel;
import com.sunyard.dispatch.model.form.TaskManageForm;

/**
 * 任务 业务逻辑处理层
 * @author quan.shen
 *
 */
public interface TaskManageService {

	/**
	 * 分页查询任务
	 * @param form
	 * @return
	 */
	@Transactional
	Page<TaskManageModel> getTaskManageList(TaskManageForm form);

	/**
	 * 根据ID查询任务
	 * @param form
	 * @return
	 */
	@Transactional
	TaskManageModel findTaskById(TaskManageForm form);

	/**
	 * 任务修改
	 * @param form
	 */
	@Transactional
	void taskManageEdit(TaskManageForm form);
	
}
	
