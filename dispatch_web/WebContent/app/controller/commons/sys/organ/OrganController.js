/**
 * 机构设置
 */
Ext.define(projectName + '.controller.commons.sys.organ.OrganController', {
    extend: 'Ext.app.Controller',
    views: ['commons.sys.organ.OrganListView','commons.sys.organ.OrganFormView'],
    refs : [{
				ref : 'organList',
				selector : 'organList'
			}, {
				ref : 'organForm',
				selector : 'organForm'
			}
    ],
    init: function() {//页面初始化
    	this.control({
    		'organList':{boxready:this.onOrganListReady},
    		'organList almTreePanel[id=organTree]':{itemclick:this.organTreeClick},
    		'organForm button[action=organFormSaveBtn]':{click:this.save_organ_btn}
    	});
    },
    onOrganListReady:function(){
    	var j = Ext.getCmp('organ_save').setVisible(false);
    },
    organTreeClick:function(tree, record){
    	Ext.getCmp('organ_save').setVisible(false);
    
		var parentId = record.data.parentid;
    	var organForm = this.getOrganForm().getComponent("organForm");
    	
    	organForm.form.findField("id").setValue(record.data.id);
    	organForm.form.findField("dataStatus").setValue(record.data.datastatus);
    	organForm.form.findField("parentId").setValue(parentId);
    	organForm.form.findField("name").setValue(record.data.text).setReadOnly(true);
    	organForm.form.findField("code").setValue(record.data.code).setReadOnly(true);
    	organForm.form.findField("shortName").setValue(record.data.shortname).setReadOnly(true);
    	organForm.form.findField("parentName").setValue('').setReadOnly(true);
//    	organForm.form.findField("type").setValue(record.data.type).setReadOnly(true);
    	organForm.form.findField("description").setValue(record.data.description).setReadOnly(true);
    	
    	if(parentId != null){
    		Ext.Ajax.request({
	    		url: basePath+'/commons/organ/'+ parentId +'/getParentName',
	    		success:function(response){
		    		var json = Ext.decode(response.responseText);
		    		if(json.mapItems != null)
		        		organForm.form.findField("parentName").setValue(json.mapItems.NAME);
		        	
	    		},failure:function(response){
	    			
	    		}
    				
    	  	});
    	}
    },
    save_organ_btn: function(){
    	var organList = this.getOrganList();
    	var viewForm = this.getOrganForm();
    	var viewTree = organList.getComponent("organTree");
    	var form = viewForm.getComponent('organForm');
    	form.submit({
    		url: basePath+'/commons/organ/saveOrUpdateOrgan',
    		success: function (form,action) {
    			Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,action.result.message);
    			viewTree.store.load();
    			organList.reloadInitOrganForm(organList);
    		},failure: function (form,action) {
    			Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,action.result.message);
    			
    		}
    	});
    }
    
	
});