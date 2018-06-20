/**
 * 菜单设置
 */
Ext.define(projectName + '.view.dispatch.flow.FlowTreeView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.flowTree',
    requires: [projectName + '.lib.component.FlowTreePanel'],
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    autoScroll: true,
    initComponent: function () {
        var me = this;
     //   var store = Ext.create(projectName + '.store.dispatch.flow.FlowTreeStore');
        this.items = [{
            xtype: 'flowTreePanel',
            id: 'flowListTree',
            rootVisible: false,
            name: 'flowListTree',
     //       store: store,
            disableSelection: false,
            listeners:{
            	itemclick: function(v,r,item){
            		Ext.Msg.alert("info",JSON.stringify(r.data));
            	}
			}
        }]
        this.callParent(arguments);
    }
});