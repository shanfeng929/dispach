package com.sunyard.dispatch.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.dao.EtlFlowDisPatchDao;
import com.sunyard.dispatch.dao.FlowManageDao;
import com.sunyard.dispatch.dao.TaskManageDao;
import com.sunyard.dispatch.job.Job;
import com.sunyard.dispatch.model.FlowHistoryModel;
import com.sunyard.dispatch.model.FlowManageModel;
import com.sunyard.dispatch.model.TaskDependencyModel;
import com.sunyard.dispatch.model.TaskManageModel;
import com.sunyard.dispatch.model.TaskMonitorModel;
import com.sunyard.dispatch.model.TimeChartModel;
import com.sunyard.dispatch.model.form.FlowDependencyForm;
import com.sunyard.dispatch.model.form.FlowManageForm;
import com.sunyard.dispatch.model.form.FlowMonitorForm;
import com.sunyard.dispatch.service.FlowManageService;

@Service("flowManageService")
public class FlowManageServiceImpl implements FlowManageService {

	@Resource
	private FlowManageDao flowManageDao;
	@Resource
	private TaskManageDao taskManageDao;
	@Resource
	private EtlFlowDisPatchDao etlFlowDisPatchDao;

	@Override
	public Page<FlowManageModel> getFlowManageList(FlowManageForm form) {
		List<FlowManageModel> flowManageList = flowManageDao
				.getFlowManageList(form);
		Integer count = flowManageDao.getFlowManageListCount(form);
		return new Page<FlowManageModel>(form.getPage(), form.getLimit(),
				count, flowManageList);
	}

	@Override
	public List<FlowManageModel> getFlowList(FlowManageForm form) {
		List<FlowManageModel> flowList = flowManageDao.getFlowList(form);
		return flowList;
	}

	@Override
	public FlowManageModel findFlowById(String id) {
		return flowManageDao.findFlowById(id);
	}

	@Override
	public void flowManageEdit(FlowManageForm form) throws Exception {
		if (etlFlowDisPatchDao.findSameName_EDIT(form) > 0) {
//			System.out.println("已存在另一个同名流程");
			throw new Exception("已存在另一个同名流程");

		}
		flowManageDao.flowManageEdit(form);
	}

	@Override
	public Map<String, Object> findDependencyByFlowId(FlowDependencyForm form) {
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> flowMap = flowManageDao
				.findDependencyByFlowId(form);
		if (flowMap != null) {
			Iterator<String> iterator = flowMap.keySet().iterator();
			while (iterator.hasNext()) {
				String key = iterator.next();
				map.put(key.toUpperCase(), flowMap.get(key));
			}
		}
		return map;
	}

	@Override
	public void saveOrUpdateDependency(FlowDependencyForm form) {
		if (flowManageDao.flowIdUnique(form.getFlowId()).intValue() < 1) {
			flowManageDao.addFlowDependency(form);
		} else {
			flowManageDao.updateFlowDependency(form);
			// flowManageDao.deleteFlowDependency(form);
			// flowManageDao.addFlowDependency(form);
		}
	}

	// @Override
	// public void flowManageDel(String id) throws Exception{
	// //判断是否存在依赖关系
	// Integer count = flowManageDao.checkDependency(id);
	// //判断是否被其他流程设置为前置流程
	// Integer count2 = flowManageDao.checkFlowPrev(id);
	// if(count>0 && count2>0){
	// throw new Exception("存在流程依赖");
	// }else{
	// flowDelRecursion(id);
	// /*//查找流程下子流程
	// List<FlowManageModel> flowModels = flowManageDao.findFlowByPid(id);
	//
	//
	//
	// //查找流程下所有任务
	// List<TaskManageModel> taskManageModels = taskManageDao.findTaskByPId(id);
	// String taskIds = "";
	// if(taskManageModels.size() > 0){
	// for (TaskManageModel taskManageModel : taskManageModels) {
	// taskIds += taskManageModel.getId()+",";
	// }
	// taskIds = taskIds.substring(0, taskIds.length()-1);
	// //批量删除任务依赖
	// taskManageDao.delTaskDependencyByFlowId(id);
	// //批量删除任务
	// taskManageDao.delTaskByIds(taskIds);
	// }
	// //删除流程XML
	// flowManageDao.xmlDel(id);
	// //删除流程
	// flowManageDao.flowManageDel(id);*/
	// }
	// }

	@Override
	public List<TimeChartModel> timeChartData(String flowId, Integer times) {
		List<TimeChartModel> timeChartModels = new ArrayList<TimeChartModel>();
		timeChartModels = flowManageDao.findTimeChartData(flowId, times);
		if (timeChartModels.size() > 0) {
			for (int i = 0; i < timeChartModels.size(); i++) {
				timeChartModels.get(i).setTimes(timeChartModels.size() - i);
			}
		}
		return timeChartModels;
	}

