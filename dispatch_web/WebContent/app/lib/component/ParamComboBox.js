/**
 * 机构类型box
 */
Ext.define(projectName + '.lib.component.ParamComboBox',{
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.paramComboBox',
	requires: [projectName + '.lib.Constants'],
	displayField: 'name',
	valueField: 'id',
	queryMode:'local',
	editable:false,
	forceSelection: true,
	needInsertQueryAllItem:true,
	initComponent: function() {
		var me = this;
		
		Ext.apply(this,{
			store:Ext.create('Ext.data.Store',{ 
				autoLoad: false,
				fields: [{name: 'id', type: 'string'},{name: 'name', type: 'string'}],
				proxy: {
					type: 'ajax',
					url:basePath + '/almService/paramSettingController/findParamType',
					reader: {
						 type: 'json',root: 'items'
					}
				}
			})
		});
		me.callParent(arguments);
		me.store.load({
        	callback: function(records, operation, success) {
        		if(me.needInsertQueryAllItem) {
        			var data = {
						id : '',
						name : '--请选择--'
					};
					store.insert(0, data);
					me.setValue('');					
				 } else {
					me.setValue(records[0]);
				 }
        	}
        }); 
	}
});