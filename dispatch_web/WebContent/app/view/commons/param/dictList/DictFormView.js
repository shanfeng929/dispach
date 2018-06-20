Ext.define(projectName +'.view.commons.param.dictList.DictFormView', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.dictForm',
			title : '字典维护',
			width : 1000,
			buttonAlign : 'left',
			layout : 'fit',
			initComponent : function() {
				var me = this;
				this.items = [{
							xtype : 'form',
							id : 'dictForm',
							border : false,
							padding : '5 5 0 5',
							style : 'background-color: #fff;',
							frame : true,
							maxHeight : 200,
							layout : {
								type : 'table',
								columns : 2
							},
							defaultType : 'textfield',
							defaults : {
								labelSeparator : ' ',
								labelWidth : 80,
								margin : '10 20 0 10',
								labelAlign : 'left'
							},
							items : [{
										xtype : 'hidden',
										name : 'parentId'
									}, {
										xtype : 'hidden',
										name : 'id'
									}, {
										xtype : 'hidden',
										name : 'dataStatus'
									}, {
										xtype : 'hidden',
										name : 'disOrder'
									}, {
										xtype : 'textfield',
										name : 'name',
										fieldLabel : '字典名称<font color="red">*</font>',
										allowBlank : false,
										readOnly : true,
										height : 30,
										width : 270,
										labelWidth : 80,
										maxLength : 50,
										margin : '5 5 0 20'

									}, {
										xtype : 'textfield',
										name : 'cat',
										fieldLabel : '代号<font color="red">*</font>',
										allowBlank : false,
										readOnly : true,
										height : 30,
										width : 270,
										labelWidth : 80,
										maxLength : 50,
										margin : '5 5 0 20'

									}, {
										xtype : 'textfield',
										name : 'key',
										fieldLabel : '显示名称',
										readOnly : true,
										height : 30,
										width : 270,
										labelWidth : 80,
										maxLength : 20,
										margin : '5 5 0 20'

									}, {
										xtype : 'textfield',
										name : 'value',
										fieldLabel : '值',
										allowBlank : true,
										readOnly : true,
										height : 30,
										width : 270,
										labelWidth : 80,
										maxLength : 50,
										margin : '5 5 0 20'
									}, {
										xtype : 'textfield',
										fieldLabel : '描述',
										name : 'memo',
										readOnly : true,
										height : 30,
										width : 270,
										labelWidth : 80,
										maxLength : 100,
										margin : '5 5 0 20'
									}],
							buttonAlign : 'left',
							buttons : [{
										text : '保存',
										id : 'save',
										iconCls : 'save',
										action : 'organFormSaveBtn'
									}]
						}];
				this.callParent(arguments);
			}
})