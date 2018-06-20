//参数列表的view
Ext.define(projectName+'.view.dispatch.parameters.parametersGridView',{
	extend: 'Ext.grid.Panel',
	alias:'widget.parametersGrid',
	layout:'fit',
	columnLines:true,
	selModel:Ext.create('Ext.selection.CheckboxModel'),
	initComponent:function () {
		var me = this;
		Ext.applyIf(this,{
			columns:[{
				xtype:'rownumberer',
				text:'序号',
				align:'center',
				width:60
			},{
				text:'para_id',
				dataIndex:'para_id',
				hideable:true,
				hidden:true,
				flex:1
			},{
				text:'参数名称',
				align:'center',
				dataIndex:'para_name',
				flex:1
			},{
				text:'参数中文描述',
				align:'center',
				dataIndex:'para_comment',
				flex:1
			},{
				text:'参数类型',
				align:'center',
				dataIndex:'para_type',
				flex:1
			},{
				text:'参数值',
				align:'center',
				dataIndex:'para_value',
				flex:1
			},{
				text:'static_para',
				align:'center',
				hideable:true,
				hidden:true,
				dataIndex:'static_para',
				flex:1
			},{
				text : '创建者',
				align : 'center',
				dataIndex : 'create_by',
				flex : 1
			}, {
				text : '创建日期',
				align : 'center',
				dataIndex : 'create_date',
				flex : 1
			}, {
				text : '更新者',
				align : 'center',
				dataIndex : 'update_by',
				flex : 1
			}, {
				text : '更新日期',
				align : 'center',
				dataIndex : 'update_date',
				flex : 1
			}]
		});
		me.callParent(arguments);
		}
	}
);
				