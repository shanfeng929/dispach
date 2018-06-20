package com.sunyard.dispatch.controller;  

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sunyard.dispatch.model.TaskManageModel;
import com.sunyard.dispatch.model.form.TaskManageForm;
import com.sunyard.dispatch.service.TaskManageService;
import com.sunyard.dispatch.util.BaseController;
import com.sunyard.dispatch.util.Constant;
import com.sunyard.dispatch.util.JsonResult;


/**
 * 任务管理 控制层
 * @author quan.shen
 *
 */
@RequestMapping(value = "/dispatch/task")
@Controller
public class TaskManageController extends BaseController{
	
	@Resource
	TaskManageService taskManageService;
	protected Log logger = LogFactory.getLog(getClass());
	
	/**
	 * 分页查询任务
	 * @param form
	 * @return
	 */
	@RequestMapping("/query")
	@ResponseBody
	public JsonResult<TaskManageModel> query(TaskManageForm form) {
		JsonResult<TaskManageModel> result = new JsonResult<TaskManageModel>(true, Constant.OperationTips.SUCCESS);
		try {
			String taskName = java.net.URLDecoder.decode(form.getTaskName(), "UTF-8");
			String flowName = java.net.URLDecoder.decode(form.getFlowName(), "UTF-8");
			form.setTaskName(taskName);
			form.setFlowName(flowName);
			result.setPageItems(taskManageService.getTaskManageList(form));
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error(e);
		}
		return result;
	}
	
	@RequestMapping("/findTaskById")
	@ResponseBody
	public JsonResult<TaskManageModel> findTaskById(TaskManageForm form) {
		JsonResult<TaskManageModel> result = new JsonResult<TaskManageModel>(true, Constant.OperationTips.SUCCESS);
		try {
			result.setItem(taskManageService.findTaskById(form));
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error(e);
		}
		return result;
	}
	
	/**
	 * 任务修改
	 * @param form
	 * @return
	 */
	@RequestMapping("/update")
	@ResponseBody
	public JsonResult<TaskManageModel> update(TaskManageForm form) {
		JsonResult<TaskManageModel> result = new JsonResult<TaskManageModel>(true, Constant.OperationTips.SUCCESS);
		try {
			form.setUpdatedBy(getUserBySession().getUser().getLoginName());
			taskManageService.taskManageEdit(form);
			result.setMessage("任务修改成功");
//			addLogger("操作成功", "任务修改成功", Constant.LogLevel.INFO);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage("任务修改失败");
//			addLogger("操作失败", "任务修改失败", Constant.LogLevel.ERROR);
			logger.error(e);
		}
		return result;
	}
	
}
  
