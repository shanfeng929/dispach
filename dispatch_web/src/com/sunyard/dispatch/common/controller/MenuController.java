package com.sunyard.dispatch.common.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sunyard.dispatch.annotation.WriteLog;
import com.sunyard.dispatch.common.model.MenuBean;
import com.sunyard.dispatch.common.model.MenuModel;
import com.sunyard.dispatch.common.service.MenuService;
import com.sunyard.dispatch.enums.LogDict;
import com.sunyard.dispatch.util.BaseController;
import com.sunyard.dispatch.util.Configuration;
import com.sunyard.dispatch.util.Constant;
import com.sunyard.dispatch.util.JsonResult;

/**
 * 菜单管理
 */
@Controller
@RequestMapping("/common/menu")
public class MenuController extends BaseController{


	@Resource
	private MenuService menuService;

	@RequestMapping("/saveAndUpdateMenuByForm")
	public @ResponseBody JsonResult<MenuBean> saveAndUpdateMenuByForm(MenuBean menuForm){
		JsonResult<MenuBean> jsonResult = new JsonResult<MenuBean>(true, Constant.OperationTips.SUCCESS);
		try{
			if(menuForm !=null && menuForm.getId() !=null){
				menuForm.setModifier(getUserBySession().getUser().getId());
			}else{
				menuForm.setCreator(getUserBySession().getUser().getId());
			}
			menuService.updateMenu(menuForm);
			addLogger("增加菜单操作","增加菜单操作成功",1);
		}catch(Exception e){
			jsonResult.setSuccess(false);
			jsonResult.setMessage(Constant.OperationTips.ERROR);
			addLogger("增加菜单操作","增加菜单操作失败",1);
			logger.error("增加菜单操作失败",e);
		}
		return jsonResult;
	}
	
	
	/**
	 * 删除菜单 直接删除自己和子菜单;
	 * @param id
	 * @return
	 */
	@RequestMapping("/deleteMenu")
	public @ResponseBody JsonResult<Object> deleteMenuById(@RequestParam Integer id,@RequestParam Integer pid){
		JsonResult<Object> result = new JsonResult<Object>(true, Constant.OperationTips.SUCCESS);
		MenuBean menuForm = new  MenuBean();
			menuForm.setId(id);
			menuForm.setParentId(pid);
		try {
			menuService.deleteMenu(menuForm);
			addLogger("删除菜单","删除菜单操作成功",1);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage( Constant.OperationTips.ERROR);
			addLogger("删除菜单", "删除菜单操作失败", 1);
			logger.error("删除菜单操作失败",e);
		}
		return result;
	}
	/**
	 * @description 
	 * 			修改页面展示结构,将原有Menu组件类型菜单转换成左侧功能树样式,提供菜单查询接口
	 * @author 	LiHao
	 * @param  	pid
	 * @return 	List<ExtMenu>
	 * @version 1.0.1
	 * @date    2015/10/21   
	 * */
	@WriteLog(log=LogDict.Base_Menu_Query)
	@RequestMapping(value="/selectRootMenuList")
	public @ResponseBody List<MenuModel> selectRootMenuList(String pid, String id){
		return menuService.selectRootMenuList(Integer.parseInt(pid), Integer.parseInt(id));
	}
	
	/**
	 * @description 
	 * 			修改页面展示结构,将原有Menu组件类型菜单转换成左侧功能树样式,提供下级菜单查询接口
	 * @author 	LiHao
	 * @param  	pid
	 * @return 	List<ExtMenu>
	 * @version 1.0.1
	 * @date    2015/10/21   
	 * */
	@WriteLog(log=LogDict.Base_Menu_SubQuery, db=false)
	@RequestMapping(value="/selectChildMenuList")
	public @ResponseBody List<MenuModel> selectChildMenuList(String pid){
		List<MenuModel> list = menuService.selectChildMenuList(Integer.parseInt(pid),getUserBySession().getUser());
		return list;
	}

	/**
	 * @description
	 * 			菜单树形异步加载接口，不需要权限验证;
	 * @author 	lss
	 * @param  	pid
	 * @return 	List<ExtMenu>
	 * @version 1.0.1
	 * @date    2015/11/2
	 * */
	@WriteLog(log=LogDict.Base_Menu_SubQuery, db=false)
	@RequestMapping(value="/selectChildMenuLists")
	public @ResponseBody List<MenuModel> selectChildMenuLists(String pid){
		List<MenuModel> list = menuService.selectChildMenuList(Integer.parseInt(pid),Configuration.getInstance().getUser());
		return list;
	}
}

