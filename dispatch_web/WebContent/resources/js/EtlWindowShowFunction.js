/* 打开一个shell命令窗口 */
function linuxshow(id, check) {
	Ext.Ajax.request({
		url : basePath + '/DisPatch/taskIsExist',
		params : {
			'id' : id
		},
		success : function(result) {
			var jsonResult = Ext.decode(result.responseText);
			var flowName = jsonResult.item.PID
			var window = Ext.create(projectName
							+ '.view.dispatch.etldispatch.LinuxAddView', {
						record : jsonResult.item,
						id : id,
						flowName : flowName
					});
			Ext
					.getCmp(projectName
							+ '.view.dispatch.etldispatch.linuxAddView.branchBing')
					.setValue(jsonResult.item.TASK_BRANCH == '0' ? true : false);
			Ext
					.getCmp(projectName
							+ '.view.dispatch.etldispatch.linuxAddView.branchChuan')
					.setValue(jsonResult.item.TASK_BRANCH == '0' ? false : true);
			Ext.getCmp('linuxAddView.remote')
					.setValue(jsonResult.item.TASK_REMOTE);
			var paraOutCombo = Ext.getCmp(projectName
					+ '.view.dispatch.etlflowdispatch.flowAddView.paraName');
			paraOutCombo.store.on('load', function() {
						if (jsonResult.item.outParaId != null
								&& !isNaN(jsonResult.item.outParaId)) {
							paraOutCombo
									.setValue(parseInt(jsonResult.item.outParaId));
						}
					});
			paraOutCombo.store.load();
			// Ext.getCmp(projectName +
			// '.view.dispatch.etldispatch.sqlAddView.errorIsNo').setValue(jsonResult.item.TASK_ERROR);
			// Ext.getCmp(projectName +
			// '.view.dispatch.etldispatch.sqlAddView.activIsNo').setValue(jsonResult.item.TASK_ACTIVE);
			window.show();
		}
	});
	/*
	 * var checkid; Ext.Ajax.request({ url : basePath + '/DisPatch/taskid',
	 * params : { 'id' : id }, success : function(result) { checkid =
	 * result.responseText if (checkid == 'true') { Ext.Ajax.request({ url :
	 * basePath + '/DisPatch/selecttaskmsg', params : { 'id' : id }, success :
	 * function(response, resp) { var json = Ext.decode(response.responseText); //
	 * console.log(json); var window =
	 * Ext.create(projectName+'.view.dispatch.etldispatch.LinuxAddView',{ id:id
	 * }); // var form =
	 * projectName+'.view.dispatch.etldispatch.linuxAddView.linuxForm'; //
	 * 保存or更新 Ext.getCmp(
	 * projectName+'.view.dispatch.etldispatch.linuxAddView.updateorsave').setValue('1'); //
	 * 任务名称
	 * Ext.getCmp(projectName+'.view.dispatch.etldispatch.linuxAddView.taskName').setValue(json.root[0].taskName);
	 * Ext.getCmp(projectName+'.view.dispatch.etldispatch.linuxAddView.branchBing').setValue(json.root[0].taskBranch=='0'?true:false);
	 * Ext.getCmp(projectName+'.view.dispatch.etldispatch.linuxAddView.branchChuan').setValue(json.root[0].taskBranch=='0'?false:true); //
	 * 任务备注
	 * Ext.getCmp(projectName+'.view.dispatch.etldispatch.linuxAddView.taskDesc').setValue(json.root[0].taskDesc); //
	 * 远程服务器
	 * Ext.getCmp('linuxAddView.remote').setValue(json.root[0].taskRemote); //
	 * 执行语句
	 * Ext.getCmp(projectName+'.view.dispatch.etldispatch.linuxAddView.taskCommand').setValue(json.root[0].taskAddress); //
	 * 执行参数 //
	 * Ext.getCmp(projectName+'.view.dispatch.etldispatch.linuxAddView.taskParameter').setValue(json.root[0].taskParameter); //
	 * 错误次数
	 * //Ext.getCmp(projectName+'.view.dispatch.etldispatch.linuxAddView.errorNum').setValue(json.root[0].errorNum); //
	 * 任务类型
	 * Ext.getCmp(projectName+'.view.dispatch.etldispatch.linuxAddView.taskType').setValue(json.root[0].taskType); //
	 * 是否容错
	 * //Ext.getCmp(projectName+'.view.dispatch.etldispatch.linuxAddView.errorIsNo').setValue(json.root[0].taskError); //
	 * 是否激活
	 * //Ext.getCmp(projectName+'.view.dispatch.etldispatch.linuxAddView.activIsNo').setValue(json.root[0].taskActive); //
	 * 循环次数
	 * //Ext.getCmp(projectName+'.view.dispatch.etldispatch.linuxAddView.loop').setValue(json.root[0].taskLoop); //
	 * 自定义条件
	 * //Ext.getCmp(projectName+'.view.dispatch.etldispatch.linuxAddView.branchCondition').setValue(json.root[0].taskCustom);
	 * if(check=='check'){
	 * Ext.getCmp('disparth_template_register').setDisabled(true);
	 * Ext.getCmp('disparth_template_call').setDisabled(true);
	 * Ext.getCmp('disparth_task_save').setDisabled(true); } window.show() },
	 * failure : function() { } }); } else if (checkid=='false') { var window =
	 * Ext.create(projectName+ '.view.dispatch.etldispatch.linuxAddView');
	 * Ext.getCmp(
	 * projectName+'.view.dispatch.etldispatch.linuxAddView.updateorsave').setValue('0');
	 * window.id = id; window.show(); } } });
	 */
}

