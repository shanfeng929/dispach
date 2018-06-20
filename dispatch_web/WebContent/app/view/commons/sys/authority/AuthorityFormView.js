/**
 *修改
 * 1.2015/10/28 lss
 *
 */
var sys_auth_edit_items_menus=[];
//var sys_auth_edit_items_opeas=[];
Ext.define(projectName + '.view.commons.sys.authority.AuthorityFormView',{
	extend:'Ext.panel.Panel',
	alias:'widget.authorityForm',
	requires:[projectName + '.lib.component.AccItemTreeMultiComboBox',projectName +'.lib.component.DictionaryCombox'],
	title:'基本信息',
	buttonAlign:'left',
	initComponent:function(){
		var me = this;
		//var authorityByRoleStore = Ext.create('LRM.store.sys.authority.EntireAuthorityStore');tab_store
//		var store=Ext.create('ALM.store.commons.sys.operation.OperationTreeStore');
		var menuStore=Ext.create(projectName +'.store.commons.sys.menu.MenuTreeStore');
//		Ext.apply(store.proxy.extraParams,{
//			'authId' :000
//		});
//		store.load(); 
		Ext.apply(menuStore.proxy.extraParams,{
			'authId' :000
		});
		menuStore.load();
		var record_start = 0;
		this.items = [{
				xtype:'form',
				id:'authorityFormId',
				border:false,
				padding:'5 5 0 5',
				style : 'background-color: #fff;',
				frame : true,
				layout: {
			        type: 'table',
			        columns: 1/*, //每行有几列
			        tableAttrs: {//默认样式
			            style: "width:100;height:25;"
			        }*/
		    	},
		    	items:[
		    	{
					xtype:'textfield',
					name:'name',
					fieldLabel:'权限名称',
				   	width:320,
				   	readOnly:true,
					allowBlank:false,
					margin : '5 5 0 20',
				   	labelWidth:60,
					listeners : {
						blur : function(r){
							var regex = /[^\x00-\xff]/g;
							if(r.getValue().replace(regex,'**').length > 100){
								Ext.example.msg("提示","名称不能超过100个字符,请重新输入！");
								r.setValue('');
							}
						}
					}
				},{
					xtype:'textfield',
					name:'code',
					fieldLabel:'权限编码',
				   	width:320,
				   	readOnly:true,
				   	allowBlank:false,
					margin : '5 5 0 20',
				   	labelWidth:60,
				   	listeners : {
						blur : function(r){
							var regex = /[^\x00-\xff]/g;
							if(r.getValue().replace(regex,'**').length > 150){
								Ext.example.msg("提示","编码不能超过150个字符,请重新输入！");
								r.setValue('');
							}
						}
					}
				}
//				,{
//					xtype:'dictionaryCombox',
//					code:'qxlx',
//					name:'type',
//					fieldLabel:'权限类型',
//				   	width:320,
//				   	readOnly:true,
//				   	allowBlank:false,
//				   	margin:'5 0 5 5',
//				   	labelWidth:90
//				}
				,{
					xtype:'textarea',
					name:'description',
					fieldLabel:'权限描述',
				   	width:320,
				   	readOnly:true,
					margin : '5 5 0 20',
				   	labelWidth:60,
				    listeners : {
						blur : function(r){
							var regex = /[^\x00-\xff]/g;
							if(r.getValue().replace(regex,'**').length > 200){
								Ext.example.msg("提示","描述不能超过200个字符,请重新输入！");
								r.setValue('');
							}
						}
					}
				},{
					xtype:'hidden',
					name:'id'
				},{
					xtype:'hidden',
					name:'dataStatus'
				}]},{
		    		xtype:'tabpanel',
		    		plain: true,
		    		width:'100%',
		    		height:'100%',
		    		flex:1,
		    		defaults :{
				            autoScroll: true,
				            bodyPadding: 10
				        },
		    		items:[
                        {
			        		title:'菜单信息',
			        		width:'100%',
			        		height:'100%',
			        		id:'authorityTab0',
			        		flex:1,
			        		items:[{
								xtype : 'fieldset',
								height : 275,
								title:'页面菜单',
								defaults : {
									fieldStyle : 'background-image: none;',
									defaults : {
										fieldStyle : 'background-image: none;'
									}
							    },
                                items : [{
                                    name : 'sys_auth_edit_items_menus',
                                    id : 'sys_auth_edit_items_menus',
                                    xtype : 'treepanel',
                                    disabled:true,
                                //	store : authorityByRoleStore,
                                    store:menuStore,
                                    rootVisible : false,
                                    layout : 'fit',
                                    height : 250
                                    //displayField: 'name',
                                }]
						    }]
		    			 }
//		    			 ,{
//				        		title:'功能页面',
//				        		width:'100%',
//				        		height:'100%',
//				        		id:'authorityTab1',
//				        		flex:1,
//				        		items:[{
//									xtype : 'fieldset', 
//									height : 275,
//									title:'功能页面',
//									
//									defaults : {
//										fieldStyle : 'background-image: none;',
//										defaults : {
//											fieldStyle : 'background-image: none;'
//												}
//								},
//								items : [{
//									name : 'sys_auth_edit_items_opeas',
//									id : 'sys_auth_edit_items_opeas',
//									xtype : 'treepanel',
//									store:store,
//								//	store : authorityByRoleStore,
//									disabled:true,
//									rootVisible : false, 
//									layout : 'fit', 
//									height : 250,
//									displayField: 'name'
//								}]
//							}]
//			    	     }
			    	     ]
				}
		];

		this.buttons = [
			 {
                text: '保存',
                iconCls: 'icon-save',
                id:'authority_btn',
                action: 'save'
            }
		];
		this.callParent(arguments);
	}

});