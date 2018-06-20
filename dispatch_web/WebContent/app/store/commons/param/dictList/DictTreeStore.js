/*
 * 字典维护
 */
 Ext.define(projectName +'.store.commons.param.dictList.DictTreeStore', {
 	extend: 'Ext.data.TreeStore',
 	    model: projectName +'.model.commons.param.dictList.DictTreeModel',
 	proxy: {
        type: 'ajax',
        url:basePath + '/commons/organ/getOrganTreeData',
        reader: 'json'
    }
 });