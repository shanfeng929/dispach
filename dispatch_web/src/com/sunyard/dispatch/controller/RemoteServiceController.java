package com.sunyard.dispatch.controller;  

import java.io.UnsupportedEncodingException;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sunyard.dispatch.annotation.WriteLog;
import com.sunyard.dispatch.enums.LogDict;
import com.sunyard.dispatch.model.RemoteServiceModel;
import com.sunyard.dispatch.model.form.RemoteServiceForm;
import com.sunyard.dispatch.service.RemoteServiceService;
import com.sunyard.dispatch.util.BaseController;
import com.sunyard.dispatch.util.Constant;
import com.sunyard.dispatch.util.EncryptionDecryption;
import com.sunyard.dispatch.util.JsonResult;


/**
 * 远程服务配置管理 控制层
 * @author quan.shen
 *
 */
@RequestMapping(value = "/dispatch/remoteservice")
@Controller
public class RemoteServiceController extends BaseController{
	@Resource
	RemoteServiceService remoteServiceService;
	protected Log logger = LogFactory.getLog(getClass());
	
	/**
	 * 分页查询远程服务
	 * @param form
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@WriteLog(log=LogDict.Base_Linux_Query)
	@RequestMapping("/query")
	@ResponseBody
	public JsonResult<RemoteServiceModel> query(RemoteServiceForm form) throws UnsupportedEncodingException {
		JsonResult<RemoteServiceModel> result = new JsonResult<RemoteServiceModel>(true, Constant.OperationTips.SUCCESS);
		String name = java.net.URLDecoder.decode(form.getName(),"UTF-8");
		form.setName(name);
		result.setPageItems(remoteServiceService.getRemoteServiceList(form));
		return result;
	}
	
	/**
	 * 根据主键查找远程服务
	 * @param form
	 * @return
	 */
	@WriteLog(log=LogDict.Base_Linux_Find)
	@RequestMapping("/findRemoteById")
	@ResponseBody
	public JsonResult<RemoteServiceModel> findRemoteById(RemoteServiceForm form) {
		JsonResult<RemoteServiceModel> result = new JsonResult<RemoteServiceModel>(true, Constant.OperationTips.SUCCESS);
		result.setItem(remoteServiceService.findRemoteById(form));
		return result;
	}
	
	/**
	 * 保存或修改远程服务
	 * @param form
	 * @return
	 * @throws Exception 
	 */
	@WriteLog(log=LogDict.Base_Linux_Save)
	@RequestMapping("/saveOrUpdate")
	@ResponseBody
	public JsonResult<RemoteServiceModel> saveOrUpdate(RemoteServiceForm form) throws Exception {
		JsonResult<RemoteServiceModel> result = new JsonResult<RemoteServiceModel>(true, Constant.OperationTips.SUCCESS);
		if(form.getId() == null){//新增
			form.setCreateBy(getUserBySession().getUser().getLoginName());
			EncryptionDecryption parser = new EncryptionDecryption();
			String password=parser.encrypt(form.getRemotePasswd());
			form.setRemotePasswd(password);
			remoteServiceService.remoteServiceAdd(form);
			result.setMessage("远程服务新增成功");
		}else{//修改
			form.setUpdatedBy(getUserBySession().getUser().getLoginName());
			remoteServiceService.remoteServiceEdit(form);
			result.setMessage("远程服务修改成功");
		}
		return result;
	}
	
	
	/**
	 * 根据拼接而成的ids,批量删除远程服务
	 * @param ids
	 * @return
	 * @throws Exception 
	 */
	@WriteLog(log=LogDict.Base_Linux_Delete)
	@RequestMapping("/deleteByIds")
	@ResponseBody
	public JsonResult<RemoteServiceModel> deleteByIds(String ids) throws Exception{
		JsonResult<RemoteServiceModel> result = new JsonResult<RemoteServiceModel>(true, Constant.OperationTips.SUCCESS);
		remoteServiceService.remoteServiceDelByIds(ids);
		result.setMessage("远程服务删除成功");
		return result;
	}
	
	/**
	 * 测试远程服务IP
	 * @param form
	 * @return
	 * @throws Exception 
	 */
	@WriteLog(log=LogDict.Base_Linux_Find)
	@RequestMapping("/test")
	@ResponseBody
	public JsonResult<RemoteServiceModel> test(RemoteServiceForm form) throws Exception{
		JsonResult<RemoteServiceModel> result = new JsonResult<RemoteServiceModel>(true, Constant.OperationTips.SUCCESS);
		remoteServiceService.test(form);
		result.setMessage("远程服务测试连接成功");
		return result;
	}
	
}
  
