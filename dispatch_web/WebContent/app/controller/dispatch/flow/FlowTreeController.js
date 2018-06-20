/**
 * 流程树 控制
 */
Ext.define(projectName + '.controller.dispatch.flow.FlowTreeController',{
		// 继承ext控制器
		extend : 'Ext.app.Controller',
		// 引用视图
		views : [
		         projectName + '.view.dispatch.flow.FlowTreeView',
		         projectName + '.lib.component.FlowTreePanel'
		],
		refs : [{
			ref : 'flowTree',
			selector : 'flowTree'
		},{
			ref : 'flowTreePanel',
			selector : 'flowTreePanel'
		}
		],
		init : function() {
			this.control({
				'flowTree':{boxready: this.init_flowTree},
				'flowTreePanel button[action=search]': {click: this.search_flowTree_btn}
			});
		},
		init_flowTree : function(){
			var panel = this.getFlowTreePanel();
			panel.getChildByElement('btn_ftp_search', true).fireEvent('click');
		},
		search_flowTree_btn : function(){
			var panel=this.getFlowTreePanel();
	    	var name = encodeURI(panel.getChildByElement('tf_ftp_name', true).getValue());
	    	Ext.apply(panel.store.proxy.extraParams,{
	    		'name':name
			});
	    	panel.getStore().load();
		}
});
				

		
		