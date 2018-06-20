Ext.define(projectName + '.commons.sys.user.UserEditView',{
		extend : 'Ext.window.Window',
		alias : 'widget.userEdit',
		requires : [ 'Ext.ux.form.ItemSelector',
		             projectName + '.lib.component.OrganTreeComboBox',
		             projectName + '.lib.component.UserGroupTreeComboBox' ],
		id : 'userEdit',
		title : '新增用户',
		modal : true,
		resizable : false,
		layout : 'fit',
		height : 460,
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
			var roleStore = Ext.create(projectName + '.store.commons.sys.role.RoleUserStore');
			roleStore.load();
			Ext.applyIf(me,{
				items : [ {
						xtype : 'form',
						id : 'userForm',
						width : 520,
						fieldDefaults : {
							labelAlign : 'left',
							msgTarget : 'side'
						},
						items : [
								{
									xtype : 'container',
									layout : {
										type : 'table',
										columns : 2
									},
									defaultType : 'textfield',
									items : [
											{
												xtype : 'hiddenfield',
												name : 'id',
												id : 'sys_user_edit_tf_id'
											},
											{
												xtype : 'hiddenfield',
												id : 'organNumber',
												name : 'organNumber'
											},
											{
												xtype : 'organTreeCombo',
												organValueField : 'id',
												hiddenOrganId : 'organNumber',
												name : 'organCode',
												fieldLabel : '所属机构<font color=red>*</font>',
												id : 'sys_user_edit_tf_organName',
												allowBlank : false,
												labelWidth : 70,
												width : 490,
												height : 28,
												margin : 5,
												storeCallBackDatas : me.storeCallBackDatas,
												isSelf : me.isSelf,
												gridViewKey : me.gridViewKey,
												config : {
													isEdit : me.config.isEdit
												},
												colspan : 2
											},
											{
												xtype : 'textfield',
												name : 'userName',
												fieldLabel : '登录名称<font color=red>*</font>',
												id : 'sys_user_edit_tf_userName',
												allowBlank : false,
												blankText : '登录名不能为空',
												labelWidth : 70,
												margin : 5,
												enforceMaxLength : true,
												maxLength : 30
//												listeners : {
//													blur : function(r){
//														var regex = /[^\x00-\xff]/g;
//														if(r.getValue().replace(regex,'**').length > 30){
//															Ext.example.msg("提示","登录名不能超过30个字符,请重新输入！");
//															r.setValue('');
//														}
//													}
//												}
											},
											{
												xtype : 'textfield',
												name : 'realName',
												fieldLabel : '真实姓名<font color="red">*</font>',
												id : 'sys_user_edit_tf_realName',
												allowBlank : false,
												labelWidth : 70,
												margin : 5,
												enforceMaxLength : true,
												maxLength : 30
//												listeners : {
//													blur : function(r){
//														var regex = /[^\x00-\xff]/g;
//														if(r.getValue().replace(regex,'**').length > 30){
//															Ext.example.msg("提示","输入字符过长，请重新输入！");
//															r.setValue('');
//														}
//													}
//												}
											},
											{
												xtype : 'textfield',
												name : 'password',
												fieldLabel : '登录密码<font color="red">*</font>',
												id : 'sys_user_edit_tf_passwd',
												allowBlank : false,
												readOnly : false,
												inputType : 'password',
												labelWidth : 70,
												margin : 5,
												enforceMaxLength : true,
//												maxLength : 12,
												minLength : 3,
												listeners : {
													blur : function(r){
														var regex = /[^\x00-\xff]/g;
														if(r.getValue.length !=60){
															
															if(r.getValue().replace(regex,'**').length<3||r.getValue().replace(regex,'**').length > 12){
																Ext.example.msg("提示","密码长度需要控制在3-12个字符，请重新输入！");
																r.setValue('');
															}
														}
													}
												}
											},
											{
												xtype : 'textfield',
												name : 'post',
												id : 'sys_user_edit_tf_post',
												fieldLabel : '邮箱地址',
												labelWidth : 70,
												margin : 5,
//												regex : /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
//												regexText : '请输入正确的邮箱格式',
												vtype : 'email',
												enforceMaxLength : true,
												maxLength : 30
//												listeners : {
//													blur : function(r){
//														var regex = /[^\x00-\xff]/g;
//														if(r.getValue().replace(regex,'**').length > 75){
//															Ext.example.msg("提示","输入字符过长，请重新输入！");
//															r.setValue('');
//														}
//													}
//												}
											},
											{
												xtype : 'textfield',
												name : 'phone',
												id : 'sys_user_edit_tf_phone',
												fieldLabel : '联系电话',
												labelWidth : 70,
												margin : 5,
												colspan : 2,
												enforceMaxLength : true,
												maxLength : 13,
												regex : /(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/
//												listeners : {
//													blur : function(r){
//														var regex = /[^\x00-\xff]/g;
//														if(r.getValue().replace(regex,'**').length > 13){
//															Ext.example.msg("提示","请输入正确的电话号码！");
//															r.setValue('');
//														}
//													}
//												}
											},
											{
												xtype : 'hiddenfield',
												id : 'userGroupNumber',
												name : 'userGroupNumber',
												hidden : true
											}/*
											{
												xtype : 'userGroupTreeCombo',
												organValueField : 'id',
												hiddenOrganId : 'userGroupNumber',
												id : 'sys_user_edit_tf_userGroup',
												name : 'userGroupTree',
												fieldLabel : '用户组<font color=red>*</font>',
												allowBlank : false,
												blankText : '此项不能为空',
												hidden:true,
												labelWidth : 70,
												width : 490,
												margin : 5,
												colspan : 2,
												storeCallBackDatas : me.storeCallBackDatas,
												isSelf : me.isSelf,
												gridViewKey : me.gridViewKey,
												config : {
													isEdit : me.config.isEdit
												}
											} */]
											},
											{
												xtype : 'tabpanel',
												plain : true,
												activeTab : 0,
												layout : 'fit',
												height : 200,
												defaults : {
													border : 0,
													fieldStyle : 'background-image: none'
												},
												items : [ {
													title : '角色分配<font color="red">*</font>',
													layout : 'fit',
													height : 300,
													items : [ {
														name : 'rols',
														id : 'sys_user_edit_items_roles',
														xtype : 'itemselector',
														store : roleStore,
														displayField : 'name',
														valueField : 'id',
														allowBlank : false,
														msgTarget : 'side',
														fromTitle : '未选角色',
														toTitle : '已选角色',
														blankText : '请选择角色'
													} ]
												} ]
											}

									],
									buttons : [
											{
												height : 25,
												text : '保存',
												action : 'save',
												iconCls : 'icon-save',
												id : 'sys_user_edit_tf_save'
											},
											{
												height : 25,
												text : '关闭',
												iconCls : 'icon-reset',
												handler : function() {
													me.close();
												}
											} ]
								} ]
							});
			me.callParent(arguments);
		}
	});