Ext.define(projectName + '.view.dispatch.etldispatch.DataSourceAddView',{
	extend : 'Ext.window.Window',
	alias : 'widget.dataSourceAdd',
//	requires : [ 'Ext.ux.form.ItemSelector'],
	title : '数据源配置',
	modal : true,
	resizable : false,
	layout : 'fit',
	height : 300,
	rec:{},
	defaults : {
				fieldStyle : 'background-color: #DFE9F6;background-image: none'
	},
	initComponent : function() {
		var me = this;
		Ext.applyIf(me,{
			items : [{
				xtype : 'form',
				id : 'dataSourceForm',
				width : 370,
				fieldDefaults : {
					labelAlign : 'left',
					msgTarget : 'side',
					width:350
				},
				items : [{
					xtype : 'hiddenfield',
					name : 'dbId',
					value:this.rec.dbId
				},
				{
					xtype : 'textfield',
					name : 'dbName',
					fieldLabel : '数据源名称<font color=red>*</font>',
					allowBlank : false,
					blankText : '数据源名称不能为空',
					labelWidth : 100,
					margin : 10,
					enforceMaxLength : true,
					maxLength : 50,
					value:this.rec.dbName
				},
				{
					xtype : 'textfield',
					name : 'driverName',
					fieldLabel : '数据源驱动包名<font color=red>*</font>',
					allowBlank : false,
					blankText : '数据源驱动包名不能为空',
					labelWidth : 100,
					margin : 10,
					enforceMaxLength : true,
					maxLength : 50,
					value:this.rec.driverName
				},{
					xtype : 'textfield',
					name : 'dbUrl',
					fieldLabel : '数据源URL链接<font color=red>*</font>',
					allowBlank : false,
					blankText : '数据源URL链接不能为空',
					labelWidth : 100,
					margin : 10,
					enforceMaxLength : true,
					maxLength : 50,
					value:this.rec.dbUrl
				},{
					xtype : 'textfield',
					name : 'userName',
					fieldLabel : '数据源登录账号<font color="red">*</font>',
					allowBlank : false,
					blankText : '数据源登录账号不能为空',
					labelWidth : 100,
					margin : 10,
					enforceMaxLength : true,
					maxLength : 20,
					value:this.rec.userName
				},
				{
					xtype : 'textfield',
					name : 'password',
					fieldLabel : '数据源登录密码<font color=red>*</font>',
					allowBlank : false,
					blankText : '数据源登录密码不能为空',
					inputType : 'password',
					labelWidth : 100,
					margin : 10,
					enforceMaxLength : true,
					maxLength : 150,
					value:this.rec.password
				}],
				buttons : [{
					height : 25,
					text : '测试连接',
					action : 'test_connect',
					iconCls : 'icon-yes'
				},{
					height : 25,
					text : '保存',
					action : 'save',
					iconCls : 'icon-save',
					handler:function(){
						
					}
				},
				{
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