package com.sunyard.dispatch.service.impl;

import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sunyard.dispatch.dao.EtlDisPatchDao;
import com.sunyard.dispatch.model.FlowTaskParaModel;
import com.sunyard.dispatch.model.ParametersModel;
import com.sunyard.dispatch.model.form.EtlDisPatchForm;
import com.sunyard.dispatch.service.EtlDisPatchService;
import com.sunyard.dispatch.util.Constant;

/**
 * 
 * ClassName: EtlDisPatchServiceImpl <br/>
 * Function: 节点配置 <br/>
 * Reason: TODO ADD REASON(可选). <br/>
 * date: 2016年3月28日 上午9:31:03 <br/>
 * 
 * @author CCC
 * @version
 * @since JDK 1.6
 */
@Service
public class EtlDisPatchServiceImpl implements EtlDisPatchService {
	@Resource
	private EtlDisPatchDao etldispatchdao;

	/*
	 * @Override public String actionShell(String serverAddress, String
	 * fileAddress, String userName, String passWord) { RemoteShellTool tool =
	 * new RemoteShellTool(serverAddress, userName, passWord, "utf-8");
	 * 
	 * String result = tool.exec("sh " + fileAddress); //
	 * System.out.print(result); // TODO Auto-generated method stub return
	 * result; }
	 */

	@Override
	public List<Map<String, Object>> selectRemote(String reMote) {
		// return null;
		return etldispatchdao.selectRemote(reMote);
	}

	/*
	 * public class RemoteShellTool {
	 * 
	 * private Connection conn; private String ipAddr; private String charset =
	 * Charset.defaultCharset().toString(); private String userName; private
	 * String password;
	 * 
	 * public RemoteShellTool(String ipAddr, String userName, String password,
	 * String charset) { this.ipAddr = ipAddr; this.userName = userName;
	 * this.password = password; if (charset != null) { this.charset = charset;
	 * } }
	 * 
	 * public boolean login() throws IOException { conn = new
	 * Connection(ipAddr); conn.connect(); // 连接 return
	 * conn.authenticateWithPassword(userName, password); // 认证 }
	 * 
	 * public String exec(String cmds) { InputStream in = null; String result =
	 * ""; try { if (this.login()) { Session session = conn.openSession(); //
	 * 打开一个会话 session.execCommand(cmds);
	 * 
	 * in = session.getStdout(); result = this.processStdout(in, this.charset);
	 * session.close(); conn.close(); } } catch (IOException e1) {
	 * e1.printStackTrace(); } return result; }
	 * 
	 * public String processStdout(InputStream in, String charset) { byte[] buf
	 * = new byte[1024]; StringBuffer sb = new StringBuffer(); try { while
	 * (in.read(buf) != -1) { sb.append(new String(buf, charset)); } } catch
	 * (IOException e) { e.printStackTrace(); } return sb.toString(); } }
	 */

	@Override
	public void insert(EtlDisPatchForm insertform) {
		etldispatchdao.insert(insertform);

	}

	@Override
	public String maxTaskId(String tempId, String type, String createBy,
			String updateBy) {
		try {
			Integer taskType = 0;// 用于初始化前端任务组件类型
			if (Constant.GooFlow_NodeType.NODE_LINUX.equals(type)) {
				taskType = 1;
			} else if (Constant.GooFlow_NodeType.NODE_SQL.equals(type)) {
				taskType = 5;
			} else if (Constant.GooFlow_NodeType.NODE_JAVA.equals(type)) {
				taskType = 6;
			} else if (Constant.GooFlow_NodeType.NODE_ALARM.equals(type)) {
				taskType = 7;
			}
			etldispatchdao.getID();
			String id = etldispatchdao.maxTaskId();
			etldispatchdao.insertInIt(tempId, id, taskType, createBy, updateBy);
			etldispatchdao.insertTaskParaInit("task"+id, tempId);
			etldispatchdao.insertPrev(id, taskType, createBy, updateBy);
			return id;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();
		}

	}

	@Override
	public String checkTaskId(String id) {
		return etldispatchdao.checkTaskId(id);
	}

	@Override
	public Map<String, Object> taskIsExist(String id) throws Exception{
		Map<String,Object> resultMap=etldispatchdao.taskIsExist(id);
		resultMap.put("outParaId", (Object)etldispatchdao.taskGetOutputPara(id));
		resultMap.put("PID", resultMap.get("TEMPID"));
		return resultMap;
	}

	@Override
	public List<Map<String, Object>> selectTaskMsg(String id) {
		return etldispatchdao.selectTaskMsg(id);
	}

	@Override
	public void updte(EtlDisPatchForm updateform) {
		etldispatchdao.update(updateform);
	}

	@Override
	public void delete(String id, String tempId) {
		etldispatchdao.delete(id, tempId);
	}

