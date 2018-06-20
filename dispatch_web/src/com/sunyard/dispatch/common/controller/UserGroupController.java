package com.sunyard.dispatch.common.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sunyard.dispatch.common.model.Role;
import com.sunyard.dispatch.common.model.User;
import com.sunyard.dispatch.common.model.UserGroup;
import com.sunyard.dispatch.common.service.UserGroupService;
import com.sunyard.dispatch.util.BaseController;
import com.sunyard.dispatch.util.Constant;
import com.sunyard.dispatch.util.JsonResult;

/**
 * @author fengqibei
 * @date 2015-8-19 下午2:29:11
 */
@Controller
@RequestMapping("/commons/userGroup")
public class UserGroupController extends BaseController {
	@Resource
	UserGroupService userGroupService;

	// 查出用户组的树
	@RequestMapping("/getUserGroupTreeData")
	@ResponseBody
	public List<Map<String, Object>> queryTree() {
		// JsonResult<Map<String,Object>> result = new
		// JsonResult<Map<String,Object>>(true, Constant.OperationTips.SUCCESS);
		List<Map<String, Object>> userGroupTreeData = userGroupService.revealUserGroupTree();
		// Map<String,Object> map=new HashMap<String,Object>();
		// map.put("userGroupTreeData", userGroupTreeData);
		// result.setListItems(userGroupTreeData);
		addLogger("查出用户组树","查出用户组树",1);
		return userGroupTreeData;
	}

	// 查出所有的用户(登录名)呈现到用户ItemSelector中
	@RequestMapping("/queryAllUsers")
	@ResponseBody
	public JsonResult<User> queryAllUsers() {
		JsonResult<User> result = new JsonResult<User>(true, Constant.OperationTips.SUCCESS);
		result.setListItems(userGroupService.queryUsers());
		addLogger("查出所有的用户(登录名)","查出所有的用户(登录名)",1);
		return result;
	}

	// 根据用户组ID查询页面上的已选用户
	@RequestMapping("/{id}/querySelectUser")
	@ResponseBody
	public JsonResult<User> querySelectUser(@PathVariable Integer id) {
		JsonResult<User> result = new JsonResult<User>(true, Constant.OperationTips.SUCCESS);
		result.setListItems(userGroupService.querySelectUser(id));
		addLogger("查出用户组所选的用户","查出用户组所选的用户",1);
		return result;
	}

	// 根据用户组ID查询页面上的已选角色
	@RequestMapping("/{id}/querySelectRole")
	@ResponseBody
	public JsonResult<Role> querySelectRole(@PathVariable Integer id) {
		JsonResult<Role> result = new JsonResult<Role>(true, Constant.OperationTips.SUCCESS);
		result.setListItems(userGroupService.querySelectRole(id));
		addLogger("查找用户组所选的角色","查找用户组所选的角色",1);
		return result;
	}

	// 保存修改的用户组
	@RequestMapping("/saveOrUpdateUserGroup")
	@ResponseBody
	public JsonResult<Object> saveOrUpdateUserGroup(UserGroup userGroup,
			@RequestParam(value = "roles") List<Integer> roles) {
		JsonResult<Object> result = new JsonResult<Object>(true, Constant.OperationTips.SUCCESS);
		if (userGroup.getId() == null) { // 新增的用户组
			if (userGroupService.repeatedUserGroup(userGroup) == 0) { // 新增的用户组名称没有重复
				try {
					userGroupService.insertUserGroup(userGroup, roles);
					result.setMessage("用户组新增成功");
				} catch (Exception e) {
					result.setSuccess(false);
					result.setMessage("用户组新增失败");
				}
			} else { // 新增的用户组名称重复
				result.setSuccess(false);
				result.setMessage("用户组名称重复");
			}
		} else { // 之前存在的用户组
			if (!userGroup.getName().equals(userGroupService.selectUserGpName(userGroup))) { // 根据ID查找该用户组的原来的名字
				if (userGroupService.repeatedUserGroup(userGroup) == 0) { // 用户组名称没有重复
					try {
						userGroupService.momdifyUserGroup(userGroup, roles);
						result.setMessage("用户组修改成功");
					} catch (Exception e) {
						result.setSuccess(false);
						result.setMessage("用户组修改失败");
					}
				} else {
					result.setSuccess(false);
					result.setMessage("用户组名称重复");
				}
			} else { // 用户名是原来的
				try {
					userGroupService.momdifyUserGroup(userGroup, roles);
					result.setMessage("用户组修改成功");
				} catch (Exception e) {
					result.setSuccess(false);
					result.setMessage("用户组修改失败");
				}

			}
		}
		addLogger("修改用户组","修改用户组",1);
		return result;
	}

	@RequestMapping("/{id}/deleteUserGroup")
	@ResponseBody
	public JsonResult<Object> deleteUserGroup(@PathVariable Integer id) {
		JsonResult<Object> result = new JsonResult<Object>(true, Constant.OperationTips.SUCCESS);
		try {
			userGroupService.deleteUserGroup(id);
			result.setMessage("用户组删除成功");
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage("用户组删除失败");
		}
		addLogger("删除用户组","删除用户组",1);
		return result;
	}

}
