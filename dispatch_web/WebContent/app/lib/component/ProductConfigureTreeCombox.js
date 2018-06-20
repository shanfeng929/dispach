/**
 * 产品树;
 * **/
Ext.define(projectName + '.lib.component.ProductConfigureTreeCombox', {
    extend: "Ext.form.field.Picker",
    requires: ['Ext.tree.Panel', projectName + '.lib.Constants',
               projectName + '.store.rwa.datas.ProductConfigureTreeStore'],
    alias: 'widget.productConfigureCombo',
    fieldLabel: '产品树',
    labelWidth: 60,
    height: 20,
    width: 240,
    editable: false,
    hiddenParentCode:'',
    loadAfterRender: '',
    config:{isEdit:false,isOuter:false},
    storeCallBackDatas:[],
    gridViewKey:'',
    isSelf:false,
    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            store: Ext.create(projectName + '.store.rwa.datas.ProductConfigureTreeStore',{
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
                        var parentCode = Ext.getCmp(me.hiddenParentCode).getValue();
                        if(parentCode !=null && parentCode !=undefined && parentCode != ""){
                            //每次加载一条数据，所以只能走ajax;
                            Ext.Ajax.request({
                                url: basePath + '/rwa/datas/productConfigureController/queryNameByCode',
                                params: {
                                    code: parentCode
                                },
                                success: function(response,result){
                                    if(response.responseText!==''){
                                        var json = Ext.decode(response.responseText);
                                        me.setRawValue(json.prodctName);
                                    }
                                }
                            });
                        }else{
                            me.setRawValue(records[0].data.prodctName);
                            Ext.getCmp(me.hiddenParentCode).setValue(records[0].data.prdctCode);
                        }
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
            displayField: 'prodctName',//name
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
                    self.setRawValue(rec.raw.prodctName);
                    Ext.getCmp(self.hiddenParentCode).setValue(rec.raw.prdctCode);//保存父id
                }
            }
        });
        return self.picker;
    }
});
