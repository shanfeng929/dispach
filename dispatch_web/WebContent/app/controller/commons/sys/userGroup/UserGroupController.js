Ext.define(projectName + '.controller.commons.sys.userGroup.UserGroupController', {
    extend: 'Ext.app.Controller',
    views: [
    'commons.sys.userGroup.UserGroupListView',
    'commons.sys.userGroup.UserGroupFormView'
    ],
    refs: [
        {ref: 'userGroupList',selector: 'userGroupList' },
        {ref:'userGroupForm',selector:'userGroupForm'}
    ],
    init: function() {//页面初始化
    	this.control({
    		'userGroupList':{boxready:this.onUserGroupListReady},
    		'userGroupList almTreePanel[id=userGroupTree]':{itemclick:this.userGroupTreeClick},
    		'userGroupForm button[action=save]': {click: this.save_userGroup_btn}
    	});
    },
    onUserGroupListReady:function(){
    	var j = Ext.getCmp('save').setVisible(false);
    },
    userGroupTreeClick:function(tree,record){
    	Ext.getCmp('save').setVisible(false);
		var id = record.raw.id;
		var parentId = record.raw.parent_id;
    	var userGroupForm=this.getUserGroupForm().getComponent("userGroupForm");
    	userGroupForm.form.findField("id").setValue(id);
    	userGroupForm.form.findField("leaf").setValue(record.raw.leaf);
    	userGroupForm.form.findField("dataStatus").setValue(record.raw.dataStatus);
    	userGroupForm.form.findField("parentId").setValue(parentId);
    	userGroupForm.form.findField("name").setValue(record.raw.text).setReadOnly(true);
    	userGroupForm.form.findField("code").setValue(record.raw.code).setReadOnly(true);
    	userGroupForm.form.findField("description").setValue(record.raw.des).setReadOnly(true);
    	Ext.getCmp('sys_user_edit_items_roles').setDisabled(true);
    	if(parentId!=null){
    		Ext.Ajax.request({
    				url: basePath+'/commons/userGroup/'+id+'/querySelectRole',
    				success:function(response){
    					var json=Ext.decode(response.responseText);
    					var roles=[];
						if(json.listItems !=null && json.listItems.length>0){
							for (var i = 0; i < json.listItems.length; i++) {
								if(json.listItems[i]!= null && json.listItems[i].id !=null){
									roles.push(json.listItems[i].id);
								}
							}
							Ext.getCmp('sys_user_edit_items_roles').setValue(roles);
						}
    				},failure:function(response){
    				}
    	});
    	}
    	
    	
    },
    save_userGroup_btn:function(){
    	var viewList=this.getUserGroupList();
    	var viewForm=this.getUserGroupForm();
    	var viewTree=this.getUserGroupList().getComponent("userGroupTree");
    	var form=viewForm.getComponent('userGroupForm').getForm();
    	form.submit({
    		url: basePath+'/commons/userGroup/saveOrUpdateUserGroup',
    		success: function (form,action) {
    			Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,action.result.message);
    			Ext.getCmp('save').setVisible(false);
    			Ext.getCmp('sys_user_edit_items_roles').setDisabled(true);
    			viewTree.store.load();
//    			viewList.store.load();
    		},failure: function (form,action) {
    			Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,action.result.message);
    			if(action.result.message="用户组名称重复"){
    				Ext.getCmp('userGroupName').setValue("");
    			}else{
//    				store.load();
    			}
    		}
    	});
    }
});