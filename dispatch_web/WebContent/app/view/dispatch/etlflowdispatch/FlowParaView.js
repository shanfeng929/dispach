Ext.define(projectName + '.view.dispatch.etlflowdispatch.FlowParaView', {
	extend : 'Ext.window.Window',
	alias : 'widgit.flowParaView',
	title : '流程参数配置',
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
		var flowParaStore = Ext.create('Ext.data.Store', {
			autoLoad : false,
			fields : ['id', 'flowId', 'paraName', 'paraValue','paraType'],
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
						columns : 2
					},
					items : [{
						xtype : 'button',
						id : 'flowParaView.flowParaAdd',
						text : ' 新 增 一 条 ',
						margin : '5 0 5 5',
						colspan : 1
					}, {
						xtype : 'button',
						id : 'flowParaView.flowParaRemove',
						text : '删除选中的条目',
						margin : '5 5 5 5',
						colspan : 1
					}]
				}, {
					xtype : 'grid',
					id : 'flowParaView.flowParaGird',
					autoScroll : true,
					store : flowParaStore,
					layout : 'fit',
					height : 400,
					border : false,
					columnLines : true,
					selModel : Ext.create('Ext.selection.CheckboxModel'),
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
						hidden : true
					}, {
						text : '变量名',
						align : 'center',
						dataIndex : 'paraName',
						displayField : 'paraName',
						editor : {
							xtype : 'textfield',
							allowBlank : true
						},
						flex : 1
					}, {
						text : '变量值',
						align : 'center',
						dataIndex : 'paraValue',
						displayField : 'paraValue',
						editor : {
							xtype : 'textfield',
							allowBlank : true
						},
						flex : 1
					},{
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
					text : '退出',
					handler : function() {
						me.close();
					}
				}]
			}]
		});
		me.callParent(arguments);
		flowParaStore.load();
		var grid = Ext.getCmp('flowParaView.flowParaGird');
		var store = grid.getStore();
//		debugger;
		var addButton = Ext.getCmp('flowParaView.flowParaAdd');
		var removeButton = Ext.getCmp('flowParaView.flowParaRemove');
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
			var store = Ext.getCmp('flowParaView.flowParaGird').getStore();
			var rowEditing = grid.getPlugin('rowEditing');
			store.insert(store.getCount(),model);
			rowEditing.startEdit(store.getCount()-1,1);
			/*Ext.Ajax.request({
				url : basePath + '/DisPatch/EtlFlow/newflowpara',
				params : {
					'flowId' : me.flowName
				},
				success : function(response) {
					store.load();
					rowEditing.startEdit(store.getCount(),1);
				},
				failure : function() {
				}
			});*/
		});
		removeButton.on('click', function() {
			var selected = grid.getSelectionModel().getSelection();
			if (selected.length < 1) {
				Ext.Msg.alert('注意', '请至少选择一条数据。');
				return;
			} else {
				var ids = new Array();
				for (var i = 0; i < selected.length; i++) {
					ids.push(selected[i].get('id'));
				}
				Ext.Ajax.request({
					url : basePath + '/DisPatch/EtlFlow/deleteflowpara',
					params : {
						'ids' : ids
					},
					success : function(response) {
						grid.store.load();
					},
					failure : function() {
					}
				});
			}
		});
		me.on('close', function() {
			Ext.Ajax.request({
				url : basePath + '/DisPatch/EtlFlow/removenewflowpara',
				params : {
					'flowId' : me.flowName
				},
				success : function(response) {
					// grid.store.load();
				},
				failure : function() {
				}
			});
		});
	}
});