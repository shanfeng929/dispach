Ext.define(projectName +'.store.commons.sys.roles.RoleStores', {
    extend: 'Ext.data.Store',
    model: projectName +'.model.commons.sys.role.RoleModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
//        api :{
//        	read :basePath + '/commons/r/getRoleList'
//        },
        url: basePath + '/commons/r/getRoleList',
        reader: {
            type: 'json',
            root: 'pageItems.items',
            totalProperty: 'pageItems.total'
        }
    }
   
});	