	/**
	 * 递归删除流程
	 * 
	 * @param pid
	 */
	// private void flowDelRecursion(String pid){
	// //查找pid下所有子流程
	// List<FlowManageModel> flowModels = flowManageDao.findFlowByPid(pid);
	// if(flowModels!=null && flowModels.size()>0){
	// for (FlowManageModel flowManageModel : flowModels) {
	// flowDelRecursion(flowManageModel.getId());
	// }
	// }else{
	// //查找流程下所有任务
	// List<TaskManageModel> taskManageModels =
	// taskManageDao.findTaskByPId(pid);
	// String taskIds = "";
	// if(taskManageModels.size() > 0){
	// for (TaskManageModel taskManageModel : taskManageModels) {
	// taskIds += "'"+taskManageModel.getId()+"',";
	// }
	// taskIds = taskIds.substring(0, taskIds.length()-1);
	// //批量删除任务依赖
	// taskManageDao.delTaskDependencyByFlowId(pid);
	// //批量删除任务
	// taskManageDao.delTaskByIds(taskIds);
	// }
	// //删除流程XML
	// flowManageDao.xmlDel(pid);
	// //删除流程
	// flowManageDao.flowManageDel(pid);
	// }
	// }

	@Override
	public void flowManageDel(String id) throws Exception {
		// 判断是否存在依赖关系
		Integer count_dependency = flowManageDao.checkDependency(id);
		// 判断是否被其他流程设置为前置流程
		Integer count_flowPrev = flowManageDao.checkFlowPrev(id);
		if (count_dependency > 0 && count_flowPrev > 0) {
			throw new Exception("存在任务链依赖");
		} else {
			// 删除最上一级流程以及附带的任务、xml、任务关系等等
			deleteFirstFlow(id);
			String pid = "'" + id + "'";
			while (pid != null) {
				List<FlowManageModel> flowModels = new ArrayList<FlowManageModel>();
				flowModels = flowManageDao.findFlowByPids(pid);// 修改为批量查找流程
				System.out.println(flowModels.size());
				if (flowModels.size() < 1) {
					pid = null;
				} else {
					for (int i = 0; i < flowModels.size(); i++) {
						FlowManageModel flowModel = flowModels.get(i);
						if (i == 0) {
							pid = "'" + flowModel.getId() + "'";
						} else {
							pid = pid + ",'" + flowModel.getId() + "'";
						}
					}
					try {
						//
						String task_subflow = "";
						// 查找任务链下任务
						List<TaskDependencyModel> taskDependencyModels = taskManageDao.findTaskByPids(pid);
						// 批量删除任务链下的任务实例
						taskManageDao.delTaskLogsByPids(pid);
						// 批量删除任务关系
						etlFlowDisPatchDao.subFlowPiddependDel(pid);
						// 批量删除任务链下的任务
						etlFlowDisPatchDao.subFlowPidtaskDel(pid);
						// 批量删除任务链XML
						etlFlowDisPatchDao.subFlowPidxmlDel(pid);
						// 批量删除任务链实例
						flowManageDao.flowManageDelLogs(pid);
						// 批量删除任务链
						etlFlowDisPatchDao.subFlowPidDel(pid);
						for (TaskDependencyModel taskDependencyModel : taskDependencyModels) {
							if (taskDependencyModel.getTaskId().startsWith("flow")) {
								task_subflow += "'" + taskDependencyModel.getTaskId() + "',";
							}
						}
						if (task_subflow.length() > 1) {
							pid = task_subflow.substring(0, task_subflow.length() - 1);
						} else {
							pid = null;
						}
					} catch (Exception e) {
						throw e;
					}
				}
			}

		}
	}

	/**
	 * 删除最上一级流程以及流程下所有数据(包括任务依赖关系、任务、流程XML)
	 * 
	 * @param flowId
	 */
	public void deleteFirstFlow(String flowId) {
		// 查找流程下所有任务
		List<TaskManageModel> taskManageModels = taskManageDao.findTaskByPId(flowId);
		String taskIds = "";
		if (taskManageModels.size() > 0) {
			for (TaskManageModel taskManageModel : taskManageModels) {
				taskIds += "'" + taskManageModel.getId() + "',";
			}
			taskIds = taskIds.substring(0, taskIds.length() - 1);
			// 批量删除任务实例
			taskManageDao.delTaskLogsByIds(taskIds);
			// 批量删除任务依赖
			taskManageDao.delTaskDependencyByFlowId(flowId);
			// 批量删除任务
			taskManageDao.delTaskByIds(taskIds);
		}
		// 删除任务链XML
		flowManageDao.xmlDel(flowId);
		// 删除任务链实例
		flowManageDao.flowManageDelLogs("'"+ flowId +"'");
		// 删除任务链
		flowManageDao.flowManageDel(flowId);
	}

