
Ext.define(projectName +'.model.dispatch.remoteservice.RemoteServiceModel', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'name',type: 'string'},
		{name: 'remoteIp',type: 'string'},
//		{name: 'remoteType', type: 'string'}, 
		{name: 'remoteUserName',type: 'string'}, 
		{name: 'remotePasswd', type: 'string'},
//		{name: 'remotePort', type: 'int'},
//		{name: 'remoteNameSpace', type: 'string'},
		{name: 'remoteDesc', type: 'string'},
		{name: 'createBy', type: 'string'},
		{name: 'createDate', type: 'string'},
		{name: 'updatedBy',type: 'string'},
		{name: 'updatedDate', type: 'string'}
	]
});