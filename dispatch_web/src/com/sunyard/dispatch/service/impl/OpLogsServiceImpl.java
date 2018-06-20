package com.sunyard.dispatch.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.dao.OpLogsDao;
import com.sunyard.dispatch.model.OpLog;
import com.sunyard.dispatch.model.form.OpLogForm;
import com.sunyard.dispatch.service.OpLogsService;

@Service("OpLogsService")
public class OpLogsServiceImpl implements OpLogsService {
	
	@Resource
	private OpLogsDao opLogsDao;
	
	@Override
	public Page<OpLog> getOpLogsPage(OpLogForm opLog) {
		List<OpLog> opLogs = opLogsDao.getOpLogList(opLog);
		Integer count = opLogsDao.getOpLogCount(opLog);
		return new Page<OpLog>(opLog.getPage(), opLog.getLimit(), count, opLogs);
	}
 
	@Override
	public void addLogger(OpLogForm opLog) {
		opLogsDao.addLogger(opLog);
	}

	@Override
	public List<OpLog> getAllOpLogs(OpLogForm form) {
		return opLogsDao.getAllOpLogs(form);
	}

}
