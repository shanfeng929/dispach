Ext.define(projectName + '.lib.component.TimeNodeComboBox',{
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.timeNodeCombox',
	requiers: [
	projectName + '.lib.Constants'
	],
	labelWidth: 80,
	fieldLabel: '',
	displayField: 'text',
	valueField: 'value',
	editable: false,
	queryModel: 'local',
	value : '1',
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			store: Ext.create('Ext.data.SimpleStore', {
				fields: ['value','text'],
				data:[['1','未来一个月'],['2','未来一个季度'],['3','未来一年'],['4','自定义时间']]
			})
		});
		me.callParent(arguments);
	}
});