
Ext.define(projectName +'.model.dispatch.flow.FlowManageModel', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'id', type: 'string'},
		{name: 'flowName',type: 'string'},//流程名称
//		{name: 'flowCnName',type: 'string'},//流程中文名称
		{name: 'startTime', type: 'string'}, //流程开始时间
		{name: 'endTime',type: 'string'}, //流程结束时间
		{name: 'flowGroupid', type: 'string'},//流程分组ID
		{name: 'flowGroupName', type: 'string'},//流程分组名称
		{name: 'flowStatus', type: 'string'},//流程状态
		{name: 'execResult', type: 'string'},//最新任务错误日志
		{name: 'workDate', type: 'string'},//业务日期 格式YYYYMMDD或者YYYYMMDDHH
		{name: 'creator',type: 'string'},// 人工发起人 或，定时发起
		{name: 'flowDesc', type: 'string'},//流程备注
		{name: 'createBy',type: 'string'},//创建者
		{name: 'createDate',type: 'string'},//创建日期
		{name: 'updatedBy',type: 'string'},//更新者
		{name: 'updatedDate',type: 'string'},//更新日期
		{name: 'flowNote',type: 'string'},//操作备注 
		{name: 'flowBranch',type: 'string'},//是否为子流程
		/*{name: 'nextStarttime',type: 'int'},*///下一次执行时间间隔
		{name: 'nextStartunit',type: 'string'}//下一次执行时间间隔单位
	]
});