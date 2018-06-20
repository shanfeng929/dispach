package com.sunyard.dispatch.controller;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sunyard.dispatch.annotation.WriteLog;
import com.sunyard.dispatch.enums.LogDict;
import com.sunyard.dispatch.model.FlowTaskParaModel;
import com.sunyard.dispatch.model.form.EtlFlowDisPatchForm;
import com.sunyard.dispatch.service.EtlDisPatchService;
import com.sunyard.dispatch.service.EtlFlowDisPatchService;
import com.sunyard.dispatch.util.BaseController;
import com.sunyard.dispatch.util.Constant;
import com.sunyard.dispatch.util.JsonResult;
import com.sunyard.dispatch.util.JsonResultData;

@RequestMapping(value = "/DisPatch/EtlFlow")
@Controller
public class EtlFlowDisPatchController extends BaseController {
	@Resource
	EtlFlowDisPatchService etlflowdispatchservice;
	@Resource
	EtlDisPatchService etldispatchservice;
	
	/**
	 * 选择任务链
	 * @return
	 */
	@WriteLog(log=LogDict.Task_Chain_Select)
	@RequestMapping(value = "/selectflowgroup", produces = "text/html;charset=utf-8")
	@ResponseBody
	public String SelectFlowGroup() {
		JsonResultData<Map<String, Object>> result = new JsonResultData<Map<String, Object>>();
		result.setList(etlflowdispatchservice.SelectFlowGroup());
		return result.getJsonResult();
	}

	@RequestMapping(value = "/maxflowid", produces = "text/html;charset=utf-8")
	@ResponseBody
	public String maxFlowId() {
		String id = "flow" + etlflowdispatchservice.maxFlowId();
		return id;
	}

	/**
	 * 
	 * maxFlowId:(查找上一层界面ID). <br/>
	 * 
	 * @author CCC
	 * @return
	 * @since JDK 1.6
	 */

	@RequestMapping(value = "/lastflowid", produces = "text/html;charset=utf-8")
	@ResponseBody
	public String lastFlowId(
			@RequestParam(value = "id", required = true) String id) {

		String pid = etlflowdispatchservice.lastFlowId(id);
		return pid;
	}

	@RequestMapping(value = "/maxsubflowid", produces = "text/html;charset=utf-8")
	@ResponseBody
	public String MaxSubFlowId(
			@RequestParam(value = "tempId", required = true) String tempId) {
		String createBy = getUserBySession().getUsername();
		String updateBy = getUserBySession().getUsername();
		String id = "flow"
				+ etlflowdispatchservice.MaxSubFlowId(tempId, createBy,
						updateBy);
		return id;
	}

