package com.sunyard.dispatch.model.form;

/**
 * 
 * ClassName: EtlDisPatchForm <br/>
 * Function: 任务表单. <br/>
 * Reason: TODO ADD REASON(可选). <br/>
 * date: 2016年3月23日 下午4:34:56 <br/>
 * 
 * @author CCC
 * @version
 * @since JDK 1.6
 */
public class EtlDisPatchForm {

	private String id; // id
	private String pid;// flowId
	private String taskName;// 任务名称
	private String taskCnName;// 任务中文名
	private String taskAddress;// 任务命令或执行地址
	private String taskParameter;// 执行参数
	private String errorNum; // 容错错误次数
	private String taskDesc;// 任务备注
	private String taskRemote;// 远程服务地址
	private String taskBranch;// 分支结点
	private String taskError;// 是否容错
	private Integer taskType;// 任务类型
	private String taskActive;// 是否激活
	private String taskCustom;// 自定义条件
	private String createBy;// 创建者
	private String updateBy;// 更新者
	private Integer joinNum;// 聚合数量
	private String isSubflow;// 是否子流程
	private String tempId;// 预属ID
	private String taskLoop;// 循环次数

	public String getTaskLoop() {
		return taskLoop;
	}

	public void setTaskLoop(String taskLoop) {
		this.taskLoop = taskLoop;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTaskCnName() {
		return taskCnName;
	}

	public void setTaskCnName(String taskCnName) {
		this.taskCnName = taskCnName;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getTaskAddress() {
		return taskAddress;
	}

	public void setTaskAddress(String taskAddress) {
		this.taskAddress = taskAddress;
	}

	public String getTaskParameter() {
		return taskParameter;
	}

	public void setTaskParameter(String taskParameter) {
		this.taskParameter = taskParameter;
	}

	public String getErrorNum() {
		return errorNum;
	}

	public void setErrorNum(String errorNum) {
		this.errorNum = errorNum;
	}

	public String getTaskDesc() {
		return taskDesc;
	}

	public void setTaskDesc(String taskDesc) {
		this.taskDesc = taskDesc;
	}

	public String getTaskRemote() {
		return taskRemote;
	}

	public void setTaskRemote(String taskRemote) {
		this.taskRemote = taskRemote;
	}

	public String getTaskError() {
		return taskError;
	}

	public void setTaskError(String taskError) {
		this.taskError = taskError;
	}

	public String getTaskActive() {
		return taskActive;
	}

	public void setTaskActive(String taskActive) {
		this.taskActive = taskActive;
	}

	public String getTaskCustom() {
		return taskCustom;
	}

	public void setTaskCustom(String taskCustom) {
		this.taskCustom = taskCustom;
	}

	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public String getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}

	public Integer getTaskType() {
		return taskType;
	}

	public void setTaskType(Integer taskType) {
		this.taskType = taskType;
	}

	public String getTaskBranch() {
		return taskBranch;
	}

	public void setTaskBranch(String taskBranch) {
		this.taskBranch = taskBranch;
	}

	public Integer getJoinNum() {
		return joinNum;
	}

	public void setJoinNum(Integer joinNum) {
		this.joinNum = joinNum;
	}

	public String getIsSubflow() {
		return isSubflow;
	}

	public void setIsSubflow(String isSubflow) {
		this.isSubflow = isSubflow;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getTempId() {
		return tempId;
	}

	public void setTempId(String tempId) {
		this.tempId = tempId;
	}
}