/*
 * 双击打开sql节点表单
 */
function sqlshow(id) {
	Ext.Ajax.request({
		url : basePath + '/DisPatch/taskIsExist',
		params : {
			'id' : id
		},
		success : function(result) {
			var jsonResult = Ext.decode(result.responseText);
			var window = Ext.create(projectName
							+ '.view.dispatch.etldispatch.SqlAddView', {
						record : jsonResult.item,
						id : id
					});
			Ext
					.getCmp(projectName
							+ '.view.dispatch.etldispatch.sqlAddView.branchBing')
					.setValue(jsonResult.item.TASK_BRANCH == '0' ? true : false);
			Ext
					.getCmp(projectName
							+ '.view.dispatch.etldispatch.sqlAddView.branchChuan')
					.setValue(jsonResult.item.TASK_BRANCH == '0' ? false : true);
			var remote = parseInt(jsonResult.item.TASK_REMOTE);
			Ext.getCmp('sqlAddView.remote').setValue(isNaN(remote)
					? ' '
					: remote);
			// Ext.getCmp(projectName+
			// '.view.dispatch.etlflowdispatch.flowAddView.paraName').setValue(jsonResult.item.outParaId);
			// Ext.getCmp(projectName +
			// '.view.dispatch.etldispatch.sqlAddView.errorIsNo').setValue(jsonResult.item.TASK_ERROR);
			// Ext.getCmp(projectName +
			// '.view.dispatch.etldispatch.sqlAddView.activIsNo').setValue(jsonResult.item.TASK_ACTIVE);
			window.show();
			// debugger;
		}
	});
}

/*
 * 双击打开java调用节点表单
 */
function javashow(id) {
	Ext.Ajax.request({
		url : basePath + '/DisPatch/taskIsExist',
		params : {
			'id' : id
		},
		success : function(result) {
			var jsonResult = Ext.decode(result.responseText);
			var flowName = jsonResult.item.PID
			var window = Ext.create(projectName
							+ '.view.dispatch.etldispatch.JavaAddView', {
						record : jsonResult.item,
						id : id,
						flowName : flowName
					});
			Ext
					.getCmp(projectName
							+ '.view.dispatch.etldispatch.javaAddView.branchBing')
					.setValue(jsonResult.item.TASK_BRANCH == '0' ? true : false);
			Ext
					.getCmp(projectName
							+ '.view.dispatch.etldispatch.javaAddView.branchChuan')
					.setValue(jsonResult.item.TASK_BRANCH == '0' ? false : true);
			var paraOutCombo = Ext.getCmp(projectName
					+ '.view.dispatch.etlflowdispatch.javaAddView.paraName');
			paraOutCombo.store.on('load', function() {
						if (jsonResult.item.outParaId != null
								&& !isNaN(jsonResult.item.outParaId)) {
							paraOutCombo
									.setValue(parseInt(jsonResult.item.outParaId));
						}
					});
			paraOutCombo.store.load();
			// Ext.getCmp(projectName +
			// '.view.dispatch.etldispatch.javaAddView.errorIsNo').setValue(jsonResult.item.TASK_ERROR);
			// Ext.getCmp(projectName +
			// '.view.dispatch.etldispatch.javaAddView.activIsNo').setValue(jsonResult.item.TASK_ACTIVE);
			window.show();
			// debugger;
		}
	});
}

