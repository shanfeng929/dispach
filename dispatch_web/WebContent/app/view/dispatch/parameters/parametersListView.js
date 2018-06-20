/**
 *参数配置面板
 */
Ext.define(projectName +'.view.dispatch.parameters.parametersListView',{
	extend:'Ext.panel.Panel',
	requires:[projectName +'.view.dispatch.parameters.parametersGridView',projectName +'.lib.component.PageToolBar'],
	alias:'widget.parametersList',
	layout:'border',
	initComponent: function (){
		var me = this;
		var store=Ext.create(projectName +'.store.dispatch.parameters.ParametersStore');
		Ext.applyIf(me,{
			items:[{
				xtype:'parametersGrid',
				region:'center',
				store:store,
				id:'parametersGrid'
			}],
			dockedItems:[{
				xtype :'toolbar',
				dock :'top',
				style :'background-color:#fff;',
				border :false, 
				items :[{
				  xtype:'textfield',   //输入框
					fieldLabel :'参数名或描述',
					id:'p_search_name',
					width:200,
					labelWidth:80,
					margin: '0 0 0 5'
					},{
						xtype: 'button',
						text: '搜索',
						iconCls:'icon-search',
						id:'btn_para_search',
						action:'search',
						margin: '0 0 0 5'
					},{
						xtype: 'button',
						text:'添加',
						iconCls: 'icon-add-p',
						id: 'btn_para_add',
						action: 'add',
						margin: '0 0 0 5'
					},{
			        xtype: 'button',
					text: '修改', 
					iconCls: 'icon-edit',
					id: 'btn_para_edit',
					action: 'edit',
					margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '删除', 
					iconCls: 'icon-del-p',
					id: 'btn_para_delete',
					action: 'delete',
					margin: '0 0 0 5'
				}]
				}],
				bbar: {
					id:'parameters_list_view_bbar',
					xtype: 'pagebar',
					store: store
					}
			});
			me.callParent(arguments);
	}
}
)