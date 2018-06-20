
Ext.define(projectName +'.model.dispatch.parameters.DataSourceModel', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'dbId', type: 'int'},
		{name: 'dbName',type: 'string'},
		{name: 'driverName',type: 'string'},
		{name: 'dbUrl', type: 'string'}, 
		{name: 'userName',type: 'string'}, 
		{name: 'password', type: 'string'}
	]
});