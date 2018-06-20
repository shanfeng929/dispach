/**
 * 菜单设置
 */
Ext.define(projectName + '.view.commons.sys.menu.MenuListView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.menuList',
    requires: [projectName + '.lib.component.AlmTreePanel'],
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    autoScroll: true,
    initComponent: function () {
        var me = this;
        var store = Ext.create(projectName + '.store.commons.sys.menu.MenuListStore');
        this.items = [{
            xtype: 'almTreePanel',
            id: 'menuListTree',
            rootVisible: false,
            isParentItemClick: true,
            name: 'menuListTree',
            store: store,
            width: '20%',
            contextMenus: [
                {
                    text: '增加',
                    itemId: 'addMenu',
                    handlerFunction: function (rec, item) {
                        if (rec.data.id == undefined) {
                             Ext.MessageBox.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_SELECT_CHILD_NODE);
                        } else {
                            var form = Ext.getCmp("menuFormId").form;
                            form.reset();
                            form.findField('parentId').setValue(rec.data.id==""?0:rec.data.id);
                            form.findField("parentName").setValue(rec.data.text);
                            Ext.getCmp('menuForm_butId').setVisible(true);
                        }
                    }
                },
                {
                    text: '修改',
                    itemId: 'editMenu',
                    handlerFunction: function (rec, item) {
                        Ext.getCmp('menuForm_butId').setVisible(true);
                        var form = Ext.getCmp("menuFormId").form;
                        form.loadRecord(rec);
                        var parentId = rec.data.parentId;
    					if(isNaN(parentId)){
    						parentId = 0;
    					}
                        form.findField("parentName").setValue(rec.parentNode.data.text);
                        form.findField("parentId").setValue(parentId);
                    }
                }, {
                    text: '删除',
                    itemId: 'deleteMenu',
                    handlerFunction: function (rec, item) {
                        var id = rec.data.id;
                        var pid = rec.data.parentId;
                        if(isNaN(pid)){
                        	pid = 0;
                        }
                        Ext.MessageBox.confirm(DISPATCH.lib.Constants.MSG_TITLE_INFO, DISPATCH.lib.Constants.MSG_LOCK_MENU_CONFIRM, function (btn, text) {
                            if (btn == 'yes') {
                                var menuTree = Ext.getCmp('menuListTree');
                                var form = Ext.getCmp('menuFormId').form;
                                Ext.Ajax.request({
                                    url: basePath + '/common/menu/deleteMenu',
                                    params:{
                                        id:id,
                                        pid:pid
                                    },
                                    success: function (response, resgsp) {
                                        var json = Ext.decode(response.responseText);
                                        Ext.example.msg(DISPATCH.lib.Constants.MSG_TITLE_INFO,json.message);
                                        menuTree.store.load();
                                        form.reset();
                                    }
                                });
                            }
                        });
                    }
                }
            ],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                width: 250,
                items: [
                    {
                        xtype: 'textfield',
                        enableKeyEvents: true,
                        id: 'menuListTree_tf_tree_queryContent',
                        value: '',
                        width: 150,
                        hidden: true
                    },
                    {
                        xtype: 'button',
                        id: 'menuListTree_btn_tree_QueryButton',
                        iconCls: 'search',
                        text: '查询',
                        hidden: true
                    }
                ]
            }],
            disableSelection: false
        }, {
            xtype: 'menuForm',
            width: '80%'
        }]
        this.callParent(arguments);
    }
});