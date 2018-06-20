Ext.define(projectName +'.model.dispatch.parameters.OpLogsModel', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'operator',type: 'string'},
		{name: 'address',type: 'string'},
		{name: 'operation', type: 'string'}, 
		{name: 'description',type: 'string'}, 
		{name: 'level', type: 'string'},
		{name: 'costTime',type: 'auto'}, 
		{name: 'serverIp',type: 'auto'},
		{name: 'createBy',type: 'string'}, 
		{name: 'createTime',type: 'string'}
	]
});