Ext.define(projectName + '.lib.component.OrganComboBox', {
	extend : 'Ext.form.field.ComboBox',
	alias : 'widget.organCombo',
	width : 270,
	fieldLabel : '机构',
	displayField : 'text',
	valueField : 'id',
	editable : false,
	queryMode : 'local',
	organValueField : 'id',
	needInsertDefault : true,
	needInsertFirst : true,
	defaultDisplay : '全部',
	defaultValue : '',
	type : '',//机构类型
	selectManage : false, //是否查询用户所管辖机构
	initComponent : function() {
		var me = this;
		Ext.apply(this, {
			store : Ext.create('Ext.data.Store', {
				autoLoad : true,
				fields : [ {
					name : 'id',
					type : 'string'
				}, {
					name : 'code',
					type : 'string'
				}, {
					name : 'text',
					type : 'string'
				} ],
				proxy : {
					type : 'ajax',
					url : basePath + '/commons/organ/getOrganTreeData',
					reader : 'json'
				},
				listeners : {
					load : function(store, records, options) {
						if (me.needInsertDefault) {
							var defaultItem = {
								'id' : me.defaultValue,
								'text' : me.defaultDisplay
							};
							store.insert(0, defaultItem);
							me.setValue(me.defaultValue);
						} else if (me.needInsertFirst) {
							if (records)
								me.setValue(records[0].data.code);
						}
					}
				}
			})
		});
		Ext.apply(me.store.proxy.extraParams, {
			type : me.type,
			selectManage:me.selectManage
		});
		me.callParent(arguments);
	}
});