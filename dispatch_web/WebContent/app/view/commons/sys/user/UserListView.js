/**
 * user main panel
 */
Ext.define(projectName + '.view.commons.sys.user.UserListView', {
	extend: 'Ext.panel.Panel',
	//第一个是页面中表头的信息，第二个是导入一个分页的工具类。
	requires: [projectName + '.view.commons.sys.user.UserGridView', projectName + '.lib.component.PageToolBar'],
	//别名
	alias: 'widget.userList',
	layout: 'border',
	initComponent: function () {
		var me = this;
		var store = Ext.create(projectName + '.store.commons.sys.user.UserStore');
		Ext.applyIf(me, {
			items: [{
				xtype: 'userGrid', 
				region: 'center',
				store : store,
				id:'userGrid'
				}],
				dockedItems : [{
					xtype : 'toolbar',
					dock : 'top',
					style : 'background-color: #fff;',
					border : false,
					items : [{
					fieldLabel : '登录名',
					xtype: 'textfield',
					id: 'tf_ulv_loginName',
					width: 200,
					labelWidth: 40,
					margin: '0 0 0 5'
				}, {
					xtype : 'hiddenfield',
					id : 'hf_ulv_searchOrgan',
					hidden : true 
				},{
					xtype : 'hiddenfield',
					id : 'hf_ulv_searchOrganPath',
					hidden : true 
				},{
					xtype: 'button',
					text: '搜索',
					iconCls: 'icon-search',
					id: 'btn_ulv_search',
					action: 'search',
					margin: '0 0 0 5'
			},{
			        xtype: 'button',
					text: '添加', 
					iconCls: 'icon-add-p',
					id: 'btn_ulv_add',
					action: 'add',
					margin: '0 0 0 5'
			},{
		        xtype: 'button',
				text: '修改', 
				iconCls: 'icon-edit',
				id: 'btn_ulv_edit',
				action: 'edit',
				margin: '0 0 0 5'
			},{
		        xtype: 'button',
				text: '删除', 
				iconCls: 'icon-del-p',
				id: 'btn_ulv_delete',
				action: 'delete',
				margin: '0 0 0 5'
			},{
		        xtype: 'button',
				text: '重置密码', 
				iconCls: 'icon-reset',
				id: 'btn_ulv_reset',
				action: 'reset',
				margin: '0 0 0 5'
			},{
		        xtype: 'button',
				text: '禁用用户', 
				iconCls: 'icon-cancel',
				id: 'btn_ulv_disable',
				action: 'disable',
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