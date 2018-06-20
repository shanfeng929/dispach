/**
 * 流程管理 控制
 */
Ext.define(projectName + '.controller.dispatch.flow.FlowMonitorController', {
	// 继承ext控制器
	extend : 'Ext.app.Controller',
	// 引用视图
	views : [
	         projectName + '.lib.component.MutipleTreeCombo',
	        projectName + '.view.dispatch.flow.FlowMonitorListView',
			projectName + '.view.dispatch.flow.FlowMonitorGridView',
			projectName + '.view.dispatch.flow.FlowHistoryGridView',
			projectName + '.view.dispatch.task.TaskMonitorGridView'
	],
	refs : [{
				ref : 'flowMonitorList',
				selector : 'flowMonitorList'
			}, {
				ref : 'flowMonitorGrid',
				selector : 'flowMonitorGrid'
			}, {
				ref : 'flowHistoryGrid',
				selector : 'flowHistoryGrid'
			}, {
				ref : 'taskMonitorGrid',
				selector : 'taskMonitorGrid'
			}],
	init : function() {
		this.control({
			'flowMonitorGrid actioncolumn' : {
				click : this.actionColumnClick
			},
			'flowMonitorGrid button[action=search]':{
				click:this.flowMonitorList
			},
			'flowHistoryGrid actioncolumn' : {
				click : this.historyActionColumn
			},
			'flowHistoryGrid button[action=search]':{
				click:this.flowHistoryList
			},
			'flowHistoryGrid button[action=export]':{
				click:this.flowHistoryExport
			}
		});
	},
	flowMonitorList : function(){
		var store = this.getFlowMonitorGrid().getStore();
		var name = Ext.getCmp('flowMonitorGrid_name').getValue();
		var groupId = ""/*Ext.getCmp('flowMonitorGrid_flowGroupid').getValue()*/;
		var groupIds = Ext.getCmp('flowMonitorGrid_flowGroupid').getValues();
		for(i=0;i<groupIds.length;i++){
			groupId+=groupIds[i]+","
		}
		groupId = groupId.substring(0,groupId.length-1);
//		debugger;
		store.proxy.extraParams={
				flowName:name,
				flowGroupid:groupId
		}
		store.loadPage(1);
	},
	flowHistoryList : function(){
		var store = this.getFlowHistoryGrid().getStore();
		var name = Ext.getCmp('flowHistoryGrid_name').getValue();
		var groupId = ""/*Ext.getCmp('flowHistoryGrid_flowGroupid').getValue()*/;
		var groupIds = Ext.getCmp('flowHistoryGrid_flowGroupid').getValues();
		var startDate = Ext.getCmp('flowHistoryGrid_startDate').getValue();
		if(startDate!=null){
			startDate=Ext.Date.format(startDate,'Y-m-d');
			startDate+=" 00:00:00";
		}else{
			startDate='';
		}
		var endDate = Ext.getCmp('flowHistoryGrid_endDate').getValue();
		if(endDate!=null){
			endDate=Ext.Date.format(endDate,'Y-m-d');
			endDate+=" 00:00:00";
		}else{
			endDate='';
		}
		for(i=0;i<groupIds.length;i++){
			groupId+=groupIds[i]+","
		}
		groupId = groupId.substring(0,groupId.length-1);
//		debugger;
		store.proxy.extraParams={
				flowName:name,
				flowGroupid:groupId,
				startDate:startDate,
				endDate:endDate
		}
		store.loadPage(1);
	},
	actionColumnClick : function(component,td,row,col,e){
//		debugger;
		var className = e.target.className;
		var flowMonitorList = this.getFlowMonitorGrid();
		var store = flowMonitorList.getStore();
		var id = store.data.items[row].data.id;
		var status = store.data.items[row].data.flowStatus;
		if(className.indexOf('task-suspend')>-1){
			// Ext.Msg.alert("流程停用");
			if(status == '3'){
				/*store.load();*/
				Ext.Msg.alert('提示','当前任务链已暂停，不需要暂停');
				return;
			}
			Ext.Ajax.request({
				url : basePath + '/dispatch/flow/flowStop',
				// async:false,
				params : {
					flowId : id
				},
				callback : function(options, success, response) {
					var responseJson = Ext.decode(response.responseText);
					Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,
							responseJson.message);
					store.load();
				}
			});
		}else if(className.indexOf('task-resume')>-1){
			// Ext.Msg.alert("流程重启");
			if(status == '1'){
				/*store.load();*/
				Ext.Msg.alert('提示','当前任务链正在运行中，不需要恢复');
				return;
			}
			Ext.Ajax.request({
				url : basePath + '/dispatch/flow/flowRestart',
				// async:false,
				params : {
					flowId : id
				},
				callback : function(options, success, response) {
					var responseJson = Ext.decode(response.responseText);
					Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,
							responseJson.message);
					store.load();
				}
			});
		}else if(className.indexOf('task-terminate')>-1){
//			store.load();
			Ext.Ajax.request({
				url : basePath + '/dispatch/flow/flowTerminate',
				// async:false,
				params : {
					flowId : id
				},
				callback : function(options, success, response) {
					var responseJson = Ext.decode(response.responseText);
					Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,
							responseJson.message);
					store.load();
				}
			});
		}else if(className.indexOf('task-detail')>-1){
			var task_store = Ext.create(projectName +'.store.dispatch.flow.TaskMonitorStore');
			task_store.proxy.extraParams = {
				flowId : id,
				isHistory:false
			};
			task_store.load();
			var flowName = store.data.items[row].data.flowName
			var win = Ext.create('Ext.window.Window',{
				title:'任务链[ '+flowName+' ]任务详情',
				constrain:true,
				modal:true,
				autoScroll:true,
				items:[{
					xtype:'taskMonitorGrid',
					store:task_store
				}],
				height:500,
				width:910
			});
			win.show();
		}else if(className.indexOf('task-history')>-1){
			var tab = this.getFlowMonitorList();
			var historyGrid = this.getFlowHistoryGrid();
			var store = historyGrid.getStore();
			store.proxy.extraParams = {
					'flowName':'',
					'flowGroupid' : '',
					'flowId' : id
			};
			store.load();
			tab.setActiveTab(historyGrid);
		}
	},
	historyActionColumn : function(component,td,row,col,e){
		var className = e.target.className;
		var flowHistoryList = this.getFlowHistoryGrid();
		var store = flowHistoryList.getStore();
		var id = store.data.items[row].data.id;
		if(className.indexOf('task-detail')>-1){
			var task_store = Ext.create(projectName +'.store.dispatch.flow.TaskMonitorStore');
			task_store.proxy.extraParams = {
				flowId : id,
				isHistory:true
			};
			task_store.load();
			var flowName = store.data.items[row].data.flowName;
			var win = Ext.create('Ext.window.Window',{
				title:'任务链[ '+flowName+' ]任务详情',
				constrain:true,
				modal:true,
				autoScroll:true,
				items:[{
					xtype:'taskMonitorGrid',
					store:task_store
				}],
				height:500,
				width:910
			});
			win.show();
		}else if(className.indexOf('icon-excel')>-1){
			window.location.href = basePath + '/dispatch/flow/flowHistoryDetailExport?flowId='+id;
		}
	},
	flowHistoryExport : function(){
		var dateStart = Ext.util.Format.date(Ext.getCmp("flowHistoryGrid_startDate").getValue(), 'Y-m-d');
		var dateEnd = Ext.util.Format.date(Ext.getCmp("flowHistoryGrid_endDate").getValue(), 'Y-m-d');
		var flowName = encodeURIComponent(encodeURIComponent(Ext.getCmp("flowHistoryGrid_name").getValue()));
		var groupIds = Ext.getCmp('flowHistoryGrid_flowGroupid').getValues();
		//var flowGroupName = encodeURIComponent(encodeURIComponent(Ext.getCmp("flowHistoryGrid_flowGroupid").getValue()));
		window.location.href = basePath + '/dispatch/flow/flowHistoryExport?flowName='+flowName+"&groupIds="+groupIds+"&dateStart="+dateStart+"&dateEnd="+dateEnd;
	}
	
});
