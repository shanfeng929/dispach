Ext.define(projectName + '.view.commons.sys.role.RoleGridView', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.roleGrid',
	layout : 'fit',
	columnLines : true,
	initComponent : function() {
		var me = this;
		Ext.applyIf(this, {
			selModel : Ext.create('Ext.selection.CheckboxModel'),
			columns : [ {
				xtype : 'rownumberer',
				text : '序号',
				align : 'center',
				width : 50
			}, {
				text : '名称',
				width : 150,
				align : 'center',
				dataIndex : 'name',
				flex : 1
			}, {
				text : '描述',
				width : 150,
				align : 'center',
				dataIndex : 'description',
				flex : 1
			}, {
				text : '状态',
				align : 'center',
				dataIndex : 'dataStatus',
				flex : 1,
				renderer : function(r) {
					return r == 4 ? "不可用" : "可用";
				}
			}, {
				text : '创建人',
				width : 150,
				align : 'center',
				dataIndex : 'creatorName',
				flex : 1
			}, {
				text : '创建时间',
				width : 150,
				align : 'center',
				dataIndex : 'dateCreated',
				flex : 1
			}, {
				text : '修改人',
				width : 150,
				align : 'center',
				dataIndex : 'modifierName',
				flex : 1
			}, {
				text : '修改时间',
				width : 150,
				align : 'center',
				dataIndex : 'dateUpdated',
				flex : 1
			} ]

		});
		me.callParent(arguments);
	}
});