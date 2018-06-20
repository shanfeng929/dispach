Ext.define(projectName +'.view.commons.sys.logger.CalLoggerGridView', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.calLoggerGrid',
			layout : 'fit',
			columnLines : true,
			initComponent : function() {
				var me = this;
				Ext.applyIf(this, {
							columns : [{
										xtype : 'rownumberer',
										text : '序号',
										align : 'center',
										width : 50
									}, {
										text : '日志ID',
										width : 150,
										align : 'center',
										dataIndex : 'logId',
										flex : 1
									}, {
										text : '作业ID',
										width : 150,
										align : 'center',
										dataIndex : 'jobId',
										flex : 1
									}, {
										text : '作业名称',
										width : 150,
										align : 'center',
										dataIndex : 'jobName',
										flex : 1
									}, {
										text : '任务ID',
										width : 150,
										align : 'center',
										dataIndex : 'taskId',
										flex : 1
									}, {
										text : '任务名称',
										width : 150,
										align : 'center',
										dataIndex : 'taskName',
										flex : 1
									}, {
										text : '日志内容',
										width : 150,
										align : 'center',
										dataIndex : 'logContent',
										flex : 1
									}, {
										text : '开始时间',
										width : 150,
										align : 'center',
										dataIndex : 'startTime',
										flex : 1
									}, {
										text : '结束时间',
										width : 150,
										align : 'center',
										dataIndex : 'endTime',
										flex : 1
									}]

						});
				me.callParent(arguments);
			}
		});