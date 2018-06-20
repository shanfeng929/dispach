Ext.define(projectName + '.view.dispatch.template.TemplateManageGridView', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.templateManageGrid',
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
				hidden : true
			}, {
				text : '组件名称',
				align : 'center',
				dataIndex : 'templateName',
				width : 120
			},/* {
				text : '组件描述',
				align : 'center',
				dataIndex : 'templateDesc',
				flex : 1
			}, {
				text : '组件远程服务IP',
				align : 'center',
				dataIndex : 'templateRemote',
				flex : 1
			}, {
				text : '组件命令(执行语句)',
				align : 'center',
				dataIndex : 'templateCommand',
				flex : 1
			}, {
				text : '组件参数',
				align : 'center',
				dataIndex : 'templateParameter',
				flex : 1
			}, {
				text : '容错次数',
				align : 'center',
				dataIndex : 'errorNum',
				flex : 1
			}, {
				text : '是否容错',
				align : 'center',
				dataIndex : 'templateError',
				flex : 1
			}, {
				text : '是否有效',
				align : 'center',
				dataIndex : 'templateActive',
				flex : 1
			}, {
				text : '自定义条件',
				align : 'center',
				dataIndex : 'templateCustom',
				flex : 1
			}, {
				text : '是否是分支',
				align : 'center',
				dataIndex : 'templateBranch',
				flex : 1
			}, {
				text : '循环次数',
				align : 'center',
				dataIndex : 'templateLoop',
				flex : 1
			},*/ {
				text : '组件参数详情',
				align : 'center',
				dataIndex : 'paramsVal',
				width : 1015
			}]
		});
		me.callParent(arguments);
	}
});