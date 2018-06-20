package com.sunyard.dispatch.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sunyard.dispatch.model.ParametersCustomModel;
import com.sunyard.dispatch.service.ParametersCustomService;
import com.sunyard.dispatch.util.BaseController;
import com.sunyard.dispatch.util.Constant;
import com.sunyard.dispatch.util.JsonResult;

/**
 * 自定义参数功能的控制器
 * 
 * @author WeiLai
 *
 */
@RequestMapping(value = "/dispatch/paracustom")
@Controller
public class ParametersCustomController extends BaseController {
	@Resource
	ParametersCustomService parametersCustomService;

	@RequestMapping("/query")
	@ResponseBody
	public JsonResult<ParametersCustomModel> query(ParametersCustomModel model) {
		JsonResult<ParametersCustomModel> result = new JsonResult<ParametersCustomModel>(
				true, Constant.OperationTips.SUCCESS);
		try {
			String custom_para_type = java.net.URLDecoder.decode(
					model.getCustom_para_type(), "UTF-8");
			model.setCustom_para_type(custom_para_type);
			result.setListItems(parametersCustomService
					.getCustomParametersList(model));
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error("自定义参数查询失败",e);
		}
		return result;
	}

	@RequestMapping("/edit")
	@ResponseBody
	public JsonResult<ParametersCustomModel> editOrDel(
			ParametersCustomModel model) {
		JsonResult<ParametersCustomModel> result = new JsonResult<ParametersCustomModel>(
				true, Constant.OperationTips.SUCCESS);
		try {
			String custom_para_type = java.net.URLDecoder.decode(
					model.getCustom_para_type(), "UTF-8");
			model.setCustom_para_type(custom_para_type);
			String custom_para_name = java.net.URLDecoder.decode(
					model.getCustom_para_name(), "UTF-8");
			model.setCustom_para_name(custom_para_name);
			if (model.getCustom_para_value() != null
					&& model.getCustom_para_value() != "") {
				String custom_para_value = java.net.URLDecoder.decode(
						model.getCustom_para_value(), "UTF-8");
				model.setCustom_para_value(custom_para_value);
			}
			parametersCustomService.editCustomParameters(model);
			result.setMessage("参数修改或删除成功");
//			addLogger("操作成功", "参数修改或删除成功", Constant.LogLevel.INFO);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage("参数修改或删除失败");
//			addLogger("操作失败", "参数修改或删除失败", Constant.LogLevel.ERROR);
		}
		return result;
	}

	@RequestMapping("/add")
	@ResponseBody
	public JsonResult<ParametersCustomModel> addOrEdit(
			ParametersCustomModel model) {
		JsonResult<ParametersCustomModel> result = new JsonResult<ParametersCustomModel>(
				true, Constant.OperationTips.SUCCESS);
		try {
			String custom_para_type = java.net.URLDecoder.decode(
					model.getCustom_para_type(), "UTF-8");
			model.setCustom_para_type(custom_para_type);
			String custom_para_name = java.net.URLDecoder.decode(
					model.getCustom_para_name(), "UTF-8");
			model.setCustom_para_name(custom_para_name);

			String custom_para_value = java.net.URLDecoder.decode(
					model.getCustom_para_value(), "UTF-8");
			model.setCustom_para_value(custom_para_value);

			parametersCustomService.addCustomParameters(model);
			result.setMessage("参数增加或修改成功");
//			addLogger("操作成功", "参数增加或修改成功", Constant.LogLevel.INFO);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage("参数增加或修改失败");
//			addLogger("操作失败", "参数增加或修改失败", Constant.LogLevel.ERROR);
		}
		return result;
	}
}