function alarmshow(id) {
	Ext.Ajax.request({
		url : basePath + '/DisPatch/taskIsExist',
		params : {
			'id' : id
		},
		success : function(result) {
			var jsonResult = Ext.decode(result.responseText);
			var window = Ext.create(projectName
							+ '.view.dispatch.etldispatch.AlarmView', {
						record : jsonResult.item,
						id : id
					});
			Ext
					.getCmp(projectName
							+ '.view.dispatch.etldispatch.AlarmView.branchBing')
					.setValue(jsonResult.item.TASK_BRANCH == '0' ? true : false);
			Ext
					.getCmp(projectName
							+ '.view.dispatch.etldispatch.AlarmView.branchChuan')
					.setValue(jsonResult.item.TASK_BRANCH == '0' ? false : true);
			// Ext.getCmp(projectName +
			// '.view.dispatch.etldispatch.AlarmView.errorIsNo').setValue(jsonResult.item.TASK_ERROR);
			// Ext.getCmp(projectName +
			// '.view.dispatch.etldispatch.AlarmView.activIsNo').setValue(jsonResult.item.TASK_ACTIVE);
			// Ext.getCmp(projectName +
			// '.view.dispatch.etldispatch.AlarmView.dbName').setValue(parseInt(jsonResult.item.TASK_REMOTE));
			var remote = parseInt(jsonResult.item.TASK_REMOTE);
			Ext.getCmp(projectName
					+ '.view.dispatch.etldispatch.AlarmView.dbName')
					.setValue(isNaN(remote) ? ' ' : remote);
			var modelCode = Ext.getCmp(projectName
					+ '.view.dispatch.etldispatch.AlarmView.modelCode');
			var type = jsonResult.item.TASK_BELONG;
			if (type != 9/* '选择多个模型' */) {
				modelCode.setValue(jsonResult.item.TASK_ADDRESS);
			} else {
				window.localStore = (jsonResult.item.TASK_ADDRESS);
				modelCode.setValue(Ext.decode(window.localStore).length);
			}
			/*
			 * var type=jsonResult.item.TASK_BELONG; var
			 * typeCombo=Ext.getCmp(projectName +
			 * '.view.dispatch.etldispatch.AlarmView.taskType');
			 * typeCombo.setValue(type);
			 * typeCombo.fireEvent('select',typeCombo);
			 */
			Ext.getCmp(projectName
					+ '.view.dispatch.etldispatch.AlarmView.taskType')
					.setValue(type);
			var selectButton1 = Ext.getCmp('CallAlarmSelect');
			var selectButton2 = Ext.getCmp('CallTitleSelect');
			var selectButton3 = Ext.getCmp('CallMultiSelect');
			var AlarmIdField = Ext.getCmp(projectName
					+ '.view.dispatch.etldispatch.AlarmView.modelCode');
			var AlarmNameField = Ext.getCmp(projectName
					+ '.view.dispatch.etldispatch.AlarmView.modelName');
			if (type == 7) {
				selectButton1.setDisabled(false);
				selectButton2.setDisabled(true);
				selectButton3.setDisabled(true);
				AlarmIdField.setFieldLabel('模型代码<font color="red">*</font>');
				AlarmNameField.setFieldLabel('模型名称<font color="red">*</font>');
				AlarmNameField.setDisabled(false);
			} else if (type == 8) {
				selectButton1.setDisabled(true);
				selectButton2.setDisabled(false);
				selectButton3.setDisabled(true);
				AlarmIdField.setFieldLabel('主题编号<font color="red">*</font>');
				AlarmNameField.setFieldLabel('主题名称<font color="red">*</font>');
				AlarmNameField.setDisabled(false);
			} else if (type == 9) {
				selectButton1.setDisabled(true);
				selectButton2.setDisabled(true);
				selectButton3.setDisabled(false);
				AlarmIdField.setFieldLabel('已选个数:');
				AlarmNameField.setFieldLabel('模型名称<font color="red">*</font>');
				AlarmNameField.setDisabled(true);
			}
			window.show();
		}
	});
}

