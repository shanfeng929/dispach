package com.sunyard.dispatch.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sunyard.dispatch.model.DataSourceModel;
import com.sunyard.dispatch.model.form.DataSourceForm;

public interface DataSourceDao {

	List<DataSourceModel> getDataSourceList(DataSourceForm form);

	Integer getDataSourceCount(DataSourceForm form);

	DataSourceModel findDataSourceById(@Param("dbId")Integer dbId);

	void dataSourceAdd(DataSourceForm form);

	void dataSourceUpdate(DataSourceForm form);

	void dataSourceDel(@Param("dbId")Integer dbId);

	Integer checkIsRelated(@Param("dbId")Integer dbId);
	
	Integer checkUnique(DataSourceForm form);

}
