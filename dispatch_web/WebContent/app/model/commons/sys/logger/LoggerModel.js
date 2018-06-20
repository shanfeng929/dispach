Ext.define(projectName +'.model.commons.sys.logger.LoggerModel', {
    extend: 'Ext.data.Model',
    fields: [
             {name: 'id', type: 'int'},
     		 {name: 'operator',type: 'string'},
             {name: 'address',type: 'string'},
             {name: 'operation', type: 'string'}, 
    	     {name: 'description',type: 'string'}, 
    	     {name: 'date', type: 'string'},
    	     {name: 'level', type: 'int'}
    	    ]
});