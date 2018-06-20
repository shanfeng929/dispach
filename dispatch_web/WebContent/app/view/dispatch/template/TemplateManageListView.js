/**
 * 组件管理面板
 */
Ext.define(projectName + '.view.template.TemplateManageListView', {
	extend: 'Ext.panel.Panel',
	requires: [projectName + '.lib.component.PageToolBar'],
	//别名
	alias: 'widget.templateManageList',
	layout: 'border',
	initComponent: function () {
		var me = this;
		var store = Ext.create(projectName +'.store.dispatch.etldispatch.TemplateManageStore');
		Ext.applyIf(me, {
			items: [{
				xtype: 'templateManageGrid', 
				region: 'center',
				store : store,
				id:'templateManageGrid'
			}],
			dockedItems : [{
				xtype : 'toolbar',
				dock : 'top',
				style : 'background-color: #fff;',
				border : false,
				items : [{
					fieldLabel : '组件名称',
					xtype: 'textfield',
					id: 'tf_tpmlv_name',
					width: 200,
					labelWidth: 50,
					margin: '0 0 0 5'
				},{
					xtype: 'button',
					text: '搜索',
					iconCls: 'icon-search',
					id: 'btn_tpmlv_search',
					action: 'search',
					margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '新增', 
					iconCls: 'icon-add-p',
					id: 'btn_tpmlv_add',
					action: 'add',
					margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '修改', 
					iconCls: 'icon-edit',
					id: 'btn_tpmlv_edit',
					action: 'edit',
					margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '删除', 
					iconCls: 'icon-del-p',
					id: 'btn_tpmlv_delete',
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