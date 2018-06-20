package com.sunyard.dispatch.service.impl;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.dao.DataSourceDao;
import com.sunyard.dispatch.model.DataSourceModel;
import com.sunyard.dispatch.model.form.DataSourceForm;
import com.sunyard.dispatch.service.DataSourceService;
import com.sunyard.dispatch.util.EncryptionDecryption;

@Service("DataSourceService")
public class DataSourceServiceImpl implements DataSourceService {
	
	@Resource
	private DataSourceDao dataSourceDao;

	@Override
	public Page<DataSourceModel> getDataSourcePage(DataSourceForm form) {
		List<DataSourceModel> dataSourceList = dataSourceDao.getDataSourceList(form);
		Integer count = dataSourceDao.getDataSourceCount(form);
		return new Page<DataSourceModel>(form.getPage(), form.getLimit(), count, dataSourceList);
	}

	@Override
	public DataSourceModel findDataSourceById(Integer dbId) {
		return dataSourceDao.findDataSourceById(dbId);
	}

	@Override
	public void dataSourceAdd(DataSourceForm form) throws Exception{
		Integer count = dataSourceDao.checkUnique(form);
		if(count.intValue() > 0 )
			throw new Exception("数据源已存在");
		try {
			EncryptionDecryption parser = new EncryptionDecryption();
			String password = parser.encrypt(form.getPassword());
			form.setPassword(password);
		} catch (Exception e) {
			e.printStackTrace();
		}
		dataSourceDao.dataSourceAdd(form);
	}

	@Override
	public void dataSourceUpdate(DataSourceForm form) throws Exception{
		Integer count = dataSourceDao.checkUnique(form);
		if(count.intValue() > 0 )
			throw new Exception("数据源已存在");
		Integer dbId = form.getDbId();
		DataSourceModel dataSourceModel = dataSourceDao.findDataSourceById(dbId);
		//加密后密码
		String pwd_after = dataSourceModel.getPassword();
		if(!pwd_after.equals(form.getPassword())){
			try {
				EncryptionDecryption parser = new EncryptionDecryption();
				String password = parser.encrypt(form.getPassword());
				form.setPassword(password);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		dataSourceDao.dataSourceUpdate(form);
	}

	@Override
	public void dataSourceDel(Integer dbId) throws Exception{
		int count = dataSourceDao.checkIsRelated(dbId);
		if(count > 0){
			throw new Exception("数据源被关联");
		}
		dataSourceDao.dataSourceDel(dbId);
	}

	@Override
	public void testConnect(DataSourceForm form) throws Exception{
		if(form.getDbId() != null){
			DataSourceModel dataSourceModel = dataSourceDao.findDataSourceById(form.getDbId());
			if(dataSourceModel.getPassword().equals(form.getPassword())){
				try {
					EncryptionDecryption parser = new EncryptionDecryption();
					String password = parser.decrypt(form.getPassword());
					form.setPassword(password);
				} catch (Exception e) {
					e.printStackTrace();
					throw e;
				}
			}
		}
		try {
			Class.forName(form.getDriverName());
			DriverManager.getConnection(form.getDbUrl(), form.getUserName(), form.getPassword());
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw e;
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
	}

}
