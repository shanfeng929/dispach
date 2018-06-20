/**
 * 远程服务配置 控制
 */
Ext.define(projectName+ '.controller.dispatch.parameters.DataSourceController',{
	// 继承ext控制器
	extend : 'Ext.app.Controller',
	// 引用视图
	views : [projectName + '.view.dispatch.parameters.DataSourceListView',
	         projectName + '.view.dispatch.parameters.DataSourceGridView',
	         projectName + '.view.dispatch.parameters.DataSourceEditView'
	],
	refs : [{
				ref : 'dataSourceList',
				selector : 'dataSourceList'
			}, {
				ref : 'dataSourceGrid',
				selector : 'dataSourceGrid'
			}, {
				ref : 'dataSourceEdit',
				selector : 'dataSourceEdit'
	}],
	init : function() {
		this.control({
					'dataSourceList' : {
						boxready : this.init_datasourceList
					},
					'dataSourceList button[action=search]' : {
						click : this.search_datasource_btn
					},
					'dataSourceList button[action=add]' : {
						click : this.add_datasource_btn
					},
					'dataSourceList button[action=edit]' : {
						click : this.edit_datasource_btn
					},
					'dataSourceEdit button[action=save]' : {
						click : this.save_datasource_btn
					},
					'dataSourceList button[action=delete]' : {
						click : this.del_datasource_btn
					},
					'dataSourceEdit button[action=test_connect]' : {
						click : this.test_datasource_btn
					}
				});
	},
	init_datasourceList : function() {
		var view = this.getDataSourceList();
		view.getChildByElement('btn_db_search', true).fireEvent('click');
		// 有关双击打开编辑
//		var me = this;
//		this.getDataSourceGrid().on('itemdblclick', function() {
//			// Ext.MessageBox.alert('aaa', 'aaa');
//			var selected = me.getDataSourceGrid().getSelectionModel().getSelection();
//			if (selected.length = 1) {
//				me.edit_datasource_btn();
//			}
//		});
	},
	search_datasource_btn : function() {
		var viewList = this.getDataSourceList();
		var view = this.getDataSourceGrid();
		var name = encodeURI(viewList.getChildByElement('tf_db_name',true).getValue());
		Ext.apply(view.store.proxy.extraParams, {
					'dbName' : name,
					'page' : '1',
					'limit' : DISPATCH.lib.Constants.PAGE_SIZE
		});
		view.getStore().loadPage(1);
	},
	add_datasource_btn : function() {
		var view = Ext.create(projectName + '.view.dispatch.parameters.DataSourceEditView');
		view.show();
	},
	edit_datasource_btn : function() {
		var dataSourceList = this.getDataSourceGrid();
		var selected = dataSourceList.getSelectionModel().getSelection();
		if (selected.length != 1) {
			Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_SELECTED_NOT_NULL);
			return;
		}
//		window.title = "修改远程服务配置";
		var id = selected[0].data.dbId
		Ext.Ajax.request({
			url : basePath+ '/datasource/findDataSourceById',
			async : false,
			params : {
				dbId : id
			},
			success : function(response) {
				var responseJson = Ext.decode(response.responseText);
				var window = Ext.create(projectName+'.view.dispatch.parameters.DataSourceEditView',{rec:responseJson.item});
				window.show();
			},
			failure : function(response) {
				var responseJson = Ext.decode(response.responseText);
				Ext.Msg.alert(
						DISPATCH.lib.Constants.MSG_TITLE_INFO,
						responseJson.message);
			}
		});
	},
	save_datasource_btn : function() {
		var view = this.getDataSourceEdit();
		var viewGrid = this.getDataSourceGrid();
		var store = viewGrid.getStore();
		var form = Ext.getCmp('dataSourceForm').getForm();
		if (form.isValid()) {
			form.submit({
				url : basePath + '/datasource/saveOrUpdate',
				success : function(form, action) {
					if(action.result.success){
						store.load();
						view.close();
					}else{
						Ext.Msg.alert("提示",action.result.message);
					}
//					debugger;
				},
				failure : function(form, action) {
					Ext.Msg.alert("错误",action.result.message);
					store.load();
				}
			});
		}
	},
	del_datasource_btn : function() {
		var dataSourceList = this.getDataSourceGrid();
		var selected = dataSourceList.getSelectionModel().getSelection();
		if (selected.length != 1) {
			Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_SELECTED_NOT_NULL);
			return;
		}
		var id = selected[0].data.dbId
		Ext.Ajax.request({
			url : basePath+ '/datasource/delete',
			async : false,
			params : {
				dbId : id
			},
			success : function(response) {
//				debugger;
				var responseJson = Ext.decode(response.responseText);
				if(responseJson.success){
					dataSourceList.getStore().load();
				}else{
					Ext.Msg.alert("提示",responseJson.message);
				}
			},
			failure : function(response) {
//				debugger;
				var responseJson = Ext.decode(response.responseText);
				Ext.Msg.alert("错误",responseJson.message);
			}
		});
	},
	test_datasource_btn : function() {
		var form = Ext.getCmp('dataSourceForm').getForm();
		if (form.isValid()) {
			form.submit({
				url : basePath + '/datasource/testConnect',
				success : function(form, action) {
//					debugger;
					Ext.Msg.alert("提示",action.result.message);
				},
				failure : function(form, action) {
//					debugger;
					Ext.Msg.alert("错误",action.result.message);
				}
			});
		}
	}
});
