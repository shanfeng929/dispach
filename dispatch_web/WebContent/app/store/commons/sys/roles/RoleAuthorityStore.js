
Ext.define(projectName +'.store.commons.sys.roles.RoleAuthorityStore', {
    extend: 'Ext.data.Store',
    model: projectName +'.model.commons.sys.role.AuthModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: basePath + '/commons/r/selectAllAuth',
        reader: {
            type: 'json',
            root: 'listItems'
        }
    }
   
});