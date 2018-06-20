package com.sunyard.dispatch.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sunyard.dispatch.dao.EtlDisPatchDao;
import com.sunyard.dispatch.dao.EtlFlowDisPatchDao;
import com.sunyard.dispatch.model.FlowTaskParaModel;
import com.sunyard.dispatch.model.form.EtlFlowDisPatchForm;
import com.sunyard.dispatch.service.EtlFlowDisPatchService;
/**
 * 
 * ClassName: EtlFlowDisPatchServiceImpl <br/>  
 * Function: 动态界面流程配置. <br/>  
 * Reason: TODO ADD REASON(可选). <br/>  
 * date: 2016年3月31日 下午2:07:27 <br/>  
 *  
 * @author CCC  
 * @version   
 * @since JDK 1.6
 */
@Service
public class EtlFlowDisPatchServiceImpl implements EtlFlowDisPatchService {
	
	@Resource
	private EtlFlowDisPatchDao etlflowdispatchdao;

	@Resource
	private EtlDisPatchDao etldispatchdao;
	
	@Override
	public List<Map<String, Object>> SelectFlowGroup() {
		   
		return etlflowdispatchdao.SelectFlowGroup();
	}

	@Override
	public String maxFlowId() {
		 try{
			 etlflowdispatchdao.getID();
		return etlflowdispatchdao.maxFlowId();
		} catch (Exception e) {
			  e.printStackTrace();
			  throw new RuntimeException();
		  }
	}

	@Override
	public void insert(EtlFlowDisPatchForm flowform) throws Exception {
		if(etlflowdispatchdao.findSameName(flowform)>0){
			System.out.println("已存在同名流程");
			throw new Exception("已存在同名流程");
		}
			 etlflowdispatchdao.insert(flowform);
		
	}

	@Override
	public List<Map<String, Object>> selectFlowMessage(String id) {
		return etlflowdispatchdao.selectFlowMessage(id);
	}

	@Override
	public String ExecSql(String update,String insert,String flowId,String username) {
		  try{
		etlflowdispatchdao.ExecSql(update);
		etlflowdispatchdao.ExecSql(insert);
		return "true";
		}catch (Exception e) {
			  
			  throw new RuntimeException();
		  }
	}
	
	@Override
	public void insertXml(String xml, String loadData,String flowId, String username) {
		  try{
			etlflowdispatchdao.UpdateTaskName(flowId, username);
			etlflowdispatchdao.UpdateDependency(flowId, username);
			etlflowdispatchdao.insertXml(xml,loadData, flowId, username);
		  }catch (Exception e) {
			 e.printStackTrace();
			 throw new RuntimeException();
		  }
	
	}

	@Override
	public String SelectLoadData(String flowId) {
		return etlflowdispatchdao.SelectLoadData(flowId);
	}

	@Override
	public String checkFlowIdInXml(String flowId) {
		  
		// TODO Auto-generated method stub  
		String check=etlflowdispatchdao.checkFlowIdInXml(flowId);
		if(check==null){
			check="false";
		}
		if(check.equals("true")){
		return check;
		}
		else{
			return "false";
			
		}
	}

	@Override
	public void updateXml(String xml, String loadData, String flowId,String username) {
		  try{
			etlflowdispatchdao.UpdateTaskName(flowId, username);
			etlflowdispatchdao.UpdateDependency(flowId, username);
			etlflowdispatchdao.updateXml(xml,loadData, flowId, username);
		  }catch (Exception e) {
			  e.printStackTrace();
			  throw new RuntimeException();
		  }
		
	}

	@Override
	public String MaxSubFlowId(String tempId,String createBy,String updateBy) {
		 try{
			 etlflowdispatchdao.getID();
			 String id=etlflowdispatchdao.maxFlowId();
			 etlflowdispatchdao.insertInIt(tempId,id, createBy, updateBy);
			 etlflowdispatchdao.insertPrev(id, createBy, updateBy);
			 
		return id;
		} catch (Exception e) {
			  
			  throw new RuntimeException();
		  }
	}

