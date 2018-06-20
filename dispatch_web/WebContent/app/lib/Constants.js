Ext.define(projectName +'.lib.Constants', {

	singleton : true,

	align_number : 'right',

	NUMBERALIGN : 'right',

	showColumnLine : false,

	NOPAGE : 1000000,

	queryALL_S : '0',

	queryALL_Index : 0,
	
	queryALL_I : 0,

	FIRST_PAGE : 1,
	
	PAGE_SIZE : 25,

	IS_TABLE_HEAD : 1,

	MSG_TITLE_INFO : '提示',
	
	MSG_LOAD_DATA_FAILURE:'查询数据列表出错，请联系管理员！',
	
	MSG_CALCULATE_RESULT_NOT_EQUALS:'融资金额与本金合计的差值为：',
	
	MSG_LOADING_ADJUST:'已提交到后台，请稍候查看',
	
	MSG_NAME_EXIST:'名称已存在，请重新输入！',

	MSG_LOADING_FAILURE : '系统故障,请联系管理员!',

	MSG_CHECK_ERROR : '信息输入错误，请检查!',

	MSG_QUERYCONDITION_IS_NULL : '查询条件不能为空',

	MSG_RESULT_SUCCESS : '操作成功',

	MSG_RESULT_FAILURE : '操作失败',

	MSG_PICK_THE_YIELD_CURVE : '请选择指定的市场收益率曲线',

	MSG_PICK_THE_DEPARTMENT : '请选择指定的部门',

	MSG_PICK_THE_DATATYPE : '请选择指定的数据分类',

	MSG_PICK_THE_ADJUST : '请选择指定的产品',

	MSG_PICK_ROOT_NODE : '请选择顶级节点添加数据',

	MSG_PICK_CHILD_NODE : '请选择子节点进行修改',

	MSG_CHECK_OUT_DATE_REPEAT : '日期不允许重复，请更换日期!',

	MSG_CHECK_OUT_DATE_MINUS : '开始时间不能大于结束时间!',

	MSG_SELECTED_NOT_NULL : '请选择一条数据',
	
	MSG_SELECTED_ONE : '请至少选择一条数据',

	MSG_SELECTED_NOT_SINGLE : '只能选择一条数据',
	
	MSG_SELECT_ROOT_NODE:'请选择一条左侧的产品组节点',
	
	MSG_SELECT_RELEVANCE_PRODUCT:'请选择需要关联的产品',

	MSG_SELECT_FA_NODE : '请选择要添加产品的父节点',

	MSG_DELETE_CONFIRM : '是否要删除选中记录?',
	
	MSG_UNLOCK_MENU_CONFIRM : '是否要解锁该菜单?',
	
	MSG_LOCK_MENU_CONFIRM:'是否要删除该菜单?',
	
	MSG_RATE_EXCEEDING : '比例不能超过100！',

	MSG_SELECT_DYNAMICMODEL : '请选择动态模型',

	MSG_IS_LEAF_PRODUCT : '该节点为产品节点，请选择产品组节点添加产品',

	MSG_SELECT_CHILD_NODE : '请选择要修改的子节点',
	
	MSG_SELECT_MIN_NODE : '请选择最小粒度的子节点',
	
	MSG_LOCKED_CHILD_NODE : '请选择要锁定的子节点',

	MSG_LOCKED_INFO_NODE :'该菜单已经被锁定,请解锁',

	MSG_CANT_DELETE_ROOT_NODE : '顶级节点禁止删除',

	MSG_ONLY_NUMBER : '只能输入数字',

	MSG_NO_DATA : '该日期没有对应的数据',

	MSG_SELECT_OTHER_MODEL : '请选择不同的模型',
	
	MSG_CONDITION_CONFLICT : '条件或值有冲突，请重新输入!',

	ISSHOWSUM : true,

	DATA_ITEM : 1,

	ISLOCK : true,
	queryALL_Value : '',
	queryALL : '',

	getQueryAllItem : function() {
		return {
			'ITEM_CODE' : this.queryALL,
			'ITEM_NAME' : '--请选择--'
		};
	},

	
	/**
	 * 实验室模块
	 */
//	LAB_COMPUTE_DOMAIN : 'http://localhost:8081', //计算引擎的域名
//	COMPUTE_APPNAME : '/computeengine', //计算引擎项目名称
	
	/**
	 * 数据补录补录类型
	 */
//	TABPANEL_TYPE_LIQUID : 'liquid',
//	TABPANEL_TYPE_G3302 : 'g3302',
//	TABPANEL_TYPE_G2502 : 'g2502',
//	TABPANEL_TYPE_G2501 : 'g2501',
//	TABPANEL_TYPE_SCENE : 'scene',

	/**
	 * 客户行为假设
	 */
//	CUSTOMER_BEHAVIOR_TYPE01 : '1',// 活期沉淀
//	CUSTOMER_BEHAVIOR_TYPE02 : '2',// 提前支取
//	CUSTOMER_BEHAVIOR_TYPE03 : '3',// 提前偿付

	/**
	 * 流动性缺口类型
	 */
//	LIQUIT_GAP_DAY_GAP : 'zrqk',
//
//	CUSTOMER_BEHAVIOR_FUNCTION_TYPE1 : '1',// 参数法
//	CUSTOMER_BEHAVIOR_FUNCTION_TYPE2 : '2',// 模型法

	/**
	 * 现金流调整
	 * 
	 * @author sunyard-liziliang
	 */

//	CASH_FLOW_TUNING_TYPE1 : '1',// 现金流增项
//	CASH_FLOW_TUNING_TYPE2 : '2',// 融资能力评估
//	CASH_FLOW_TUNING_TYPE3 : '3',// 违约损失评估
//	CASH_FLOW_TUNING_TYPE4 : '4',// 批发借款能力评估

//	STATUS_COMMON : 0,
//	STATUS_NEW_NON : 1,
//	STATUS_DELETE_NON : 2,
//	STATUS_DELETE : 4,

//	REPORT_TYPE_SUPERVISE : "1",
//	REPORT_TYPE_STATIC : "2",
//	REPORT_TYPE_DYNAMIC : "3",
//	REPORT_TYPE_COMPARE : "4",
	//客户行为参数
//	TYPE_BEHAVIOR : "1",
	//融资兑现率
//	TYPE_CONVERSION : "2",
	//业务增长率
//	TYPE_MOIG : "3",
	//违约概率参数
//	TYPE_VIOLATE : "4",
	

	/**
	 * 数据定义的公式类型
	 */
//	DATADEFINE_FORMULATYPE1 : '1',// 列公式
//	DATADEFINE_FORMULATYPE2 : '2',// 自定义
	/** 曲线类型，2表示“多种曲线类型结构” */
//	CURVEMAINTAIN_CURVE_TYPE : '2',
	/** 固定值'主利率(%)' 表示单一曲线结构时的市场收益率曲线的利率 */
//	YIELD_CURVE_MAIN_RATE : "主利率(%)",
	/** 单一曲线结构下的市场收益率曲线的term_set_id */
//	YIELD_CURVE_TERM_SET_ID : "-99999",

	/** 节假日维护功能可以查询的距当前年份的前后年份范围 */
//	HOLIDAY_SEARCH_RANGE : 5,

	/**
	 * 数据定义的公式类型
	 */
//	DATADEFINE_FORMULATYPE1 : '1',// 列公式
//	DATADEFINE_FORMULATYPE2 : '2',// 自定义

	/**
	 * 数据类型 1:帐户数据,2:客户信息,3:利率
	 */
//	DATA_ITEM : "1",
//	DATA_CUSTOMER : "2",
//	DATA_RATE : "3",

	/**
	 * 是否为外部文件
	 */
//	IS_OUTER : "1",
//	NO_OUTER : '0',

//	STATUS_COMMON : 0,
//	STATUS_NEW_NON : 1,
//	STATUS_DELETE_NON : 2,
//	STATUS_DELETE : 4,

	/**
	 * 映射实体
	 */
//	IS_MODEL : "1",
//	NO_MODEL : '0',

	/**
	 * 字段类型: 8:字符串,1:整数,2:浮点数,3:日期,4:日期字符串
	 */
//	TYPE_INT : "1",
//	TYPE_FLOAT : "2",
//	TYPE_DATE : "3",
//	TYPE_DATE_STRING : "4",
//	TYPE_STRING : "8",

	/**
	 * 组合类型: OR:或,AND:与
	 */
//	CONDITION_TYPE_OR : "OR",
//	CONDITION_TYPE_AND : "AND",

	/**
	 * 条件类型: '1':字典枚举,'2':比较,'3':区间,'4':字段枚举
	 */
//	FILTER_TYPE_DICT : '1',
//	FILTER_TYPE_TABLE : '4',
//	FILTER_TYPE_COMPARE : '2',
//	FILTER_TYPE_RANGE : '3',

	/**
	 * 操作:
	 */
//	OPERATOR_NOT_EQUEL : '!=',
//	OPERATOR_EQUEL : '==',
//	OPERATOR_LT : '<',
//	OPERATOR_LT_EQUEL : '<=',
//	OPERATOR_GT : '>',
//	OPERATOR_GT_EQUEL : '>=',

	/**
	 * 字段取值位置: 3:未维护,1:数据字典,2:字段取值,4:系统数据
	 */
//	LOCATION_DICT : "1",
//	LOCATION_TABLE : "2",
//	LOCATION_UNKNOW : "3",
//	LOCATION_SYS : "4",

//	STATUS_COMMON : 0,
//	STATUS_NEW_NON : 1,
//	STATUS_DELETE_NON : 2,
//	STATUS_DELETE : 4,

	/**
	 * 数据定义的公式类型
	 */
//	DATADEFINE_FORMULATYPE1 : '1',// 列公式
//	DATADEFINE_FORMULATYPE2 : '2',// 自定义

	/**
	 * 定义缺口集类型
	 */
//	TERM_SET_PURPOSE_CASHFLOW : 'xjlqk',// 现金流缺口
//	TERM_SET_PURPOSE_REPRICE : 'cdjqk',// 重定价缺口
//	TERM_SET_PURPOSE_FLOWSTATUS : 'ldxqk',// 流动性缺口

	/**
	 * 是否
	 */
//	YES_OR_NO_YES : '1',// 是
//	YES_OR_NO_NO : '0',// 否

	getTreeRootFiltersFields : function() {
		return [ 'parentId', 'index', 'depth', 'expanded', 'expandable', 'checked', 'leaf', 'cls', 'iconCls', 'icon', 'isLast', 'isFirst', 'allowDrop',
				'allowDrag', 'loaded', 'loading', 'href', 'hrefTarget', 'qtip', 'qtitle', 'qshowDelay', 'children', 'root' ];
	},

	/**
	 * 台账数据类型
	 * @  注意：当为多个时，用“,”隔开，中间一定不要有空格
	 */
//	STANDING_BOOK_DRAWINGS : 'Drawings', // 提款
//	STANDING_BOOK_YP : 'TaelsAccount', // 银票
//	STANDING_BOOK_OD : 'Od', // OD
//	STANDING_BOOK_TD : 'Td', // 定期投资
//	STANDING_BOOK_DD : 'Dd', // 活期投资
//	STANDING_BOOK_FX : 'Fx', //汇率远期
//	STANDING_BOOK_FP : 'Fp', //远期汇率协议
//	STANDING_BOOK_FE : 'Fe', //外汇互换
//	STANDING_BOOK_IRS : 'Irs', //利率互换
//	STANDING_BOOK_CE : 'Ce', //货币互换
//	STANDING_BOOK_MF : 'Drawings,TaelsAccount,Od',//月融资计划
//	STANDING_BOOK_WF : 'Drawings,TaelsAccount,Od',//周融资计划
//	STANDING_BOOK_YHCK : 'BankDeposit', // 银行存款
//	STANDING_BOOK_SZ : 'IncomeExpense', // 收支
//	STANDING_BOOK_OP : 'OutwardPromise', // 对外承诺台账
//	STANDING_BOOK_CL : 'Drawings,TaelsAccount,Od', // 交易额度
//	STANDING_BOOK_IA : 'Td,Dd', // 投资额度管理

	/**
	 * 复核状态
	 */
//	REVIEW_STATUS_DFH : 'DFH', // 待复核
//	REVIEW_STATUS_YFH : 'YFH', // 已复核
//	REVIEW_STATUS_YJJ : 'YJJ', // 已拒绝
	/**
	 * 业务投放状态里面的预测类型
	 */
//	FORECAST_TYPE_FLOW : 'FORECAST_TYPE_FLOW', // 流程预测
//	FORECAST_TYPE_HISTORY : 'FORECAST_TYPE_HISTORY', // 历史预测
//	FORECAST_TYPE_OPPLAN : 'FORECAST_TYPE_OPPLAN', // 基于经营计划预测

	/**
	 * 业务投放状态里面的预测时间步区分
	 */
//	FLOW_TIME_STEP : 'FLOW_TIME_STEP', // 流程预测
//	HISTORY_TIME_STEP : 'HISTORY_TIME_STEP', // 历史预测
//	FORECAST_TIME_STEP : 'FORECAST_TIME_STEP', // 基于经营计划预测
//	COMPOSITE_TIME_STEP : 'COMPOSITE_TIME_STEP', // 基于经营计划预测

	
	
	/** 业务投放申报：数据流程状态 */
//	PROCESS_STATUS_HAS_REFUSE:-1,//已拒绝
//	PROCESS_STATUS_HAS_NOT_SUBMIT:0,//未提交
//	PROCESS_STATUS_HAS_SUBMIT:1,//已提交
	/** 融资或申报流程未提交申请 */
//	FINANCE_APPLICATE_STATUS_DY_HAS_NOT_SUBMIT : 0,
	/** 融资或申报流程已提交申请（表示数据正在审批流程中） */
//	FINANCE_APPLICATE_STATUS_DY_HAS_SUBMIT : 1,
	/** 融资或申报流程完成（表示最终审批通过） */
//	FINANCE_APPLICATE_STATUS_DY_HAS_FINISHED : 2,
	/** 融资或申报反馈未提交申请 */
//	FINANCE_APPLICATE_STATUS_FD_HAS_NOT_SUBMIT : 3,
	/** 融资或申报反馈已提交申请（表示数据正在审批流程中） */
//	FINANCE_APPLICATE_STATUS_FD_HAS_SUBMIT : 4,
	/** 融资或申报反馈完成（表示最终审批通过） */
//	FINANCE_APPLICATE_STATUS_FD_HAS_FINISHED : 5,
	/** 融资或申报削减未提交申请 */
//	FINANCE_APPLICATE_STATUS_FR_HAS_NOT_SUBMIT : 6,
	/** 融资或申报削减已提交申请（表示数据正在审批流程中） */
//	FINANCE_APPLICATE_STATUS_FR_HAS_SUBMIT : 7,
	/** 融资或申报削减完成（表示最终审批通过） */
//	FINANCE_APPLICATE_STATUS_FR_HAS_FINISHED : 8,

	/** 业务投放申报按月 */
//	FINANCE_APPLICATION_TYPE_MONTH : 1,
	/** 业务投放申报按年 */
//	FINANCE_APPLICATION_TYPE_WEEK : 2,
	/** 融资未削减处理 */
//	FINANCE_REDUCE_IS_NOT_PROCESSING : 0,
	/** 融资削减处理中 */
//	FINANCE_REDUC_IS_PROCESSING : 1,
	/** 融资削减处理完成 */
//	FINANCE_REDUCE_HAS_FINISHED : 2,

	/**
	 * 流程实例名称
	 */
//	PROCINSTANCE_MONTH_FINANCE_DETAIL : 'MonthFinance',// 业务投放申报->月融资计划流程
//	PROCINSTANCE_MONTH_FINANCE_FEEDBACK : 'MonthFinanceFee',// 业务投放申报->月融资反馈
//	PROCINSTANCE_MONTH_FINANCE_REDUCE : 'MonthFinanceRdc',// 业务投放申报->月融资削减
	
//	PROCINSTANCE_WEEK_FINANCE_DETAIL : 'WeekFinance',// 业务投放申报->周融资计划流程
//	PROCINSTANCE_WEEK_FINANCE_FEEDBACK : 'WeekFinanceFee',// 业务投放申报->周融资反馈
//	PROCINSTANCE_WEEK_FINANCE_REDUCE : 'WeekFinanceRdc',// 业务投放申报->周融资削减
	
//	PROCINSTANCE_MONTH_REPORT : 'MonthReport',// 业务投放申报->月度申报流程
//	PROCINSTANCE_MONTH_REPORT_FEEDBACK : 'MonthReportFee',// 业务投放申报->月度资金反馈流程
//	PROCINSTANCE_MONTH_REPORT_REDUCE :'MonthReportRdc',// 业务投放申报->月度资金削减流程
	
//	PROCINSTANCE_WEEK_REPORT : 'WeekReport',// 业务投放申报->周度申报流程
//	PROCINSTANCE_WEEK_REPORT_FEEDBACK : 'WeekReportFee',// 业务投放申报->周度资金反馈流程
//	PROCINSTANCE_WEEK_REPORT_REDUCE :'WeekReportRdc',// 业务投放申报->月度资金削减流程
	
//	PROCINSTANCE_TEMP_FUNDS_REPORT : 'TempReportFund',// 临时资金占用->临时资金申领流程
	/**
	 * 工作流任务状态
	 */
//	WORKITEMSTATE_INACTIVED : 0, // 未激活
//	WORKITEMSTATE_INITIAL : 1, // 初始化
//	WORKITEMSTATE_APPLY_WAITING : 2,// 等待申请
//	WORKITEMSTATE_APPLY : 3,// 申请中
//	WORKITEMSTATE_RUNNING : 4,// 运行中
//	WORKITEMSTATE_SUPEND : 5,// 挂起
//	WORKITEMSTATE_COMPLETED : 6,// 完成
//	WORKITEMSTATE_TERMINATED : 7,// 终止
//	WORKITEMSTATE_REVOKED : 9,// 被撤销

	/***************************************************************************
	 * 预测方式
	 **************************************************************************/
//	FORECASTTYPE_ZHYC : 1, // 综合预测
//	FORECASTTYPE_FXYC : 2,// 分项预测
	/**
	 * 机构类型
	 */
	// 1 机构 2 虚拟部门 3事业部门 3普通部门 5行业 6区域
//	SYS_ORGAN_TYPE_JG : 1,
//	SYS_ORGAN_TYPE_XNBM : 2,
//	SYS_ORGAN_TYPE_SYBM : 3,
//	SYS_ORGAN_TYPE_PTBM : 4,
//	SYS_ORGAN_TYPE_HY : 5,
//	SYS_ORGAN_TYPE_QY : 6,
	
	/**
	 * 曲线类型
	 */
//	TERM_CURVE_TYPE_DY : 1, 
//	TERM_CURVE_TYPE_DZ : 2, 
//	TERM_CURVE_TYPES_NAMES : ['','单一期限类型','多种期限类型'],
	/**
	 * 压力级别常量
	 */
//	PRESS_NAME : ['','正常情况','轻度压力','中度压力','严重压力'],
	/**
	 * 系统参数类型
	 */
//	PARAMS_TYPE_ZQ : 'ZQ',
//	PARAMS_TYPE_GJ : 'GJ',
//	PARAMS_TYPE_YH : 'YH',
//	PARAMS_TYPE_DFZF : 'DFZF',
//	PARAMS_TYPE_DBKF_BANK : 'DBKF_BNK',//多变开发银行
//	PARAMS_TYPE_GJQS_BANK : 'GJQS_BNK',//国际清算银行
//	PARAMS_TYPE_GJHB_INS : 'GJHS_INS',//国际货币基金组织
//	PARAMS_TYPE_FZYZF_SEC : 'FZYZF_SEC',//非中央政府公共部门
//	PARAMS_TYPE_JRJG : 'JRJG',
//	PARAMS_TYPE_ZCX_BANK : 'ZCX_BNK',//政策性银行
//	PARAMS_TYPE_GFZ_BANK : 'GFZ_BNK',//股份制商业银行
//	PARAMS_TYPE_CS_BANK : 'CS_BNK',//城市商业银行
//	PARAMS_TYPE_NC_BANK : 'NC_BNK',//农村商业银行
//	PARAMS_TYPE_NC_COO : 'NC_COO',//农村信用社
//	PARAMS_TYPE_NCHZ_BANK : 'NCHZ_BNK',//农村合作银行
//	PARAMS_TYPE_CZ_BANK : 'CZ_BNK',//村镇银行
//	PARAMS_TYPE_HZ_BANK : 'HZ_BNK',//合资银行
//	PARAMS_TYPE_YZCX_BANK : 'YZCX_BNK',//邮政储蓄银行
//	PARAMS_TYPE_XXNC_INS : 'XXNC_INS',//三类新型农村金融机构
//	PARAMS_TYPE_WZ_BANK : 'WZ_BNK',//外资银行
	
//	PARAMS_TYPE_ZQ_CMY : 'ZQ_CMY',//证券公司
//	PARAMS_TYPE_BX_CMY : 'BX_CMY',//保险公司
//	PARAMS_TYPE_ZCGL_CMY : 'ZCGL_CMY',//资产管理公司
//	PARAMS_TYPE_XT_CMY : 'XT_CMY',//信托公司
//	PARAMS_TYPE_JJGL_CMY : 'JJ_CMY',//基金管理公司
//	PARAMS_TYPE_BXZCGL_CMY : 'BXZCGL_CMY',//保险资产管理公司
//	PARAMS_TYPE_QTZCGL_CMY : 'QTZCGL_CMY',//其他资产管理公司
//	PARAMS_TYPE_JRZCGL_CMY : 'JRZC_CMY',//金融资产管理公司
//	PARAMS_TYPE_CW_CMY : 'CW_CMY',//财务公司
//	PARAMS_TYPE_JRZL_CMY : 'JRZL_CMY',//金融租赁公司
//	PARAMS_TYPE_QCJR_CMY : 'QCJR_CMY',//汽车金融公司
//	PARAMS_TYPE_HBJR_CMY : 'HBJR_CMY',//货币经纪公司
//	PARAMS_TYPE_XFJR_CMY : 'XFJR_CMY',//消费金融公司
//	PARAMS_TYPE_QH_CMY : 'QH_CMY',//期货公司
//	PARAMS_TYPE_DK_CMY : 'DK_CMY',//贷款公司
//	PARAMS_TYPE_QTJR_INS : 'QTJR_INS',//其他金融机构
		
//	PARAMS_TYPE_HY_CS : 'HY_CS',//行业
//	PARAMS_TYPE_DG_XD : 'DG_XD',//对公
//	PARAMS_TYPE_DS_XD : 'DS_XD',//对私
	
	/** 任务链执行周期 */
	TASK_CYCLE_TYPE : [ [ 'DAY', '日' ], ['WEEK', '周' ], [ 'MONTH', '月' ],['SEASON','季'],['YEAR','年'] ],
	TASK_CYCLE_WEEK : [ ['MON_OF_WEEK','周一'], ['TUE_OF_WEEK','周二'], ['WED_OF_WEEK','周三'], ['THU_OF_WEEK','周四'], ['FRI_OF_WEEK','周五'], ['SAT_OF_WEEK','周六'], ['SUN_OF_WEEK','周日'] ],
	/** 任务链参数类型 */
	FLOW_PARAM_TYPE : [ ['String','String'], ['Integer','Integer'], ['Double','Double'] ]
});