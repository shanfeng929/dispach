Ext.define(projectName + '.view.dispatch.remoteservice.RemoteserviceGridView', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.remoteserviceGrid',
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
				text : 'id',
				dataIndex : 'id',
				hideable : true,
				hidden : true,
				flex : 1
			}, {
				text : '远程连接名称',
				align : 'center',
				dataIndex : 'name',
				flex : 1
			},/* {
				text : '远程服务器备注',
				align : 'center',
				dataIndex : 'remoteDesc',
				flex : 1
			}, */{
				text : '远程连接IP地址',
				align : 'center',
				dataIndex : 'remoteIp',
				flex : 1
			},/* {
				text : '远程服务类型',
				align : 'center',
				dataIndex : 'remoteType',
				flex : 1
			},*/ {
				text : '远程服务器帐号',
				align : 'center',
				dataIndex : 'remoteUserName',
				flex : 1
			}, {
				text : '远程服务器密码',
				align : 'center',
				dataIndex : 'remotePasswd',
//				hideable : true,
//				hidden : true,
				flex : 1
			}, {
				text : '创建者',
				align : 'center',
				dataIndex : 'createBy',
				flex : 1
			}, {
				text : '创建日期',
				align : 'center',
				dataIndex : 'createDate',
				flex : 1
			}, {
				text : '更新者',
				align : 'center',
				dataIndex : 'updatedBy',
				flex : 1
			}, {
				text : '更新日期',
				align : 'center',
				dataIndex : 'updatedDate',
				flex : 1
			}]
		});
		me.callParent(arguments);
	}
});