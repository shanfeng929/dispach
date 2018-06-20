Ext.define(projectName+'.store.dispatch.etldispatch.MethodStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'widget.MethodStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: basePath + '/DisPatch/getMethod',
        reader: {
            type: 'json',
            totalProperty:'totalProperty'
        },
        extraParams:{
        			}
    },
    init : function() {
	}
   
});