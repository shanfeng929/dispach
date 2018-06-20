
Ext.define(projectName +'.model.dispatch.flow.FlowHistoryModel', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'id', type: 'string'},
		{name: 'flowId',type: 'string'},
		{name: 'flowName',type: 'string'},//流程名称
		{name: 'flowDesc', type: 'string'},//流程备注
		{name: 'startTime', type: 'string'}, //流程开始时间
		{name: 'endTime',type: 'string'}, //流程结束时间
		{name: 'duration',type: 'string'}, //耗时
		{name: 'flowGroupid', type: 'string'},//流程分组ID
		{name: 'flowGroupName', type: 'string'},//流程分组名称
		{name: 'flowStatus', type: 'string'},//流程状态
		{name: 'execResult', type: 'string'},//最新任务错误日志
	]
});