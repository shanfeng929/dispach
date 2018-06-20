
Ext.define(projectName +'.model.dispatch.flow.TaskMonitorModel', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'id', type: 'int'},//节点ID
		{name: 'pid',type: 'string'},//节点名称
		{name: 'taskName',type: 'string'},//节点状态
		{name: 'taskDesc',type: 'string'},
		{name: 'startTime',type: 'string'},
		{name: 'endTime',type: 'string'},
		{name: 'duration',type: 'string'},
		{name: 'taskBelong',type: 'string'},
		{name: 'taskStatus',type: 'string'},
		{name: 'execResult',type: 'string'}
	]
});