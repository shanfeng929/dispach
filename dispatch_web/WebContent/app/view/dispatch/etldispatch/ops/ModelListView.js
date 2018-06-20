Ext.define(projectName + '.view.dispatch.etldispatch.ops.ModelListView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.modelList',
	initComponent : function(){
		var me = this;
		Ext.apply(me,{
			items : [{
				xtype : 'modelSearch',
				id : 'modelSearch'
			},{
				xtype : 'modelGrid',
				id : 'modelGrid'
			}]
		});
		me.callParent(arguments);
	}
});