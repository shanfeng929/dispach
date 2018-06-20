Ext.define('base.support.enums.SearchEnums', {
	alternateClassName: 'SE',
    singleton: true,

//    valueType
//    operator

    valType: {//搜索数据类型
    	STRING	: 'STRING',
		LONG : 'LONG',
		INTEGER : 'INTEGER',
		DOUBLE : 'DOUBLE',
		VTDATE : 'VTDATE',
		VTDATETIME : 'VTDATETIME',
		VBOOLEAN : 'VBOOLEAN',
		PROPERTY : 'PROPERTY'
		
    },
    
    oper: {//搜索操作
    	EQUAL : 'EQUAL',
		NOT_EQUAL : 'NOT_EQUAL',
		LIKE : 'LIKE',
		NOT_LIKE : 'NOT_LIKE',
		LIKE_LEFT : 'LIKE_LEFT',
		LIKE_RIGHT : 'LIKE_RIGHT',
		BETWEEN : 'BETWEEN',
		GREATER_THAN : 'GREATER_THAN',
		LESS_THAN : 'LESS_THAN',
		GREATER_EQUAL : 'GREATER_EQUAL',
		LESS_EQUAL : 'LESS_EQUAL',
		IN : 'IN',
		NOT_IN : 'NOT_IN',
		IS_NULL : 'IS_NULL',
		IS_NOT_NULL : 'IS_NOT_NULL',
		BOOLEAN_NULL : 'BOOLEAN_NULL',
		NULL : 'NULL',
		ORDER_BY : 'ORDER_BY',
		ORDER_ASC : 'ORDER_ASC',
		ORDER_DESC : 'ORDER_DESC'
    },
    
    dateType: {//dateType选择查询项
    	YEAR: '4',
    	SEASON: '3',
    	MONTH: '2',
    	DAY: '1'
    },
    
    seasonType: {//dateType组件中季度的列表
    	SEASON_ONE: '1',
    	SEASON_TWO: '2',
    	SEASON_THREE: '3',
    	SEASON_FOUR: '4'
    }
    
});

