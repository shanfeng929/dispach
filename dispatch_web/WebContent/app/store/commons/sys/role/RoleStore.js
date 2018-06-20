Ext.define(projectName +'.store.commons.sys.role.RoleStore', {
    extend: 'Ext.data.Store',
    model: projectName +'.model.commons.sys.role.RoleModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url:  basePath + '/commons/role/query',
        reader: {
            type: 'json',
            root: 'listItems'/*,
            totalProperty: 'pageItems.total'*/
        }
    }
});
