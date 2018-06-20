package com.sunyard.dispatch.controller;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.annotation.WriteLog;
import com.sunyard.dispatch.common.ExcelView;
import com.sunyard.dispatch.enums.LogDict;
import com.sunyard.dispatch.model.FlowHistoryModel;
import com.sunyard.dispatch.model.FlowManageModel;
import com.sunyard.dispatch.model.TaskMonitorModel;
import com.sunyard.dispatch.model.TimeChartModel;
import com.sunyard.dispatch.model.form.FlowDependencyForm;
import com.sunyard.dispatch.model.form.FlowManageForm;
import com.sunyard.dispatch.model.form.FlowMonitorForm;
import com.sunyard.dispatch.service.FlowManageService;
import com.sunyard.dispatch.util.BaseController;
import com.sunyard.dispatch.util.Constant;
import com.sunyard.dispatch.util.JsonResult;

/**
 * 任务链管理 控制层
 * 
 * @author quan.shen
 *
 */
@RequestMapping(value = "/dispatch/flow")
@Controller
public class FlowManageController extends BaseController {
	@Resource
	FlowManageService flowManageService;
	protected Log logger = LogFactory.getLog(getClass());

	/**
	 * 分页查询任务链管理
	 * 
	 * @param form
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@WriteLog(log=LogDict.Task_Schedule_Query)
	@RequestMapping("/query")
	@ResponseBody
	public JsonResult<FlowManageModel> query(FlowManageForm form) throws UnsupportedEncodingException {
		JsonResult<FlowManageModel> result = new JsonResult<FlowManageModel>(true, Constant.OperationTips.SUCCESS);
		String flowName = java.net.URLDecoder.decode(form.getFlowName(),"UTF-8");
		// String flowBranch = java.net.URLDecoder.decode(
		// form.getFlowBranch(), "UTF-8");
		form.setFlowName(flowName);
		// form.setFlowBranch(flowBranch);
		result.setPageItems(flowManageService.getFlowManageList(form));
		return result;
	}

	/**
	 * 分页查询运行中任务链
	 * 
	 * @param form
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@WriteLog(log=LogDict.Task_Monitor_Query)
	@RequestMapping("/queryMonitor")
	@ResponseBody
	public JsonResult<FlowManageModel> queryMonitor(FlowMonitorForm form) throws UnsupportedEncodingException {
		JsonResult<FlowManageModel> result = new JsonResult<FlowManageModel>(true, Constant.OperationTips.SUCCESS);
		String flowName = java.net.URLDecoder.decode(form.getFlowName(),"UTF-8");
		form.setFlowName(flowName);
		Page<FlowManageModel> page = flowManageService.getFlowMonitorList(form);
		result.setPageItems(page);
		return result;
	}
	
	/**
	 * 分页查询历史任务链
	 * 
	 * @param form
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@WriteLog(log=LogDict.Task_History_Query)
	@RequestMapping("/queryHistory")
	@ResponseBody
	public JsonResult<FlowHistoryModel> queryHistory(FlowMonitorForm form) throws UnsupportedEncodingException {
		JsonResult<FlowHistoryModel> result = new JsonResult<FlowHistoryModel>(true, Constant.OperationTips.SUCCESS);
		String flowName = java.net.URLDecoder.decode(form.getFlowName(),"UTF-8");
		form.setFlowName(flowName);
		Page<FlowHistoryModel> page = flowManageService.getFlowHistoryList(form);
		result.setPageItems(page);
		return result;
	}

	/**
	 * 条件查询所有任务链
	 * 
	 * @param form
	 * @return
	 */
	@WriteLog(log=LogDict.Task_Schedule_Query)
	@RequestMapping("/queryList")
	@ResponseBody
	public JsonResult<FlowManageModel> queryList(FlowManageForm form) {
		JsonResult<FlowManageModel> result = new JsonResult<FlowManageModel>(
				true, Constant.OperationTips.SUCCESS);
		result.setListItems(flowManageService.getFlowList(form));
		return result;
	}

	/**
	 * 根据ID查询任务链
	 * 
	 * @param id
	 * @return
	 */
	@WriteLog(log=LogDict.Task_Schedule_Query)
	@RequestMapping("/findFlowById")
	@ResponseBody
	public JsonResult<FlowManageModel> findFlowById(String id) {
		JsonResult<FlowManageModel> result = new JsonResult<FlowManageModel>(true, Constant.OperationTips.SUCCESS);
		FlowManageModel flowManageModel = flowManageService.findFlowById(id);
		result.setItem(flowManageModel);
		return result;
	}

