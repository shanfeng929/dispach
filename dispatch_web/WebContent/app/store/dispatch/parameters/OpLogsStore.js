
Ext.define(projectName +'.store.dispatch.parameters.OpLogsStore', {
    extend: 'Ext.data.Store',
    model: projectName +'.model.dispatch.parameters.OpLogsModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: basePath + '/oplogs/query',
        reader: {
            type: 'json',                              //后台数据解析为json
            root: 'pageItems.items',                   //需要解析的数据
            totalProperty: 'pageItems.total'           //返回的条数
        }
    }
   
});
