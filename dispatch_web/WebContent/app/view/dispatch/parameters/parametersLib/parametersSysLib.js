Ext.define(projectName
				+ '.view.dispatch.parameters.parametersLib.parametersSysLib', {
			extend : 'Ext.form.FormPanel',
			id : 'parameterSysLib',
			alias : 'widget.parametersSysLib',

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
				var value_store = Ext.create(projectName
						+ '.store.dispatch.parameters.ParametersCustomStore');
				Ext.applyIf(me, {
							items : [{
										xtype : 'container',
										layout : {
											type : 'table',
											columns : 2
										},
										items : [{
													xtype : 'combo',
													id : 'para_sys_type',
													fieldLabel : '参数类型',
													store : type_store,
													// editable : false,
													displayField : 'para_type_name',
													margin : '25 5 5 15'
												}, {
													xtype : 'combo',
													id : 'para_sys_name',
													fieldLabel : '参数名称',
													store : value_store,
													editable : false,
													displayField : 'custom_para_name',
													margin : '25 15 5 0'
												}, {
													xtype : 'textfield',
													id : 'para_sys_result',
													fieldLabel : '结果',
													margin : '35 10 5 15',
													width : 500,
													colspan : 2
												}, {
													xtype : 'button',
													id : 'para_sys_edit_or_delete',
													text : '修改或删除本条',
													action : 'edit',
													width : 200,
													margin : '25 10 5 25'
												}, {
													xtype : 'button',
													id : 'para_sys_add',
													text : '新增一条',
													action : 'add',
													width : 200,
													margin : '25 10 5 25'
												}]
									}],
							buttons : [{
										height : 25,
										text : '确认',
										action : 'enter',
										iconCls : 'icon-save',
										id : 'para_sys_save'
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
				// 以下是监听事件
				var ctn = me.getComponent(0);
				var cb1 = ctn.getComponent('para_sys_type');
				var cb2 = ctn.getComponent('para_sys_name');
				var lastSelect = null;
				var selfunction = function() {
					var textbox = ctn.getComponent('para_sys_result');
					var index = cb2.store.find('custom_para_name', cb2
									.getValue());
					textbox.setValue(cb2.store.getAt(index)
							.get('custom_para_value'));
				};
				var cb1ChangeFunction = function() {
					Ext.apply(cb2.store.proxy.extraParams, {
								'custom_para_type' : encodeURI(cb1.getValue())
							});
					// debugger;
					cb2.getStore().load({ // load未完成也会继续执行下面的语句，所以一定要放在callback里
						callback : function(records, options, success) {
							if (cb2.store.data.length != 0) {
								cb2.select(cb2.store.getAt(0)
										.get('custom_para_name'));
								selfunction();
							} else {
								cb2.setValue('');
							}
						}
					});
				};
				cb1.on('change', cb1ChangeFunction);

				cb2.on('select', selfunction);
				cb1.select('系统');
				Ext.applyIf(me, {
							selfunction : selfunction
						});
			}
		})