	/**
	 * 任务链修改
	 * 
	 * @param form
	 * @return
	 * @throws Exception 
	 */
	@WriteLog(log=LogDict.Task_Schedule_Update)
	@RequestMapping("/update")
	@ResponseBody
	public JsonResult<FlowManageModel> update(FlowManageForm form)throws Exception {
		JsonResult<FlowManageModel> result = new JsonResult<FlowManageModel>(
				true, Constant.OperationTips.SUCCESS);
		form.setUpdatedBy(getUserBySession().getUser().getLoginName());
		if (form.getCreator().equals("人工") || form.getCreator().equals("0")) {
			form.setCreator("0");
			form.setNextStartunit("");
		}
		if (form.getNextStartunit().equals("WEEK")) {
			form.setNextStartunit(form.getDayOfWeek());
		}
		flowManageService.flowManageEdit(form);
		result.setMessage("任务链修改修改成功");
		return result;
	}

	/**
	 * 条件查询任务链依赖关系
	 * 
	 * @param form
	 * @return
	 */
	@WriteLog(log=LogDict.Task_Schedule_Query)
	@RequestMapping("/findDependencyByFlowId")
	@ResponseBody
	public JsonResult<FlowManageModel> findDependencyByFlowId(
			FlowDependencyForm form) {
		JsonResult<FlowManageModel> result = new JsonResult<FlowManageModel>(
				true, Constant.OperationTips.SUCCESS);
		result.setMapItems(flowManageService.findDependencyByFlowId(form));
		return result;
	}

	/**
	 * 任务链依赖新增或修改
	 * 
	 * @param form
	 * @return
	 */
	@WriteLog(log=LogDict.Task_Schedule_Update)
	@RequestMapping("/saveOrUpdateDependency")
	@ResponseBody
	public JsonResult<FlowManageModel> saveOrUpdateDependency(
			FlowDependencyForm form) {
		JsonResult<FlowManageModel> result = new JsonResult<FlowManageModel>(
				true, Constant.OperationTips.SUCCESS);
		flowManageService.saveOrUpdateDependency(form);
		result.setMessage("任务链依赖修改成功");
		return result;
	}

	/**
	 * 根据ID删除任务链
	 * 
	 * @param id
	 * @return
	 * @throws Exception 
	 */
	@WriteLog(log=LogDict.Task_Schedule_Delete)
	@RequestMapping("/delete")
	@ResponseBody
	public JsonResult<FlowManageModel> delete(String id) throws Exception {
		JsonResult<FlowManageModel> result = new JsonResult<FlowManageModel>(
				true, Constant.OperationTips.SUCCESS);
		flowManageService.flowManageDel(id);
		result.setMessage("任务链删除成功");
		return result;
	}

	/**
	 * 获取执行时间趋势数据
	 * 
	 * @param flowId
	 * @param times
	 *            获取的最近次数
	 * @return
	 */
	@WriteLog(log=LogDict.Task_Schedule_Query)
	@RequestMapping("/timeChartData")
	@ResponseBody
	public JsonResult<TimeChartModel> timeChartData(String flowId, Integer times) {
		JsonResult<TimeChartModel> result = new JsonResult<TimeChartModel>(
				true, Constant.OperationTips.SUCCESS);
		result.setListItems(flowManageService.timeChartData(flowId, times));
		result.setMessage("获取执行时间趋势数据成功");
		return result;
	}

	/**
	 * 开始执行任务链
	 * 
	 * @param flowId
	 * @return
	 * @throws Exception 
	 */
	@WriteLog(log=LogDict.Task_Schedule_Start)
	@RequestMapping("/flowStart")
	@ResponseBody
	public JsonResult<FlowManageModel> flowStart(String flowId) throws Exception {
		JsonResult<FlowManageModel> result = new JsonResult<FlowManageModel>(true, Constant.OperationTips.SUCCESS);
		FlowManageForm form = new FlowManageForm();
		form.setUpdatedBy(getUserBySession().getUser().getLoginName());
		form.setId(flowId);
		flowManageService.flowStart(form);
		result.setMessage("开启任务链成功");
		return result;

	}

