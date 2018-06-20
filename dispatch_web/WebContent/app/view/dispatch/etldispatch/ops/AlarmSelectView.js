Ext.define(projectName + '.view.dispatch.etldispatch.ops.AlarmSelectView', {
			extend : 'Ext.window.Window',
			alias : 'widget.alarmSelectView',
			// requires : ['Ext.ux.form.ItemSelector'],
			title : '预警模型选择',
			width : 1080,
			height : 550,
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
				Ext.applyIf(me, {
							items : [{
										xtype : "container",
										plain : true,
										height : 500,
										defaultType : "panel",
										bodyStyle : "padding:5px;",
										items : [{
													title : '模型选择',
													xtype : 'panel',
													layout : 'hbox',
													height:500,
													items : [{
																// height:Ext.getCmp('tabPanel').getSize().height-30,
																width:'20%',
																height : '100%',
																xtype : 'treeTab'
															}, {
																// height:Ext.getCmp('tabPanel').getSize().height-30,
																// width:Ext.getCmp('tabPanel').getSize().width-245,
																width : '80%',
																xtype : 'modelList'
															}]
												}],
										buttons : [{
													height : 25,
													text : '保存',
													action : 'save'
													//id : 'disparth_task_save'
												}, {
													height : 25,
													text : '退出',
													handler : function() {
														me.close();
													}
												}]
									}

							]
						});
				me.callParent(arguments);
			}
		});