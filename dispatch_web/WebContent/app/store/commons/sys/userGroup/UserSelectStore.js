/**
 * 查询所有用户store
 */
Ext.define(projectName +'.store.commons.sys.userGroup.UserSelectStore',{
	extend:'Ext.data.Store',
	model:projectName +'.model.commons.sys.user.UserModel',
	proxy:{
        type: 'ajax',
	    url: basePath+'/commons/userGroup/queryAllUsers',
	    reader: {
            type: 'json',
            root: 'listItems'
        }
	    
	}
});