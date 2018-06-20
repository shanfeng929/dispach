
Ext.define(projectName +'.store.commons.sys.user.UserStore', {
    extend: 'Ext.data.Store',
    model: projectName +'.model.commons.sys.user.UserModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: basePath + '/commons/user/query',
        reader: {
            type: 'json',                              //后台数据解析为json
            root: 'pageItems.items',                   //需要解析的数据
            totalProperty: 'pageItems.total'           //返回的条数
        }
    }
   
});
