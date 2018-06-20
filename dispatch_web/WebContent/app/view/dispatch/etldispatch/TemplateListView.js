/**
 * 组件列表
 */
Ext.define(projectName+'.view.dispatch.etldispatch.TemplateListView',{
	extend:'Ext.window.Window',
	alias:'widget.templateList',
//	requires :  ['Ext.ux.form.ItemSelector'],
	title:'组件列表',
	width: 600 ,
	height : 500,
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
		var store = Ext.create(projectName +'.store.dispatch.etldispatch.TemplateListStore');
		store.load();
		Ext.applyIf(me,{
			items:[{  
				xtype: 'grid', 
				region: 'center',
				store : store,
				id:projectName+'.view.dispatch.etldispatch.TemplateListView.grid',
				columns : [{
					xtype : 'rownumberer',
					text : '序号',
					align : 'center',
					width : 60
				}, {
					text : 'id',
					dataIndex : 'id',
					hideable : true,
					hidden : true
				}, {
					text : '组件名称',
					align : 'center',
					dataIndex : 'templateName',
					width : 120
				}, {
					text : '组件属性参数详细',
					align : 'center',
					dataIndex : 'paramsVal',
					width : '100%'
				}],
		    	}
			      
		],
		buttons:[{
  	            	height:25,
  	            	text : '确定', 
  	            	action : 'select',  
  	            	id : 'disparth_template_select'
  	            },{
  	            	height:25,
  	            	text : '退出' , 
  	            	handler: function(){ 
  	            		me.close();   
  	            	} 
  	            }]
		});
		
		me.callParent(arguments);
	}
});