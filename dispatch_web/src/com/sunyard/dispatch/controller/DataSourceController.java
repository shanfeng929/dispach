package com.sunyard.dispatch.controller;  

import java.io.UnsupportedEncodingException;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sunyard.dispatch.annotation.WriteLog;
import com.sunyard.dispatch.enums.LogDict;
import com.sunyard.dispatch.model.DataSourceModel;
import com.sunyard.dispatch.model.form.DataSourceForm;
import com.sunyard.dispatch.service.DataSourceService;
import com.sunyard.dispatch.util.BaseController;
import com.sunyard.dispatch.util.Constant;
import com.sunyard.dispatch.util.JsonResult;


/**
 * 数据源配置管理 控制层
 * @author quan.shen
 *
 */
@RequestMapping(value = "/datasource")
@Controller
public class DataSourceController extends BaseController{
	@Resource
	DataSourceService dataSourceService;
	
	/**
	 * 分页查询远程服务
	 * @param form
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@WriteLog(log=LogDict.Base_Datasource_Query)
	@RequestMapping("/query")
	@ResponseBody
	public JsonResult<DataSourceModel> query(DataSourceForm form) throws UnsupportedEncodingException {
		JsonResult<DataSourceModel> result = new JsonResult<DataSourceModel>(true, Constant.OperationTips.SUCCESS);
		String name = java.net.URLDecoder.decode(form.getDbName(),"UTF-8");
		form.setDbName(name);
		result.setPageItems(dataSourceService.getDataSourcePage(form));
		return result;
	}
	
	/**
	 * 根据主键查找远程服务
	 * @param form
	 * @return
	 */
	@WriteLog(log=LogDict.Base_Datasource_Find)
	@RequestMapping("/findDataSourceById")
	@ResponseBody
	public JsonResult<DataSourceModel> findDataSourceById(Integer dbId) {
		JsonResult<DataSourceModel> result = new JsonResult<DataSourceModel>(true, Constant.OperationTips.SUCCESS);
		result.setItem(dataSourceService.findDataSourceById(dbId));
		return result;
	}
	
	/**
	 * 保存或修改远程服务
	 * @param form
	 * @return
	 * @throws Exception 
	 */
	@WriteLog(log=LogDict.Base_Datasource_Save)
	@RequestMapping("/saveOrUpdate")
	@ResponseBody
	public JsonResult<DataSourceModel> saveOrUpdate(DataSourceForm form) throws Exception {
		JsonResult<DataSourceModel> result = new JsonResult<DataSourceModel>(true, Constant.OperationTips.SUCCESS);
		if(form.getDbId() == null){//新增
			dataSourceService.dataSourceAdd(form);
			result.setMessage("数据源新增成功");
		}else{//修改
			dataSourceService.dataSourceUpdate(form);
			result.setMessage("数据源修改成功");
		}
		return result;
	}
	
	/**
	 * 根据ID删除数据源
	 * @param dbId
	 * @return
	 * @throws Exception 
	 */
	@WriteLog(log=LogDict.Base_Datasource_Delete)
	@RequestMapping("/delete")
	@ResponseBody
	public JsonResult<DataSourceModel> delete(Integer dbId) throws Exception{
		JsonResult<DataSourceModel> result = new JsonResult<DataSourceModel>(true, Constant.OperationTips.SUCCESS);
		dataSourceService.dataSourceDel(dbId);
		result.setMessage("数据源删除成功");
		return result;
	}
	
	/**
	 * 测试数据源连接
	 * @param form
	 * @return
	 * @throws Exception 
	 */
	@WriteLog(log=LogDict.Base_Datasource_Test)
	@RequestMapping("/testConnect")
	@ResponseBody
	public JsonResult<DataSourceModel> testConnect(DataSourceForm form) throws Exception{
		JsonResult<DataSourceModel> result = new JsonResult<DataSourceModel>(true, Constant.OperationTips.SUCCESS);
		dataSourceService.testConnect(form);
		result.setMessage("数据源测试连接成功");
		return result;
	}
	
}
  
