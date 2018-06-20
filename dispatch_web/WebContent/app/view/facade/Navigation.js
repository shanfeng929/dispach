/**
 * 左侧树 
 */
Ext.define('DISPATCH.view.facade.Navigation',{
	extend : 'Ext.panel.Panel',
	alias: 'widget.navigation',
	cls : 'r-main',
	collapsible : true,
	layoutConfig : {
		animate : true
	},
	initComponent:function(){
    	this.callParent();
    }
});