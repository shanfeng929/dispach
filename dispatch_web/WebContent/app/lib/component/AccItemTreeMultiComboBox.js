var names = [],values = []; 
Ext.define(projectName + '.lib.component.AccItemTreeMultiComboBox', {
	extend: "Ext.form.field.Picker",
    requires: ['Ext.tree.Panel',projectName + '.lib.Constants'],
    alias: 'widget.accItemTreeMultiCombo',
//    fieldLabel : '账户项',
//    labelWidth:100,
//    height:20,
//    width:250,
    
    editable:false,
    // 关联存储 该组件键值的 组件ID
    hiddenCatId:'',
    // 即按具体需要,可以是 ‘id’ 或 ‘code’
    catValueField: 'id',
    //是否初始化后store 加载
    loadAfterRender: true,
    initComponent: function () {
   },
    createPicker: function () {
        var self = this;
        var store = self.store;
        self.picker = new Ext.tree.Panel({
        	width: 340,
            autoScroll: true,
            floating: true,
            focusOnToFront: true,
            shadow: true,
            ownerCt: this.ownerCt,
            useArrows: true,
            store: store,
            rootVisible: false,
            resizable: true
        });
        self.picker.on({
            "itemdblclick": function (combotree, rec) {
                self.picker.hide();
            },
            'checkchange': function(record, checked) {
                if (checked == true) {
                	record.set('checked', true);
                } else if (checked == false) {
                	record.set('checked', false);
                }
                
                var records = self.picker.getView().getChecked(),
                names = [],values = [];
                Ext.Array.each(records,function(rec) {
                	if (rec.get('children') != null && rec.get('children') != "") {
                		if (rec.get('ID') == rec.get('children').get('PARENT_ID1')) {
                			records.set('checked',true);
                		}
                	}
                	if (rec.get('leaf')) {
	                	names.push(rec.get('TEXT'));
	                    values.push(rec.raw.ID);
                	}
                });
                self.setValue(names.join(',')); // 显示值
                Ext.getCmp(self.hiddenCatId).setValue(values.join(','));
            },
            "itemclick": function (combotree, rec,item, index, e, options) {
            	
            }

        });
        return self.picker;
    }
});