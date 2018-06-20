//参数配置表的Store
Ext.define(projectName + '.store.dispatch.parameters.ParametersStore', {
	extend : 'Ext.data.Store',
	model : projectName + '.model.dispatch.parameters.ParametersModel',
	autoLoad : false,//    .model.dispatch.parameters.ParametersModel
	proxy : {
		type : 'ajax',
		url : basePath + '/dispatch/parameters/query',
		reader : {
			type : 'json', // 后台数据解析为json
			root : 'pageItems.items', // 需要解析的数据
			totalProperty : 'pageItems.total' // 返回的条数
		}
	}
});