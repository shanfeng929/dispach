
Ext.define(projectName +'.model.commons.sys.authorityGroup.AuthorityGroupTreeModel', {
    extend: 'Ext.data.Model',
    fields: [{name: 'id', type: 'int'},
             {name: 'code',type: 'string'},
             {name: 'name', type: 'string'}, 
			 {name:'text',type:'string'},
    	     {name: 'description',type: 'string'}, 
    	     {name: 'type',type: 'string'},
    	     {name:'parent_id',type:'int'},
	    	 {name:'data_status',type:'int'},
	    	 {name:'des',type:'string'},
	   	     {name:'type_',type:'string'}
	    	 
    	]});