	/**
	 * 任务链暂停或者挂起
	 * 
	 * @param flowId
	 * @return
	 * @throws Exception 
	 */
	@WriteLog(log=LogDict.Task_Monitor_Stop)
	@RequestMapping("/flowStop")
	@ResponseBody
	public JsonResult<FlowManageModel> flowStop(String flowId) throws Exception {
		JsonResult<FlowManageModel> result = new JsonResult<FlowManageModel>(true, Constant.OperationTips.SUCCESS);
		FlowManageForm form = new FlowManageForm();
		form.setUpdatedBy(getUserBySession().getUser().getLoginName());
		form.setId(flowId);
		flowManageService.flowStop(form);
		result.setMessage("暂停任务链成功");
		return result;
	}

	/**
	 * 任务链重启或者恢复
	 * 
	 * @param flowId
	 * @return
	 * @throws Exception 
	 */
	@WriteLog(log=LogDict.Task_Monitor_ReStart)
	@RequestMapping("/flowRestart")
	@ResponseBody
	public JsonResult<FlowManageModel> flowRestart(String flowId) throws Exception {
		JsonResult<FlowManageModel> result = new JsonResult<FlowManageModel>(true, Constant.OperationTips.SUCCESS);
		FlowManageForm form = new FlowManageForm();
		form.setUpdatedBy(getUserBySession().getUser().getLoginName());
		form.setId(flowId);
		flowManageService.flowRestart(form);
		result.setMessage("恢复任务链成功");
		return result;

	}

	/**
	 * 任务链终止
	 * 
	 * @param flowId
	 * @return
	 * @throws Exception 
	 */
	@WriteLog(log=LogDict.Task_Monitor_Terminate)
	@RequestMapping("/flowTerminate")
	@ResponseBody
	public JsonResult<FlowManageModel> flowTerminate(String flowId) throws Exception {
		JsonResult<FlowManageModel> result = new JsonResult<FlowManageModel>(true, Constant.OperationTips.SUCCESS);
		FlowManageForm form = new FlowManageForm();
		form.setUpdatedBy(getUserBySession().getUser().getLoginName());
		form.setId(flowId);
		flowManageService.flowTerminate(form);
		result.setMessage("手工终止任务链成功");
		return result;

	}
	
	/**
	 * 根据flowId获取任务链所有节点（包括任务节点以及子任务链节点）
	 * @param flowId
	 * @return
	 */
	@WriteLog(log=LogDict.Task_Schedule_Query)
	@RequestMapping("/findTaskNodes")
	@ResponseBody
	public JsonResult<Map<String, Object>> findTaskNodes(String flowId) {
		JsonResult<Map<String, Object>> result = new JsonResult<Map<String, Object>>(true, Constant.OperationTips.SUCCESS);
		result.setListItems(flowManageService.findTaskNodes(flowId));
		return result;
	}
	/**
	 * 
	 * @param flowGroupId
	 * @param flowIds
	 * @return
	 */
	@WriteLog(log=LogDict.Task_Chain_Remove)
	@RequestMapping("/updateFlowGroup")
	@ResponseBody
	public Map<Object, Object> updateFlowGroup(String flowGroupId, String flowIds){
		Map<Object, Object> resultMap = new HashMap<Object, Object>();
		flowManageService.updateFlowGroup(flowGroupId, flowIds);
		resultMap.put("success", true);
		return resultMap;
	}
	
