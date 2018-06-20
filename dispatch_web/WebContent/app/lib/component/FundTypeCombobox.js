Ext.define(projectName + '.lib.component.FundTypeCombobox',{
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.fundTypeCombo',
	requiers: [
	projectName + '.lib.Constants'
	],
	displayField: 'text',
	valueField: 'value',
	editable: false,
	queryModel: 'local',
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			store: Ext.create('Ext.data.SimpleStore', {
				fields: ['value','text'],
				data:[['1','收'],['2','付']]
			})
		});
		me.callParent(arguments);
	}
});