/**
 * 远程服务面板
 */
Ext.define(projectName + '.view.remoteservice.RemoteserviceListView', {
	extend: 'Ext.panel.Panel',
	//第一个是页面中表头的信息，第二个是导入一个分页的工具类。
	requires: [projectName + '.lib.component.PageToolBar'],
	//别名
	alias: 'widget.remoteserviceList',
	layout: 'border',
	initComponent: function () {
		var me = this;
		var store = Ext.create(projectName +'.store.dispatch.remoteservice.RemoteServiceStore');
		Ext.applyIf(me, {
			items: [{
				xtype: 'remoteserviceGrid', 
				region: 'center',
				store : store,
				id:'remoteserviceGrid'
			}],
			dockedItems : [{
				xtype : 'toolbar',
				dock : 'top',
				style : 'background-color: #fff;',
				border : false,
				items : [{
					fieldLabel : '远程连接名称',
					xtype: 'textfield',
					id: 'tf_rlv_name',
					width: 200,
					labelWidth: 70,
					margin: '0 0 0 5'
				}, {
					fieldLabel : '远程连接IP',
					xtype : 'textfield',
					id : 'tf_rlv_remoteIp',
					width: 200,
					labelWidth: 70,
					margin: '0 0 0 5'
				}, {
					xtype: 'button',
					text: '搜索',
					iconCls: 'icon-search',
					id: 'btn_rlv_search',
					action: 'search',
					margin: '0 0 0 5'
				},{
				        xtype: 'button',
						text: '添加', 
						iconCls: 'icon-add-p',
						id: 'btn_rlv_add',
						action: 'add',
						margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '修改', 
					iconCls: 'icon-edit',
					id: 'btn_rlv_edit',
					action: 'edit',
					margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '删除', 
					iconCls: 'icon-del-p',
					id: 'btn_rlv_delete',
					action: 'delete',
					margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '测试', 
					iconCls: 'icon-yes',
					id: 'btn_rlv_test',
					action: 'test',
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