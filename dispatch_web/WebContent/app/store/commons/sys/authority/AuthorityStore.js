/**
 * 权限store
 */
Ext.define(projectName +'.store.commons.sys.authority.AuthorityStore', {
    extend: 'Ext.data.Store',
    model: projectName +'.model.commons.sys.user.UserModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: basePath + '/commons/controller/sys/userController/getAuthorityTreeData',
        reader: {
            type: 'json',
            root: 'pageItems.items',
            totalProperty: 'pageItems.total'
        }
    }
   
});
