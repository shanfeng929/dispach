package com.sunyard.dispatch.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.dao.ParametersDao;
import com.sunyard.dispatch.model.ParametersModel;
import com.sunyard.dispatch.model.form.ParametersForm;
import com.sunyard.dispatch.service.ParametersService;

@Service("parametersService")
public class ParametersServiceImpl implements ParametersService {

	@Resource
	ParametersDao parametersDao;

	@Override
	public Page<ParametersModel> getParametersList(ParametersForm form) {
		// System.out.println("para_name是："+form.getPara_name());
		List<ParametersModel> parametersList = parametersDao
				.getParametersList(form);
		// debug
		// System.out.println("长度"+parametersList.size());
		Integer total = parametersDao.getParametersListCount(form);
		// System.out.println("数量是" + total);
		return new Page<ParametersModel>(form.getPage(), form.getLimit(),
				total, parametersList);
	}

	@Override
	public void deleteParametersList(String para_id) {
		parametersDao.parametersDel(para_id);
	}

	@Override
	public void multiDeletePara(String[] para_ids) {
		for (String para_id : para_ids) {
			parametersDao.parametersDel(para_id);
		}
	}

	@Override
	public void addParameters(ParametersForm form) throws Exception {
		if (parametersDao.getParametersNameCount(form) > 0) {
			throw new Exception("已经存在同名参数");
		}
		parametersDao.parametersAdd(form);
		// 暂时没写避免重复的语句
	}

	@Override
	public void editParameters(ParametersForm form) throws Exception {
		if (parametersDao.getParametersNameCount(form) > 0) {
			throw new Exception("已经存在同名参数");
		}
		parametersDao.parametersEdit(form);
		// 暂时没写验证语句
		ParametersModel tongbu=parametersDao.getUpdatedPara(form).get(0);
		parametersDao.updateTaskPara(tongbu);
	}

}
