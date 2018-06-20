/**
 * 远程服务面板
 */
Ext.define(projectName + '.view.dispatch.parameters.OpLogsListView', {
	extend: 'Ext.panel.Panel',
	requires: [projectName + '.lib.component.PageToolBar'],
	//别名
	alias: 'widget.opLogsList',
	layout: 'border',
	initComponent: function () {
		var me = this;
		var store = Ext.create(projectName +'.store.dispatch.parameters.OpLogsStore');
		Ext.applyIf(me, {
			items: [{
				xtype: 'opLogsGrid', 
				region: 'center',
				store : store
			}],
			dockedItems : [{
				xtype : 'toolbar',
				dock : 'top',
				style : 'background-color: #fff;',
				border : false,
				items : [{
					fieldLabel : '操作员',
					xtype: 'textfield',
					id: 'tf_create_by',
					width: 150,
					labelWidth: 50,
					margin: '0 0 0 5'
				},{
					id: 'tf_date_start',
					xtype : 'datefield',
					fieldLabel : '开始日期',
					width: 150,
					labelWidth: 55,
					format: 'Y-m-d', 
			        selectOnFocus:true, 
			        editable:false
				},{
					id: 'tf_date_end',
					xtype : 'datefield',
					fieldLabel : '截止日期',
					width: 150,
					labelWidth: 55,
					format: 'Y-m-d', 
			        selectOnFocus:true, 
			        editable:false
				},{
					fieldLabel : '日志等级',
					xtype: 'combo',
					id: 'tf_log_level',
					editable:false,
					store:new Ext.data.SimpleStore({
						fields : [ 'value', 'text' ],
						data : [ [ '', '所有' ],[ '一般', '一般' ], [ '警告', '警告' ],[ '紧急', '紧急' ], [ '严重', '严重' ],[ '事故', '事故' ], [ '危险', '危险' ]]
					}),
					displayField:'text',
					valueField:'value',
					width: 120,
					labelWidth: 55,
					margin: '0 0 0 5'
				},{
					xtype: 'button',
					text: '搜索',
					iconCls: 'icon-search',
					id: 'btn_oplogs_search',
					action: 'search',
					margin: '0 0 0 5'
				},{
					xtype: 'button',
					text: '导出',
					iconCls: 'icon-excel',
					id: 'btn_oplogs_export',
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