package com.sunyard.dispatch.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sunyard.dispatch.model.TemplateManageModel;
import com.sunyard.dispatch.model.form.TemplateManageForm;


public interface TemplateManageDao {

	/**
	 * 分页查找组件
	 * @param form
	 * @return
	 */
	List<TemplateManageModel> getTemplateManagePage(TemplateManageForm form);

	/**
	 * 条件查询组件列表总条数
	 * @param form
	 * @return
	 */
	Integer getTemplateManageListCount(TemplateManageForm form);

	/**
	 * 查询所有组件列表
	 * @return
	 */
	List<TemplateManageModel> getTemplateList();
	
	/**
	 * 根据ID查找组件
	 * @param id
	 * @return
	 */
	TemplateManageModel findTemplateById(@Param("id")String id);

	/**
	 * 新增组件
	 * @param form
	 */
	void templateAdd(TemplateManageForm form);

	/**
	 * 修改组件
	 * @param form
	 */
	void templateEdit(TemplateManageForm form);

//	/**
//	 * 根据ID删除组件
//	 * @param id
//	 */
//	void templateDel(@Param("id")String id);
	
	/**
	 * 根据拼接而成的ids,批量删除组件
	 * @param ids
	 */
	void templateDelByIds(@Param("ids")String ids);
	
	/**
	 * 字符串主键自增
	 * @param id
	 */
	void getID();
	
	/**
	 * 获取当前自增组件ID
	 * @return
	 */
	String getTemplateId();


	
}
