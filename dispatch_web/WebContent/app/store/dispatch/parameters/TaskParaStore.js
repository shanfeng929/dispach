Ext.define(projectName + '.store.dispatch.parameters.TaskParaStore', {
	extend : 'Ext.data.Store',
	fields: ['id','paraName','paraValue','paraType'],
	autoLoad : true,
	proxy : {
		type : 'ajax',
		url : basePath + '/DisPatch/pickupparameters',
		reader : {
			type : 'json', // 后台数据解析为json
			root : 'listItems' // 需要解析的数据
			//totalProperty : 'pageItems.total' // 返回的条数
		}
	}
});