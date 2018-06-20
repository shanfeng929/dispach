/**
 * 流程时间趋势面板
 */
Ext.define(projectName + '.view.dispatch.flow.TimeChartPanelView', {
	extend : 'Ext.window.Window',
	alias : 'widget.timeChartPanel',
	title : '流程执行时间趋势',
	width: 600,
	height : 400,
	layout: 'fit',
	initComponent : function() {
		var me = this;
		var store = Ext.create(projectName + '.store.dispatch.flow.TimeChartStore');
		Ext.applyIf(me, {
			items: [{
				xtype:'timeChart',
				store : store
			}],
		});
		me.callParent(arguments);
	}
});
