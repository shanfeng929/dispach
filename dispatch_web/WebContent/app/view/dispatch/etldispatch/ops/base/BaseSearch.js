Ext.define(projectName + '.view.dispatch.etldispatch.ops.base.BaseSearch', {
			extend : 'Ext.form.Panel',
			alias : 'widget.basesearch',

			// layout: 'auto',
			// maxWidth: 1000,
			// maxHeight: 66,
			padding : '0 10 0 10',
			frame : true, // 是否圆角
			border : false,

			searchSetRef : 'searchSet',
			advancedSearchWinRef : 'advancedSearchWin',

			// 开放子类填写
			searchs : [],// 显示的搜索项
			searchColNum : 4,

			// advancedSearchs高级搜索列表配置，写法格式需与searchs相同
			advancedSearchs : [],
			advSearchColNum : 3,

			items : [{
						xtype : 'fieldset',
						title : '搜索条件',
						// reference: 'searchSet',
						id:'BaseSearch.searchSet',
						margin : '0 5 5 0',
						fieldDefaults : {
							labelAlign : 'right'
						},
						viewConfig : {
							forceFit : true
						},
						defaults : {
							defaultType : 'textfield',
							layout : {
								type : 'hbox'
							},
							defaults : {
								margin : '0 5 5 5',
								labelWidth : 80,
								width : 210
							},
							border : false
						}

					}, {
						xtype : 'window',
						title : '高级搜索',
						// reference: 'advancedSearchWin',
						closeAction : 'hide',
						layout : 'fit',
						height : 400,
						width : 750,
						modal : true, // 掩饰父窗口
						renderTo : Ext.getBody(),
						bbar : ['->', {
									xtype : 'button',
									text : '搜索',
									handler : 'advancedSearchPage'
								}, {
									xtype : 'button',
									text : '关闭',
									handler : 'closeAdvSearchFn'
								}, '->'],

						items : [{
									xtype : 'form',
									overflowY : 'auto',
									frame : true, // 是否圆角
									border : false,
									layout : 'fit',
									items : {
										xtype : 'fieldset',
										padding : '10 10 0 10',
										fieldDefaults : {
											labelAlign : 'right'
										},
										viewConfig : {
											forceFit : true
										},

										defaults : {
											defaultType : 'textfield',
											layout : {
												type : 'hbox'
											},
											defaults : {
												margin : '0 5 5 5',
												labelWidth : 80,
												width : 210
											},
											border : false
										}
									}

								}]
					}],

			initSearch : function() {// 初始化搜索
				var me = this;
				if (me.searchs.length) {
					// me.items[0].items = me.searchs;//将搜索信息放入搜索form中

					if (me.searchs[0].items) {
						me.items[0].items = me.searchs;
					} else {
						var list = [];
						var i = me.searchColNum;
						var raw;
						Ext.each(me.searchs, function(it) {
									if (i >= me.searchColNum) {
										raw = {
											items : []
										};
										list.push(raw);
										i = 0;
									}
									raw.items[i] = it;
									i++;
								});

						me.items[0].items = list;
					}
				} else {
					me.hidden = true;
				}

			},

			initAdvancedSearch : function() {// 初始化高级搜索
				var me = this;
				var fieldSet = me.items[1].items[0].items;

				if (me.advancedSearchs.length) {
					Ext.each(me.searchs, function(it) {
								me.advancedSearchs.unshift(it);
							})

					if (me.advancedSearchs[0].items) {
						fieldSet.items = me.advancedSearchs;

					} else {
						var list = [];
						var i = me.advSearchColNum;
						var raw;
						Ext.each(me.advancedSearchs, function(it) {
									if (i >= me.advSearchColNum) {
										raw = {
											items : []
										};
										list.push(raw);
										i = 0;
									}
									raw.items[i] = it;
									i++;
								});

						fieldSet.items = list;
					}
				}
			},

			initComponent : function() {
				var me = this;

				me.items[0].reference = me.searchSetRef;
				me.items[1].reference = me.advancedSearchWinRef;

				me.initSearch();
				me.initAdvancedSearch();

				me.callParent();

				if (!me.advancedSearchs.length) {// 高级搜索为空则隐藏button
					var toolbar = me.getDockedItems('toolbar[dock="right"]');
					toolbar[0].items.items[2].hide();
				}
			}

		});