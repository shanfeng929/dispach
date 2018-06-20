/**
 * 远程服务面板
 */
Ext.define(projectName + '.view.dispatch.parameters.DataSourceListView', {
	extend: 'Ext.panel.Panel',
	requires: [projectName + '.lib.component.PageToolBar'],
	//别名
	alias: 'widget.dataSourceList',
	layout: 'border',
	initComponent: function () {
		var me = this;
		var store = Ext.create(projectName +'.store.dispatch.parameters.DataSourceStore');
		Ext.applyIf(me, {
			items: [{
				xtype: 'dataSourceGrid', 
				region: 'center',
				store : store
//				,
//				id:'remoteserviceGrid'
			}],
			dockedItems : [{
				xtype : 'toolbar',
				dock : 'top',
				style : 'background-color: #fff;',
				border : false,
				items : [{
					fieldLabel : '数据源名称',
					xtype: 'textfield',
					id: 'tf_db_name',
					width: 200,
					labelWidth: 70,
					margin: '0 0 0 5'
				},{
					xtype: 'button',
					text: '搜索',
					iconCls: 'icon-search',
					id: 'btn_db_search',
					action: 'search',
					margin: '0 0 0 5'
				},{
				        xtype: 'button',
						text: '添加', 
						iconCls: 'icon-add-p',
						id: 'btn_db_add',
						action: 'add',
						margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '修改', 
					iconCls: 'icon-edit',
					id: 'btn_db_edit',
					action: 'edit',
					margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '删除', 
					iconCls: 'icon-del-p',
					id: 'btn_db_delete',
					action: 'delete',
					margin: '0 0 0 5'
				}/*,{
			        xtype: 'button',
					text: '测试', 
					iconCls: 'icon-yes',
					id: 'btn_rlv_test',
					action: 'test',
					margin: '0 0 0 5'
				}*/]
			}],
			bbar: {
				xtype: 'pagebar',
				store: store
			}
		});
		me.callParent(arguments);
	}
});