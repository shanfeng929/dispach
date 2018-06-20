/**
 * 菜单管理
 */
Ext.define(projectName + '.controller.commons.sys.menu.MenuListController', {
    extend: 'Ext.app.Controller',
    models: [
        'commons.sys.menu.MenuListModel'
    ],
    stores: [
        'commons.sys.menu.MenuListStore'
    ],
    views: [
        'commons.sys.menu.MenuListView',
        'commons.sys.menu.MenuFormView'
    ],
    refs: [{
        ref: 'menuList',selector: 'menuList'
    },{
    	ref: 'menuForm',selector: 'menuForm'
    }],
    init: function() {//页面初始化
    	this.control({
    		'menuList':{
				boxready:this.onMenuListReady
			},
    		'menuList almTreePanel[id=menuListTree]':{
    			itemclick:this.onMenuListTreeClick
    		},
    		'menuForm button[action=dataSave]':{
				click:this.onMenuListFormSave
			}
    	});
    },

    onMenuListReady : function(){
    	var j = Ext.getCmp('menuForm_butId').setVisible(false);
    },
    
    onMenuListTreeClick : function(tree,record){
//    	debugger;
    	Ext.getCmp('menuForm_butId').setVisible(false);
    	if(record.raw.data_status == 0){//数据锁定状态
    		Ext.MessageBox.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_LOCKED_INFO_NODE);
    		return ;
    	}
    	var parenetName = record.parentNode.data.text;
    	var parentId = record.data.parentId;
    	if(isNaN(parentId)){
    		parentId = 0;
    	}
//    	alert(parentId);
    	var form=Ext.getCmp("menuFormId").form;
		form.loadRecord(record);
		form.findField("parentName").setValue(parenetName);
		form.findField("parentId").setValue(parentId);
    },
    
    onMenuListFormSave : function(){
    	var listView = this.getMenuList();
    	var formView=Ext.getCmp("menuFormId").form;
    	var MaskWin = new Ext.LoadMask(listView , {msg: "数据正在处理，请稍后..."});
      	MaskWin.show();
    	if(formView.isValid()){
    		formView.submit({
    			url: basePath + '/common/menu/saveAndUpdateMenuByForm',
    			params:{},
    			success:function(form,action){
    				MaskWin.hide();
    				var responseText = Ext.decode(action.response.responseText);
                    if (responseText.success) {
                    	Ext.getCmp('menuListTree').store.load({type:false});
						formView.reset();
                   	}
					Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,responseText.message);
					Ext.getCmp('menuForm_butId').setVisible(false);
    			},
    			failure:function(){
    				MaskWin.hide();
					Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_RESULT_FAILURE);
					Ext.getCmp('menuForm_butId').setVisible(false);
    			}
    		});
    	}else{
    		MaskWin.hide();
    	}
    }
});