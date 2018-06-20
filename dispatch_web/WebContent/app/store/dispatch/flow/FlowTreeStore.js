/**
 * 流程树store
 */
Ext.define(projectName +'.store.dispatch.flow.FlowTreeStore', {
	extend: 'Ext.data.TreeStore',
    model: projectName +'.model.dispatch.flow.FlowTreeModel',
    autoLoad : false,
    proxy : {
		type : 'ajax',
		url: basePath + '/dispatch/flowGroup/showFlowTree',
		reader : 'json'
	}
});