Ext.define(projectName + '.view.commons.sys.menu.MenuFormView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.menuForm',
	requires : [],
	title : '菜单设置',
	buttonAlign : 'left',
	layout : 'fit',
	initComponent : function() {
		var me = this;
		this.items = [ {
			xtype : 'form',
			id : 'menuFormId',
			border : false,
			padding : '5 5 0 5',
			style : 'background-color: #fff;',
			frame : true,
			maxHeight : 300,
			layout : {
				type : 'table',
				columns : 1
			},
			defaultType : 'textfield',
			defaults : {
				labelSeparator : ' ',
				labelWidth : 80,
				labelAlign : 'left',
				allowBlank : false,
				//readOnly : true,
				/*height : 30,*/
				width : 320,
				margin : '5 5 0 20'
			},
			items : [{
				xtype : 'hidden',
				name : 'id'
			},{
				xtype : 'hidden',
				name : 'parentId'
			},{
				xtype : 'textfield',
				name : 'text',
				fieldLabel : '菜单名称<font color="red">*</font>'
			},{
				xtype : 'textfield',
				name : 'parentName',
				fieldLabel : '上级菜单<font color="red">*</font>'
			},{
				xtype : 'textfield',
				name : 'controller',
				fieldLabel : '菜单链接',
				allowBlank : true
				
			},{
				xtype : 'textfield',
				name : 'view',
				fieldLabel : '菜单视图',
				allowBlank : true
			},{
				xtype:'textfield',
				name:'code',
				fieldLabel:'菜单编码<font color="red">*</font>'
			},{
				xtype:'textfield',
				name:'disOrder',
				vtype:'alphanum',
				vtypeText:'请输入数字',
				fieldLabel:'菜单序列<font color="red">*</font>'
			}],
			buttonAlign : 'left',
			buttons : [{
				text : '保存',
				iconCls : 'icon-save',
				id :'menuForm_butId' ,
				action : 'dataSave' 
			}]
		} ];
		this.callParent(arguments);
	}
});