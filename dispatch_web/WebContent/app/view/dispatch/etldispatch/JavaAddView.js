Ext.define(projectName + '.view.dispatch.etldispatch.JavaAddView', {
	extend : 'Ext.window.Window',
	alias : 'widget.javaAddView',
//	requires : ['Ext.ux.form.ItemSelector'],
	title : 'Java任务配置',
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
		// var store =
		// Ext.create(projectName+'.store.dispatch.etldispatch.EtlDispatchStore');
		var parStore = Ext.create(projectName + '.store.dispatch.etldispatch.EtlParametersStore');
		var paraStore = Ext.create(projectName + '.store.dispatch.parameters.TaskParaStore');
		var methodStore = Ext.create(projectName + '.store.dispatch.etldispatch.MethodStore');
		Ext.apply(paraStore.proxy.extraParams, {
					taskName : me.id
		});
		Ext.apply(methodStore.proxy.extraParams, {
					className : me.record.TASK_PARAMETER
		});
		var para_combo_store = new Ext.data.Store({
			autoLoad : false,
			fields : ['overall'],
			data : [
			        {'overall' : '是'}, 
			        {'overall' : '否'}
			]
		});
		parStore.on('beforeLoad', function(store, operation, eOpts) {
					Ext.apply(store.proxy.extraParams, {
								flowId : me.flowName
							})
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
				items : [{// 基本属性窗口
					title : "基本属性",
					xtype : 'form',
					region : 'center',
					id : projectName+ '.view.dispatch.etldispatch.javaAddView.javaForm',
					fieldDefaults : {
						labelAlign : 'left',msgTarget : 'side'
					},
					items : [{
						xtype : 'container',
						defaultType : 'textfield',
						items : [{
							xtype : 'container',
							height : 400,
							autoScroll : true,
							layout : {
								type : 'table', columns : 1
							},
							defaultType : 'textfield',
							items : [{
								xtype : 'fieldset',
								autoHeight : true,
								defaultType : 'textfield',
								width : 500,
								title : '任务描述',
								colspan: 1,
								layout:'form',
								items : [{
									xtype : 'textfield',
									name : 'taskName',
									fieldLabel : '任务名称<font color="red">*</font>',
									id : projectName+ '.view.dispatch.etldispatch.javaAddView.taskName',
									allowBlank : false,
									value : me.record.TASK_NAME
								}, {
									xtype : 'textfield',
									name : 'taskType',
									fieldLabel : '任务类型<font color="red">*</font>',
									id : projectName + '.view.dispatch.etldispatch.javaAddView.taskType',
									hidden: true,
									hideLabel:true,
									value : me.record.TASK_BELONG
								}, {
									xtype : 'textarea',
									name : 'taskDesc',
									fieldLabel : '任务备注',
									id : projectName+ '.view.dispatch.etldispatch.javaAddView.taskDesc',
									value : me.record.TASK_DESC
								}]
							}, {
								xtype : 'fieldset',
								layout : {type : 'table',columns : 2},
								autoHeight : true,
								defaultType : 'radio',
								id : projectName + '.view.dispatch.etldispatch.javaAddView.branch',
								width : 500,
								title : '后继串并关系',
								items : [{
									boxLabel : '按条件并行',
									id : projectName + '.view.dispatch.etldispatch.javaAddView.branchBing',
									name : 'branch_type',
									inputValue : '0',
									checked : true,
									width:240,
									colspan: 1,
									margin: '5 0 10 0'
								}, {
									boxLabel : '按条件串行',
									id : projectName + '.view.dispatch.etldispatch.javaAddView.branchChuan',
									name : 'branch_type',
									inputValue : '1',
									width:240,
									colspan: 1,
									margin: '0 0 5 0'
								}]
							}, {
								layout : 'form',
								xtype : 'fieldset',
								autoHeight : true,
								defaultType : 'textfield',
								title : '任务执行属性',
								colspan: 1,
								width : 500,
								items : [{
									xtype : 'textfield',
									name : 'taskClass',
									fieldLabel : '类名<font color="red">*</font>',
									id : projectName+ '.view.dispatch.etldispatch.javaAddView.taskClass',
									allowBlank : false,
									value : me.record.TASK_PARAMETER
								}, {
									xtype : 'textfield',
									name : 'taskCommand',
									fieldLabel : '执行方法<font color="red">*</font>',
									id : projectName + '.view.dispatch.etldispatch.javaAddView.taskCommand',
									allowBlank : false,
									value : me.record.TASK_ADDRESS
								}, {
									xtype : 'treepanel',
									id : projectName+ '.view.dispatch.etldispatch.javaAddView.methodSelector',
									name : 'taskCommand',
									autoScroll : true,
									rootVisible : false,
									height : 200,
									// fieldLabel : '方法选择器',
									store : methodStore,
									margin : '5 0 5 0'
								}]
							}, {
								layout : 'form',
								xtype : 'fieldset',
								autoHeight : true,
								defaultType : 'textfield',
								title : '任务参数配置',
								colspan : 1,
								width : 500,
								items : [
								{
									xtype : 'combo',
									name : 'paraName',
									fieldLabel : '绑定输出参数',
									id : projectName
											+ '.view.dispatch.etlflowdispatch.javaAddView.paraName',
									displayField : 'paraName',
									valueField : 'id',
									typeAhead : false,
									triggerAction : 'all',
									minChars : 1,
									selectOnFocus : true,
									store : parStore,
									listeners : {
										
									}
								}
								
							]

							}]
						}]
					}]
				}],
				buttons : [/*{
					height : 25,
					text : '注册组件',
					action : 'register',
					id : 'dispatch_template_register'
				}, {
					height : 25,
					text : '选择组件',
					action : 'call',
					id : 'dispatch_template_call'
				}, */{
					height : 25,
					text : '保存',
					action : 'save',
					id : 'dispatch_task_save'
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
		var className = Ext.getCmp(projectName+ '.view.dispatch.etldispatch.javaAddView.taskClass');
		var methodName = Ext.getCmp(projectName+ '.view.dispatch.etldispatch.javaAddView.taskCommand');
		var methodSelector = Ext.getCmp(projectName+ '.view.dispatch.etldispatch.javaAddView.methodSelector');
		// methodSelector.store.load();
		className.on('change', function() {
			Ext.apply(methodSelector.store.proxy.extraParams, {
						'className' : className.getValue()
					});
			methodSelector.store.load();
		});
		methodSelector.on('itemdblclick', function(node, e) {
			// Ext.MessageBox.alert('','');
			var select = methodSelector.getSelectionModel().getSelection();
			// Ext.MessageBox.alert(e.data.text,'');
			if (e.data.leaf == true) {
				methodName.setValue(e.data.text);
			}
		});
	}
});