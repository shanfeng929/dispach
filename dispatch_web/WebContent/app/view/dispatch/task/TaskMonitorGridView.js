Ext.define(projectName + '.view.dispatch.task.TaskMonitorGridView', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.taskMonitorGrid',
	layout : 'fit',
	columnLines : true,
	// selModel : Ext.create('Ext.selection.CheckboxModel'),
	initComponent : function() {
		Ext.tip.QuickTipManager.init();
		Ext.apply(Ext.tip.QuickTipManager.getQuickTip(), {
		    maxWidth: 800,
		    minWidth: 100
		});
		var me = this;
		Ext.applyIf(this, {
			columns : [{
				xtype : 'rownumberer',
				text : '序号',
				align : 'center',
				width : 60
			}, {
				text : 'id',
				dataIndex : 'id',
				hideable : true,
				hidden : true
			}, {
				text : 'pid',
				dataIndex : 'pid',
				hideable : true,
				hidden : true
			}, {
				text : '任务名称',
				align : 'center',
				dataIndex : 'taskName',
				width : 120
			}, {
				text : '任务备注',
				align : 'center',
				dataIndex : 'taskDesc',
				width : 120
			}, {
				text : '任务开始时间',
				align : 'center',
				dataIndex : 'startTime',
				width : 120
			}, {
				text : '任务结束时间',
				align : 'center',
				dataIndex : 'endTime',
				width : 120
			}, {
				text : '耗时(秒)',
				align : 'center',
				dataIndex : 'duration',
				width : 60
			}, {
				text : '任务类型',
				align : 'center',
				dataIndex : 'taskBelong',
				width : 60
			}, {
				text : '任务状态',
				align : 'center',
				dataIndex : 'taskStatus',
				width : 60,
				renderer : function(val) {
					/* 0:正在执行;1:执行时间 超过2秒;2:执行成功;3:执行失败;4:未执行 */
					var returnVal = "";
					if (val == '0' || val == '1') {
						returnVal = "<font color='#408a39'>正在执行</font>";
					} else if (val == '2') {
						returnVal = "<font color='#408a39'>执行成功</font>";
					} else if (val == '3') {
						returnVal = "<font color='#ff0000'>执行失败</font>";/* e0504b */
					} else if (val == '4') {
						returnVal = "未执行";
					}
					return returnVal;
				}
			}, {
				text : '任务执行返回结果',
				align : 'center',
				dataIndex : 'execResult',
				width : 180,
				renderer : function(data, metadata, record,rowIndex, columnIndex, store) {
					var json = data.replace(/"/g,"'");
					return '<div data-qtip="'+ json + '"  data-qtitle="">' + json + '</div>';
				}
			}]
		});
		me.callParent(arguments);
	}
});