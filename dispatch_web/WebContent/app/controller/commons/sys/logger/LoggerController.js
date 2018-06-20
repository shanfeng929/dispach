Ext.define(projectName + '.controller.commons.sys.logger.LoggerController', {
    extend: 'Ext.app.Controller',
    views: ['commons.sys.logger.LoggerListView', 'commons.sys.logger.LoggerGridView'],
    refs: [{
        ref: 'loggerList',
        selector: 'loggerList'
    }, {
        ref: 'loggerGrid',
        selector: 'loggerGrid'
    }],
    init: function () {
    	 this.control({
    	 	'loggerList': {
    	 		boxready: this.init_logList
    	 	},
    	 	'loggerList button[action=search]': {
    	 		click: this.onSearch
    	 	}
    	 });
    },
    init_logList: function () {
    	var list=this.getLoggerList();
    	new Ext.util.DelayedTask(function(){
    		list.getChildByElement('btn_search_logList',true).fireEvent('click');
    	}).delay(1 * 1000);
    },
    onSearch:function(){
        function dateformate(value){
        	if(null!=value){
        		return Ext.Date.format(new Date(value),'Y-m-d');
        	}else{
        		return null;
        	}
        };
    	var list=this.getLoggerList();
    	var grid=this.getLoggerGrid();
    	var operator=encodeURI(list.getChildByElement('field_operator_logList',true).getValue());
    	var level=list.getChildByElement('field_level_logList',true).getValue();
    	var date=dateformate(list.getChildByElement('field_date_logList',true).getValue());
    	Ext.apply(grid.store.proxy.extraParams,{
    		'operator': operator,
    		'level': level,
    		'date': date,
    		page: DISPATCH.lib.Constants.FIRST_PAGE,
    		limit: DISPATCH.lib.Constants.PAGE_SIZE
    		});
    	grid.store.load();
    }
});