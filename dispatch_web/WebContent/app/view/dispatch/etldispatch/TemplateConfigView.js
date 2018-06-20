Ext.define(projectName+'.view.dispatch.etldispatch.TemplateConfigView',{
	extend:'Ext.window.Window',
	alias:'widget.templateConfig',
//	requires :  ['Ext.ux.form.ItemSelector'],
	title:'新增组件配置',
	width: 600 ,
	height : 500,
	labelAlign : "right",
    modal: true,//是否为模态窗口
    defaults : {
		defaults : {
			defaults : {
				margin : '5 5 5 10',
				fieldStyle : 'background-color: #DFE9F6;background-image: none;'
			}
		}
	},
   bodyStyle: 'padding:15px',
   resizable: true,
   record : {},
   initComponent:function(){
		var me=this;
		var store = Ext.create(projectName+'.store.dispatch.etldispatch.EtlDispatchStore');
		var parStore= Ext.create(projectName+'.store.dispatch.etldispatch.EtlParametersStore');
		Ext.applyIf(me,{
			items:[{  
			    xtype : "tabpanel",  
			    //初始显示第几个Tab页    
			    activeTab : 0,  
			    plain : true,  
			    height : 450,  
			    defaultType : "panel",  
			    bodyStyle : "padding:5px;",  
			    //当Tab标签过多时,出现滚动条  
			    enableTabScroll: true,     
			    items : [{//基本属性窗口
			    	title : "基本属性",xtype : 'form' , region: 'center' ,id:projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateForm',fieldDefaults : {labelAlign : 'left', msgTarget : 'side'},
			    	items : [ {xtype : 'container',defaultType : 'textfield',
			    	items : [ {xtype : 'container', height:350,autoScroll: true,layout : {type : 'table', columns : 1},defaultType : 'textfield',
			    	items: [{  layout:'vbox',
				             xtype:'fieldset',  
				             autoHeight:true,  
				             defaultType:'textfield', 
				             width:500, 
				             title:'组件描述', 
				             //layout : {type : 'table', columns : 2},
				             items:[{xtype: 'textfield',name : 'id',id : projectName+'.view.dispatch.etldispatch.TemplateConfigView.id',labelWidth : 90 , width:300,heigh:200,margin : '10 0 0 10',hidden:true,value:this.record.id},
				                    {xtype: 'textfield',name : 'templateName',fieldLabel : '组件名称<font color="red">*</font>',
				                    	id : projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateName',allowBlank : false, labelWidth : 90 , width:300,heigh:200,margin : '10 0 0 10',value:this.record.templateName},
				        	  {xtype: 'textfield',name : 'templateType',fieldLabel : '组件类型<font color="red">*</font>',id : projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateType', allowBlank : false, labelWidth : 90 , width:200, heigh:200,margin : '10 0 0 10',value:this.record.templateType},
				        	  {xtype: 'textarea',name : 'templateDesc',fieldLabel : '组件备注',id : projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateDesc', labelWidth : 90 , width:450, heigh:100,margin : '10 0 5 10',value:this.record.templateDesc}
				        	  ]
				         },
				          { xtype: 'displayfield', value: '<hr width=510,height:1/>' },
				          {  layout:'form',  
				             xtype:'fieldset',  
				             autoHeight:true,  
				             defaultType:'textfield',  
				             title:'组件执行属性',  
				             width:500, 
//				             margin : '0 0 0 10',
				             items:[  
						 {fieldLabel : '远程地址',
							    xtype : 'combo',
							    id : projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateRemote',
								width : 150,
								displayField:'reMote',
								typeAhead: false,
								triggerAction: 'all',
								minChars:1,
								selectOnFocus:true,
							//	mode: 'remote',
								store : store,
								listeners:{
									change:function(combo, record,index){
										Ext.apply(store.proxy.extraParams,{
						    					 reMote:Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateRemote').getValue()
						    			}); 
						    			store.load();
						    		},
						    		expand:function(combo, record,index){
				    					Ext.apply(store.proxy.extraParams,{
				    						   reMote:Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateRemote').getValue()
				    					}); 
						    			store.load()}
						    		},
									labelWidth : 60,
									margin : '0 0 0 5',
									value:this.record.templateRemote
								},
								{	
									xtype: 'textarea',
									name : 'templateCommand',
									fieldLabel : '组件执行语句<font color="red">*</font>',
									id : projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateCommand',
									allowBlank : false, 
									labelWidth : 90 ,
									heigh:200,
									margin : '10 0 0 10',
									value:this.record.templateCommand
								},{  
									layout:'form',  
									xtype:'fieldset',  
									autoHeight:true,  
									defaultType:'textfield',  
									title:'组件执行参数',  
									width:180, 
									margin : '0 0 0 0',
									items:[{
											xtype: 'combo',
											name : 'paraName',
											fieldLabel : '参数选择',
											id : projectName+'.view.dispatch.etlflowdispatch.TemplateConfigView.paraName',
											width : 150,
											labelWidth : 90 , 
											heigh:200,
											displayField:'paraName',
											valueField:'paraId',
											typeAhead: false,
											triggerAction: 'all',
											minChars:1,
											value:'',
											selectOnFocus:true,
											store : parStore,
											listeners:{
												change:function(combo, record,index){
													Ext.apply(parStore.proxy.extraParams,{
														paraName:Ext.getCmp(projectName+'.view.dispatch.etlflowdispatch.TemplateConfigView.paraName').getValue()
													}); 
													parStore.load()
												},
												expand:function(combo, record,index){
													Ext.apply(parStore.proxy.extraParams,{
														paraName:Ext.getCmp(projectName+'.view.dispatch.etlflowdispatch.TemplateConfigView.paraName').getValue()
													}); 
												parStore.load()}
											},
											labelWidth : 90,
											margin : '10 0 0 10'
										},{
											xtype: 'textfield',
											name : 'paraValue',
											fieldLabel : '参数值',
											id : projectName+'.view.dispatch.etldispatch.TemplateConfigView.paraValue',
											labelWidth : 90 ,
											heigh:200,
											margin : '10 0 0 10'
										},{
											xtype: 'button',
											name : 'parameterButton',
											text:'保存参数',
											id : projectName+'.view.dispatch.etldispatch.TemplateConfigView.parameterButton', 
											action:'parameterButton',
											margin : '0 0 0 100'
										},{	
											xtype: 'textarea',
											name : 'templateParameter',
											fieldLabel : '组件参数',
											id : projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateParameter', 
											labelWidth : 90 ,
											heigh:200,
											margin : '10 0 0 10',
											value:this.record.templateParameter
										}]
								}
				    		  ]}
									]
				    	   }
				    	   ]
			    	   }]
			       },
			       //控制策略窗口
			       {
			    	   title : "控制策略",xtype : 'form' , region: 'center' ,id:projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateStrategyForm',fieldDefaults : {labelAlign : 'left', msgTarget : 'side'},
			    	   items : [{  layout:'vbox',
				             	   xtype:'fieldset',  
				             	   autoHeight:true,  
				             	   defaultType:'textfield', 
				             	   width:400,
				             	   height:150,
				             	   margin : '0 0 0 80',
				             	   title:'容错管理', 
				             //layout : {type : 'table', columns : 2},
				         items:[ {	xtype: 'textfield',
				    	    	   	name : 'errorNum',
				    	    	   	fieldLabel : '错误重试次数',
				    	    	   	id : projectName+'.view.dispatch.etldispatch.TemplateConfigView.errorNum', 
				    	    	   	labelWidth : 90 , 
				    	    	   	width:200, 
				    	    	   	margin : '10 0 0 10',
				    	    	   	value : this.record.errorNum
				    	    	  },
									{	xtype : 'combo',
										editable:false,
										store : new Ext.data.SimpleStore({
										fields : [ 'value', 'text' ],
										data : [ [ '1', '是' ], [ '0', '否' ]]
										}),
										name : 'templateError', 
										typeAhead: true,
										mode : "local" ,
										triggerAction : 'all',
										fieldLabel : '错误时是否跳过',
										id : projectName + '.view.dispatch.etldispatch.TemplateConfigView.templateError',
										allowBlank : true,
										width : 180,
										labelWidth : 90,
										margin : '10 0 0 10',
//										emptyText : '否',
										value:'否',
										displayField: 'text',
										valueField:'value'
									},
									{	xtype : 'combo',
										editable:false,
										store : new Ext.data.SimpleStore({
										fields : [ 'value', 'text' ],
										data : [ [ '0', '不是分支节点' ], [ '1', '正确分支节点' ],['2','错误分支节点']]
										}),
										name : 'templateBranch', 
										typeAhead: true,
										mode : "local" ,
										triggerAction : 'all',
										fieldLabel : '分支节点属性',
										id : projectName + '.view.dispatch.etldispatch.TemplateConfigView.templateBranch',
										allowBlank : true,
										width : 180,
										labelWidth : 90,
										margin : '10 0 0 10',
										value:'不是分支节点',
										displayField: 'text',
										valueField:'value'
										
									}
				    		   ]
				    	   },
				    	   { xtype: 'displayfield', value: '<hr width=510,height:1/>' },
				    	   {  layout:'vbox',
					             xtype:'fieldset',  
					             autoHeight:true,  
					             defaultType:'textfield', 
					             width:400,
					             height:150,
					             margin : '0 0 0 80',
					             title:'其他策略', 
					             //layout : {type : 'table', columns : 2},
					             items:[
					                    	{xtype: 'textfield',
						    	    	   	   name : 'templateLoop',
						    	    	   	   fieldLabel : '组件循环次数',
						    	    	   	   id : projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateLoop', 
						    	    	   	   labelWidth : 90 , 
						    	    	   	   width:200, 
						    	    	   	   margin : '10 0 0 10',
						    	    	   	   value : this.record.templateLoop
						    	    	   	},
						    	    	   	{	xtype : 'combo',
													editable:false,
													margin : '0 80 0 0',
													store : new Ext.data.SimpleStore({
													fields : [ 'value', 'text' ],
													data : [ [ '1', '是' ], [ '0', '否' ]]
													}),
													name : 'templateActive', 
													typeAhead: true,
													mode : "local" ,
													triggerAction : 'all',
													fieldLabel : '是否有效',
													id : projectName + '.view.dispatch.etldispatch.TemplateConfigView.templateActive',
													allowBlank : true,
													width : 180,
													labelWidth : 90,
													margin : '10 0 0 10',
//													emptyText : '是',
													value:'是',
													displayField: 'text',
													valueField:'value'
												},
												{xtype: 'textfield',
								    	    	   	   name : 'templateCustom',
								    	    	   	   fieldLabel : '自定义条件',
								    	    	   	   id : projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateCustom', 
								    	    	   	   labelWidth : 90 , 
								    	    	   	   width:200, 
								    	    	   	   margin : '10 0 0 10',
								    	    	   	   value : this.record.templateCustom
								    	    	}
					                    ]}
				    		  
				    	   ]
			    	   
			    	   
			    	   
			       }
			       
			       ],
		    	   
		    	   buttons:[
		    	            {height:25,text : '保存', action : 'save',  id : 'template_config_save'},
		    	            {height:25,text : '退出' , handler: function(){ me.close();   } }
		    	            ] }
			      
		]});
		
		me.callParent(arguments);
	}
});