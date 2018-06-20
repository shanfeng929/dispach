Ext.define(projectName + '.view.dispatch.task.TaskManageGridView', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.taskManageGrid',
	layout : 'fit',
	columnLines : true,
	selModel : Ext.create('Ext.selection.CheckboxModel'),
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
				text : 'pid',
				dataIndex : 'pid',
				hideable : true,
				hidden : true
			}, {
				text : '所属流程名称',
				align : 'center',
				dataIndex : 'pname',
				width : 120
			}, {
				text : '任务名称',
				align : 'center',
				dataIndex : 'taskName',
				width : 120
			}, {
				text : '任务中文名称',
				align : 'center',
				dataIndex : 'taskCnName',
				width : 120
			}, {
				text : '任务开始时间',
				align : 'center',
				dataIndex : 'startTime',
				width : 120
			}, {
				text : '任务结束时间',
				align : 'center',
				dataIndex : 'endTime',
				width : 120
			}, {
				text : '任务组件所属类型',
				align : 'center',
				dataIndex : 'taskBelong',
				hideable : true,
				hidden : true
			}, {
				text : '任务组件所属类型名称 ',
				align : 'center',
				dataIndex : 'taskBelongName',
				width : 120
			}, {
				text : '任务状态',
				align : 'center',
				dataIndex : 'taskStatus',
				width : 60,
				renderer:function(val){
					/*0:正在执行;1:执行时间 超过2秒;2:执行成功;3:执行失败;4:未执行  */
					var returnVal="";
					if(val=='0'||val=='1'){
						returnVal="正在执行";
					}else if(val=='2'){
						returnVal="执行成功";
					}else if(val=='3'){
						returnVal="执行失败";
					}else if(val=='4'){
						returnVal="未执行";
					}
					return returnVal;
				}
			}, {
				text : '任务执行地址或执行代码或ID',
				align : 'center',
				dataIndex : 'taskAddress',
				width : 120
			}, {
				text : '任务执行参数',
				align : 'center',
				dataIndex : 'taskParameter',
				width : 120
			}, {
				text : '任务执行返回结果',
				align : 'center',
				dataIndex : 'execResult',
				width : 120
			}, {
				text : '任务备注',
				align : 'center',
				dataIndex : 'taskDesc',
				width : 120
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
				text : '聚合数量',
				align : 'center',
				dataIndex : 'joinNum',
				width : 60
			}, {
				text : '远程地址',
				align : 'center',
				dataIndex : 'taskRemote',
				width : 120
			}, {
				text : '是否容错',
				align : 'center',
				dataIndex : 'taskError',
				width : 60,
				renderer:function(val){
					var msg=val;
					if(val=='1'){
						msg='是';
					}else if(val=='0'){
						msg='否';
					}
					return msg;
				}
			}, {
				text : '是否激活',
				align : 'center',
				dataIndex : 'taskActive',
				width : 60,
				renderer:function(val){
					var msg=val;
					if(val=='1'){
						msg='是';
					}else if(val=='0'){
						msg='否';
					}
					return msg;
				}
			}, {
				text : '容错次数',
				align : 'center',
				dataIndex : 'errorNum',
				width : 60
			}]
		});
		me.callParent(arguments);
	}
});