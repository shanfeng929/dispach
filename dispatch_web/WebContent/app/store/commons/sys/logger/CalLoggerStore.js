Ext.define(projectName +'.store.commons.sys.logger.CalLoggerStore', {
    extend: 'Ext.data.Store',
    model: projectName +'.model.commons.sys.logger.CalLoggerModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: basePath + '/commons/calLogger/selectLoggerByForm',
        reader: {
            type: 'json',
            root: 'pageItems.items',
            totalProperty: 'pageItems.total'
        }
    }
});