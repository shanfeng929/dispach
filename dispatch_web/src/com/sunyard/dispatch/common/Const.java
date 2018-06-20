package com.sunyard.dispatch.common;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.atomic.AtomicLong;

public class Const {
	public static final int ScanPeriod = 60;//
	/**对于JOB定义表的flow_status字段，若为1:正常运行，0:还未运行，或运行结束  ,3:暂停  ，4:终止 */
	public static String JOB_STATE_RUNNING = "1";
	public static String JOB_STATE_SUSPEND = "3";
	public static String JOB_STATE_TERMINATE = "4"; //被动终止
//	public static String JOB_STATE_ERROR = "5"; 没有错误状态
	public static String JOB_STATE_COMPLETE = "0";
	public static String JOB_STATE_JUMP="7";//跳过
	
	/**对于TASK的定义表的task_status字段，1: 日志正在记录中，2：运行成功 3：运行失败*/
	public static String TASK_STATE_RUNNING = "1";
	public static String TASK_STATE_ERROR = "3";
	public static String TASK_STATE_OK = "2";
	public static String TASK_STATE_COMPLETE ="4";//当做未执行，在流程跑完时，(表TASKNAME)要把所有节点更新为该状态
	public static String TASK_STATE_JUMP="7";//跳过
	
	/** 用于JOB定义表的定时任务下次执行时间 */
	public static String TASK_CYCLE_DAY = "DAY";
	public static String TASK_CYCLE_WEEK = "WEEK";
	public static String TASK_CYCLE_MONTH = "MONTH";
	public static String TASK_CYCLE_SEASON = "SEASON";
	public static String TASK_CYCLE_YEAR = "YEAR";
	
	/** 用于判断任务类型 */
	public static String TASK_TYPE_LINUX = "1";
	public static String TASK_TYPE_SQL = "5";
	public static String TASK_TYPE_JAVA = "6";
	public static String TASK_TYPE_ALARM_SINGLE = "7";
	public static String TASK_TYPE_ALARM_TITLE = "8";
	public static String TASK_TYPE_ALARM_MULTIPLE = "9";
	
	public static String PARAM_TYPE_INTEGER = "Integer";
	public static String PARAM_TYPE_STRING = "String";
	public static String PARAM_TYPE_DOUBLE = "Double";
	
	/** 转发客户风险预警系统获取模型信息 */
	public static String CRWM_URL = "http://172.16.4.164:8081/CRWM/";
	
	public static String currentDateTime(){
		return format.format(new Date());
	}
	public static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	public static AtomicLong JobPk;
	public static AtomicLong TaskPk;
	
	/**模型规则类别，0为存储过程，1为sql语句*/
	public static int CRWM_RULETYPE_PROCEDURE=0;
	public static int CRWM_RULETYPE_SQL=1;
}
