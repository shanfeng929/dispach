/**
 * 首页容器
 * @author			LiHao
 * @date 			2015年10月30日
 * @modify by		LiHao
 * @modify date     2015年10月30日
 * */
Ext.define('DISPATCH.view.facade.TabPanel', {
	extend : 'Ext.tab.Panel',
	//渲染延迟 保证菜单TAB右键正常
	autoDestroy : true,
	deferredRender:false,
	alias : 'widget.tabPanel',
	requires : [ 'Ext.tab.*', 'Ext.ux.TabCloseMenu',
	             'DISPATCH.view.facade.Home'
	],
	initComponent : function() {
		Ext.apply(this, {
			defaults : {
				autoScroll : true,
				bodyPadding : 1
			},
			activeTab : 0,
			border : false,
			items : [ {
				xtype : 'home',
				autoScroll : false,
				closable : false
			} ],
			plugins : Ext.create('Ext.ux.TabCloseMenu', {
				onClose : function(){
					this.tabPanel.remove(currentItem);
				},
				doClose : function(excludeActive){
					var items = [];
					this.tabPanel.items.each(function(item){
						if(item.closable){
							if(!excludeActive || item != currentItem){
								items.push(item);
							}
						}
					}, this);
					Ext.each(items, function(item){
						this.tabPanel.remove(item);
					}, this);
				},
				extraItemsTail : [ '-', {
					text : 'Closable',
					checked : true,
					hideOnClick : true,
					handler : function(item) {
						currentItem.tab.setClosable(item.checked);
					}
				}, '-', {
					text : 'Enabled',
					checked : true,
					hideOnClick : true,
					handler : function(item) {
						currentItem.tab.setDisabled(!item.checked);
					}
				} ],
				listeners : {
					beforemenu : function(menu, item) {
						var enabled = menu.child('[text="Enabled"]');
						menu.child('[text="Closable"]').setChecked(
								item.closable);
						if (item.tab.active) {
							enabled.disable();
						} else {
							enabled.enable();
							enabled.setChecked(!item.tab.isDisabled());
						}
						currentItem = item;
					}
				}
			})
		});
		this.callParent(arguments);
	}
});
