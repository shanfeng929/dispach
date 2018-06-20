Ext.define(projectName +'.model.commons.sys.operation.OperationTreeModel', {
    extend: 'Ext.data.Model',
    fields: [{name:'id',type:'int'},
     		{name:'parent_id',type:'int'},
    		{name:'description',type:'string'},
    		//{name:'leaf',type:'int'},
    		{name:'data_status',type:'int'},
    		{name:'code',type:'string'},
    		{name:'name',type:'string'},
    		{name:'checked',type:'boolean'}
    	]});