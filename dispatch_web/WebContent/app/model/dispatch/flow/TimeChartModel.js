
Ext.define(projectName +'.model.dispatch.flow.TimeChartModel', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'times', type: 'int'},//第n次
		{name: 'timeHour',type: 'double'},//执行时间
		{name: 'startTime',type: 'string'}//开始执行时间
	]
	
});