Ext.define(projectName + '.view.dispatch.etldispatch.ops.AlarmMultiView', {
	extend : 'Ext.window.Window',
	alias : 'widget.alarmMultiView',
	title : '多个预警模型选择',
	width : 1000,
	height : 480,
	labelAlign : "right",
	modal : true, // 是否为模态窗口
	defaults : {
		margin : '5 5 5 10',
		fieldStyle : 'background-color: #DFE9F6;background-image: none;'
	},
	bodyStyle : 'padding:5px',
	resizable : false,
	storeContent : [],
	initComponent : function() {
		var me = this;
		var store = Ext.create(projectName
				+ '.store.dispatch.etldispatch.ops.ModelStore');
		store.on('beforeload', function(store, operation, eOpts) {
					// operation.setParams({searchData: me.searchData});
					Ext.apply(store.proxy.extraParams, {
								searchData : me.searchData
							})
				});
		var localStore = Ext.create(Ext.data.Store, {
					model : projectName
							+ '.model.dispatch.etlflowdispatch.ops.ModelModel'
				});
		Ext.applyIf(me, {
			items : [{
				xtype : "panel",
				width : 950,
				// height : '100%',
				layout : {
					type : 'table',
					columns : 3
				},
				bodyStyle : {
					background : '#dfe8f6'
					// padding : '10px'
				},
				items : [{
							xtype : "panel",
							width : 600,
							colspan : 1,
							height : 371,
							layout : {
								type : 'fit'
								// columns : 1
							},
							items : [{
								xtype : 'grid',
								id : 'multiViewGrid',
								autoScroll : true,
								store : store,
								layout : 'fit',
								border : false,
								columnLines : true,
								selModel : Ext
										.create('Ext.selection.CheckboxModel'),
								autoHeight : true,
								columns : [{
											xtype : 'rownumberer',
											text : '序列',
											align : 'center',
											width : 60
										}, {
											text : '模型代码',
											align : 'center',
											dataIndex : 'modelCode',
											flex : 1
										}, {
											text : '模型名称',
											align : 'center',
											dataIndex : 'modelName',
											flex : 1
										}, {
											text : '预警对象',
											align : 'center',
											dataIndex : 'warningObject',
											flex : 1
										}, {
											text : '预警类型',
											align : 'center',
											dataIndex : 'warningType',
											flex : 1
										}, {
											text : '主题',
											align : 'center',
											dataIndex : 'title',
											flex : 1
										}, {
											text : '机构',
											align : 'center',
											dataIndex : 'orgName',
											flex : 1
										}],
								dockedItems : [{
											xtype : 'pagingtoolbar',
											dock : 'bottom',
											store : store,
											displayInfo : true,
											displayMsg : '第 {0} 到 {1} 共 {2} 条记录',
											emptyMsg : '没有记录',
											beforePageText : '第',
											afterPageText : '页, 共 {0} 页'
										}]
								
									/*
									 * viewConfig : { columnsText : "显示/隐藏列",
									 * sortAscText : "正序排列", sortDescText :
									 * "倒序排列", forceFit : true, getRowClass :
									 * function(record, rowIndex, rowParams,
									 * store) { // 禁用数据显示灰色 if (record.data.used ==
									 * 1) { // 用户状态不正常 // debugger; return
									 * 'x-grid-record-gray'; } else { return ''; } } }
									 */

							}]
						}, {
							xtype : "panel",
							width : 50,
							// height : '100%',
							colspan : 1,
							height : 371,
							layout : {
								type : 'table',
								columns : 1
							},
							items : [{
										xtype : 'button',
										text : '取用',
										id : 'AlarmMultiView.addToUse',
										margin : '5 0 0 5'
									}, {
										xtype : 'button',
										text : '放回',
										id : 'AlarmMultiView.putBack',
										margin : '5 0 0 5'
									}]
						}, {
							xtype : "panel",
							width : 300,
							height : 371,
							// height : '100%',
							colspan : 1,
							layout : {
								type : 'fit'
								// columns : 1
							},
							items : [{
								xtype : 'grid',
								autoScroll : true,
								store : localStore,
								id : 'AlarmMultiView.localField',
								layout : 'fit',
								border : false,
								columnLines : true,
								selModel : Ext
										.create('Ext.selection.CheckboxModel'),
								autoHeight : true,
								columns : [{
											xtype : 'rownumberer',
											text : '序列',
											align : 'center',
											width : 60
										}, {
											text : '模型代码',
											align : 'center',
											dataIndex : 'modelCode',
											flex : 1
										}, {
											text : '模型名称',
											align : 'center',
											dataIndex : 'modelName',
											flex : 1
										}]
							}]
						}],
				buttons : [{
					height : 25,
					text : '保存',
					action : 'save'
						// id : 'disparth_task_save'
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
		store.load();
		var viewGrid = Ext.getCmp('multiViewGrid');
		var cartGrid = Ext.getCmp('AlarmMultiView.localField');
		var ContentObject = Ext.decode(me.storeContent);
		var putButton = Ext.getCmp('AlarmMultiView.addToUse');
		var rmvButton = Ext.getCmp('AlarmMultiView.putBack');
		if (ContentObject.length >= 1) {
			// Ext.MessageBox.alert('' + ContentObject.length, '');
			localStore.loadData(ContentObject);
		}
		putButton.on('click', function() {
					var Selections = viewGrid.getSelectionModel()
							.getSelection();
					// debugger;
					// Ext.MessageBox.alert(Selections[0].data.modelCode, 'a');
					for (var i = 0; i < Selections.length; i++) {
						singlePut(Selections[i]);
					}
					CheckRows();
				});
		rmvButton.on('click', function() {
					var Selections = cartGrid.getSelectionModel()
							.getSelection();
					for (var i = 0; i < Selections.length; i++) {
						singleRemove(Selections[i]);
					}
					CheckRows();
				});
		store.on('load', function() {
					var gridcount = 0;
					store.each(function(rLeft) {
								var currentModelCode = rLeft.get('modelCode');
								localStore.each(function(rRight) {
											var localModelCode = rRight
													.get('modelCode');
											if (currentModelCode == localModelCode) {
												// Ext.MessageBox.alert('',
												// 'a');
												viewGrid.getView().addRowCls(
														gridcount,
														'x-grid-record-gray');
												rLeft.data.used = 1;
												return false;
											}
										});
								gridcount++;
							});
				});
		viewGrid.on('itemdblclick', function(view, record, item, index, e) {
					// Ext.MessageBox.alert('', '');
					//debugger;
					if (record.data.used != 1) {
						var flag = true;// 是否重复的标记
						localStore.each(function(r) {
									if (r.get('modelCode') == record.data.modelCode) {
										flag = false;
										return false;// 作用相当于break
									}
								});
						if (flag) {
							record.index='';
							localStore.add(record);
						}
						record.data.used = 1;
					} else {
						localStore.each(function(r) {
									if (r.get('modelCode') == record.data.modelCode) {
										localStore.remove(r);
										record.data.used = 0;
										return false;
									}
								});

					}
					// viewGrid.getSelectionModel().setLocked(true);
					CheckRows();
				});
		cartGrid.on('itemdblclick', function(view, record, item, index, e) {
					var gridcount = 0;
					store.each(function(r) {
								if (r.get('modelCode') == record.data.modelCode) {
									viewGrid.getView().removeRowCls(gridcount,
											'x-grid-record-gray');
									r.data.used = 0;
									localStore.remove(record);
								}
								gridcount++;
							});
					cartGrid.getView().refresh();
				});
		var CheckRows = function() {
			var gridcount = 0;
			store.each(function(r) {
						if (r.get('used') == 1) {
							viewGrid.getView().addRowCls(gridcount,
									'x-grid-record-gray');
						} else {
							viewGrid.getView().removeRowCls(gridcount,
									'x-grid-record-gray');
						}
						gridcount = gridcount + 1;
					});
			cartGrid.getView().refresh();
		}
		var singlePut = function(record) {
			// Ext.MessageBox.alert('', '');
			if (record.data.used != 1) {
				var flag = true;// 是否重复的标记
				localStore.each(function(r) {
							if (r.get('modelCode') == record.data.modelCode) {
								flag = false;
								return false;// 作用相当于break
							}
						});
				if (flag) {
					localStore.add(record);
				}
				record.data.used = 1;
			}
		}
		var singleRemove = function(record) {
			var gridcount = 0;
			store.each(function(r) {
						if (r.get('modelCode') == record.data.modelCode) {
							viewGrid.getView().removeRowCls(gridcount,
									'x-grid-record-gray');
							r.data.used = 0;
							localStore.remove(record);
						}
						gridcount++;
					});

		}
	}
});