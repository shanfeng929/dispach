package com.sunyard.dispatch.dao;

import java.util.List;

import com.sunyard.dispatch.model.ParametersCustomModel;
import com.sunyard.dispatch.model.ParametersModel;
import com.sunyard.dispatch.model.form.ParametersForm;

public interface ParametersDao {
	List<ParametersModel> getParametersList(ParametersForm form);

	Integer getParametersListCount(ParametersForm form);

	Integer getParametersNameCount(ParametersForm form);

	void parametersDel(String para_id);

	void parametersAdd(ParametersForm form);

	void parametersEdit(ParametersForm form);

	// 以下是自定义变量用的查询方法
	List<ParametersCustomModel> getCustomParametersByType(
			ParametersCustomModel model);

	Integer checkCustomParameters(ParametersCustomModel model);

	void editCustomParameters(ParametersCustomModel model);

	void insertCustomParameters(ParametersCustomModel model);

	void deleteCustomParameters(ParametersCustomModel model);
	
	List<ParametersModel> getUpdatedPara(ParametersForm form);
	
	void updateTaskPara(ParametersModel model);
}
