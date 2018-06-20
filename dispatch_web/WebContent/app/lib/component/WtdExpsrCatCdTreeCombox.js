Ext.define(projectName +'.lib.component.WtdExpsrCatCdTreeCombox', {
    extend : "Ext.form.field.Picker",
    requires : ['Ext.tree.Panel', projectName +'.lib.Constants'],
    alias : 'widget.wtdExpsrCatCdTreeCombox',
    fieldLabel : '权重法风险暴露分类编码',
    labelWidth : 60,
    height : 20,
    width : 250,
    editable : false,
    emptyText :'--请选择--',
    config : {
			isEdit : false,
			isOuter : false
		},
    isSelf : false,
    hiddenCode : '',
    initComponent : function () {
        var me = this;
        Ext.apply(me, {
            store: Ext.create(projectName +'.store.rwa.laboratory.WtdExpsrCatCdTreeStore',{
                isEdit : me.config.isEdit,
                isOuter : me.config.isOuter,
                isSelf : me.isSelf
            })
        });
        me.callParent(arguments);
    },

    rawToValue:function(val){
    	var self = this;
    	return self.hiddenCode;
    	
    },
    createPicker: function () {
        var self = this;
        var store = self.store;
        self.picker = new Ext.tree.Panel({
            height : 250,
            autoScroll : true,
            floating : true,
            width : 250,
            focusOnToFront : true,
            shadow : true,
            ownerCt : this.ownerCt,
            useArrows : true,
            store : store,
			displayField : 'dscrptn',
            rootVisible : false,
            resizable : true
        });
        self.picker.on({
            "itemclick": function (combotree, rec) {
                if (rec.get('leaf') == true) {
                	self.hiddenCode = rec.get('wtdcode');
                    self.setValue(rec.get('dscrptn'));
                    self.picker.hide();
                }
                
            }
        });
        
        return self.picker;
    }
});
