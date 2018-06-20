/**
 * 任务链监控管理面板
 */
Ext.define(projectName + '.view.flow.FlowMonitorListView', {
	extend: 'Ext.tab.Panel',
	//第一个是页面中表头的信息，第二个是导入一个分页的工具类。
//	requires: [projectName + '.lib.component.PageToolBar'],
	requires: ['Ext.tab.*',
	           'Ext.ux.TabCloseMenu',
	           projectName + '.lib.component.PageToolBar'],
	//别名
	alias: 'widget.flowMonitorList',
//	layout: 'border',
	activeTab: 0,
	refresh_task:null,
	initComponent: function () {
		var me = this;
		
		var groupTreeStore_d = Ext.create('Ext.data.TreeStore',{
			model: projectName +'.model.dispatch.flow.GroupTreeModel',
		    proxy : {
				type : 'ajax',
				url: basePath + '/dispatch/flowGroup/showGroupTree',
				reader : 'json'
			}
		});
		groupTreeStore_d.proxy.extraParams={
			'parentId' : '0'
		};
		var groupTreeStore = Ext.create('Ext.data.TreeStore',{
			model: projectName +'.model.dispatch.flow.GroupTreeModel',
		    proxy : {
				type : 'ajax',
				url: basePath + '/dispatch/flowGroup/showGroupTree',
				reader : 'json'
			}
		});
		groupTreeStore.proxy.extraParams={
			'parentId' : '0'
		};
//		var combo_store = Ext.create(projectName +'.store.dispatch.flow.FlowGroupComboStore');
//		combo_store.load();
		var monitor_store = Ext.create(projectName +'.store.dispatch.flow.FlowMonitorStore');
		monitor_store.proxy.extraParams = {
				'flowName':'',
				'flowGroupid' : ''
		};
		monitor_store.load();
		var history_store = Ext.create(projectName +'.store.dispatch.flow.FlowHistoryStore');
		history_store.proxy.extraParams = {
				'flowName':'',
				'flowGroupid' : ''
		};
		history_store.load();
		Ext.applyIf(me, {
			items: [{
				xtype: 'flowMonitorGrid',
				title:'运行中任务链',
//				id:'flowMonitorGrid',
				region: 'center',
				store : monitor_store,
				scrollable:true,
				closable:false,
				bbar: {
					xtype: 'pagebar',
					store: monitor_store
				},
				dockedItems : [{
					xtype : 'toolbar',
					dock : 'top',
					style : 'background-color: #fff;',
					border : false,
					items : [{
						fieldLabel : '任务链名称',
						xtype: 'textfield',
						id: 'flowMonitorGrid_name',
						width: 200,
						labelWidth: 60,
						margin: '0 0 0 5'
					},{
						id: 'flowMonitorGrid_flowGroupid',
						fieldLabel : '所属任务链包',
//						xtype: 'combo',
						xtype: 'mutipletreecombo',
//						editable:false,
						mutiSelect:true,
						triggerAction:'all',
						valueCode: 'id',
					    textCode: 'text',
						displayField:'text',
//						valueField : 'id',
						store:groupTreeStore_d,
						value : '',
						width: 200,
						labelWidth: 75,
						margin: '0 0 0 5'
					},{
						xtype: 'button',
						text: '搜索',
						iconCls: 'icon-search',
						action: 'search',
						margin: '0 0 0 5'
					}]
				}]
			},{
				xtype: 'flowHistoryGrid',
				title:'历史任务链查询',
				region: 'center',
				store : history_store,
//				id:'flowHistoryGrid',
				scrollable:true,
				closable:false,
				bbar: {
					xtype: 'pagebar',
					store: history_store
				},
				dockedItems : [{
					xtype : 'toolbar',
					dock : 'top',
					style : 'background-color: #fff;',
					border : false,
					items : [{
						fieldLabel : '任务链名称',
						xtype: 'textfield',
						id: 'flowHistoryGrid_name',
						width: 210,
						labelWidth: 75,
						margin: '0 0 0 5'
					},{
						id: 'flowHistoryGrid_flowGroupid',
						fieldLabel : '所属任务链包',
//						xtype: 'combo',
						xtype: 'mutipletreecombo',
//						editable:false,
						mutiSelect:true,
						triggerAction:'all',
						valueCode: 'id',
					    textCode: 'text',
						displayField:'text',
//						valueField : 'id',
						store:groupTreeStore,
						value : '',
						width: 220,
						labelWidth: 80,
						margin: '0 0 0 5'
					},{
						id: 'flowHistoryGrid_startDate',
						xtype : 'datefield',
						format : 'Y-m-d',
						fieldLabel : '开始日期',
						width: 200,
						labelWidth: 60,
						margin: '0 0 0 5'
					},{
						id: 'flowHistoryGrid_endDate',
						xtype : 'datefield',
						format : 'Y-m-d',
						fieldLabel : '截止日期',
						width: 200,
						labelWidth: 60,
						margin: '0 0 0 5'
					},{
						xtype: 'button',
						text: '搜索',
						iconCls: 'icon-search',
						action: 'search',
						margin: '0 0 0 5'
					},{
						xtype: 'button',
						text: '导出',
						iconCls: 'icon-excel',
						action: 'export',
						margin: '0 0 0 5'
					}]
				}]
			}]
		});
		me.callParent(arguments);
	}
});