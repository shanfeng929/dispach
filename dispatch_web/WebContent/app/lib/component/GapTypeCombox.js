Ext.define(projectName + '.lib.component.GapTypeCombox',{
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.GapTypeCombox',
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
				data:[['0','流动性缺口'],['1','重定价缺口'],['2','其他缺口']]
			})
		});
		me.callParent(arguments);
	}
});