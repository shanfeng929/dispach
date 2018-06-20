/**
 * 权限组的树store
 */
Ext.define(projectName +'.store.commons.sys.authorityGroup.AuthorityGroupTreeStore',{
	extend:'Ext.data.TreeStore',
	model:projectName +'.model.commons.sys.authorityGroup.AuthorityGroupTreeModel',
	proxy:{
        type: 'ajax',
	    reader: 'json',
	    url: basePath+'/commons/authorityGroup/getAuthorityGroupTreeData'
	}
});