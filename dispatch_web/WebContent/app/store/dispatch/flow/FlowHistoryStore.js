
Ext.define(projectName +'.store.dispatch.flow.FlowHistoryStore', {
    extend: 'Ext.data.Store',
    model: projectName +'.model.dispatch.flow.FlowHistoryModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: basePath + '/dispatch/flow/queryHistory',
        reader: {
            type: 'json',                              //后台数据解析为json
            root: 'pageItems.items',                   //需要解析的数据
            totalProperty: 'pageItems.total'           //返回的条数
        }
    }
   
});
