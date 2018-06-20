/**
 * 权限树store
 */
Ext.define(projectName +'.store.commons.sys.authority.AuthorityTreeStore', {
	extend: 'Ext.data.TreeStore',
    model: projectName +'.model.commons.sys.authority.AuthorityModel',
    proxy : {
		type : 'ajax',
		url: basePath + '/commons/auth/showAuthority',
		reader : 'json'
	}
});