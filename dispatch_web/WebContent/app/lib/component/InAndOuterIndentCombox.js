/*
 * 一般信贷业务-表内表外标识
 */
Ext.define(projectName + '.lib.component.InAndOuterIndentCombox', {
	extend : 'Ext.form.field.ComboBox',
	alias : 'widget.inAndOuterIndentCombox',
	requires : [ projectName + '.lib.Constants' ],
	editable : false,
	valueField : 'inAndOuterIndentCd',
	displayField : 'inAndOuterIndentNm',
	queryMode : 'local',
	emptyText:'--请选择--',
	valueNotFoundText : 'None',
	pageValue : '1',
	limitValue : '25' ,
	width : 180,
	config : {
		queryALL_I : null
	},
	storeAutoLoad : true,
	initComponent : function() {
		var me = this;
		Ext.apply(me, {
			store : Ext.create('Ext.data.Store', {
				autoLoad : me.storeAutoLoad,
				fields : [ {
					name : 'inAndOuterIndentCd',
					type : 'string'
				}, {
					name : 'inAndOuterIndentNm',
					type : 'string'
				} ],
				data : [
 					{
						inAndOuterIndentCd : '1',
						inAndOuterIndentNm : '表内'
					}, {
						inAndOuterIndentCd : '2',
						inAndOuterIndentNm : '表外'
					}
     			]
			})
		});
		me.callParent(arguments);
	}
});
