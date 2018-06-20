Ext.define(projectName + '.view.commons.sys.logger.LoggerGridView', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.loggerGrid',
	layout: 'fit',
    columnLines: true,
	initComponent: function () {
	    var me = this;
	    var mycombo = Ext.widget('dictionaryCombox',{
			code : 'rzdj',
			allowBlank : false
	    });
	    
	    var getDisplay = function(value,meta,record){
	    	var rowIndex = mycombo.store.find('ITEM_CODE',''+value);
	    	if(rowIndex < 0){
	    		return '';
	    	}
	    	var record = mycombo.store.getAt(rowIndex);
	    	return record?record.get('ITEM_NAME'):'';
	    }
	    
	    Ext.applyIf(this, {
//	    	selModel : Ext.create('Ext.selection.CheckboxModel'),
	    	columns: [{xtype : 'rownumberer',text : '序号',align: 'center', width: 50},
                      {text: '操作员', width: 150,align: 'center',  dataIndex: 'operator',flex:1},
                      {text: 'Ip地址', width: 150,align: 'center',  dataIndex: 'address',flex:1}, 
                      {text: '日志等级', width: 150,align: 'center',  dataIndex: 'level',editor: mycombo,renderer: getDisplay,flex:1}, 
                      {text: '操作', width: 150, align: 'center',  dataIndex: 'operation',flex:1},
                      {text: '操作内容', width: 150, align: 'center',  dataIndex: 'description',flex:1},
                      {text: '操作日期', width: 150, align: 'center',  dataIndex: 'date',flex:1}
                      ]
	                
	    });
	    me.callParent(arguments);
	 }
});