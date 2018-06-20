package com.sunyard.dispatch.service;

import javax.transaction.Transactional;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.model.DataSourceModel;
import com.sunyard.dispatch.model.form.DataSourceForm;

public interface DataSourceService {

	@Transactional
	Page<DataSourceModel> getDataSourcePage(DataSourceForm form);

	@Transactional
	DataSourceModel findDataSourceById(Integer dbId);
	
	@Transactional
	void dataSourceAdd(DataSourceForm form)  throws Exception;

	@Transactional
	void dataSourceUpdate(DataSourceForm form)  throws Exception;

	@Transactional
	void dataSourceDel(Integer dbId) throws Exception;

	@Transactional
	void testConnect(DataSourceForm form) throws Exception;

}
