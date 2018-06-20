// 自定义参数编辑框
Ext.define(projectName
				+ '.view.dispatch.parameters.parametersLib.parametersSysEdit',
		{
			extend : 'Ext.window.Window',
			id : 'parameterSysEdit',
			alias : 'widget.parametersSysEdit',
			modal : true,
			layout : 'fit',
			height : 320,
			width : 460,

			initComponent : function() {
				var me = this;
				var type_store = new Ext.data.Store({
							fields : ['para_type_name'],
							autoLoad : false,
							data : [{
										'para_type_name' : '系统'
									}, {
										'para_type_name' : '网络'
									}, {
										'para_type_name' : '自定义1'
									}, {
										'para_type_name' : '自定义2'
									}, {
										'para_type_name' : '自定义3'
									}]
						});
				Ext.applyIf(me, {
					items : [{
						xtype : 'form',
						id : 'custom_para_Form',
						width : 460,
						fieldDefaults : {
							labelAlign : 'left',
							msgTarget : 'side'
						},
						items : [{
									xtype : 'container',
									layout : {
										type : 'table',
										columns : 1
									},
									items : [{
												xtype : 'combo',
												id : 'para_sys_type_edit',
												name : 'custom_para_type',
												fieldLabel : '参数类型',
												editable : false,
												value : '系统',
												store : type_store,
												displayField : 'para_type_name',
												margin : '25 5 5 15'
											}, {
												xtype : 'textfield',
												id : 'para_sys_name_edit',
												name : 'custom_para_name',
												fieldLabel : '参数名称<font color=red>*</font>',
												// disabled : true,
												// editable : false,
												// store : value_store,
												displayField : 'custom_para_name',
												margin : '25 5 5 15'
											}, {
												xtype : 'textfield',
												name : 'custom_para_value',
												id : 'para_sys_value_edit',
												fieldLabel : '参数值<font color=red>*</font>',
												margin : '25 5 5 15',
												width : 300,
												colspan : 2
											}]
								}],
						buttons : [{
									height : 25,
									text : '保存',
									action : 'save',
									iconCls : 'icon-save',
									id : 'para_sys_edit_save'
								}, {
									height : 25,
									text : '关闭',
									iconCls : 'icon-reset',
									handler : function() {
										me.close();
									}
								}]
					}]
				});
				me.callParent(arguments);
			}
		});