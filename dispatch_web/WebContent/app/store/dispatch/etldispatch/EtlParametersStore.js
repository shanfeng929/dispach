Ext.define(projectName + '.store.dispatch.etldispatch.EtlParametersStore', {
			extend : 'Ext.data.Store',
			fields : ['id', 'flowId', 'paraName', 'paraValue', 'paraType'],
			alias : 'widget.EtlDispatchStore',
			autoLoad : false,
			pageSize : 15,
			proxy : {
				type : 'ajax',
				url : basePath + '/DisPatch/EtlFlow/getflowpara',
				extraParams : {},
				reader : {
					type : 'json',
					root : 'listItems'

				},
				init : function() {

				}

			}
		});