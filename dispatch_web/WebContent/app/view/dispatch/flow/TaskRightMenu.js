Ext.define(projectName+'.view.dispatch.flow.TaskRightMenu',{
	extend:'Ext.menu.Menu',
	alias:'widget.taskRightMenu',
	//控制右键菜单位置  
	floating:true,
	initComponent : function() {
		var me = this;
		Ext.applyIf(this, {
			items:[{  
	            text:"流程下任务监控",  
	            iconCls:'icon-chart',  
	            action:'taskMonitor' 
	        }]
		});
		me.callParent(arguments);
	}
});