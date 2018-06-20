/**
 * 任务链管理 控制
 */
Ext.define(projectName + '.controller.dispatch.flow.FlowManageController', {
	// 继承ext控制器
	extend : 'Ext.app.Controller',
	// 引用视图
	views : [projectName + '.view.dispatch.flow.FlowManageListView',
			projectName + '.view.dispatch.flow.FlowManageGridView',
			projectName + '.view.dispatch.flow.FlowManageEditView'],
	refs : [{
				ref : 'flowManageList',
				selector : 'flowManageList'
			}, {
				ref : 'flowManageGrid',
				selector : 'flowManageGrid'
			}, {
				ref : 'flowManageEdit',
				selector : 'flowManageEdit'
			}],
	init : function() {
		this.control({
					'flowManageList' : {
						boxready : this.init_flowManageList
					},
					'flowManageList button[action=search]' : {
						click : this.search_flowManage_btn
					},
					'flowManageList button[action=edit]' : {
						click : this.edit_flowManage_btn
					},
					'flowManageEdit button[action=save]' : {
						click : this.save_flowManage_btn
					},
					'flowManageList button[action=delete]' : {
						click : this.del_flowManage_btn
					},
					'flowManageList button[action=export]' : {
						click : this.export_flowManage_btn
					},
					'flowManageList button[action=dependency]' : {
						click : this.flow_dependency_flowManage_btn
					},
					'flowManageList button[action=flowRefresh]' : {
						click : this.flow_refresh_flowManage_btn
					},
					'flowManageGrid actioncolumn' : {
						click : this. actioncolumnClick
					}
				});
	},
	init_flowManageList : function() {
		var view = this.getFlowManageList();
		view.getChildByElement('btn_fmlv_search', true).fireEvent('click');
		// 有关双击打开编辑的修改_weilai
		var me = this;
		this.getFlowManageGrid().on('itemdblclick', function() {
			var selected = me.getFlowManageGrid().getSelectionModel().getSelection();
			if (selected.length == 1) {
				me.edit_flowManage_btn();
			}
		});
	},
	search_flowManage_btn : function() {
		var viewList = this.getFlowManageList();
		var view = this.getFlowManageGrid();
		var flowName = encodeURI(viewList.getChildByElement('tf_fmlv_name',
				true).getValue());
		var flowGroupid = encodeURI(viewList.getChildByElement(
				'tf_fmlv_flowGroupid', true).getValue());
		Ext.apply(view.store.proxy.extraParams, {
			'flowName' : flowName,
			'flowGroupid' : flowGroupid,
			'page' : '1',
			'limit' : DISPATCH.lib.Constants.PAGE_SIZE
		});
		view.getStore().loadPage(1);
	},
	edit_flowManage_btn : function() {
		var flowManageList = this.getFlowManageGrid();
		var selected = flowManageList.getSelectionModel().getSelection();
		if (selected.length != 1) {
			Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,
					DISPATCH.lib.Constants.MSG_SELECTED_NOT_NULL);
			return;
		}
		if (selected[0].data.flowBranch == "1") {
			Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO, "子流程不允许被修改！");
			return;
		}
		var id = selected[0].data.id;
		Ext.Ajax.request({
			url : basePath + '/dispatch/flow/findFlowById',
			async : false,
			params : {
				id : id
			},
			success : function(response) {
				var responseJson = Ext.decode(response.responseText);
				var window = Ext.create(projectName+ '.view.dispatch.flow.FlowManageEditView',{
					record : responseJson.item
				});
				Ext.getCmp("flowManage_edit_cb_flowGroupName").setValue(responseJson.item.flowGroupid);
				var unit = responseJson.item.nextStartunit;
				if(unit.indexOf("WEEK")>0){
//					Ext.getCmp("flowManage_edit_tf_dayOfWeek").show();
					Ext.getCmp("flowManage_edit_tf_nextStartunit").setValue('WEEK');
					Ext.getCmp("flowManage_edit_tf_dayOfWeek").setValue(unit);
				}else{
//					Ext.getCmp("flowManage_edit_tf_dayOfWeek").hide();
					Ext.getCmp("flowManage_edit_tf_nextStartunit").setValue(responseJson.item.nextStartunit);
				}
				if (responseJson.item.creator == '0') {
					Ext.getCmp('flowManage_edit_df_workDate').setDisabled(true);
					Ext.getCmp('flowManage_edit_df_startTime').setDisabled(true);
					/*Ext.getCmp('flowManage_edit_tf_nextStarttime').setDisabled(true);*/
					Ext.getCmp('flowManage_edit_tf_nextStartunit').setDisabled(true);
					Ext.getCmp('flowManage_edit_tf_dayOfWeek').setDisabled(true);
				}
				window.show();
			},
			failure : function(response) {
				var responseJson = Ext.decode(response.responseText);
				Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,responseJson.message);
			}
		});
	},
	save_flowManage_btn : function() {
		var view = this.getFlowManageEdit();
		var viewGrid = this.getFlowManageGrid();
		var store = viewGrid.getStore();
		var unit = Ext.getCmp("flowManage_edit_tf_nextStartunit").getValue();
		var form = view.getComponent('flowManageForm').getForm();
		if (form.isValid()) {
			form.submit({
				async : false,
				url : basePath + '/dispatch/flow/update', 
				params : {
					nextStartunit : unit
				},
				//添加内容:验证任务链名是否重名
				success : function(form, action) {
					Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,action.result.message);
					store.load();
					view.close();
				},
				failure : function(form, action) {
					var msg = action.result.message;
					Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,msg);
					store.load();
					//view.close();
				}
			});
		}
	},
	del_flowManage_btn : function() {
		var flowManageList = this.getFlowManageGrid();
		var selected = flowManageList.getSelectionModel().getSelection();
		if (selected.length != 1) {
			Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_SELECTED_NOT_NULL);
			return;
		}
		Ext.MessageBox.confirm("删除提示", "任务链删除会附带删除任务链下面的所有任务且不可回退，确认删除吗？",
				function(btn, txt) {
					if (btn == "yes") {
						if (selected[0].data.flowBranch == "1") {
							Ext.MessageBox.alert("系统提示", "子任务链不允许被删除！");
							return;
						} else {
							var store = flowManageList.getStore();
							var id = selected[0].data.id;
							Ext.Ajax.request({
										url : basePath
												+ '/dispatch/flow/delete',
										async : false,
										params : {
											id : id
										},
										success : function(response) {
											var responseJson = Ext.decode(response.responseText);
											Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,responseJson.message);
										},
										failure : function(response) {
											var responseJson = Ext.decode(response.responseText);
											Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,responseJson.message);
										}
									});
						}
						store.load();
					} else if (btn == "no") {
						return;
					}
				});

	},
	flow_refresh_flowManage_btn : function() {
		var win = this.getFlowManageList();
		var store = this.getFlowManageGrid().getStore();
		var botton_icon = Ext.get('btn_fmlv_flow_refresh-btnIconEl');
		var botton_inner = Ext.get('btn_fmlv_flow_refresh-btnInnerEl');

		if (win.refresh_task == null) {
			var refreshwin = Ext.create('Ext.window.Window', {
						title : '刷新时间设置',
						height : 150,
						width : 300,
						modal : true,
						id : 'refresh_window',
						items : [{
									xtype : 'numberfield',
									fieldLabel : '刷新时间（秒）',
									lableWidth : 50,
									value : 10,
									minValue : 5,
									margin : 10,
									id : 'refreshTime'
								}],
						buttons : [{
							text : '确定',
							handler : function(button, e) {
								var val = Ext.getCmp('refreshTime').value;
								if (val < 5) {
									return;
								}
								var refresh = function() {
									store.load();
								};
								botton_icon.replaceCls('icon-refresh',
										'icon-stop');
								botton_inner.dom.innerHTML = "停用刷新";
								win.refresh_task = Ext.TaskManager.start({
											run : refresh,
											interval : val * 1000
										});
								Ext.getCmp('refresh_window').close();
							}
						}]
					});
			refreshwin.show();
		} else if (win.refresh_task.stopped) {
			botton_icon.replaceCls('icon-refresh', 'icon-stop');
			botton_inner.dom.innerHTML = "停用刷新";
			Ext.TaskManager.start(win.refresh_task);
		} else {
			botton_icon.replaceCls('icon-stop', 'icon-refresh');
			botton_inner.dom.innerHTML = "定时刷新";
			Ext.TaskManager.stop(win.refresh_task);
		}
	},
	actioncolumnClick : function(component,td,row,col,e){
		var className = e.target.className;
		if(className.indexOf('task-start')>-1){
			// Ext.Msg.alert("执行任务链");
			var flowManageList = this.getFlowManageGrid();
			var store = flowManageList.getStore();
			var id = store.data.items[row].data.id;
			var creator = store.data.items[row].data.creator;
			var status = store.data.items[row].data.flowStatus;
//			debugger;
			if(creator=='1'){
				return;
			}
			if(status!='0'&&status!='4'){
				store.load();
				Ext.Msg.alert('提示','任务链已经在运行');
				return;
			}
			Ext.Ajax.request({
				url : basePath + '/dispatch/flow/flowStart',
				// async:false,
				params : {
					flowId : id
				},
				callback : function(options, success, response) {
					var responseJson = Ext.decode(response.responseText);
					Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,responseJson.message);
					store.load();
				}
			});
		}
	},
	export_flowManage_btn : function() {
		var viewList = this.getFlowManageList();
		var flowName = encodeURIComponent(encodeURIComponent(viewList.getChildByElement('tf_fmlv_name',true).getValue()));
		var flowGroupid = encodeURIComponent(encodeURIComponent(viewList.getChildByElement('tf_fmlv_flowGroupid',true).getValue()));
		window.location.href = basePath + '/dispatch/flow/flowsExport?flowName='+flowName+"&flowGroupid="+flowGroupid;
	}
});
