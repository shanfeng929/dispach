Ext.define(projectName + '.lib.component.CardSetComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.cardSetComboBox',
    requires: [projectName + '.lib.Constants'],
    editable: false,
    displayField: 'NAME',
    valueField: 'ID',
    queryMode: 'local',
    needInsertQueryAllItem: true,
    needInsertDefaultItem: true,
    entirely : false,
    width: 180,
    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            store: Ext.create('Ext.data.Store', {
                autoLoad: true,
                fields: [{name: 'ID', type: 'int'}, {name: 'NAME', type: 'string'}],
                proxy: {
                    type: 'ajax',
                    url: basePath + '/commons/cardSet/getMapping',
                    params : {
                        entirely : me.entirely
                    },
                    reader: {
                        type: 'json',
                        root: 'listItems'
                    }
                },
                listeners: {
                    load: function (store, records, options) {
                        if (me.removeValue) {
                            var rec = null;
                            store.each(function (record, i) {
                                if (record.get("ID") == me.removeValue) {
                                    rec = record;
                                }
                            });
                            if (rec) {
                                store.remove(rec);
                            }
                        }
                        if (me.needInsertQueryAllItem) {
                            me.store.insert(0, {'ID': DISPATCH.lib.Constants.queryALL,'NAME': '全部'});
                            me.setValue(DISPATCH.lib.Constants.queryALL);
                        } else if (me.needInsertDefaultItem) {
                            me.setValue(records[0]);
                        }
                    }
                }
            })
        });
        me.callParent(arguments);
    }
});