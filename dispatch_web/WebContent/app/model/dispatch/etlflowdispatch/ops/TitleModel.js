Ext.define(projectName + '.model.dispatch.etlflowdispatch.ops.TitleModel', {
	extend : 'Ext.data.Model',
/*	proxy : {
		type: 'ajax',
		url : 'modeltitle/modelTitleList',
		writer: {
			writeAllFields: true
		}
	},*/
	idProperty: 'id',
    identifier: 'negative',
    phantom: true,
	fields : [
		{name : 'id', type : 'int'},
		{name : 'title', type : 'string'},
		{name : 'parentId' ,type:'int'},
		{name : 'titleLevel', type:'int'}
		
     ]
});