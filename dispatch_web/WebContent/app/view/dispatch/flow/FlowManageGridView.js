Ext.define(projectName + '.view.dispatch.flow.FlowManageGridView', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.flowManageGrid',
	layout : 'fit',
	columnLines : true,
	taskMonitorNum : 0,
//	selModel : Ext.create('Ext.selection.CheckboxModel'),
	initComponent : function() {
		var me = this;
		Ext.applyIf(this, {
			columns : [ {
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
				text : '任务链名称',
				align : 'center',
				dataIndex : 'flowName',
				width : 120
			}, {
				text : '任务链描述',
				align : 'center',
				dataIndex : 'flowDesc',
				width : 215
			},/* {
				text : '流程中文名称',
				align : 'center',
				dataIndex : 'flowCnName',
				width : 120
			}, */{
				text : '执行日期',
				align : 'center',
				dataIndex : 'workDate',
				width : 80
			}, {
				text : '执行时间',
				align : 'center',
				dataIndex : 'startTime',
				width : 60
			},/* {
				text : '执行周期',
				align : 'center',
				dataIndex : 'nextStarttime',
				width : 60
			}, */{
				text : '执行周期',
				align : 'center',
				dataIndex : 'nextStartunit',
				width : 60
			},/* {
				text : '流程结束时间',
				align : 'center',
				dataIndex : 'endTime',
				width : 120
			}, */{
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
			},/*{
				text : '流程状态',
				align : 'center',
				dataIndex : 'flowStatus',
				width : 120,
				renderer:function(val){
					0：未执行；1：运行中；3：暂停；4：终止 
					var returnVal="";
					if(val=='0'){
						returnVal="未执行";
					}else if(val=='1'){
						returnVal="<font color=green>运行中</font>";
					}else if(val=='3'){
						returnVal="<font color=orange>暂停</font>";
					}else if(val=='4'){
						returnVal="<font color=red>终止</font>";
					}
					return returnVal;
				}
			}, */{
				text : '发起方式',
				align : 'center',
				dataIndex : 'creator',
				width : 60,
				renderer:function(val){
					var msg = '';
					if(val=='0'||val=='人工'){
						msg='人工';
					}else if(val=='1'||val=='定时'){
						msg='定时';
					}
					return msg;
				}
			}, {
				text : '创建者',
				align : 'center',
				dataIndex : 'createBy',
				width : 60
			}, {
				text : '创建日期',
				align : 'center',
				dataIndex : 'createDate',
				width : 120
			}, {
				text : '更新者',
				align : 'center',
				dataIndex : 'updatedBy',
				width : 60
			}, {
				text : '更新日期',
				align : 'center',
				dataIndex : 'updatedDate',
				width : 120
			}, {
	            xtype:'actioncolumn',
	            text:'操作列',
	            align : 'center',
	            width:60,
	            items: [{
	                /*iconCls: 'task-start',*/
	                tooltip: '执行',
	                getClass:function(v,meta,rec){
	                	var creator = rec.data.creator;
	                	var status = rec.data.flowStatus;
//	                	debugger;
	                	if(creator=='1'){
	                		return 'task-start-undo';
	                	}else{
	                		if(status=='0'||status=='4')
	                			return 'task-start';
	                		else
	                			return 'task-start-undo';
	                	}
	                }
	            }]
	        }]
		});
		me.callParent(arguments);
	}
});