	@RequestMapping(value = "/selectloaddata", produces = "text/html;charset=utf-8")
	@ResponseBody
	public String SelectLoadData(
			@RequestParam(value = "flowId", required = true) String flowId) {
		String loadData = etlflowdispatchservice.SelectLoadData(flowId);
		return loadData;
	}
	/**
	 * 添加任务链
	 * @param flowform
	 * @return
	 */
	@WriteLog(log=LogDict.Task_Chain_Add)
	@RequestMapping(value = "/insert")
	@ResponseBody
	public JsonResultData<Object> insert(EtlFlowDisPatchForm flowform) {
		JsonResultData<Object> result = new JsonResultData<Object>(true,
				Constant.OperationTips.SUCCESS);
		String username = getUserBySession().getUsername();
		try {
			flowform.setCreateBy(username);
			flowform.setUpdateBy(username);
			etlflowdispatchservice.insert(flowform);
			result.setMessage("插入成功!");
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage("插入失败!");
			if ("已存在同名流程".equals(e.getMessage())) {
				result.setMessage("该流程名已存在，请修改");
			} else {
				result.setMessage("流程插入失败!");
			}
		}
		return result;
	}
	/**
	 * 流程保存成功
	 * @param taskId
	 * @param update
	 * @param insert
	 * @param loadData
	 * @param flowId
	 * @param arrow
	 * @return
	 */
	@WriteLog(log=LogDict.Task_Chain_Save)
	@RequestMapping(value = "/insertxml")
	@ResponseBody
	public JsonResultData<Object> insertXml(
			@RequestParam(value = "taskId", required = true) String taskId,
			@RequestParam(value = "update", required = true) String update,
			@RequestParam(value = "insert", required = true) String insert,
			@RequestParam(value = "loadData", required = true) String loadData,
			@RequestParam(value = "flowId", required = true) String flowId,
			@RequestParam(value = "arrow", required = true) String arrow) {
		JsonResultData<Object> result = new JsonResultData<Object>(true, Constant.OperationTips.SUCCESS);
		int len = taskId.length();
		String deleteflow = "";
		String deletetask = "";
		if (len > 0) {
			taskId = taskId.substring(1, len);
		}
		String[] task = taskId.split(",");
		String[] updatesql = update.split(";");
		String[] insertsql = insert.split(";");
		String username = getUserBySession().getUsername();
		String execsql = null;
		if (updatesql[0] != "") {
			for (int sqlnum = 0; sqlnum < updatesql.length; sqlnum++) {
				execsql = etlflowdispatchservice.ExecSql(updatesql[sqlnum],insertsql[sqlnum], flowId, username);
			}
		}
		String xml = "<?xml version=\"1.0\" encoding=\"gb2312\" ?>  <job> ";
		JSONArray taskmessage = new JSONArray();
		for (int i = 0; i < task.length; i++) {
			int Subflow = task[i].indexOf("flow");
			if (Subflow < 0) {
				taskmessage = JSON.parseArray(JSON.toJSONString(etldispatchservice.selectTaskMsg(task[i])));
				if (taskmessage.size() > 0) {
					if (deletetask == "") {
						deletetask = "'" + task[i] + "'";
					} else {
						deletetask = deletetask + ", '" + task[i] + "'";
					}
					JSONObject job = taskmessage.getJSONObject(0); // 遍历 jsonarray 数组，把每一个对象转成 json 对象
					xml = xml + " <task ID=\"" + job.get("id")
							+ "\"  taskName=\"" + job.get("taskName")
							+ "\"  taskCnName=\"" + job.get("taskCnName")
							+ "\" joinNum=\"" + job.get("joinNum")
							+ "\"  isSubflow=\"" + job.get("isSubflow")
							+ "\" /> ";
				}
			} else {
				taskmessage = JSON.parseArray(JSON.toJSONString(etlflowdispatchservice.selectFlowMessage(task[i])));
				if (taskmessage.size() > 0) {
					if (deleteflow == "") {
						deleteflow = "'" + task[i] + "'";
					} else {
						deleteflow = deleteflow + ", '" + task[i] + "'";
					}
					JSONObject job = taskmessage.getJSONObject(0); // 遍历 jsonarray 数组，把每一个对象转成 json 对象
					xml = xml + " <task ID=\"" + job.get("id")
							+ "\"  taskName=\"" + job.get("flowName")
							/*+ "\"  taskCnName=\"" + job.get("flowCnName")*/
							+ "\" joinNum=\"" + job.get("joinNum")
							+ "\"  isSubflow=\"" + job.get("isSubflow")
							+ "\" /> ";
				}
			}
		}
		xml = xml + arrow + " </job>";
		String checkflow = etlflowdispatchservice.checkFlowIdInXml(flowId);
		if (checkflow.equals("false")) {
			etlflowdispatchservice.insertXml(xml, loadData, flowId,username);
		} else if (checkflow.equals("true")) {
			etlflowdispatchservice.updateXml(xml, loadData, flowId,username);
		}
		if (deletetask == "") {
			deletetask = "''";
		}
		if (deleteflow == "") {
			deleteflow = "''";
		}
		etldispatchservice.delete(deletetask, flowId);
		etlflowdispatchservice.subFlowdelete(deleteflow, flowId);
		return result;
	}

	public String getSonId(String id) {
		return id;

	}

	@RequestMapping(value = "/flowid", produces = "text/html;charset=utf-8")
	@ResponseBody
	public String checkFlowId(@RequestParam(value = "id", required = true) String id) {
		String checkid = etlflowdispatchservice.checkFlowId(id);
		if (checkid == null) {
			checkid = "false";
		}
		return checkid;

	}

	@RequestMapping(value = "/selectflowmessage", produces = "text/html;charset=utf-8")
	@ResponseBody
	public String selectFlowMessage(
			@RequestParam(value = "id", required = true) String id) {
		JsonResultData<Map<String, Object>> result = new JsonResultData<Map<String, Object>>();
		result.setList(etlflowdispatchservice.selectFlowMessage(id));

		return result.getJsonResult();

	}
	/**
	 * 删除任务链流程
	 * @param tempId
	 * @return
	 */
	@WriteLog(log=LogDict.Task_Chain_Delete)
	@RequestMapping(value = "/deletetempid")
	@ResponseBody
	public JsonResultData<Object> DeleteTempId(
			@RequestParam(value = "tempId", required = true) String tempId) {
		JsonResultData<Object> result = new JsonResultData<Object>(true,
				Constant.OperationTips.SUCCESS);
		etlflowdispatchservice.deleteTempId(tempId);
		return result;
	}

