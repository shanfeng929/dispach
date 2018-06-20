/**
 * 流程组管理 控制
 */
Ext.define(projectName + '.controller.dispatch.flow.FlowGroupController',{
		// 继承ext控制器
		extend : 'Ext.app.Controller',
		// 引用视图
		views : [
		         projectName+ '.view.dispatch.flow.FlowGroupListView',
		         projectName+ '.view.dispatch.flow.FlowGroupGridView',
		         projectName+ '.view.dispatch.flow.FlowGroupEditView'
		],
		refs : [{
			ref : 'flowGroupList',
			selector : 'flowGroupList'
		}, {
			ref : 'flowGroupGrid',
			selector : 'flowGroupGrid'
		}, {
			ref : 'flowGroupEdit',
			selector : 'flowGroupEdit'
		}],
		init : function() {
			this.control({
				'flowGroupList':{boxready: this.init_flowGroupList},
				'flowGroupList button[action=search]': {click: this.search_flowGroup_btn},
				'flowGroupList button[action=add]' : {click: this.add_flowGroup_btn},
				'flowGroupList button[action=edit]' : {click: this.edit_flowGroup_btn},
				'flowGroupEdit button[action=save]' : {click: this.save_flowGroup_btn},
				'flowGroupList button[action=delete]' : {click: this.del_flowGroup_btn}
			});
		},
		init_flowGroupList : function(){
			 var view = this.getFlowGroupList();
		     view.getChildByElement('btn_fglv_search', true).fireEvent('click');
		     // 有关双击打开编辑的修改_weilai
		var me = this;
		this.getFlowGroupGrid().on('itemdblclick', function() {
			var selected = me.getFlowGroupGrid().getSelectionModel()
					.getSelection();
			if (selected.length = 1) {
				me.edit_flowGroup_btn();
			}

		});
		},
		search_flowGroup_btn : function(){
			var viewList=this.getFlowGroupList();
	    	var view = this.getFlowGroupGrid();
	    	var flowGroupName = encodeURI(viewList.getChildByElement('tf_fglv_name', true).getValue());
	    	Ext.apply(view.store.proxy.extraParams,{
			'flowGroupName':flowGroupName,
			'page': '1',
			'limit': DISPATCH.lib.Constants.PAGE_SIZE
			});
			view.getStore().loadPage(1);
		},
		add_flowGroup_btn : function(){
			var window = Ext.create(projectName + '.view.dispatch.flow.FlowGroupEditView');
			window.show();
		},
		edit_flowGroup_btn : function(){
			var flowGroupList = this.getFlowGroupGrid();
			var selected = flowGroupList.getSelectionModel().getSelection();
			if(selected.length != 1){
				Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_SELECTED_NOT_NULL);
				return;
			}
			var id = selected[0].data.id;
			Ext.Ajax.request({
				url: basePath+'/dispatch/flowGroup/findFlowById',
				async:false,
				params : {
					id : id
				},
				success:function(response){
					var responseJson = Ext.decode(response.responseText);
					var window = Ext.create(projectName + '.view.dispatch.flow.FlowGroupEditView');
					window.title = "修改流程组";
					var form = Ext.getCmp("flowGroupForm").getForm();
					form.findField('flowGroup_edit_hf_id').setValue(responseJson.item.id);
					form.findField('flowGroup_edit_tf_flowGroupName').setValue(responseJson.item.flowGroupName);
					form.findField('flowGroup_edit_tf_flowGroupDesc').setValue(responseJson.item.flowGroupDesc);
					window.show();
				},
				failure:function(response){
					var responseJson = Ext.decode(response.responseText);
					Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,responseJson.message);
				}
			});
		},
		save_flowGroup_btn : function(){
	    	var view=this.getFlowGroupEdit();
	    	var viewGrid=this.getFlowGroupGrid();
	    	var store=viewGrid.getStore();
	    	var form=view.getComponent('flowGroupForm').getForm();
	    	if(form.isValid()){
	    		form.submit({
	    			async : false,
	    			url: basePath+'/dispatch/flowGroup/saveOrUpdate',
	    			success: function (form,action) {
	    				Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,action.result.message);
	    				store.load();
	    				view.close();
	    			},failure: function (form,action) {
	    				var msg = action.result.message;
	    				Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,msg);
    					store.load();
    					view.close();
	    			}
	    		});
	    	}
	    },
	    del_flowGroup_btn : function(){
	    	var flowGroupList = this.getFlowGroupGrid();
	    	var selected = flowGroupList.getSelectionModel().getSelection();
	    	if(selected.length < 1){
	    		Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_SELECTED_ONE);
				return;
			}
	    	var store = flowGroupList.getStore();
	    	var ids = '';
	    	for(var i=0;i<selected.length;i++){
	    		ids += selected[i].data.id +',';
	    	}
	    	ids = ids.substring(0,ids.length-1);
	    	Ext.MessageBox.confirm('提示','确认删除选中项吗？',function(optional){
	    		if(optional=='yes'){
	    			Ext.Ajax.request({
	    				url: basePath+'/dispatch/flowGroup/deleteByIds',
	    				async:false,
	    				params : {
	    					ids : ids
	    				},
	    				success:function(response){
	    					var responseJson = Ext.decode(response.responseText);
	    					Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,responseJson.message);
	    				},
	    				failure:function(response){
	    					var responseJson = Ext.decode(response.responseText);
	    					Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,responseJson.message);
	    				}
					});
			    	store.load();
	    		}
	    	});
	    	
	    }
});
				

		
		