Ext.define(projectName +'.store.commons.sys.menu.MenuListStore', {
	extend : 'Ext.data.TreeStore',
	model : projectName +'.model.commons.sys.menu.MenuListModel',
	proxy : {
		type : 'ajax',
		url : basePath + '/common/menu/selectChildMenuLists',
		reader : 'json',
		root : 'root'
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

