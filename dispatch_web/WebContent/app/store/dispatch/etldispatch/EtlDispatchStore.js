Ext.define(projectName+'.store.dispatch.etldispatch.EtlDispatchStore', {
    extend: 'Ext.data.Store',
    model: projectName+'.model.dispatch.EtlDispatchModel',
    alias: 'widget.EtlDispatchStore',
    autoLoad: true,
    pageSize:15,
    proxy: {
        type: 'ajax',
        url: basePath + '/DisPatch/selectremote',
        reader: {
            type: 'json',
            root:'root',
            totalProperty:'totalProperty'
        },
        extraParams:{
        		reMote:''
        			}
    },
    init : function() {
	}
   
});