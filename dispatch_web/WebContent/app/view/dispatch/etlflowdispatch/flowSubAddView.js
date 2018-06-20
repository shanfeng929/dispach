Ext.define(projectName+'.view.dispatch.etlflowdispatch.flowSubAddView',{
	extend:'Ext.window.Window',
	alias:'widget.flowSubAddView',
//	requires :  ['Ext.ux.form.ItemSelector'],
	//id:'dispatch.shellAddView',
	title:'子流程配置',
	width: 600 ,
	height : 500,
	 closable: false,
	labelAlign : "right",
    modal: true,                //是否为模态窗口
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
   initComponent:function(){
		var me=this;
		var store = Ext.create(projectName+'.store.dispatch.etlflowdispatch.EtlFlowDispatchStore');
		Ext.applyIf(me,{
			items:[
{  
    xtype : "tabpanel",  
    //初始显示第几个Tab页    
    activeTab : 0,  
    plain : true,  
    height : 450,  
    defaultType : "panel",  
    bodyStyle : "padding:5px;",  
    //当Tab标签过多时,出现滚动条  
    enableTabScroll: true,     
    items : [
             //基本属性窗口
			   {
			    title : "基本属性",xtype : 'form' , region: 'center' ,id:projectName+'.view.dispatch.etlflowdispatch.flowSubAddView.flowDeployForm',fieldDefaults : {labelAlign : 'left', msgTarget : 'side'},
			    items : [ {xtype : 'container',defaultType : 'textfield',
		        items : [ {xtype : 'container', height:350,autoScroll: true,layout : {type : 'table', columns : 1},defaultType : 'textfield',
				 items: [{xtype: 'textfield',hidden: true, hideLabel:true ,name : 'branch',id : projectName+'.view.dispatch.etlflowdispatch.flowSubAddView.branch',  labelWidth : 90 , width:200, heigh:200,margin : '10 0 0 10'},
				         {  layout:'vbox',
				             xtype:'fieldset',  
				             autoHeight:true,  
				             defaultType:'textfield', 
				             width:500, 
				             title:'任务描述', 
				             //layout : {type : 'table', columns : 2},
				             items:[  
				                    {xtype: 'textfield',name : 'flowName',
				                    	fieldLabel : '流程名称<font color="red">*</font>',
				                    	id : projectName+'.view.dispatch.etlflowdispatch.flowSubAddView.flowName', 
				                    	allowBlank : false, labelWidth : 90 , width:300,
				                    	heigh:200,margin : '10 0 0 10'},
				        	  /*{xtype: 'textfield',
				               name : 'flowCnName',
				               fieldLabel : '流程中文名称<font color="red">*</font>',
				               id : projectName+'.view.dispatch.etlflowdispatch.flowSubAddView.flowCnName', 
				               allowBlank : false,
				               labelWidth : 90 , 
				               width:300,
				               heigh:200,
				               margin : '10 0 0 10'
				            	},*/
				        	  {xtype: 'textarea',
				               name : 'flowDesc',
				               fieldLabel : '流程备注',
				               id : projectName+'.view.dispatch.etlflowdispatch.flowSubAddView.flowDesc', 
				               labelWidth : 90 , 
				               width:450,
				               heigh:100,
				               margin : '10 0 0 10'},
				               {xtype: 'numberfield',
					               name : 'joinNum',
					               fieldLabel : '聚合数<font color="red">*</font>',
					               id : projectName+'.view.dispatch.etlflowdispatch.flowSubAddView.joinNum', 
					               allowBlank : false,
					               allowDecimals: false,
					               minValue : 1,
					               labelWidth : 90 , 
					               width:300,
					               heigh:200,
					               margin : '10 0 0 10'
					            	}
				        	  ]}
									]
				    	   }
				    	   ]
			    	   }]
			       }
			       ],
		    	   
		    	   buttons:[
		    	            {height:25,text : '保存', action : 'save',  id : 'disparth_subflow_save'},
		    	            {height:25,text : '退出' , handler: function(){ me.close();	 } }
		    	            ] }
			      
		]});
		
		me.callParent(arguments);
	}
});