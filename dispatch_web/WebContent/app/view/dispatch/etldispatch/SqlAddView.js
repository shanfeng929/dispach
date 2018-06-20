Ext.define(projectName + '.view.dispatch.etldispatch.SqlAddView', {
	extend : 'Ext.window.Window',
	alias : 'widget.sqlAddView',
	// requires : ['Ext.ux.form.ItemSelector'],
	title : 'Sql任务配置',
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
		/*
		 * var parStore=
		 * Ext.create(projectName+'.store.dispatch.etldispatch.EtlParametersStore');
		 * var
		 * paraStore=Ext.create(projectName+'.store.dispatch.parameters.TaskParaStore');
		 * Ext.apply(paraStore.proxy.extraParams,{ taskId:me.id }); var
		 * para_combo_store = new Ext.data.Store({ fields : ['overall'],
		 * autoLoad : false, data : [ {'overall' : '是'}, {'overall' : '否'} ] });
		 */
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
					id : projectName
							+ '.view.dispatch.etldispatch.sqlAddView.sqlForm',
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
							items : [{
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
											+ '.view.dispatch.etldispatch.sqlAddView.taskName',
									allowBlank : false,
									value : me.record.TASK_NAME
								}, {
									xtype : 'textfield',
									name : 'taskType',
									fieldLabel : '任务类型<font color="red">*</font>',
									id : projectName
											+ '.view.dispatch.etldispatch.sqlAddView.taskType',
									hidden : true,
									hideLabel : true,
									value : me.record.TASK_BELONG
								}, {
									xtype : 'textarea',
									name : 'taskDesc',
									fieldLabel : '任务备注',
									id : projectName
											+ '.view.dispatch.etldispatch.sqlAddView.taskDesc',
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
										+ '.view.dispatch.etldispatch.sqlAddView.branch',
								width : 500,
								title : '后继串并关系',
								colspan : 1,
								items : [{
									boxLabel : '按条件并行',
									id : projectName
											+ '.view.dispatch.etldispatch.sqlAddView.branchBing',
									name : 'branch_type',
									inputValue : '0',
									checked : true,
									width : 240,
									colspan : 1,
									margin : '5 0 10 0'
								}, {
									boxLabel : '按条件串行',
									id : projectName
											+ '.view.dispatch.etldispatch.sqlAddView.branchChuan',
									name : 'branch_type',
									inputValue : '1',
									width : 240,
									colspan : 1,
									margin : '0 0 5 0'
								}]
							}, {
								layout : 'form',
								xtype : 'fieldset',
								autoHeight : true,
								defaultType : 'textfield',
								title : '任务执行属性',
								colspan : 1,
								width : 500,
								layout : {
									type : 'table',
									columns : 2
								},
								items : [{
									xtype : 'combo',
									fieldLabel : '数据源选择<font color="red">*</font>',
									id : 'sqlAddView.remote',
									editable : false,
									typeAhead : false,
									triggerAction : 'all',
									allowBlank : false,
									store : sourceStore,
									valueField : 'dbId',
									colspan : 1,
									displayField : 'dbName',
									width : 400,
									margin : '5 0 5 0'
								}, {
									xtype : 'button',
									text : '新增数据源',
									colspan : 1,
									margin : '5 0 5 0',
									handler : function() {
										var view = Ext
												.create(projectName
														+ '.view.dispatch.etldispatch.DataSourceAddView');
										
										view.show();

									}
								}, {
									xtype : 'textarea',
									name : 'taskCommand',
									fieldLabel : 'SQL执行语句<font color="red">*</font>',
									id : projectName
											+ '.view.dispatch.etldispatch.sqlAddView.taskCommand',
									allowBlank : false,
									margin : '5 0 5 0',
									colspan : 2,
									width : 475,
//									cols : 25,
									value : me.record.TASK_ADDRESS
								}]
							}/*
								 * ,{ layout:'form', xtype:'fieldset',
								 * autoHeight:true, defaultType:'textfield',
								 * title:'任务参数配置', hidden:true, colspan: 1,
								 * width:500, layout : {type : 'table', columns :
								 * 2}, margin : '0 0 0 0', items:[{ xtype:
								 * 'combo', name : 'paraName', fieldLabel :
								 * '参数选择', id :
								 * projectName+'.view.dispatch.etlflowdispatch.sqlAddView.paraName',
								 * colspan: 1, displayField:'paraName',
								 * valueField:'paraId', typeAhead: false,
								 * triggerAction: 'all', minChars:1,
								 * selectOnFocus:true, store : parStore,
								 * listeners:{ change:function(combo,
								 * record,index){
								 * Ext.apply(parStore.proxy.extraParams,{
								 * paraName:Ext.getCmp(projectName+'.view.dispatch.etlflowdispatch.sqlAddView.paraName').getValue()
								 * }); parStore.load() }, expand:function(combo,
								 * record,index){
								 * Ext.apply(parStore.proxy.extraParams,{
								 * paraName:Ext.getCmp(projectName+'.view.dispatch.etlflowdispatch.sqlAddView.paraName').getValue()
								 * }); parStore.load() } }, labelWidth :
								 * 90,width : 355, margin : '10 0 0 10' }, {
								 * xtype: 'button', name :
								 * 'OverallParameterButton',
								 * id:projectName+'.view.dispatch.etlflowdispatch.sqlAddView.getParaButton',
								 * action:'getPara', text:'引用参数', labelWidth :
								 * 90 , heigh:200, margin : '10 0 0 10' }, {
								 * xtype : 'container', colspan: 2, width: 450,
								 * height:150, autoScroll: true, layout: "fit",
								 * items:{ xtype:'grid',
								 * id:projectName+'.view.dispatch.etlflowdispatch.sqlAddView.taskPara',
								 * //model:paraModel, store:paraStore,
								 * columns:[{ xtype:'rownumberer', text:'序号',
								 * align:'center', width:60 }, { text:'taskid',
								 * dataIndex:'taskId', hideable:true,
								 * hidden:true }, { text:'参数名称', align:'center',
								 * dataIndex:'paraName', flex:1, editor: {xtype:
								 * 'textfield',allowBlank: false} }, {
								 * text:'参数取值', align:'center',
								 * dataIndex:'paraValue', flex:1, editor:
								 * {xtype: 'textfield',allowBlank: false} }, {
								 * text:'paraid', dataIndex:'paraId',
								 * hideable:true, hidden:true }, { text:'全局变量',
								 * align:'center', dataIndex:'overall', flex:1,
								 * editor:{xtype:'combo',store:para_combo_store,displayField :
								 * 'overall',editable : false,allowBlank :
								 * false} }, { xtype:'actioncolumn', width:50,
								 * items: [{ icon:
								 * 'resources/images/icon/delete.png', tooltip:
								 * 'Delete', handler: function(grid, rowIndex,
								 * colIndex) { var rec =
								 * grid.getStore().getAt(rowIndex);
								 * //alert("Terminate " + rec.get('paraName'));
								 * Ext.Ajax.request({ url : basePath+
								 * '/DisPatch/removeparameters', params : { 'id' :
								 * rec.get('id') }, success : function(response) {
								 * var responseJson =
								 * Ext.decode(response.responseText); var
								 * grid=Ext.getCmp(projectName+'.view.dispatch.etlflowdispatch.sqlAddView.taskPara');
								 * grid.store.load(); }, failure : function() { }
								 * }); } }] }], selType: 'rowmodel', plugins: [
								 * Ext.create('Ext.grid.plugin.RowEditing', {
								 * clicksToEdit: 2 }) ] } }] }
								 */]
						}]
					}]
				}/*
					 * ,{//控制策略窗口 title : "控制策略", xtype : 'form' , region:
					 * 'center',
					 * id:projectName+'.view.dispatch.etldispatch.sqlAddView.sqlStrategyForm',
					 * fieldDefaults :{labelAlign : 'left', msgTarget : 'side'},
					 * items : [{ layout:'vbox', xtype:'fieldset',
					 * autoHeight:true, defaultType:'textfield', width:400,
					 * height:150, margin : '0 0 0 80', title:'容错管理', //layout :
					 * {type : 'table', columns : 2}, items:[{ xtype:
					 * 'textfield', name : 'errorNum', fieldLabel : '错误重试次数', id :
					 * projectName+'.view.dispatch.etldispatch.sqlAddView.errorNum',
					 * labelWidth : 90,width:200,margin : '10 0 0 10', value :
					 * me.record.ERROR_NUM },{ xtype : 'combo', editable:false,
					 * store : new Ext.data.SimpleStore({ fields : [ 'value',
					 * 'text' ], data : [[ '1', '是' ], [ '0', '否' ]] }),
					 * value:'否', name : 'errorIsNo', //editable:true,
					 * typeAhead: true, mode : "local" , triggerAction : 'all',
					 * fieldLabel : '错误时是否跳过', id : projectName +
					 * '.view.dispatch.etldispatch.sqlAddView.errorIsNo',
					 * //multiSelect : true, allowBlank : true, labelWidth :
					 * 90,width : 180,margin : '10 0 0 10', valueField:'value',
					 * displayField:'text' }] },{ xtype: 'displayfield', value: '<hr width=510,height:1/>'
					 * },{ layout:'vbox', xtype:'fieldset', autoHeight:true,
					 * defaultType:'textfield', width:400, height:200, margin :
					 * '0 0 0 80', title:'其他策略', //layout : {type : 'table',
					 * columns : 2}, items:[{ xtype: 'textfield', name : 'loop',
					 * fieldLabel : '任务循环次数', id :
					 * projectName+'.view.dispatch.etldispatch.sqlAddView.loop',
					 * labelWidth : 90 , width:200,margin : '10 0 0 10', value :
					 * me.record.TASK_LOOP },{ xtype : 'combo', editable:false,
					 * margin : '0 80 0 0', store : new Ext.data.SimpleStore({
					 * fields : [ 'value', 'text' ], data : [ [ '1', '是' ], [
					 * '0', '否' ]] }), value:'是', name : 'activIsNo', typeAhead:
					 * true, mode : "local" , triggerAction : 'all', fieldLabel :
					 * '是否有效', id : projectName +
					 * '.view.dispatch.etldispatch.sqlAddView.activIsNo',
					 * allowBlank : true, labelWidth : 90,width : 180,margin :
					 * '10 0 0 10', valueField:'value', displayField:'text' },{
					 * xtype: 'textfield', name : 'branchCondition', fieldLabel :
					 * '自定义条件', id :
					 * projectName+'.view.dispatch.etldispatch.sqlAddView.branchCondition',
					 * labelWidth : 90 , width:200, margin : '10 0 0 10' }] }] }
					 */],
				buttons : [
						/*
						 * {height:25,text : '注册组件', action : 'register', id :
						 * 'dispatch_template_register'}, {height:25,text :
						 * '选择组件', action : 'call', id :
						 * 'dispatch_template_call'},
						 */
						{
					height : 25,
					text : '保存',
					action : 'save',
					id : 'dispatch_sql_save'
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