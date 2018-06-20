package com.sunyard.dispatch.common.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sunyard.dispatch.common.model.Authority;
import com.sunyard.dispatch.common.model.form.AuthorityGroupForm;
import com.sunyard.dispatch.common.service.AuthorityGroupService;
import com.sunyard.dispatch.util.BaseController;
import com.sunyard.dispatch.util.Constant;
import com.sunyard.dispatch.util.JsonResult;


/** 
 * @author fengqibei
 * @date 2015-8-24 上午11:52:57 
 */
@Controller
@RequestMapping("/commons/authorityGroup")
public class AuthorityGroupController  extends BaseController{
	@Resource
    AuthorityGroupService authorityGroupService;
	
	@RequestMapping("/getAuthorityGroupTreeData")
	@ResponseBody
	public List<Map<String, Object>> queryAuthorityTree() {
		return authorityGroupService.revealAuthorityGroupTree();
	}
	
	//查出所有的权限呈现到用户ItemSelector中
	@RequestMapping("/queryAllAuthority")
	@ResponseBody
	public JsonResult<Authority> queryAllAuthority() {
		JsonResult<Authority> result = new JsonResult<Authority>(true, Constant.OperationTips.SUCCESS);
		result.setListItems(authorityGroupService.queryAuthority());
		return result;
	}
	
	@RequestMapping("/{id}/querySelectedAuthority")
	@ResponseBody
	public JsonResult<Authority> querySelectedAuthority(@PathVariable Integer id) {
		JsonResult<Authority> result = new JsonResult<Authority>(true, Constant.OperationTips.SUCCESS);
		result.setListItems(authorityGroupService.querySelectedAuthority(id));
		return result;
	}
	
	
	//保存修改的权限组
		@RequestMapping("/saveOrUpdateAuthorityGroup")
		@ResponseBody
		public JsonResult<Object> saveOrUpdateAuthorityGroup(AuthorityGroupForm authorityGroupForm,
				@RequestParam(value = "authority") List<Integer> authoritys){
			JsonResult<Object> result = new JsonResult<Object>(true,Constant.OperationTips.SUCCESS);
			if(authorityGroupForm.getId()==null){
				if(authorityGroupService.repeatedAuthority(authorityGroupForm)==0){
					try{
						authorityGroupService.insertAuthorityGroup(authorityGroupForm,authoritys);
						result.setMessage("权限组新增成功");
						addLogger("新增权限组", "新增权限组名称为:"+authorityGroupForm.getName(), 1);
					}catch(Exception e){
						result.setSuccess(false);
						result.setMessage("权限组新增失败");
					}
				}else{
					result.setSuccess(false);
					result.setMessage("权限组名称重复");
				}
			}else{
				String authorityGroupName=authorityGroupService.selectNameById(authorityGroupForm.getId());
				if(!authorityGroupForm.getName().equals(authorityGroupName)){
					if(authorityGroupService.repeatedAuthority(authorityGroupForm)==0){
						try{
							authorityGroupService.momdifyAuthorityGroup(authorityGroupForm, authoritys);
							result.setMessage("权限组修改成功");
							addLogger("修改权限组", "修改权限组，将权限组"+authorityGroupName+"修改为:"+authorityGroupForm.getName(), 1);
						}catch(Exception e){
							result.setSuccess(false);
							result.setMessage("权限组修改失败");
						}
					}else{
						result.setSuccess(false);
						result.setMessage("权限组名称重复");
					}
				}else{         //权限组名称是原来的
					try{
						authorityGroupService.momdifyAuthorityGroup(authorityGroupForm, authoritys);
						result.setMessage("权限组修改成功");
						addLogger("修改权限组", "修改权限组，修改后的权限组名称和之前的是一样的", 1);
					}catch(Exception e){
						result.setSuccess(false);
						result.setMessage("权限组修改失败");
					}
				}
			}
			return result;
		}
		@RequestMapping("/{id}/deleteAuthorityGroup")
		@ResponseBody
		public JsonResult<Object> deleteAuthorityGroup(@PathVariable Integer id){
			JsonResult<Object> result = new JsonResult<Object>(true,Constant.OperationTips.SUCCESS);
			try{
				String authorityGroupName=authorityGroupService.selectNameById(id);//获取要删除的权限组名称
				authorityGroupService.deleteAuthorityGroup(id);//删除权限组
				result.setMessage("权限组删除成功");
				addLogger("删除权限组", "删除权限组,权限组名称为:"+authorityGroupName, 1);
			}catch(Exception e){
				result.setSuccess(false);
				result.setMessage("权限组删除失败");
			}
			return result;
		}
		
}
