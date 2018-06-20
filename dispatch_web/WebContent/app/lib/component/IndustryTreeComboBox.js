
Ext.define(projectName + '.lib.component.IndustryTreeComboBox', {
    extend: "Ext.form.field.Picker",
    requires: ['Ext.tree.Panel', projectName + '.lib.Constants',
               projectName + '.store.rwa.param.paramSetting.parammanage.IndustryTreeStore'],
    alias: 'widget.industryTreeCombo',
    fieldLabel: '选择类型',
    labelWidth: 60,
    height: 20,
    width: 240,
    editable: false,
    hiddenIndustryParentName:'',
    hiddenIndustryParentLevel:'',
    hiddenIndustryId:'',
    loadAfterRender: '',
    config:{isEdit:false,isOuter:false},
    storeCallBackDatas:[],
    gridViewKey:'',
    isSelf:false,
    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            store: Ext.create(projectName + '.store.rwa.param.paramSetting.parammanage.IndustryTreeStore',{
                isEdit:me.config.isEdit,
                isOuter:me.config.isOuter,
                storeCallBackDatas:me.storeCallBackDatas,
                gridViewKey:me.gridViewKey,
                isSelf : me.isSelf
            })
        });
        me.callParent(arguments);
        if (me.loadAfterRender) {
            me.store.load({
                callback: function (records, operation, success) {
                    if(!me.config.isEdit){
                        me.setRawValue(records[0].data.category_name);
                    }
                    var parentName = Ext.getCmp(me.hiddenIndustryParentName).getValue();
                    if(parentName !=null && parentName !=undefined && parentName != ""){
                        me.setRawValue(parentName);
                    }
                }
            });
        }
    },
    createPicker: function () {
        var self = this;
        var store = self.store;
        self.picker = new Ext.tree.Panel({
            height: 250,
            autoScroll: true,
            floating: true,
            width:240,
            focusOnToFront: true,
            shadow: true,
            ownerCt: this.ownerCt,
            useArrows: true,
            store: store,
            displayField: 'category_name',//name
            rootVisible: false,
            resizable: true
        });
        self.picker.on({
            "boxready":function(combotree,rec){
                //Ext.getCmp(self.hiddenIndustryParentLevel).setValue(rec.raw.level);//保存最小粒度;
            },
            "itemdblclick": function (combotree, rec) {
                self.picker.hide();
            },
            "itemclick": function (combotree, rec) {
                if (!rec.get('checked')) {
                    self.setRawValue(rec.raw.category_name);
                    Ext.getCmp(self.hiddenIndustryId).setValue(rec.raw.industry_id);//保存父id
                    Ext.getCmp(self.hiddenIndustryParentName).setValue(rec.raw.category_name);//name
                    Ext.getCmp(self.hiddenIndustryParentLevel).setValue(rec.raw.level);//保存最小粒度;
                }
            }
        });
        return self.picker;
    }
});
