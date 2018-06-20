/*
 * 字典维护
 */
Ext.define(projectName +'.model.commons.param.dictList.DictTreeModel', {
	extend : 'Ext.data.Model',
	fields : [{
				name : 'id',
				type : 'int'
			}, {
				name : 'parentid',
				type : 'int'
			}, {
				name : 'name',
				type : 'string'
			}, {
				name : 'cat',
				type : 'string'
			}, {
				name : 'key',
				type : 'string'
			}, {
				name : 'value',
				type : 'string'
			}, {
				name : 'text',
				type : 'string'
			}, {
				name : 'disorder',
				type : 'int'
			}, {
				name : 'datastatus',
				type : 'int'
			}]
});