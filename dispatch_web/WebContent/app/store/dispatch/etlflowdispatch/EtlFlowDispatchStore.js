Ext.define(projectName+'.store.dispatch.etlflowdispatch.EtlFlowDispatchStore', {
    extend: 'Ext.data.Store',
    model: projectName+'.model.dispatch.etlflowdispatch.EtlFlowDispatchModel',
    alias: 'widget.EtlFlowDispatchStore',
    autoLoad: false,
    pageSize:15,
    proxy: {
        type: 'ajax',
        url: basePath + '/DisPatch/EtlFlow/selectflowgroup',
        reader: {
            type: 'json',
            root:'root',
            totalProperty:'totalProperty'
        },
        extraParams:{
        	
        			}
    },
    init : function() {
  
	}
   
});