	@Override
	public List<Map<String, Object>> selectParameters(String paraName) {

		// TODO Auto-generated method stub
		return etldispatchdao.selectParameters(paraName);
	}

	@Override
	public String lastFlowId(String id) {
		return etldispatchdao.lastFlowId(id);
	}

	@Override
	public List<FlowTaskParaModel> pickUpParameters(String taskName)
			throws Exception {
		List<String> paraIds = etldispatchdao.pickUpParaIds(taskName);
		if (paraIds.size()>0&&paraIds.get(0)!=null) {
			String[] paraIdString = paraIds.get(0).split(",");
			int[] paraIdInt = new int[paraIdString.length];
			for (int i = 0; i < paraIdString.length; i++) {
				paraIdInt[i] = Integer.parseInt(paraIdString[i]);
			}
			List<FlowTaskParaModel> result = etldispatchdao
					.pickUpParameters(paraIdInt);
			return result;
		}
		return null;
	}

	@Override
	public void setTaskInPara(String taskName, String[] ids) throws Exception {
		StringBuilder inParaIds = new StringBuilder("");
		for (int i = 0; ids != null && i < ids.length; i++) {
			inParaIds.append(ids[i]);
			inParaIds.append(',');
		}
		int length;
		if ((length = inParaIds.length()) > 0) {
			inParaIds.deleteCharAt(length - 1);
		}
		etldispatchdao.setTaskInPara(inParaIds.toString(), taskName);
	}

	@Override
	public void setTaskOutPara(String taskName, String id) throws Exception {
		etldispatchdao.setTaskOutPara(id, taskName);
	}

	/*
	 * @Override public List<TaskParaModel> addParameters(TaskParaModel model)
	 * throws Exception { List<TaskParaModel> sameNameResult = etldispatchdao
	 * .pickUpParameters(model); if (sameNameResult.size() > 0) { throw new
	 * Exception("本task下已存在同名变量"); } else { etldispatchdao.addParameters(model);
	 * List<TaskParaModel> result = etldispatchdao.pickUpParameters(model); if
	 * (result.size() == 0) { throw new Exception("未在变量表找到此名称的变量"); } return
	 * result; } // return null; }
	 * 
	 * @Override public void tryEditParameters(TaskParaModel model) throws
	 * Exception { TaskParaModel testmodel = model.clone();
	 * testmodel.setParaName(""); TaskParaModel origin =
	 * etldispatchdao.pickUpParameters(testmodel).get(0); if
	 * (origin.threeValueEqual(model)) { throw new Exception("没有变化"); } else if
	 * ("否".equals(model.getOverall())) {
	 * etldispatchdao.notOverallUpdate(model); } else { List<ParametersModel>
	 * overallList = etldispatchdao .getOverallPara(model); if
	 * (overallList.size() > 0) { ParametersModel overPara = overallList.get(0);
	 * model.setParaId(overPara.getPara_id());
	 * model.setParaName(overPara.getPara_name());
	 * model.setParaValue(overPara.getPara_value());
	 * etldispatchdao.overallUpdate(model); } else {
	 * etldispatchdao.notOverallUpdate(model); } } }
	 * 
	 * @Override public void removePara(TaskParaModel model) throws Exception {
	 * etldispatchdao.removePara(model); }
	 */
	@Override
	public JSONArray getClassMethodJson(String className) {
		JSONArray json = new JSONArray();
		//
		JSONArray methodArray = new JSONArray();
		try {
			Class<?> cc = Class.forName(className);
			Object oo = cc.newInstance();
			Method[] methods = oo.getClass().getMethods();
			for (Method mm : methods) {
				Class<?>[] types = mm.getParameterTypes();
				StringBuffer sbf = new StringBuffer();
				int argNum = 1;
				for (Class<?> tt : types) {
					String argFullName = tt.toString();
					int dot = argFullName.lastIndexOf('.');
					if (dot > 0) {
						argFullName = argFullName.substring(dot + 1);
					}
					sbf.append(argFullName);
					sbf.append(" ");
					sbf.append("arg");
					sbf.append(argNum++);
					sbf.append(",");
				}
				if (sbf.length() > 0) {
					sbf.deleteCharAt(sbf.length() - 1);
				}
				String ss = "{\"text\":\"" + mm.getName() + "(" + sbf + ")"
						+ "\",\"leaf\":\"true\",\"iconCls\":\"methodIcon\"}";
				methodArray.add(JSONObject.parse(ss));
			}
			JSONObject father = new JSONObject();
			father.put("text", className);
			father.put("children", methodArray);
			father.put("iconCls", "classIcon");
			father.put("expanded", true);
			json.add(father);
		} catch (ClassNotFoundException e) {
			// e.printStackTrace();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return json;
	}

}
