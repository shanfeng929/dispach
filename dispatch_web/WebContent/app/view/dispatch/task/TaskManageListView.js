/**
 * 任务管理面板
 */
Ext.define(projectName + '.view.dispatch.task.TaskManageListView', {
	extend: 'Ext.panel.Panel',
	//第一个是页面中表头的信息，第二个是导入一个分页的工具类。
	requires: [projectName + '.lib.component.PageToolBar'],
	//别名
	alias: 'widget.taskManageList',
	layout: 'border',
	refresh_task:null,
	initComponent: function () {
		var me = this;
		var store = Ext.create(projectName +'.store.dispatch.task.TaskManageStore');
		Ext.applyIf(me, {
			items: [{
				xtype: 'taskManageGrid', 
				region: 'center',
				store : store,
				id:'taskManageGrid',
				scrollable:true
			}],
			dockedItems : [{
				xtype : 'toolbar',
				dock : 'top',
				style : 'background-color: #fff;',
				border : false,
				items : [{
					fieldLabel : '任务名称',
					xtype: 'textfield',
					id: 'tf_tmlv_name',
					width: 200,
					labelWidth: 50,
					margin: '0 0 0 5'
				},{
					fieldLabel : '所属流程名称',
					xtype: 'textfield',
					id: 'tf_tmlv_flowName',
					width: 200,
					labelWidth: 80,
					margin: '0 0 0 5'
				},{
					xtype: 'button',
					text: '搜索',
					iconCls: 'icon-search',
					id: 'btn_tmlv_search',
					action: 'search',
					margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '修改', 
					iconCls: 'icon-edit',
					id: 'btn_tmlv_edit',
					action: 'edit',
					margin: '0 0 0 5'
				},{
			        xtype: 'button',
					text: '定时刷新', 
					iconCls: 'icon-refresh',
					id: 'btn_tmlv_task_refresh',
					action: 'taskRefresh',
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