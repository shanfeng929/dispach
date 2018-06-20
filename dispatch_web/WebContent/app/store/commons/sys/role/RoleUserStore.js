Ext.define(projectName +'.store.commons.sys.role.RoleUserStore', {
    extend: 'Ext.data.Store',
    model: projectName +'.model.commons.sys.role.RoleUserModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url:  basePath + '/commons/roleUser/query',
        reader: {
            type: 'json',
            root: 'listItems'
        }
    }
});
