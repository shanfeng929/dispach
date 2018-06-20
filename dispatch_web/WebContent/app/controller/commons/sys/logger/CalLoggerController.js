Ext.define(projectName + '.controller.commons.sys.logger.CalLoggerController', {
			extend : 'Ext.app.Controller',
			views : ['commons.sys.logger.CalLoggerListView',
					'commons.sys.logger.CalLoggerGridView'],
			refs : [{
						ref : 'calLoggerList',
						selector : 'calLoggerList'
					}, {
						ref : 'calLoggerGrid',
						selector : 'calLoggerGrid'
					}],
			init : function() {
				this.control({
							'calLoggerList' : {
								boxready : this.init_calLogList
							},
							'calLoggerList button[action=search]' : {
								click : this.onSearch
							}
						});
			},
			init_calLogList : function() {
				var listView = this.getCalLoggerList();
				new Ext.util.DelayedTask(function() {
							listView.getChildByElement('btn_cllv_search', true)
									.fireEvent('click');
						}).delay(1 * 1000);
			},
			onSearch : function() {
				function dateformate(value) {
					if (null != value) {
						return Ext.Date.format(new Date(value), 'Y-m-d');
					} else {
						return null;
					}
				};
				var listView = this.getCalLoggerList();
				var gridView = this.getCalLoggerGrid();

				var startTime = dateformate(listView.getChildByElement(
						'field_cllv_startTime', true).getValue());
				var endTime = dateformate(listView.getChildByElement(
						'field_cllv_endTime', true).getValue());
						
				Ext.apply(gridView.store.proxy.extraParams, {
							'startTime' : startTime,
							'endTime' : endTime,
							page : DISPATCH.lib.Constants.FIRST_PAGE,
							limit : DISPATCH.lib.Constants.PAGE_SIZE
						});
				gridView.store.load();
			}
		});