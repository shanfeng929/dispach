Ext.define(projectName + '.model.dispatch.etlflowdispatch.ops.ModelModel', {
	extend : 'Ext.data.Model',
	idProperty: 'modelCode',
    identifier: 'negative',
    phantom: true,
	fields : [
	          {name : 'modelCode', type : 'string'},
	          {name : 'modelName', type : 'string'},
	          {name : 'warningObject', type : 'string'},
	          {name : 'warningType', type : 'string'},
	          {name: 'title',mapping:'title.title'},
	          {name: 'orgName', type: 'string',mapping: function(data) {
	              return data.org.orgName;
	          }},
	          {name : 'runPeriod', type : 'string'},
	          {name : 'isUse', type : 'int'},
	          {name : 'used', type : 'int'}
	          ]
});