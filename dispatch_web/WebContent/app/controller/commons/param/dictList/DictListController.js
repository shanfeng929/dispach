/*
 * 字典维护
 */
Ext.define(projectName + '.controller.commons.param.dictList.DictListController', {
	extend : 'Ext.app.Controller',
	views : ['commons.param.dictList.DictListView',
			'commons.param.dictList.DictListFormView'],
	refs : [{
			ref : 'dictList',
			selector : 'dictList'
		}, {
			ref : 'dictForm',
			selector : 'dictForm'
		}]
})
