/**
 * 用语构建动态Tree，Grid的title，columns，fields，store等。
 */
Ext.define(projectName +'.lib.functions.DynamicGridUtil', {

    singleton: true,

    buildGridColumns: function (columns) {
        return null;
    },

    /**
     *
     * @param columns=[{text:'产品名称',name:'name'},{text:'第一个月',name:'month1'},{text:'第二个月',name:'month2'}]
     */
    buildFields: function (columns) {
        var fields = [];
        for (var i = 0, j = columns.length; i < j; i++) {
            var childrenColumns = columns[i].childrenColumns;
            if (childrenColumns == null || childrenColumns == '' || childrenColumns == undefined) {
                fields.push({
                    name: columns[i].name,
                    type: columns[i].xtype != undefined ? columns[i].xtype : 'auto'
                });
            } else {
                var arr = childrenColumns.split(",");
                for (var k = 0; k < arr.length; k++) {
                    var newCol = {}
                    newCol.type = columns[i].xtype != undefined ? columns[i].xtype : 'auto'
                    newCol.name = columns[i].name + "_" + (k + 1);
                    fields.push(newCol);
                }
            }
        }
        return fields;
    },
    /**
     * 构造树的列，第一项默认必须设置treecolumn。
     * numberEditor、xtype等可作为扩展选项
     * @param columns=[{text:'产品名称',name:'name'},{text:'第一个月',name:'month1'},{text:'第二个月',name:'month2'}]
     */
    buildTreeGridColumns: function (columns) {
        var vcolumns = [];
        var numberEditor = {
            xtype: 'numberfield',
            hideTrigger: true,
            minValue: 0
        };
        for (var i = 0, j = columns.length; i < j; i++) {
            var columncfg = {};
            if (i == 0) {
                columncfg.xtype = 'treecolumn';
                columncfg.width = '20%';
            } else {
                columncfg.width = '10%';
                columncfg.align = 'right';
                if (columns[i].numberEditor == true) {
                    columncfg.editor = numberEditor;
                    columncfg.renderer = function (value, metadata, record) {
                        if (isNaN(value)) {
                            return value;
                        }
                        return Ext.util.Format.number(value, '0,000.00');
                    };
                } else if (columns[i].comboBox == true) {
                    var store = Ext.create(columns[i].store);
                    columncfg.editor = {
                        xtype: 'combo',
                        store: store,
                        displayField: 'ITEM_NAME',
                        editable: false,
                        valueField: 'ITEM_CODE',
                        listeners: {}
                    };
                    columncfg.renderer = function (value, metadata, record) {
                        if (value == '' || value == null || value == undefined)
                            return;
                        return LRM.lib.FRMConstants.DecodeDict(value, store);
                    };
                } else {

                }
            }
            if (columns[i].hidden != true) {
                columncfg.text = columns[i].text;
                columncfg.dataIndex = columns[i].name;

                var childrenColumns = columns[i].childrenColumns;
                if (childrenColumns == null || childrenColumns == '' || childrenColumns == undefined) {
                    vcolumns.push(columncfg);
                    continue;
                }
                var arr = childrenColumns.split(",");
                var childColumns = [];
                for (var k = 0; k < arr.length; k++) {
                    var newCol = {}
                    newCol.width = columncfg.width;
                    newCol.align = columncfg.align;
                    newCol.editor = columncfg.editor;
                    newCol.dataIndex = columncfg.dataIndex + "_" + (k + 1);
                    newCol.text = arr[k];
                    childColumns.push(newCol);
                }
                var tmp = {
                    text: columns[i].text
                }
                tmp.columns = childColumns;
                vcolumns.push(tmp);
            }
        }
        //console.log(vcolumns);
        return vcolumns;
    },
    buildTreeStore: function (requestUrl, fields) {
        var store = Ext.create('Ext.data.TreeStore', {
            fields: fields,
            proxy: {
                type: 'ajax',
                api: {
                    read: requestUrl
                },
                reader: {
                    type: 'json',
                    root: 'children'
                }
            }
        });
        return store;
    }
});