Ext.define(projectName +'.store.dispatch.etldispatch.TemplateListStore', {
    extend: 'Ext.data.Store',
    model: projectName+'.model.dispatch.TemplateManageModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: basePath + '/dispatch/template/queryList',
        reader: {
            type: 'json',                              //后台数据解析为json
            root: 'listItems'                   //需要解析的数据
//            totalProperty: 'pageItems.total'           //返回的条数
        }
    }
   
});
