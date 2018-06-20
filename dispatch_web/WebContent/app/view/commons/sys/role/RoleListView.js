Ext.define(projectName + '.view.commons.sys.roles.RoleListView', {
	extend: 'Ext.panel.Panel',
	//第一个是页面中表头的信息，第二个是导入一个分页的工具类。
	requires: [projectName + '.view.commons.sys.role.RoleGridView',projectName + '.lib.component.PageToolBar'],
	//别名
	alias: 'widget.roleList',
	layout: 'border',
	initComponent: function () {
		var me = this;
		var store=Ext.create(projectName + '.store.commons.sys.roles.RoleStores');
		Ext.applyIf(me, {
			items: [{
				xtype: 'roleGrid', 
				region: 'center',
				store:store,
				id:'roleGrid'
				}],
				dockedItems : [{
					xtype : 'toolbar',
					dock : 'top',
					style : 'background-color: #fff;',
					border : false,
					items : [{
					fieldLabel : '名称',
					xtype: 'textfield',
					id: 'tf_ulv_Name',
					width: 200,
					labelWidth: 40,
					margin: '0 0 0 5'
				}/*, {
					xtype : 'hiddenfield',
					id : 'hf_ulv_searchOrgan',
					hidden : true 
				},{
					xtype : 'hiddenfield',
					id : 'hf_ulv_searchOrganPath',
					hidden : true 
				}*/,{
					xtype: 'button',
					text: '搜索',
					iconCls: 'icon-search',
					id: 'btn_ulv_search11',
					action: 'searchRole',
					margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '添加', 
					iconCls: 'icon-add-p',
					action: 'addRole',
					margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '修改', 
					iconCls: 'icon-edit',
					action: 'editRole',
					margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '删除', 
					iconCls: 'icon-del-p',
					action: 'deleteRole',
					margin: '0 0 0 5'}]
				}],
				bbar: {
					xtype: 'pagebar',
					store:store
					}
		});
		me.callParent(arguments);
		}
});