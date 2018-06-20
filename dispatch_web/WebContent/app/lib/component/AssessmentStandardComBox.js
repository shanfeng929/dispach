/**
 * 考核标准
 */
Ext.define(projectName + '.lib.component.AssessmentStandardComBox',{
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.assessmentStandardComBox',
	labelWidth:80,
	fieldLabel: '考核标准',
	displayField: 'text',
	valueField: 'value',
	editable:false,
	queryMode: 'local', 
	width:200,
	initComponent: function() {
		var me = this;
		Ext.apply(this,{
			store: Ext.create('Ext.data.SimpleStore',{
				fields:['value','text'],
				data:[['1','误报次数'],['2','准确率'],['3','准确率次数']]
			})
		});
		me.callParent(arguments);
	}
});