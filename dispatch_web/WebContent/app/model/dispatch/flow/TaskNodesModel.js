
Ext.define(projectName +'.model.dispatch.flow.TaskNodesModel', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'NODE_ID', type: 'string'},//节点ID
		{name: 'NODE_NAME',type: 'double'},//节点名称
		{name: 'NODE_STATUS',type: 'string'}//节点状态
	]
});