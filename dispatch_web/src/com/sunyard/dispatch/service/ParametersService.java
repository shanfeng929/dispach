package com.sunyard.dispatch.service;

import org.springframework.transaction.annotation.Transactional;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.model.ParametersModel;
import com.sunyard.dispatch.model.form.ParametersForm;

public interface ParametersService {
	/**
	 * 分页查询参数列表
	 * 
	 * @param form
	 * @return
	 */
	@Transactional
	public Page<ParametersModel> getParametersList(ParametersForm form);

	/**
	 * 删除一条参数
	 * 
	 * @param id
	 */
	@Transactional
	public void deleteParametersList(String para_id);
	
	/**
	 * 删除多条参数
	 * 
	 * @param id
	 */
	@Transactional
	public void multiDeletePara(String[] para_ids);
	/**
	 * 添加一条参数
	 * 
	 * @param form
	 * @throws Exception
	 */
	@Transactional
	public void addParameters(ParametersForm form) throws Exception;

	/**
	 * 编辑修改一条参数
	 * @param form
	 * @throws Exception
	 */
	@Transactional
	public void editParameters(ParametersForm form) throws Exception;
}
