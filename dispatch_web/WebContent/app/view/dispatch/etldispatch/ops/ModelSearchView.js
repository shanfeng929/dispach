Ext.define(projectName + '.view.dispatch.etldispatch.ops.ModelSearchView', {
			extend : projectName
					+ '.view.dispatch.etldispatch.ops.base.BaseSearch',
			alias : 'widget.modelSearch',
			id:'view.ModelSearchView',
			searchColNum : 2,
			reference : 'modelSearchView',
			dockedItems : [{
						xtype : 'toolbar',
						dock : 'right',
						layout : 'hbox',
						items : [{
							tooltip : '搜索',
							margin : '10 5 0 0',
							action : 'search',
							text : '搜索'// ,
								// icon:
								// AUTO.CONFIG.BUTTON_PATH+'search.png',
								// handler : 'searchPage'
							}, {
							tooltip : '重置',
							margin : '10 5 0 0',
							action : 'reset',
							text : '重置'// ,
								// icon:
								// AUTO.CONFIG.BUTTON_PATH+'reload.png',
								// handler : 'searchReset'
							}, {
							tooltip : '高级搜索',
							margin : '10 5 0 0',
							visible : false,
							text : '高级搜索',
							// icon: AUTO.CONFIG.BUTTON_PATH+'view.png',
							handler : 'advancedSearchFn'
						}]
					}],

			searchs : [{
						xtype : 'textfield',
						name : 'modelCode',
						fieldLabel : '模型代码',
						operator : 'EQUAL',
						valueType : 'STRING'
					}, {
						xtype : 'textfield',
						name : 'modelName',
						fieldLabel : '模型名称',
						operator : 'LIKE',
						valueType : 'STRING'
					}, {
						name : 'warningType',
						fieldLabel : '预警类型',
						xtype : 'formCombobox',
						hidden : true,
						operator : 'EQUAL',
						valueType : 'STRING',
						resKey : '1007'
					}, {
						name : 'warningObject',
						fieldLabel : '预警对象',
						hidden : true,
						xtype : 'formCombobox',
						operator : 'EQUAL',
						valueType : 'STRING',
						resKey : '1008'
					}],

			initCompnent : function() {
				var me = this;

				me.callParent(arguments);
			}
		});