package com.sunyard.dispatch.enums;


/**   
 * @Description: 系统日志类型枚举
 * @author zhangwenfeng031  
 * @date 2016年10月24日 下午3:17:46 
 * @version Version 1.0.1
*/
public enum LogDict {

	Un_Know(Dict.Error_Level_Warn,000000,"未知操作"),
	
	Base_Datasource_Test(Dict.Error_Level_Debug, 100105,"参数管理 -> 数据源配置 -> 测试"),
	Base_Datasource_Query(Dict.Error_Level_Warn, 100101,"参数管理 -> 数据源配置 -> 搜索"),
	Base_Datasource_Find(Dict.Error_Level_Error,  100102,"参数管理 -> 数据源配置 -> 添加"),
	Base_Datasource_Save(Dict.Error_Level_Error,  100103,"参数管理 -> 数据源配置 -> 修改"),
	Base_Datasource_Delete(Dict.Error_Level_Error,100104,"参数管理 -> 数据源配置 -> 删除"),
	
	Base_Linux_Test (Dict.Error_Level_Debug, 100205,"参数管理 -> 远程服务配置 -> 测试"),
	Base_Linux_Query(Dict.Error_Level_Warn, 100201,"参数管理 -> 远程服务配置 -> 搜索"),
	Base_Linux_Find(Dict.Error_Level_Error,  100202,"参数管理 -> 远程服务配置 -> 添加"),
	Base_Linux_Save(Dict.Error_Level_Error,  100203,"参数管理 -> 远程服务配置 -> 修改"),
	Base_Linux_Delete(Dict.Error_Level_Error,100204,"参数管理 -> 远程服务配置 -> 删除"),
	
	Base_Menu_Query   (Dict.Error_Level_Error, 100301,"主页面 -> 菜单查询"),
	Base_Menu_SubQuery(Dict.Error_Level_Error, 100302,"主页面 -> 子菜单查询"),
	
	Base_Task_Query(Dict.Error_Level_Warn, 100401,"参数管理 -> 任务链包管理 -> 搜索"),
	Base_Task_Save(Dict.Error_Level_Error,  100402,"参数管理 -> 任务链包管理 -> 添加"),
	Base_Task_Update(Dict.Error_Level_Error,  100403,"参数管理 ->任务链包管理 -> 修改"),
	Base_Task_Delete(Dict.Error_Level_Error,100404,"参数管理 -> 任务链包管理 -> 删除"),
	
	
	Log_Query   (Dict.Error_Level_Warn,100001,"参数管理 -> 操作日志 -> 查询"),
	Log_Download(Dict.Error_Level_Warn,100002,"参数管理 -> 操作日志 -> 导出"),
	
	Task_Schedule_Test(Dict.Error_Level_Debug, 200105,"任务流程管理 -> 任务调度管理 -> 测试"),
	Task_Schedule_Query(Dict.Error_Level_Warn, 200101,"任务流程管理 -> 任务调度管理 -> 搜索"),
	Task_Schedule_Save(Dict.Error_Level_Error,  200102,"任务流程管理 -> 任务调度管理 -> 添加"),
	Task_Schedule_Update(Dict.Error_Level_Error,  200103,"任务流程管理 -> 任务调度管理 -> 修改"),
	Task_Schedule_Delete(Dict.Error_Level_Error,200104,"任务流程管理 -> 任务调度管理 -> 删除"),
	Task_Schedule_Start(Dict.Error_Level_Error,200106,"任务流程管理 -> 任务调度管理 -> 运行"),
	Task_Schedule_FlowExport(Dict.Error_Level_Error,200110,"任务流程管理 -> 任务调度管理 -> 任务导出"),
	Task_Schedule_FlowHistoryExport(Dict.Error_Level_Error,200111,"任务流程管理 -> 任务调度管理 -> 任务执行历史导出"),
	Task_Schedule_FlowTaskHistoryExport(Dict.Error_Level_Error,200112,"任务流程管理 -> 任务调度管理 -> 任务执行详情导出"),
	
	Task_Monitor_Query(Dict.Error_Level_Warn, 200201,"任务执行监控 -> 运行中任务链 -> 搜索"),
	Task_Monitor_Stop(Dict.Error_Level_Error, 200202,"任务执行监控 -> 运行中任务链 -> 暂停"),
	Task_Monitor_ReStart(Dict.Error_Level_Error, 200203,"任务执行监控 -> 运行中任务链 -> 重启"),
	Task_Monitor_Terminate(Dict.Error_Level_Error, 200204,"任务执行监控 -> 运行中任务链 -> 终止"),
	Task_Monitor_Detail(Dict.Error_Level_Error, 200205,"任务执行监控 -> 运行中任务链 -> 详情"),
	
	
	Task_History_Query(Dict.Error_Level_Warn, 200401,"任务执行监控 -> 历史任务链查询  -> 搜索"),
	
	Task_Chain_Query(Dict.Error_Level_Warn, 200301,"任务流程管理 -> 任务链定义 -> 搜索"),
	Task_Chain_Save(Dict.Error_Level_Error, 200302,"任务流程管理 -> 任务链定义 -> 保存"),
	Task_Chain_Update(Dict.Error_Level_Error, 200303,"任务流程管理 -> 任务链定义 -> 修改"),
	Task_Chain_Delete(Dict.Error_Level_Error, 200304,"任务流程管理 -> 任务链定义 -> 删除"),
	Task_Chain_Select(Dict.Error_Level_Error, 200305,"任务流程管理 -> 任务链定义 -> 选择"),
	Task_Chain_Add(Dict.Error_Level_Error, 200306,"任务流程管理 -> 任务链定义 -> 添加"),
	Task_Chain_Remove(Dict.Error_Level_Error, 200307,"任务流程管理 -> 任务链定义 -> 移动"),
	
	Task_Paramter_Update(Dict.Error_Level_Error, 20030301,"任务链定义 -> 流程参数配置 -> 修改"),
	Task_Paramter_Delete(Dict.Error_Level_Error, 20030302,"任务链定义 -> 流程参数配置 -> 删除"),

	;
	private Integer code;
	private String name;
	private Dict level; 
	
	private LogDict(Dict level, Integer code, String name) {
		this.code = code;
		this.name = name;
		this.level = level;
	}
	public Integer getCode() {
		return code;
	}
	public void setCode(Integer code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public Dict getLevel() {
		return level;
	}
	public void setLevel(Dict level) {
		this.level = level;
	}
	
	public static String getNameByCode(Integer code){
		for(LogDict data : LogDict.values()){
			if(code == data.getCode()){
				return data.getName();
			}
		}
		return null;
	}
}
