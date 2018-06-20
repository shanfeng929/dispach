package com.sunyard.dispatch.service;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.model.TemplateManageModel;
import com.sunyard.dispatch.model.form.TemplateManageForm;


/**
 * 任务组件 业务逻辑处理层
 * @author quan.shen
 *
 */
public interface TemplateManageService {

	/**
	 * 分页查找组件
	 * @param form
	 * @return
	 */
	@Transactional
	Page<TemplateManageModel> getTemplateManagePage(TemplateManageForm form);
	
	/**
	 * 查询所有组件列表
	 * @return
	 */
	@Transactional
	List<TemplateManageModel> getTemplateList();

	/**
	 * 根据ID查找组件（model格式）
	 * @param id
	 * @return
	 */
	@Transactional
	TemplateManageModel findTemplateById(String id);
	
	/**
	 * 根据ID查找组件（map格式）
	 * @param id
	 * @return
	 */
	@Transactional
	Map findTemplateMapById(String id);

	/**
	 * 新增组件
	 * @param form
	 */
	@Transactional
	void templateAdd(TemplateManageForm form);

	/**
	 * 组件修改
	 * @param form
	 */
	@Transactional
	void templateEdit(TemplateManageForm form);

//	/**
//	 * 根据ID删除组件
//	 * @param id
//	 */
//	@Transactional
//	void templateDel(String id);

	/**
	 * 根据拼接而成的ids,批量删除组件
	 * @param ids
	 */
	@Transactional
	void templateDelByIds(String ids);

}
