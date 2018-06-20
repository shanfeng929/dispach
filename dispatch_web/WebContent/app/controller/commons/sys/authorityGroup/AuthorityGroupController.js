Ext.define(projectName + '.controller.commons.sys.authorityGroup.AuthorityGroupController', {
    extend: 'Ext.app.Controller',
    views: [
    'commons.sys.authorityGroup.AuthorityGroupListView',
    'commons.sys.authorityGroup.AuthorityGroupFormView'
    ],
    refs: [
        {ref: 'authorityGroupList',selector: 'authorityGroupList' },
        {ref:'authorityGroupForm',selector:'authorityGroupForm'}
    ],
    init: function() {//页面初始化
    	this.control({
    		'authorityGroupList':{boxready:this.onAuthorityGroupListReady},
    		'authorityGroupList almTreePanel[id=authorityGroupTree]':{itemclick:this.authorityGroupTreeClick},
    		'authorityGroupForm button[action=save]': {click: this.save_authorityGroup_btn}
    	});
    },
    onAuthorityGroupListReady:function(){
    	var j = Ext.getCmp('save1').setVisible(false);
    },
    authorityGroupTreeClick:function(tree,record){
    	Ext.getCmp('save1').setVisible(false);
    	var id=record.raw.id;
    	var parentId=record.raw.parent_id;
    	var authorityGroupForm=this.getAuthorityGroupForm().getComponent("authorityGroupForm");
    	authorityGroupForm.form.findField("id").setValue(record.raw.id);
    	authorityGroupForm.form.findField("leaf").setValue(record.raw.leaf);
    	authorityGroupForm.form.findField("dataStatus").setValue(record.raw.dataStatus);
    	authorityGroupForm.form.findField("parentId").setValue(record.raw.parent_id);
    	authorityGroupForm.form.findField("name").setValue(record.raw.text).setReadOnly(true);
    	authorityGroupForm.form.findField("code").setValue(record.raw.code).setReadOnly(true);
    	authorityGroupForm.form.findField("description").setValue(record.raw.des).setReadOnly(true);
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
        				Ext.getCmp('sys_user_edit_items_authoritys').setDisabled(true);
    				},failure:function(response){
    				}
    				
    	});
    	}
    },
    save_authorityGroup_btn:function(){
    	var viewForm=this.getAuthorityGroupForm();
    	var viewTree=this.getAuthorityGroupList().getComponent("authorityGroupTree");
    	var form=viewForm.getComponent('authorityGroupForm').getForm();
    	form.submit({
    		url: basePath+'/commons/authorityGroup/saveOrUpdateAuthorityGroup',
    		success: function (form,action) {
    			alert(action.result.message);
    			viewTree.store.load();
    		},failure: function (form,action) {
    			alert(action.result.message);
    			if(action.result.message="权限组名称重复"){
    				Ext.getCmp('authorityGroupName').setValue("");
    			}else{
//    				store.load();
    			}
    		}
    	});
    }
  
});