	@Override
	public void flowStart(FlowManageForm form) throws Exception {
		// flowManageDao.flowManageEdit(form);
		Job job = new Job();
		long jobId = job.startJob(0, form.getId());
		if (jobId == 0) {
			throw new Exception("启动任务链出错");
		}
		/*JobTcpClient client = new JobTcpClient(Constant.SERVICE_REG.ENGINE_IP_LOCAL,Constant.SERVICE_REG.ENGINE_PORT); 
		String returnMsg = client.startJob(form.getId());
		if (!"OK".equals(returnMsg)) {
			throw new Exception("启动任务链出错");
		}*/
		flowManageDao.flowManageEdit(form);
	}

	@Override
	public void flowStop(FlowManageForm form) throws Exception {
		FlowManageModel flowModel = flowManageDao.findFlowById(form.getId());
		long jobId = flowModel.getJobId().longValue();
		Job job = new Job();
		boolean flag = job.suspendJob(jobId);
		if (!flag) {
			throw new Exception("暂停任务链出错");
		}
		/*JobTcpClient client = new JobTcpClient(Constant.SERVICE_REG.ENGINE_IP,Constant.SERVICE_REG.ENGINE_PORT); 
		String returnMsg = client.suspendJob(jobId);
		if (!"OK".equals(returnMsg)) {
			throw new Exception("暂停任务链出错");
		}*/
		flowManageDao.flowManageEdit(form);
	}

	@Override
	public void flowRestart(FlowManageForm form) throws Exception {
		FlowManageModel flowModel = flowManageDao.findFlowById(form.getId());
		long jobId = flowModel.getJobId().longValue();
		Job job = new Job();
		boolean flag = job.resumeJob(jobId);
		if (!flag) {
			throw new Exception("恢复任务链出错");
		}
		/*JobTcpClient client = new JobTcpClient(Constant.SERVICE_REG.ENGINE_IP,Constant.SERVICE_REG.ENGINE_PORT); 
		String returnMsg = client.resumeJob(jobId);
		if (!"OK".equals(returnMsg)) {
			throw new Exception("恢复任务链出错");
		}*/
		flowManageDao.flowManageEdit(form);
	}

	@Override
	public void flowTerminate(FlowManageForm form) throws Exception {
		FlowManageModel flowModel = flowManageDao.findFlowById(form.getId());
		long jobId = flowModel.getJobId().longValue();
		Job job = new Job();
		boolean flag = job.terminateJob(jobId);
		if (!flag) {
			throw new Exception("手工终止流程出错");
		}
		/*JobTcpClient client = new JobTcpClient(Constant.SERVICE_REG.ENGINE_IP,Constant.SERVICE_REG.ENGINE_PORT); 
		String returnMsg = client.terminalJob(jobId);
		if (!"OK".equals(returnMsg)) {
			throw new Exception("手工终止任务链出错");
		}*/
		flowManageDao.flowManageEdit(form);
	}

	@Override
	public List<Map<String, Object>> findTaskNodes(String flowId) {
		//任务节点
		List<Map<String, Object>> nodes = flowManageDao.findTaskNodesByFlowId(flowId);
		//子流程节点
		List<Map<String, Object>> flowNodes = flowManageDao.findFlowNodesByFlowId(flowId);
		if(flowNodes.size() > 0){
			for (Map<String, Object> map : flowNodes) {
				nodes.add(map);
			}
		}
		return nodes;
	}

	@Override
	@Transactional
	public void updateFlowGroup(String flowGroupId, String flowIds) {
		flowManageDao.updateFlowGroup(flowGroupId, flowIds);
	}

	@Override
	public Page<FlowManageModel> getFlowMonitorList(FlowMonitorForm form) {
		List<FlowManageModel> flowMonitorList = flowManageDao.getFlowMonitorList(form);
		Integer count = flowManageDao.getFlowMonitorListCount(form);
		return new Page<FlowManageModel>(form.getPage(), form.getLimit(), count, flowMonitorList);
	}

	@Override
	public Page<FlowHistoryModel> getFlowHistoryList(FlowMonitorForm form) {
		List<FlowHistoryModel> flowHistoryList = flowManageDao.getFlowHistoryList(form);
		Integer count = flowManageDao.getFlowHistoryListCount(form);
		return new Page<FlowHistoryModel>(form.getPage(), form.getLimit(), count, flowHistoryList);
	}

	@Override
	public List<TaskMonitorModel> getTaskMonitorList(String flowId,Boolean isHistory) {
		if(isHistory)
			return flowManageDao.getTaskHistoryMonitorList(flowId);
		else
			return flowManageDao.getTaskMonitorList(flowId);
	}

	@Override
	public List<FlowManageModel> getAllFlowManageList(FlowManageForm form) {
		return flowManageDao.getAllFlowManageList(form);
	}

	@Override
	public List<FlowHistoryModel> queryFlowHistoryList(FlowMonitorForm form) {
		return flowManageDao.queryFlowHistoryList(form);
	}

	@Override
	public List<TaskMonitorModel> getTaskHistoryList(String flowId) {
		return flowManageDao.getTaskHistoryMonitorList(flowId);
	}
}
