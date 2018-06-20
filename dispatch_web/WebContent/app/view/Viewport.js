/**
 * 首页标题菜单
 * @author			LiHao
 * @date 			2015年10月30日
 * @modify by		LiHao
 * @modify date     2015年10月30日
 * */
Ext.define('DISPATCH.view.Viewport', {
	extend : 'Ext.container.Viewport',
	requires : [ projectName + '.view.facade.Banner',
	             projectName + '.view.facade.TabPanel', 
	             projectName + '.view.facade.Bottom', 
	             projectName + '.view.facade.Navigation',
	             'Ext.example.*', 
	             projectName + '.lib.Constants',
	             projectName + '.lib.ALMConstants',
	             projectName + '.lib.SystemInfo',
	             projectName + '.lib.functions.AjaxUtil', 
	             projectName + '.lib.functions.DynamicGridUtil',
	             projectName + '.lib.functions.DateUtil', 
	             projectName + '.lib.functions.FileLoadUtil',
	             projectName + '.lib.functions.Formater', 
	             projectName + '.lib.component.PageToolBar'
	],
	layout : 'border',
	resizable : true,
	items : [{
		region : 'north',
		xtype : 'banner'
	},{
		region : 'south',
		xtype : 'bottom'
	},{
		region : 'west',
		xtype : 'navigation',
		width : '12%'
	},{
		region : 'center',
		xtype : 'tabPanel',
		width : '87%'
	}]
});