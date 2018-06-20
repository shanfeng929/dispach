Ext.define(projectName + '.view.dispatch.flow.FlowHistoryGridView', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.flowHistoryGrid',
	layout : 'fit',
	columnLines : true,
	taskMonitorNum : 0,
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
				width : 140
			}, {
				text : '所属任务链包ID',
				align : 'center',
				dataIndex : 'flowGroupid',
				hideable : true,
				hidden : true
			}, {
				text : '所属任务链包',
				align : 'center',
				dataIndex : 'flowGroupName',
				width : 120
			}, {
				text : '开始执行时间',
				align : 'center',
				dataIndex : 'startTime',
				width : 120
			}, {
				text : '结束执行时间',
				align : 'center',
				dataIndex : 'endTime',
				width : 120
			}, {
				text : '耗时(秒)',
				align : 'center',
				dataIndex : 'duration',
				width : 60
			}, {
				text : '流程状态',
				align : 'center',
				dataIndex : 'flowStatus',
				width : 120,
				renderer:function(val){
//					0：未执行（在history里面0代表执行成功）；1：运行中（在history中一般不会出现，除了最新的一条执行记录）；3：暂停；4：终止 
					var returnVal="";
					if(val=='0'){
						returnVal="执行成功";
					}else if(val=='1'){
						returnVal="<font color='#408a39'>运行中</font>";
					}else if(val=='3'){
						returnVal="<font color='#ee912d'>暂停</font>";
					}else if(val=='4'){
						returnVal="<font color='#ff0000'>终止</font>";/* e0504b */
					}
					return returnVal;
				}
			}, {
				text : '任务链执行信息',
				align : 'center',
				dataIndex : 'execResult',
				width : 295
			}, {
	            xtype:'actioncolumn',
	            text:'操作列',
	            align : 'center',
	            width:100,
	            items: [{
	                iconCls: 'task-detail',
	                tooltip: '任务详情'
	            },{
	                iconCls: 'icon-excel',
	                tooltip: '任务详情导出'
	            }]
	        }]
		});
		me.callParent(arguments);
	}
});