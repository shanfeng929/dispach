/**
 * 流程管理面板
 */
Ext.define(projectName + '.view.flow.FlowManageListView', {
	extend: 'Ext.panel.Panel',
	//第一个是页面中表头的信息，第二个是导入一个分页的工具类。
	requires: [projectName + '.lib.component.PageToolBar'],
	//别名
	alias: 'widget.flowManageList',
	layout: 'border',
	refresh_task:null,
	initComponent: function () {
		var me = this;
		var store = Ext.create(projectName +'.store.dispatch.flow.FlowManageStore');
		var combo_store = Ext.create(projectName +'.store.dispatch.flow.FlowGroupComboStore');
		Ext.applyIf(me, {
			items: [{
				xtype: 'flowManageGrid', 
				region: 'center',
				store : store,
				id:'flowManageGrid',
				scrollable:true
			}],
			dockedItems : [{
				xtype : 'toolbar',
				dock : 'top',
				style : 'background-color: #fff;',
				border : false,
				items : [{
					fieldLabel : '任务链名称',
					xtype: 'textfield',
					id: 'tf_fmlv_name',
					width: 200,
					labelWidth: 70,
					margin: '0 0 0 5'
				},{
					id: 'tf_fmlv_flowGroupid',
					fieldLabel : '所属任务链包',
					xtype: 'combo',
					displayField:'flowGroupName',
					valueField : 'id',
					store:combo_store,
					value : '',
					width: 200,
					labelWidth: 80,
					margin: '0 0 0 5'
				},{
					xtype: 'button',
					text: '搜索',
					iconCls: 'icon-search',
					id: 'btn_fmlv_search',
					action: 'search',
					margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '修改', 
					iconCls: 'icon-edit',
					id: 'btn_fmlv_edit',
					action: 'edit',
					margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '删除', 
					iconCls: 'icon-del-p',
					id: 'btn_fmlv_delete',
					action: 'delete',
					margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '导出', 
					iconCls: 'icon-excel',
					id: 'btn_fmlv_export',
					action: 'export',
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