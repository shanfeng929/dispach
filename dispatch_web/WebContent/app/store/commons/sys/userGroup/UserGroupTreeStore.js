/**
 * 用户组的树store
 */
Ext.define(projectName +'.store.commons.sys.userGroup.UserGroupTreeStore',{
	extend:'Ext.data.TreeStore',
	model:projectName +'.model.commons.sys.userGroup.UserGroupModel',
	proxy:{
        type: 'ajax',
	    reader: 'json',
	    url: basePath+'/commons/userGroup/getUserGroupTreeData'
	}
});