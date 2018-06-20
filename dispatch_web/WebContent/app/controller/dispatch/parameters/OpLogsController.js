/**
 * 远程服务配置 控制
 */
Ext.define(projectName+ '.controller.dispatch.parameters.OpLogsController',{
	// 继承ext控制器
	extend : 'Ext.app.Controller',
	// 引用视图
	views : [projectName + '.view.dispatch.parameters.OpLogsListView',
	         projectName + '.view.dispatch.parameters.OpLogsGridView'
	],
	refs : [{
				ref : 'opLogsList',
				selector : 'opLogsList'
			}, {
				ref : 'opLogsGrid',
				selector : 'opLogsGrid'
	}],
	init : function() {
		this.control({
					'opLogsList' : {
						boxready : this.init_opLogsList
					},
					'opLogsList button[action=search]' : {
						click : this.search_oplogs_btn
					},
					'opLogsList button[action=export]' : {
						click : this.export_oplogs_btn
					}
				});
	},
	init_opLogsList : function() {
		var view = this.getOpLogsList();
		Ext.getCmp("tf_log_level").setValue('');
		view.getChildByElement('btn_oplogs_search', true).fireEvent('click');
	},
	search_oplogs_btn : function() {
		var viewList = this.getOpLogsList();
		var view = this.getOpLogsGrid();
		var name = encodeURI(viewList.getChildByElement('tf_create_by',true).getValue());
		var level = encodeURI(viewList.getChildByElement('tf_log_level',true).getValue());
		var dateStart = Ext.util.Format.date(Ext.getCmp("tf_date_start").getValue(), 'Y-m-d');
		var dateEnd = Ext.util.Format.date(Ext.getCmp("tf_date_end").getValue(), 'Y-m-d');
		Ext.apply(view.store.proxy.extraParams, {
					'createBy' : name,
					'level': level,
					'dateStart': dateStart,
					'dateEnd': dateEnd,
					'page' : '1',
					'limit' : DISPATCH.lib.Constants.PAGE_SIZE
		});
		view.getStore().loadPage(1);
	},
	export_oplogs_btn : function() {
		var viewList = this.getOpLogsList();
		var operator = encodeURIComponent(encodeURIComponent(viewList.getChildByElement('tf_create_by',true).getValue()));
		var level = viewList.getChildByElement('tf_log_level',true).getValue();
		var dateStart = Ext.util.Format.date(Ext.getCmp("tf_date_start").getValue(), 'Y-m-d');
		var dateEnd = Ext.util.Format.date(viewList.getChildByElement('tf_date_end',true).getValue(), 'Y-m-d');
		window.location.href = basePath + '/oplogs/excelDownload?operator='+operator+"&level="+level+"&dateStart="+dateStart+"&dateEnd="+dateEnd;
	}
});
