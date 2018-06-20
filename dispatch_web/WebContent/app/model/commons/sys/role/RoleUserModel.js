
Ext.define(projectName +'.model.commons.sys.role.RoleUserModel', {
    extend: 'Ext.data.Model',
    fields: [{name: 'id', type: 'int'},
    		{name: 'code', type: 'string'},
    		{name: 'name', type: 'string'},
    		{name: 'description', type: 'string'},
        	{name: 'type', type: 'string'},
        	{name: 'authorities',type: 'string'}
        	]
    
});