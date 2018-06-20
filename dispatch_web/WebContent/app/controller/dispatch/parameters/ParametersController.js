/**
 * 参数配置 控制器
 */
Ext.define(
		projectName + '.controller.dispatch.parameters.ParametersController', {
			// 继承控制器
			extend : 'Ext.app.Controller',
			views : [
					projectName
							+ '.view.dispatch.parameters.parametersListView',
					projectName
							+ '.view.dispatch.parameters.parametersGridView',
					projectName
							+ '.view.dispatch.parameters.parametersEditView',
					projectName
							+ '.view.dispatch.parameters.parametersLib.parametersLibForm',
					projectName
							+ '.view.dispatch.parameters.parametersLib.parametersDateLib',
					projectName
							+ '.view.dispatch.parameters.parametersLib.parametersProcLib',
					projectName
							+ '.view.dispatch.parameters.parametersLib.parametersSysLib',
					projectName
							+ '.view.dispatch.parameters.parametersLib.parametersSysEdit'],
			refs : [{
						ref : 'parametersList',
						selector : 'parametersList'
					}, {
						ref : 'parametersGrid',
						selector : 'parametersGrid'
					}, {
						ref : 'parametersEdit',
						selector : 'parametersEdit'
					}, {
						ref : 'parametersLibForm',
						selector : 'parametersLibForm'
					}, {
						ref : 'parametersDateLib',
						selector : 'parametersDateLib'
					}, {
						ref : 'parametersProcLib',
						selector : 'parametersProcLib'
					}, {
						ref : 'parametersSysLib',
						selector : 'parametersSysLib'
					}, {
						ref : 'parametersSysEdit',
						selector : 'parametersSysEdit'
					}],
			init : function() {
				this.control({
							'parametersList button[action=search]' : {
								click : this.search_btn
							},
							'parametersList button[action=add]' : {
								click : this.add_btn
							},
							'parametersList' : {
								boxready : this.init_paras
							},
							'parametersList button[action=delete]' : {
								click : this.del_btn
							},
							'parametersList button[action=edit]' : {
								click : this.edit_btn
							},
							'parametersEdit button[action=save]' : {
								click : this.edit_save_btn
							},
							'parametersEdit button[action=libOpen]' : {
								click : this.open_library
							},
							'parametersDateLib button[action=enter]' : {
								click : this.date_enter
							},
							'parametersProcLib button[action=enter]' : {
								click : this.proc_enter
							},
							'parametersSysLib button[action=enter]' : {
								click : this.custom_enter
							},
							'parametersSysLib button[action=edit]' : {
								click : this.custom_edit
							},
							'parametersSysLib button[action=add]' : {
								click : this.custom_add
							}
						});
			},
			init_paras : function() {
				this.search_btn();
				var me = this;
				// 有关双击打开编辑的修改_weilai
				this.getParametersGrid().on('itemdblclick', function() {
					// Ext.MessageBox.alert('aaa', 'aaa');
					var selected = me.getParametersGrid().getSelectionModel()
							.getSelection();
					if (selected.length = 1) {
						me.edit_btn();
					}

				});
			},
			date_enter : function() { // 提交预设函数:日期 到新增/编辑表单
				// Ext.MessageBox.alert('变啦', '');
				var view = this.getParametersDateLib();
				var viewFather = this.getParametersLibForm();
				var editview = this.getParametersEdit();
				var form = editview.getComponent('parametersForm').getForm();
				var rawValue = view.getComponent(0)
						.getComponent('para_date_current').getValue();
				if (rawValue != null && rawValue != '') {
					form.findField('para_value').setValue(rawValue);
					viewFather.close();
				} else {
					Ext.MessageBox.alert('值为空', '没有生成参数值');
				}
			},
			proc_enter : function() {
				var view = this.getParametersProcLib();
				var viewFather = this.getParametersLibForm();
				var editview = this.getParametersEdit();
				var form = editview.getComponent('parametersForm').getForm();
				var rawValue = view.getComponent(0)
						.getComponent('para_proc_result').getValue();
				if (rawValue != null && rawValue != '') {
					form.findField('para_value').setValue(rawValue);
					viewFather.close();
				} else {
					Ext.MessageBox.alert('值为空', '没有生成参数值');
				}
			},
			custom_enter : function() {
				var view = this.getParametersSysLib();
				var viewFather = this.getParametersLibForm();
				var editview = this.getParametersEdit();
				var form = editview.getComponent('parametersForm').getForm();
				var rawValue = view.getComponent(0)
						.getComponent('para_sys_result').getValue();
				if (rawValue != null && rawValue != '') {
					form.findField('para_value').setValue(rawValue);
					viewFather.close();
				} else {
					Ext.MessageBox.alert('值为空', '没有生成参数值');
				}
			},
			//
			custom_edit : function() {
				// 自定义参数的修改或删除
				var sysview = this.getParametersSysLib();
				var syscb1 = sysview.getComponent(0)
						.getComponent('para_sys_type');
				var syscb2 = sysview.getComponent(0)
						.getComponent('para_sys_name');
				if (syscb1.getValue() == null || syscb1.getValue() == ''
						|| syscb2.getValue() == null || syscb2.getValue() == '') {
					Ext.MessageBox.alert('不能修改', '不能修改定义名为空的参数');
					return;
				}
				var systf = sysview.getComponent(0)
						.getComponent('para_sys_result');
				var editview = Ext
						.create(projectName
								+ '.view.dispatch.parameters.parametersLib.parametersSysEdit');
				var editcb1 = editview.getComponent(0).getComponent(0)
						.getComponent('para_sys_type_edit');
				var edittf2 = editview.getComponent(0).getComponent(0)
						.getComponent('para_sys_name_edit');
				var edittf3 = editview.getComponent(0).getComponent(0)
						.getComponent('para_sys_value_edit');
				editcb1.setValue(syscb1.getValue());
				edittf2.setValue(syscb2.getValue());
				edittf3.setValue(systf.getValue());
				// editcb1.editable = false;
				editcb1.readOnly = true;
				edittf2.readOnly = true;
				editcb1.disabled = true;
				edittf2.disabled = true;
				var form = editview.getComponent(0);
				var save_button = Ext.getCmp('para_sys_edit_save');
				var submit_function = function() {
					form.submit({
								url : basePath + '/dispatch/paracustom/edit',
								success : function(form, action) {
									Ext.Msg.alert(
											DISPATCH.lib.Constants.MSG_TITLE_INFO,
											action.result.message);
									syscb2.getStore().load({ // load未完成也会继续执行下面的语句，所以一定要放在callback里
										callback : function(records, options,
												success) {
											if (syscb2.store.data.length != 0) {
												syscb2
														.select(syscb2.store
																.getAt(0)
																.get('custom_para_name'));
												sysview.selfunction();
											} else {
												syscb2.setValue('');
											}// 刚改了这里
										}
									});

									editview.close();
								},
								failure : function(form, action) {
									Ext.Msg.alert(
											DISPATCH.lib.Constants.MSG_TITLE_INFO,
											action.result.message);
									// store.load();
									editview.close();
								}
							});
				};
				save_button.on('click', function() {
							editcb1.disabled = false;
							edittf2.disabled = false;
							var submit1 = false;
							if (edittf3.getValue() != null
									&& edittf3.getValue != '') {
								Ext.MessageBox.confirm('确定吗？',
										'修改后的内容将覆盖原参数值。',
										function(button, text) {

											if (button == 'yes') {
												submit_function();
											}
										});
							} else {
								Ext.MessageBox.confirm('确定吗？', '置空意味着将删除本条参数',
										function(button, text) {
											if (button == 'yes') {
												submit_function();
											}
										});
							}
						});
				editview.show();
			},
			custom_add : function() {
				// 自定义参数的新增或修改
				var sysview = this.getParametersSysLib();
				var syscb1 = sysview.getComponent(0)
						.getComponent('para_sys_type');
				var syscb2 = sysview.getComponent(0)
						.getComponent('para_sys_name');
				var systf = sysview.getComponent(0)
						.getComponent('para_sys_result');
				var editview = Ext
						.create(projectName
								+ '.view.dispatch.parameters.parametersLib.parametersSysEdit');
				var editcb1 = editview.getComponent(0).getComponent(0)
						.getComponent('para_sys_type_edit');
				var edittf2 = editview.getComponent(0).getComponent(0)
						.getComponent('para_sys_name_edit');
				var edittf3 = editview.getComponent(0).getComponent(0)
						.getComponent('para_sys_value_edit');
				editcb1.setValue(syscb1.getValue());
				/*
				 * Ext.applyIf(editcb1, { store : syscb1.store, displayField :
				 * 'para_type_name' }); editcb1.store.load();
				 */
				/*
				 * editcb1.setValue(syscb1.getValue());
				 * edittf2.setValue(syscb2.getValue());
				 * edittf3.setValue(systf.getValue()); editcb1.editable = false;
				 * editcb1.readOnly = true; edittf2.readOnly = true;
				 * editcb1.disabled = true; edittf2.disabled = true;
				 */
				var form = editview.getComponent(0);
				var save_button = Ext.getCmp('para_sys_edit_save');
				var submit_function = function() {
					form.submit({
								url : basePath + '/dispatch/paracustom/add',
								success : function(form, action) {
									Ext.Msg.alert(
											DISPATCH.lib.Constants.MSG_TITLE_INFO,
											action.result.message);
									syscb2.getStore().load();
									editview.close();
								},
								failure : function(form, action) {
									Ext.Msg.alert(
											DISPATCH.lib.Constants.MSG_TITLE_INFO,
											action.result.message);
									// store.load();

									editview.close();
								}
							});
				};
				save_button.on('click', function() {
							if (edittf2.getValue() == null
									|| edittf2.getValue() == ''
									|| edittf3.getValue() == null
									|| edittf3.getValue() == '') {
								Ext.MessageBox.alert('参数未填', '参数名和参数值必填');
								return;
							} else {
								submit_function();
							}

						});
				editview.show();
			},
			open_library : function() {
				var libView = Ext
						.create(projectName
								+ 'view.dispatch.parameters.parametersLib.parametersLibForm');
				libView.show();
			},
			init_parametersList : function() {
				var view = this.getParametersList();
				view.getChildByElement('btn_para_search', true)
						.fireEvent('click');
			},
			add_btn : function() {
				// Ext.MessageBox.alert('b', 'b');
				var view = Ext.create(projectName
						+ '.view.dispatch.parameters.parametersEditView');
				view.show();
			},
			edit_btn : function() {
				var selected = this.getParametersGrid().getSelectionModel()
						.getSelection();
				if (selected.length != 1) {
					Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,
							DISPATCH.lib.Constants.MSG_SELECTED_NOT_NULL);
					return;
				}
				var selectedData = selected[0].data;
				var view = Ext.create(projectName
						+ '.view.dispatch.parameters.parametersEditView');
				view.title = '修改参数';
				var form = view.getComponent('parametersForm').getForm();
				form.findField('para_id').setValue(selectedData.para_id);
				form.findField('para_name').setValue(selectedData.para_name);
				form.findField('para_comment')
						.setValue(selectedData.para_comment);
				form.findField('para_type').setValue(selectedData.para_type);
				form.findField('para_value').setValue(selectedData.para_value);
				form.findField('static_para')
						.setValue(selectedData.static_para);
				view.show();
			},
			edit_save_btn : function() {
				// Ext.MessageBox.show('a', 'a');
				var view = this.getParametersEdit();
				var viewGrid = this.getParametersGrid();
				var store = viewGrid.getStore();
				var form = view.getComponent('parametersForm').getForm();
				// form.findField('static_para') =
				// form.findField('static_para1').getGroupValue;
				if (form.isValid()) {
					form.submit({
								url : basePath + '/dispatch/parameters/edit',
								success : function(form, action) {
									Ext.Msg.alert(
											DISPATCH.lib.Constants.MSG_TITLE_INFO,
											action.result.message);
									store.load();
									view.close();
								},
								failure : function(form, action) {
									Ext.Msg.alert(
											DISPATCH.lib.Constants.MSG_TITLE_INFO,
											action.result.message);
									if (action.result.message != '已经存在同名参数') {
										store.load();
										view.close();
									}

								}
							});
				}
			},
			// 下面这行是测试
			last_search_word : '',
			// 上面这行是测试
			search_btn : function() {
				var viewList = this.getParametersList();
				var view = this.getParametersGrid();
				var para_name = encodeURI(viewList.getChildByElement(
						'p_search_name', true).getValue());
				// Ext.MessageBox.alert(para_name,para_name); //测试
				Ext.apply(view.store.proxy.extraParams, {
							'para_name' : para_name,
							'page' : '1',
							'limit' : DISPATCH.lib.Constants.PAGE_SIZE
						});
				if (this.last_search_word != para_name) {
					Ext.getCmp('parameters_list_view_bbar').moveFirst();
				}
				this.last_search_word = para_name;
				// Ext.MessageBox.alert('a','c');
				view.getStore().load();
			},
			del_btn : function() {
				// Ext.MessageBox.alert('a','a'); //测试
				var view = this.getParametersGrid();
				var selected = view.getSelectionModel().getSelection();
				if (selected.length < 1) {
					Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,
							'请至少选择一条数据。');
					return;
				}
				var store = view.getStore();
				if (selected.length > 1) {
					/*
					 * Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,
					 * DISPATCH.lib.Constants.MSG_SELECTED_NOT_SINGLE);
					 */
					// 批量删除的场合
					var para_ids = new Array();
					for (var i = 0; i < selected.length; i++) {
						para_ids.push(selected[i].get('para_id'));
					}
					var multiDel = function() {
						Ext.Ajax.request({
							url : basePath + '/dispatch/parameters/multidelete',
							async : false,
							params : {
								para_ids : para_ids
							},
							success : function(response) {
								store.load();
								var responseJson = Ext
										.decode(response.responseText);
								Ext.Msg.alert(
										DISPATCH.lib.Constants.MSG_TITLE_INFO,
										responseJson.message);
							},
							failure : function(response) {
								store.load();
								var responseJson = Ext
										.decode(response.responseText);
								Ext.Msg.alert(
										DISPATCH.lib.Constants.MSG_TITLE_INFO,
										responseJson.message);
							}
						});
					}
					Ext.MessageBox.confirm('确定吗？', '会删除所有选中的行！', function(
									button, text) {
								if (button == 'yes') {
									multiDel();
								}
							});

					// Ext.MessageBox.alert('', JSON.stringify(para_ids));
					return;
				}

				var para_id = selected[0].data.para_id;
				Ext.Ajax.request({
							url : basePath + '/dispatch/parameters/delete',
							async : false,// /dispatch/parameters
							params : {
								para_id : para_id
							},
							success : function(response) {
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
				store.load();
			}

		});