package com.sunyard.dispatch.service;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.sunyard.dispatch.model.FlowTaskParaModel;
import com.sunyard.dispatch.model.form.EtlFlowDisPatchForm;

public interface EtlFlowDisPatchService {

	/**
	 * 
	 * SelectFlowGroup:(流程查询分组名称). <br/>
	 * 
	 * @author CCC
	 * @return
	 * @since JDK 1.6
	 */
	@Transactional
	public List<Map<String, Object>> SelectFlowGroup();

	/**
	 * 
	 * maxflowid:(新增流程获取ID). <br/>
	 * 
	 * @author CCC
	 * @return
	 * @since JDK 1.6
	 */
	@Transactional
	public String maxFlowId();

	@Transactional
	public String MaxSubFlowId(String tempId, String createBy, String updateBy);

	/**
	 * 
	 * insert:(保存流程). <br/>
	 * 
	 * @author CCC
	 * @param flowform
	 * @throws Exception
	 * @since JDK 1.6
	 */
	@Transactional
	public void insert(EtlFlowDisPatchForm flowform) throws Exception;

	/**
	 * 
	 * selectFlowMessage:(查询流程信息). <br/>
	 * 
	 * @author CCC
	 * @param id
	 * @return
	 * @since JDK 1.6
	 */
	@Transactional
	public List<Map<String, Object>> selectFlowMessage(String id);

	/**
	 * 
	 * ExecSql:(执行SQL语句). <br/>
	 * 
	 * @author CCC
	 * @param sql
	 * @since JDK 1.6
	 */
	@Transactional
	public String ExecSql(String update, String insert, String flowId,
			String username);

	/**
	 * 
	 * insertXml:(插入flow的XML格式以及前台拖拉拽OBJECT格式). <br/>
	 * 
	 * @author CCC
	 * @param xml
	 * @param loadData
	 * @param flowId
	 * @param username
	 * @since JDK 1.6
	 */
	@Transactional
	public void insertXml(String xml, String loadData, String flowId,
			String username);

	/**
	 * 
	 * SelectLoadData:(前台拖拉拽界面还原). <br/>
	 * 
	 * @author CCC
	 * @param flowId
	 * @since JDK 1.6
	 */

	@Transactional
	public String SelectLoadData(String flowId);

	@Transactional
	public String lastFlowId(String id);

	@Transactional
	public String checkFlowIdInXml(String flowId);

	@Transactional
	public void updateXml(String xml, String loadData, String flowId,
			String username);

	@Transactional
	public String checkFlowId(String id);

	@Transactional
	public void updateInIt(EtlFlowDisPatchForm flowform);

	@Transactional
	public void subFlowdelete(String id, String pid);

	@Transactional
	public void deleteTempId(String tempId);

	@Transactional
	public List<FlowTaskParaModel> getFlowPara(String flowId) throws Exception;

	@Transactional
	public void editFlowPara(FlowTaskParaModel flowParas) throws Exception;

	@Transactional
	public void deleteFlowPara(FlowTaskParaModel flowParas) throws Exception;

	@Transactional
	public void newFlowPara(FlowTaskParaModel flowParas) throws Exception;

	@Transactional
	public void insertFlowPara(FlowTaskParaModel flowParas) throws Exception;

	@Transactional
	public void removeNewFlowPara(FlowTaskParaModel flowParas) throws Exception;

	@Transactional
	public void deleteFlowPara(String[] ids) throws Exception;
}
