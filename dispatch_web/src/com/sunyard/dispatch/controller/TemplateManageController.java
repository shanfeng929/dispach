package com.sunyard.dispatch.controller;  

import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sunyard.dispatch.model.TemplateManageModel;
import com.sunyard.dispatch.model.form.TemplateManageForm;
import com.sunyard.dispatch.service.TemplateManageService;
import com.sunyard.dispatch.util.BaseController;
import com.sunyard.dispatch.util.Constant;
import com.sunyard.dispatch.util.JsonResult;


/**
 * 任务组件管理 控制层
 * @author quan.shen
 *
 */
@RequestMapping(value = "/dispatch/template")
@Controller
public class TemplateManageController extends BaseController{
	@Resource
	TemplateManageService templateManageService;
	protected Log logger = LogFactory.getLog(getClass());
	
	/**
	 * 分页查询组件
	 * @param form
	 * @return
	 */
	@RequestMapping("/query")
	@ResponseBody
	public JsonResult<TemplateManageModel> query(TemplateManageForm form) {
		JsonResult<TemplateManageModel> result = new JsonResult<TemplateManageModel>(true, Constant.OperationTips.SUCCESS);
		try {
			if(form.getTemplateName()!=null && !"".equals(form.getTemplateName())){
				String templateName = java.net.URLDecoder.decode(form.getTemplateName(), "UTF-8");
				form.setTemplateName(templateName);
			}
			result.setPageItems(templateManageService.getTemplateManagePage(form));
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error(e);
		}
		return result;
	}
	
	/**
	 * 查询所有组件列表
	 * @param form
	 * @return
	 */
	@RequestMapping("/queryList")
	@ResponseBody
	public JsonResult<TemplateManageModel> queryList() {
		JsonResult<TemplateManageModel> result = new JsonResult<TemplateManageModel>(true, Constant.OperationTips.SUCCESS);
		try {
			result.setListItems(templateManageService.getTemplateList());
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error(e);
		}
		return result;
	}
	
	@RequestMapping("/findTemplateById")
	@ResponseBody
	public JsonResult<TemplateManageModel> findTemplateById(String id){
		JsonResult<TemplateManageModel> result = new JsonResult<TemplateManageModel>(true, Constant.OperationTips.SUCCESS);
		try {
//			TemplateManageModel templateManageModel = templateManageService.findTemplateById(id);
			Map templateMap = templateManageService.findTemplateMapById(id);
//			result.setItem(templateManageModel);
			result.setMapItems(templateMap);
		} catch (Exception e) {
			// TODO: handle exception
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error(e);
		}
		return result;
	}
	
	/**
	 * 保存或修改组件
	 * @param form
	 * @return
	 */
	@RequestMapping("/saveOrUpdate")
	@ResponseBody
	public JsonResult<TemplateManageModel> saveOrUpdate(TemplateManageForm form) {
		JsonResult<TemplateManageModel> result = new JsonResult<TemplateManageModel>(true, Constant.OperationTips.SUCCESS);
		String message = "";
		try {
			String paramsVal = java.net.URLDecoder.decode(form.getParamsVal(),"UTF-8");
			String id = paramsVal.split(";")[0];
			String id_val = id.split(":")[1].trim();
			if("".equals(id_val)){//新增
	//		if(form.getId()==null || "".equals(form.getId())){//新增
					form.setParamsVal(paramsVal);
					templateManageService.templateAdd(form);
					result.setMessage("组件新增成功");
//					addLogger("操作成功", "组件新增成功", Constant.LogLevel.INFO);
					message = "组件新增失败";
			}else{//修改
					form.setParamsVal(paramsVal);
					templateManageService.templateEdit(form);
					result.setMessage("组件修改成功");
//					addLogger("操作成功", "组件修改成功", Constant.LogLevel.INFO);
					message = "组件修改失败";
			}
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage(message);
//			addLogger("操作失败", message, Constant.LogLevel.ERROR);
			logger.error(e);
		}
		return result;
	}
	
//	/**
//	 * 根据ID删除组件
//	 * @param id
//	 * @return
//	 */
//	@RequestMapping("/delete")
//	@ResponseBody
//	public JsonResult<TemplateManageModel> delete(String id){
//		JsonResult<TemplateManageModel> result = new JsonResult<TemplateManageModel>(true, Constant.OperationTips.SUCCESS);
//		try {
//			templateManageService.templateDel(id);
//			result.setMessage("组件删除成功");
//			addLogger("操作成功", "组件删除成功", Constant.LogLevel.INFO);
//		} catch (Exception e) {
//			result.setSuccess(false);
//			result.setMessage("组件删除失败");
//			addLogger("操作失败", "组件删除失败", Constant.LogLevel.ERROR);
//			logger.error(e);
//		}
//		return result;
//	}
	
	/**
	 * 根据拼接而成的ids,批量删除组件
	 * @param ids
	 * @return
	 */
	@RequestMapping("/deleteByIds")
	@ResponseBody
	public JsonResult<TemplateManageModel> deleteByIds(String ids){
		JsonResult<TemplateManageModel> result = new JsonResult<TemplateManageModel>(true, Constant.OperationTips.SUCCESS);
		try {
			templateManageService.templateDelByIds(ids);
			result.setMessage("组件删除成功");
//			addLogger("操作成功", "组件删除成功", Constant.LogLevel.INFO);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage("组件删除失败");
//			addLogger("操作失败", "组件删除失败", Constant.LogLevel.ERROR);
			logger.error(e);
		}
		return result;
	}
	
}
  
