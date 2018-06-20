Ext.define(projectName + '.view.dispatch.parameters.parametersEditView', {
	extend : 'Ext.window.Window',
	alias : 'widget.parametersEdit',
	// requires : [ 'Ext.ux.form.ItemSelector'],
	id : 'remoteserviceEdit',
	title : '参数配置',
	modal : true,
	resizable : false,
	layout : 'fit',
	height : 420,
	width : 560,
	initComponent : function() {
		var me = this;
		var para_type_store = new Ext.data.Store({
					fields : ['para_type'],
					autoLoad : false,
					data : [{
								'para_type' : '文本'
							},{
								'para_type' : '数值'
							}, {
								'para_type' : '日期与时间'
							}, {
								'para_type' : '路径与文件'
							}, {
								'para_type' : '服务器地址'
							}, {
								'para_type' : '节点名称'
							}]
				});
		Ext.applyIf(me, {
			items : [{
				xtype : 'form',
				id : 'parametersForm',
				width : 560,
				fieldDefaults : {
					labelAlign : 'left',
					msgTarget : 'side'
				},
				items : [{
					xtype : 'container',
					layout : {
						type : 'table',
						columns : 2
					},
					items : [{
								xtype : 'hiddenfield',
								name : 'para_id',
								id : 'parameters_id'
							}, {
								xtype : 'textfield',
								name : 'para_name',
								fieldLabel : '参数名称<font color=red>*</font>',
								id : 'parameters_name',
								allowBlank : false,
								regex : /^[a-zA-Z_][a-zA-Z0-9_]*$/,
								regexText : '请输入符合linux参数名规则的字符串，以下划线或英文开头，可包含数字。',
								blankText : '参数名称不能为空',
								margin : '25 10 5 15',
								enforceMaxLength : true,
								maxLength : 100
							}, {
								xtype : 'textfield',
								name : 'para_comment',
								fieldLabel : '参数描述',
								id : 'parameters_comment',
								allowBlank : true,
								margin : '25 10 5 15',
								enforceMaxLength : true,
								maxLength : 100
							}, {
								id : 'para_type',
								xtype : 'combo',
								name : 'para_type',
								fieldLabel : '参数类型',
								value : '文本',
								margin : '15 10 5 15',
								displayField : 'para_type',
								editable : false,
								allowBlank : false,
								store : para_type_store
							}, {
								// 可以为空，如果为空设为null
								xtype : 'textfield',
								name : 'para_value',
								fieldLabel : '参数值',
								margin : '15 10 5 15',
								id : 'para_value_field',
								allowBlank : true,
								maxLength : 512
							}, {
								xtype : 'fieldset',
								title : '转义',
								name : 'static_para_box',
								autoHeight : true,
								defaultType : 'radio',
								hideLabels : true,
								margin : '15 10 5 15',
								items : [{
											boxLabel : '正常(可能会被转义)',
											name : 'static_para',
											inputValue : '0',
											checked : true
										}, {
											boxLabel : '不要转义',
											name : 'static_para',
											inputValue : '1'
										}]
							}, {
								xtype : 'button',
								iconCls : 'icon-edit',
								iconAlign : 'left',
								text : '常用参数快捷设置',
								action : 'libOpen',
								width : 180,
								// height : 35,
								margin : '20 10 5 50'
							}]
				}],
				buttons : [{
							height : 25,
							text : '保存',
							action : 'save',
							iconCls : 'icon-save',
							id : 'parameters_edit_save'
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