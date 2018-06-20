/**
 * 首页页脚
 * @author			LiHao
 * @date 			2015年10月30日
 * @modify by		LiHao
 * @modify date     2015年10月30日
 * */
Ext.define('DISPATCH.view.facade.Bottom', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bottom',
	initComponent : function() {
		Ext.apply(this, {
			dockedItems : [ {
				xtype : 'toolbar',
				dock : 'bottom',
				items : [{
					xtype : 'label',
					html : '&copy;2015 Sunyard. All rights reserved'
				}, '->',  {
					xtype : 'label',
					text : '服务器时间：'
				}, {
					xtype : 'label',
					height : 13,
					id:'clock',
					listeners:{
						'render':function(){
							Ext.TaskManager.start({
								run:function(){
									Ext.getCmp('clock').setText(Ext.Date.format(new Date(),'Y-m-d H:i:s'));
								},
								interval:1000
							})
						}
					}
				} ]
			} ]
		});
		this.callParent(arguments);
	}
});