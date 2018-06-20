/**
 * 时间趋势折线图
 */
Ext.define(projectName + '.view.dispatch.flow.TimeChartView', {
	extend : 'Ext.chart.Chart',
	alias : 'widget.timeChart',
	animate: true,
	shadow: true,
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['timeHour'],
                title: '执行时间(小时)',
                minimum: 0
//                maximum: 120,
//                steps:24
               
            }, {
                type: 'Numeric',
                position: 'bottom',
                fields: ['times'],
                title: '最近n次',
                minimum: 0,
                maximum: 10
            }],
            series: [{
                type: 'line',
                highlight: {
                    size: 5,
                    radius: 5
                },
                axis: 'left',
                xField: 'times',
                yField: 'timeHour',
                tips: {
              	  trackMouse: false,
              	  width: 180,
              	  height: 40,
              	  renderer: function(storeItem, item) {
              	    this.setTitle('执行时间：'+storeItem.get('timeHour')+'小时<br />开始时间：'+storeItem.get('startTime'));
              	  }
              }
            }]
		});
		me.callParent(arguments);
	}
});
