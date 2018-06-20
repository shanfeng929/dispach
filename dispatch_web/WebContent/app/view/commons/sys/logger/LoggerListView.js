Ext.define(projectName + '.view.commons.sys.logger.LoggerListView', {
			extend : 'Ext.panel.Panel',
			// 第一个是页面中表头的信息，第二个是导入一个分页的工具类。
			requires : [projectName + '.view.commons.sys.logger.LoggerGridView',
			            projectName + '.lib.component.PageToolBar',
			            projectName + '.lib.component.DictionaryCombox'],
			// 别名
			alias : 'widget.loggerList',
			layout : 'border',
			initComponent : function() {
				var me = this;
				var store = Ext
						.create(projectName + '.store.commons.sys.logger.LoggerStore');
				Ext.applyIf(me, {
							items : [{
										xtype : 'loggerGrid',
										region : 'center',
										store : store,
										id : 'loggerGrid'
									}],
							dockedItems : [{
										xtype : 'toolbar',
										dock : 'top',
										style : 'background-color: #fff;',
										border : false,
										items : [{
													fieldLabel : '操作员',
													xtype : 'textfield',
													id : 'field_operator_logList',
													width : 150,
													labelWidth : 40,
													margin : '0 0 0 5'
												}, {
													xtype : 'dictionaryCombox',
													code : 'rzdj',
													id : 'field_level_logList',
													fieldLabel : '日志等级',
													width : 150,
													allowBlank : false,
													margin : '5 0 5 5',
													labelWidth : 50
												}, {
													fieldLabel : '操作日期',
													xtype : 'datefield',
													format : 'Y-m-d',
													id : 'field_date_logList',
													width : 150,
													labelWidth : 50,
													margin : '0 0 0 5'
												}, {
													xtype : 'button',
													text : '查询',
													iconCls : 'icon-search',
													id : 'btn_search_logList',
													action : 'search',
													margin : '0 0 0 5'
												}]
									}],
							bbar : {
								xtype : 'pagebar',
								store : store
							}
						});
				me.callParent(arguments);
			}
		});