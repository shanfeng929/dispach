package com.sunyard.dispatch.controller;  

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.sunyard.dispatch.annotation.WriteLog;
import com.sunyard.dispatch.enums.LogDict;
import com.sunyard.dispatch.model.FlowGroupModel;
import com.sunyard.dispatch.model.form.FlowGroupForm;
import com.sunyard.dispatch.service.FlowGroupService;
import com.sunyard.dispatch.util.BaseController;
import com.sunyard.dispatch.util.Constant;
import com.sunyard.dispatch.util.JsonResult;


/**
 * 任务链包管理 控制层
 * @author quan.shen
 *
 */
@RequestMapping(value = "/dispatch/flowGroup")
@Controller
public class FlowGroupController extends BaseController{
	@Resource
	FlowGroupService flowGroupService;
	protected Log logger = LogFactory.getLog(getClass());
	
	/**
	 * 分页查询任务链包
	 * @param form
	 * @return
	 */
	@RequestMapping("/query")
	@ResponseBody
	public JsonResult<FlowGroupModel> query(FlowGroupForm form) {
		JsonResult<FlowGroupModel> result = new JsonResult<FlowGroupModel>(true, Constant.OperationTips.SUCCESS);
		try {
			String flowGroupName = java.net.URLDecoder.decode(form.getFlowGroupName(), "UTF-8");
			form.setFlowGroupName(flowGroupName);
			result.setPageItems(flowGroupService.getFlowGroupPageList(form));
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error(e);
		}
		return result;
	}
	
	/**
	 * 条件查询任务链包
	 * @param form
	 * @return
	 */
	@RequestMapping("/queryList")
	@ResponseBody
	public JsonResult<FlowGroupModel> queryList(FlowGroupForm form) {
		JsonResult<FlowGroupModel> result = new JsonResult<FlowGroupModel>(true, Constant.OperationTips.SUCCESS);
		try {
			result.setListItems(flowGroupService.getFlowGroupList(form));
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error(e);
		}
		return result;
	}
	
	
	/**
	 * 根据ID查询任务链包
	 * @param id
	 * @return
	 */
	@RequestMapping("/findFlowById")
	@ResponseBody
	public JsonResult<FlowGroupModel> findFlowById(Integer id){
		JsonResult<FlowGroupModel> result = new JsonResult<FlowGroupModel>(true, Constant.OperationTips.SUCCESS);
		try {
			result.setItem(flowGroupService.findFlowById(id));
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error(e);
		}
		return result;
	}
	
	/**
	 * 保存或修改任务链包
	 * @param form
	 * @return
	 */
	@WriteLog(log=LogDict.Base_Task_Save)
	@RequestMapping("/saveOrUpdate")
	@ResponseBody
	public JsonResult<FlowGroupModel> saveOrUpdate(FlowGroupForm form) {
		JsonResult<FlowGroupModel> result = new JsonResult<FlowGroupModel>(true, Constant.OperationTips.SUCCESS);
		if (form.getId() == null || "".equals(form.getId())) {// 新增
			form.setCreateBy(getUserBySession().getUser().getLoginName());
			flowGroupService.flowGroupAdd(form);
			result.setMessage("任务链包新增成功");
		} else {// 修改
			form.setUpdatedBy(getUserBySession().getUser().getLoginName());
			flowGroupService.flowGroupEdit(form);
			result.setMessage("任务链包修改成功");
		}
		return result;
	}
	
//	/**
//	 * 根据ID删除任务链包
//	 * @param id
//	 * @return
//	 */
//	@RequestMapping("/delete")
//	@ResponseBody
//	public JsonResult<FlowGroupModel> delete(String id){
//		JsonResult<FlowGroupModel> result = new JsonResult<FlowGroupModel>(true, Constant.OperationTips.SUCCESS);
//		try {
//			flowGroupService.flowGroupDel(id);
//			result.setMessage("任务链包删除成功");
//			addLogger("操作成功", "任务链包删除成功", Constant.LogLevel.INFO);
//		} catch (Exception e) {
//			result.setSuccess(false);
//			String message = e.getMessage();
//			if("该任务链包被其它流程关联".equals(message)){
//				message = "该任务链包被其它流程关联";
//			}
//			result.setMessage(message);
//			addLogger("操作失败", message, Constant.LogLevel.ERROR);
//			logger.error(e);
//		}
//		return result;
//	}
	
