Ext.define(projectName
				+ 'view.dispatch.parameters.parametersLib.parametersLibForm', {
			extend : 'Ext.window.Window',
			alias : 'widget.parametersLibForm',
			id : 'parametersLibForm',
			title : '常用变量快捷设置',
			modal : true,
			resizable : false,
			layout : 'fit',
			height : 420,
			width : 560,
			initComponent : function() {
				var me = this;
				Ext.applyIf(me, {
					items : [{
								xtype : 'tabpanel',
								id : 'parameters_select_panel',
								activeTab : 0,
								items : [{
											title : '常用自定义参数获取',
											layout : 'fit',
											items : [{
														xtype : 'parametersSysLib'
													}]
										}, {
											title : '日期设定语句',
											layout : 'fit',
											items : [{
														xtype : 'parametersDateLib'
													}]

										}, {
											title : '进程号查询语句',
											layout : 'fit',
											items : [{
														xtype : 'parametersProcLib'
													}]

										}]
							}]
				})
				me.callParent(arguments);
			}
		});