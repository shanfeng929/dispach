/*
 * 一般信贷业务-表内表外标识
 */
Ext.define(projectName + '.lib.component.CurrencyCombox', {
	extend : 'Ext.form.field.ComboBox',
	alias : 'widget.currencyCombox',
	requires : [ projectName + '.lib.Constants' ],
	editable : false,
	valueField : 'currencyCd',
	displayField : 'currencyCd',
	queryMode : 'local',
	emptyText:'--请选择--',
	valueNotFoundText : 'None',
//	pageValue : '1',
//	limitValue : '25' ,
	width : 180,
	
	storeAutoLoad : true,
	initComponent : function() {
		var me = this;
		Ext.apply(me, {
			store : Ext.create('Ext.data.Store', {
				autoLoad : me.storeAutoLoad,
				fields: [{
					name:'currencyCd',
					type:'string'
				}],
			    proxy: {
			        type: 'ajax',
			        url: basePath + '/rwa/laboratory/assetsSecuritization/CurrencyController/getCurrencyCombox',
			        reader: {
			            type: 'json',
			            root: 'listItems'
			        }
			    }   
			})
		});
		me.callParent(arguments);
	}
});
