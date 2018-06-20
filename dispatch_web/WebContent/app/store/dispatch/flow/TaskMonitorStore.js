
Ext.define(projectName +'.store.dispatch.flow.TaskMonitorStore', {
    extend: 'Ext.data.Store',
    model: projectName +'.model.dispatch.flow.TaskMonitorModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: basePath + '/dispatch/flow/getTaskMonitorList',
        reader: {
            type: 'json',                              //后台数据解析为json
            root: 'listItems'                   //需要解析的数据
            //totalProperty: 'pageItems.total'           //返回的条数
        }
    }
   
});
