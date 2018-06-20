Ext.define(projectName + '.controller.commons.sys.role.RoleController', {
    extend: 'Ext.app.Controller',
    views: ['commons.sys.role.RoleListView', 'commons.sys.role.RoleGridView', 'commons.sys.role.RoleEditView'],
    refs: [{
        ref: 'roleList',
        selector: 'roleList'
    }, {
        ref: 'roleGrid',
        selector: 'roleGrid'
    },{
    	ref: 'roleEdit',
    	selector: 'roleEdit'
    }],
    init: function () {
    	 this.control({
    	 	'roleList': {
    	 		boxready: this.init_roleList
    	 	},
    	 	'roleList button[action=searchRole]': {
    	 		click: this.onSearch
    	 	},
    	 	'roleList button[action=addRole]': {
    	 		click: this.add_role_btn
    	 	},
    	 	'roleList button[action=editRole]': {
    	 		click: this.edit_role_btn
    	 	},
    	 	'roleList button[action=deleteRole]': {
    	 		click: this.delete_role_btn
    	 	},
    		'roleEdit button[action=saveRole]':{
    			click:this.OnSave
    		}
    	 	
    	 });
    },
    init_roleList: function () {
    	var list=this.getRoleList();
    	new Ext.util.DelayedTask(function(){
    		list.getChildByElement('btn_ulv_search11',true).fireEvent('click');
    	}).delay(1 * 1000);
    },
    onSearch:function(){
    	var list=this.getRoleList();
    	var grid=this.getRoleGrid();
    	var roleName=encodeURI(list.getChildByElement('tf_ulv_Name',true).getValue());
    	Ext.apply(grid.store.proxy.extraParams,{
    		'name':roleName,
    		page: 1,
    		limit:25
    		});
    	grid.store.load();
    },
    add_role_btn:function(){
    	var view = Ext.create(projectName + '.view.commons.sys.role.RoleEditView');
    	view.show();
    },
    
    edit_role_btn:function(){
    	var grid=this.getRoleGrid();
    	var selections = grid.getSelectionModel().getSelection();
		var len = selections.length;
		if (len <= 0) {
			 Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO, DISPATCH.lib.Constants.MSG_SELECTED_NOT_NULL);
			return;
		}
		if (len > 1) {
			 Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO, DISPATCH.lib.Constants.MSG_SELECTED_NOT_SINGLE);
			return;
		}
		var id=selections[0].data.id;
		Ext.Ajax.request({
	    			url: basePath+'/commons/r/selectRole',
	    			params:{'id':id},
	    			success:function(response){
	    				var json=Ext.decode(response.responseText);
	    				var window=Ext.create(projectName + '.view.commons.sys.role.RoleEditView');
	    				window.title='修改角色';
	    				var form = window.getComponent("roleForm").getForm();
	    				form.findField('sys_role_edit_tf_id').setValue(json.listItems[0].id);
	    				form.findField('name').setValue(json.listItems[0].name);
					    form.findField('code').setValue(json.listItems[0].code);
					    form.findField('description').setValue(json.listItems[0].description);
					    var authorities = [];
	        			for (var i = 0; i < json.listItems[0].authorities.length; i++) {
	        				authorities.push(json.listItems[0].authorities[i].id);
	        			}
	        			form.findField('sys_role_edit_items_auths').setValue(authorities);
	        			window.show();
	    			},failure:function(response){
	    				Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_RESULT_FAILURE);
	    			}
			});
    },
    
    delete_role_btn:function(){
    	var grid=this.getRoleGrid();
    	var selections = grid.getSelectionModel().getSelection();
		var len = selections.length;
		if (len == 0) {
			   Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO, "至少选择一条数据!");
			return;
		}
		if (len > 0) {
			var ids = "";
			for (var i = 0; i < len; i++) {
					if (i == len - 1) {
						ids += selections[i].data.id;
					} else {
						ids += selections[i].data.id + ",";
					}
				}
			if (ids.length > 0) {
				Ext.MessageBox.confirm(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_DELETE_CONFIRM, function(btn, text){
				    if (btn == 'yes'){
						Ext.Ajax.request({
							url:basePath+'/commons/r/deleteRole',
							params:{
								'ids' : ids
							},
							success : function(response,resp) {
								Ext.getCmp("roleGrid").getStore().reload();
						    },
							failure:function(){
								Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_RESULT_FAILURE);
							}
					});
				   }
				});
			}
		}
    },
    
    OnSave:function(){
    	var roleEdit=this.getRoleEdit();
    	var editForm=Ext.getCmp("roleForm");
    	var form = editForm.getForm();
    	var regex=/[^\x00-\xff]/g;   // 正则表达式，用于查找中文字符
//    	console.log(form.findField("name").getValue().replace(regex,'**').length);
//    	console.log(form.findField("name").getValue());
    	var grid=this.getRoleGrid();
    	var ids=Ext.getCmp("sys_role_edit_items_auths").getValue();
    	var roleNew = {};
    	for(var i=0;i<ids.length;i++){
    		roleNew['roleAuth['+i+'].authId'] = ids[i];
    	}
    	if(form.findField("name").getValue().replace(regex,'**').length > 200){
    		Ext.example.msg("提示","名称字符过长，不能超过200个字符！");
    	}else if(form.findField("code").getValue().replace(regex,'**').length > 150){
    		Ext.example.msg("提示","编码字符过长，不能超过150个字符！");
    	}else if(form.findField("description").getValue().replace(regex,'**').length > 200){
    		Ext.example.msg("提示","描述字符过长，不能超过200个字符！");
    	}else if(editForm.getForm().isValid()){
    		editForm.submit({
    			url: basePath+ '/commons/r/insertRole',
      		 	method: 'post',
      		 	params:roleNew,
      		 	success: function(form, action){
					Ext.Msg.show({
						title : DISPATCH.lib.Constants.MSG_TITLE_INFO,
						msg : action.result.message,
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
					roleEdit.close();
				grid.store.load();	
				},
				failure: function(form,action) {
					switch (action.failureType) {
			            case Ext.form.action.Action.CLIENT_INVALID:
			            	//console.log("11111111");
			            	 Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO, 'Form fields may not be submitted with invalid values');
			                break;
			            case Ext.form.action.Action.CONNECT_FAILURE:
			            	//console.log("22222");
			            	 Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO, 'Ajax communication failed');
			                break;
			            case Ext.form.action.Action.SERVER_INVALID:
			            	//console.log("33333");
			            	 Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO, action.result.message);
			       }
				}
    		});
    	}
    }
	
});