	@Override
	public String checkFlowId(String id) {
		  
		
		return etlflowdispatchdao.checkFlowId(id);
	}

	@Override
	public void updateInIt(EtlFlowDisPatchForm flowform) {
		  
		etlflowdispatchdao.updateInIt(flowform);
		
		
	}

	@Override
	public void subFlowdelete(String id, String pid) {
		String getid=id;
		String getpid="'"+pid+"'";
		String deleteid="";
		while(getid!=null){
		 	JSONArray arrgetid=JSON.parseArray(JSON.toJSONString(getSonId(getid,getpid)));
		 	getid="";
		 	System.out.println(arrgetid.size());
		 	if(arrgetid.size()<=0){
		 		getid=null;
		 	}
		 	else{
		 		getpid=getid;
			 	for(int i=0;i<arrgetid.size();i++){
			 		JSONObject	arrjsonid=arrgetid.getJSONObject(i);
			 		if(i==0){
			 			getid="'"+(String) arrjsonid.get("id")+"'";
			 		}else{
			 			getid =getid+","+"'"+(String) arrjsonid.get("id")+"'";
			 		}
			 		if(deleteid==""){
			 			deleteid=getid;
			 		}else{
			 			deleteid=deleteid+","+getid;
			 		}
				 	try{
				 		etlflowdispatchdao.subFlowPiddependDel(getid);
				 		etlflowdispatchdao.subFlowPidtaskDel(getid);
				 		etlflowdispatchdao.subFlowPidxmlDel(getid);
				 		etlflowdispatchdao.subFlowPidDel(getid);
				 	} catch (Exception e) {
						throw new RuntimeException();
					}
			 	}
		 	}
			try{
				 etlflowdispatchdao.subFlowdependDel(id, pid);
				 etlflowdispatchdao.subFlowtaskDel(id, pid);
				 etlflowdispatchdao.subFlowxmlDel(id, pid);
				 etlflowdispatchdao.subFlowDel(id, pid);
			} catch (Exception e) {
				throw new RuntimeException();
			}
			getpid=getid;
			if(getid!=null){
				getid="''";
			}
		}
	}

	public  List<Map<String, Object>> getSonId(String id,String pid){
		return etlflowdispatchdao.getPid(id,pid);
	}

	@Override
	public void deleteTempId(String tempId) {
		 try{
			 etlflowdispatchdao.deleteTempId(tempId);
			 etldispatchdao.deleteTempId(tempId);
		} catch (Exception e) {
			  throw new RuntimeException();
		}
	}

	@Override
	public String lastFlowId(String id) {
		return etlflowdispatchdao.lastFlowId(id);
	}

	@Override
	public List<FlowTaskParaModel> getFlowPara(String flowId)throws Exception {
		return etlflowdispatchdao.flowParaGet(flowId);
	}

	@Override
	public void editFlowPara(FlowTaskParaModel flowParas)throws Exception {
		etlflowdispatchdao.flowParaEdit(flowParas);
	}

	@Override
	public void deleteFlowPara(FlowTaskParaModel flowParas)throws Exception {
		etlflowdispatchdao.flowParaDelete(flowParas);
	}

	@Override
	public void newFlowPara(FlowTaskParaModel flowParas) throws Exception {
		etlflowdispatchdao.flowParaDeleteEmpty(flowParas);
		etlflowdispatchdao.flowParaInsertEmpty(flowParas);
	}
	
	@Override
	public void insertFlowPara(FlowTaskParaModel flowParas) throws Exception {
		etlflowdispatchdao.flowParaInsert(flowParas);
		
	}

	@Override
	public void removeNewFlowPara(FlowTaskParaModel flowParas) throws Exception {
		etlflowdispatchdao.flowParaDeleteEmpty(flowParas);
	}

	@Override
	public void deleteFlowPara(String[] ids) throws Exception {
		for(String id:ids){
			etlflowdispatchdao.flowParaDeleteOne(id);
		}
		
	}



}
