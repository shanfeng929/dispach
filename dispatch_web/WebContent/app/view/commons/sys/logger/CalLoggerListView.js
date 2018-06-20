Ext.define(projectName +'.view.commons.sys.logger.CalLoggerListView', {
			extend : 'Ext.panel.Panel',
			// 第一个是页面中表头的信息，第二个是导入一个分页的工具类。
			requires : [projectName +'.view.commons.sys.logger.CalLoggerGridView',
			            projectName +'.lib.component.PageToolBar',
			            projectName + '.lib.component.DictionaryCombox'],
			// 别名
			alias : 'widget.calLoggerList',
			layout : 'border',
			initComponent : function() {
				var me = this;
				var store = Ext.create(projectName + '.store.commons.sys.logger.CalLoggerStore');
				Ext.applyIf(me, {
							items : [{
										xtype : 'calLoggerGrid',
										region : 'center',
										store : store,
										id : 'calLoggerGrid'
									}],
							dockedItems : [{
										xtype : 'toolbar',
										dock : 'top',
										style : 'background-color: #fff;',
										border : false,
										items : [{
													fieldLabel : '操作员',
													xtype : 'textfield',
													id : 'field_cllv_operator',
													width : 150,
													labelWidth : 40,
													margin : '0 0 0 5'
												}, {
													fieldLabel : '开始时间',
													xtype : 'datefield',
													format : 'Y-m-d',
													id : 'field_cllv_startTime',
													labelWidth : 50,
													width : 150,
													allowBlank : true,
													margin : '5 0 5 5'
													
												}, {
													fieldLabel : '结束时间',
													xtype : 'datefield',
													format : 'Y-m-d',
													id : 'field_cllv_endTime',
													labelWidth : 50,
													width : 150,
													allowBlank : true,
													margin : '0 0 0 5'
												}, {
													xtype : 'button',
													text : '查询',
													iconCls : 'search',
													id : 'btn_cllv_search',
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