// 删除控件
function deletetask(id) {
	Ext.Ajax.request({
				url : basePath + '/DisPatch/delete',
				params : {
					'id' : id
				},
				success : function(result) {
					var json = Ext.decode(result.responseText);
					Ext.Msg.show({
								title : '提示',
								msg : json.message,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
				}
			});
}

// 打开流程配置
function flowWindowShow(id, branch) {
	var window = Ext.create(projectName
			+ '.view.dispatch.etlflowdispatch.FlowAddView');
	window.id = id;
	// 判断是否为主流程
	Ext.getCmp(projectName
			+ '.view.dispatch.etlflowdispatch.flowAddView.branch')
			.setValue(branch);
	window.show();

}

// weilai
function paraWindowShow(id) {
	var flowParaView = Ext.create(projectName
					+ '.view.dispatch.etlflowdispatch.FlowParaView', {
				flowName : id
			});
	flowParaView.show();
}

function remove() {
	iframe_draw.titlenull();
	iframe_draw.document.getElementById("demo_btn_direct").style.display = "none";
	iframe_draw.document.getElementById("demo_btn_start").style.display = "none";
	iframe_draw.document.getElementById("demo_btn_end").style.display = "none";
	iframe_draw.document.getElementById("demo_btn_linux").style.display = "none";
	/*
	 * iframe_draw.document.getElementById("demo_btn_complex").style.display =
	 * "none";
	 */

	iframe_draw.document.getElementById("demo_btn_sql").style.display = "none";
	iframe_draw.document.getElementById("demo_btn_java").style.display = "none";
}

function checkFlow(id) {
	var window = Ext.create(projectName
					+ '.view.dispatch.etldispatch.CheckFlowDraw', {
				id : id,
				title : '查看流程配置'
			});
	window.show();

}

function checkSubFlow(id) {
	var window = Ext.create(projectName
					+ '.view.dispatch.etldispatch.CheckFlowDraw', {
				id : id,
				title : '查看流程配置'
			});
	window.show();
}

function changename(pid, id, changeName) {
	// alert("pid:"+pid+",id:"+id+",changeName:"+changeName);
	window.frames[pid].document.getElementById("name" + id).innerHTML = changeName;

}

function checkFlowHide(id) {
	window.frames[id].document.getElementById("GooFlow_head_btn_0").style.display = "none";
	window.frames[id].document.getElementById("GooFlow_head_btn_1").style.display = "none";
}

function getTitle() {
	var a = Ext.getCmp(projectName + '.lib.component.FlowTreePanel')
			.getSelectionModel().getSelection();
	return a[0].data.id;
}

function flowSubAddView(id) {
	var window = Ext.create(projectName
					+ '.view.dispatch.etlflowdispatch.flowSubAddView', {
				id : id
			});
	// Ext.getCmp(
	// projectName+'.view.dispatch.etldispatch.linuxAddView.updateorsave').setValue('0');
	window.show();
}

function deletetemp() {
	return iframe_draw.window.deletetempId();
}

function alertNodeName(pid, id, name) {
	window.frames[pid].alertNodeName(id, name);
}

function subDraw(id) {
	var checkid;
	Ext.Ajax.request({
		url : basePath + '/DisPatch/EtlFlow/flowid',
		params : {
			'id' : id
		},
		success : function(result) {
			checkid = result.responseText
			if (checkid == 'true') {
				Ext.Ajax.request({
					url : basePath + '/DisPatch/EtlFlow/selectflowmessage',
					params : {
						'id' : id
					},
					success : function(response, resp) {
						var json = Ext.decode(response.responseText);
						// console.log(json);
						var window = Ext
								.create(projectName
										+ '.view.dispatch.etlflowdispatch.flowSubAddView');
						var form = projectName
								+ '.view.dispatch.etlflowdispatch.flowSubAddView.flowDeployForm';
						// 子流程名称
						Ext
								.getCmp(projectName
										+ '.view.dispatch.etlflowdispatch.flowSubAddView.flowName')
								.setValue(json.root[0].flowName);
						// 子流程中文名称
						// Ext.getCmp(projectName+'.view.dispatch.etlflowdispatch.flowSubAddView.flowCnName').setValue(json.root[0].flowCnName);
						// 子流程备注
						Ext
								.getCmp(projectName
										+ '.view.dispatch.etlflowdispatch.flowSubAddView.flowDesc')
								.setValue(json.root[0].flowDesc);
						// 聚合数
						Ext
								.getCmp(projectName
										+ '.view.dispatch.etlflowdispatch.flowSubAddView.joinNum')
								.setValue(json.root[0].joinNum);
						window.id = id;
						window.show();

					},
					failure : function() {
					}
				});
			} else if (checkid == 'false') {
				Ext.Ajax.request({
					url : basePath + '/DisPatch/EtlFlow/maxsubflowid',
					success : function(result) {
						var window = Ext
								.create(projectName
										+ '.view.dispatch.etlflowdispatch.flowSubAddView');
						window.id = result.responseText
						window.show();
					}
				});
			}
		}
	});
}

function showXML(id) {
	iframe_draw.window.loadXML(id);
}
