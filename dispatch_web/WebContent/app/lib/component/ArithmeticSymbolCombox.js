/**
 * 运算符号Combo
 * */
Ext.define(projectName + '.lib.component.ArithmeticSymbolCombox',{
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.symbolCombox',
	requiers: [
	projectName + '.lib.Constants'
	],
	labelWidth: 100,
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
				data:[['>','大于'],['<','小于'],['=','等于'],['<=','小于等于'],['>=','大于等于']]
			}),
		});
		me.callParent(arguments);
	}
});