	/**
	 * 根据flowId获取任务链下 任务详情列表
	 * @param flowId
	 * @return
	 */
	@WriteLog(log=LogDict.Task_Monitor_Detail)
	@RequestMapping("/getTaskMonitorList")
	@ResponseBody
	public JsonResult<TaskMonitorModel> getTaskMonitorList(String flowId,Boolean isHistory) {
		JsonResult<TaskMonitorModel> result = new JsonResult<TaskMonitorModel>(true, Constant.OperationTips.SUCCESS);
		result.setListItems(flowManageService.getTaskMonitorList(flowId,isHistory));
		return result;
	}
	
	
	/**   
	 * @Description: 导出所有流程列表
	 * @author zhangwenfeng031  
	 * @date 2016年11月1日 上午10:01:51 
	 * @version Version 1.0.1 
	*/
	@WriteLog(log=LogDict.Task_Schedule_FlowExport)
	@RequestMapping("/flowsExport")
	@ResponseBody
	public ModelAndView flowsExport(String flowName,String flowGroupid) throws UnsupportedEncodingException {
		String flowNameStr= java.net.URLDecoder.decode(flowName, "UTF-8");
		String flowGroupidStr= java.net.URLDecoder.decode(flowGroupid, "UTF-8");
		FlowManageForm form = new FlowManageForm();
		form.setFlowName(flowNameStr);
		form.setFlowGroupid(flowGroupidStr);
		List<FlowManageModel> dataList = flowManageService.getAllFlowManageList(form);
		String[] headers = new String[]{"流程分组名称","流程名称","流程描述","发起发式","执行周期","执行日期","执行时间","创建人","创建日期","更新人","更新日期"};
		String[] mappers = new String[]{"flowGroupName","flowName","flowDesc","creator","nextStartunit","workDate","startTime","createBy","createDate","updatedBy","updatedDate"};
		int[] widths = new int[]{20,20,30,10,10,10,10,10,20,10,20};
		short[] aligns = new short[]{ExcelView.align_left,ExcelView.align_left,ExcelView.align_left,ExcelView.align_center,ExcelView.align_center,ExcelView.align_center,ExcelView.align_center,ExcelView.align_center,ExcelView.align_left,ExcelView.align_center,ExcelView.align_left};
		ExcelView viewExcel = new ExcelView("系统调度导出", "调度列表", headers, dataList, mappers, widths, aligns);
	    return new ModelAndView(viewExcel);
	}
	
	/**   
	 * @Description: 导出所有流程列表
	 * @author zhangwenfeng031  
	 * @date 2016年11月1日 上午10:01:51 
	 * @version Version 1.0.1 
	*/
	@WriteLog(log=LogDict.Task_Schedule_FlowHistoryExport)
	@RequestMapping("/flowHistoryExport")
	@ResponseBody
	public ModelAndView flowHistoryExport(String flowName,String groupIds,String dateStart,String dateEnd) throws UnsupportedEncodingException {
		String flowNameStr= java.net.URLDecoder.decode(flowName, "UTF-8");
		FlowMonitorForm form = new FlowMonitorForm();
		form.setFlowName(flowNameStr);
		form.setFlowGroupid(groupIds);
		form.setStartDate(dateStart);
		form.setEndDate(dateEnd);
		List<FlowHistoryModel> dataList = flowManageService.queryFlowHistoryList(form);
		String[] headers = new String[]{"所属任务包","任务名称","任务描述","开始执行时间","结束执行时间","耗时(秒)","执行状态","执行信息"};
		String[] mappers = new String[]{"flowGroupName","flowName","flowDesc","startTime","endTime","duration","flowStatus","execResult"};
		int[] widths = new int[]{20,20,30,20,20,10,12,50};
		short[] aligns = new short[]{ExcelView.align_left,ExcelView.align_left,ExcelView.align_left,ExcelView.align_left,ExcelView.align_left,ExcelView.align_center,ExcelView.align_center,ExcelView.align_left};
		ExcelView viewExcel = new ExcelView("调度历史导出", "调度历史", headers, dataList, mappers, widths, aligns);
	    return new ModelAndView(viewExcel);
	}
	
	/**   
	 * @Description: 导出流程执行详情
	 * @author zhangwenfeng031  
	 * @date 2016年11月1日 上午10:01:51 
	 * @version Version 1.0.1 
	*/
	@WriteLog(log=LogDict.Task_Schedule_FlowTaskHistoryExport)
	@RequestMapping("/flowHistoryDetailExport")
	@ResponseBody
	public ModelAndView flowHistoryDetailExport(String flowId) throws UnsupportedEncodingException {
		List<TaskMonitorModel> dataList = flowManageService.getTaskHistoryList(flowId);
		String[] headers = new String[]{"任务名称","任务类型","任务描述","开始执行时间","结束执行时间","耗时(秒)","执行状态","执行信息"};
		String[] mappers = new String[]{"taskName","taskBelong","taskDesc","startTime","endTime","duration","taskStatus","execResult"};
		int[] widths = new int[]{20,12,30,20,20,10,12,50};
		short[] aligns = new short[]{ExcelView.align_left,ExcelView.align_center,ExcelView.align_left,ExcelView.align_left,ExcelView.align_left,ExcelView.align_center,ExcelView.align_center,ExcelView.align_left};
		ExcelView viewExcel = new ExcelView("调度运行详情导出", "调度运行详情", headers, dataList, mappers, widths, aligns);
	    return new ModelAndView(viewExcel);
	}
}
