Ext.define(projectName +'.view.commons.sys.authorityGroup.AuthorityGroupListView',{
	extend:'Ext.panel.Panel',
	alias:'widget.authorityGroupList',
	requires:[projectName +'.lib.component.AlmTreePanel',
	          projectName +'.view.commons.sys.authorityGroup.AuthorityGroupFormView'],
	title:'权限组设置',
	layout: {
        type: 'hbox',
        align: 'stretch'
    },
	autoScroll: true,
	initComponent:function(){
		var me = this;
		var store=Ext.create(projectName +'.store.commons.sys.authorityGroup.AuthorityGroupTreeStore');
		this.items = [{
					xtype:'almTreePanel',
					id:'authorityGroupTree',
					rootVisible : false,
					isParentItemClick:true,
					name:'authorityGroupTree',
					store:store,
					width: '20%',
					isHidden:true,
					contextMenus:[
						{
			    	    	 text: '修改',
			    	    	 itemId : 'editAuhtorityGroup',
			    	    	 handlerFunction: function(rec,item) {
			    	    	 	var id=rec.raw.id;
			    	    	 	var parentId=rec.raw.parent_id;
			    	    	 	//Ext.Msg.alert("111",parentId);
			    	    	 	var authorityGroupForm=Ext.getCmp("authorityGroupForm");
								if(rec.raw.id == undefined){
	    							alert(DISPATCH.lib.Constants.MSG_SELECT_CHILD_NODE);
    							}
    							Ext.getCmp('save1').setVisible(true);
    							authorityGroupForm.form.findField("id").setValue(rec.raw.id);
    							authorityGroupForm.form.findField("leaf").setValue(rec.raw.leaf);
    							authorityGroupForm.form.findField("dataStatus").setValue(rec.raw.dataStatus);
    							authorityGroupForm.form.findField("parentId").setValue(rec.raw.parent_id);
    							authorityGroupForm.form.findField("name").setValue(rec.raw.text).setReadOnly(false);
    							authorityGroupForm.form.findField("code").setValue(rec.raw.code).setReadOnly(false);
    							authorityGroupForm.form.findField("description").setValue(rec.raw.des).setReadOnly(false);
    							if(parentId!=null){
    							Ext.Ajax.request({
    							url: basePath+'/commons/authorityGroup/'+id+'/querySelectedAuthority',
    							success:function(response){
    							var json=Ext.decode(response.responseText);
    							var authoritys = [];
        						for (var i = 0; i < json.listItems.length; i++) {
           				 		authoritys.push(json.listItems[i].id);
        						}
        						Ext.getCmp('sys_user_edit_items_authoritys').setValue(authoritys);
        						Ext.getCmp('sys_user_edit_items_authoritys').setDisabled(false);
    							},failure:function(response){
    							}
    				
    							});
    							}
    						}
							
							 
			    	   	},{
							text:'新建',
							itemId:'addAuthorityGroup',
							handlerFunction:function(rec,item){
    							var authorityGroupForm = Ext.getCmp('authorityGroupForm');
    							Ext.getCmp('save').setVisible(true);
	    						authorityGroupForm.form.findField('id').setValue(null);
	    						authorityGroupForm.form.findField('parentId').setValue(rec.raw.id);
	    						authorityGroupForm.form.findField('dataStatus').setValue('0');
	    						authorityGroupForm.form.findField('leaf').setValue('');
	    						authorityGroupForm.form.findField('name').setValue('').setReadOnly(false);
	    						authorityGroupForm.form.findField('code').setValue('').setReadOnly(false);
	    						authorityGroupForm.form.findField('description').setValue('').setReadOnly(false);
	    						authorityGroupForm.form.findField('sys_user_edit_items_authoritys').setValue('');
	    						authorityGroupForm.form.findField('sys_user_edit_items_authoritys').setDisabled(false);
							}
						},{
							text:'删除',
							itemId:'deleteAuthorityGroup',
							handlerFunction:function(rec,item){
								//console.log(rec.raw);
								var id = rec.raw.id;
								var leaf = rec.raw.leaf;
								if (leaf != true) {
									alert('此权限组含有子机构，不能删除！');
									return ;
								}
					    		Ext.MessageBox.confirm(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_DELETE_CONFIRM, function(btn, text){
					    			if (btn == 'yes'){
					    				var authorityGroupTree = Ext.getCmp('authorityGroupTree');
								    	Ext.Ajax.request({
											url:basePath+'/commons/authorityGroup/'+id+'/deleteAuthorityGroup',
											success:function(response,resgsp){
												var json=Ext.decode(response.responseText);
												alert(json.message);
    											authorityGroupTree.store.load();
											}
										});
								     }							    									    			
					    		});
							}
						}
					]
				},{
					xtype:'authorityGroupForm',
					width:'80%'
				}];
		this.callParent(arguments);
	}
	
});