Ext.define(projectName +'.model.commons.sys.authority.AuthorityModel', {
    extend: 'Ext.data.Model',
    fields: [{name: 'id', type: 'int'},
             {name: 'code',type: 'string'},
             {name: 'text', type: 'string'}, 
    	     {name: 'description',type: 'string'}, 
    	     {name: 'type',type: 'string'},
    	     {name: 'name',type: 'string'}
    	]});