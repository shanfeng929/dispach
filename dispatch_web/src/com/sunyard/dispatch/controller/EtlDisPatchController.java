package com.sunyard.dispatch.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.sunyard.dispatch.model.FlowTaskParaModel;
import com.sunyard.dispatch.model.form.EtlDisPatchForm;
import com.sunyard.dispatch.service.EtlDisPatchService;
import com.sunyard.dispatch.util.BaseController;
import com.sunyard.dispatch.util.Constant;
import com.sunyard.dispatch.util.JsonResult;
import com.sunyard.dispatch.util.JsonResultData;

@RequestMapping(value = "/DisPatch")
@Controller
public class EtlDisPatchController extends BaseController {
	@Resource
	EtlDisPatchService etldispatchservice;


	@RequestMapping(value = "/lasttaskid", produces = "text/html;charset=utf-8")
	@ResponseBody
	public String lastFlowId(@RequestParam(value = "id", required = true) String id) {
		String pid = etldispatchservice.lastFlowId(id);
		return pid;
	}

	/**
	 * 
	 * selectRemote:(查询远程服务器名). <br/>
	 * 
	 * @author CCC
	 * @return
	 * @since JDK 1.6
	 */
	@RequestMapping(value = "/selectremote", produces = "text/html;charset=utf-8")
	@ResponseBody
	public String selectRemote(@RequestParam(value = "reMote"/* , required = true */) String reMote) {
		JsonResultData<Map<String, Object>> jsonResult = new JsonResultData<Map<String, Object>>();
		jsonResult.setList(etldispatchservice.selectRemote(reMote));
		return jsonResult.getJsonResult();
	}

	/**
	 * 
	 * insert:(插入任务节点属性). <br/>
	 * 
	 * @author CCC
	 * @param insertform
	 * @since JDK 1.6
	 */
	@RequestMapping(value = "/insert")
	@ResponseBody
	public JsonResultData<Object> insert(EtlDisPatchForm insertform) {
		JsonResultData<Object> result = new JsonResultData<Object>(true,
				Constant.OperationTips.SUCCESS);
		String username = getUserBySession().getUsername();
		try {
			insertform.setCreateBy(username);
			insertform.setUpdateBy(username);
			etldispatchservice.insert(insertform);
			result.setMessage("插入成功!");
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage("插入失败!");
			logger.error("插入任务节点属性失败",e);
		}
		return result;
	}

	/**
	 * 
	 * MaxTaskId:(查找任务最大ID号). <br/>
	 * 
	 * @author CCC
	 * @return
	 * @since JDK 1.6
	 */

	@RequestMapping(value = "/maxtaskid", produces = "text/html;charset=utf-8")
	@ResponseBody
	public String maxTaskId(
			@RequestParam(value = "tempId", required = true) String tempId,@RequestParam(value = "type", required = true) String type) {
		String createBy = getUserBySession().getUsername();
		String updateBy = getUserBySession().getUsername();
		String id = "task" + etldispatchservice.maxTaskId(tempId,type, createBy, updateBy);
		return id;
	}

	/**
	 * 
	 * checkTaskId:(查找ID号是否存在). <br/>
	 * 
	 * @author CCC
	 * @return
	 * @since JDK 1.6
	 */
	@RequestMapping(value = "/taskid", produces = "text/html;charset=utf-8")
	@ResponseBody
	public String checkTaskId(@RequestParam(value = "id", required = true) String id) {
		String checkid = etldispatchservice.checkTaskId(id);
		if (checkid == null) {
			checkid = "false";
		}
		return checkid;
	}

	/**
	 * 检查ID号是否存在，如果存在返回一个map对象
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/taskIsExist")
	@ResponseBody
	public JsonResult<Map<String, Object>> taskIsExist(
			@RequestParam(value = "id", required = true) String id) {
		JsonResult<Map<String, Object>> result = new JsonResult<Map<String, Object>>(true);
		JsonResultData<Map<String, Object>> resultData = new JsonResultData<Map<String, Object>>();
		try {
			Map<String, Object> map = etldispatchservice.taskIsExist(id);
			result.setItem(map);
			List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
			list.add(map);
			resultData.setList(list);
		} catch (Exception e) {
			e.printStackTrace();
			result.setSuccess(false);
		}
		return result;
	}

	/**
	 * 
	 * selectTaskMsg:(查找已存在的任务节点信息). <br/>
	 * 
	 * @author CCC
	 * @param id
	 * @return
	 * @since JDK 1.6
	 */
	@RequestMapping(value = "/selecttaskmsg", produces = "text/html;charset=utf-8")
	@ResponseBody
	public String selectTaskMsg(
			@RequestParam(value = "id", required = true) String id) {
		JsonResultData<Map<String, Object>> jsonResult = new JsonResultData<Map<String, Object>>();
		jsonResult.setList(etldispatchservice.selectTaskMsg(id));
		return jsonResult.getJsonResult();
	}

	@RequestMapping(value = "/selectparameters", produces = "text/html;charset=utf-8")
	@ResponseBody
	public String selectParameters(
			@RequestParam(value = "paraName", required = true) String paraName) {
		JsonResultData<Map<String, Object>> jsonResult = new JsonResultData<Map<String, Object>>();
		jsonResult.setList(etldispatchservice.selectParameters(paraName));
		return jsonResult.getJsonResult();
	}

