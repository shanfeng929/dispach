Ext.define(projectName + '.lib.component.CurrencyTermCombobox',{
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.currencyTermCombox',
	requiers: [
	projectName + '.lib.Constants'
	],
	labelWidth: 80,
	fieldLabel: '',
	displayField: 'text',
	valueField: 'value',
	editable: false,
	queryModel: 'local',
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			store: Ext.create('Ext.data.SimpleStore', {
				fields: ['value','text'],
				data:[['1','本币'],['2','外币']]
			})
		});
		me.callParent(arguments);
	}
});