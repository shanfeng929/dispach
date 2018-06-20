Ext.define(projectName
				+ '.view.dispatch.parameters.parametersLib.parametersDateLib',
		{
			extend : 'Ext.form.FormPanel',
			id : 'parametersDateLib',
			alias : 'widget.parametersDateLib',

			initComponent : function() {
				var me = this;
				var date_beforeafter_store = new Ext.data.Store({
							fields : ['para_date_before_or_after'],
							autoLoad : false,
							data : [{
										'para_date_before_or_after' : '之前'
									}, {
										'para_date_before_or_after' : '之后'
									}]
						});
				Ext.applyIf(me, {
					items : [{
								xtype : 'container',
								layout : {
									type : 'table',
									columns : 2
								},
								items : [{
											xtype : 'hiddenfield',
											name : 'not_used_field1',
											id : 'not_used_field1'
										}, {
											xtype : 'textfield',
											colspan : 2,
											name : 'para_date_current',
											fieldLabel : '当前变量值',
											value : '`date +%Y%m%d`',
											width : 500,
											id : 'para_date_current',
											allowBlank : true, // 可以为空
											// blankText : '变量名称不能为空',
											margin : '25 10 5 15',
											enforceMaxLength : true,
											maxLength : 256
										}, {
											xtype : 'numberfield',
											name : 'para_date_day',
											fieldLabel : '填入天数',
											value : 0,
											id : 'para_date_day',
											allowBlank : false,
											minValue : 0,
											minText : '请输入大于等于0的数',
											// regex : /^[1-9]\d*|0$/,
											// regexText : '请输入整数',
											margin : '15 0 5 15',
											enforceMaxLength : true,
											maxLength : 256
										}, {
											xtype : 'combo',
											name : 'para_date_before_or_after',
											fieldLabel : '之前或之后',
											value : '之后',
											id : 'para_date_before_or_after',
											store : date_beforeafter_store,
											displayField : 'para_date_before_or_after',
											allowBlank : true,
											margin : '15 25 5 10',
											enforceMaxLength : true,
											maxLength : 25
										}, {
											xtype : 'slider',
											action : 'choose_date',
											colspan : 2,
											fieldLabel : '选择',
											id : 'para_date_slider',
											width : 450,
											value : 0,
											minValue : -150,
											maxValue : 150,
											margin : '50 10 5 15'
										}]
							}],
					buttons : [{
								height : 25,
								text : '确认',
								action : 'enter',
								iconCls : 'icon-save',
								id : 'para_date_save'
							}, {
								height : 25,
								text : '关闭',
								iconCls : 'icon-reset',
								handler : function() {
									parent.Ext.getCmp('parametersLibForm')
											.close();
								}
							}]
				});

				me.callParent(arguments);
				// 下面是几个组件互相监听
				var ctn = me.getComponent(0);
				var the_para_date_slider = ctn.getComponent('para_date_slider');
				var numberbox1 = ctn.getComponent('para_date_day');
				var boa_combo = ctn.getComponent('para_date_before_or_after');
				var text1 = ctn.getComponent('para_date_current');
				// 滑条拖拉
				the_para_date_slider.on('drag', function() {
							var value = the_para_date_slider.getValue();
							// Ext.MessageBox.alert('值是' + value, '' + value);
							if (value == 0) {
								text1.setValue('`date +%Y%m%d`');
								numberbox1.setValue(0);
							} else if (value > 0) {
								text1.setValue('`date -d "+' + value
										+ 'day" +%Y%m%d`');
								numberbox1.setValue(value);
								boa_combo.setValue('之后');
							} else {
								text1.setValue('`date -d "' + value
										+ 'day" +%Y%m%d`');
								numberbox1.setValue(-1 * value);
								boa_combo.setValue('之前');
							}
						});
				var boxChange = function() {
					// Ext.MessageBox.alert('a', '');
					var numValue = numberbox1.getValue();
					var boaValue = boa_combo.getValue();
					var sliderRawValue = the_para_date_slider.getValue();
					if (numValue == 0) {
						text1.setValue('`date +%Y%m%d`');
						if (sliderRawValue != 0) {
							the_para_date_slider.setValue(0);
						}
					} else if (boaValue == '之后') {
						text1.setValue('`date -d "+' + numValue + 'day" +%Y%m%d`');
						if (numValue <= 150 && sliderRawValue != numValue) {
							the_para_date_slider.setValue(numValue);
						}
					} else if (boaValue == '之前') {
						text1.setValue('`date -d "-' + numValue + 'day" +%Y%m%d`');
						if (numValue <= 150 && sliderRawValue != -1 * numValue) {
							the_para_date_slider.setValue(-numValue);
						}
					}
				};
				numberbox1.on('change', boxChange);
				boa_combo.on('change',boxChange);
			}

		});