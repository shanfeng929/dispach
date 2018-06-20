Ext.define(projectName + '.view.commons.sys.userGroup.UserGroupListView',{
	extend:'Ext.panel.Panel',
	alias:'widget.userGroupList',
	requires:[projectName + '.lib.component.AlmTreePanel',
	          projectName + '.view.commons.sys.userGroup.UserGroupFormView'],
	title:'用户组设置',
	layout: {
        type: 'hbox',
        align: 'stretch'
    },
	autoScroll: true,
	initComponent:function(){
		var me = this;
		var store=Ext.create(projectName + '.store.commons.sys.userGroup.UserGroupTreeStore');
		this.items = [{
					xtype:'almTreePanel',
					id:'userGroupTree',
					rootVisible : false,
					isParentItemClick:true,
					name:'userGroupTree',
					store:store,
					width: '20%',
					isHidden:true,
					contextMenus:[
						{
			    	    	 text: '修改',
			    	    	 itemId : 'editUserGroup',
			    	    	 handlerFunction: function(rec,item) {
			    	    	 	var id=rec.raw.id;
			    	    	 	var parentId=rec.raw.parent_id;
								if(rec.raw.id == undefined){
	    							alert(DISPATCH.lib.Constants.MSG_SELECT_CHILD_NODE);
    							}
    							Ext.getCmp('save').setVisible(true);
    							var userGroupForm=Ext.getCmp("userGroupForm");
    							userGroupForm.form.findField("id").setValue(rec.raw.id);
    							userGroupForm.form.findField("leaf").setValue(rec.raw.leaf);
    							userGroupForm.form.findField("dataStatus").setValue(rec.raw.datastatus);
    							userGroupForm.form.findField("parentId").setValue(rec.raw.parent_id);
    							userGroupForm.form.findField("name").setValue(rec.raw.text).setReadOnly(false);
    							userGroupForm.form.findField("code").setValue(rec.raw.code).setReadOnly(false);
    							userGroupForm.form.findField("description").setValue(rec.raw.des).setReadOnly(false);
    							Ext.getCmp('sys_user_edit_items_roles').setDisabled(false);
    							if(parentId!=null){
    							Ext.Ajax.request({
    							url: basePath+'/commons/userGroup/'+id+'/querySelectRole',
    							success:function(response){
    							var json=Ext.decode(response.responseText);
    							var roles=[];
    							for (var i = 0; i < json.listItems.length; i++) {
           				 			roles.push(json.listItems[i].id);
        						}
        						Ext.getCmp('sys_user_edit_items_roles').setValue(roles);
    							},failure:function(response){
    							}
    							});
    							}
    						}
							 
			    	   	},{
							text:'新建',
							itemId:'addUserGroup',
							handlerFunction:function(rec,item){
    							var userGroupForm = Ext.getCmp('userGroupForm');
	    						userGroupForm.form.findField('id').setValue(null);
	    						userGroupForm.form.findField('parentId').setValue(rec.raw.id);
	    						userGroupForm.form.findField('dataStatus').setValue('0');
	    						userGroupForm.form.findField('leaf').setValue('');
	    						userGroupForm.form.findField('name').setValue('').setReadOnly(false);
	    						userGroupForm.form.findField('code').setValue('').setReadOnly(false);
	    						userGroupForm.form.findField('description').setValue('').setReadOnly(false);
	    						userGroupForm.form.findField('sys_user_edit_items_roles').setValue('');
	    						userGroupForm.form.findField('sys_user_edit_items_roles').setDisabled(false);
	    						Ext.getCmp('save').setVisible(true);
							}
						},{
							text:'删除',
							itemId:'deleteUserGroup',
							handlerFunction:function(rec,item){
								var id = rec.raw.id;
								var leaf = rec.raw.leaf;
								if (leaf != true) {
									alert('此用户组含有子机构，不能删除！');
									return ;
								}
					    		Ext.MessageBox.confirm(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_DELETE_CONFIRM, function(btn, text){
					    			if (btn == 'yes'){
					    				var userGroupTree = Ext.getCmp('userGroupTree');
								    	Ext.Ajax.request({
											url:basePath+'/commons/userGroup/'+id+'/deleteUserGroup',
											success:function(response,resgsp){
												var json=Ext.decode(response.responseText);
												Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,json.message);
    											userGroupTree.store.load();
											}
										});
								     }							    									    			
					    		});
							}
						}
					]
				},{
					xtype:'userGroupForm',
					width:'80%'
				}];
		this.callParent(arguments);
	}
	
});