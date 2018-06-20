package com.sunyard.dispatch.common.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sunyard.dispatch.common.model.Authority;
import com.sunyard.dispatch.common.model.RoleGrid;
import com.sunyard.dispatch.common.model.RoleNew;
import com.sunyard.dispatch.common.model.form.RoleForm;
import com.sunyard.dispatch.common.service.AuthorityService;
import com.sunyard.dispatch.common.service.RoleService;
import com.sunyard.dispatch.util.BaseController;
import com.sunyard.dispatch.util.Constant;
import com.sunyard.dispatch.util.JsonResult;


@Controller
@RequestMapping("/commons/r")
public class RoleController extends BaseController {
	@Resource
	RoleService roleService;
	@Resource
	AuthorityService authorityService;

	@RequestMapping("/getRoleList")
	@ResponseBody
	public JsonResult<RoleGrid> getRoleList(RoleForm roleForm) {
		JsonResult<RoleGrid> result = new JsonResult<RoleGrid>(true, Constant.OperationTips.SUCCESS);
		try {
			result.setPageItems(roleService.getRoleByName(roleForm));
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error("/getRoleList",e);
		}
		return result;
	}

	@RequestMapping("/deleteRole")
	@ResponseBody
	public JsonResult<Object> deleteRole(@RequestParam String ids) {
		JsonResult<Object> result = new JsonResult<Object>(true, Constant.OperationTips.SUCCESS);
		try {
			List<Integer> list = new ArrayList<Integer>();
			String[] idArray = ids.split("\\,");
			for (int i = 0; i < idArray.length; i++) {
				list.add(Integer.parseInt(idArray[i]));
			}
			roleService.batchDeleteRole(list);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error("删除角色失败",e);
		}
		addLogger("删除角色", "删除角色", Constant.LogLevel.INFO);
		return result;
	}

	@RequestMapping("/insertRole")
	@ResponseBody
	public JsonResult<Object> insertRole(RoleNew roleNew) {
		JsonResult<Object> result = new JsonResult<Object>(true, Constant.OperationTips.SUCCESS);
		if (roleNew.getId() == null) {
			if (roleService.repeatedRole(roleNew) == 0) {
				try {
					roleNew.setDateCreated(new Date());
					roleNew.setCreator(getUserBySession().getUser().getId());
					roleService.saveRole(roleNew);
					result.setMessage("角色添加成功");
					addLogger("添加角色", "添加角色", Constant.LogLevel.INFO);
				} catch (Exception e) {
					result.setSuccess(false);
					result.setMessage("角色添加失败");
					logger.error("角色添加失败",e);
				}
			} else {
				result.setSuccess(false);
				result.setMessage("角色名称重复!");
			}
		} else {
			if (!roleNew.getName().equals(roleService.selectRoleName(roleNew))) {
				if (roleService.repeatedRole(roleNew) == 0) {
					try {
						roleNew.setDateUpdated(new Date());
						roleNew.setModifier(getUserBySession().getUser().getId());
						roleService.updateOneRole(roleNew);
						result.setMessage("角色修改成功!");
						addLogger("修改角色", "修改角色", Constant.LogLevel.INFO);
					} catch (Exception e) {
						result.setSuccess(false);
						result.setMessage("角色修改失败");
						logger.error("角色修改失败",e);
					}
				} else {
					result.setSuccess(false);
					result.setMessage("角色名称重复!");
				}
			}else{
				try {
					roleNew.setDateUpdated(new Date());
					roleNew.setModifier(getUserBySession().getUser().getId());
					roleService.updateOneRole(roleNew);
					result.setMessage("角色修改成功");
					addLogger("修改角色", "修改角色", Constant.LogLevel.INFO);
				} catch (Exception e) {
					result.setSuccess(false);
					result.setMessage("角色修改失败");
					logger.error("角色修改失败",e);
				}
			}
		}
		return result;
	}

	@RequestMapping("/selectAllAuth")
	@ResponseBody
	public JsonResult<Authority> selectAllAuth() {
		JsonResult<Authority> result = new JsonResult<Authority>(true, Constant.OperationTips.SUCCESS);
		try {
			result.setListItems(authorityService.getAuthList());
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error("/selectAllAuth",e);
		}
		return result;
	}

	@RequestMapping("/selectRole")
	@ResponseBody
	public JsonResult<RoleNew> selectRole(Integer id) {
		JsonResult<RoleNew> result = new JsonResult<RoleNew>(true, Constant.OperationTips.SUCCESS);
		try {
			result.setListItems(roleService.queryOneRole(id));
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error("/selectRole",e);
		}
		return result;
	}
}
