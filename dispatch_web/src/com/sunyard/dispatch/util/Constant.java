package com.sunyard.dispatch.util;

import java.io.Serializable;

public final class Constant implements Serializable {

	private static final long serialVersionUID = 8330337486430544601L;

	/**
	 * 操作信息
	 */
	public final static class OperationTips {
		/** 成功信息 */
		public static final String SUCCESS = "操作成功！";
		/** 出错信息 */
		public static final String ERROR = "操作失败！";
		/** 重复信息 */
		public static final String REPEAT = "记录已经存在，请检查后重试！";
	}

	/**
	 * 日志级别
	 */
	public static class LogLevel {
		/** 信息 */
		public static final Integer INFO = 1;
		/** 警告 */
		public static final Integer WARNING = 2;
		/** 错误 */
		public static final Integer ERROR = 3;
		/** 严重问题 */
		public static final Integer SERIOUS_PROBLEM = 4;
		/** 极严重问题 */
		public static final Integer VERY_SERIOUS_PROBLEM = 5;
	}
	
	/**
	 * 数据状态 是否可用
	 */
	public static class DataStatus {
		/** 可用 */
		public static final Integer DATA_STATUS_COMMIT = 1;
		/** 不可用 */
		public static final Integer DATA_STATUS_DELETE = 0;
	}
	
	public static class DispatchMenu {
		public static final String TASKLINE_DEFINE = "任务链定义";
		public static final String TASK_DISPATCH_MANAGE = "任务调度管理";
		public static final String TASK_EXECUTE_MONITOR = "任务执行监控";
		public static final String REMOTE_IP_MANAGE = "远程服务配置";
		public static final String TASKPACKAGE_MANAGE = "任务链包管理";
		public static final String DATASOURCE_MANAGE = "数据源配置";
		public static final String OPERAT_LOG = "调度操作日志";
	}
	
	public static class GooFlow_NodeType {
		public static final String NODE_LINUX = "linux";
		public static final String NODE_SQL = "sql";
		public static final String NODE_JAVA = "java";
		public static final String NODE_ALARM = "alarm";
	}
	
	/*新增 */
	/**远程服务器类型*/
	public static class REMOTE_TYPE{
		public static final String TYPE_WINDOWS = "WINDOWS";
		public static final String TYPE_LINUX = "LINUX";
	}
	/** 调度引擎IP、端口 */
	public static class SERVICE_REG{
		public static final String ENGINE_IP = "172.16.15.10";//109
		public static final String ENGINE_IP_LOCAL = "127.0.0.1";
		public static final Integer ENGINE_PORT = 7788;
	}
}
