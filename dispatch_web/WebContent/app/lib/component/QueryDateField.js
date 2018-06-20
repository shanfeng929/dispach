/*
	日期查询通用
*/
Ext.define(projectName + '.lib.component.QueryDateField',{
	extend: 'Ext.form.field.Date',
	alias: 'widget.queryDatefield',
	fieldLabel: '日期',
	labelWidth: 50,
	editable: false,
	value: new Date(),
	format: 'Y-m-d'
});