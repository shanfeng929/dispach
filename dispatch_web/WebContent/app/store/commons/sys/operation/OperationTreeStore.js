/**
 * 功能树store
 */
Ext.define(projectName +'.store.commons.sys.operation.OperationTreeStore', {
	extend: 'Ext.data.TreeStore',
    model: projectName +'.model.commons.sys.operation.OperationTreeModel',
    proxy : {
		type : 'ajax',
		url: basePath + '/commons/operation/operationTree',
		reader : 'json'
	}
});