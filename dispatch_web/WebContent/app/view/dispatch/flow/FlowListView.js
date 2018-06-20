Ext.define(projectName+'.view.dispatch.flow.FlowListView',{
	extend : 'Ext.window.Window',
	alias : 'widget.flowList',
	title : '流程依赖设置列表',
	modal : true,
	width : 600,
	height : 400,
	param_id : "",
	layout : 'fit',
	initComponent: function () {
		var me = this;
		//var store = Ext.create(projectName +'.store.dispatch.flow.FlowManageStore');
		Ext.applyIf(me, {
			items: [{
				xtype: 'grid', 
				id:'flowListGrid',
				autoScroll: true,
				store :Ext.create('Ext.data.Store', {
				     model: projectName +'.model.dispatch.flow.FlowManageModel',
				     proxy: {
				         type: 'ajax',
				         url: basePath + '/dispatch/flow/queryList',
				         extraParams : {
				        	'flowType':4,//主流程编号
				        	'id':this.param_id
				         },
				         reader: {
				             type: 'json',
				             root: 'listItems'
				         }
				     },
				     autoLoad: false
				 }),
				selModel:Ext.create('Ext.selection.CheckboxModel'),
				columns : [{
					xtype : 'rownumberer',
					text : '序号',
					align : 'center',
					width : 60
				}, {
					text : 'id',
					dataIndex : 'id',
					hideable : true,
					hidden : true,
					width : 120
				}, {
					text : '流程名称',
					align : 'center',
					dataIndex : 'flowName',
					width : 120
				}, /*{
					text : '流程中文名称',
					align : 'center',
					dataIndex : 'flowCnName',
					width : 120
				}, */{
					text : '流程开始时间',
					align : 'center',
					dataIndex : 'startTime',
					width : 120
				}, {
					text : '流程结束时间',
					align : 'center',
					dataIndex : 'endTime',
					width : 120
				}, {
					text : '业务日期(YYYYMMDD/YYYYMMDDHH)',
					align : 'center',
					dataIndex : 'workDate',
					width : 120
				}, {
					text : '人工发起人或定时发起',
					align : 'center',
					dataIndex : 'creator',
					flex : 1
				}, {
					text : '流程备注',
					align : 'center',
					dataIndex : 'flowDesc',
					width : 120
				}, {
					text : '创建者',
					align : 'center',
					dataIndex : 'createBy',
					width : 120
				}, {
					text : '创建日期',
					align : 'center',
					dataIndex : 'createDate',
					width : 120
				}, {
					text : '更新者',
					align : 'center',
					dataIndex : 'updatedBy',
					width : 120
				}, {
					text : '更新日期',
					align : 'center',
					dataIndex : 'updatedDate',
					width : 120
				}, {
					text : '操作备注',
					align : 'center',
					dataIndex : 'flowNote',
					width : 120
				}]
			}],
			buttons:[
    	            {height:25,text : '确定', action : 'save',  id : 'flowlist_save'},
    	            {height:25,text : '退出' , handler: function(){ me.close();   } }
    	            ] 
		});

		me.callParent(arguments);
	}
	
});