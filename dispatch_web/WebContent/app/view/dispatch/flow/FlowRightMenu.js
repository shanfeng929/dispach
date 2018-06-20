Ext.define(projectName+'.view.dispatch.flow.FlowRightMenu',{
	extend:'Ext.menu.Menu',
	alias:'widget.rightMenu',
	//控制右键菜单位置  
	floating:true,
	flow_data:{},
	initComponent : function() {
		var me = this;
		var flow_status = me.flow_status;
		Ext.applyIf(this, {
			items:[{  
				text:"执行流程",  
				iconCls:'icon-yes',
				action:'flowStart',
				disabled:flow_status[0]
	        },{  
				text:"暂停流程",  
				iconCls:'icon-del',  
				action:'flowStop',
				disabled:flow_status[1]
	        },{  
	            text:"恢复流程",  
	            iconCls:'icon-reset',  
	            action:'flowRestart',
	            disabled:flow_status[2]
	        },{  
	            text:"终止流程",  
	            iconCls:'icon-stop',  
	            action:'flowTerminate',
	            disabled:flow_status[3]
	        },{  
	            text:"最新错误日志查看",  
	            iconCls:'icon-search',  
	            action:'errorLog' 
	        },{  
	            text:"执行时间趋势查看",  
	            iconCls:'icon-chart',  
	            action:'timeChart' 
	        },{  
	            text:"流程下任务监控",  
	            iconCls:'icon-chart',  
	            action:'taskMonitor' 
	        }]
		});
		me.callParent(arguments);
	}
});