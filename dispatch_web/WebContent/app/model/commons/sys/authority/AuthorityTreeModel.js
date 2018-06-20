Ext.define(projectName +'.model.commons.sys.authority.AuthorityTreeModel', {
    extend: 'Ext.data.Model',
    fields: [{name: 'id', type: 'int'},
             {name: 'code',type: 'string'},
             {name: 'name', type: 'string'}, 
    	     {name: 'parent_id',type: 'int'},
             {name: 'leaf',type: 'int'},
             {name: 'prefix',type: 'string'},
             {name: 'suffix',type: 'string'}
    	   
    	]});