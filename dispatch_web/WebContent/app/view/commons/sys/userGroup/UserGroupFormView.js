Ext.define(projectName + '.view.commons.sys.userGroup.UserGroupFormView',{
	extend:'Ext.panel.Panel',
	alias:'widget.userGroupForm',
	requires :  ['Ext.ux.form.ItemSelector',projectName + '.lib.component.DictionaryCombox'],
	title:'用户组设置',
	width:1000,
	height:400,
	buttonAlign:'left',
	initComponent:function(){
		var selectUserStore=Ext.create(projectName + '.store.commons.sys.userGroup.UserSelectStore');
		selectUserStore.load();
		var selectRoleStore=Ext.create(projectName + '.store.commons.sys.role.RoleUserStore');
		selectRoleStore.load();
		var me = this;
		this.items = [{
				xtype:'form',
				id:'userGroupForm',
				border:false,
				padding:'5 5 0 5',
				style: 'background-color: #fff;',
//				width:700,
				layout: {
			        type: 'table',
			        columns: 2, //每行有几列
			        tableAttrs: {//默认样式
			            style: "width:100;height:25;"
			        }
		    	},
		    	items:[
		    		{ xtype:'hidden',name:'id'},
		    		{xtype:'hidden',name:'parentId'},
		    		{ xtype:'hidden',name:'dataStatus'},
		    		{ xtype:'hidden',name:'leaf'},
		    		{
		    			xtype:'textfield',
		    			id:'userGroupName',
		    			name: 'name', 
		    			fieldLabel:'名称<font color="red">*</font>',
		    			allowBlank : false,
		    			readOnly:true,
		    			width:270,
		    			labelWidth:40,
		    			margin:'5 15 0 10'
		    		},{
		    			xtype:'textfield',
		    			fieldLabel: '编号<font color="red">*</font>',
		    			name: 'code',
		    			allowBlank:false,
		    			readOnly:true,
		    			width:270,
		    			labelWidth:40,
		    			margin:'5 15 0 10'
		    		},{
		    			xtype:'textarea',
		    			fieldLabel: '描述',
		    			colspan:2,
		    			name: 'description',
		    			readOnly:true,
		    			width:565,
		    			labelWidth:40,
		    			margin:'5 15 10 10'
		    		},
					{
						xtype : 'tabpanel', plain : true, activeTab : 0, 
		    			layout : 'fit', height : 450,
						colspan:2,
						width:570,
						defaults : {
							fieldStyle : 'background-image: none;', 
							defaults : { 
								fieldStyle : 'background-image: none;'
							}
						},
						items : [{
							title : '角色分配<font color="red">*</font>', 
							layout : 'fit', height : 250,
							items : [{
								name : 'roles', id : 'sys_user_edit_items_roles', 
								xtype : 'itemselector',  displayField : 'name',
								disabled:true,
								valueField : 'id', store : selectRoleStore,
								allowBlank : false, msgTarget : 'side',
								fromTitle : '未选角色', toTitle : '已选角色',blankText : '请选择角色'
							}]
						}]
					}
		    	]}
		    	/*,{xtype: 'tabpanel',
                    id:'columnMappingPanel',
                    region: 'center',
                    height : 250,
                    activeTab : 0,
                    layout : 'fit',
                    defaults : { fieldStyle : 'background-image: none;', defaults : {fieldStyle : 'background-image: none;'}},
                    items:[{
                    xtype:'panel', width:500,title:'用户',
                    	items : [ {title : '用户分配<font color="red">*</font>', layout : 'fit', height : 250,
								items : [ {name : 'users', id : 'sys_user_edit_items_users', xtype : 'itemselector',  displayField : 'realName', valueField : 'userId', store : selectUserStore,allowBlank : false, msgTarget : 'side', fromTitle : '未选用户', toTitle : '已选用户',blankText : '请选择用户'
									} ]
								}]
                  	
                    },
                     {
                     xtype:'panel',title:'角色',
                     items : [ {title : '角色分配<font color="red">*</font>', layout : 'fit', height : 250,
								items : [ {name : 'roles', id : 'sys_user_edit_items_roles', xtype : 'itemselector',  displayField : 'name', valueField : 'roleid', store : selectRoleStore,allowBlank : false, msgTarget : 'side', fromTitle : '未选角色', toTitle : '已选角色',blankText : '请选择角色'
									} ]
								}]
                     
                     }]
				}*/
				];
		this.buttons = [
			 {
                text: '保存', 
                id:'save',
                iconCls: 'save',
                action: 'save'
            }
		];
		this.callParent(arguments);
	}
	
});