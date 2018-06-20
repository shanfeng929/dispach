Ext.define(projectName + '.view.dispatch.flow.FlowMonitorGridView', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.flowMonitorGrid',
	layout : 'fit',
	columnLines : true,
//	taskMonitorNum : 0,
//	selModel : Ext.create('Ext.selection.CheckboxModel'),
	initComponent : function() {
		var me = this;
		Ext.applyIf(this, {
			columns : [ {
				xtype : 'rownumberer',
				text : '序号',
				align : 'center',
				width : 40
			}, {
				text : 'id',
				dataIndex : 'id',
				hideable : true,
				hidden : true
			}, {
				text : '任务链名称',
				align : 'center',
				dataIndex : 'flowName',
				width : 120
			}, {
				text : '任务链描述',
				align : 'center',
				dataIndex : 'flowDesc',
				width : 355
			}, {
				text : '所属任务链包ID',
				align : 'center',
				dataIndex : 'flowGroupid',
				hideable : true,
				hidden : true,
				width : 120
			}, {
				text : '所属任务链包',
				align : 'center',
				dataIndex : 'flowGroupName',
				width : 120
			}, {
				text : '执行日期',
				align : 'center',
				dataIndex : 'workDate',
				width : 120
			}, {
				text : '执行时间',
				align : 'center',
				dataIndex : 'startTime',
				width : 120
			}, {
				text : '流程状态',
				align : 'center',
				dataIndex : 'flowStatus',
				width : 120,
				renderer:function(val){
//					0：未执行；1：运行中；3：暂停；4：终止 
					var returnVal="";
					if(val=='0'){
						returnVal="未执行";
					}else if(val=='1'){
						returnVal="<font color='#408a39'>运行中</font>";
					}else if(val=='3'){
						returnVal="<font color='#ee912d'>暂停</font>";
					}else if(val=='4'){
						returnVal="<font color='#e0504b'>终止</font>";
					}
					return returnVal;
				}
			}, {
	            xtype:'actioncolumn',
	            text:'操作列',
	            align:'center',
	            width:200,
	            items:[{
	            	/*iconCls: 'task-suspend',*/
	                tooltip: '暂停',
	                getClass:function(v,meta,rec){
	                	var status = rec.data.flowStatus;
	                	var me = this;
//	                	debugger;
	                	if(status == '1')
	                		return 'task-suspend';
	                	else
	                		return 'task-suspend-undo';
	                }
	            },'-',{
	            	/*iconCls: 'task-resume',*/
	                tooltip: '恢复',
	                getClass:function(v,meta,rec){
	                	var status = rec.data.flowStatus;
	                	var me = this;
//	                	debugger;
	                	if(status == '3')
	                		return 'task-resume';
	                	else
	                		return 'task-resume-undo';
	                }
	            },'-',{
	            	iconCls: 'task-terminate',
	                tooltip: '终止'
	            },'-',{
	                iconCls: 'task-detail',
	                tooltip: '任务详情'
	            },'-',{
	            	iconCls: 'task-history',
	                tooltip: '历史执行情况'
	            }]
	        }]
		});
		me.callParent(arguments);
	}
});