Ext.define(projectName + '.view.dispatch.etldispatch.ops.ModelTreeMenu',{
	extend : 'Ext.tree.Panel',
	alias : 'widget.modelTree',
	initComponent:function(){
		var me = this;
		var store = me.store;
		Ext.apply(me,{
//			collapsible:true,
//			width:200,
			rootVisible:false//,
			//store:store
		});
		me.callParent(arguments);
	}
});