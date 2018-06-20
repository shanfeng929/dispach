/**
 * 任务管理 控制
 */
Ext.define(projectName + '.controller.dispatch.task.TaskManageController',{
		// 继承ext控制器
		extend : 'Ext.app.Controller',
		// 引用视图
		views : [
		         projectName+ '.view.dispatch.task.TaskManageListView',
		         projectName+ '.view.dispatch.task.TaskManageGridView',
		         projectName+ '.view.dispatch.task.TaskManageEditView'
		],
		refs : [{
			ref : 'taskManageList',
			selector : 'taskManageList'
		}, {
			ref : 'taskManageGrid',
			selector : 'taskManageGrid'
		}, {
			ref : 'taskManageEdit',
			selector : 'taskManageEdit'
		}],
		init : function() {
			this.control({
				'taskManageList':{boxready: this.init_taskManageList},
				'taskManageList button[action=search]': {click: this.search_taskManage_btn},
				'taskManageList button[action=edit]' : {click: this.edit_taskManage_btn},
				'taskManageEdit button[action=save]' : {click: this.save_taskManage_btn},
				'taskManageList button[action=taskRefresh]' : {click: this.refresh_taskManage_btn}
			});
		},
		init_taskManageList : function(){
			 var view = this.getTaskManageList();
		     view.getChildByElement('btn_tmlv_search', true).fireEvent('click');
		// 有关双击打开编辑的修改_weilai
		var me = this;
		this.getTaskManageGrid().on('itemdblclick', function() {
			var selected = me.getTaskManageGrid().getSelectionModel()
					.getSelection();
			if (selected.length = 1) {
				me.edit_taskManage_btn();
			}

		});
		},
		search_taskManage_btn : function(){
			var viewList=this.getTaskManageList();
	    	var view = this.getTaskManageGrid();
	    	var taskName = encodeURI(viewList.getChildByElement('tf_tmlv_name', true).getValue());
	    	var flowName = encodeURI(viewList.getChildByElement('tf_tmlv_flowName', true).getValue());
	    	
	    	Ext.apply(view.store.proxy.extraParams,{
			'taskName':taskName,
			'flowName':flowName,
			'page': '1',
			'limit': DISPATCH.lib.Constants.PAGE_SIZE
			});
			view.getStore().loadPage(1);
		},
		edit_taskManage_btn : function(){
			var taskManageList = this.getTaskManageGrid();
			var selected = taskManageList.getSelectionModel().getSelection();
			if(selected.length != 1){
				Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_SELECTED_NOT_NULL);
				return;
			}
			var id = selected[0].data.id;
			Ext.Ajax.request({
				url: basePath+'/dispatch/task/findTaskById',
				async:false,
				params : {
					id : id
				},
				success:function(response){
					var responseJson = Ext.decode(response.responseText);
					var window = Ext.create(projectName + '.view.dispatch.task.TaskManageEditView',{record:responseJson.item});
					Ext.getCmp('taskManage_edit_cb_taskError').setValue(responseJson.item.taskError);
					Ext.getCmp('taskManage_edit_cb_taskBranch').setValue(responseJson.item.taskBranch);
					Ext.getCmp('taskManage_edit_cb_taskActive').setValue(responseJson.item.taskActive);
					window.show();
				},
				failure:function(response){
					var responseJson = Ext.decode(response.responseText);
					Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,responseJson.message);
				}
			});
		},
		save_taskManage_btn : function(){
	    	var view=this.getTaskManageEdit();
	    	var viewGrid=this.getTaskManageGrid();
	    	var store=viewGrid.getStore();
	    	var form=view.getComponent('taskManageForm').getForm();
	    	if(form.isValid()){
	    		form.submit({
	    			async : false,
	    			url: basePath+'/dispatch/task/update',
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
	    refresh_taskManage_btn : function(){
	    	var win = this.getTaskManageList();
	    	var store = this.getTaskManageGrid().getStore();
	    	var botton_icon = Ext.get('btn_tmlv_task_refresh-btnIconEl');
	    	var botton_inner = Ext.get('btn_tmlv_task_refresh-btnInnerEl');
	    	
	    	if(win.refresh_task==null){
	    		var refreshwin = Ext.create('Ext.window.Window', {
	    		    title: '刷新时间设置',
	    		    height: 150,
	    		    width: 300,
	    		    modal:true,
	    		    id:'task_refresh_window',
	    		    items: [{
	    		        xtype: 'numberfield',
	    		        fieldLabel: '刷新时间（秒）',
	    		        lableWidth:50,
	    		        value: 10,
	    		        minValue: 5,
	    		        margin:10,
	    		        id:'refreshTime'
	    		    }],
	    		    buttons: [{
	    		        text: '确定',
	    		        handler:function(button,e){
	    		        	var val = Ext.getCmp('refreshTime').value;
	    		        	if(val<5){
	    		        		return; 
	    		        	}
	    		        	var refresh = function(){
	    			    		store.load();
	    			    	}
		    				botton_icon.replaceCls('icon-refresh','icon-stop');
		    				botton_inner.dom.innerHTML="停用刷新";
		    				win.refresh_task = Ext.TaskManager.start({
		    					run: refresh,
		    					interval: val*1000
		    				});
		    				Ext.getCmp('task_refresh_window').close();
	    		        }
	    		    }]
	    		});
	    		refreshwin.show();
	    	}else if(win.refresh_task.stopped){
	    		botton_icon.replaceCls('icon-refresh','icon-stop');
	    		botton_inner.dom.innerHTML="停用刷新";
	    		Ext.TaskManager.start(win.refresh_task);
	    	}else{
	    		botton_icon.replaceCls('icon-stop','icon-refresh');
	    		botton_inner.dom.innerHTML="定时刷新";
	    		Ext.TaskManager.stop(win.refresh_task);
	    	}
	    }
});
				

		
		