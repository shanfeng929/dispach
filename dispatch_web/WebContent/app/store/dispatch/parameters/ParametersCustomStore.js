// 自定义参数表的Store
Ext.define(projectName + '.store.dispatch.parameters.ParametersCustomStore', {
			extend : 'Ext.data.Store',
			model : projectName
					+ '.model.dispatch.parameters.ParametersCustomModel',
			autoLoad : false,
			proxy : {
				type : 'ajax',
				url : basePath + '/dispatch/paracustom/query',
				reader : {
					type : 'json', // 后台数据解析为json
					root : 'listItems' // 需要解析的数据
					//totalProperty : 'pageItems.total'  //不分页
				}
			}
		});