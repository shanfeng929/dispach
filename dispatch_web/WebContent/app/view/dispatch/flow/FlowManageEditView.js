/**
 * 流程管理编辑页面
 */
Ext.define(projectName + '.view.dispatch.flow.FlowManageEditView',{
	extend : 'Ext.window.Window',
	alias : 'widget.flowManageEdit',
//	requires : [ 'Ext.ux.form.ItemSelector'],
	id : 'flowManageEdit',
	title : '任务链修改',
	modal : true,
	resizable : false,
	layout : 'fit',
	height : 300,
	config : {
		isEdit : false
	},
	storeCallBackDatas : [],
	gridViewKey : '',
	isSelf : false,
	defaults : {
		fieldStyle : 'background-color: #DFE9F6;background-image: none'
	},
	record : {},
	initComponent : function() {
		var me = this;
		var count =0;
		var store = Ext.create(projectName +'.store.dispatch.flow.FlowGroupComboStore');
		store.load();
		Ext.applyIf(me,{
			items : [{
				xtype : 'form',
				id : 'flowManageForm',
				width : 520,
				fieldDefaults : {
					labelAlign : 'left',
					msgTarget : 'side'
				},
				items : [{
					xtype : 'container',
					layout : {
						type : 'table',
						columns : 2
					},
					defaultType : 'textfield',
					items : [{
						xtype : 'hiddenfield',
						name : 'id',
						id : 'flowManage_edit_hf_id',
						value : this.record.id
					},
					{
						xtype : 'textfield',
						name : 'flowName',
						fieldLabel : '任务链名称<font color=red>*</font>',
						id : 'flowManage_edit_tf_flowName',
						allowBlank : false,
						blankText : '任务链名称不能为空',
						labelWidth : 90,
						margin : 5,
						enforceMaxLength : true,
						maxLength : 30,
						value : this.record.flowName
					},
					{
						xtype : 'textfield',
						name : 'flowDesc',
						id : 'flowManage_edit_tf_flowDesc',
						fieldLabel : '任务链描述',
//											readOnly : true,
						labelWidth : 90,
						margin : 5,
						enforceMaxLength : true,
						maxLength : 30,
						value : this.record.flowDesc
					},
					{
						xtype:'combo',
						fieldLabel:'所属任务链包',
						name : 'flowGroupid',
						id:'flowManage_edit_cb_flowGroupName',
						displayField:'flowGroupName',
						valueField : 'id',
						store:store,
						margin : 5,
						labelWidth : 90
					},
					{
						xtype: 'combo',
						name : 'creator',
					    id:'flowManage_edit_cb_creator',
						editable:false,
						store : new Ext.data.SimpleStore({
							fields : [ 'value', 'text' ],
							data : [ [ '1', '定时' ], [ '0', '人工' ]]
						}),
						editable:false,
						typeAhead: true,
						mode : "local" ,
						triggerAction : 'all',
						fieldLabel : '发起方式',
						labelWidth : 90,
						margin : 5,
						displayField:'text',
						valueField:'value',
						value : this.record.creator,
						listeners:{
							change:function(combo, record,index){
								var workDate = Ext.getCmp('flowManage_edit_df_workDate');
								var startTime = Ext.getCmp('flowManage_edit_df_startTime');
								/*var nextStarttime = Ext.getCmp('flowManage_edit_tf_nextStarttime');*/
								var nextStartunit = Ext.getCmp('flowManage_edit_tf_nextStartunit');
								var dayOfWeek = Ext.getCmp('flowManage_edit_tf_dayOfWeek');
								var flag = null;
								if(record=='人工'||record=='0'){
									flag = true;
								}else{
									flag = false;
								}
								workDate.setDisabled(flag);
								startTime.setDisabled(flag);
								/*nextStarttime.setDisabled(flag);*/
								nextStartunit.setDisabled(flag);
								dayOfWeek.setDisabled(flag);
							}
						}
					},
					{	
						xtype: 'datefield',
						format: 'Y-m-d',
						name:'workDate',
						fieldLabel: '执行日期<font color=red>*</font>',
						id:'flowManage_edit_df_workDate',
						allowBlank : false, 
						labelWidth : 90,
						margin : 5,
						value : this.record.workDate
					},
					{
				        xtype: 'timefield',
				        name: 'startTime',
				        fieldLabel: '执行时间',
				        id:'flowManage_edit_df_startTime',
				        increment: 10,
				        allowBlank : false,
				        format:'H:i:s',
				        anchor: '100%',
				        labelWidth : 90,
				        margin : 5,
				        value : this.record.startTime
					},
					/*{
						xtype: 'numberfield',
		                name : 'nextStarttime',
		                fieldLabel : '执行周期',
		                id : 'flowManage_edit_tf_nextStarttime', 
		                allowBlank : false,
		                allowDecimals: false, // 不允许小数点
			            minValue: 0, // 不允许负数
		                labelWidth : 90 , 
		                margin : 5,
						value : this.record.nextStarttime
			        },*/
			        {
			        	xtype: 'combo',
						name : 'nextStartunit',
						id:'flowManage_edit_tf_nextStartunit',
						editable:false,
						store : new Ext.data.SimpleStore({
							fields : [ 'value', 'text' ],
							/*data : [ [ 'Hours', 'Hours' ], [ 'Day', 'Day' ],['Week','Week'],['Month','Month'],['Year','Year']]*/
							data : DISPATCH.lib.Constants.TASK_CYCLE_TYPE
						}),
						typeAhead: true,
						mode : "local" ,
						triggerAction : 'all',
						fieldLabel : '执行周期',
						allowBlank : false,
						margin : 5,
						labelWidth : 90,
						displayField:'text',
						valueField:'value',
						listeners:{
							change:function(combo,record,index,event){
								var dayOfWeek = Ext.getCmp('flowManage_edit_tf_dayOfWeek');
								var from = Ext.getCmp('flowManageForm');
//								debugger;
								/*if(count==0){
									count++;
//									dayOfWeek.hide();
									return;
								}else */if(record.indexOf("WEEK")>=0){
//									dayOfWeek.show();
									dayOfWeek.setDisabled(false);
									dayOfWeek.show();
								}else{
//									dayOfWeek.hide();
									dayOfWeek.setDisabled(true);
									dayOfWeek.hide();
								}
								from.doLayout();
							}
						}
					},
					{
			        	xtype: 'combo',
						name : 'dayOfWeek',
						id:'flowManage_edit_tf_dayOfWeek',
						fieldLabel : '每周周几<font color=red>*</font>',
						hidden:true,
						editable:false,
						allowBlank : false,
						store : new Ext.data.SimpleStore({
							fields : ['value', 'text'],
							data : DISPATCH.lib.Constants.TASK_CYCLE_WEEK
						}),
						value : '',
						typeAhead: true,
						mode : "local" ,
						triggerAction : 'all',
						margin : 5,
						labelWidth : 90,
						displayField:'text',
						valueField:'value'
					}]
				}],
				buttons : [{
					height : 25,
					text : '保存',
					action : 'save',
					iconCls : 'icon-save',
					id : 'flowManage_edit_tf_save'
				},
				{
					height : 25,
					text : '关闭',
					iconCls : 'icon-reset',
					handler : function() {
						me.close();
					}
				}]
			}]
		});
		me.callParent(arguments);
	}
});