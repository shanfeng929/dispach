package com.sunyard.dispatch.util;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sunyard.dispatch.common.model.User;
import com.sunyard.dispatch.enums.Dict;
import com.sunyard.dispatch.enums.LogDict;
import com.sunyard.dispatch.model.form.OpLogForm;
import com.sunyard.dispatch.service.OpLogsService;

public class LogUtils {
	
	protected static Logger logger = LoggerFactory.getLogger(LogUtils.class);
	/**   
	 * @Description: 将日志写入数据表
	 * @author zhangwenfeng031
	 * @date 2016年10月24日 下午3:25:25 
	 * @version Version 1.0.1 
	*/
	public static void writeLogByDB(OpLogsService opLogsService, HttpServletRequest request, User loginUser, long costTime, LogDict log, Throwable e) {
		try {
			//记录DB日志
			Dict level = e == null?Dict.Error_Level_Info:log.getLevel();
			String desc = e == null?"执行成功!":("执行失败:"+e.getMessage().substring(0, e.getMessage().length()>150?150:e.getMessage().length()));
			OpLogForm opLog = new OpLogForm(log.getName(), desc, level.getName());
			opLog.setAddress(CommonUtils.getClientIp(request));
			opLog.setCreateBy(loginUser==null?"-1":loginUser.getId().toString());
			opLog.setOperator(loginUser==null?"unknow":loginUser.getLoginName());
			opLog.setCostTime(String.valueOf(costTime));
			opLog.setServerIp(CommonUtils.getServerIp());
			opLogsService.addLogger(opLog);
		} catch (Exception exception) {
			logger.error("日志写入异常!", exception);
		}
	}
	
	/**   
	 * @Description: 将日志写入远程服务
	 * @author zhangwenfeng031
	 * @date 2016年10月24日 下午3:25:25 
	 * @version Version 1.0.1 
	*/
	public static void writeLogByhttp(HttpServletRequest request,String bankName, String appName, User loginUser, long costTime, LogDict log, Throwable e) {
		try {
			//记录DB日志
			Dict level = e == null?Dict.Error_Level_Info:log.getLevel();
			String desc = e == null?Dict.Result_success.getName():(Dict.Result_failure.getName()+e.getMessage().substring(0, e.getMessage().length()>150?150:e.getMessage().length()));
			String operateStatus = e == null?Dict.Result_success.getName():Dict.Result_failure.getName();
			Map<String,String> params = new HashMap<String,String>();
			params.put("bankName", bankName);
			params.put("systemName", appName);
			params.put("operation", log.getName());
			params.put("level", level.getName());
			params.put("operateDesc", desc);
			params.put("costTime", String.valueOf(costTime));
			params.put("clientIp", CommonUtils.getClientIp(request));
			params.put("serverIp", CommonUtils.getServerIp());
			params.put("operator", loginUser==null?"unknow":loginUser.getLoginName());
			params.put("operateStatus", operateStatus);
			params.put("level", desc);
			String msg = HttpClientUtil.doPost("http://10.23.192.40:8080/AlmCenter/portal/OprLogController/savaLog", params);
			logger.info(msg);
		} catch (Exception exception) {
			logger.error("日志写入异常!", exception);
		}
	}
	
	/**   
	 * @Description: 将日志记录到文件
	 * @author zhangwenfeng031  
	 * @date 2016年10月26日 下午5:40:28 
	 * @version Version 1.0.1 
	*/
	public static void writeLogByFile(HttpServletRequest request, User loginUser, long costTime, LogDict log, Throwable e){
		try {
			//记录DB日志
			Dict level = e == null?Dict.Error_Level_Info:log.getLevel();
			String desc = e == null?"执行成功!":"执行失败:"+e.getMessage();
			//记录文件日志
			StringBuffer msg = new StringBuffer();
			if(e != null){
				msg.append("###   错误等级： ").append(level.getName()).append(" ###  \n");
			}
			msg.append("登录用户[").append(loginUser==null?"unknow":loginUser.getLoginName())
			   .append(",").append(CommonUtils.getClientIp(request)).append("], ");
			msg.append("服务节点[").append(CommonUtils.getServerIp()).append("], ");
			msg.append("功能[").append(log.getName()).append("], ");
			msg.append("耗时 ").append(costTime).append(" ms, ");
			msg.append("执行").append(desc).append("! ");
			if(e != null){
				logger.error(msg.toString());
			}else{
				logger.info(msg.toString());
			}
		} catch (Exception exception) {
			logger.error("日志Log异常!", exception);
		}
	}
}
