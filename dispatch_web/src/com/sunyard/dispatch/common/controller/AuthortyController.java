package com.sunyard.dispatch.common.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sunyard.dispatch.common.model.AuthorityNew;
import com.sunyard.dispatch.common.service.AuthorityService;
import com.sunyard.dispatch.common.service.MenuService;
import com.sunyard.dispatch.util.BaseController;
import com.sunyard.dispatch.util.Constant;
import com.sunyard.dispatch.util.JsonResult;

/*	
 * 权限
 * update 2015/10/28 showMenu()增加参数;
 */
@Controller
@RequestMapping("/commons/auth")
public class AuthortyController  extends BaseController {
	@Resource
	AuthorityService authService;
	@Resource
	MenuService menuService;
	
	@RequestMapping("/showAuthority")
	@ResponseBody
	public List<Map<String, Object>> showAuthority(){
		List<Map<String,Object>> authTree = authService.revealAuthorityTree();
		addLogger("操作成功", "权限查询成功", Constant.LogLevel.INFO);
		return authTree;
	}
	
	@RequestMapping("/showMenu")
	@ResponseBody
	public List<Map<String, Object>> showMenu(Integer authId){
		List<Map<String, Object>> menuTree = menuService.revealMenuTree(authId);
		addLogger("操作成功", "菜单查询成功", Constant.LogLevel.INFO);
		return menuTree;
	}
	
	
	@RequestMapping("/saveAuthMenuOpea")
	@ResponseBody
	public JsonResult<Object> saveAuthMenuOpea(Integer[] menuIds,Integer[] opeaIds,AuthorityNew auth){
		JsonResult<Object> result = new JsonResult<Object>(true, Constant.OperationTips.SUCCESS);
		if(auth.getId()==null){
			try{
				if(authService.repeatedAuthName(auth) == 0){
					if(authService.repeatedAuthCode(auth) == 0){
						authService.saveAuth(auth, opeaIds, menuIds);
						addLogger("操作成功", "权限新增成功", Constant.LogLevel.INFO);
					} else {
						result.setSuccess(false);
						result.setMessage("权限编码重复");
					}
				} else {
					result.setSuccess(false);
					result.setMessage("权限名称重复");
				}
			}catch(Exception e){
				result.setSuccess(false);
				result.setMessage(Constant.OperationTips.ERROR);
				addLogger("操作失败", "权限修改失败", Constant.LogLevel.INFO);
				e.printStackTrace();
			}
		}else{
			authService.updateAuth(auth, opeaIds, menuIds);
			addLogger("操作成功", "权限修改成功", Constant.LogLevel.INFO);
		}
		
		return result;
	}
	
	@RequestMapping("/delete")
	@ResponseBody
	public JsonResult<Object> delete(Integer authId){
		JsonResult<Object> result = new JsonResult<Object>(true, Constant.OperationTips.SUCCESS);
			try{
				authService.delete(authId);
				addLogger("操作成功", "权限删除成功", Constant.LogLevel.INFO);
			}catch(Exception e){
				result.setSuccess(false);
				result.setMessage(Constant.OperationTips.ERROR);
				addLogger("操作失败", "权限删除失败", Constant.LogLevel.INFO);
				e.printStackTrace();
			}
			return result;
	}
}
