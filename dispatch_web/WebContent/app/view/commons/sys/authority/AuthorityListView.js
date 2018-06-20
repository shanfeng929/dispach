/**
 * 权限List
 */
Ext.define(projectName +'.commons.sys.authority.AuthorityListView' ,{
    extend: 'Ext.panel.Panel',
    alias: 'widget.authorityList',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    id:'authorityList',
    requires:[
    			projectName +'.view.commons.sys.authority.AuthorityFormView',
    			projectName +'.lib.component.AlmTreePanel'
    		],
	   initComponent:function() {
			var me = this;
			var store=Ext.create(projectName +'.store.commons.sys.authority.AuthorityTreeStore');
			Ext.applyIf(me, {
				items : [
					{
						xtype : 'almTreePanel',
						region:'west',
						id : 'authorityTree',
						store:store,
						isHidden:true,
						width : '20%',
						contextMenus : [{
							text : '修改',
							itemId : 'editAuth',
							handlerFunction : function(rec, item) {
								var id=rec.raw.id;
//								console.log(id);
								if(rec.data.id == undefined){
	    							alert(DISPATCH.lib.Constants.MSG_SELECT_CHILD_NODE);
    							}
								var authorityForm = Ext.getCmp('authorityFormId');
						    	authorityForm.form.findField("id").setValue(rec.raw.id);
						    	authorityForm.form.findField("dataStatus").setValue(rec.raw.dataStatus);
						    	authorityForm.form.findField("name").setValue(rec.raw.text).setReadOnly(false);
						    	authorityForm.form.findField("code").setValue(rec.raw.code).setReadOnly(false);
//						    	authorityForm.form.findField("type").setValue(rec.raw.type).setReadOnly(false);
						    	authorityForm.form.findField("description").setValue(rec.raw.description).setReadOnly(false);
						    	Ext.getCmp('authority_btn').setVisible(true);
//						    	var tree = Ext.getCmp('sys_auth_edit_items_opeas').setDisabled(false);
						    	var menuTree = Ext.getCmp('sys_auth_edit_items_menus').setDisabled(false);
//						    	Ext.apply(tree.store.proxy.extraParams,{
//									'authId' :id
//								});
//						    	tree.getStore().load();
						    	Ext.apply(menuTree.store.proxy.extraParams,{
									'authId' :id
								});
						    	menuTree.getStore().load();
							}
						}
						, {
							text : '新建',
							itemId : 'addAuth',
							handlerFunction : function(rec, item) {
								 var authorityForm = Ext.getCmp('authorityFormId');
								 authorityForm.form.findField('id').setValue(null);
								 authorityForm.form.findField('dataStatus').setValue('0').setReadOnly(false);
								 authorityForm.form.findField('name').setValue('').setReadOnly(false);
								 authorityForm.form.findField('code').setValue('').setReadOnly(false);
//								 authorityForm.form.findField('type').setValue('').setReadOnly(false);
								 authorityForm.form.findField('description').setValue('').setReadOnly(false);
//								 Ext.getCmp('sys_auth_edit_items_opeas').setDisabled(false);
								 Ext.getCmp('sys_auth_edit_items_menus').setDisabled(false);
								 Ext.getCmp('authority_btn').setVisible(true);
								 //authorityForm.form.findField('sys_auth_edit_items_menus').setValue('');
								 //authorityForm.form.findField('sys_auth_edit_items_opeas').setValue('');
							}
						}, {
							text : '删除',
							itemId : 'authDelete',
							handlerFunction : function(rec, item) {
								var authId = rec.raw.id;
								var leaf = rec.raw.leaf;
								if (leaf == 0) {
									return;
								}
								Ext.MessageBox.confirm(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_DELETE_CONFIRM, function(btn, text){
					    			if (btn == 'yes'){
					    				var authorityTree = Ext.getCmp('authorityTree');
								    	Ext.Ajax.request({
											url:basePath+'/commons/auth/delete',
											params:{
							      		 		'authId':authId
							      		 	},
											success:function(response,resgsp){
												var json=Ext.decode(response.responseText);
									 		Ext.Msg.show({
												title : DISPATCH.lib.Constants.MSG_TITLE_INFO,
												msg : json.message,
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.INFO
											});
												authorityTree.store.load();
											}
										});
								     }							    									    			
					    		});
							}
						}]
					}, {
						xtype : 'authorityForm',
						width : '80%'
					}]
			});
		me.callParent(arguments);
	}
});
