
Ext.define(projectName +'.store.dispatch.flow.FlowGroupComboStore', {
    extend: 'Ext.data.Store',
    model: projectName +'.model.dispatch.flow.FlowGroupModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: basePath + '/dispatch/flowGroup/queryList',
        reader: {
            type: 'json',                              //后台数据解析为json
            root: 'listItems'/*,                   //需要解析的数据
            totalProperty: 'pageItems.total'*/           //返回的条数
        }
    }
   
});
