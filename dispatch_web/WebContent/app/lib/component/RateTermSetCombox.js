//categoryCombx
Ext.define(projectName + '.lib.component.RateTermSetCombox',{
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.rateTermSetCombox',
//	width:140,
	displayField: 'NAME',
	valueField: 'ID',
	editable:false,
	queryMode: 'local', 
	initComponent: function() {
		var me = this;
		Ext.apply(this,{
			store:Ext.create('Ext.data.Store',{
				autoLoad: true,
				fields: [{name: 'ID', type: 'string'},{name: 'NAME', type: 'string'}],
				proxy: {
					type: 'ajax',
					url: basePath + '/commons/curveController/termList',
					reader: {
						type: 'json',
						root: 'mapItems.data'
					}
				}
			})
		});
	   me.callParent(arguments);
	}
});

