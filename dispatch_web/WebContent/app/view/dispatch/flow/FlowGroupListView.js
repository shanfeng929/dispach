/**
 * 流程组管理面板
 */
Ext.define(projectName + '.view.flow.FlowGroupListView', {
	extend: 'Ext.panel.Panel',
	//第一个是页面中表头的信息，第二个是导入一个分页的工具类。
	requires: [projectName + '.lib.component.PageToolBar'],
	//别名
	alias: 'widget.flowGroupList',
	layout: 'border',
	initComponent: function () {
		var me = this;
		var store = Ext.create(projectName +'.store.dispatch.flow.FlowGroupStore');
		Ext.applyIf(me, {
			items: [{
				xtype: 'flowGroupGrid', 
				region: 'center',
				store : store,
				id:'flowGroupGrid'
			}],
			dockedItems : [{
				xtype : 'toolbar',
				dock : 'top',
				style : 'background-color: #fff;',
				border : false,
				items : [{
					fieldLabel : '流程组名称',
					xtype: 'textfield',
					id: 'tf_fglv_name',
					width: 200,
					labelWidth: 60,
					margin: '0 0 0 5'
				},{
					xtype: 'button',
					text: '搜索',
					iconCls: 'icon-search',
					id: 'btn_fglv_search',
					action: 'search',
					margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '增加', 
					iconCls: 'icon-add-p',
					id: 'btn_fglv_add',
					action: 'add',
					margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '修改', 
					iconCls: 'icon-edit',
					id: 'btn_fglv_edit',
					action: 'edit',
					margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '删除', 
					iconCls: 'icon-del-p',
					id: 'btn_fglv_delete',
					action: 'delete',
					margin: '0 0 0 5'
				}]
			}],
			bbar: {
				xtype: 'pagebar',
				store: store
			}
		});
		me.callParent(arguments);
	}
});