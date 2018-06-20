Ext.define(projectName + '.view.commons.sys.organ.OrganFormView', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.organForm',
			requires : [projectName + '.lib.component.OrganComboBox',
			            projectName + '.lib.component.DictionaryCombox'],
			title : '机构设置',
			width : 1000,
			buttonAlign : 'left',
			layout : 'fit',
			initComponent : function() {
				var me = this;
				this.items = [{
							xtype : 'form',
							id : 'organForm',
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
									},{
										xtype : 'hidden',
										name : 'disOrder'
									}, {
										xtype : 'textfield',
										name : 'name',
										fieldLabel : '机构名称:<font color="red">*</font>',
										allowBlank : false,
										readOnly : true,
										labelWidth : 80,
										maxLength : 50,
										margin : '5 5 0 20'

									}, {
										xtype : 'textfield',
										name : 'code',
										fieldLabel : '机构代码:<font color="red">*</font>',
										allowBlank : false,
										readOnly : true,
										labelWidth : 80,
										maxLength : 50,
										margin : '5 5 0 20'

									}, {
										xtype : 'textfield',
										name : 'shortName',
										fieldLabel : '机构简称:',
										readOnly : true,
										labelWidth : 80,
										maxLength : 20,
										margin : '5 5 0 20'

									}, {
										xtype : 'textfield',
										name : 'parentName',
										fieldLabel : '上级机构:',
										allowBlank : true,
										readOnly : true,
										labelWidth : 80,
										maxLength : 50,
										margin : '5 5 0 20'
									}, {
										xtype : 'textarea',
										fieldLabel : '机构描述:',
										name : 'description',
										readOnly : true,
										labelWidth : 80,
										maxLength : 100,
										colspan:2,
										width:500,
										margin : '5 5 0 20'
									}],
							buttonAlign : 'left',
							buttons : [{
										text : '保存',
										id : 'organ_save',
										iconCls : 'icon-save',
										action : 'organFormSaveBtn'
									}]
						}];
				this.callParent(arguments);
			}

		});