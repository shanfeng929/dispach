Ext.define('DISPATCH.model.dispatch.etlflowdispatch.PackageModel',{
	extend : 'Ext.data.Model',
	fields:[
			{name:'id',type:'int'},
			{name:'parent_id',type:'int'},
			{name:'flow_group_name',type:'string'},
			{name:'flow_group_desc',type:'string'}
	]
});