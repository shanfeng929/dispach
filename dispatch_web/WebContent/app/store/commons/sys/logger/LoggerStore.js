Ext.define(projectName +'.store.commons.sys.logger.LoggerStore', {
    extend: 'Ext.data.Store',
    model: projectName +'.model.commons.sys.logger.LoggerModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: basePath + '/commons/sysLogger/selectLoggerByForm',
        reader: {
            type: 'json',
            root: 'pageItems.items',
            totalProperty: 'pageItems.total'
        }
    }
});