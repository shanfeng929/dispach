/**
 * 查询所有权限
 * store
 */
Ext.define(projectName +'.store.commons.sys.authorityGroup.AuthorityGroupSelectStore',{
	extend:'Ext.data.Store',
	model:projectName +'.model.commons.sys.authority.AuthorityModel',
	proxy:{
        type: 'ajax',
	    url: basePath+'/commons/authorityGroup/queryAllAuthority',
	    reader: {
            type: 'json',
            root: 'listItems'
        }
	    
	}
});