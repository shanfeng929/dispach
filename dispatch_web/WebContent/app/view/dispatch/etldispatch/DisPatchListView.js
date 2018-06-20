/**
 * user main panel
 */
 
 Ext.define(projectName + '.view.dispatch.etldispatch.DisPatchListView', {
	extend : 'Ext.panel.Panel',
	// 别名
	alias : 'widget.dispatchlistview',
	requires: [projectName + '.lib.component.FlowTreePanel'],
	layout : 'border', 
	listeners: { 
		beforeclose: function() {
			var tempId=parent.deletetemp();
			if(tempId!=null){
				Ext.Ajax.request({
					url : basePath + '/DisPatch/EtlFlow/deletetempid',
					params : {
						'tempId' : tempId
					},
					success : function(result) {
					
					}
				});
			}
		}
	},
	initComponent : function() {
		var me = this;
		var treestore = Ext.create(projectName + '.store.dispatch.flow.FlowTreeStore');
		Ext.applyIf(me, {
			items : [{
				 // 变量视图引用
				xtype : 'flowTreePanel',
//				checkModel : 'cascade',
//				animate:true,
				width:'20%',
				//rootVisible : false,
			//	forceFit: true,
				region:'west',
				//collapsible:true,
				//isHidden:true,
				store : treestore,
				//autoScroll: true,
				//containerScroll: true,
				rootVisible: false,
//				disableSelection: false,
				id : projectName + '.lib.component.FlowTreePanel', 
				listeners:{
			     	/*itemclick: function(v,r,item){
			     		
			     	},*/
			     	itemdblclick : function(view,item){
			     		if(!item.data.leaf){
			     			return;
			     		}
			     		//alert('显示对应流程'+item.data);
			     		if(item.data.id.indexOf('flow')<0){
			     			return;
			     		}
			     		parent.showXML(item.data.id);
			     	},
			     	expand : function(p,e){
			     		alert("aaa");
			     	}
				}
			},             
		    {
				region:'center',
				html : '<div style="width:100%; height:550px; margin:0;padding0;overflow-y:visible;overflow-x:visible"><iframe  name="iframe_draw"  frameBorder="0" scrolling="no" class="external" style="width:100%; height:100%; margin:0;padding0;" src="draw.jsp"></iframe></div>'
		    }]
		});
		// store加载
		treestore.load({params:{parentId:'0',name:''}});
		me.callParent(arguments);
	}
});