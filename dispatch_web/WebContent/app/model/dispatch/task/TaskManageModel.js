
Ext.define(projectName +'.model.dispatch.task.TaskManageModel', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'id', type: 'string'},
		{name: 'pid',type: 'string'},//所属流程ID
		{name: 'pname',type: 'string'},//所属流程名称
		{name: 'taskName',type: 'string'},//任务名称
		{name: 'taskCnName',type: 'string'},//任务中文名称
		{name: 'startTime', type: 'string'}, //任务开始时间
		{name: 'endTime',type: 'string'}, //任务结束时间
		{name: 'taskBelong', type: 'int'},//任务组件所属类型 
		{name: 'taskBelongName', type: 'string'},//任务组件所属类型名称 
		{name: 'taskStatus', type: 'string'},//任务状态
		{name: 'taskAddress', type: 'string'},//任务执行地址或执行代码或ID
		{name: 'taskParameter', type: 'string'},//任务执行参数
		{name: 'execResult', type: 'string'},//任务执行返回结果
		{name: 'taskDesc', type: 'string'},//任务备注
		{name: 'createBy',type: 'string'},//创建者
		{name: 'createDate',type: 'string'},//创建日期
		{name: 'updatedBy',type: 'string'},//更新者
		{name: 'updatedDate',type: 'string'},//更新日期
		{name: 'joinNum',type: 'int'},//聚合数量
		{name: 'taskRemote',type: 'string'},//远程地址
		{name: 'taskError',type: 'string'},//是否容错
		{name: 'taskActive',type: 'string'},//是否激活
		{name: 'taskCustom',type: 'string'},//任务自定义条件
		{name: 'errorNum',type: 'int'},//容错次数
		{name: 'taskBranch',type: 'string'}//是否分支
	]
});