	/**
	 * 根据拼接而成的ids,批量删除任务链包
	 * @param ids
	 * @return
	 */
	@WriteLog(log=LogDict.Base_Task_Delete)
	@RequestMapping("/deleteByIds")
	@ResponseBody
	public JsonResult<FlowGroupModel> deleteByIds(String ids){
		JsonResult<FlowGroupModel> result = new JsonResult<FlowGroupModel>(true, Constant.OperationTips.SUCCESS);
		try {
			flowGroupService.flowGroupDelByIds(ids);
			result.setMessage("任务链包删除成功");
		} catch (Exception e) {
			result.setSuccess(false);
			String message = e.getMessage();
			if("该任务链包被其它流程关联".equals(message)){
				message = "该任务链包被其它流程关联";
			}
			result.setMessage(message);
		}
		return result;
	}
	
	/* dispatch 3.0 */
	/**
	 * 加载流程树
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@WriteLog(log=LogDict.Task_Chain_Query)
	@RequestMapping("/showFlowTree")
	@ResponseBody
	public List<Map<String, Object>> showFlowTree(String parentId,String name) throws UnsupportedEncodingException{
		List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>();
		parentId = java.net.URLDecoder.decode(parentId, "UTF-8");
		name = java.net.URLDecoder.decode(name, "UTF-8");
		dataList =  flowGroupService.getFlowTreeData(parentId,name);
		return dataList;
	}
	
	/**
	 * 加载流程树
	 * @return
	 */
	@WriteLog(log=LogDict.Base_Task_Query)
	@RequestMapping("/showFlowGroupTree")
	@ResponseBody
	public List<Map<String,Object>> showFlowGroupTree(String pid){
		List<Map<String,Object>> maps = new ArrayList<Map<String,Object>>();
		maps = flowGroupService.getFlowGroupTreeData(pid);
		return maps;
	}
	
	@RequestMapping("/getChildPackage")
	@ResponseBody
	public List<Map<String,Object>> getChildPackage(String pid){
		return flowGroupService.getChildPackage(pid);
	}
	/**
	 * 
	 * @param flowGroupForms
	 * @return
	 */
	@WriteLog(log=LogDict.Base_Task_Update)
	@RequestMapping("/insertOrUpateFlowGroup")
	@ResponseBody
	public Map<Object, Object> insertOrUpateFlowGroup(String flowGroupForms) {
		boolean flag = true;
		String message = "";
		Map<Object, Object> map = new HashMap<Object, Object>();
		List<FlowGroupForm> forms = JSON.parseArray(flowGroupForms,
				FlowGroupForm.class);
		String loginName = getUserBySession().getLoginName();
		for (FlowGroupForm form : forms) {
			form.setCreateBy(loginName);
			form.setUpdatedBy(loginName);
		}
		Integer id = flowGroupService.insertOrUpateFlowGroup(forms);
		if (null != id) {
			map.put("id", id);
		}
		message = "更新成功";
		map.put("success", flag);
		map.put("message", message);

		return map;
	}
	
	/**
	 * 
	 * @param id
	 * @return
	 */
	@WriteLog(log=LogDict.Base_Task_Delete)
	@RequestMapping("/deleteFlowGroup")
	@ResponseBody
	public Map<Object,Object> deleteFlowGroup(String id){
		Map<Object, Object> map = new HashMap<Object, Object>();
		String s = flowGroupService.deleteFlowGroup(id);
		map.put("success", true);
		if ("2".equals(s)) {
			map.put("message", "该任务链包被任务链关联,不允许删除");
		} else {
			map.put("message", "删除成功");
		}
		return map;
	}
	
	@RequestMapping("/showGroupTree")
	@ResponseBody
	public List<Map<String, Object>> showGroupTree(String parentId){
		List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>();
		try {
			parentId = java.net.URLDecoder.decode(parentId, "UTF-8");
			dataList =  flowGroupService.getGroupTreeData(parentId);
			logger.info(dataList);
		} catch (Exception e) {
			logger.error(e);
		}
		return dataList;
	}
	
}
  
