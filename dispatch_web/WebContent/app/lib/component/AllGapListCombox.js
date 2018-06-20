/**
 * 获取全部的缺口下拉数据
 * 可以按照"type"动态的去配置
 * type = '0' 流动性缺口
 * type = '1' 重定价缺口
 * type = '2' 其他缺口
 */
Ext.define(projectName + '.lib.component.AllGapListCombox', {
	extend : 'Ext.form.field.ComboBox',
	alias : 'widget.allGapListCombox',
	requires : [ projectName + '.lib.Constants' ],
	editable : false,
	displayField : 'NAME',
	valueField : 'ID',
	queryMode : 'local',
	needInsertQueryAllItem : true,
	needInsertDefaultItem : true,
	type : '',
	width : 180,
	storeAutoLoad : true,
	initComponent : function() {
		var me = this;
		Ext.apply(me, {
			store : Ext.create('Ext.data.Store', {
				autoLoad : me.storeAutoLoad,
				fields : [ {
					name : 'ID',
					type : 'int'
				}, {
					name : 'NAME',
					type : 'string'
				} ],
				proxy : {
					type : 'ajax',
					url : basePath + '/commons/gap/getGapByTypeForCombox',
					reader : {
						type : 'json',
						root : 'listItems'
					}
				},
				listeners : {
					load : function(store, records, options) {
						if (me.needInsertQueryAllItem) {
							store.insert(DISPATCH.lib.Constants.queryALL_I, DISPATCH.lib.Constants.getQueryAllItem());
							me.setValue(DISPATCH.lib.Constants.queryALL);
						} else if (me.needInsertDefaultItem)
							me.setValue(records[0]);
					}
				}
			})
		});
		Ext.apply(me.store.proxy.extraParams, {
			'type' : me.type
		});
		me.callParent(arguments);
	}
});
