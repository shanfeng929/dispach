Ext.define(projectName + '.store.dispatch.etldispatch.ops.ModelStore', {
			extend : 'Ext.data.Store',
			model : projectName
					+ '.model.dispatch.etlflowdispatch.ops.ModelModel',
			/*
			 * fields : [ {name : 'modelCode', type : 'string'}, {name :
			 * 'modelName', type : 'string'}, {name : 'warningObject', type :
			 * 'string'}, {name : 'warningType', type : 'string'}, {name:
			 * 'title', type: 'string',mapping: 'title.title'}, {name:
			 * 'orgName', type: 'string',mapping: function(data) { return
			 * data.org.orgName; }}, {name : 'runPeriod', type : 'string'},
			 * {name : 'isUse', type : 'int'} ],
			 */
			pageSize : '15',
			autoLoad : false,
			proxy : {
				type : 'ajax',
				url : basePath+'/transmit/model',
				reader : {
					type : 'json',
					// rootProperty : 'root',
					root : 'root',
					totalProperty : 'total'
				}
			}
		});