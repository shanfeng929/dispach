Ext.define(projectName + '.view.dispatch.etldispatch.ops.ModelGridView', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.modelGrid',
			reference : 'modelGridView',
			id : 'modelGrid',
			border : false,
			columnLines : true,
			autoHeight : true,
			searchData : {
				name : 'organId',
				operator : 'EQUAL',
				valueType : 'INTEGER',
				value : ''
			},
			initComponent : function() {
				var me = this;
				var store = Ext.create(projectName
						+ '.store.dispatch.etldispatch.ops.ModelStore');
				store.on('beforeload', function(store, operation, eOpts) {
							// operation.setParams({searchData: me.searchData});
							Ext.apply(store.proxy.extraParams, {
										searchData : me.searchData
									})
						});
				/*
				 * store.on('load', function() { //debugger; });
				 */
				// store.load();
				Ext.apply(me, {
							columns : [{
										xtype : 'rownumberer',
										text : '序列',
										align : 'center',
										width : 60
									}, {
										text : '模型代码',
										align : 'center',
										dataIndex : 'modelCode',
										flex : 1
									}, {
										text : '模型名称',
										align : 'center',
										dataIndex : 'modelName',
										flex : 1
									}, {
										text : '预警对象',
										align : 'center',
										dataIndex : 'warningObject',
										flex : 1
										/*
										 * renderer : function(value) { return
										 * ResHelper.getVal('1008', value); }
										 */
								}	, {
										text : '预警类型',
										align : 'center',
										dataIndex : 'warningType',
										flex : 1
										/*
										 * renderer : function(value) { return
										 * ResHelper.getVal('1007', value); }
										 */
								}	, {
										text : '主题',
										align : 'center',
										dataIndex : 'title',
										flex : 1
									}, {
										text : '机构',
										align : 'center',
										dataIndex : 'orgName',
										flex : 1
									}, {
										text : '运用阶段',
										align : 'center',
										dataIndex : 'runPeriod',
										/*
										 * renderer : function(value) { return
										 * ResHelper.getVal('1011', value); },
										 */
										flex : 1
									}, {
										text : '模型状态',
										align : 'center',
										dataIndex : 'isUse',
										flex : 1
										/*
										 * renderer : function(value) { return
										 * ResHelper.getVal('1009', value); }
										 */
								}],
							store : store,
							dockedItems : [{
										xtype : 'pagingtoolbar',
										dock : 'bottom',
										store : store,
										displayInfo : true,
										displayMsg : '第 {0} 到 {1} 共 {2} 条记录',
										emptyMsg : '没有记录',
										beforePageText : '第',
										afterPageText : '页, 共 {0} 页'
									}/*, {
										xtype : 'toolbar',
										dock : 'top',
										items : [{
													xtype : 'button',
													text : '新建',
													handler : 'add_model_btn',
													margin : '0 0 0 5'
												}, {
													xtype : 'button',
													text : '修改',
													handler : 'edit_model_btn',
													margin : '0 0 0 5'
												}, {
													xtype : 'button',
													text : '启用',
													handler : 'start_model_btn',
													margin : '0 0 0 5'
												}, {
													xtype : 'button',
													text : '停用',
													handler : 'stop_model_btn',
													margin : '0 0 0 5'
												}, {
													xtype : 'button',
													text : '修改参数',
													handler : 'model_param_btn',
													margin : '0 0 0 5'
												}]
									}*/]
						});
				me.callParent(arguments);
				// debugger;
			}
		});