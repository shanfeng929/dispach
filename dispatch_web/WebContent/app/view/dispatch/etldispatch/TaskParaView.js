Ext.define(projectName + '.view.dispatch.etldispatch.TaskParaView', {
	extend : 'Ext.window.Window',
	alias : 'widgit.taskParaView',
	title : '任务输入参数选择',
	width : 580,
	height : 500,
	flowName : [],
	labelAlign : 'right', // 文本框标签在左侧右对齐
	modal : true, // 此窗口模态
	defaults : {
		margin : '5 5 5 10',
		fieldStyle : 'background-color: #DFE9F6;background-image: none;'
	},
	bodyStyle : 'padding:5px',
	resizable : false,
	initComponent : function() {
		var me = this;
		var taskParaStore = Ext.create('Ext.data.Store', {
			autoLoad : false,
			fields : ['id', 'flowId', 'paraName', 'paraValue', 'paraType'],
			proxy : {
				type : 'ajax',
				url : basePath + '/DisPatch/EtlFlow/getflowpara',
				extraParams : {
					flowId : me.flowName
				},
				reader : {
					type : 'json',
					root : 'listItems'
				}
			}
		});
		Ext.applyIf(me, {
			items : [{
				xtype : "panel",
				layout : 'fit',
				items : [{
					xtype : "panel",
					layout : {
						type : 'table',
						columns : 1
					},
					items : [{
						xtype : 'button',
						id : 'taskParaView.flowParaAdd',
						text : '添加任务链变量',
						margin : '5 0 5 5',
						colspan : 1/*,
						handler:function(){
							Ext.create(projectName + '.view.dispatch.etldispatch.TaskParaAddView',{flowName:me.flowName}).show();
						}*/
					}]
				},{
					xtype : 'grid',
					id : 'taskParaView.taskParaGird',
					autoScroll : true,
					store : taskParaStore,
					layout : 'fit',
					height : 400,
					border : false,
					columnLines : true,
					selModel : Ext.create('Ext.selection.CheckboxModel'),
					// autoHeight : true,
					columns : [/*{
						xtype : 'rownumberer',
						text : '序列',
						align : 'center',
						width : 60
					}, */{
						text : '流程ID(hidden)',
						align : 'center',
						dataIndex : 'flowId',
						displayField : 'flowId',
						flex : 1,
						hidden : true
					}, {
						text : '变量名',
						align : 'center',
						dataIndex : 'paraName',
						displayField : 'paraName',
						flex : 1,
						editor : {
							xtype: 'textfield',
							allowBlank : true
						}
					}, {
						text : '变量值',
						align : 'center',
						dataIndex : 'paraValue',
						displayField : 'paraValue',
						flex : 1,
						editor : {
							xtype: 'textfield',
							allowBlank : true
						}
					}, {
						text : '变量类型',
						align : 'center',
						dataIndex : 'paraType',
						displayField : 'paraType',
						editor : {
							xtype : 'combo',
							editable : false,
							allowBlank : true,
							store : new Ext.data.SimpleStore({
								fields : ['value', 'text'],
								data : DISPATCH.lib.Constants.FLOW_PARAM_TYPE
							}),
							value : 'String',
							typeAhead : true,
							mode : "local",
							triggerAction : 'all',
							displayField:'text',
							valueField:'value'
						},
						flex : 1
					}],
					selType : 'rowmodel',
					plugins : [
				        Ext.create('Ext.grid.plugin.RowEditing', {
				        	pluginId : 'rowEditing',
				        	clicksToEdit : 2
				        })
					]
				}],
				buttons : [{
					height : 25,
					text : '选择',
					handler : function() {
						var grid = Ext.getCmp('taskParaView.taskParaGird');
						var selected = grid.getSelectionModel().getSelection();
						var ids = new Array();
						for (var i = 0; i < selected.length; i++) {
							ids.push(selected[i].get('id'));
						}
						Ext.Ajax.request({
							url : basePath + '/DisPatch/setinparameters',
							params : {
								'ids' : ids,
								'taskName' : me.taskName
							},
							success : function(response) {
								Ext.getCmp(projectName+ '.view.dispatch.etlflowdispatch.flowAddView.taskPara').store.load();
							},
							failure : function() {
							}
						});
						me.close();
					}
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
		taskParaStore.load();
		var addButton = Ext.getCmp('taskParaView.flowParaAdd');
		var grid = Ext.getCmp('taskParaView.taskParaGird');
		taskParaStore.on('load',function(){
			var selrows=new Array();
			taskParaStore.each(function(r){
				if(me.selectedParas.indexOf(r.get('id'))>=0){
					selrows.push(r);
				}
			});
			grid.getSelectionModel().select(selrows);
		});
		grid.on('edit', function(editor, e) {
			var rec = e.record;
			Ext.Ajax.request({
				url : basePath + '/DisPatch/EtlFlow/editflowpara',
				params : {
					'id' : rec.get('id'),
					'flowId' : rec.get('flowId'),
					'paraName' : rec.get('paraName'),
					'paraValue' : rec.get('paraValue'),
					'paraType':rec.get('paraType')
				},
				success : function(response) {
					grid.store.load();
				},
				failure : function() {
				}
			});
		});
		addButton.on('click', function() {
			var model = {
				'id':'',
				'flowId':me.flowName,
				'paraName':'',
				'paraValue':'',
				'paraType':''
			};
			var store = Ext.getCmp('taskParaView.taskParaGird').getStore();
			var rowEditing = grid.getPlugin('rowEditing');
			store.insert(store.getCount(),model);
			rowEditing.startEdit(store.getCount()-1,1);
		});
	}
});