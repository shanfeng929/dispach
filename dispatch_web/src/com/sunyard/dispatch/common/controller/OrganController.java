package com.sunyard.dispatch.common.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sunyard.dispatch.common.model.Organ;
import com.sunyard.dispatch.common.model.form.OrganForm;
import com.sunyard.dispatch.common.service.OrganService;
import com.sunyard.dispatch.util.BaseController;
import com.sunyard.dispatch.util.Constant;
import com.sunyard.dispatch.util.JsonResult;


/**
 * @author fengqibei
 * @date 2015-8-12 下午5:42:39
 */
@Controller
@RequestMapping("/commons/organ")
public class OrganController extends BaseController {
	@Resource
	OrganService organService;

	/**
	 * 
	 * @param form
	 * @return JsonResult<Organ>
	 */
	@RequestMapping(value = "/saveOrUpdateOrganItem")
	public @ResponseBody
	JsonResult<Object> addOrganItem(Organ form) {
		JsonResult<Object> jsonResult = new JsonResult<Object>(true, Constant.OperationTips.SUCCESS);
		try {
			organService.addOraganItem(form);
		} catch (Exception e) {
			jsonResult.setSuccess(false);
			jsonResult.setMessage(Constant.OperationTips.ERROR);
			logger.error("/saveOrUpdateOrganItem",e);
		}
		return jsonResult;
	}

	@RequestMapping("/getOrganTreeData")
	@ResponseBody
	public List<Map<String, Object>> queryTree(String type) {
		Integer organId;
		Integer userId = super.getUserBySession().getUser().getId();
		if(type == null || type.trim().equals("")){
			organId = 0;
		}else{
			organId = organService.selectOrganByUserId(userId);
		}
		List<Map<String, Object>> organTreeData = organService.revealOrganTree(organId);
		return organTreeData;
	}

	@RequestMapping("/{parentId}/getParentName")
	@ResponseBody
	public JsonResult<Organ> getParentName(@PathVariable Integer parentId) {
		JsonResult<Organ> result = new JsonResult<Organ>(true, Constant.OperationTips.SUCCESS);
		Map<String, Object> map = organService.queryParentName(parentId);
		result.setMapItems(map);
		return result;
	}

	@RequestMapping("/saveOrUpdateOrgan")
	@ResponseBody
	public JsonResult<Object> saveOrUpdateOrgan(OrganForm organForm) {
		JsonResult<Object> result = new JsonResult<Object>(true, Constant.OperationTips.SUCCESS);
		organForm.setLoginName(getUserBySession().getUser().getLoginName());
		if (organForm.getId() == null) { // 机构是新增的
			if (organService.repeatedOrganName(organForm) == 0) {
				if (organService.repeatedOrganCode(organForm) == 0) {
					try {
						organService.insertOrgan(organForm);
						result.setMessage("机构新增成功");
						addLogger("操作成功", "机构新增成功", Constant.LogLevel.INFO);
					} catch (Exception e) {
						result.setSuccess(false);
						result.setMessage("机构新增失败");
						logger.error("机构新增失败",e);
						addLogger("操作失败", "机构新增失败", Constant.LogLevel.INFO);
					}
					
				} else {
					result.setSuccess(false);
					result.setMessage("机构代码重复");
					addLogger("操作失败", "机构代码重复", Constant.LogLevel.INFO);
				}
				
			} else {
				result.setSuccess(false);
				result.setMessage("机构名称重复");
				addLogger("操作失败", "机构名称重复", Constant.LogLevel.INFO);
			}
		} else { // 机构是之前就存在的
			if (!organForm.getName().equals(organService.selectOrganById(organForm).getName()) || 
					!organForm.getCode().equals(organService.selectOrganById(organForm).getCode())) { //改变了机构名称或机构代码
				organForm.setLoginName(getUserBySession().getUser().getLoginName());
				if (organService.repeatedOrganName(organForm) == 0 ) {
					
					if (organService.repeatedOrganCode(organForm) == 0) {
						try {
							organService.modifyOrgan(organForm);
							result.setMessage("机构修改成功");
							addLogger("操作成功", "机构修改成功", Constant.LogLevel.INFO);
						} catch (Exception e) {
							result.setSuccess(false);
							result.setMessage("机构修改失败");
							logger.error("机构修改失败",e);
							addLogger("操作失败", "机构修改失败", Constant.LogLevel.INFO);
						}
					} else {
						result.setSuccess(false);
						result.setMessage("机构代码重复");
						addLogger("操作失败", "机构代码重复", Constant.LogLevel.INFO);
					}
					
				} else {
					result.setSuccess(false);
					result.setMessage("机构名称重复");
					addLogger("操作失败", "机构名称重复", Constant.LogLevel.INFO);
				}
			} else { // 机构名称和机构代码是原来的
				try {
					organService.modifyOrgan(organForm);
					result.setMessage("机构修改成功");
					addLogger("操作成功", "机构修改成功", Constant.LogLevel.INFO);
				} catch (Exception e) {
					result.setSuccess(false);
					result.setMessage("机构修改失败");
					logger.error("机构修改失败",e);
					addLogger("操作失败", "机构修改失败", Constant.LogLevel.INFO);
				}
			}
		}
		return result;
	}

	@RequestMapping("/{id}/deleteOrgan")
	@ResponseBody
	public JsonResult<Object> deleteUserGroup(@PathVariable Integer id) {
		JsonResult<Object> result = new JsonResult<Object>(true, Constant.OperationTips.SUCCESS);
		List<Integer> list1 = organService.selectUserIdByOrganId(id);
		if (list1 == null || list1.size() == 0) {
			try {
				organService.deleteOrgan(id);
				result.setMessage("机构删除成功");
				addLogger("操作成功", "机构删除失败", Constant.LogLevel.INFO);
			} catch (Exception e) {
				result.setSuccess(false);
				result.setMessage("机构删除失败");
				logger.error("机构删除失败",e);
				addLogger("操作失败", "机构删除失败", Constant.LogLevel.INFO);
			}
		} else {
			result.setSuccess(false);
			result.setMessage("机构删除失败,其下有用户关联");
			addLogger("操作失败", "机构删除失败,其下有用户关联", Constant.LogLevel.INFO);
		}
		
		return result;
	}
	
	/**
	 * 用于插件的 查询organ 
	 * @author zhx
	 * @param type
	 * @return
	 */
	@RequestMapping("/getOrganTreeComBox")
	@ResponseBody
	public List<Map<String, Object>> getOrganTreeComBox(String type) {
		List<Map<String, Object>> organTreeData = organService.getOrganTreeComBox(type,"");
		return organTreeData;
	}

}
