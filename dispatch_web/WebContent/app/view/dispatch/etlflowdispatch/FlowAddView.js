Ext.define(projectName + '.view.dispatch.etlflowdispatch.FlowAddView', {
	extend : 'Ext.window.Window',
	alias : 'widget.flowAddView',
//	requires : ['Ext.ux.form.ItemSelector'],
	// id:'dispatch.shellAddView',
	title : '任务链配置',
	width : 400,
	height : 520,
	closable : false,
	labelAlign : "right",
	modal : true, // 是否为模态窗口
	defaults : {
		defaults : {
			defaults : {
				margin : '5 5 5 10',
				fieldStyle : 'background-color: #DFE9F6;background-image: none;'
			}
		}
	},
	bodyStyle : 'padding:15px',
	resizable : true,
	initComponent : function() {
		var me = this;
		var store = Ext.create(projectName+ '.store.dispatch.etlflowdispatch.EtlFlowDispatchStore');
		store.load();
		Ext.applyIf(me, {
//			items : [{
//				xtype : "tabpanel",
//				// 初始显示第几个Tab页
//				activeTab : 0,
//				plain : true,
//				height : 490,
//				defaultType : "panel",
//				bodyStyle : "padding:2px;",
//				// 当Tab标签过多时,出现滚动条
//				enableTabScroll : true,
				items : [{
//					基本属性窗口
					xtype : 'form',
					region : 'center',
					id : projectName+ '.view.dispatch.etlflowdispatch.flowAddView.flowDeployForm',
					height : 465,
					fieldDefaults : {
						labelAlign : 'left',
						msgTarget : 'side'
					},
					items : [{
						xtype : 'container',
						defaultType : 'textfield',
						items : [{
							xtype : 'container',
//							autoScroll : true,
							layout : {
								type : 'table',
								columns : 1
							},
							defaultType : 'textfield',
							items : [{
								xtype : 'textfield',
								hidden : true,
								hideLabel : true,
								name : 'branch',
								id : projectName+ '.view.dispatch.etlflowdispatch.flowAddView.branch'
							}, {
								layout : 'vbox',
								xtype : 'fieldset',
								autoHeight : true,
								defaultType : 'textfield',
								width : 340,
								title : '任务链描述',
								items : [{
									xtype : 'textfield',
									name : 'flowName',
									fieldLabel : '任务链名称<font color="red">*</font>',
									id : projectName+ '.view.dispatch.etlflowdispatch.flowAddView.flowName',
									allowBlank : false,
									labelWidth : 90,width : 300,/*heigh : 200,*/
									margin : '10 0 0 10'
								},/*{
									xtype : 'textfield',
									name : 'flowCnName',
									fieldLabel : '流程中文名称<font color="red">*</font>',
									id : projectName
											+ '.view.dispatch.etlflowdispatch.flowAddView.flowCnName',
									allowBlank : false,
									labelWidth : 90,
									width : 300,
									heigh : 200,
									margin : '10 0 0 10'
								},*/ {
									xtype : 'combo',
									name : 'flowGroup',
									fieldLabel : '任务链包<font color="red">*</font>',
									id : projectName+ '.view.dispatch.etlflowdispatch.flowAddView.flowGroup',
									editable:false,
									labelWidth : 90,width : 300,/*heigh : 200,*/
									displayField : 'flowGroupName',
									valueField : 'id',
									typeAhead : false,
									allowBlank : false,
									triggerAction : 'all',
									minChars : 1,
									selectOnFocus : true,
									store : store,
									margin : '10 0 0 10'
									/*listeners : {
										change : function(combo, record, index) {
											Ext.apply(store.proxy.extraParams,{
												reMote : Ext.getCmp(projectName+ '.view.dispatch.etlflowdispatch.flowAddView.flowGroup').getValue()
											});
											store.load();
										},
										expand : function(combo, record, index) {
											Ext.apply(store.proxy.extraParams,{
												reMote : Ext.getCmp(projectName+ '.view.dispatch.etlflowdispatch.flowAddView.flowGroup').getValue()
											});
											store.load();
										}
									},*/
								}, {
									xtype : 'textarea',
									name : 'flowDesc',
									fieldLabel : '任务链备注',
									id : projectName+ '.view.dispatch.etlflowdispatch.flowAddView.flowDesc',
									labelWidth : 90,width : 300,/*heigh : 100,*/
									margin : '10 0 10 10'
								}]
							}, {
								xtype : 'displayfield',
								value : '<hr width=340,height:1/>'
							}, {
								layout : 'vbox',
								xtype : 'fieldset',
								autoHeight : true,
								defaultType : 'textfield',
								title : '任务链执行属性',
								width : 340,
								items : [{
									xtype : 'combo',
									name : 'creator',
									id : projectName+ '.view.dispatch.etlflowdispatch.flowAddView.creator',
									editable : false,
									allowBlank : false,
									store : new Ext.data.SimpleStore({
										fields : ['value', 'text'],
										data : [['1', '定时'],['0', '人工']]
									}),
									value : '定时',
									displayField : 'text',
									valueField : 'value',
									typeAhead : true,
									mode : "local",
									triggerAction : 'all',
									fieldLabel : '人工或定时<font color=red>*</font>',
									labelWidth : 90,width : 300,
									margin : '10 0 0 10',
									listeners : {
										change : function(combo, record, index) {
											var creator = Ext.getCmp(projectName+ '.view.dispatch.etlflowdispatch.flowAddView.creator').getValue();
//											var nextStartExt = Ext.getCmp(projectName+ '.view.dispatch.etlflowdispatch.flowAddView.nextStart');
											var nextStartUnitExt = Ext.getCmp(projectName+'.view.dispatch.etlflowdispatch.flowAddView.nextStartUnit');
											var workDate1 = Ext.getCmp(projectName+ '.view.dispatch.etlflowdispatch.flowAddView.workDate');
											var startTime1 = Ext.getCmp(projectName+'.view.dispatch.etlflowdispatch.flowAddView.startTime');
											var flag = null;
											if (creator == '0'||creator == '人工') {
												flag = true;
												/*nextStartExt.hide();
												nextStartUnitExt.hide();
												workDate1.hide();
												startTime1.hide();*/
											} else {
												flag = false;
												/*nextStartExt.show();
												nextStartUnitExt.show();
												workDate1.show();
												startTime1.show();*/
											}
//											nextStartExt.setDisabled(flag);
											nextStartUnitExt.setDisabled(flag);
											workDate1.setDisabled(flag);
											startTime1.setDisabled(flag); // 需要修改
										}
									}
								}, {
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'workDate',
									fieldLabel : '开始日期<font color=red>*</font>',
									id : projectName+'.view.dispatch.etlflowdispatch.flowAddView.workDate',
									allowBlank : false,
									labelWidth : 90,width : 300,
									margin : '10 0 0 10'
								}, {
									xtype : 'timefield',
									name : 'startTime',
									fieldLabel : '开始时间<font color=red>*</font>',
									id : projectName+ '.view.dispatch.etlflowdispatch.flowAddView.startTime',
									allowBlank : false,
									increment : 10,
									format : 'H:i:s',
									anchor : '100%',
									labelWidth : 90,width : 300,
									margin : '10 0 0 10'
								},/* {
									xtype : 'numberfield',
									name : 'NextStart',
									fieldLabel : '执行时间间隔<font color=red>*</font>',
									id : projectName+ '.view.dispatch.etlflowdispatch.flowAddView.nextStart',
									allowBlank : false,
									allowDecimals : false, // 不允许小数点
									minValue : 0, // 不允许负数
									labelWidth : 90,width : 300,heigh : 200,
									margin : '10 0 0 10'
								}, */{
									xtype : 'combo',
									name : 'nextStartUnit',
									id : projectName+ '.view.dispatch.etlflowdispatch.flowAddView.nextStartUnit',
									fieldLabel : '执行周期<font color=red>*</font>',
									editable : false,
									allowBlank : false,
									store : new Ext.data.SimpleStore({
										fields : ['value', 'text'],
//										data : [['Hours', 'Hours'],['Day', 'Day'],['Week', 'Week'],['Month', 'Month'],['Year', 'Year']]
//										data : [ [ 'DAY', '日' ], ['WEEK', '周' ], [ 'MONTH', '月' ],['SEASON','季'],['YEAR','年']]
										data : DISPATCH.lib.Constants.TASK_CYCLE_TYPE
									}),
									value : '',
									typeAhead : true,
									mode : "local",
									triggerAction : 'all',
									displayField:'text',
									valueField:'value',
									labelWidth : 90,width : 300,
									margin : '10 0 10 10',
									listeners : {
										change : function(combo, record, index,event) {
//											debugger;
											if(record=="WEEK")
												Ext.getCmp(projectName+ '.view.dispatch.etlflowdispatch.flowAddView.dayOfWeek').show();
											else
												Ext.getCmp(projectName+ '.view.dispatch.etlflowdispatch.flowAddView.dayOfWeek').hide();
										}
									}
								}, {
									xtype : 'combo',
									name : 'dayOfWeek',
									id : projectName+ '.view.dispatch.etlflowdispatch.flowAddView.dayOfWeek',
									fieldLabel : '每周<font color=red>*</font>',
									hidden:true,
//									disabled : true,
									editable : false,
									allowBlank : false,
									store : new Ext.data.SimpleStore({
										fields : ['value', 'text'],
										data : DISPATCH.lib.Constants.TASK_CYCLE_WEEK
									}),
									value : '周一',
									typeAhead : true,
									mode : "local",
									triggerAction : 'all',
									displayField:'text',
									valueField:'value',
									labelWidth : 90,width : 300,
									margin : '0 0 10 10'/*,
									renderer:function(){
										debugger;
										var creator = Ext.getCmp(projectName+ '.view.dispatch.etlflowdispatch.flowAddView.creator').getValue();
										if (creator == '0'||creator == '人工') {
											me.setDisabled(true);
										} else {
											me.setDisabled(false);
										}
									}*/
								}]
							}]
						}]
//					}]
				}],
				buttons : [{
					height : 25,
					text : '保存',
					action : 'save',
					id : 'dispatch_flow_save'
				}, {
					height : 25,
					text : '退出',
					handler : function() {
						me.close();
						parent.remove();
					}
				}]
			}]
		});
		me.callParent(arguments);
	}
});