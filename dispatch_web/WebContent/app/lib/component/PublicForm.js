/**
 * 公用统一form格式:
 *      1.默认布局为table两列
 *      2.默认为文本框
 */
Ext.define(projectName + '.lib.component.PublicForm', {
	extend : 'Ext.form.Panel',
	alias : 'widget.publicForm',
	layout : {
		type : 'table',
		columns : 2
	},
	fieldDefaults : {
		xtype : 'textfield',
		labelWidth : 70,
		width : 220,
		margin : 5
	}
});