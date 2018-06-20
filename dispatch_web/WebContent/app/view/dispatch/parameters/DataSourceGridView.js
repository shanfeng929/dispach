Ext.define(projectName + '.view.dispatch.parameters.DataSourceGridView', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.dataSourceGrid',
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
				dataIndex : 'dbId',
				hideable : true,
				hidden : true
			}, {
				text : '数据源名称',
				align : 'center',
				dataIndex : 'dbName',
				flex : 1
			}, {
				text : '数据源驱动包名',
				align : 'center',
				dataIndex : 'driverName',
				flex : 1
			}, {
				text : '数据源URL链接',
				align : 'center',
				dataIndex : 'dbUrl',
				flex : 1
			}, {
				text : '数据源登录账号',
				align : 'center',
				dataIndex : 'userName',
				flex : 1
			}, {
				text : '数据源登录密码',
				align : 'center',
				dataIndex : 'password',
//				hideable : true,
//				hidden : true,
				flex : 1
			}]
		});
		me.callParent(arguments);
	}
});