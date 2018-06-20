package com.sunyard.dispatch.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.dao.TemplateManageDao;
import com.sunyard.dispatch.model.TemplateManageModel;
import com.sunyard.dispatch.model.form.TemplateManageForm;
import com.sunyard.dispatch.service.TemplateManageService;

@Service("templateManageService")
public class TemplateManageServiceImpl implements TemplateManageService {
	
	@Resource
	private TemplateManageDao templateManageDao;
	
	@Override
	public Page<TemplateManageModel> getTemplateManagePage(
			TemplateManageForm form) {
		List<TemplateManageModel> flowGroupModels = templateManageDao.getTemplateManagePage(form);
		Integer count = templateManageDao.getTemplateManageListCount(form);
		return new Page<TemplateManageModel>(form.getStart(), form.getLimit(), count, flowGroupModels);
	}
	
	@Override
	public List<TemplateManageModel> getTemplateList() {
		List<TemplateManageModel> templateList = templateManageDao.getTemplateList();
		List<TemplateManageModel> tempList = new ArrayList<TemplateManageModel>();
		for (TemplateManageModel templateManageModel : templateList) {
			String paramsVal = templateManageModel.getParamsVal();
			String[] params = paramsVal.split(";");
			//拼装json字符串
			String  jsonParamVal = "{";
			for (String param : params) {
				String[] key_val = param.split(":");
				jsonParamVal += "'"+key_val[0].trim()+"':'"+key_val[1].trim()+"',";
			}
			jsonParamVal = jsonParamVal.substring(0, jsonParamVal.length()-1) +"}";
			templateManageModel.setParamsVal(jsonParamVal);
			tempList.add(templateManageModel);
		}
		return tempList;
	}

	@Override
	public TemplateManageModel findTemplateById(String id) {
		return templateManageDao.findTemplateById(id);
	}
	
	@Override
	public Map findTemplateMapById(String id) {
		TemplateManageModel model = templateManageDao.findTemplateById(id);
		Map<String, String> templateMap = new HashMap<String, String>();
		String[] params = model.getParamsVal().split(";");
		for (String param : params) {
			String[] key_val = param.split(":");
			if("id".equals(key_val[0].trim())){
				continue;
			}else {
				templateMap.put(key_val[0].trim(), key_val[1].trim());
			}
		}
		templateMap.put("id",id);
		return templateMap;
	}

	@Override
	public void templateAdd(TemplateManageForm form) {
		//更新主键
		templateManageDao.getID();
		String id = templateManageDao.getTemplateId();
		form.setId(id);
		String[] params = form.getParamsVal().split(";");
		//遍历属性参数详情  -- 设置组件名称
		String templateName = "";
		for (String param : params) {
			String[] key_val = param.split(":");
			if("templateName".equals(key_val[0].trim())){
				templateName = key_val[1].trim();
			}
		}
		form.setTemplateName(templateName);
		templateManageDao.templateAdd(form);
	}


	@Override
	public void templateEdit(TemplateManageForm form) {
		templateManageDao.templateEdit(form);
	}


//	@Override
//	public void templateDel(String id) {
//		templateManageDao.templateDel(id);
//	}
	
	@Override
	public void templateDelByIds(String ids) {
		templateManageDao.templateDelByIds(ids);
	}
	
//	public static void main(String[] args) {
//		String paramsVal = "id: 1; name: ; age: 12";
//		String[] params = paramsVal.split(";");
//		//拼装json字符串
//		String  jsonParamVal = "{";
//		for (String param : params) {
//			String[] key_val = param.split(":");
//			jsonParamVal += "'"+key_val[0].trim()+"':'"+key_val[1].trim()+"',";
//		}
//		jsonParamVal = jsonParamVal.substring(0, jsonParamVal.length()-1) +"}";
//		System.out.println(jsonParamVal);
//	}

}
