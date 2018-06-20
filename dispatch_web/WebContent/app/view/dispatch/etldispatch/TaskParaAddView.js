Ext.define(projectName + '.view.dispatch.etldispatch.TaskParaAddView', {
	extend : 'Ext.window.Window',
	alias : 'widgit.taskParaAddView',
	title : '添加流程变量',
	width : 440,
	height : 260,
	flowName : [],
	labelAlign : 'right', // 文本框标签在左侧右对齐
	modal : true, // 此窗口模态
	defaults : {
		margin : '5 5 5 5',
		fieldStyle : 'background-color: #DFE9F6;background-image: none;'
	},
	bodyStyle : 'padding:5px',
	resizable : false,
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items : [{
				xtype : "panel",
				layout : {
					type : 'table',
					columns : 2
				},
				items : [{
							xtype : "textfield",
							colspan : 1,
							fieldLabel : '参数名称<font color="red">*</font>',
							id : 'taskParaAddView.paraName',
							margin : '5 5 5 5',
							allowBlank : false
						}, {
							xtype : "textfield",
							colspan : 1,
							fieldLabel : '参数值<font color="red">*</font>',
							id : 'taskParaAddView.paraValue',
							margin : '5 5 5 5',
							allowBlank : false
						}, {
							xtype : "textfield",
							colspan : 1,
							fieldLabel : '参数类型<font color="red">*</font>',
							id : 'taskParaAddView.paraType',
							margin : '5 5 5 5',
							allowBlank : false
						}],
				buttons : [{
					height : 25,
					text : '保存',
					handler : function() {

						Ext.Ajax.request({
									url : basePath + '/DisPatch/EtlFlow/insertflowpara',
									params : {
										'flowId' : me.flowName,
										'paraName' : Ext
												.getCmp('taskParaAddView.paraName')
												.getValue(),
										'paraValue' : Ext
												.getCmp('taskParaAddView.paraValue')
												.getValue(),
										'paraType' : Ext
												.getCmp('taskParaAddView.paraType')
												.getValue()
									},
									success : function(response) {
										Ext.getCmp('taskParaView.taskParaGird').store
												.load();
									},
									failure : function() {
									}
								});
						me.close();
					}
				}, {
					height : 25,
					text : '不保存',
					handler : function() {
						me.close();
					}
				}]
			}]
		});
		me.callParent(arguments);
	}
});