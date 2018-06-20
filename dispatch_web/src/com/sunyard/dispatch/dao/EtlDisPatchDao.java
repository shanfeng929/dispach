package com.sunyard.dispatch.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.sunyard.dispatch.model.FlowTaskParaModel;
import com.sunyard.dispatch.model.ParametersModel;
import com.sunyard.dispatch.model.form.EtlDisPatchForm;

public interface EtlDisPatchDao {

	public List<Map<String, Object>> selectRemote(@Param("reMote") String reMote);

	public void insert(EtlDisPatchForm insertform);

	public void update(EtlDisPatchForm updateform);

	public String maxTaskId();

	public void getID();

	public void insertInIt(@Param("tempId") String tempId,
			@Param("id") String id, @Param("taskType") Integer taskType,
			@Param("createBy") String createBy,
			@Param("updateBy") String updateBy);

	public void insertTaskParaInit(String taskId,String FlowId);
	
	public String lastFlowId(@Param("id") String id);

	public void insertPrev(@Param("id") String id,
			@Param("taskType") Integer taskType,
			@Param("createBy") String createBy,
			@Param("updateBy") String updateBy);

	public String checkTaskId(@Param("id") String id);

	/* 2016/6/14quan.shen */
	public Map<String, Object> taskIsExist(@Param("id") String id);

	/* 和taskIsExist一起用，为了避免侵入，故写为两个 */
	public String taskGetOutputPara(String taskId);

	public List<Map<String, Object>> selectTaskMsg(@Param("id") String id);

	public void delete(@Param("id") String id, @Param("tempId") String tempId);

	public void deleteTempId(@Param("tempId") String tempId);

	public List<Map<String, Object>> selectParameters(
			@Param("paraName") String paraName);

	public List<String> pickUpParaIds(String taskName);

	public List<FlowTaskParaModel> pickUpParameters(int[] paraIds);

	public void setTaskInPara(String inParaIds, String taskName);

	public void setTaskOutPara(String outPara, String taskName);
	/*
	 * public void addParameters(TaskParaModel model);
	 * 
	 * public void notOverallUpdate(TaskParaModel model);
	 * 
	 * public void overallUpdate(TaskParaModel model);
	 * 
	 * public List<ParametersModel> getOverallPara(TaskParaModel model);
	 * 
	 * public void removePara(TaskParaModel model);
	 */
}
