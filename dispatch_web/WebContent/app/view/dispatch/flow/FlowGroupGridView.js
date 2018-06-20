Ext.define(projectName + '.view.dispatch.flow.FlowGroupGridView', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.flowGroupGrid',
	layout : 'fit',
	columnLines : true,
	selModel : Ext.create('Ext.selection.CheckboxModel'),
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
				text : '流程分组名称',
				align : 'center',
				dataIndex : 'flowGroupName',
				flex : 1
			}, {
				text : '流程分组备注',
				align : 'center',
				dataIndex : 'flowGroupDesc',
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