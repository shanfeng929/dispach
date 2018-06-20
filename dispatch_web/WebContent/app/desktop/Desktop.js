/**
 * 
 * 
 * */
Ext.define(projectName + '.desktop.Desktop',{
	extend: 'Ext.app.Application',
	appFolder: 'app',
	name : projectName,
	autoCreateViewport : true,
	requires : [ projectName + '.lib.component.PageToolBar' ],
	controllers : ['AppLaunchCtrl'],

	findTab : function(tabPanel, record) {
		var ret, activeTab = tabPanel.getActiveTab();
		if (activeTab && activeTab.code === record.data.code) {
			return activeTab;
		}
		tabPanel.items.each(function(t, idx) {
			if (t && t.code === record.data.code) {
				ret = t;
				return false;
			}
		});
		return ret;
	},

	activateTab : function(tabPanel, targetTab) {
		if (targetTab) {
			tabPanel.setActiveTab(targetTab);
			return true;
		}
		return false;
	},

	/**
	 * 
	 * @param tabPanel
	 *            tabPanel容器
	 * @param controllerName
	 *            控制器名称，例如：ALM.controller.ftpPrice.PriceManageController
	 * @param widgetViewName
	 *            视图的别名，例如：ALM.view.ftpPrice.PriceManageView中的ftpPriceManageView
	 * @param record
	 *            当前menu按钮（包含了按钮的字段信息）
	 * @param cfg
	 *            菜单编码，每新开一级序列重新开始，根据节点菜单唯一编码确认
	 */
	widget : function(tabPanel, controllerName, widgetViewName, record, cfg) {
//		debugger;
		var findRes = this.findTab(tabPanel, record);
//		debugger;
		if (findRes) {
			this.activateTab(tabPanel, findRes);
		} else {
			this.getController(controllerName);
//			debugger;
			var tab = Ext.widget(widgetViewName, {
				record : record,
				code : cfg,								//设置菜单唯一编码到当前活动的activeTab中
				closable : true
			});
			if (cfg) {
				Ext.apply(tab, cfg);
			}
			tab.setTitle(record.data.text);
			tabPanel.setActiveTab(tabPanel.add(tab));
		}
	},
	initComponent : function(){
	}
});