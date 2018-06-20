Ext.define(projectName + '.view.commons.sys.user.ModifyPassView', {
	extend : 'Ext.window.Window',
	alias : 'widget.passModify',
	requires : {},
	id : 'modifyPass',
	title : '密码修改',
	modal : true,
	resizable : false,
	layout : 'fit',
	width : 280,
	height : 200,
	defaults : {
		margin : 5,
		fieldStyle : 'background-color: #DFE9F6;background-image: none;'
	},
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items : [{
				xtype : 'form',
				id : 'userPassModifyForm',
				width : 300,
				fieldDefaults : {
					labelAlign : 'center',
					msgTarget : 'side'
				},
				items : [{
							xtype : 'container',
							layout :{
								type : 'table',
								columns :  1
							},
							items : [{
										xtype : 'textfield',
										name : 'password',
										fieldLabel : '原始密码<font color=red>*</font>',
										allowBlank : false,
										inputType : 'password',
										margin : 5,
										labelWidth : 80
									}, {
										xtype : 'textfield',
										name : 'newPassword',
										fieldLabel : '新设密码<font color="red">*</font>',
										allowBlank : false,
										inputType : 'password',
										margin : 5,
										labelWidth : 80
									}, {
										xtype : 'textfield',
										name : 'repeatpassword',
										fieldLabel : '确认密码<font color="red">*</font>',
										allowBlank : false,
										inputType : 'password',
										margin : 5,
										labelWidth : 80
									}

							]
						}],
				buttons : [{
							height : 25,
							text : '保存',
							iconCls:'save',
							action : 'save'
						}, {
							height : 25,
							text : '取消',
							iconCls: 'exit',
							handler : function() {
								me.close();
							}
						}]
			}]
		});
		me.callParent(arguments);
	}

});