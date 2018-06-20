
Ext.define(projectName + '.lib.component.OrganTreeComboBox', {
    extend: "Ext.form.field.Picker",
    requires: ['Ext.tree.Panel', projectName + '.lib.Constants'],
    alias: 'widget.organTreeCombo',
    fieldLabel: '机构',
    labelWidth: 60,
    height: 20,
    width: 250,
    editable: false,
    hiddenOrganId: '',
    hiddenOrganpath: '',
    organValueField: 'id',
    loadAfterRender: true,
    config:{isEdit:false,isOuter:false},
    storeCallBackDatas:[],
    gridViewKey:'',
    isSelf:false,
    typeValue:'',
    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            store: Ext.create(projectName + '.store.commons.sys.organ.OrganTreeStore',{
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
                	type : me.typeValue,
                    'node': DISPATCH.lib.Constants.queryALL_I
                },
                callback: function (records, operation, success) {
                    if(!me.config.isEdit){
                        me.setRawValue(records[0].data.text);
                        Ext.getCmp(me.hiddenOrganId).setValue(eval('records[0].data.' + me.organValueField));
                    }else{
                        me.setRawValue(records[0].data.text);
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
            displayField: 'text',
            rootVisible: false,
            resizable: true
        });
        self.picker.on({
            "itemdblclick": function (combotree, rec) {
                self.picker.hide();
            },
            "itemclick": function (combotree, rec) {
                if (!rec.get('checked')) {
                    self.setRawValue(rec.get('text'));
                    if (self.hiddenOrganpath!='') {
                    	Ext.getCmp(self.hiddenOrganpath).setValue(rec.get('path'));
					}
                    Ext.getCmp(self.hiddenOrganId).setValue(rec.get(self.organValueField));
                }
            }
        });
        return self.picker;
    }
});
