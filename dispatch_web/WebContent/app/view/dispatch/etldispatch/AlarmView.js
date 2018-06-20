Ext.define(projectName + '.view.dispatch.etldispatch.AlarmView', {
	extend : 'Ext.window.Window',
	alias : 'widget.alarmView',
//	requires : ['Ext.ux.form.ItemSelector'],
	title : '预警内容任务配置',
	width : 570,
	height : 550,
	labelAlign : "right",
	modal : true, // 是否为模态窗口
	defaults : {
		margin : '5 5 5 10',
		fieldStyle : 'background-color: #DFE9F6;background-image: none;'
	},
	bodyStyle : 'padding:5px',
	resizable : false,
	localStore : '[]',
	initComponent : function() {
		var me = this;
		var sourceStore = Ext.create('Ext.data.Store', {
					autoLoad : true,
					fields : ['dbId', 'dbName', 'driverName', 'dbUrl',
							'userName', 'password'],
					proxy : {
						type : 'ajax',
						url : basePath + '/datasource/query',
						extraParams : {
							page : 1,
							limit : 25,
							start : 0,
							dbName : ''
						},
						reader : {
							type : 'json',
							root : 'pageItems.items',
							totalProperty : 'pageItems.total'
						}
					}
				});
		Ext.applyIf(me, {
			items : [{
				xtype : "tabpanel",
				// 初始显示第几个Tab页
				activeTab : 0,
				plain : true,
				height : 500,
				defaultType : "panel",
				bodyStyle : "padding:5px;",
				// 当Tab标签过多时,出现滚动条
				enableTabScroll : true,
				items : [{
					title : '基本属性',
					xtype : 'form',
					region : 'center',
					id : projectName
							+ '.view.dispatch.etldispatch.AlarmView.alarmForm',
					fieldDefaults : {
						labelAlign : 'left',
						msgTarget : 'side'
					},
					layout : {
						type : 'table',
						columns : 1
					},
					items : [{
						xtype : 'container',
						height : 500,
						autoScroll : true,
						// layout : {type : 'table', columns : 2},
						defaultType : 'textfield',
						margin : '5 5 5 5',
						items : [{
							xtype : 'fieldset',
							autoHeight : true,
							defaultType : 'textfield',
							width : 500,
							title : '任务描述',
							colspan : 1,
							layout : {
								type : 'table',
								columns : 2
							},
							items : [{
								xtype : 'textfield',
								name : 'TaskName',
								fieldLabel : '任务名称<font color="red">*</font>',
								id : projectName+ '.view.dispatch.etldispatch.AlarmView.taskName',
								colspan : 1,
								allowBlank : false,
								labelWidth : 60,
								width : 220,
								// heigh:200,
								margin : '5 5 10 5',
								value : me.record.TASK_NAME
							}, {
								xtype : 'combo',
								name : 'taskType',
								fieldLabel : '模型类型<font color="red">*</font>',
								id : projectName+ '.view.dispatch.etldispatch.AlarmView.taskType',
								allowBlank : false,
								editable : false,
								store : new Ext.data.SimpleStore({
									fields : ['value','text'],
									data : [
								        [7,'单个模型'], 
								        [8,'单个主题内模型'],
										[9,'选择多个模型']
									]
								}),
								typeAhead : true,
								mode : "local",
								triggerAction : 'all',
								displayField:'text',
								valueField:'value',
								colspan : 1,
								labelWidth : 60,width : 220,
								margin : '5 0 10 10',
								listeners : {
									select : function() {
										var selectButton1 = Ext.getCmp('CallAlarmSelect');
										var selectButton2 = Ext.getCmp('CallTitleSelect');
										var selectButton3 = Ext.getCmp('CallMultiSelect');
										var AlarmIdField = Ext.getCmp(projectName+ '.view.dispatch.etldispatch.AlarmView.modelCode');
										var AlarmNameField = Ext.getCmp(projectName+ '.view.dispatch.etldispatch.AlarmView.modelName');
										if (this.getValue() == /*'单个模型'*/'7') {
											selectButton1.setDisabled(false);
											selectButton2.setDisabled(true);
											selectButton3.setDisabled(true);
											AlarmIdField.setFieldLabel('模型代码<font color="red">*</font>');
											AlarmNameField.setFieldLabel('模型名称<font color="red">*</font>');
											AlarmNameField.setDisabled(false);
										} else if (this.getValue() == '8'/*'单个主题内模型'*/) {
											selectButton1.setDisabled(true);
											selectButton2.setDisabled(false);
											selectButton3.setDisabled(true);
											AlarmIdField.setFieldLabel('主题编号<font color="red">*</font>');
											AlarmNameField.setFieldLabel('主题名称<font color="red">*</font>');
											AlarmNameField.setDisabled(false);
										} else if (this.getValue() == '9'/*'选择多个模型'*/) {
											selectButton1.setDisabled(true);
											selectButton2.setDisabled(true);
											selectButton3.setDisabled(false);
											AlarmIdField.setFieldLabel('已选个数:');
											AlarmNameField.setFieldLabel('模型名称<font color="red">*</font>');
											AlarmNameField.setDisabled(true);
										}
									}
								}
							}, {
								xtype : 'textarea',
								name : 'taskDesc',
								fieldLabel : '任务备注',
								id : projectName+ '.view.dispatch.etldispatch.AlarmView.taskDesc',
								labelWidth : 60,
								width : 460,
								heigh : 70,
								colspan : 2,
								margin : '5 0 10 5',
								value : me.record.TASK_DESC
							}]
						}, {
							layout : {
								type : 'table',
								columns : 2
							},
							xtype : 'fieldset',
							autoHeight : true,
							defaultType : 'radio',
							id : projectName
									+ '.view.dispatch.etldispatch.AlarmView.branch',
							width : 500,
							// height:86,
							title : '后继串并关系',
							colspan : 1,
							items : [{
								boxLabel : '按条件并行',
								name : 'branch_type',
								inputValue : '0',
								width : 240,
								id : projectName+ '.view.dispatch.etldispatch.AlarmView.branchBing',
								checked : true,
								margin : '5 0 10 0',
								colspan : 1
							}, {
								boxLabel : '按条件串行',
								name : 'branch_type',
								id : projectName+ '.view.dispatch.etldispatch.AlarmView.branchChuan',
								inputValue : '1',
								width : 240,
								margin : '0 0 5 0',
								colspan : 1
							}]
						}, {
							xtype : 'fieldset',
							autoHeight : true,
							defaultType : 'textfield',
							width : 500,
							title : '数据源选择',
							colspan : 1,
							layout : {
								type : 'table',
								columns : 1
							},
							items : [{
								xtype : 'combo',
								editable : false,
								fieldLabel : '数据源:',
								id : projectName
										+ '.view.dispatch.etldispatch.AlarmView.dbName',
								margin : '5 5 5 5',
								store : sourceStore,
								displayField : 'dbName',
								valueField : 'dbId',
								typeAhead : false,
								triggerAction : 'all'
							}]
						}, {
							xtype : 'fieldset',
							autoHeight : true,
							defaultType : 'textfield',
							width : 500,
							title : '模型定义',
							colspan : 1,
							layout : {
								type : 'table',
								columns : 2
							},
							items : [{
										xtype : 'panel',
										region : 'center',
										colspan : 2,
										border : false,
										margin : '5 10 10 10',
										layout : {
											type : 'hbox',
											align : 'middle ',
											pack : 'center'
										},
										items : [// 如果这里的中文名字改了，上面listeners里也要改
										{
													xtype : 'button',
													iconCls : 'icon-edit',
													id : 'CallAlarmSelect',
//													iconAlign : 'top',
													text : '模型选择',
													margin : '0 10 0 10'
													/*style : {
														width : '100',
														height : '30',
														verticalAlign : 'middle',
													}*/
												}, {
													xtype : 'button',
													iconCls : 'icon-edit',
													id : 'CallTitleSelect',
//													iconAlign : 'top',
													text : '主题选择',
													margin : '0 10 0 10'
													/*width : 100,
													height : 40*/
												}, {
													xtype : 'button',
													iconCls : 'icon-edit',
													id : 'CallMultiSelect',
//													iconAlign : 'top',
													text : '模型批量',
													margin : '0 10 0 10'
													/*width : 100,
													height : 40*/
												}]
									}, {
										xtype : 'textfield',
										name : 'TaskName',
										fieldLabel : '模型代码<font color="red">*</font>',
										//value : me.record.TASK_ADDRESS,
										id : projectName
												+ '.view.dispatch.etldispatch.AlarmView.modelCode',
										colspan : 1,
										allowBlank : false,
										labelWidth : 60,
										width : 220,
										readOnly : true,
										// heigh:200,
										margin : '5 5 10 5'
									}, {
										xtype : 'textfield',
										name : 'taskType',
										fieldLabel : '模型名称<font color="red">*</font>',
										id : projectName+ '.view.dispatch.etldispatch.AlarmView.modelName',
										value : me.record.TASK_PARAMETER,
										allowBlank : false,
										labelWidth : 60,
										readOnly : true,
										width : 220,
										colspan : 1,
										margin : '5 0 10 10'
									}
							//
							]
						}]
					}]
				}/*, {	// 控制策略窗口
							title : "控制策略",
							xtype : 'form',
							region : 'center',
							id : projectName
									+ '.view.dispatch.etldispatch.AlarmView.alarmStrategyForm',
							fieldDefaults : {
								labelAlign : 'left',
								msgTarget : 'side'
							},
							items : [{
								layout : 'vbox',
								xtype : 'fieldset',
								autoHeight : true,
								defaultType : 'textfield',
								width : 400,
								height : 150,
								margin : '0 0 0 80',
								title : '容错管理',
								// layout : {type : 'table', columns : 2},
								items : [{
									xtype : 'textfield',
									name : 'errorNum',
									fieldLabel : '错误重试次数',
									id : projectName
											+ '.view.dispatch.etldispatch.AlarmView.errorNum',
									labelWidth : 90,
									width : 200,
									margin : '10 0 0 10',
									value : me.record.ERROR_NUM
								}, {
									xtype : 'combo',
									editable : false,
									store : new Ext.data.SimpleStore({
												fields : ['value', 'text'],
												data : [['1', '是'], ['0', '否']]
											}),
									value : '否',
									name : 'errorIsNo',
									// editable:true,
									typeAhead : true,
									mode : "local",
									triggerAction : 'all',
									fieldLabel : '错误时是否跳过',
									id : projectName
											+ '.view.dispatch.etldispatch.AlarmView.errorIsNo',
									// multiSelect : true,
									allowBlank : true,
									labelWidth : 90,
									width : 180,
									margin : '10 0 0 10',
									valueField : 'value',
									displayField : 'text'
								}]
							},
								 * { xtype: 'displayfield', value: '<hr width=510,height:1/>' },
								 {
								layout : 'vbox',
								xtype : 'fieldset',
								autoHeight : true,
								defaultType : 'textfield',
								width : 400,
								height : 200,
								margin : '0 0 0 80',
								title : '其他策略',
								// layout : {type : 'table', columns : 2},
								items : [{
									xtype : 'textfield',
									name : 'loop',
									fieldLabel : '任务循环次数',
									id : projectName
											+ '.view.dispatch.etldispatch.AlarmView.loop',
									labelWidth : 90,
									width : 200,
									margin : '10 0 0 10',
									value : me.record.TASK_LOOP
								}, {
									xtype : 'combo',
									editable : false,
									margin : '0 80 0 0',
									store : new Ext.data.SimpleStore({
												fields : ['value', 'text'],
												data : [['1', '是'], ['0', '否']]
											}),
									value : '是',
									name : 'activIsNo',
									typeAhead : true,
									mode : "local",
									triggerAction : 'all',
									fieldLabel : '是否有效',
									id : projectName
											+ '.view.dispatch.etldispatch.AlarmView.activIsNo',
									allowBlank : true,
									labelWidth : 90,
									width : 180,
									margin : '10 0 0 10',
									valueField : 'value',
									displayField : 'text'
								}, {
									xtype : 'textfield',
									name : 'branchCondition',
									fieldLabel : '自定义条件',
									id : projectName
											+ '.view.dispatch.etldispatch.AlarmView.branchCondition',
									labelWidth : 90,
									width : 200,
									margin : '10 0 0 10'
								}]
							}]
				}*/],
				buttons : [/*
							 * { height : 25, text : '注册组件', action :
							 * 'register', id : 'disparth_template_register' }, {
							 * height : 25, text : '选择组件', action : 'call', id :
							 * 'disparth_template_call' },
							 */{
					height : 25,
					text : '保存',
					action : 'save'
						// id : 'dispatch_task_save'
					}, {
					height : 25,
					text : '退出',
					handler : function() {
						me.close();
					}
				}]
			}]
		});
		me.callParent(arguments);
		var AlarmSelectButton = Ext.getCmp('CallAlarmSelect');
		var AlarmTitleButton = Ext.getCmp('CallTitleSelect');
		var AlarmMultiButtion = Ext.getCmp('CallMultiSelect');
		AlarmSelectButton.on('click', function() {
			var selectView = Ext.create(projectName+ '.view.dispatch.etldispatch.ops.AlarmSelectView');
			selectView.show();
		});
		AlarmTitleButton.on('click', function() {
			var titleView = Ext.create(projectName+ '.view.dispatch.etldispatch.ops.AlarmTitleView');
			titleView.show();
		});
		AlarmMultiButtion.on('click', function() {
			var multiView = Ext.create(projectName+ '.view.dispatch.etldispatch.ops.AlarmMultiView',{
				storeContent : me.localStore
			});
			multiView.show();
		});
	}
});