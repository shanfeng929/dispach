Ext.define(projectName + '.view.dispatch.etldispatch.ops.AlarmTitleView', {
			extend : 'Ext.window.Window',
			alias : 'widget.alarmTitleView',
			title : '预警主题选择',
			width : 247,
			height : 400,
			labelAlign : "right",
			modal : true, // 是否为模态窗口
			defaults : {
				margin : '5 5 5 10',
				fieldStyle : 'background-color: #DFE9F6;background-image: none;'
			},
			bodyStyle : 'padding:5px',
			resizable : false,
			initComponent : function() {
				var me = this;
				var titleStore = Ext.create('Ext.data.TreeStore', {
							valueField : 'id',
							fields : ["children", "parentId", "leaf",
									"checked", "id", "title", "titleLevel"],
							model : projectName
									+ '.model.dispatch.etlflowdispatch.ops.TitleModel',
							displayField : 'title',
							proxy : {
								type : 'ajax',
								url : basePath
										+ '/transmit/modeltitle/modelTitleList'
							}
						});
				Ext.applyIf(me, {
							items : [{
										xtype : "container",
										plain : true,
										height : '100%',
										defaultType : "panel",
										bodyStyle : "padding:5px;",
										layout : {
											type : 'hbox',
											align : 'middle',
											pack : 'center'
										},
										region : 'center',
										items : [{
													xtype : 'modelTree',
													itemId : 'alarmtitleSelector',
													valueField : 'id',
													height : 324,
													layout : 'fit',
													width : '120%',
													margin : '10 0 10 0',
													id : 'alarmtitleSelector',
													displayField : 'title',
													title : '主题',
													enableTabScroll : true,
													store : titleStore
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
			}
		})