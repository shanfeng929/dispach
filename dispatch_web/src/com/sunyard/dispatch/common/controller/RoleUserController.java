package com.sunyard.dispatch.common.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sunyard.dispatch.common.model.Role;
import com.sunyard.dispatch.common.service.RoleUserService;
import com.sunyard.dispatch.util.BaseController;
import com.sunyard.dispatch.util.Constant;
import com.sunyard.dispatch.util.JsonResult;


/**
 * @author fengqibei
 * @date 2015-8-15 下午4:44:43
 */
@Controller
@RequestMapping("/commons/roleUser")
public class RoleUserController extends BaseController {
	@Resource
	RoleUserService roleUserService;

	@RequestMapping("/query")
	@ResponseBody
	public JsonResult<Role> reveal() {
		JsonResult<Role> result = new JsonResult<Role>(true, Constant.OperationTips.SUCCESS);
		try {
			result.setListItems(roleUserService.getRoles());
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error("/commons/roleUser",e);
		}
		return result;
	}
}
