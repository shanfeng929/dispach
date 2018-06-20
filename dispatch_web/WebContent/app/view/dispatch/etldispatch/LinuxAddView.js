Ext.define(projectName + '.view.dispatch.etldispatch.LinuxAddView', {
	extend : 'Ext.window.Window',
	alias : 'widget.linuxAddView',
	// requires : ['Ext.ux.form.ItemSelector'],
	// id:'dispatch.shellAddView',
	title : 'Linux脚本配置',
	width : 580,
	height : 550,
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
	bodyStyle : 'padding:5px',
	resizable : true,
	initComponent : function() {
		var me = this;
		var store = Ext.create(projectName
				+ '.store.dispatch.etldispatch.EtlDispatchStore');
		var parStore = Ext.create(projectName
						+ '.store.dispatch.etldispatch.EtlParametersStore', {
					flowName : me.flowName
				});
		parStore.on('beforeLoad', function(store, operation, eOpts) {
					Ext.apply(store.proxy.extraParams, {
								flowId : me.flowName
							})
				});
		var paraStore = Ext.create(projectName
				+ '.store.dispatch.parameters.TaskParaStore');
		Ext.apply(paraStore.proxy.extraParams, {
					taskName : me.id
				});
		var para_combo_store = new Ext.data.Store({
					autoLoad : false,
					fields : ['overall'],
					data : [{
								'overall' : '是'
							}, {
								'overall' : '否'
							}]
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
					// 基本属性窗口
					title : "基本属性",
					xtype : 'form',
					region : 'center',
					id : projectName
							+ '.view.dispatch.etldispatch.linuxAddView.linuxForm',
					fieldDefaults : {
						labelAlign : 'left',
						msgTarget : 'side'
					},
					items : [{
						xtype : 'container',
						defaultType : 'textfield',
						items : [{
							xtype : 'container',
							height : 400,
							autoScroll : true,
							layout : {
								type : 'table',
								columns : 1
							},
							defaultType : 'textfield',
							items : [/*
										 * { xtype: 'textfield', id :
										 * projectName+'.view.dispatch.etldispatch.linuxAddView.updateorsave',
										 * hidden: true, hideLabel:true , name :
										 * 'updateorsave' },
										 */
							{
								xtype : 'fieldset',
								autoHeight : true,
								defaultType : 'textfield',
								width : 500,
								title : '任务描述',
								colspan : 1,
								layout : 'form',
								items : [{
									xtype : 'textfield',
									name : 'taskName',
									fieldLabel : '任务名称<font color="red">*</font>',
									id : projectName
											+ '.view.dispatch.etldispatch.linuxAddView.taskName',
									colspan : 1,
									allowBlank : false,
									value : me.record.TASK_NAME
								}, {
									xtype : 'textfield',
									name : 'taskType',
									fieldLabel : '任务类型<font color="red">*</font>',
									id : projectName
											+ '.view.dispatch.etldispatch.linuxAddView.taskType',
									hidden : true,
									hideLabel : true,
									value : me.record.TASK_BELONG
								}, {
									xtype : 'textarea',
									name : 'taskDesc',
									fieldLabel : '任务备注',
									id : projectName
											+ '.view.dispatch.etldispatch.linuxAddView.taskDesc',
									value : me.record.TASK_DESC
								}]
							}, {
								xtype : 'fieldset',
								layout : {
									type : 'table',
									columns : 2
								},
								autoHeight : true,
								defaultType : 'radio',
								id : projectName
										+ '.view.dispatch.etldispatch.linuxAddView.branch',
								width : 500,
								title : '后继串并关系',
								colspan : 1,
								items : [{
									boxLabel : '按条件并行',
									name : 'branch_type',
									id : projectName
											+ '.view.dispatch.etldispatch.linuxAddView.branchBing',
									inputValue : '0',
									checked : true,
									width : 240,
									colspan : 1,
									margin : '5 0 10 0'
								}, {
									boxLabel : '按条件串行',
									name : 'branch_type',
									id : projectName
											+ '.view.dispatch.etldispatch.linuxAddView.branchChuan',
									inputValue : '1',
									width : 240,
									colspan : 1,
									margin : '0 0 5 0'
								}]
							}, {
								xtype : 'fieldset',
								// autoHeight:true,
								defaultType : 'textfield',
								title : '任务执行属性',
								colspan : 1,
								width : 500,
								layout : 'form',
								items : [{
									xtype : 'combo',
									fieldLabel : '远程地址<font color="red">*</font>',
									id : 'linuxAddView.remote',
									editable : false,
									typeAhead : false,
									triggerAction : 'all',
									allowBlank : false,
									store : store,
									valueField : 'paraId',
									displayField : 'display'
								}, {
									xtype : 'textarea',
									name : 'taskCommand',
									fieldLabel : '任务执行语句<font color="red">*</font>',
									id : projectName
											+ '.view.dispatch.etldispatch.linuxAddView.taskCommand',
									allowBlank : false,
									value : me.record.TASK_ADDRESS
								}]
							}, {
								xtype : 'fieldset',
								autoHeight : true,
								hidden : false, // 不隐藏
								defaultType : 'textfield',
								title : '任务参数配置',
								colspan : 1,
								width : 500,
								layout : {
									type : 'table',
									columns : 2
								},
								items : [{
									xtype : 'button',
									name : 'OverallParameterButton',
									id : projectName
											+ '.view.dispatch.etlflowdispatch.linuxAddView.getParaButton',
									action : 'getPara',
									text : '选择输入参数',
									margin : '10 0 0 10',
									listeners : {
										click : function() {
											var selectedParas = new Array();
											paraStore.each(function(r) {
												selectedParas.push(r.get("id"));
											});
											Ext
													.create(
															projectName
																	+ '.view.dispatch.etldispatch.TaskParaView',
															{
																flowName : me.flowName,
																taskName : me.id,
																selectedParas : selectedParas
															}).show();
										}
									}
								}, {
									xtype : 'combo',
									name : 'paraName',
									fieldLabel : '绑定输出参数',
									id : projectName
											+ '.view.dispatch.etlflowdispatch.flowAddView.paraName',
									colspan : 1,
									displayField : 'paraName',
									valueField : 'id',
									typeAhead : false,
									triggerAction : 'all',
									minChars : 1,
									selectOnFocus : true,
									store : parStore,
									listeners : {
										/*change : function(combo, record, index) {
											Ext.Ajax.request({
												url : basePath
														+ '/DisPatch/setoutparameters',
												params : {
													'id' : this.getValue(),
													'taskName':me.id
												},
												success : function(response) {
													Ext
															.getCmp(projectName
																	+ '.view.dispatch.etlflowdispatch.flowAddView.taskPara').store
															.load();
												},
												failure : function() {
												}
											});
											parStore.load();
										},
										expand : function(combo, record, index) {
											Ext.apply(
													parStore.proxy.extraParams,
													{
														paraName : Ext
																.getCmp(projectName
																		+ '.view.dispatch.etlflowdispatch.flowAddView.paraName')
																.getValue()
													});
											parStore.load();
										}*/
									},
									labelWidth : 90,width : 370,
									margin : '10 0 0 15'
								}, {
									xtype : 'container',
									colspan : 2,
									autoScroll : true,
									layout : "fit",
									width : 475,height : 150,
									items : {
										xtype : 'grid',
										id : projectName
												+ '.view.dispatch.etlflowdispatch.flowAddView.taskPara',
										margin : '10 0 10 10',
										store : paraStore,
										columns : [{
											xtype : 'rownumberer',
											text : '序号',
											align : 'center',
											width : 60
										}, {
											text : 'taskid',
											dataIndex : 'taskId',
											hideable : true,
											hidden : true
										}, {
											text : '参数名称',
											align : 'center',
											dataIndex : 'paraName',
											flex : 1
										}, {
											text : '参数取值',
											align : 'center',
											dataIndex : 'paraValue',
											flex : 1
										}, {
											text : '参数类型',
											align : 'center',
											dataIndex : 'paraType',
											flex : 1
										}, {
											text : 'id',
											dataIndex : 'id',
											hideable : true,
											hidden : true
										}]
									}
								}/*
									 * , { xtype: 'textarea', name :
									 * 'taskParameter', hideable:true,
									 * hidden:true, colspan: 2, fieldLabel :
									 * '任务参数', id :
									 * projectName+'.view.dispatch.etldispatch.linuxAddView.taskParameter',
									 * //allowBlank : false, labelWidth : 90 ,
									 * heigh:200, margin : '10 0 0 10'}
									 */
								]
							}]
						}]
					}]
				}/*
					 * , //控制策略窗口 { title : "控制策略", xtype : 'form' , region:
					 * 'center' ,
					 * id:projectName+'.view.dispatch.etldispatch.linuxAddView.linuxStrategyForm',
					 * fieldDefaults : {labelAlign : 'left', msgTarget :
					 * 'side'}, items : [{ layout:'vbox', xtype:'fieldset',
					 * autoHeight:true, defaultType:'textfield',
					 * width:400,height:150, margin : '0 0 0 80', title:'容错管理',
					 * //layout : {type : 'table', columns : 2}, items:[{ xtype:
					 * 'textfield', name : 'errorNum', fieldLabel : '错误重试次数', id :
					 * projectName+'.view.dispatch.etldispatch.linuxAddView.errorNum',
					 * labelWidth : 90 , width:200, margin : '10 0 0 10' }, {
					 * xtype : 'combo', editable:false, store : new
					 * Ext.data.SimpleStore({ fields : [ 'value', 'text' ], data : [ [
					 * '1', '是' ], [ '0', '否' ]] }), value:'否', name :
					 * 'errorIsNo', //editable:true, typeAhead: true, mode :
					 * "local" , triggerAction : 'all', fieldLabel : '错误时是否跳过',
					 * id : projectName +
					 * '.view.dispatch.etldispatch.linuxAddView.errorIsNo',
					 * //multiSelect : true, allowBlank : true,
					 * valueField:'value', displayField:'text', labelWidth :
					 * 90,width : 180, margin : '10 0 0 10' }] }, {xtype:
					 * 'displayfield',value: '<hr width=510,height:1/>'}, {
					 * layout:'vbox', xtype:'fieldset', autoHeight:true,
					 * defaultType:'textfield', width:400,height:200, margin :
					 * '0 0 0 80', title:'其他策略', //layout : {type : 'table',
					 * columns : 2}, items:[{ xtype: 'textfield', name : 'loop',
					 * fieldLabel : '任务循环次数', id :
					 * projectName+'.view.dispatch.etldispatch.linuxAddView.loop',
					 * labelWidth : 90,width:200, margin : '10 0 0 10' }, {
					 * xtype : 'combo', editable:false, margin : '0 80 0 0',
					 * store : new Ext.data.SimpleStore({ fields : [ 'value',
					 * 'text' ], data : [ [ '1', '是' ], [ '0', '否' ]] }),
					 * value:'是', name : 'activIsNo', typeAhead: true, mode :
					 * "local" , triggerAction : 'all', fieldLabel : '是否有效', id :
					 * projectName +
					 * '.view.dispatch.etldispatch.linuxAddView.activIsNo',
					 * allowBlank : true, valueField:'value',
					 * displayField:'text', labelWidth : 90,width : 180, margin :
					 * '10 0 0 10' }, { xtype: 'textfield', name :
					 * 'branchCondition', fieldLabel : '自定义条件', id :
					 * projectName+'.view.dispatch.etldispatch.linuxAddView.branchCondition',
					 * labelWidth : 90 , width:200, margin : '10 0 0 10' }] }] }
					 */],
				buttons : [
						/*
						 * {height:25,text : '注册组件', action : 'register', id :
						 * 'disparth_template_register'}, {height:25,text :
						 * '选择组件', action : 'call', id :
						 * 'disparth_template_call'},
						 */
						{
					height : 25,
					text : '保存',
					action : 'save',
					id : 'dispatch_linux_save'
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
	}
});