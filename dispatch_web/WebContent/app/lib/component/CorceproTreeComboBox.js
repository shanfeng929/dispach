
Ext.define(projectName + '.lib.component.CorceproTreeComboBox', {
    extend: "Ext.form.field.Picker",
    requires: ['Ext.tree.Panel', projectName + '.lib.Constants'],
    alias: 'widget.corceproTreeCombo',
    fieldLabel: '对公贷款参数',
    labelWidth: 60,
    height: 20,
    width: 250,
    editable: false,
    hiddenOrganId: '',
    hiddenOrganpath: '',
    hiddenName:'',
    hiddenLevel:'',
    hiddenParentId:'',
    organValueField: '',
    loadAfterRender: true,
    config:{isEdit:false,isOuter:false},
    storeCallBackDatas:[],
    gridViewKey:'',
    isSelf:false,
    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            store: Ext.create(projectName + '.store.rwa.param.paramSetting.parammanage.CorceproTreeStore',{
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
                       me.setRawValue(records[0].data.name);
                    }
                    //修改回显name也就是树分类
                   /* var name = Ext.getCmp(me.hiddenName).getValue();
                    if(name !=null && name !=undefined && name != ""){
                        me.setRawValue(name);
                    }*/
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
            displayField: 'name',//要在页面传递的值
            rootVisible: false,
            resizable: true
        });
        self.picker.on({
            "itemdblclick": function (combotree, rec) {
                self.picker.hide();
            },
            "itemclick": function (combotree, rec) {
                if (!rec.get('checked')) {
                    self.setRawValue(rec.get('name'));//修改处
                    if (self.hiddenOrganpath!='') {
                    	Ext.getCmp(self.hiddenOrganpath).setValue(rec.get('path'));
					}
                   Ext.getCmp(self.hiddenParentId).setValue(rec.get('corporate_id'));//将父节点id设置为上一级的id!
                   Ext.getCmp(self.hiddenName).setValue(rec.get('name'));
                   Ext.getCmp(self.hiddenLevel).setValue(rec.get('level'));
                }
            }
        });
        return self.picker;
    }
});
