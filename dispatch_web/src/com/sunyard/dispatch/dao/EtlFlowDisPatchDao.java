package com.sunyard.dispatch.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.sunyard.dispatch.model.FlowTaskParaModel;
import com.sunyard.dispatch.model.form.EtlFlowDisPatchForm;
import com.sunyard.dispatch.model.form.FlowManageForm;

public interface EtlFlowDisPatchDao {

	public List<Map<String, Object>> SelectFlowGroup();

	public List<Map<String, Object>> selectFlowMessage(@Param("id") String id);

	public String lastFlowId(@Param("id") String id);

	public String maxFlowId();

	public void insertInIt(@Param("tempId") String tempId,
			@Param("id") String id, @Param("createBy") String createBy,
			@Param("updateBy") String updateBy);

	public void insertPrev(@Param("id") String id,
			@Param("createBy") String createBy,
			@Param("updateBy") String updateBy);

	public void getID();

	public void insert(EtlFlowDisPatchForm flowform);

	public Integer findSameName(EtlFlowDisPatchForm flowform);

	public Integer findSameName_EDIT(FlowManageForm flowform);

	public void ExecSql(@Param("SQL") String SQL);

	public void UpdateTaskName(@Param("flowId") String flowId,
			@Param("username") String username);

	public void insertXml(@Param("xml") String xml,
			@Param("loadData") String loadData, @Param("flowId") String flowId,
			@Param("username") String username);

	public void UpdateDependency(@Param("flowId") String flowId,
			@Param("username") String username);

	public String SelectLoadData(@Param("flowId") String flowId);

	public String checkFlowIdInXml(@Param("flowId") String flowId);

	public void updateXml(@Param("xml") String xml,
			@Param("loadData") String loadData, @Param("flowId") String flowId,
			@Param("username") String username);

	public void updateInIt(EtlFlowDisPatchForm flowform);

	public void subFlowDel(@Param("id") String id, @Param("pid") String pid);

	public void subFlowtaskDel(@Param("id") String id, @Param("pid") String pid);

	public void subFlowdependDel(@Param("id") String id,
			@Param("pid") String pid);

	public void subFlowxmlDel(@Param("id") String id, @Param("pid") String pid);

	public String checkFlowId(@Param("id") String id);

	public List<Map<String, Object>> getPid(@Param("id") String id,
			@Param("pid") String pid);

	public void subFlowPidDel(@Param("id") String id);

	public void subFlowPidtaskDel(@Param("id") String id);

	public void subFlowPiddependDel(@Param("id") String id);

	public void subFlowPidxmlDel(@Param("id") String id);

	public void deleteTempId(@Param("tempId") String tempId);

	public List<FlowTaskParaModel> flowParaGet(String FlowId);

	public void flowParaEdit(FlowTaskParaModel flowParas);

	public void flowParaDelete(FlowTaskParaModel flowParas);
	
	public void flowParaInsert(FlowTaskParaModel flowParas);
	
	public void flowParaInsertEmpty(FlowTaskParaModel flowParas);
	
	public void flowParaDeleteEmpty(FlowTaskParaModel flowParas);
	
	public void flowParaDeleteOne(String id);
}
