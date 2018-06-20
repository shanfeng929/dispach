Ext.define(projectName
				+ '.view.dispatch.parameters.parametersLib.parametersProcLib',
		{
			extend : 'Ext.form.FormPanel',
			id : 'parametersProcLib',
			alias : 'widget.parametersProcLib',

			initComponent : function() {
				var me = this;
				Ext.applyIf(me, {
							items : [{
										xtype : 'container',
										layout : {
											type : 'table',
											columns : 1
										},
										items : [{
													xtype : 'textfield',
													id : 'para_proc_name',
													name : 'para_proc_name',
													fieldLabel : '程序名（输入）',
													width : 500,
													margin : '25 15 15 15'
												}, {
													xtype : 'textfield',
													id : 'para_proc_result',
													name : 'para_proc_result',
													fieldLabel : '结  果（输出）',
													width : 500,
													margin : '15 15 15 15'
												}]
									}],
							buttons : [{
										height : 25,
										text : '确认',
										action : 'enter',
										iconCls : 'icon-save',
										id : 'para_proc_save'
									}, {
										height : 25,
										text : '关闭',
										iconCls : 'icon-reset',
										handler : function() {
											parent.Ext
													.getCmp('parametersLibForm')
													.close();
										}
									}]

						})
				me.callParent(arguments);
				// 后面是输入框监听
				var ctn = me.getComponent(0);
				var input_field = ctn.getComponent('para_proc_name');
				var output_field = ctn.getComponent('para_proc_result');
				input_field.on('change', function() {
							var value = input_field.getValue();
							if (value != null && value != '') {
								output_field.setValue('`ps -A |grep ' + value
										+ ' | awk \'{print $1}\'`');
										//ps -A |grep "java"| awk '{print $1}'
							} else
								output_field.setValue('');
						});

			}
		})
