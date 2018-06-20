Ext.define(projectName +'.model.commons.sys.logger.CalLoggerModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'logId',
						type : 'string'
					}, {
						name : 'jobId',
						type : 'string'
					}, {
						name : 'jobName',
						type : 'string'
					}, {
						name : 'taskId',
						type : 'string'
					}, {
						name : 'taskName',
						type : 'string'
					}, {
						name : 'logContent',
						type : 'string'
					}, {
						name : 'startTime',
						type : 'string'
					}, {
						name : 'endTime',
						type : 'string'
					}]
		});