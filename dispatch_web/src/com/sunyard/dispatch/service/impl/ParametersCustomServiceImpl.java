package com.sunyard.dispatch.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.sunyard.dispatch.dao.ParametersDao;
import com.sunyard.dispatch.model.ParametersCustomModel;
import com.sunyard.dispatch.service.ParametersCustomService;

@Service("parametersCustomService")
public class ParametersCustomServiceImpl implements ParametersCustomService {
	@Resource
	ParametersDao parametersDAO;

	@Override
	public List<ParametersCustomModel> getCustomParametersList(
			ParametersCustomModel model) {
		List<ParametersCustomModel> resultList = parametersDAO
				.getCustomParametersByType(model);
		return resultList;
	}

	@Override
	public void editCustomParameters(ParametersCustomModel model) {
		if (model.getCustom_para_value() == ""
				|| model.getCustom_para_value() == null) {
			// 删
			if (parametersDAO.checkCustomParameters(model) > 0) {
				parametersDAO.deleteCustomParameters(model);
			} else {
				System.out.println("【注意】删除的实际过程中有一个错误");
			}
		} else {
			// 改
			parametersDAO.editCustomParameters(model);
		}

	}

	@Override
	public void addCustomParameters(ParametersCustomModel model) {
		if (parametersDAO.checkCustomParameters(model) > 0) {
			// 改
			parametersDAO.editCustomParameters(model);
		} else {
			// 增
			parametersDAO.insertCustomParameters(model);
		}
	}
}