	@RequestMapping(value = "/pickupparameters")
	@ResponseBody
	public JsonResult<FlowTaskParaModel> pickUpParameters(String taskName) {
		JsonResult<FlowTaskParaModel> result = new JsonResult<FlowTaskParaModel>(true,
				Constant.OperationTips.SUCCESS);
		try {
			result.setListItems(etldispatchservice.pickUpParameters(taskName));
		} catch (Exception e) {
			e.printStackTrace();
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error("/pickupparameters",e);
		}
		return result;
	}
	@RequestMapping(value = "/setinparameters")
	@ResponseBody
	public JsonResult<FlowTaskParaModel> taskSetParameters(String taskName,String[] ids) {
		JsonResult<FlowTaskParaModel> result = new JsonResult<FlowTaskParaModel>(true,
				"节点输入参数配置成功");
		try{
			etldispatchservice.setTaskInPara(taskName, ids);
		}catch(Exception e){
			e.printStackTrace();
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error("/setinparameters",e);
		}
		return result;
	}
	
	@RequestMapping(value = "/setoutparameters")
	@ResponseBody
	public JsonResult<FlowTaskParaModel> taskSetOutParameters(String taskName,String id) {
		JsonResult<FlowTaskParaModel> result = new JsonResult<FlowTaskParaModel>(true,
				"节点输入参数配置成功");
		try{
			etldispatchservice.setTaskOutPara(taskName, id);
		}catch(Exception e){
			e.printStackTrace();
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error("/setoutparameters",e);
		}
		return result;
	}
	
	
	
	/*
	@RequestMapping(value = "/addparameters")
	@ResponseBody
	public JsonResult<TaskParaModel> addParameters(TaskParaModel model) {
		JsonResult<TaskParaModel> result = new JsonResult<TaskParaModel>(true,
				"节点参数添加成功");
		try {
			result.setMessage("节点参数添加成功");
			result.setListItems(etldispatchservice.addParameters(model));
		} catch (Exception e) {
			if (e.getMessage().startsWith("本")) {
				result.setSuccess(false);
				result.setMessage("已添加过同名变量");
			} else if (e.getMessage().startsWith("未")) {
				result.setSuccess(false);
				result.setMessage("未定义此名称的变量");
			} else {
				result.setSuccess(false);
				result.setMessage("出错，未能成功");
				e.printStackTrace();
			}
		}
		return result;
	}

	@RequestMapping(value = "/editparameters")
	@ResponseBody
	public JsonResult<TaskParaModel> tryEditParameters(TaskParaModel model) {
		JsonResult<TaskParaModel> result = new JsonResult<TaskParaModel>(true,
				"修改成功");
		try {
			result.setMessage("参数修改成功");
			etldispatchservice.tryEditParameters(model);
		} catch (Exception e) {
			if (e.getMessage().startsWith("没")) {
				// result.setSuccess(false);
				result.setMessage("没有变化");
			} else {
				result.setSuccess(false);
				result.setMessage("出错，未能成功");
				e.printStackTrace();
			}
		}
		return result;
	}

	@RequestMapping(value = "/removeparameters")
	@ResponseBody
	public JsonResult<TaskParaModel> removeParameters(TaskParaModel model) {
		JsonResult<TaskParaModel> result = new JsonResult<TaskParaModel>(true,
				"删除成功");
		try {
			etldispatchservice.removePara(model);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage("删除失败");
			e.printStackTrace();
		}
		return result;
	}
*/
	/**
	 * 
	 * update:(更新节点属性). <br/>
	 * 
	 * @author CCC
	 * @param updateform
	 * @return
	 * @since JDK 1.6
	 */
	@RequestMapping(value = "/update")
	@ResponseBody
	public JsonResultData<Object> update(EtlDisPatchForm updateform,String outParamId) {
		JsonResultData<Object> result = new JsonResultData<Object>(true,
				Constant.OperationTips.SUCCESS);
		String username = getUserBySession().getUsername();
		try {
			updateform.setUpdateBy(username);
			etldispatchservice.updte(updateform);
			if(outParamId!=null&&!outParamId.equals("")){
			etldispatchservice.setTaskOutPara(updateform.getId(), outParamId);
			}
			result.setMessage("更新成功!");
			addLogger(Constant.DispatchMenu.TASKLINE_DEFINE, "更新任务成功", Constant.LogLevel.INFO);
		} catch (Exception e) {
			e.printStackTrace();
			result.setSuccess(false);
			result.setMessage("更新失败!");
			addLogger(Constant.DispatchMenu.TASKLINE_DEFINE, "更新任务失败", Constant.LogLevel.ERROR);
			logger.error("更新节点属性失败",e);
		}
		return result;
	}

	/**
	 * 
	 * delete:(删除节点). <br/>
	 * 
	 * @author CCC
	 * @param id
	 * @return
	 * @since JDK 1.6
	 */

	@RequestMapping(value = "/delete")
	@ResponseBody
	public JsonResultData<Object> delete(
			@RequestParam(value = "id", required = true) String id) {
		JsonResultData<Object> result = new JsonResultData<Object>(true,
				Constant.OperationTips.SUCCESS);
		// String username = getUserBySession().getUsername();
		try {

			// etldispatchservice.delete(id);
			result.setMessage("删除成功!");
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage("删除失败!");
			logger.error("删除失败!",e);
		}
		return result;
	}

	@RequestMapping(value = "/getMethod")
	@ResponseBody
	public JSONArray getClassMethod(String className) {
		return etldispatchservice.getClassMethodJson(className);
	}

}
