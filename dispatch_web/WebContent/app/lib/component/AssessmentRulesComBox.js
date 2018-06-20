/**
 * 考核规则的下拉查询
 */
Ext.define(projectName + '.lib.component.AssessmentRulesComBox',{
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.assessmentRulesComBox',
	displayField: 'name',
	valueField: 'id',
	editable:false,
	queryMode: 'local', 
	needInsertQueryAllItem : false ,
	needInsertDefaultItem : false ,
	initComponent: function() {
		var me = this;
		Ext.apply(this,{
			store:Ext.create('Ext.data.Store',{
				autoLoad: true,
				fields: [{name: 'id', type: 'string'},{name: 'name', type: 'string'}],
				proxy: {
					type: 'ajax',
					url: basePath + '/ldms/controller/assessment/selectAssessmentRulesByForm',
					reader: {
						type: 'json',
						root: 'pageItems.items',
			            totalProperty: 'pageItems.total'
					}
				},
				listeners : {
					load : function(store, records, options) {
						if (me.needInsertQueryAllItem) {
							store.insert(DISPATCH.lib.Constants.queryALL_I, DISPATCH.lib.Constants.getQueryAllItem());
							me.setValue(DISPATCH.lib.Constants.queryALL);
						} else if (me.needInsertDefaultItem)
							me.setValue(records[0]);
					}
				}
			})
		});
		Ext.apply(me.store.proxy.extraParams, {
			'page' : 1 ,
			'limit': 25
		});
		me.callParent(arguments);
	},
	setValueAfterLoad : function(value) {
		var me = this;
		me.getStore().load({
			callback : function(records) {
				me.setValue(value);
			}
		});
	}
});