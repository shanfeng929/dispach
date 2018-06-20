/**
 * 封装从字典表中查出所有字典项,各字典项使用的时候继承该combox,仅需要配置 code即可 有效引用方式： 直接全部引用 xtype: 'dictionaryCombox' ,然后配置 code 就行 页面中操作：
 * 1、需要在requires中将LRM.lib.component.DictionaryCombox引入 2、xtype需要写成dictionaryCombox, fieldLabel自行根据页面需要填写,
 * code(该字段必须)值需要根据该组件的类型，对应数据表BAS_DICT的CAT字段 width指的是该控件的总长度，labelWidth指的是控件名字的长度，width和labelWidth的值，自行根据内容的长度设定
 * emptyText如果需要默认“查询全部”之类的字段的时候，设置emptyText的值即可。 例如： { xtype : 'dictionaryCombox', fieldLabel:'总账的类型', width:150,
 * labelWidth:50, code:'zzlx' // , // emptyText:'查询全部' }
 */

Ext.define(projectName + '.lib.component.DictionaryCombox', {
	extend : 'Ext.form.field.ComboBox',
	alias : 'widget.dictionaryCombox',
	requires : [ projectName + '.lib.Constants' ],
	editable : false,
	valueField : 'ITEM_CODE',
	displayField : 'ITEM_NAME',
	queryMode : 'local',
	valueNotFoundText : 'None',
	needInsertQueryAllItem : true,
	needInsertDefaultItem : true,
	code : '',
	pageValue : '1',
	limitValue : '25' ,
	width : 180,
	config : {
		queryALL_Index : null
	},
	storeAutoLoad : true,
	initComponent : function() {
		var me = this;
		Ext.apply(me, {
			store : Ext.create('Ext.data.Store', {
				autoLoad : me.storeAutoLoad,
				fields : [ {
					name : 'ITEM_CODE',
					type : 'string'
				}, {
					name : 'ITEM_NAME',
					type : 'string'
				} ],
				proxy : {
					type : 'ajax',
					url : basePath + '/almService/dictController/getDictionaryItemByType',
					reader : {
						type : 'json',
						root : 'listItems'
					}
				},
				listeners : {
					load : function(store, records, options) {
						if (me.needInsertQueryAllItem) {
							if(me.config.queryALL_Index == null){
								store.insert(DISPATCH.lib.Constants.queryALL_Index, DISPATCH.lib.Constants.getQueryAllItem());
//								console.log(records);
							}else{
//								store.insert(ALM.lib.Constants.queryALL_Index,{
//									'ITEM_CODE' : '',
//									'ITEM_NAME' : '--全部--'
//								});
							}
							me.setValue(DISPATCH.lib.Constants.queryALL);
						} else if (me.needInsertDefaultItem)
							me.setValue(records[0]);
					}
				}
			})
		});
		Ext.apply(me.store.proxy.extraParams, {
			'cat' : me.code ,
			 page : me.pageValue ,
			 limit : me.limitValue 
		});
		me.callParent(arguments);
	}
//	setValueAfterLoad : function(value) {
//		var me = this;
//		me.getStore().load({
//			callback : function(records) {
//				var a = records;
//				me.setValue(value);
//			}
//		});
//	}
//	setIndexAfterLoad : function() {
//		var me = this;
//		me.getStore().load({
//			callback : function(records) {
//				me.setValue(records[0]);
//			}
//		});
//	}
});
