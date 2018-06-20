
Ext.define(projectName +'.store.dispatch.flow.TimeChartStore', {
    extend: 'Ext.data.Store',
    model: projectName +'.model.dispatch.flow.TimeChartModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: basePath + '/dispatch/flow/timeChartData',
        reader: {
            type: 'json',                              //后台数据解析为json
            root: 'listItems',                   //需要解析的数据
        }
    }
   
});

