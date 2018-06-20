package com.sunyard.dispatch.common.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sunyard.dispatch.common.model.User;
import com.sunyard.dispatch.common.model.UserGrid;
import com.sunyard.dispatch.common.model.UserGroup;
import com.sunyard.dispatch.common.model.form.UserForm;
import com.sunyard.dispatch.common.service.UserService;
import com.sunyard.dispatch.security.authentication.CustomUserDetails;
import com.sunyard.dispatch.util.BaseController;
import com.sunyard.dispatch.util.Constant;
import com.sunyard.dispatch.util.JsonResult;

/**
 * @date 2015-8-12 下午5:40:38
 */
@Controller
@RequestMapping("/commons/user")
public class UserController extends BaseController {
	@Resource
	UserService userService;

	@RequestMapping("/query")
	@ResponseBody
	public JsonResult<UserGrid> reveal(UserForm form) {
		JsonResult<UserGrid> result = new JsonResult<UserGrid>(true, Constant.OperationTips.SUCCESS);
		try {
			
			result.setPageItems(userService.getUserListByName(form));
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error("查询用户失败",e);
		}
		return result;
	}

	@RequestMapping("/disabledUser")
	@ResponseBody
	public JsonResult<User> disabledUser(String ids) {
		JsonResult<User> result = new JsonResult<User>(true, Constant.OperationTips.SUCCESS);
		String[] idsArray = ids.split("\\,");
		ArrayList<Integer> list = new ArrayList<Integer>();
		for(String id : idsArray){
			list.add(Integer.valueOf(id));
		}
		try {
//			userService.getUserById(id);
			userService.disabledUser(list);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error("失效用户",e);
		}
		return result;
	}

	@RequestMapping("/selectUserById")
	@ResponseBody
	public JsonResult<User> selectUserById(Integer id) {
		logger.info("id---------------------------------"+id);
		JsonResult<User> result = new JsonResult<User>(true, Constant.OperationTips.SUCCESS);
		try {
			result.setListItems(userService.selectUserById(id));
			logger.info(result.toString());
			logger.info("666666666666666666");
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error("通过ID查找用户失败",e);
		}
		return result;
	}

	@RequestMapping("/modifyUserPassword")
	@ResponseBody
	public JsonResult<User> modifyUserPassword(String password, String newPassword) {
		JsonResult<User> result = new JsonResult<User>(true);
		CustomUserDetails userDetail = getUserBySession();
		
		try {
			if(BCrypt.checkpw(password, userDetail.getUser().getPassword())) {
				userService.modifyPwd(userDetail.getUser().getId(), BCrypt.hashpw(newPassword, BCrypt.gensalt()));
				result.setMessage("密码修改成功");
				userDetail.getUser().setPassword(BCrypt.hashpw(newPassword, BCrypt.gensalt()));
				addLogger("操作成功", "用户修改密码成功", Constant.LogLevel.INFO);
			}
			else {
				result.setSuccess(false);
				result.setMessage("原始密码错误！");
				addLogger("操作失败", "用户修改密码失败", Constant.LogLevel.INFO);
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.setMessage("密码修改失败");
			logger.error("用户修改密码失败",e);
			addLogger("操作失败", "用户修改密码失败", Constant.LogLevel.INFO);
		}
		return result;
	}
	
	@RequestMapping("/saveOrUpdate")
	@ResponseBody
	public JsonResult<User> addOrModifyUser(UserForm userForm, @RequestParam(value = "rols") List<Integer> rols,
			@RequestParam(value = "organNumber") Integer organCode) {
		JsonResult<User> result = new JsonResult<User>(true);
		Integer userGroupId=1;
		userForm.setLoginName(getUserBySession().getUser().getLoginName());
		if (userForm.getId() == null) { // Id是不存在，新增用户
			if (userService.repeatedUser(userForm) == 0) {
				try {
					userService.insertUser(userForm, rols, organCode, userGroupId);
					result.setMessage("用户新增成功");
					addLogger("操作成功", "用户新增成功", Constant.LogLevel.INFO);
				} catch (Exception e) {
					result.setSuccess(false);
					result.setMessage("用户新增失败");
					logger.error("用户新增失败", e);
					addLogger("操作失败", "用户新增失败", Constant.LogLevel.INFO);
				}
			} else {
				result.setSuccess(false);
				result.setMessage("登陆名重复");
			}
		} else { // 修改用户
			if (!userForm.getUserName().equals(userService.selectLgName(userForm))) { // 用户名是新增加的
				if (userService.repeatedUser(userForm) == 0) {
					try {
						userService.modifyUser(userForm, rols, organCode, userGroupId);
						result.setMessage("用户修改成功");
						addLogger("操作成功", "修改ID为成功", Constant.LogLevel.INFO);
					} catch (Exception e) {
						result.setSuccess(false);
						result.setMessage("用户修改失败");
						logger.error("用户修改失败",e);
						addLogger("操作失败", "用户修改失败", Constant.LogLevel.INFO);
					}
				} else {
					result.setSuccess(false);
					result.setMessage("登陆名重复");
				}
			} else { // 用户名是原来得
				try {
					userService.modifyUser(userForm, rols, organCode, userGroupId);
					result.setMessage("用户修改成功");
					addLogger("操作成功", "用户修改成功", Constant.LogLevel.INFO);
				} catch (Exception e) {
					result.setSuccess(false);
					result.setMessage("用户修改失败");
					logger.error("用户修改失败",e);
					addLogger("操作失败", "用户修改失败", Constant.LogLevel.INFO);
				}

			}
		}
		return result;
	}

	@RequestMapping("/resetPassword")
	// 把该用户的密码重置为123
	@ResponseBody
	public JsonResult<User> resetPassword(String ids) {
		JsonResult<User> result = new JsonResult<User>(true, Constant.OperationTips.SUCCESS);
		String[] idsArray = ids.split("\\,");
		try {
			userService.repeatedPwd(idsArray);
			addLogger("操作成功", "用户密码重置成功", Constant.LogLevel.INFO);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage(Constant.OperationTips.ERROR);
			logger.error("用户密码重置失败",e);
			addLogger("操作失败", "用户密码重置失败", Constant.LogLevel.INFO);
		}
		return result;
	}

	// 找出默认用户组
	@RequestMapping("/defaultUserGroup")
	// 把该用户的密码重置为123
	@ResponseBody
	public JsonResult<UserGroup> defaultUserGroup() {
		JsonResult<UserGroup> result = new JsonResult<UserGroup>(true, Constant.OperationTips.SUCCESS);
		result.setItem(userService.defaultUserGroup());
		return result;
	}
	//删除
	@RequestMapping("/deleteUserById")
	@ResponseBody
	public JsonResult<User> deleteUser(String ids) {
		JsonResult<User> result = new JsonResult<User>(true, Constant.OperationTips.SUCCESS);
			String[] idsArray = ids.split("\\,");
			try {
				userService.deleteById(idsArray);
				addLogger("操作成功", "用户删除成功", Constant.LogLevel.INFO);
			} catch (Exception e) {
				result.setSuccess(false);
				result.setMessage(Constant.OperationTips.ERROR);
				logger.error("用户删除失败",e);
				addLogger("操作失败", "用户删除失败", Constant.LogLevel.INFO);
			}
		return result;
	}
	//删除
		@RequestMapping("/getCurrency")
		@ResponseBody
		public List<Map<String,Object>> getCurrency() {
			
			return userService.getCurrency();
		}
}
