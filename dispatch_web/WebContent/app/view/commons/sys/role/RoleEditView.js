Ext.define(projectName + '.view.commons.sys.role.RoleEditView', {
	extend : 'Ext.window.Window',
	alias : 'widget.roleEdit',
	requires : [ 'Ext.ux.form.ItemSelector' ],
	id : 'roleEdit',
	title : '新增角色',
	height : 385,
	width : 500,
	modal : true, 
	resizable : true,
	initComponent : function() {
		var me = this;
		var roleStore = Ext.create(projectName + '.store.commons.sys.roles.RoleAuthorityStore');
		roleStore.load();
		Ext.applyIf(me, {
			items : [ {
				xtype : 'form',
				region : 'center',
				id : 'roleForm',
				items : [ {
					xtype : 'container',
					defaultType : 'textfield',
					items : [ {
						xtype : 'container',
						layout : {
							type : 'table',
							columns : 2
						},
						items : [ {
							xtype : 'hiddenfield',
							name : 'id',
							id : 'sys_role_edit_tf_id',
							hidden : 'true'
						}, {
							xtype : 'textfield',
							name : 'name',
							fieldLabel : '名称<font color=red>*</font>',
							id : 'name',
							margin : '5 15 0 10',
							allowBlank : false,
							labelWidth : 40
						}, {
							xtype : 'textfield',
							name : 'code',
							fieldLabel : '编码<font color="red">*</font>',
							id : 'code',
							margin : '5 15 0 10',
							allowBlank : false,
							labelWidth : 40
						}, {
							xtype : 'textfield',
							name : 'description',
							fieldLabel : '描述',
							id : 'description',
							margin : '5 15 0 10',
							allowBlank : false,
							labelWidth : 40
						}]
					}, {
						xtype : 'tabpanel',
						plain : true,
						activeTab : 0,
						layout : 'fit',
						height : 250,
						margin : '10 0 0 0',
						defaults : {
							border : 0,
							fieldStyle : 'background-image: none;'
						},
						items : [ {
							title : '权限分配<font color="red">*</font>',
							layout : 'fit',
							height : 250,
							items : [ {
								id : 'sys_role_edit_items_auths',
								xtype : 'itemselector',
								store : roleStore,
								displayField : 'name',
								valueField : 'id',
								allowBlank : false,
								msgTarget : 'side',
								fromTitle : '未选权限',
								toTitle : '已选权限',
								blankText : '请选权限'
							} ]
						} ]
					} ]
				} ],
				buttons : [ {
					height : 25,
					text : '保存',
					action : 'saveRole',
					iconCls: 'icon-save ',
					id : 'sys_role_edit_tf_save'
				}, {
					height : 25,
					text : '关闭',
					iconCls: 'icon-reset',
					handler : function() {
						me.close();
					}
				} ]
			} ]
		});
		me.callParent(arguments);
	}
});