package com.sunyard.dispatch.aspect;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sunyard.dispatch.annotation.WriteLog;
import com.sunyard.dispatch.common.model.User;
import com.sunyard.dispatch.enums.Dict;
import com.sunyard.dispatch.enums.LogDict;
import com.sunyard.dispatch.model.form.OpLogForm;
import com.sunyard.dispatch.service.OpLogsService;
import com.sunyard.dispatch.util.CommonUtils;


/**   
 * @Description: 通过AOP来实现日志记录
 * @author zhangwenfeng031  
 * @date 2016年10月24日 下午3:23:31 
 * @version Version 1.0.1
*/
@Aspect
@Component
public class LogAspect {

	protected Logger logger = LoggerFactory.getLogger(getClass());
	@Resource
	protected OpLogsService opLogsService;
	@Autowired
	private  HttpServletRequest request;
	
	/**
	 * 切入点：表示在哪个类的哪个方法进行切入。配置切入点表达式
	 */
	@Pointcut("@annotation(com.sunyard.dispatch.annotation.WriteLog)")
	public void aspectPoint() {

	}

	/**
	 * 前置通知 用于拦截WriteLog注解方法的执行，记录用户的操作
	 * 
	 * @param joinPoint切点
	 * @throws Throwable
	 */
	@Around("aspectPoint() && @annotation(writeLog)")
	public Object doAround(JoinPoint joinPoint, WriteLog writeLog)
			throws Throwable {
		long start = System.currentTimeMillis();
		Object object = null;
		User loginUser = CommonUtils.getCurrentUser();
		String clientIp = CommonUtils.getClientIp(request);
		String serverIp = CommonUtils.getServerIp();
		Throwable throwable = null;
		try {
			object = ((ProceedingJoinPoint) joinPoint).proceed();
		} catch (Throwable e) {
			throwable = e;
			throw e;
		}finally{
			//当操作成功并且 DB = false 时，日志不写入数据库; 其他日志都需要写入数据库
			if(throwable != null || writeLog.db()){
				writeLogByDB(loginUser, clientIp, serverIp, System.currentTimeMillis() - start, writeLog.log(), throwable);
//				writeLogByhttp(loginUser, clientIp, serverIp, System.currentTimeMillis() - start, writeLog.log(), throwable);
			}
		}
		return object;
	}

	/**   
	 * @Description: 将日志写入数据表
	 * @author zhangwenfeng031
	 * @date 2016年10月24日 下午3:25:25 
	 * @version Version 1.0.1 
	*/
	private void writeLogByDB(User loginUser, String clientIp, String serverIp, long costTime, LogDict log, Throwable e) {
		try {
			//记录DB日志
			Dict level = e == null?Dict.Error_Level_Info:log.getLevel();
			String desc = e == null?"执行成功!":("执行失败:"+e.getMessage().substring(0, e.getMessage().length()>150?150:e.getMessage().length()));
			OpLogForm opLog = new OpLogForm(log.getName(), desc, level.getName());
			opLog.setAddress(clientIp);
			opLog.setCreateBy(loginUser==null?"-1":loginUser.getId().toString());
			opLog.setOperator(loginUser==null?"unknow":loginUser.getLoginName());
			opLog.setCostTime(String.valueOf(costTime));
			opLog.setServerIp(serverIp);
			opLogsService.addLogger(opLog);
		} catch (Exception exception) {
			logger.error("日志写入异常!", exception);
		}
	}
	
	
}
