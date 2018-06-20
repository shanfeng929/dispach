package com.sunyard.dispatch.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.dao.TaskManageDao;
import com.sunyard.dispatch.model.TaskManageModel;
import com.sunyard.dispatch.model.form.TaskManageForm;
import com.sunyard.dispatch.service.TaskManageService;

@Service("taskManageService")
public class TaskServiceImpl implements TaskManageService {
	
	@Resource
	private TaskManageDao taskManageDao;

	@Override
	public Page<TaskManageModel> getTaskManageList(TaskManageForm form) {
		// TODO Auto-generated method stub
		List<TaskManageModel> taskManages = taskManageDao.getTaskManageList(form);
		Integer count = taskManageDao.getTaskManageListCount(form);
		return new Page<TaskManageModel>(form.getStart(), form.getLimit(), count, taskManages);
	}
	
	@Override
	public TaskManageModel findTaskById(TaskManageForm form) {
		return taskManageDao.findTaskById(form);
	}

	@Override
	public void taskManageEdit(TaskManageForm form) {
		taskManageDao.taskManageEdit(form);
	}

}
