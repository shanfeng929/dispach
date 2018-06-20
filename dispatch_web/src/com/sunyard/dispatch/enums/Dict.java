package com.sunyard.dispatch.enums;

/**   
 * @Description: 通用字典枚举
 * @author zhangwenfeng031  
 * @date 2016年10月24日 下午3:20:27 
 * @version Version 1.0.1
*/
public enum Dict {
	//日志错误级别
	Error_Level_Info    (1, "信息", "操作日志记录，功能运行正常！"),
	Error_Level_Debug   (2, "警告", "测试功能出错，对业务无影响，需要修复！"),
	Error_Level_Warn    (3, "紧急", "显示功能出错，对业务无影响，需及时修复！"),
	Error_Level_Error   (4, "严重", "修改功能出错，对业务有影响，短时间内可能不会引起业务问题，需尽快解决！"),
	Error_Level_Accident(5, "事故", "业务功能出错，已经对业务造成影响，需要马上解决！"),
	Error_Level_Fatal   (6, "危险", "涉及系统运程问题，直接会导致系统宕机！"),
	
	//执行结果
	Result_success(0,  "执行成功","系统指定功能执行成功"),
	Result_failure(-1, "执行失败","系统指定功能执行失败"),
	
	;
	private Integer value;
	private String name;
	private String desc;
	
	private Dict(Integer value, String name, String desc) {
		this.value = value;
		this.name = name;
		this.desc = desc;
	}
	
	public Integer getValue() {
		return value;
	}

	public void setValue(Integer value) {
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public static String getName(Integer value){
		for(Dict data : Dict.values()){
			if(value == data.value){
				return data.getName();
			}
		}
		return null;
	}
	
	public static String getDesc(Integer value){
		for(Dict data : Dict.values()){
			if(value == data.value){
				return data.getDesc();
			}
		}
		return null;
	}
	
	public static Dict getDict(Integer value){
		for(Dict data : Dict.values()){
			if(value == data.value){
				return data;
			}
		}
		return null;
	}
}
