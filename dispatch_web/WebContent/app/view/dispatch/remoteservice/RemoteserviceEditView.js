/**
 * 远程服务配置编辑页面
 */
Ext.define(projectName + '.view.dispatch.remoteservice.RemoteserviceEditView',{
	extend : 'Ext.window.Window',
	alias : 'widget.remoteserviceEdit',
//	requires : [ 'Ext.ux.form.ItemSelector'],
	id : 'remoteserviceEdit',
	title : '新增远程服务配置',
	modal : true,
	resizable : false,
	layout : 'fit',
	height : 300,
	config : {
		isEdit : false
	},
	storeCallBackDatas : [],
	gridViewKey : '',
	isSelf : false,
	defaults : {
				fieldStyle : 'background-color: #DFE9F6;background-image: none'
	},
	initComponent : function() {
		var me = this;
		/*var serviceTypeStore = new Ext.data.Store({  
		    autoLoad : false,  
	        fields:['remoteType'],  
	        data: [  
	            {'remoteType': 'LINUX'},  
	            {'remoteType': 'ORACLE'},
	            {'remoteType': 'MYSQL'}
	        ]  
		});*/
//		serviceTypeStore.load();
		Ext.applyIf(me,{
			items : [ {
					xtype : 'form',
					id : 'remoteserviceForm',
					width : 270,
					fieldDefaults : {
						labelAlign : 'left',
						msgTarget : 'side'
					},
//					items : [{
//						
//								xtype : 'container',
//								layout : {
//									type : 'table',
//									columns : 2
//								},
//								defaultType : 'textfield',
					items : [{
								xtype : 'hiddenfield',
								name : 'id',
								id : 'remoteservice_edit_tf_id'
							},
							{
								xtype : 'textfield',
								name : 'name',
								fieldLabel : '远程服务名称<font color=red>*</font>',
								id : 'remoteservice_tf_name',
								allowBlank : false,
								blankText : '远程服务名称不能为空',
								labelWidth : 90,
								margin : 10,
								enforceMaxLength : true,
								maxLength : 25
							},
//										{
//											xtype : 'textfield',
//											name : 'remoteDesc',
//											id : 'remoteservice_edit_tf_remoteDesc',
//											fieldLabel : '远程服务备注',
//											labelWidth : 90,
//											margin : 5,
//											enforceMaxLength : true,
//											maxLength : 50
//										},
							{
								xtype : 'textfield',
								name : 'remoteIp',
								fieldLabel : '远程服务地址<font color=red>*</font>',
								id : 'remoteservice_edit_tf_remoteIp',
								allowBlank : false,
								blankText : '远程服务地址不能为空',
								labelWidth : 90,
								margin : 10,
								regex : /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/ ,
								enforceMaxLength : true,
								maxLength : 30
							},/*{
								id:'remoteservice_edit_tf_remoteType',
								xtype:'combo',
								fieldLabel:'远程服务类型<font color="red">*</font>',
								name : 'remoteType',
								displayField:'remoteType',
								labelWidth : 90,
								editable:false,
								allowBlank : false,
								emptyText : '选择服务类型', 
								margin : 5,
								store : serviceTypeStore,
								maxLength : 30
							},*/{
								xtype : 'textfield',
								name : 'remoteUserName',
								fieldLabel : '登录名称<font color="red">*</font>',
								id : 'remoteservice_edit_tf_remoteUserName',
								allowBlank : false,
								readOnly : false,
								labelWidth : 90,
								margin : 10,
								enforceMaxLength : true,
								maxLength : 25,
								minLength : 2
							},
							{
								xtype : 'textfield',
								name : 'remotePasswd',
								id : 'remoteservice_edit_tf_remotePasswd',
								fieldLabel : '登录密码<font color=red>*</font>',
								allowBlank : false,
								inputType : 'password',
								labelWidth : 90,
								margin : 10,
								enforceMaxLength : true,
								maxLength : 150
							}/*,{
								xtype : 'textfield',
								name : 'remotePort',
								id : 'remoteservice_edit_tf_remotePort',
								fieldLabel : '端口号',
								labelWidth : 90,
								margin : 5,
								enforceMaxLength : true,
								maxLength : 50
							},{
								xtype : 'textfield',
								name : 'remoteNameSpace',
								id : 'remoteservice_edit_tf_remoteName',
								fieldLabel : '命名空间',
								labelWidth : 90,
								margin : 5,
								enforceMaxLength : true,
								maxLength : 50
							}*/
					]
			}],
			buttons : [{
						height : 25,
						text : '保存',
						action : 'save',
						iconCls : 'icon-save',
						id : 'remoteservice_edit_tf_save'
					},
					{
						height : 25,
						text : '关闭',
						iconCls : 'icon-reset',
						handler : function() {
							me.close();
						}
					}
			]
//				}]
		});
		me.callParent(arguments);
		/*var form=me.down();
		var container=form.down();
		var type=container.down("#remoteservice_edit_tf_remoteType");
		var port=container.down("#remoteservice_edit_tf_remotePort");
		var name=container.down("#remoteservice_edit_tf_remoteName");
		
		type.on("change",function(){
			var typeValue=type.getValue()
			if(typeValue=="MYSQL"||typeValue=="ORACLE"){
				port.setDisabled(false);
				name.setDisabled(false);
			}else{
				port.setDisabled(true);
				name.setDisabled(true);

			}
		});*/
	}
});