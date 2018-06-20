package com.sunyard.dispatch.service;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONArray;
import com.sunyard.dispatch.model.FlowTaskParaModel;
import com.sunyard.dispatch.model.form.EtlDisPatchForm;

public interface EtlDisPatchService {
	/**
	 * 
	 * actionShell:执行shell). <br/>
	 * 
	 * @author CCC
	 * @param serverAddress
	 * @param fileAddress
	 * @param userName
	 * @param passWord
	 * @return
	 * @since JDK 1.6
	 */
	/*
	 * @Transactional public String actionShell(String serverAddress,String
	 * fileAddress,String userName,String passWord);
	 */
	/**
	 * 
	 * selectRemote:(查询远程IP). <br/>
	 * 
	 * @author CCC
	 * @return
	 * @since JDK 1.6
	 */
	@Transactional
	public List<Map<String, Object>> selectRemote(String reMote);

	/**
	 * 
	 * insert:(插入节点新增配置信息). <br/>
	 * 
	 * @author CCC
	 * @param insertform
	 * @since JDK 1.6
	 */
	@Transactional
	public void insert(EtlDisPatchForm insertform);

	/**
	 * 
	 * updte:(更新任务节点). <br/>
	 * 
	 * @author CCC
	 * @param updateform
	 * @since JDK 1.6
	 */

	@Transactional
	public void updte(EtlDisPatchForm updateform);

	/**
	 * 
	 * delete:(删除节点). <br/>
	 * 
	 * @author CCC
	 * @param id
	 * @since JDK 1.6
	 */
	@Transactional
	public void delete(String id, String tempId);

	/**
	 * 
	 * maxTaskId:(新增节点获取ID号). <br/>
	 * 
	 * @author CCC
	 * @return
	 * @since JDK 1.6
	 */
	@Transactional
	public String maxTaskId(String tempId, String type, String createBy,
			String updateBy);

	/**
	 * 
	 * checkTaskId:(判断节点是否已经存在). <br/>
	 * 
	 * @author CCC
	 * @param id
	 * @return
	 * @since JDK 1.6
	 */
	@Transactional
	public String checkTaskId(String id);

	/**
	 * 判断节点是否存在，如存在返回一个map
	 * 
	 * @param id
	 * @return 2016/6/14 quan.shen
	 * @throws Exception 
	 */
	@Transactional
	public Map<String, Object> taskIsExist(String id) throws Exception;

	/**
	 * 
	 * selectTaskMsg:(查询已存在任务信息). <br/>
	 * 
	 * @author CCC
	 * @param id
	 * @return
	 * @since JDK 1.6
	 */
	@Transactional
	public List<Map<String, Object>> selectTaskMsg(String id);

	@Transactional
	public List<Map<String, Object>> selectParameters(String paraName);

	@Transactional
	public List<FlowTaskParaModel> pickUpParameters(String taskName)
			throws Exception;

	@Transactional
	public void setTaskInPara(String taskName, String[] ids) throws Exception;

	@Transactional
	void setTaskOutPara(String taskName, String id) throws Exception;

	/*
	 * @Transactional public List<TaskParaModel> addParameters(TaskParaModel
	 * model)throws Exception;
	 * 
	 * @Transactional public void tryEditParameters(TaskParaModel model)throws
	 * Exception;
	 * 
	 * @Transactional public void removePara(TaskParaModel model) throws
	 * Exception;
	 */
	@Transactional
	public String lastFlowId(String id);

	public JSONArray getClassMethodJson(String className);

}
