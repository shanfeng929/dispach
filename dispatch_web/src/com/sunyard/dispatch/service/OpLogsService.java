package com.sunyard.dispatch.service;

import java.util.List;

import javax.transaction.Transactional;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.model.OpLog;
import com.sunyard.dispatch.model.form.OpLogForm;

public interface OpLogsService {
	
	Page<OpLog> getOpLogsPage(OpLogForm opLog);

	@Transactional
	void addLogger(OpLogForm opLog);

	List<OpLog> getAllOpLogs(OpLogForm form);
}
