Ext.define(projectName + '.lib.component.YesOrNoCombobox',{
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.yesOrNoCombox',
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
				data:[['0','否'],['1','是']]
			})
		});
		me.callParent(arguments);
	}
});