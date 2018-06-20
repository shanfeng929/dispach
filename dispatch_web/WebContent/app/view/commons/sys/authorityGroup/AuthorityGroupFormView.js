Ext.define(projectName +'.view.commons.sys.authorityGroup.AuthorityGroupFormView',{
	extend:'Ext.panel.Panel',
	alias:'widget.authorityGroupForm',
	requires : [projectName +'.lib.component.DictionaryCombox'],
	title:'权限组设置',
	width:1000,
	height:400,
	buttonAlign:'left',
	initComponent:function(){
		var selectAuthorityStore=Ext.create(projectName +'.store.commons.sys.authorityGroup.AuthorityGroupSelectStore');
		selectAuthorityStore.load();
		var me = this;
		this.items = [{
				xtype:'form',
				id:'authorityGroupForm',
				border:false,
				style: 'background-color: #fff;',
				padding:'5 5 0 5',
				width:700,
				layout: {
			        type: 'table',
			        columns: 2, //每行有几列
			        tableAttrs: {//默认样式
			            style: "width:100;height:25;"
			        }
		    	},
		    	items:[
		    		{ xtype:'hidden',name:'id'},
		    		{xtype:'hidden',name:'parentId'},
		    		{ xtype:'hidden',name:'dataStatus'},
		    		{ xtype:'hidden',name:'leaf'},
		    		{
		    			
		    			xtype:'textfield',
		    			id:'authorityGroupName',
		    			name: 'name', 
		    			fieldLabel:'名称<font color="red">*</font>', 
		    			allowBlank : false,
		    			readOnly:true,
		    			width:270,
		    			labelWidth:40,
						margin:'5 15 0 10'
		    		},{
		    			xtype:'textfield',
		    			fieldLabel: '编号<font color="red">*</font>',
		    			name: 'code',
		    			allowBlank:false,
		    			readOnly:true,
		    			width:270,
		    			labelWidth:40,
						margin:'5 15 0 10'
		    		},
//		    			xtype:'dictionaryCombox',
//		    			fieldLabel: '类型',
//		    			readOnly:true,
////		    			id:'type',
//		    			code:'qxzlx',
//		    			name: 'type',
//		    			colspan:2,
//		    			width:270,
//		    			labelWidth:80,
//		    			margin:'5 5 0 20'
		    		{
		    			xtype:'textarea',
		    			fieldLabel: '描述',
		    			readOnly:true,
		    			colspan:2,
		    			name: 'description',
		    			width:570,
		    			labelWidth:40,
						margin:'5 15 10 10'
		    		},
		    		{
		    			xtype : 'tabpanel', plain : true, activeTab : 0, 
		    			layout : 'fit', height : 450,
						width:570,
						colspan:2,
						defaults : {
							fieldStyle : 'background-image: none;', 
							defaults : { 
								fieldStyle : 'background-image: none;'
							}
						},
						items : [ {
							title : '权限分配<font color="red">*</font>', 
							layout : 'fit', 
								items : [{
									name : 'authority', id : 'sys_user_edit_items_authoritys', 
										xtype : 'itemselector',  displayField : 'name', 
										valueField : 'id', 
										disabled:true,
										height : 250,
										store : selectAuthorityStore,
										allowBlank : false, msgTarget : 'side', 
										fromTitle : '未选权限', toTitle : '已选权限',
										blankText : '请选择权限'
								} ]
							}]
					}
		    	]}
		    	
				];
		this.buttons = [
			 {
                text: '保存', 
                id: 'save1',
                iconCls: 'icon-save',
                action: 'save'
            }
		];
		this.callParent(arguments);
	}
	
});