/**
 * 备注:
 *             
 */
Ext.define(projectName + '.lib.component.DynamicGrid',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.dynamicGrid',
	requires: [projectName + '.lib.Constants',projectName + '.lib.functions.Formater'],
	columnLines: true,
	//列初始化为空
	columns:[],
	
	storeUrl: '',
	
	//配置actionColumns
	actionColumns: {},
	
	autoScroll :true,
	
	initComponent: function() {
		var me = this;
		Ext.Ajax.request({
			
			url: me.storeUrl,
			
			success: function(response) {
				var res,store,customColumns;
				
				 res = Ext.JSON.decode(response.responseText).mapItems;
				 store = me.buildStore(res);
				 customColumns = me.buildColumns(res.columns);
				 me.reconfigure(store,customColumns);
				 me.doLayout();
			}
		});
		
    	me.callParent(arguments);
	},
	
	buildStore: function(res) {
		var me = this;
		var store = new Ext.data.Store({
			fields: me.buildFields(res.columns),
			autoLoad: false,
			proxy: {
				type: 'ajax',
				api: {
					read: me.storeUrl
				},
				reader: {
					type: 'json',
					root: 'mapItems.datas'
				}
			}
		});
		
		store.loadData(res.datas);
		
		store.on({
			load: {
				fn: function(store,node,records,successful) {
					if(successful) {
						var res,customColumns,newStore;
							res = store.getProxy().getReader().rawData.mapItems;
							customColumns = me.buildColumns(res.columns);
							
						newStore = me.buildStore(res);	
						
						me.reconfigure(newStore,customColumns);
						me.doLayout();
					}
				}
			}
	    });
		
		return store;
	},
	
	/**
	 * 
	 */
	buildFields: function(columns) {
		var fields = [];
		for(var i  = 0, j = columns.length; i < j; i++) {
			if(columns[i].columns != undefined) {
				for(var k = 0, h = columns[i].columns.length; k < h; k++) {
					fields.push({
						name: columns[i].columns[k].NAME,
						type: columns[i].columns[k].xtype != undefined ? columns[i].columns[k].xtype : 'string'
					});
				}
			} else {
				fields.push({
					name: columns[i].NAME,
					type: columns[i].xtype != undefined ? columns[i].xtype : 'string'
				});				
			}
		}
		
		return fields;
	},
	/**
	 * 构建 grid 的数据列
	 * 如果配置有 actionColumns, 则在数据列尾push 配置的actionColumns
	 */
	buildColumns: function(columns,isInnerColumns) {
		var v_columns = [],me = this,isInnerColumns = isInnerColumns || false;
		for(var i = 0, j = columns.length; i < j; i++) {
			var cfg = {};
			
			cfg.text = columns[i].TEXT;
			if(columns[i].columns != undefined) {
				cfg.columns = me.buildColumns(columns[i].columns,true);
			} else {
				cfg.dataIndex = columns[i].NAME;
				cfg.width = 150;
				if(columns[i].xtype) {
					cfg.xtype = me.getColumnType(columns[i].xtype);
					cfg.format = me.getColumnFormat(columns[i].xtype);
					cfg.align = me.getColumnAlign(columns[i].xtype);
				}				
			}
			
			v_columns.push(cfg);
		}
		
		if(!isInnerColumns && me.actionColumns.xtype) {
			v_columns.push(me.actionColumns);
		}
		return v_columns;
	},
	/**
	 * 获取数据列类型(xtype)
	 * 当前处理:
	 * 	 xtype: columnXtype + 'column'
	 * 
	 * 注: 如果为string类型，则数据源不需要有 xtype 属性 
	 */
	getColumnType: function(columnXtype) {
		var columntype;
		if(columnXtype) {
			columntype = columnXtype + 'column';
		}
		return columntype;
	},
	/**
	 * 根据列类型获取列的 format 属性
	 * 当前处理:
	 *  number: '0.00',
	 *  date: 'Y-m-d'
	 */
	getColumnFormat: function(columnXtype) {
		var format;
		switch(columnXtype) {
			case 'number':
				format = '0.00'; break;
			case 'date':
				format = 'Y-m-d';break;
		}
		return format;
	},
	
	/**
	 * 根据列类型得到列的显示位置: left/center/right
	 * 当前处理：仅number 类型 align = 'right'，其他为 'left'
	 */
	getColumnAlign: function(columnXtype) {
		return columnXtype == 'number' ? 'right' : 'left';
	}
});