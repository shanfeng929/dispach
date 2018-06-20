/**
 * 远程服务配置 控制
 */
Ext.define(projectName+ '.controller.dispatch.remoteservice.RemoteServiceController',{
			// 继承ext控制器
			extend : 'Ext.app.Controller',
			// 引用视图
			views : [
					projectName
							+ '.view.dispatch.remoteservice.RemoteserviceListView',
					projectName
							+ '.view.dispatch.remoteservice.RemoteserviceGridView',
					projectName
							+ '.view.dispatch.remoteservice.RemoteserviceEditView'],
			refs : [{
						ref : 'remoteserviceList',
						selector : 'remoteserviceList'
					}, {
						ref : 'remoteserviceGrid',
						selector : 'remoteserviceGrid'
					}, {
						ref : 'remoteserviceEdit',
						selector : 'remoteserviceEdit'
					}],
			init : function() {
				this.control({
							'remoteserviceList' : {
								boxready : this.init_remoteserviceList
							},
							'remoteserviceList button[action=search]' : {
								click : this.search_remoteservice_btn
							},
							'remoteserviceList button[action=add]' : {
								click : this.add_remoteservice_btn
							},
							'remoteserviceList button[action=edit]' : {
								click : this.edit_remoteservice_btn
							},
							'remoteserviceEdit button[action=save]' : {
								click : this.save_remoteservice_btn
							},
							'remoteserviceList button[action=delete]' : {
								click : this.del_remoteservice_btn
							},
							'remoteserviceList button[action=test]' : {
								click : this.test_remoteservice_btn
							}
						});
			},
			init_remoteserviceList : function() {
				var view = this.getRemoteserviceList();
				view.getChildByElement('btn_rlv_search', true)
						.fireEvent('click');
				var me = this;
				// 有关双击打开编辑的修改_weilai
				this.getRemoteserviceGrid().on('itemdblclick', function() {
					// Ext.MessageBox.alert('aaa', 'aaa');
					var selected = me.getRemoteserviceGrid()
							.getSelectionModel().getSelection();
					if (selected.length = 1) {
						me.edit_remoteservice_btn();
					}

				});
			},
			search_remoteservice_btn : function() {
				var viewList = this.getRemoteserviceList();
				var view = this.getRemoteserviceGrid();
				var name = encodeURI(viewList.getChildByElement('tf_rlv_name',
						true).getValue());
				var remoteIp = encodeURI(viewList.getChildByElement(
						'tf_rlv_remoteIp', true).getValue());
				Ext.apply(view.store.proxy.extraParams, {
					'name' : name,
					'remoteIp' : remoteIp,
					'page' : '1',
					'limit' : DISPATCH.lib.Constants.PAGE_SIZE
				});
				view.getStore().loadPage(1);
			},
			add_remoteservice_btn : function() {
				var view = Ext.create(projectName+ '.view.dispatch.remoteservice.RemoteserviceEditView');
				// var form = view.getComponent("remoteserviceForm").getForm();
				// form.findField('remoteservice_edit_tf_remoteUserName').setValue('');
				// form.findField('remoteservice_edit_tf_remotePasswd').setValue('');
				view.show();
			},
			edit_remoteservice_btn : function() {
				var remoteserviceList = this.getRemoteserviceGrid();
				var selected = remoteserviceList.getSelectionModel()
						.getSelection();
				if (selected.length != 1) {
					Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,
							DISPATCH.lib.Constants.MSG_SELECTED_NOT_NULL);
					return;
				}
				var window = Ext.create(projectName
						+ '.view.dispatch.remoteservice.RemoteserviceEditView');
				window.title = "修改远程服务配置";
				var id = selected[0].data.id
				Ext.Ajax.request({
							url : basePath
									+ '/dispatch/remoteservice/findRemoteById',
							async : false,
							params : {
								id : id
							},
							success : function(response) {
								var responseJson = Ext
										.decode(response.responseText);
								var form = window
										.getComponent("remoteserviceForm")
										.getForm();
								form.findField('remoteservice_edit_tf_id').setValue(responseJson.item.id);
								form.findField('remoteservice_tf_name').setValue(responseJson.item.name);
								form.findField('remoteservice_edit_tf_remoteIp').setValue(responseJson.item.remoteIp);
								form.findField('remoteservice_edit_tf_remoteUserName').setValue(responseJson.item.remoteUserName);
								form.findField('remoteservice_edit_tf_remotePasswd').setValue(responseJson.item.remotePasswd);
//								form.findField('remoteservice_edit_tf_remoteType').setValue(responseJson.item.remoteType);
//								form.findField('remoteservice_edit_tf_remoteDesc').setValue(responseJson.item.remoteDesc);
//								form.findField('remoteservice_edit_tf_remotePort').setValue(responseJson.item.remotePort);
//								form.findField('remoteservice_edit_tf_remoteName').setValue(responseJson.item.remoteNameSpace);
								window.show();
							},
							failure : function(response) {
								var responseJson = Ext
										.decode(response.responseText);
								Ext.Msg.alert(
										DISPATCH.lib.Constants.MSG_TITLE_INFO,
										responseJson.message);
							}
						});
			},
			save_remoteservice_btn : function() {
				var view = this.getRemoteserviceEdit();
				var viewGrid = this.getRemoteserviceGrid();
				var store = viewGrid.getStore();
				var form = view.getComponent('remoteserviceForm').getForm();
				if (form.isValid()) {
					form.submit({
						url : basePath + '/dispatch/remoteservice/saveOrUpdate',
						success : function(form, action) {
							Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,
									action.result.message);
							store.load();
							view.close();
						},
						failure : function(form, action) {
							Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,
									action.result.message);
							store.load();
							view.close();
						}
					});
				}
			},
			del_remoteservice_btn : function() {
				var remoteserviceList = this.getRemoteserviceGrid();
				var selected = remoteserviceList.getSelectionModel()
						.getSelection();
				if (selected.length < 1) {
					Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,
							DISPATCH.lib.Constants.MSG_SELECTED_ONE);// 至少选择一条数据
					return;
				}
				var store = remoteserviceList.getStore();
				// 改为批量删除
				var ids = '';
				for (var i = 0; i < selected.length; i++) {
					ids += selected[i].data.id + ',';
				}
				ids = ids.substring(0, ids.length - 1);
				Ext.MessageBox.confirm("提示", "确定删除选中项？", function(optional) {
					if (optional == 'yes') {
						Ext.Ajax.request({
							url : basePath
									+ '/dispatch/remoteservice/deleteByIds',
							async : false,
							params : {
								ids : ids
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
						store.load();
					}
				});

			},
			test_remoteservice_btn : function() {
				var remoteserviceList = this.getRemoteserviceGrid();
				var selected = remoteserviceList.getSelectionModel()
						.getSelection();
				if (selected.length != 1) {
					Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,
							DISPATCH.lib.Constants.MSG_SELECTED_NOT_NULL);
					return;
				}
				var id = selected[0].data.id;
				// var remoteIp = selected[0].data.remoteIp;
				// var remoteUserName = selected[0].data.remoteUserName;
				// var remotePasswd = selected[0].data.remotePasswd;
				// var remoteType = selected[0].data.remoteType;
				Ext.Ajax.request({
							url : basePath + '/dispatch/remoteservice/test',
							async : false,
							params : {
								id : id
								// remoteIp : remoteIp,
								// remoteUserName : remoteUserName,
								// remotePasswd : remotePasswd
							},
							success : function(response) {
								// debugger;
								var responseJson = Ext
										.decode(response.responseText);
								Ext.Msg.alert(
										DISPATCH.lib.Constants.MSG_TITLE_INFO,
										responseJson.message);
							},
							failure : function(response) {
								var responseJson = Ext
										.decode(response.responseText);
								Ext.Msg.alert(
										DISPATCH.lib.Constants.MSG_TITLE_INFO,
										responseJson.message);
							}
						});
			}
		});
