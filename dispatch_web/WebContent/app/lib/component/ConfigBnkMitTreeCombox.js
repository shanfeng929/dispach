/**
 * 银行缓释工具 (担保方式)下拉框树形展示
 * 由于树形数据使用的是异步加载方式，所以在修改的时候会通过value查找code
 * 2015-10-27 lss
 * **/
Ext.define(projectName + '.lib.component.ConfigBnkMitTreeCombox', {
    extend: "Ext.form.field.Picker",
    requires: ['Ext.tree.Panel', projectName + '.lib.Constants',
               projectName + '.store.rwa.param.paramSetting.parammanage.ConfigBnkMitStore'],
    alias: 'widget.configBnkMitTreeCombox',
    fieldLabel: '担保方式',
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
            store: Ext.create(projectName + '.store.rwa.param.paramSetting.parammanage.ConfigBnkMitStore',{
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
                                url: basePath + '/rwa/param/configBnkMitController/queryByName',
                                params: {
                                    bnkMitiCd: parentCode
                                },
                                success: function(response,result){
                                    if(response.responseText!==''){
                                        var json = Ext.decode(response.responseText);
                                        me.setRawValue(json.bnkMitiDesc);
                                    }
                                }
                            });
                        }else{
                            me.setRawValue(records[0].data.bnkMitiDesc);
                            Ext.getCmp(me.hiddenParentCode).setValue(records[0].data.bnkMitiCd);
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
            height: 200,
            autoScroll: true,
            floating: true,
            width:240,
            focusOnToFront: true,
            shadow: true,
            ownerCt: this.ownerCt,
            useArrows: true,
            store: store,
            displayField: 'bnkMitiDesc',//name
            rootVisible: false,
            resizable: true
        });
        self.picker.on({
            "itemdblclick": function (combotree, rec) {
                self.picker.hide();
            },
            "itemclick": function (combotree, rec) {
                if (!rec.get('checked')) {
                    self.setRawValue(rec.raw.bnkMitiDesc);
                    Ext.getCmp(self.hiddenParentCode).setValue(rec.raw.bnkMitiCd);//保存父id
                }
            }
        });
        return self.picker;
    }
});
