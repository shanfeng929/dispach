Ext.define(projectName+'.view.dispatch.etldispatch.CheckFlowDraw',{
	extend:'Ext.window.Window',
	alias:'widget.CheckFlowDraw',
//	requires :  ['Ext.ux.form.ItemSelector'],
	//id:'dispatch.shellAddView',
//	title:'子流程配置',
	width: 600 ,
	height : 500,
	id:'',
	//closable: false,
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
		var id = me.id;
		//var store = Ext.create(projectName+'.store.dispatch.etlflowdispatch.EtlFlowDispatchStore');
		Ext.applyIf(me,{
			
				html : '<div style="width:100%; height:550px; margin:0;padding0;overflow-y:visible;overflow-x:visible"><iframe    name="'+id+'"   frameBorder="0" scrolling="no" class="external" style="width:100%; height:100%; margin:0;padding0;" src="CheckFlowdraw.jsp?id='+id+'"></iframe></div>'
		              			}	
		);
	
		me.callParent(arguments);
	}
});