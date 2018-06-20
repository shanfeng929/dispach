package com.sunyard.dispatch.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sunyard.dispatch.model.ParametersModel;
import com.sunyard.dispatch.model.form.ParametersForm;
import com.sunyard.dispatch.service.ParametersService;
import com.sunyard.dispatch.util.BaseController;
import com.sunyard.dispatch.util.Constant;
import com.sunyard.dispatch.util.JsonResult;

/**
 * 参数设置与查询功能的控制器
 * 
 * @author WeiLai
 *
 */
@RequestMapping(value = "/dispatch/parameters")
@Controller
public class ParametersController extends BaseController {
	@Resource
	ParametersService parametersService;

	/**
	 * 分页查询参数
	 * 
	 * @param form
	 * @return
	 */
	@RequestMapping("/query")
	@ResponseBody
	public JsonResult<ParametersModel> query(ParametersForm form) {
		JsonResult<ParametersModel> result = new JsonResult<ParametersModel>(
				true, Constant.OperationTips.SUCCESS);
		try {
			String para_name = java.net.URLDecoder.decode(form.getPara_name(),"UTF-8");
			form.setPara_name(para_name);
			result.setPageItems(parametersService.getParametersList(form));
			// System.out.println(result);
			if (result != null) {
				// 测试
				// System.out.println(result.getPageItems().getTotal());
			}
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error("参数查询失败",e);
		}
		return result;
	}

	/**
	 * 按照para_id删除一个参数
	 * 
	 * @param para_id
	 * @return
	 */
	@RequestMapping("/delete")
	@ResponseBody
	public JsonResult<ParametersModel> delete(String para_id) {
		JsonResult<ParametersModel> result = new JsonResult<ParametersModel>();
		result.setMessage("参数删除成功");
//		addLogger("操作成功", "参数删除成功", Constant.LogLevel.INFO);
		try {
			parametersService.deleteParametersList(para_id);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage("参数删除失败");
//			addLogger("操作失败", "参数删除失败", Constant.LogLevel.ERROR);
		}
		return result;
	}

	/**
	 * 按照para_id删除一个参数
	 * 
	 * @param para_id
	 * @return
	 */
	@RequestMapping("/multidelete")
	@ResponseBody
	public JsonResult<ParametersModel> multiDelete(String[] para_ids) {
		JsonResult<ParametersModel> result = new JsonResult<ParametersModel>();
		result.setMessage("参数删除成功");
//		addLogger("操作成功", "参数删除成功", Constant.LogLevel.INFO);
		try {
			parametersService.multiDeletePara(para_ids);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage("参数删除失败");
//			addLogger("操作失败", "参数删除失败", Constant.LogLevel.ERROR);
		}
		return result;
	}

	/**
	 * 新增或修改一个参数
	 * 
	 * @param form
	 * @return
	 */
	@RequestMapping("/edit")
	@ResponseBody
	public JsonResult<ParametersModel> Edit(ParametersForm form) {
		JsonResult<ParametersModel> result = new JsonResult<ParametersModel>();
		if (form.getPara_id() == null) {
			// 新增
			try {
				form.setCreate_by(getUserBySession().getUser().getLoginName());
				parametersService.addParameters(form);
				result.setMessage("参数新增成功");
//				addLogger("操作成功", "参数新增成功", Constant.LogLevel.INFO);
			} catch (Exception e) {
				e.printStackTrace();
				if ("已经存在同名参数".equals(e.getMessage())) {
					result.setMessage("已经存在同名参数");
				} else {
					result.setMessage("参数新增失败");
				}
				result.setSuccess(false);
//				addLogger("操作失败", "参数新增失败", Constant.LogLevel.ERROR);
			}
		} else {
			// 修改·
			try {
				form.setUpdate_by(getUserBySession().getUser().getLoginName());
				parametersService.editParameters(form);
				//同步所有引用此参数的地方
				
				//以上，同步所有引用此参数的地方
				result.setMessage("参数修改成功");
//				addLogger("操作成功", "参数修改成功", Constant.LogLevel.INFO);
			} catch (Exception e) {
				e.printStackTrace();
				if ("已经存在同名参数".equals(e.getMessage())) {
					result.setMessage("已经存在同名参数");
				} else {
					result.setMessage("参数修改失败");
				}
				result.setSuccess(false);
//				addLogger("操作失败", "参数设定失败", Constant.LogLevel.ERROR);
			}
		}
		return result;
	}
}
