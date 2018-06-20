Ext.define(projectName + '.view.dispatch.parameters.OpLogsGridView', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.opLogsGrid',
	layout : 'fit',
	columnLines : true,
//	selModel : Ext.create('Ext.selection.CheckboxModel'),
	initComponent : function() {
		var me = this;
		Ext.applyIf(this, {
			columns : [ {
				xtype : 'rownumberer',
				text : '序号',
				align : 'center',
				width : 60
			}, {
				dataIndex : 'id',
				hideable : true,
				hidden : true
			}, {
				dataIndex : 'createBy',
				hideable : true,
				hidden : true
			}, {
				text : '操作员',
				align : 'center',
				dataIndex : 'operator',
				flex : 1
			}, {
				text : '操作员IP',
				align : 'center',
				dataIndex : 'address',
				flex : 1
			}, {
				text : '操作',
				align : 'center',
				dataIndex : 'operation',
				flex : 1
			}, {
				text : '耗时',
				align : 'center',
				dataIndex : 'costTime',
				flex : 1
			},{
				text : '服务Ip',
				align : 'center',
				dataIndex : 'serverIp',
				flex : 1
			}, {
				text : '日志等级',
				align : 'center',
				dataIndex : 'level',
				flex : 1,
				tooltip:"一般: 用户操作日志记录，功能运行正常！<br> 警告: 测试功能出错，对业务无影响，需要修复！<br> 紧急: 显示功能出错，对业务无影响，需及时修复！<br> 严重: 修改操作出错，对业务有影响，短时间内可能不会引起业务问题，需尽快解决！<br> 事故: 业务运行出错，已经对业务造成影响，需要马上解决！<br> 危险: 涉及系统运程问题，直接会导致系统宕机！"
			}, {
				text : '说明',
				align : 'center',
				dataIndex : 'description',
				flex : 1
			}, {
				text : '操作时间',
				align : 'center',
				dataIndex : 'createTime',
				flex : 1
			}]
		});
		me.callParent(arguments);
	}
});