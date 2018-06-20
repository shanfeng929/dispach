
Ext.define(projectName + '.lib.component.BusinessTypeComboBox', {
    extend: "Ext.form.field.Picker",
    requires: ['Ext.tree.Panel', projectName + '.lib.Constants'],
    alias: 'widget.businessTypeComboBox',
    fieldLabel: '业务类型',
    labelWidth: 60,
    height: 20,
    width: 250,
    editable: false,
    hiddenOrganId: '',
    hiddenOrganpath: '',
    organValueField: 'code',
    loadAfterRender: true,
    config:{isEdit:false,isOuter:false},
    storeCallBackDatas:[],
    gridViewKey:'',
    isSelf:false,
    typeValue:'',
    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            store: Ext.create('Ext.data.TreeStore', {
                autoLoad: true,
                fields: [{name: 'id', type: 'int'}, 
                         {name: 'name', type: 'string'},
                         {name: 'code', type: 'string'},
                         { name: 'leaf',type: 'boolean'}, 
                         {name: 'expanded',type: 'boolean'}],
                proxy: {
                    type: 'ajax',
                    url: basePath + '/businessPolicy/assetsDetail/getProductTreeData',
                    reader: {
                        type: 'json'
                    }
                }
            })
        });
        me.callParent(arguments);
        if (me.loadAfterRender) {
            me.store.load({
                params: {
                    'node': DISPATCH.lib.Constants.queryALL_I
                },
                callback: function (records, operation, success) {
                    if(!me.config.isEdit){
                        me.setRawValue(records[0].data.name);
                        Ext.getCmp(me.hiddenOrganId).setValue(eval('records[0].data.' + me.organValueField));
                    }else{
                        me.setRawValue(records[0].data.name);
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
            displayField: 'name',
            rootVisible: false,
            resizable: true
        });
        self.picker.on({
            "itemdblclick": function (combotree, rec) {
                self.picker.hide();
            },
            "itemclick": function (combotree, rec) {
                if (!rec.get('checked')) {
                    self.setRawValue(rec.get('name'));
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
