/**
 * 菜单树store
 */
Ext.define(projectName +'.store.commons.sys.menu.MenuTreeStore', {
	extend: 'Ext.data.TreeStore',
    model: projectName +'.model.commons.sys.menu.MenuListModel',
    proxy : {
		type : 'ajax',
		url: basePath + '/commons/auth/showMenu',
		reader : 'json'
	},
	listeners : {
		beforeload : {
			fn : function(store, operation, opts) {
				var me=this;
				if(isNaN(operation.id)&& operation.node.data.root){
					operation.params.pid=0;
				}else{
					operation.params.pid=operation.node.raw.id;
				}
				return true;
			}
		}
	}
});