/**
 *  通用树组件封装：
 *  1、支持多选、单选、复选框、取值时是否只获取叶子节点的值(justLeaf) 等.
 *  2、是否需要复选框，由传递给组件的数据源中是否包含(checked) 属性来决定;
 *  3、是否多选配置项: mutipleSelect;
 *  4、组件设置值函数: setComboValue,接收参数为数组类型;当mutipleSelect 配置项配置为true时,组件能够处理数组中所有的值,
 *    当 mutipleSelect 配置为false时, 参数可以为数组、单个对象，为数组时仅取第一个值;(未完成)
 *  5、获取组件值：
 *        getDatas: 获取组件选中值对应的值对象(code,value);
 *        getValues: 仅获取组件的value,数组格式;
 *  6、添加自定义事件itemclick
 */
Ext.define('ALM.lib.component.MutipleTreeCombo', {
    extend: 'Ext.form.field.Picker',
    alias: 'widget.mutipletreecombo',
    requires: ['Ext.tree.Panel'],
    treeHeight: 200,
    //treeWidth: 150,
    editable: false,
    width: 300,
    valueCode: '',
    textCode: '',
    datas: [],
    displayField : 'text',
    //配置是否只保存叶子节点的信息
    justLeaf: false,
    mutipleSelect: true,
    selectedText: 'selected',
    storeAutoLoad: true,
    initComponent: function () {
        var me = this;
        if (me.store != undefined) {
            me.store.on({
                load: function (store, records, successful) {
                    if (successful) {
                        me.getPicker().expandPath('/root');
                        if (records.firstChild != undefined && records.firstChild.data.checked != undefined) {
                            me.selectedText = 'checked';
                        }
                        me.clearData();
                        me.initDatas(records);
                    }
                }
            });
            if (me.storeAutoLoad) {
                me.store.load();
            }
        }
        //添加自定义事件 add by fmg 2016-01-05
        me.addEvents('itemclick');
        me.callParent(arguments);
    },
    /**
     *
     */
    createPicker: function () {
        var me = this;
        me.picker = new Ext.tree.Panel({
            height: me.treeHeight,
            width: 300,
            autoScroll: true,
            floating: true,
            ownerCt: this.ownerCt,
            shadow: true,
            useArrows: true,
            rootVisible: false,
            resizable: false,
            store: me.store,
            displayField : me.displayField
        });
        me.picker.on({
            'itemdblclick': function (combotree, rec) {
                me.picker.hide();
            },
            'itemclick': function (panel, record, item) {
                me.picker.fireEvent('checkchange', record, !record.get(me.selectedText));
                //触发itemclick事件 add by fmg 2016-01-05
                me.fireEvent('itemclick', record,me.getValues());
            },
            'checkchange': function (node, state) {
                node.set(me.selectedText, state);
                me.changeValue(node, state);
                if (node.hasChildNodes()) {
                    node.eachChild(function (child) {
                        if (child.get(me.selectedText) != state) {
                            child.set(me.selectedText, state);
                            me.picker.fireEvent('checkchange', child, state);
                        }
                    });
                }
            }
        });
        return me.picker;
    },
    /**
     * 响应combobox 的changeValue 事件
     *
     */
    changeValue: function (record, state) {
        var me = this, datas = [],
            textCode = me.textCode, valueCode = me.valueCode;

        if (me.mutipleSelect) {
            datas = me.datas;
        }
        //if 处理配置的 justLeaf 配置项：当justLeaf配置为true 且节点为非叶子节点时,忽略
//        if (!(me.justLeaf && !record.isLeaf())) {
            if (state) {
                me.refreshNodeSelectedStatus(state);
                //判断值是否已存在
                if (me.checkChecked(datas, record.get(textCode))) {
                    return;
                }
                datas.push({
                    'code': record.get(textCode),
                    'value': record.get(valueCode)
                });
            } else {
                for (var i = 0, j = datas.length; i < j; i++) {
                    if (record.get(textCode) == datas[i].code) {
                        Ext.Array.remove(datas, datas[i]);
                        break;
                    }
                }
            }
            me.datas = datas;
            me.setValueFromDatas(datas);
//        }
//        me.checkAllBrotherNodeStatus(record, state);
    },
    /**
     *
     */
    checkAllBrotherNodeStatus: function (node, state) {
        var me = this;
        var parentNode = node.parentNode, var_isAllChildChecked = true;
        if (parentNode != undefined) {
            if (!state) {
                var_isAllChildChecked = false;
            } else {
                parentNode.eachChild(function (childNode) {
                    if (!childNode.get(me.selectedText)) {
                        var_isAllChildChecked = false;
                        return false;
                    }
                });
            }
            if (var_isAllChildChecked) {
                this.changeValue(parentNode, var_isAllChildChecked);
            }
            parentNode.set(me.selectedText, var_isAllChildChecked);
        }
    },
    /**
     *
     */
    setValueFromDatas: function (datas, valueCode) {
        valueCode = valueCode || 'code';
        var values = '', me = this;
        datas = datas || [];

        Ext.Array.each(datas, function (rec) {
            values = values + ',' + eval('rec.' + valueCode);
        });
        me.setValue(values.substring(1));
    },
    /**
     * 校验值是否已存在组件的值数组中，避免重复添加
     */
    checkChecked: function (datas, key) {
        datas = datas || [];
        var var_IsExists = false;
        for (var i = 0, j = datas.length; i < j; i++) {
            if (datas[i].code == key) {
                var_IsExists = true;
                break;
            }
        }
        return var_IsExists;
    },
    /**
     * 组件初始化时初始化函数
     */
    initDatas: function (records) {
        var me = this;
        if (records.hasChildNodes()) {
            records.eachChild(function (childNode) {
                if (eval('childNode.data.' + me.selectedText)) {
                    me.changeValue(childNode, true);
                }
                me.initDatas(childNode);
            });
        }
    },
    /**
     * 获取树组件的显示值、实际值对象数组
     */
    getDatas: function () {
        return this.datas;
    },
    /**
     * 获取树组件的实际值数组
     */
    getValues: function () {
        var values = [], datas = this.datas;
        if (datas.length > 0) {
            Ext.Array.each(datas, function (rec) {
                values.push(rec.value);
            });
        }
        return values;
    },
    /**
     * 树组件值清空
     */
    clearData: function () {
        this.setValue('');
        this.datas = [];
        if (this.picker != undefined) {
            this.picker.getRootNode().cascadeBy(function (node) {
                node.set(this.selectedText, false);
            });
        }
    },
    /**
     *
     */
    setComboValue: function (values) {
        this.clearData();
        var datas = [], me = this, textCode = me.textCode, valueCode = me.valueCode, j;
        values = values || [];
        j = (this.mutipleSelect ? values.length : Math.min(1, values.length));
        if (me.store) {
            for (var i = 0; i < j; i++) {
                var tempNode = me.getPicker().getStore().getRootNode()
                    .findChild(valueCode, values[i], true);
                if (tempNode != null && tempNode != undefined) {
                    datas.push({
                        'code': tempNode.get(textCode),
                        'value': tempNode.get(valueCode)
                    });
                }
            }
            me.datas = datas;
            me.setValueFromDatas(datas);
            me.setItemsChecked(datas);
        }
    },
    /**
     *
     */
    setItemsChecked: function (datas) {
        var me = this;
        datas = datas || [];
        var rootNode = me.getPicker().getRootNode();
        for (var i = 0, j = datas.length; i < j; i++) {
            if (rootNode.hasChildNodes()) {
                var tempNode = rootNode.findChild(me.valueCode, datas[i].value, true);
                if (tempNode != null) {
                    tempNode.set(me.selectedText, true);
                }
            }
        }
    },
    /**
     *
     */
    refreshNodeSelectedStatus: function (state, node) {
        if (state && !this.mutipleSelect) {
            var me = this, node = node || me.getPicker().getRootNode();
            if (node.hasChildNodes()) {
                node.eachChild(function (child) {
                    child.set(me.selectedText, !state);
                    if (child.hasChildNodes()) {
                        me.refreshNodeSelectedStatus(state, child);
                    }
                });
            }
        }
    },
    /**
     *
     */
    getSubmitValue: function () {
        return this.getValues();
    },
    /**
     * 对外提供获取store 函数
     */
    getStore: function () {
        return this.store;
    }
});