/**
 * 任务管理编辑页面
 */
Ext.define(projectName + '.view.dispatch.task.TaskManageEditView',{
	extend : 'Ext.window.Window',
	alias : 'widget.taskManageEdit',
//	requires : [ 'Ext.ux.form.ItemSelector'],
	id : 'taskManageEdit',
	title : '修改任务',
	modal : true,
	resizable : false,
	layout : 'fit',
	height : 300,
	config : {
		isEdit : false
	},
	storeCallBackDatas : [],
	gridViewKey : '',
	isSelf : false,
	defaults : {
				fieldStyle : 'background-color: #DFE9F6;background-image: none'
	},
	record : {},
	initComponent : function() {
		var me = this;
		Ext.applyIf(me,{
			items : [ {
					xtype : 'form',
					id : 'taskManageForm',
					width : 520,
					fieldDefaults : {
						labelAlign : 'left',
						msgTarget : 'side'
					},
					items : [{
						
								xtype : 'container',
								layout : {
									type : 'table',
									columns : 2
								},
								defaultType : 'textfield',
								items : [{
											xtype : 'hiddenfield',
											name : 'id',
											id : 'taskManage_edit_hf_id',
											value : this.record.id
										},
										{
											xtype : 'textfield',
											name : 'taskName',
											fieldLabel : '任务名称<font color=red>*</font>',
											id : 'taskManage_edit_tf_taskName',
											allowBlank : false,
											blankText : '任务名称不能为空',
											labelWidth : 90,
											margin : 5,
											enforceMaxLength : true,
											maxLength : 30,
											value : this.record.taskName
										},
										{
											xtype : 'textfield',
											name : 'taskCnName',
											fieldLabel : '任务中文名称',
											id : 'taskManage_edit_tf_taskCnName',
											labelWidth : 90,
											margin : 5,
											enforceMaxLength : true,
											maxLength : 30,
											value : this.record.taskCnName
										},
										{
											xtype : 'textfield',
											name : 'taskDesc',
											id : 'taskManage_edit_tf_taskDesc',
											fieldLabel : '任务备注',
											labelWidth : 90,
											margin : 5,
											enforceMaxLength : true,
											maxLength : 30,
											value : this.record.taskDesc
										},
										{
											xtype : 'combo',
											name : 'taskError',
											editable:false,
											store : new Ext.data.SimpleStore({
											fields : [ 'value', 'text' ],
											data : [ [ '1', '是' ], [ '0', '否' ]]
											}),
											typeAhead: true,
											triggerAction : 'all',
											id : 'taskManage_edit_cb_taskError',
											fieldLabel : '是否容错',
											labelWidth : 90,
											margin : 5,
											enforceMaxLength : true,
											maxLength : 13,
											displayField: 'text',
											valueField:'value'
										},
										{
											xtype : 'textfield',
											name : 'errorNum',
											id : 'taskManage_edit_tf_errorNum',
											fieldLabel : '容错次数',
											labelWidth : 90,
											margin : 5,
											enforceMaxLength : true,
											maxLength : 13,
											value : this.record.errorNum
										},
										{
											xtype : 'combo',
											name : 'taskBranch',
											editable:false,
											store : new Ext.data.SimpleStore({
											fields : [ 'value', 'text' ],
											data : [[ '0', '否' ],[ '1', '正确' ],[ '2', '错误' ]]
											}),
											typeAhead: true,
											triggerAction : 'all',
											id : 'taskManage_edit_cb_taskBranch',
											fieldLabel : '是否分支',
											labelWidth : 90,
											margin : 5,
											enforceMaxLength : true,
											maxLength : 13,
											displayField: 'text',
											valueField:'value'
										},
										{
											xtype : 'textfield',
											name : 'taskLoop',
											id : 'taskManage_edit_tf_taskLoop',
											fieldLabel : '循环次数',
											labelWidth : 90,
											margin : 5,
											enforceMaxLength : true,
											maxLength : 13,
											value : this.record.taskLoop
										},
										{
											xtype : 'combo',
											editable:false,
											store : new Ext.data.SimpleStore({
											fields : [ 'value', 'text' ],
											data : [ [ '1', '是' ], [ '0', '否' ]]
											}),
											typeAhead: true,
											triggerAction : 'all',
											name : 'taskActive',
											id : 'taskManage_edit_cb_taskActive',
											fieldLabel : '是否有效',
											labelWidth : 90,
											margin : 5,
											enforceMaxLength : true,
											maxLength : 13,
											displayField: 'text',
											valueField:'value'
										}]
						}],
						buttons : [{
									height : 25,
									text : '保存',
									action : 'save',
									iconCls : 'icon-save',
									id : 'taskManage_edit_tf_save'
								},
								{
									height : 25,
									text : '关闭',
									iconCls : 'icon-reset',
									handler : function() {
										me.close();
									}
								}
						]
				}]
		});
		me.callParent(arguments);
	}
});