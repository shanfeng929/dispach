Ext.define(projectName + '.controller.commons.sys.user.UserController', {
    extend: 'Ext.app.Controller',
    views: ['commons.sys.user.UserListView', 'commons.sys.user.UserGridView', 'commons.sys.user.UserEditView'],
    refs: [{
        ref: 'userList',
        selector: 'userList'
    }, {
        ref: 'userGrid',
        selector: 'userGrid'
    },{
    	ref: 'userEdit',
    	selector: 'userEdit'
    }],
    init: function () {
    	 this.control({
    	 	'userList': {boxready: this.init_userList},
    	 	'userList button[action=search]': {click: this.search_user_btn},
    	 	'userList button[action=add]': {click: this.add_user_btn},
    	 	'userEdit button[action=save]': {click: this.save_user_btn},
    	 	'userList button[action=delete]': {click: this.delete_user_btn},
    	 	'userList button[action=reset]': {click: this.onResetPassword},
    	 	'userList button[action=disable]': {click: this.onDisableUser},
    	 	'userList button[action=edit]': {click: this.onEditUser}
    	 	
    	 });
    },
    init_userList: function () {
        var view = this.getUserList();
        view.getChildByElement('btn_ulv_search', true).fireEvent('click');
    },
    search_user_btn: function(){
    	var viewList=this.getUserList();
    	var view = this.getUserGrid();
    	var loginName = encodeURI(viewList.getChildByElement('tf_ulv_loginName', true).getValue());
    	Ext.apply(view.store.proxy.extraParams,{
		'loginName':loginName,
		'page': '1',
		'limit': DISPATCH.lib.Constants.PAGE_SIZE
		});
		view.getStore().load();
    },
    add_user_btn: function(){
    	var view=Ext.create(projectName + '.commons.sys.user.UserEditView');
    	Ext.Ajax.request({
    				url: basePath+'/commons/user/defaultUserGroup',
    				async:true,
    				success:function(response){
    					var json=Ext.decode(response.responseText);
    				/*	Ext.getCmp('sys_user_edit_tf_userGroup').store.load({
						scope: this,
						callback:function(records, operation, success){
							Ext.getCmp('userGroupNumber').setValue(json.item.id);
    				 		Ext.getCmp('sys_user_edit_tf_userGroup').setValue(json.item.id).setRawValue(json.item.name);
						}
						});*/
    				},failure:function(response){
    				}
		});
		view.show();
	},
    save_user_btn: function(){
    	var viewTree=this.getUserList();      
    	var view=this.getUserEdit();
    	var viewGrid=this.getUserGrid();
    	var store=viewGrid.getStore();
    	var form=view.getComponent('userForm').getForm();
    	var roles = form.findField('sys_user_edit_items_roles').getValue();
    	if(form.isValid()){
    		
    		form.submit({
    			url: basePath+'/commons/user/saveOrUpdate',
    			success: function (form,action) {
    				Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,action.result.message);
    				store.load();
    				view.close();
    			},failure: function (form,action) {
    				Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,action.result.message);
    				if(action.result.message="登陆名重复"){
    					Ext.getCmp('sys_user_edit_tf_userName').setValue("");
    				}else{
    					store.load();
    					view.close();
    				}
    			}
    		});
    	}
    },
   
		delete_user_btn : function(){
		var userList = this.getUserGrid();
		var selected = userList.getSelectionModel().getSelection();
		if(selected.length<1){
			Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_SELECTED_ONE);
			return;
		}
		var ids = '';
		for (var i = 0; i < selected.length; i++) {
				ids += selected[i].data.id;
				if (i < selected.length)
					ids += ',';
			}
		
		Ext.Msg.show({
			title : '提示框',
			msg : DISPATCH.lib.Constants.MSG_DELETE_CONFIRM,
			buttons : Ext.Msg.YESNO,
			fn : function callback(btn){
				if(btn == 'yes'){
					Ext.Ajax.request({
						url : basePath+ '/commons/user/deleteUserById',
						params : {
							ids : ids
						},
						success : function(response, opts) {
							var obj = Ext.decode(response.responseText);
							Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,obj.message);
							userList.store.reload();
						},
						failure : function(response, result) {
							Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,obj.message);
						}
					});
				}
			}
		});
	},
			
	onResetPassword:function(){
		var userList = this.getUserGrid();
		var selected = userList.getSelectionModel().getSelection();
		if(selected.length<1){
			Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_SELECTED_ONE);
			return;
		}
		var ids = '';
		for (var i = 0; i < selected.length; i++) {
				ids += selected[i].data.id;
				if (i < selected.length)
					ids += ',';
			}
		Ext.Msg.show({
			title : '提示框',
			msg : '点击确定按钮重置密码',
			buttons : Ext.Msg.OKCANCEL,
			fn : function callback(btn){
				if(btn == 'ok'){
					Ext.Ajax.request({
			    				url: basePath+'/commons/user/resetPassword',
			    				params:{ids:ids},
			    				success:function(response){
			    					Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,Ext.decode(response.responseText).message);
			    				},failure:function(response){
			    					Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,Ext.decode(response.responseText).message);
			    				}
					});
				}
			}
		});
	},
		
	onDisableUser:function(){
		var userList = this.getUserGrid();
		var view = this.getUserList();
		var selected = userList.getSelectionModel().getSelection();
		if(selected.length<1){
			Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_SELECTED_ONE);
			return;
		}
		var ids = '';
		for(i=0;i<selected.length;i++){
			ids = ids + selected[i].data.id;
			ids = ids + ',';
		}
		Ext.MessageBox.confirm("禁用用户","是否禁用该用户",
				function(btn, text){
					if (btn == 'yes'){
						Ext.Ajax.request({
		    				url: basePath+'/commons/user/disabledUser',
		    				params:{ids:ids},
		    				success:function(response){
		    					Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,Ext.JSON.decode(response.responseText).message);
		    					
		    			        view.getChildByElement('btn_ulv_search', true).fireEvent('click');
		    				},failure:function(response){
		    					Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,Ext.JSON.decode(response.responseText).message);
		    				}
		    			
		    			});
				
					}
				}
				
				);
	},
			
	onEditUser:function(){
		var userList = this.getUserGrid();
		var selected = userList.getSelectionModel().getSelection();
		if(selected.length != 1){
			Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_SELECTED_NOT_SINGLE);
			return;
		}
		Ext.Ajax.request({
			url: basePath+'/commons/user/selectUserById',
			params:{'id':selected[0].data.id},
			success:function(response){
				var json=Ext.decode(response.responseText);
				var window=Ext.create(projectName + '.commons.sys.user.UserEditView');
				window.title='修改用户';
				var form = window.getComponent("userForm").getForm();
				form.findField('id').setValue(json.listItems[0].id);
				form.findField('organCode').store.load({
				scope: this,
				callback:function(records, operation, success){
					form.findField("organNumber").setValue(json.listItems[0].organ.id);
					form.findField("sys_user_edit_tf_organName").setValue(json.listItems[0].organ.id);
					form.findField("sys_user_edit_tf_organName").setRawValue(json.listItems[0].organ.name);
				}
				});
				/*form.findField('sys_user_edit_tf_userGroup').store.load({
				scope: this,
				callback:function(records, operation, success){
					form.findField("userGroupNumber").setValue(json.listItems[0].userGroup.id);
					form.findField("sys_user_edit_tf_userGroup").setValue(json.listItems[0].userGroup.id);
					form.findField("sys_user_edit_tf_userGroup").setRawValue(json.listItems[0].userGroup.name);
				}
				});*/
		        form.findField('sys_user_edit_tf_userName').setValue(json.listItems[0].loginName);
		        form.findField('sys_user_edit_tf_realName').setValue(json.listItems[0].realName);
		        form.findField('sys_user_edit_tf_passwd').setValue(json.listItems[0].password);
		        form.findField('sys_user_edit_tf_post').setValue(json.listItems[0].post);
		        form.findField('sys_user_edit_tf_phone').setValue(json.listItems[0].phone);
		        var roles = [];
				for (var i = 0; i < json.listItems[0].roles.length; i++) {
   				 roles.push(json.listItems[0].roles[i].id);
				}
				form.findField('sys_user_edit_items_roles').setValue(roles);
		        window.show();
			},failure:function(response){
			}
		});
	}			
});