package com.sunyard.dispatch.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.sunyard.dispatch.model.ParametersCustomModel;

public interface ParametersCustomService {
	/**
	 * 按照custom_para_type分类查找custom_para
	 * 
	 * @param model
	 * @return
	 */
	@Transactional
	public List<ParametersCustomModel> getCustomParametersList(
			ParametersCustomModel model);

	@Transactional
	public void editCustomParameters(ParametersCustomModel model);

	@Transactional
	public void addCustomParameters(ParametersCustomModel model);
}
