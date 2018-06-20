/**
 * 监管缓释工具树
 * **/
Ext.define(projectName + '.lib.component.ToolControlTreeComboBox', {
    extend: "Ext.form.field.Picker",
    requires: ['Ext.tree.Panel', projectName + '.lib.Constants'],
    alias: 'widget.toolControlTree',
    fieldLabel: '监管缓释工具树',
    labelWidth: 60,
    height: 20,
    width: 250,
    editable: false,
    hiddenCode: '',
    loadAfterRender: true,
    config:{isEdit:false,isOuter:false},
    gridViewKey:'',
    isSelf:false,
    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            store: Ext.create(projectName + '.store.rwa.datas.DateCommonStore',{
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
                params: {
                    'type': 'tool'
                },
                callback: function (records, operation, success) {
                    if(!me.config.isEdit){
                        //me.setRawValue(records[0].data.dscrptn);
                        //Ext.getCmp(me.hiddenOrganId).setValue(eval('records[0].data.' + me.organValueField));
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
            width:250,
            focusOnToFront: true,
            shadow: true,
            ownerCt: this.ownerCt,
            useArrows: true,
            store: store,
            displayField: 'dscrptn',
            rootVisible: false,
            resizable: true
        });
        self.picker.on({
            "itemdblclick": function (combotree, rec) {
                self.picker.hide();
            },
            "itemclick": function (combotree, rec) {
                if (!rec.get('checked')) {
                    self.setRawValue(rec.get('dscrptn'));
                    /*if (self.hiddenOrganpath!='') {
                    	Ext.getCmp(self.hiddenOrganpath).setValue(rec.get('path'));
					}*/
                    Ext.getCmp(self.hiddenCode).setValue(rec.get('code'));
                }
            }
        });
        return self.picker;
    }
});
