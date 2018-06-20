/**
 * 流程管理编辑页面
 */
Ext.define(projectName + '.view.dispatch.flow.FlowGroupEditView',{
	extend : 'Ext.window.Window',
	alias : 'widget.flowGroupEdit',
//	requires : [ 'Ext.ux.form.ItemSelector'],
	id : 'flowGroupEdit',
	title : '新增流程组',
	modal : true,
	resizable : false,
	layout : 'fit',
	height : 250,
	config : {
		isEdit : false
	},
	storeCallBackDatas : [],
	gridViewKey : '',
	isSelf : false,
	defaults : {
				fieldStyle : 'background-color: #DFE9F6;background-image: none'
	},
	initComponent : function() {
		var me = this;
		Ext.applyIf(me,{
			items : [ {
					xtype : 'form',
					id : 'flowGroupForm',
					width : 300,
					fieldDefaults : {
						labelAlign : 'left',
						msgTarget : 'side'
					},
					items : [{
						
								xtype : 'container',
								layout : {
									type : 'table',
									columns : 1
								},
								defaultType : 'textfield',
								items : [{
											xtype : 'hiddenfield',
											name : 'id',
											id : 'flowGroup_edit_hf_id'
										},
										{
											xtype : 'textfield',
											name : 'flowGroupName',
											fieldLabel : '流程分组名称<font color=red>*</font>',
											id : 'flowGroup_edit_tf_flowGroupName',
											allowBlank : false,
											blankText : '流程分组名称不能为空',
											labelWidth : 90,
											margin : 5,
											enforceMaxLength : true,
											maxLength : 30
										},
										{
											xtype : 'textarea',
											name : 'flowGroupDesc',
											fieldLabel : '流程分组描述',
											id : 'flowGroup_edit_tf_flowGroupDesc',
											labelWidth : 90,
											margin : 5,
											enforceMaxLength : true,
											maxLength : 30
										}]
						}],
						buttons : [{
									height : 25,
									text : '保存',
									action : 'save',
									iconCls : 'icon-save',
									id : 'flowGroup_edit_tf_save'
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