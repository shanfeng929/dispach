package com.sunyard.dispatch.model.form;

public class TemplateManageForm extends Form {
	
	private String id;
	private String templateName;//组件名称
	private String templateDesc;//组件描述
	private String templateRemote;//组件远程服务IP
	private String templateCommand;//组件命令(执行语句)
	private String templateParameter;//组件参数
	private Integer errorNum;//容错次数
	private String templateError;//是否容错
	private String templateActive;//是否有效
	private String templateCustom;//自定义条件
	private String templateBranch;//是否是分支
	private Integer templateLoop;//循环次数
	private String paramsVal;//前台参数以key1:value;key2:value2;...格式拼接
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTemplateName() {
		return templateName;
	}
	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}
	public String getTemplateDesc() {
		return templateDesc;
	}
	public void setTemplateDesc(String templateDesc) {
		this.templateDesc = templateDesc;
	}
	public String getTemplateRemote() {
		return templateRemote;
	}
	public void setTemplateRemote(String templateRemote) {
		this.templateRemote = templateRemote;
	}
	public String getTemplateCommand() {
		return templateCommand;
	}
	public void setTemplateCommand(String templateCommand) {
		this.templateCommand = templateCommand;
	}
	public String getTemplateParameter() {
		return templateParameter;
	}
	public void setTemplateParameter(String templateParameter) {
		this.templateParameter = templateParameter;
	}
	public Integer getErrorNum() {
		return errorNum;
	}
	public void setErrorNum(Integer errorNum) {
		this.errorNum = errorNum;
	}
	public String getTemplateError() {
		return templateError;
	}
	public void setTemplateError(String templateError) {
		this.templateError = templateError;
	}
	public String getTemplateActive() {
		return templateActive;
	}
	public void setTemplateActive(String templateActive) {
		this.templateActive = templateActive;
	}
	public String getTemplateCustom() {
		return templateCustom;
	}
	public void setTemplateCustom(String templateCustom) {
		this.templateCustom = templateCustom;
	}
	public String getTemplateBranch() {
		return templateBranch;
	}
	public void setTemplateBranch(String templateBranch) {
		this.templateBranch = templateBranch;
	}
	public Integer getTemplateLoop() {
		return templateLoop;
	}
	public void setTemplateLoop(Integer templateLoop) {
		this.templateLoop = templateLoop;
	}
	public String getParamsVal() {
		return paramsVal;
	}
	public void setParamsVal(String paramsVal) {
		this.paramsVal = paramsVal;
	}
	
	
}
