//首页,目前为空
Ext.define('DISPATCH.view.facade.Home', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.home',
	requires: [
	           projectName + '.lib.component.PageToolBar'],
	title : '首页',
	layout: {
        type: 'vbox',       // Arrange child items vertically
        align: 'stretch',    // Each takes up full width
        padding: 0
    },
	initComponent : function() {
		var message;
		var me = this;
	
		
		
		
		
		var workDate=createWorkDate(1,'-','Ymd');
		//var	workDate = '20151020';
		
		/*var pieStore = Ext.create('Ext.data.JsonStore', {
		    fields: ['name', 'data'],
		    data: [
		        { 'name': 'metric one',   'data': 10 },
		        { 'name': 'metric two',   'data':  7 },
		        { 'name': 'metric three', 'data':  5 },
		        { 'name': 'metric four',  'data':  27 }
		    ]
		});*/
		
		
		Ext.applyIf(me, {
			items : [  ]
		});
	
		

		this.callParent(arguments);
	}
});