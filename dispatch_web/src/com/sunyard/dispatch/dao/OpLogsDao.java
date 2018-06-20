package com.sunyard.dispatch.dao;

import java.util.List;

import com.sunyard.dispatch.model.OpLog;
import com.sunyard.dispatch.model.form.OpLogForm;

public interface OpLogsDao {
	
	List<OpLog> getOpLogList(OpLogForm form);
	
	Integer getOpLogCount(OpLogForm form);

	void addLogger(OpLogForm opLog);
	
	List<OpLog> getAllOpLogs(OpLogForm form);

}
