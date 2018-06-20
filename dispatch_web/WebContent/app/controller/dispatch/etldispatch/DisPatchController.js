Ext.define(projectName + '.controller.dispatch.etldispatch.DisPatchController',
		{
			// 继承ext控制器
			extend : 'Ext.app.Controller',
			// 引用视图
			views : [
					projectName + '.view.dispatch.etldispatch.LinuxAddView',
					projectName + '.view.dispatch.etldispatch.DisPatchListView',
					projectName
							+ '.view.dispatch.etldispatch.DisPatchPackageListView',
					// projectName+'.view.dispatch.etldispatch.TemplateAddView',
					projectName + '.view.dispatch.etldispatch.TemplateListView',
					projectName + '.view.dispatch.etlflowdispatch.FlowAddView',
					projectName
							+ '.view.dispatch.etlflowdispatch.flowSubAddView',
					projectName + '.lib.component.FlowTreePanel',
					projectName + '.view.dispatch.etldispatch.SqlAddView',
					projectName + '.view.dispatch.etldispatch.AlarmView',
					projectName
							+ '.view.dispatch.etldispatch.ops.AlarmSelectView',
					projectName
							+ '.view.dispatch.etldispatch.ops.AlarmMultiView',
					projectName + '.view.dispatch.etldispatch.ops.TreeTabView',
					projectName
							+ '.view.dispatch.etldispatch.ops.ModelTreeMenu',
					projectName
							+ '.view.dispatch.etldispatch.ops.ModelSearchView',
					projectName
							+ '.view.dispatch.etldispatch.ops.ModelListView',
					projectName
							+ '.view.dispatch.etldispatch.ops.ModelGridView',
					projectName
							+ '.view.dispatch.etldispatch.DataSourceAddView'],

			refs : [{
						ref : 'AddView',
						selector : 'linuxAddView'
					}, {
						ref : 'dispatchlistview',
						selector : 'dispatchlistview'
					}, {
						ref : 'disPatchPackageListView',
						selector : 'disPatchPackageListView'
					}, {
						ref : 'flowView',
						selector : 'flowAddView'
					}, {
						ref : 'flowTreePanel',
						selector : 'flowTreePanel'
					}, {
						ref : 'flowSubAddView',
						selector : 'flowSubAddView'
					}, {
						ref : 'templateList',
						selector : 'templateList'
					}, {
						ref : 'sqlView',
						selector : 'sqlAddView'
					}, {
						ref : 'javaView',
						selector : 'javaAddView'
					}, {
						ref : 'alarmView',
						selector : 'alarmView'
					}, {
						ref : 'alarmSelectView',
						selector : 'alarmSelectView'
					}, {
						ref : 'alarmMultiView',
						selector : 'alarmMultiView'
					}, {
						ref : 'alarmTitleView',
						selector : 'alarmTitleView'
					}, {
						ref : 'modelSearch',
						selector : 'modelSearch'
					}, {
						ref : 'modelGrid',
						selector : 'modelGrid'
					}, {
						ref : 'dataSourceAdd',
						selector : 'dataSourceAdd'
					}],
			init : function() {
				this.control({
							'linuxAddView button[action=save]' : {
								click : this.taskSave
							},
							'linuxAddView button[action=ParameterButton]' : {
								click : this.ParameterButton
							},
							'flowAddView button[action=save]' : {
								click : this.flowSave
							},
							'flowTreePanel button[action=search]' : {
								click : this.search_flowTree_btn
							},
							'flowTreePanel button[action=move]' : {
								click : this.flow_move
							},
							'templateConfig button[action=save]' : {
								click : this.templateSave
							},
							'flowSubAddView button[action=save]' : {
								click : this.subFlowSave
							},
							/*
							 * 'linuxAddView button[action=call]' : { click :
							 * this.callTemplate }, 'linuxAddView
							 * button[action=register]' : { click :
							 * this.registerTemplate },
							 */
							'templateAdd button[action=save]' : {
								click : this.templateSave
							},
							'templateList button[action=select]' : {
								click : this.templateSelect
							},
							'linuxAddView button[action=getPara]' : {
				// click : this.linuxGetPara
							},
							'sqlAddView button[action=getPara]' : {
								click : this.sqlGetPara
							},
							/*
							 * 'sqlAddView button[action=register]' : { click :
							 * this.registerTemplate }, 'sqlAddView
							 * button[action=call]' : { click :
							 * this.callTemplate },
							 */
							'sqlAddView button[action=save]' : {
								click : this.sqlTaskSave
							},
							'javaAddView button[action=save]' : {
								click : this.javaTaskSave
							},
							'alarmView button[action=save]' : {
								click : this.alarmTaskSave
							},
							'alarmMultiView button[action=save]' : {
								click : this.alarmMultiSave
							},
							'modelSearch button[action=search]' : {
								click : this.searchPage
							},
							'modelSearch button[action=reset]' : {
								click : this.searchReset
							},
							'dataSourceAdd button[action=save]' : {
								click : this.save_datasource_btn
							},

							'dataSourceAdd button[action=test_connect]' : {
								click : this.test_datasource_btn
							},
							'#organTree' : {
								itemdblclick : this.organTreeClick
							},
							'#titleTree' : {
								itemdblclick : this.titleTreeClick
							},
							'#modelGrid' : {
								itemdblclick : this.modelGridDblClick
							},
							'#alarmtitleSelector' : {
								itemdblclick : this.titleSelectorClick
							}
						});
			},
			organTreeClick : function(view, record, item, index, e, eOpts) {
				var me = this;
				var node = record.raw;
				if (!node.leaf)
					return;
				var form = Ext.getCmp(projectName
						+ '.view.dispatch.etldispatch.ops.ModelSearchView');// 获得search的form
				// Ext.MessageBox.alert(form.getId());
				// form.reset();
				var modelGrid = me.getModelGrid();
				var params = [];
				var searchData = {
					name : 'organId',
					operator : 'EQUAL',
					valueType : 'INTEGER',
					value : node.orgId
				};
				params.push(searchData);
				modelGrid.searchData = Ext.encode(params);
				modelGrid.searchType = 'organ';
				modelGrid.getStore().load();
				// debugger;
			},
			titleTreeClick : function(view, record, item, index, e, eOpts) {
				var me = this;
				var node = record.raw;
				if (!node.leaf)
					return;
				var form = Ext.getCmp(projectName
						+ '.view.dispatch.etldispatch.ops.ModelSearchView');// 获得search的form
				// form.reset();
				var modelGrid = me.getModelGrid();
				var params = [];
				var searchData = {
					name : 'titleId',
					operator : 'EQUAL',
					valueType : 'INTEGER',
					value : node.id
				};
				params.push(searchData);
				modelGrid.searchData = Ext.encode(params);
				modelGrid.searchType = 'title';
				modelGrid.getStore().load();
			},
			modelGridDblClick : function(view, record, item, index, e) {
				// Ext.MessageBox.alert('','');
				// debugger;
				// Ext.MessageBox.alert(record.get('modelName'), '');
				var modelCode = record.get('modelCode');
				var modelName = record.get('modelName');
				var modelCodeField = Ext.getCmp(projectName
						+ '.view.dispatch.etldispatch.AlarmView.modelCode');
				var modelNameField = Ext.getCmp(projectName
						+ '.view.dispatch.etldispatch.AlarmView.modelName');
				modelCodeField.setValue(modelCode);
				modelNameField.setValue(modelName);
				this.getAlarmSelectView().close();
			},
			searchPage : function() {
				var me = this;
				var modelGrid = me.getModelGrid();
				var data = modelGrid.searchData;
				var params = [];
				if (modelGrid.searchType) {
					if (data && data != '') {
						var searchs = Ext.decode(data);
						params.push(searchs[0]);
					}
				}
				var searchSet = Ext.getCmp('BaseSearch.searchSet');
				var items = searchSet.getComponent(0).items.items;// 获得form中的搜索项
				items = items.concat(searchSet.getComponent(1).items.items);
				var searchData = {};

				Ext.each(items, function(r) {
							searchData = {
								name : '',
								operator : '',
								valueType : '',
								value : ''
							};// 搜索名和搜索值map
							searchData.name = r.name == undefined
									? null
									: r.name;
							searchData.valueType = r.valueType == undefined
									? null
									: r.valueType;
							// 给搜索条件赋值
							searchData.value = r.value == undefined
									? null
									: r.value;
							searchData.operator = r.operator == undefined
									? null
									: r.operator;
							if (searchData.name != 'organId'
									&& searchData.name != 'titleId') {
								searchData.operator = 'LIKE';
							}
							params.push(searchData);
						});
				modelGrid.searchData = Ext.encode(params);
				modelGrid.getStore().load();
			},
			/**
			 * 搜索框重置
			 */
			searchReset : function() {
				var me = this;
				var form1 = me.getModelSearch();// 获得search的form
				form1.form.reset();
				var modelGrid = me.getModelGrid();
				var data = modelGrid.searchData;
				var params = [];
				if (modelGrid.searchType) {
					if (data && data != '') {
						var searchs = Ext.decode(data);
						params.push(searchs[0]);
					}
				} else {

				}
				modelGrid.searchData = Ext.encode(params); // 将组件中保存的搜索条件清空

				modelGrid.getStore().load();
			},
			titleSelectorClick : function(view, record, item, index, e) {
				// Ext.MessageBox.alert('','');
				var grid = Ext.getCmp('alarmtitleSelector');
				var alarmView = this.getAlarmView();
				var selected = grid.getSelectionModel().getSelection();
				if (selected.length = 1) {
					// Ext.MessageBox.alert(record.get('modelName'), '');
					var modelCode = record.get('id');
					var modelName = record.get('title');
					var modelCodeField = Ext.getCmp(projectName
							+ '.view.dispatch.etldispatch.AlarmView.modelCode');
					var modelNameField = Ext.getCmp(projectName
							+ '.view.dispatch.etldispatch.AlarmView.modelName');
					modelCodeField.setValue(modelCode);
					modelNameField.setValue(modelName);
					this.getAlarmTitleView().close();
				}

			},
			alarmMultiSave : function() {
				var alarmView = this.getAlarmView();
				var multiStore = Ext.getCmp('AlarmMultiView.localField')
						.getStore();
				var multiView = this.getAlarmMultiView();
				alarmView.localStore = Ext.encode(Ext.pluck(
						multiStore.data.items, 'data'));
				var modelCodeField = Ext.getCmp(projectName
						+ '.view.dispatch.etldispatch.AlarmView.modelCode');
				// Ext.MessageBox.alert(alarmView.localStore);
				modelCodeField
						.setValue(Ext.decode(alarmView.localStore).length);
				multiView.close();
			},
			linuxGetPara : function() {
				var addView = this.getAddView();
				var id = addView.getId();
				var grid = Ext
						.getCmp(projectName
								+ '.view.dispatch.etlflowdispatch.flowAddView.taskPara');
				var paraName = Ext
						.getCmp(projectName
								+ '.view.dispatch.etlflowdispatch.flowAddView.paraName')
						.getRawValue();
				var commandField = Ext
						.getCmp(projectName
								+ '.view.dispatch.etldispatch.linuxAddView.taskCommand');
				// Ext.MessageBox.alert(paraName, '');
				Ext.Ajax.request({
					url : basePath + '/DisPatch/addparameters',
					params : {
						'taskId' : id,
						'paraName' : paraName
					},
					success : function(response) {
						var responseJson = Ext.decode(response.responseText);
						grid.store.load();

						if (responseJson.message == '节点参数添加成功') {
							// Ext.MessageBox.alert('success', '');
							commandField
									.setValue(commandField.getValue()
											+ ' $'
											+ responseJson.listItems[0].paraName);
						} else {
							Ext.MessageBox.alert(result.message, '');
						}
					},
					failure : function() {
					}
				});

			},
			sqlGetPara : function() {
				var sqlView = this.getSqlView();
				var id = sqlView.getId();
				var grid = Ext.getCmp(projectName
						+ '.view.dispatch.etlflowdispatch.sqlAddView.taskPara');
				var paraName = Ext.getCmp(projectName
						+ '.view.dispatch.etlflowdispatch.sqlAddView.paraName')
						.getRawValue();
				var commandField = Ext.getCmp(projectName
						+ '.view.dispatch.etldispatch.sqlAddView.taskCommand');
				// Ext.MessageBox.alert(paraName, '');
				Ext.Ajax.request({
							url : basePath + '/DisPatch/addparameters',
							params : {
								'taskId' : id,
								'paraName' : paraName
							},
							success : function(response) {
								var responseJson = Ext
										.decode(response.responseText);
								grid.store.load();

								if (responseJson.message != '节点参数添加成功') {
									Ext.MessageBox.alert(result.message, '');// 在前端提示一下错误内容。
								}
							},
							failure : function() {
							}
						});
			},
			/*
			 * para_edit_add_listen : function() { // var linuxAddView =
			 * this.getAddView(); var grid = Ext .getCmp(projectName +
			 * '.view.dispatch.etlflowdispatch.flowAddView.taskPara');
			 * grid.on('edit', function(editor, e) { var rec = e.record; //
			 * Ext.MessageBox.alert(rec.get("paraName"),rec.get("paraValue"));
			 * Ext.Ajax.request({ url : basePath + '/DisPatch/editparameters',
			 * params : { 'id' : rec.get('id'), 'taskId' : rec.get('taskId'),
			 * 'paraName' : rec.get('paraName'), 'paraValue' :
			 * rec.get('paraValue'), 'paraId' : rec.get('paraId'), 'overall' :
			 * rec.get('overall') }, success : function(response) { var
			 * responseJson = Ext .decode(response.responseText);
			 * grid.store.load(); }, failure : function() { } }); }); },
			 * para_edit_add_listen_sql : function() { // var sqlAddView =
			 * this.getSqlView(); var grid = Ext.getCmp(projectName +
			 * '.view.dispatch.etlflowdispatch.sqlAddView.taskPara');
			 * grid.on('edit', function(editor, e) { var rec = e.record; //
			 * Ext.MessageBox.alert(rec.get("paraName"),rec.get("paraValue"));
			 * Ext.Ajax.request({ url : basePath + '/DisPatch/editparameters',
			 * params : { 'id' : rec.get('id'), 'taskId' : rec.get('taskId'),
			 * 'paraName' : rec.get('paraName'), 'paraValue' :
			 * rec.get('paraValue'), 'paraId' : rec.get('paraId'), 'overall' :
			 * rec.get('overall') }, success : function(response) { var
			 * responseJson = Ext .decode(response.responseText);
			 * grid.store.load(); }, failure : function() { } }); }); },
			 */
			/*
			 * actionShell : function() {
			 * 
			 * var ip = Ext .getCmp(projectName +
			 * '.view.dispatch.etldispatch.shellAddView.serverAddress')
			 * .getValue(); var field = Ext .getCmp(projectName +
			 * '.view.dispatch.etldispatch.shellAddView.fileAddress')
			 * .getValue(); var user = Ext.getCmp(projectName +
			 * '.view.dispatch.etldispatch.shellAddView.userName') .getValue();
			 * var password = Ext.getCmp(projectName +
			 * '.view.dispatch.etldispatch.shellAddView.passWord') .getValue();
			 * Ext.Ajax.request({ url : basePath + '/DisPatch/action', params : {
			 * 'serverAddress' : ip, 'fileAddress' : field, 'userName' : user,
			 * 'passWord' : password }, success : function(result) {
			 * 
			 * Ext.Msg.show({ title : '提示', msg : result.responseText, buttons :
			 * Ext.MessageBox.OK, icon : Ext.MessageBox.INFO }); },
			 * 
			 * failure : function() { } }); },
			 */
			// 保存任务或更新
			taskSave : function() {
				var viewList = this.getAddView();
				var BasicsForm = Ext.getCmp(projectName
						+ '.view.dispatch.etldispatch.linuxAddView.linuxForm');
				// var StrategyForm = Ext.getCmp(projectName+
				// '.view.dispatch.etldispatch.linuxAddView.linuxStrategyForm');
				if (BasicsForm.getForm().isValid()
				/* && StrategyForm.getForm().isValid() */) {
					var id = viewList.getId();
					var taskName = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.linuxAddView.taskName')
							.getValue();
					var taskDesc = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.linuxAddView.taskDesc')
							.getValue();
					var taskRemote = Ext.getCmp('linuxAddView.remote')
							.getValue();
					var taskAddress = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.linuxAddView.taskCommand')
							.getValue();
					/*
					 * var taskParameter = Ext .getCmp(projectName +
					 * '.view.dispatch.etldispatch.linuxAddView.taskParameter')
					 * .getValue();
					 */
					var taskType = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.linuxAddView.taskType')
							.getValue();
					// var errorNum = Ext.getCmp(projectName+
					// '.view.dispatch.etldispatch.linuxAddView.errorNum').getValue();
					// var loop = Ext.getCmp(projectName+
					// '.view.dispatch.etldispatch.linuxAddView.loop').getValue();
					// var taskError = Ext.getCmp(projectName+
					// '.view.dispatch.etldispatch.linuxAddView.errorIsNo').getValue();
					// var taskActive = Ext.getCmp(projectName+
					// '.view.dispatch.etldispatch.linuxAddView.activIsNo').getValue();
					// var taskCustom = Ext.getCmp(projectName+
					// '.view.dispatch.etldispatch.linuxAddView.branchCondition').getValue();
					var taskBranch = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.linuxAddView.branchBing')
							.getValue();
					var outParam = Ext
							.getCmp(projectName
									+ '.view.dispatch.etlflowdispatch.flowAddView.paraName')
							.getValue();
					/*
					 * if (taskActive == '是' || taskActive == 1) { taskActive =
					 * '1' } else { taskActive = '0' } if (taskError == '是' ||
					 * taskError == 1) { taskError = '1' } else { taskError =
					 * '0' }
					 */
					if (taskBranch) {
						taskBranch = '0';
					} else {
						taskBranch = '1';
					}
					// var saveorupdate = Ext.getCmp(projectName+
					// '.view.dispatch.etldispatch.linuxAddView.updateorsave').getValue();
					// 插入AJAX
					/*
					 * if (false) { Ext.Ajax.request({ url : basePath +
					 * '/DisPatch/insert', params : { 'id' : id, 'taskName' :
					 * taskName, 'taskDesc' : taskDesc, 'taskRemote' :
					 * taskRemote, 'taskAddress' : taskAddress, 'taskParameter' :
					 * '',
					 */
					/* 'errorNum' : errorNum, */
					/* 'taskError' : taskError, */
					/* 'taskLoop' : loop, */
					/* 'taskActive' : taskActive, */
					/* 'taskCustom' : taskCustom, */
					/*
					 * 'taskBranch' : taskBranch }, success : function(result) {
					 * var json = Ext.decode(result.responseText);
					 * Ext.Ajax.request({ url : basePath +
					 * '/DisPatch/lasttaskid', params : { 'id' : id }, success :
					 * function(result) { var pid = result.responseText;
					 * parent.alertNodeName(pid, id, taskName);
					 * parent.changename(pid, id, taskName); viewList.close();
					 * Ext.Msg.show({ title : '提示', msg : json.message, buttons :
					 * Ext.MessageBox.OK, icon : Ext.MessageBox.INFO });
					 */
					/*
					 * var window =
					 * Ext.create(projectName+'.view.dispatch.etlflowdispatch.subDraw',{id:id});
					 * window.show();
					 */

					/*
					 * } }); },
					 * 
					 * failure : function(form, action) { } }); }
					 */
					Ext.Ajax.request({
						url : basePath + '/DisPatch/update',
						params : {
							'id' : id,
							'taskName' : taskName,
							'taskDesc' : taskDesc,
							'taskRemote' : taskRemote,
							'taskAddress' : taskAddress,
							'taskType' : taskType,
							'taskParameter' : '',
							/*
							 * 'errorNum' : errorNum, 'taskError' : taskError,
							 * 'taskLoop' : loop, 'taskActive' : taskActive,
							 * 'taskCustom' : taskCustom,
							 */
							'taskBranch' : taskBranch,
							'outParamId' : outParam
						},
						success : function(result) {

							var json = Ext.decode(result.responseText);
							Ext.Ajax.request({
										url : basePath + '/DisPatch/lasttaskid',
										params : {
											'id' : id
										},
										success : function(result) {
											var pid = result.responseText;
											parent.alertNodeName(pid, id,
													taskName);
											parent
													.changename(pid, id,
															taskName);
											viewList.close();
											Ext.Msg.show({
														title : '提示',
														msg : json.message,
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.INFO
													});
											/*
											 * var window =
											 * Ext.create(projectName+'.view.dispatch.etlflowdispatch.subDraw',{id:id});
											 * window.show();
											 */

										}
									});
						},
						failure : function(form, action) {

						}
					});

				}
			},
			sqlTaskSave : function() {
				// debugger;
				var viewList = this.getSqlView();
				var BasicsForm = Ext.getCmp(projectName
						+ '.view.dispatch.etldispatch.sqlAddView.sqlForm');
				// var StrategyForm = Ext.getCmp(projectName+
				// '.view.dispatch.etldispatch.sqlAddView.sqlStrategyForm');
				if (BasicsForm.getForm().isValid()
				/* && StrategyForm.getForm().isValid() */) {
					var id = viewList.getId();
					var taskName = Ext.getCmp(projectName
							+ '.view.dispatch.etldispatch.sqlAddView.taskName')
							.getValue();
					var taskDesc = Ext.getCmp(projectName
							+ '.view.dispatch.etldispatch.sqlAddView.taskDesc')
							.getValue();
					var taskRemote = Ext.getCmp('sqlAddView.remote').getValue();
					var taskAddress = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.sqlAddView.taskCommand')
							.getValue();
					var taskType = Ext.getCmp(projectName
							+ '.view.dispatch.etldispatch.sqlAddView.taskType')
							.getValue();
					/*
					 * var errorNum = Ext.getCmp(projectName+
					 * '.view.dispatch.etldispatch.sqlAddView.errorNum').getValue();
					 * var loop = Ext.getCmp(projectName+
					 * '.view.dispatch.etldispatch.sqlAddView.loop').getValue();
					 * var taskError = Ext.getCmp(projectName+
					 * '.view.dispatch.etldispatch.sqlAddView.errorIsNo').getValue();
					 * var taskActive = Ext.getCmp(projectName+
					 * '.view.dispatch.etldispatch.sqlAddView.activIsNo').getValue();
					 * var taskCustom = Ext.getCmp(projectName+
					 * '.view.dispatch.etldispatch.sqlAddView.branchCondition').getValue();
					 */
					var taskBranch = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.sqlAddView.branchBing')
							.getValue();

					/*
					 * if (taskActive == '是' || taskActive == 1) { taskActive =
					 * '1' } else { taskActive = '0' } if (taskError == '是' ||
					 * taskError == 1) { taskError = '1' } else { taskError =
					 * '0' }
					 */
					if (taskBranch) {
						taskBranch = '0'
					} else {
						taskBranch = '1'
					}

					// 插入AJAX
					// alert(id);
					Ext.Ajax.request({
						url : basePath + '/DisPatch/update',
						params : {
							'id' : id,
							'taskName' : taskName,
							'taskDesc' : taskDesc,
							'taskRemote' : taskRemote,
							'taskAddress' : taskAddress,
							'taskType' : taskType,
							// 'taskParameter' : taskParameter,
							/*
							 * 'errorNum' : errorNum, 'taskError' : taskError,
							 * 'taskLoop' : loop, 'taskActive' : taskActive,
							 * 'taskCustom' : taskCustom,
							 */
							'taskBranch' : taskBranch
						},
						success : function(result) {
							var json = Ext.decode(result.responseText);
							Ext.Ajax.request({
										url : basePath + '/DisPatch/lasttaskid',
										params : {
											'id' : id
										},
										success : function(result) {
											var pid = result.responseText;
											parent.alertNodeName(pid, id,
													taskName);
											parent
													.changename(pid, id,
															taskName);
											viewList.close();
											Ext.Msg.show({
														title : '提示',
														msg : json.message,
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.INFO
													});
										}
									});
						},
						failure : function(form, action) {

						}
					});
				}
			},
			javaTaskSave : function() {
				// debugger;
				var viewList = this.getJavaView();
				var BasicsForm = Ext.getCmp(projectName
						+ '.view.dispatch.etldispatch.javaAddView.javaForm');
				// var StrategyForm = Ext.getCmp(projectName+
				// '.view.dispatch.etldispatch.javaAddView.javaStrategyForm');
				if (BasicsForm.getForm().isValid()
				/* && StrategyForm.getForm().isValid() */) {
					var id = viewList.getId();
					var taskName = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.javaAddView.taskName')
							.getValue();
					var taskDesc = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.javaAddView.taskDesc')
							.getValue();
					// var taskRemote =
					// Ext.getCmp('etldispatch.DisPatchListView.remote').getValue();
					var taskAddress = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.javaAddView.taskCommand')
							.getValue();
					var taskParameter = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.javaAddView.taskClass')
							.getValue();
					var taskType = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.javaAddView.taskType')
							.getValue();
					// var errorNum = Ext.getCmp(projectName+
					// '.view.dispatch.etldispatch.javaAddView.errorNum').getValue();
					// var loop = Ext.getCmp(projectName+
					// '.view.dispatch.etldispatch.javaAddView.loop').getValue();
					// var taskError = Ext.getCmp(projectName+
					// '.view.dispatch.etldispatch.javaAddView.errorIsNo').getValue();
					// var taskActive = Ext.getCmp(projectName+
					// '.view.dispatch.etldispatch.javaAddView.activIsNo').getValue();
					// var taskCustom = Ext.getCmp(projectName+
					// '.view.dispatch.etldispatch.javaAddView.branchCondition').getValue();
					var taskBranch = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.javaAddView.branchBing')
							.getValue();
					var outParam = Ext
							.getCmp(projectName
									+ '.view.dispatch.etlflowdispatch.javaAddView.paraName')
							.getValue();
					/*
					 * if (taskActive == '是' || taskActive == 1) { taskActive =
					 * '1' } else { taskActive = '0' } if (taskError == '是' ||
					 * taskError == 1) { taskError = '1' } else { taskError =
					 * '0' }
					 */
					if (taskBranch) {
						taskBranch = '0'
					} else {
						taskBranch = '1'
					}

					// 插入AJAX
					// alert(id);
					Ext.Ajax.request({
						url : basePath + '/DisPatch/update',
						params : {
							'id' : id,
							'taskName' : taskName,
							'taskDesc' : taskDesc,
							'taskRemote' : 'NOT_ALLOW',
							'taskAddress' : taskAddress,
							'taskType' : taskType,
							'taskParameter' : taskParameter,
							/*
							 * 'errorNum' : errorNum, 'taskError' : taskError,
							 * 'taskLoop' : loop, 'taskActive' : taskActive,
							 * 'taskCustom' : taskCustom,
							 */
							'taskBranch' : taskBranch,
							'outParamId' : outParam
						},
						success : function(result) {
							var json = Ext.decode(result.responseText);
							Ext.Ajax.request({
										url : basePath + '/DisPatch/lasttaskid',
										params : {
											'id' : id
										},
										success : function(result) {
											var pid = result.responseText;
											parent.alertNodeName(pid, id,
													taskName);
											parent
													.changename(pid, id,
															taskName);
											viewList.close();
											Ext.Msg.show({
														title : '提示',
														msg : json.message,
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.INFO
													});
										}
									});
						},
						failure : function(form, action) {

						}
					});
				}
			},
			alarmTaskSave : function() {
				var me = this;
				var viewList = this.getAlarmView();
				var BasicsForm = Ext.getCmp(projectName
						+ '.view.dispatch.etldispatch.AlarmView.alarmForm');
				var StrategyForm = Ext
						.getCmp(projectName
								+ '.view.dispatch.etldispatch.AlarmView.alarmStrategyForm');
				if (BasicsForm.getForm().isValid()
				/* && StrategyForm.getForm().isValid() */) {
					var id = viewList.getId();
					var taskName = Ext.getCmp(projectName
							+ '.view.dispatch.etldispatch.AlarmView.taskName')
							.getValue();
					var taskDesc = Ext.getCmp(projectName
							+ '.view.dispatch.etldispatch.AlarmView.taskDesc')
							.getValue();
					var taskType = Ext.getCmp(projectName
							+ '.view.dispatch.etldispatch.AlarmView.taskType')
							.getValue();
					var taskAddress = '';
					var taskParameter = '';
					if (taskType != '9'/* '选择多个模型' */) {
						taskAddress = Ext
								.getCmp(projectName
										+ '.view.dispatch.etldispatch.AlarmView.modelCode')
								.getValue();
						taskParameter = Ext
								.getCmp(projectName
										+ '.view.dispatch.etldispatch.AlarmView.modelName')
								.getValue();
					} else {
						taskAddress = viewList.localStore;
					}
					// var errorNum = Ext.getCmp(projectName+
					// '.view.dispatch.etldispatch.AlarmView.errorNum').getValue();
					// var loop = Ext.getCmp(projectName+
					// '.view.dispatch.etldispatch.AlarmView.loop').getValue();
					// var taskError = Ext.getCmp(projectName+
					// '.view.dispatch.etldispatch.AlarmView.errorIsNo').getValue();
					// var taskActive = Ext.getCmp(projectName+
					// '.view.dispatch.etldispatch.AlarmView.activIsNo').getValue();
					// var taskCustom = Ext.getCmp(projectName+
					// '.view.dispatch.etldispatch.AlarmView.branchCondition').getValue();
					var taskBranch = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.AlarmView.branchBing')
							.getValue();
					var dbName = Ext.getCmp(projectName
							+ '.view.dispatch.etldispatch.AlarmView.dbName')
							.getValue();

					/*
					 * if (taskActive == '是' || taskActive == 1) { taskActive =
					 * '1' } else { taskActive = '0' } if (taskError == '是' ||
					 * taskError == 1) { taskError = '1' } else { taskError =
					 * '0' }
					 */
					if (taskBranch) {
						taskBranch = '0'
					} else {
						taskBranch = '1'
					}
					Ext.Ajax.request({
						url : basePath + '/DisPatch/update',
						params : {
							'id' : id,
							'taskName' : taskName,
							'taskDesc' : taskDesc,
							'taskRemote' : dbName,
							'taskAddress' : taskAddress,
							'taskType' : taskType,
							'taskParameter' : taskParameter,
							/*
							 * 'errorNum' : errorNum, 'taskError' : taskError,
							 * 'taskLoop' : loop, 'taskActive' : taskActive,
							 * 'taskCustom' : taskCustom,
							 */
							'taskBranch' : taskBranch
						},
						success : function(result) {
							var json = Ext.decode(result.responseText);
							Ext.Ajax.request({
										url : basePath + '/DisPatch/lasttaskid',
										params : {
											'id' : id
										},
										success : function(result) {
											var pid = result.responseText;
											parent.alertNodeName(pid, id,
													taskName);
											parent
													.changename(pid, id,
															taskName);
											viewList.close();
											Ext.Msg.show({
														title : '提示',
														msg : json.message,
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.INFO
													});
										}
									});
						},
						failure : function(form, action) {

						}
					});
				}
			},
			flowSave : function() {
//				debugger;
				var treePanelStore = this.getFlowTreePanel().getStore();
				var viewList = this.getFlowView();
				var BasicsForm = Ext
						.getCmp(projectName
								+ '.view.dispatch.etlflowdispatch.flowAddView.flowDeployForm');
				var creator = Ext.getCmp(projectName
						+ '.view.dispatch.etlflowdispatch.flowAddView.creator')
						.getValue();
				// var nextStart = Ext.getCmp(projectName+
				// '.view.dispatch.etlflowdispatch.flowAddView.nextStart');
				// var nextStartUnit = Ext.getCmp(projectName+
				// '.view.dispatch.etlflowdispatch.flowAddView.nextStartUnit');
				var now_date = new Date();
				var workDate = now_date.getFullYear() + '-'
						+ (now_date.getMonth() + 1) + '-' + now_date.getDate();
				var startTime = '00:00:00';
				if (creator == '0' || creator == '人工') {
					creator = '0';
					// nextStart = 0;
					workDate = now_date.getFullYear() + '-'
							+ (now_date.getMonth() + 1) + '-'
							+ now_date.getDate();
					// startTime = '';
					nextStartUnit = 'DAY';
				} else {
					creator = '1';
					// nextStart = Ext.getCmp(projectName+
					// '.view.dispatch.etlflowdispatch.flowAddView.nextStart').getValue();
					nextStartUnit = Ext
							.getCmp(projectName
									+ '.view.dispatch.etlflowdispatch.flowAddView.nextStartUnit')
							.getValue();
					if (nextStartUnit == "WEEK") {
						nextStartUnit = Ext
								.getCmp(projectName
										+ '.view.dispatch.etlflowdispatch.flowAddView.dayOfWeek')
								.getValue();
					}
					workDate = Ext
							.getCmp(projectName
									+ '.view.dispatch.etlflowdispatch.flowAddView.workDate')
							.getValue();
					if (workDate == '周一') {
						wordDate = 'MON_OF_WEEK';
					}
					startTime = Ext
							.getCmp(projectName
									+ '.view.dispatch.etlflowdispatch.flowAddView.startTime')
							.getValue();
				}
				if (BasicsForm.getForm().isValid()) {
					var id = viewList.getId();
					var branch = Ext
							.getCmp(projectName
									+ '.view.dispatch.etlflowdispatch.flowAddView.branch')
							.getValue();
					var flowName = Ext
							.getCmp(projectName
									+ '.view.dispatch.etlflowdispatch.flowAddView.flowName')
							.getValue();
					// var flowCnName = Ext.getCmp(projectName+
					// '.view.dispatch.etlflowdispatch.flowAddView.flowCnName').getValue();
					var flowGroup = Ext
							.getCmp(projectName
									+ '.view.dispatch.etlflowdispatch.flowAddView.flowGroup')
							.getValue();
					var flowDesc = Ext
							.getCmp(projectName
									+ '.view.dispatch.etlflowdispatch.flowAddView.flowDesc')
							.getValue();
					Ext.Ajax.request({
								url : basePath + '/DisPatch/EtlFlow/insert',
								params : {
									'id' : id,
									'branch' : branch,
									'flowName' : flowName,
									/* 'flowCnName' : flowCnName, */
									'flowGroup' : flowGroup,
									'flowDesc' : flowDesc,
									'workDate' : workDate,
									'startTime' : startTime,
									'creator' : creator,
									/* 'nextStart' : nextStart, */
									'nextStartUnit' : nextStartUnit
								},
								success : function(result) {
									// 需要修改
									var json = Ext.decode(result.responseText);
									//
									if (json.success) {
										viewList.close();
									} else {
										Ext.MessageBox
												.alert("注意", json.message);
									}
									treePanelStore.load({
												params : {
													name : '',
													parentId : '0'
												}
											});
								},
								failure : function(form, action) {
									// Ext.Msg.alert(
									// DISPATCH.lib.Constants.MSG_TITLE_INFO,
									// action.result.message);
								}
							});
				}
			},
			callTemplate : function() {
				var window = Ext.create(projectName
						+ '.view.dispatch.etldispatch.TemplateListView');
				window.show();
			},
			registerTemplate : function() {
				var templateForm = Ext.getCmp(projectName
						+ '.view.dispatch.etldispatch.linuxAddView.linuxForm');
				var templateStrategyForm = Ext
						.getCmp(projectName
								+ '.view.dispatch.etldispatch.linuxAddView.linuxStrategyForm');
				if (templateForm.getForm().isValid()
						&& templateStrategyForm.getForm().isValid()) {
					var templateName = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.linuxAddView.taskName')
							.getValue();
					var templateType = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.linuxAddView.taskType')
							.getValue();
					var templateDesc = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.linuxAddView.taskDesc')
							.getValue();
					var templateRemote = Ext
							.getCmp('etldispatch.DisPatchListView.remote')
							.getValue();
					var templateCommand = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.linuxAddView.taskCommand')
							.getValue();
					/*
					 * var templateParameter = Ext .getCmp(projectName +
					 * '.view.dispatch.etldispatch.linuxAddView.taskParameter')
					 * .getValue();
					 */
					var errorNum = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.linuxAddView.errorNum')
							.getValue();
					var templateError = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.linuxAddView.errorIsNo')
							.getValue();
					var templateActive = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.linuxAddView.activIsNo')
							.getValue();
					var templateCustom = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.linuxAddView.branchCondition')
							.getValue();
					var templateBranch = Ext.getCmp(projectName
							+ '.view.dispatch.etldispatch.linuxAddView.branch')
							.getValue();
					var templateLoop = Ext.getCmp(projectName
							+ '.view.dispatch.etldispatch.linuxAddView.loop')
							.getValue();
					var joinNum = Ext
							.getCmp(projectName
									+ '.view.dispatch.etldispatch.linuxAddView.joinNum')
							.getValue();
					if (templateActive == '是' || templateActive == '1') {
						templateActive = '1';
					} else {
						templateActive = '0';
					}
					if (templateError == '是' || templateError == '1') {
						templateError = '1';
					} else {
						templateError = '0';
					}
					if (templateBranch == '不是分支节点' || templateBranch == '0') {
						templateBranch = 0;
					} else if (templateBranch == '正确分支节点'
							|| templateBranch == '1') {
						templateBranch = 1;
					} else if (templateBranch == '错误分支节点') {
						templateBranch = 2;
					}
					var objString = encodeURI("id: " + "" + "; templateName: "
							+ templateName + "; templateType: " + templateType
							+ "; templateDesc: " + templateDesc
							+ "; templateRemote: " + templateRemote
							+ "; templateCommand: " + templateCommand
							+ "; templateParameter: " + '' + "; errorNum: "
							+ errorNum + "; templateError: " + templateError
							+ "; templateActive: " + templateActive
							+ "; templateCustom: " + templateCustom
							+ "; templateBranch: " + templateBranch
							+ "; templateLoop: " + templateLoop + "; joinNum: "
							+ joinNum);
					Ext.Ajax.request({
								url : basePath
										+ '/dispatch/template/saveOrUpdate',
								async : false,
								params : {
									'templateName' : templateName,
									'paramsVal' : objString
								},
								success : function(result) {
									var json = Ext.decode(result.responseText);
									Ext.Msg.show({
												title : '提示',
												msg : json.message,
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.INFO
											});
								},
								failure : function(form, action) {
									Ext.Msg.show({
												title : '提示',
												msg : json.message,
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.ERROR
											});
								}
							});
				}
			},
			/*
			 * ParameterButton : function() { var paraValue = ""; var paraName =
			 * Ext .getCmp(projectName +
			 * '.view.dispatch.etlflowdispatch.flowAddView.paraName')
			 * .getValue(); var commandField = Ext .getCmp(projectName +
			 * '.view.dispatch.etldispatch.linuxAddView.taskCommand'); paraValue =
			 * Ext.getCmp(projectName +
			 * '.view.dispatch.etldispatch.linuxAddView.paraValue') .getValue();
			 * para_Raw_Name = Ext .getCmp(projectName +
			 * '.view.dispatch.etlflowdispatch.flowAddView.paraName')
			 * .getRawValue(); // edit by WL if (paraValue == "") { Ext
			 * .getCmp(projectName +
			 * '.view.dispatch.etldispatch.linuxAddView.taskParameter')
			 * .setValue(Ext .getCmp(projectName +
			 * '.view.dispatch.etldispatch.linuxAddView.taskParameter')
			 * .getValue() + ' ' + paraName); } else { Ext .getCmp(projectName +
			 * '.view.dispatch.etldispatch.linuxAddView.taskParameter')
			 * .setValue(Ext .getCmp(projectName +
			 * '.view.dispatch.etldispatch.linuxAddView.taskParameter')
			 * .getValue() + ' ' + para_Raw_Name + '=' + paraValue); }
			 * commandField.setValue(commandField.getValue() + ' $' +
			 * para_Raw_Name); },
			 */
			templateSelect : function() {
				var window = this.getTemplateList();
				var templateList = Ext.getCmp(projectName
						+ '.view.dispatch.etldispatch.TemplateListView.grid');
				var selected = templateList.getSelectionModel().getSelection();
				if (selected.length != 1) {
					Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,
							DISPATCH.lib.Constants.MSG_SELECTED_NOT_SINGLE);
					return;
				}
				var data = selected[0].data;
				var paramsVal = data.paramsVal;
				var json = Ext.decode(paramsVal);
				Ext.getCmp('etldispatch.DisPatchListView.remote')
						.setValue(json.templateRemote);
				Ext
						.getCmp(projectName
								+ '.view.dispatch.etldispatch.linuxAddView.taskCommand')
						.setValue(json.templateCommand);
				/*
				 * Ext .getCmp(projectName +
				 * '.view.dispatch.etldispatch.linuxAddView.taskParameter')
				 * .setValue(json.templateParameter);
				 */
				Ext.getCmp(projectName
						+ '.view.dispatch.etldispatch.linuxAddView.errorNum')
						.setValue(json.errorNum);
				Ext.getCmp(projectName
						+ '.view.dispatch.etldispatch.linuxAddView.errorIsNo')
						.setValue(json.templateError);
				Ext.getCmp(projectName
						+ '.view.dispatch.etldispatch.linuxAddView.activIsNo')
						.setValue(json.templateActive);
				Ext
						.getCmp(projectName
								+ '.view.dispatch.etldispatch.linuxAddView.branchCondition')
						.setValue(json.templateCustom);
				Ext.getCmp(projectName
						+ '.view.dispatch.etldispatch.linuxAddView.branch')
						.setValue(json.templateBranch);
				Ext.getCmp(projectName
						+ '.view.dispatch.etldispatch.linuxAddView.loop')
						.setValue(json.templateLoop);
				Ext.getCmp(projectName
						+ '.view.dispatch.etldispatch.linuxAddView.joinNum')
						.setValue(json.joinNum);
				window.close();
			},

			search_flowTree_btn : function() {
				var panel = this.getFlowTreePanel();
				var name = encodeURI(panel.getChildByElement('tf_ftp_name',
						true).getValue());
				Ext.apply(panel.store.proxy.extraParams, {
							'parentId' : '0',
							'name' : name
						});
				panel.getStore().load();
			},

			flow_move : function() {
				var me = this;
				var store = Ext
						.create(projectName
								+ '.store.dispatch.etlflowdispatch.EtlFlowDispatchStore');
				store.load();
				var panel = me.getFlowTreePanel();
				var nodes = panel.getChecked();
				var flowIds = '';
				var flows = [];
				for (var i = 0; i < nodes.length; i++) {
					var id = nodes[i].raw.id.toString();
					if (id.substring(0, 4) == 'flow') {
						flows.push(id);
						flowIds = flowIds + "'" + id + "'" + ',';
					}
				}
				if (flows.length == 0) {
					Ext.Msg.alert('提示', '请至少选择一个任务');
					return;
				}
				flowIds = flowIds.substring(0, flowIds.length - 1);
				var packageWin = Ext.create('Ext.window.Window', {
					title : '请选择任务链包',
					height : 120,
					width : 300,
					// layout: 'fit',
					items : [{
								xtype : 'combo',
								id : 'dispatch.flow.group',
								fieldLabel : '要移动到的链包<font color="red">*</font>',
								width : 280,
								labelWidth : 100,
								heigh : 200,
								displayField : 'flowGroupName',
								editable : false,
								valueField : 'id',
								typeAhead : false,
								allowBlank : false,
								triggerAction : 'all',
								minChars : 1,
								selectOnFocus : true,
								store : store,
								margin : '10 0 60 0'
							}],
					buttons : [{
						height : 25,
						text : '提交',
						handler : function() {
							var flowGroupId = Ext.getCmp('dispatch.flow.group')
									.getValue();
							if ('' == flowGroupId || null == flowGroupId) {
								Ext.Msg.alert('提示', '请填写要移动到的链包');
								return;
							}
							Ext.Ajax.request({
										url : basePath
												+ '/dispatch/flow/updateFlowGroup',
										params : {
											flowGroupId : flowGroupId,
											flowIds : flowIds
										},
										success : function(response) {
											var text = response.responseText;
											var json = Ext
													.decode(response.responseText);
											if (json.success) {
												panel.getStore().load({
															params : {
																parentId : '0',
																name : ""
															}
														});
												packageWin.close();
												Ext.Msg.alert('提示', '操作成功');
											} else {
												packageWin.close();
												Ext.Msg.alert('提示', '操作失败');
											}
										}
									});
						}
					}, {
						height : 25,
						text : '取消',
						handler : function() {
							packageWin.close();
						}
					}]
				});
				packageWin.show();

			},
			subFlowSave : function() {

				var viewList = this.getFlowSubAddView();
				var BasicsForm = Ext
						.getCmp(projectName
								+ '.view.dispatch.etlflowdispatch.flowSubAddView.flowDeployForm');
				if (BasicsForm.getForm().isValid()) {

					var id = viewList.getId();
					var flowName = Ext
							.getCmp(projectName
									+ '.view.dispatch.etlflowdispatch.flowSubAddView.flowName')
							.getValue();
					// var flowCnName = Ext.getCmp(projectName+
					// '.view.dispatch.etlflowdispatch.flowSubAddView.flowCnName').getValue();
					var flowDesc = Ext
							.getCmp(projectName
									+ '.view.dispatch.etlflowdispatch.flowSubAddView.flowDesc')
							.getValue();
					var joinNum = Ext
							.getCmp(projectName
									+ '.view.dispatch.etlflowdispatch.flowSubAddView.joinNum')
							.getValue();
					Ext.Ajax.request({
						url : basePath + '/DisPatch/EtlFlow/updateinit',
						params : {
							'id' : id,
							'flowName' : flowName,
							/* 'flowCnName' : flowCnName, */
							'flowDesc' : flowDesc,
							'joinNum' : joinNum
						},
						success : function(result) {
							var json = Ext.decode(result.responseText);
							/*
							 * Ext.Msg.show({ title : '提示', msg : json.message,
							 * buttons : Ext.MessageBox.OK, icon :
							 * Ext.MessageBox.INFO });
							 */
							Ext.Ajax.request({
								url : basePath + '/DisPatch/EtlFlow/lastflowid',
								params : {
									'id' : id
								},
								success : function(result) {
									var pid = result.responseText;
									parent.alertNodeName(pid, id, flowName);
									parent.changename(pid, id, flowName);
									viewList.close();
									var window = Ext
											.create(
													projectName
															+ '.view.dispatch.etlflowdispatch.subDraw',
													{
														id : id,
														title : '子流程配置'
													});
									window.show();
								}
							});
						},
						failure : function(form, action) {

						}
					});
				}
			},
			save_datasource_btn : function(storeA) {
				var view = this.getDataSourceAdd();

				var dataSourceCombo = Ext.getCmp('sqlAddView.remote');
				var store = dataSourceCombo.getStore();

				var form = Ext.getCmp('dataSourceForm').getForm();
				if (form.isValid()) {
					form.submit({
								url : basePath + '/datasource/saveOrUpdate',
								success : function(form, action) {
									if (action.result.success) {
										store.load();
										view.close();
									} else {
										Ext.Msg.alert("提示",
												action.result.message);
									}
									// debugger;
								},
								failure : function(form, action) {
									Ext.Msg.alert("错误", action.result.message);
									store.load();
								}
							});
				}
			},
			test_datasource_btn : function() {
				var form = Ext.getCmp('dataSourceForm').getForm();
				if (form.isValid()) {
					form.submit({
								url : basePath + '/datasource/testConnect',
								success : function(form, action) {
									// debugger;
									Ext.Msg.alert("提示", action.result.message);
								},
								failure : function(form, action) {
									// debugger;
									Ext.Msg.alert("错误", action.result.message);
								}
							});
				}
			}

		});
