/**
 *插件所需Store
 */
Ext.define(projectName +'.lib.functions.ComBoxStoreUtil', {
	
	singleton: true,
	
	/**
	 * 机构树下拉插件的Store
	 * 注：v的值为：id,code . 默认为code 
	 * 
	 */
	getOrganTreeStore : function(v){
		if(v==null || v=='') {
			v ='code'
		}
		
		var store = Ext.create('Ext.data.TreeStore', { 
	    	fields: ['text','id','parentId'],
	    	root: {
	            text: '所有机构',
	            id: -1,
	            code : -1 ,
	            expanded: true
	        },
	        proxy: { 
	            type: 'ajax', 
	            url: basePath + '/commons/organ/getOrganTreeComBox'
	        },
	    	listeners : {
	    		beforeload : {
	    			fn : function(store, operation, opts) {
	    				operation.params.type = v;
	    			}
	    		}
	    	}
	    });
		return store;
	} 
	
	
});