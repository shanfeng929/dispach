/**
 * 权限controller
 */
var sys_auth_edit_items_menus=[];
var sys_auth_edit_items_opeas=[];
var almTreePanelId_AuthorityListView = null;
Ext.define(projectName + '.controller.commons.sys.authority.AuthorityController', {
    extend: 'Ext.app.Controller',
    views: ['commons.sys.authority.AuthorityFormView', 'commons.sys.authority.AuthorityListView'],
    refs: [{
        ref: 'authorityList',
        selector: 'authorityList'
    }, {
        ref: 'authorityForm',
        selector: 'authorityForm'
    }],
    init: function() {
		this.control({
			'authorityList':{
				boxready:this.onAuthorityListReady
			},
			'authorityList almTreePanel[id=authorityTree]': {//准备事件，页面点击后加载数据
				itemclick : this.onTreeItemCilck
			},
			'authorityForm button[action=save]':{//参数维护保存事件
				click: this.onSaveClick
			},
			'#sys_auth_edit_items_menus':{
				checkchange:this.checkMenu
			}
			
		});
    },
    onAuthorityListReady:function(){
    	var j = Ext.getCmp('authority_btn').setVisible(false);
    },
    getNode: function(){
    	var tree=Ext.getCmp('sys_auth_edit_items_menus');
    	var nodes = tree.getChecked();
    	var menus = [];
    	for(var i=0;i<nodes.length;i++){
    		var model = nodes[i].raw;
    		if(!isNaN(model.id)){
    			Ext.Array.include(menus, model.id);
    		}
    	}
    	return menus;
    },
    onTreeItemCilck:function(tree,record){
    	Ext.getCmp('authority_btn').setVisible(false);
    	var id=record.raw.id;
    	var authorityForm=this.getAuthorityForm().getComponent("authorityFormId");
    	authorityForm.form.findField("id").setValue(record.raw.id);
    	authorityForm.form.findField("dataStatus").setValue(record.raw.dataStatus).setReadOnly(true);
    	authorityForm.form.findField("name").setValue(record.raw.text).setReadOnly(true);
    	authorityForm.form.findField("code").setValue(record.raw.code).setReadOnly(true);
    	authorityForm.form.findField("description").setValue(record.raw.description).setReadOnly(true);
    
    	var menuTree = Ext.getCmp('sys_auth_edit_items_menus').setDisabled(false);
    	Ext.apply(menuTree.store.proxy.extraParams,{
			'authId' :id
		});
    	menuTree.getStore().load();
    },
    onSaveClick:function(){
    	var viewTree=this.getAuthorityList().getComponent("authorityTree");
    	var authorityForm=this.getAuthorityForm().getComponent("authorityFormId");
    	var menuIds=this.getNode();
//    	var menuIds=sys_auth_edit_items_menus;
//    	var opeaIds=sys_auth_edit_items_opeas;
    	if(menuIds.length == 0){
    		Ext.Msg.alert('提示','请选择菜单项....');
    		return;
    	}
    	if(authorityForm.getForm().isValid()){
    		authorityForm.submit({
    			url: basePath+ '/commons/auth/saveAuthMenuOpea',
      		 	method: 'post',
      		 	params:{
      		 		'menuIds':menuIds
      		 	},
      		 	success: function(form, action){
      		 		Ext.Msg.show({
						title : DISPATCH.lib.Constants.MSG_TITLE_INFO,
						msg : action.result.message,
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
					viewTree.store.reload();
					//Ext.getCmp('sys_auth_edit_items_menus').setDisabled(true);
					Ext.getCmp('authority_btn').setVisible(false);
				},
				failure: function(form,action) {
//					alert(action.result.message);
					switch (action.failureType) {
			            case Ext.form.action.Action.CLIENT_INVALID:
			                Ext.Msg.alert('提示', 'Form fields may not be submitted with invalid values');
			                break;
			            case Ext.form.action.Action.CONNECT_FAILURE:
			                Ext.Msg.alert('提示', 'Ajax communication failed');
			                break;
			            case Ext.form.action.Action.SERVER_INVALID:
			               Ext.Msg.alert('提示', action.result.message);
			       };
			       Ext.getCmp('authority_btn').setVisible(false);
				}
    		});
    	}

    },
    checkMenu:function(node, checked, eOpts){
    	 if (checked) {
             node.expand();
             node.bubble(function (parentNode) {
//                 if (!isNaN(parentNode.data.id)) {
//                     Ext.Array.include(sys_auth_edit_items_menus, parentNode.data.id);
//                 }
                 parentNode.set('checked', true);
             });
         } else {
             node.collapse();
             node.collapseChildren(true);
             node.cascadeBy(function (childNode) {
//                 Ext.Array.remove(sys_auth_edit_items_menus, childNode.data.id);
                 childNode.set('checked', false);
             });
             node.bubble(function (parentNode) {
                 var childHasChecked = false;
                 var childNodes = parentNode.childNodes;
                 if (childNodes || childNodes.length > 0) {
                     for (var i = 0; i < childNodes.length; i++) {
                         if (childNodes[i].data.checked) {
                             childHasChecked = true;
                             break;
                         }
                     }
                 }
                 if (!childHasChecked) {
                     parentNode.set('checked', false);
//                     Ext.Array.remove(sys_auth_edit_items_menus, parentNode.data.id);
                 }
             });
         }
    },
    checkOpea:function(node, checked, eOpts){
    	if (checked) {
            node.expand();
            node.bubble(function (parentNode) {
                if (!isNaN(parentNode.data.id)) {
                    Ext.Array.include(sys_auth_edit_items_opeas, parentNode.data.id);
                }
                parentNode.set('checked', true);
            });
        } else {
            node.collapse();
            node.collapseChildren(true);
            node.cascadeBy(function (childNode) {
                Ext.Array.remove(sys_auth_edit_items_opeas, childNode.data.id);
                childNode.set('checked', false);
            });
            node.bubble(function (parentNode) {
                var childHasChecked = false;
                var childNodes = parentNode.childNodes;
                if (childNodes || childNodes.length > 0) {
                    for (var i = 0; i < childNodes.length; i++) {
                        if (childNodes[i].data.checked) {
                            childHasChecked = true;
                            break;
                        }
                    }
                }
                if (!childHasChecked) {
                    parentNode.set('checked', false);
                    Ext.Array.remove(sys_auth_edit_items_opeas, parentNode.data.id);
                }
            });
        }
    }
    
  /*  onTreeItemCilck: function(treeList,record,item,index){
    	almTreePanelId_AuthorityListView = record.data.id;
    	var authorityForm =this.getAuthorityForm();
    	var listForm = authorityForm.getComponent("authorityFormId");
    	listForm.loadRecord(record);
    }*/
    
    //保存事件方法
  /*  onSaveClick: function(){
    	var formView =this.getParamSettingViewForm();
    	var listForm = formView.getComponent("paramSettingformId");
    	
    	var value = listForm.form.findField('value').getValue();
    	var id = listForm.form.findField('id').getValue();
    	var memo = listForm.form.findField('memo').getValue();
    	
    	if(listForm.isValid()){
    		Ext.Ajax.request({
    			url: basePath + '/paramManage/paramSetting/saveParam',
    			params : {
    				id: id,
    				value : value,
    				memo: memo
    			},
    			success : function(response,result) {
    				//重新加载树结构数据
    				Ext.getCmp("paramSettingViewTreeId").store.reload();
    				//解析json数据
    				var json = Ext.decode(response.responseText);
    				//刷新表单
    				listForm.form.findField('value').setValue(json.message[0].VALUE);
    		    	listForm.form.findField('lupdateName').setValue(json.message[0].LUPDATENAME);
    		    	listForm.form.findField('dateUpdate').setValue(json.message[0].DATEUPDATE);
    		    	listForm.form.findField('memo').setValue(json.message[0].MEMO);
    		    	//消息提示
    				Ext.example.msg(LRM.lib.Constants.MSG_TITLE_INFO, LRM.lib.Constants.MSG_RESULT_SUCCESS);
    			},
    			failure: function(response,result) {    				
    				Ext.example.msg(LRM.lib.Constants.MSG_TITLE_INFO, LRM.lib.Constants.MSG_RESULT_FAILURE);
    			}
    		});
    	}
    }*/
});