	@RequestMapping(value = "/updateinit")
	@ResponseBody
	public JsonResultData<Object> updateInIt(EtlFlowDisPatchForm flowform) {
		JsonResultData<Object> result = new JsonResultData<Object>(true,
				Constant.OperationTips.SUCCESS);
		String username = getUserBySession().getUsername();

		try {
			flowform.setUpdateBy(username);
			etlflowdispatchservice.updateInIt(flowform);
			result.setMessage("更新成功!");
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage("更新失败!");
			logger.error("updateinit更新失败!",e);
		}
		return result;

	}
	
	@RequestMapping(value = "/getflowpara")
	@ResponseBody
	public JsonResult<FlowTaskParaModel> getFlowPara(String flowId){
		JsonResult<FlowTaskParaModel> result = new JsonResult<FlowTaskParaModel>(true,Constant.OperationTips.SUCCESS);
		try{
			result.setListItems(etlflowdispatchservice.getFlowPara(flowId));
			result.setMessage("参数获取成功");
		}catch(Exception e){
			e.printStackTrace();
			result.setSuccess(false);
			result.setMessage("参数获取失败");
			logger.error("参数获取失败",e);
		}
		return result;
	}
	/**
	 * 流程参数配置 -> 修改参数
	 * @param flowParas
	 * @return
	 * @throws Exception 
	 */
	@WriteLog(log=LogDict.Task_Paramter_Update)
	@RequestMapping(value = "/editflowpara")
	@ResponseBody
	public JsonResult<FlowTaskParaModel> editFlowPara(FlowTaskParaModel flowParas) throws Exception{
		JsonResult<FlowTaskParaModel> result = new JsonResult<FlowTaskParaModel>(true,Constant.OperationTips.SUCCESS);
		if (flowParas.getId() == null) {
			etlflowdispatchservice.newFlowPara(flowParas);
		} else {
			etlflowdispatchservice.newFlowPara(flowParas);
		}
		result.setMessage("参数编辑成功");
		return result;
	}
	
	@RequestMapping(value = "/newflowpara")
	@ResponseBody
	public JsonResult<FlowTaskParaModel> newFlowPara(FlowTaskParaModel flowParas){
		JsonResult<FlowTaskParaModel> result = new JsonResult<FlowTaskParaModel>(true,Constant.OperationTips.SUCCESS);
		try{
			etlflowdispatchservice.newFlowPara(flowParas);
			result.setMessage("空参数新增成功");
		}catch(Exception e){
			e.printStackTrace();
			result.setSuccess(false);
			result.setMessage("空参数新增失败");
			logger.error("空参数新增失败",e);
		}
		return result;
	}
	
	@RequestMapping(value = "/insertflowpara")
	@ResponseBody
	public JsonResult<FlowTaskParaModel> insertFlowPara(FlowTaskParaModel flowParas){
		JsonResult<FlowTaskParaModel> result = new JsonResult<FlowTaskParaModel>(true,Constant.OperationTips.SUCCESS);
		try{
			etlflowdispatchservice.insertFlowPara(flowParas);
			result.setMessage("参数新增成功");
		}catch(Exception e){
			e.printStackTrace();
			result.setSuccess(false);
			result.setMessage("参数新增失败");
			logger.error("参数新增失败",e);
		}
		return result;
	}
	
	@RequestMapping(value = "/removenewflowpara")
	@ResponseBody
	public JsonResult<FlowTaskParaModel> removeNewFlowPara(FlowTaskParaModel flowParas){
		JsonResult<FlowTaskParaModel> result = new JsonResult<FlowTaskParaModel>(true,Constant.OperationTips.SUCCESS);
		try{
			etlflowdispatchservice.removeNewFlowPara(flowParas);
			result.setMessage("空参数删除成功");
		}catch(Exception e){
			e.printStackTrace();
			result.setSuccess(false);
			result.setMessage("空参数删除失败");
			logger.error("空参数删除失败",e);
		}
		return result;
	}
	/**
	 * 参数配置-删除选中的参数
	 * @param ids
	 * @return
	 */
	@WriteLog(log=LogDict.Task_Paramter_Update)
	@RequestMapping(value = "/deleteflowpara")
	@ResponseBody
	public JsonResult<FlowTaskParaModel> deleteFlowPara(String[] ids){
		JsonResult<FlowTaskParaModel> result = new JsonResult<FlowTaskParaModel>(true,Constant.OperationTips.SUCCESS);
		try{
			etlflowdispatchservice.deleteFlowPara(ids);
			result.setMessage("空参数删除成功");
		}catch(Exception e){
			e.printStackTrace();
			result.setSuccess(false);
			result.setMessage("空参数删除失败");
			logger.error("空参数删除成功",e);
		}
		return result;
	}

}
