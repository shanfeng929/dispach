Ext.define(projectName +'.store.commons.sys.organ.OrganTreeStore', {
	extend: 'Ext.data.TreeStore',
    model: projectName +'.model.commons.sys.organ.OrganTreeModel',
    proxy: {
        type: 'ajax',
        url:basePath + '/commons/organ/getOrganTreeData',
        reader: 'json'
   }
//   ,
//   autoLoad:true
});