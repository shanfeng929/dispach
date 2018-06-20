/*
 *字典维护 
 */
Ext.define(projectName +'.view.commons.param.dictList.DictListView',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.dictList',
	requires : [projectName +'.lib.component.AlmTreePanel'],
	layout: {
        type: 'hbox',
        align: 'stretch'
    },
	autoScroll : true,
	initComponent : function() {
	var me = this;
	var store=Ext.create(projectName +'.store.commons.param.dictList.DictTreeStore');
					this.items = [{
					xtype:'almTreePanel',
					id:'dictTree',
					rootVisible : false,
					name:'dictTree',
					store:store,
					width: '25%',
					contextMenus : [{
							text : '修改',
							handlerFunction : function(rec, item) {
    							
    						}
							
						}, {
							text : '新建',
							handlerFunction : function(rec, item) {
    							
    							
							}
						}, {
							text:'删除',
							handlerFunction:function(rec,item){
							}
						}]
			},  {
					xtype : 'dictForm',
					region : 'center',
					width : '75%'
				}]
		this.callParent(arguments);
		}
});