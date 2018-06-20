package com.sunyard.dispatch.util;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.text.ParseException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;

import com.sunyard.dispatch.common.model.User;
import com.sunyard.dispatch.security.authentication.CustomUserDetails;

/**   
 * @Description: 系统通用方式类
 * @author zhangwenfeng031  
 * @date 2016年10月24日 下午3:18:35 
 * @version Version 1.0.1
*/
public class CommonUtils {

	protected static Logger logger = LoggerFactory.getLogger(CommonUtils.class);
	
	
	/**   
	 * @Description: 获取当前服务器IP地址
	 * @author zhangwenfeng031  @return
	 * @date 2016年10月24日 下午3:19:03 
	 * @version Version 1.0.1 
	*/
	public static String getServerIp() {
		try {
			StringBuffer Ips = null;
			Enumeration<NetworkInterface> allNetInterfaces = NetworkInterface
					.getNetworkInterfaces();
			InetAddress ip = null;
			while (allNetInterfaces.hasMoreElements()) {
				NetworkInterface netInterface = (NetworkInterface) allNetInterfaces
						.nextElement();
				Enumeration<InetAddress> addresses = netInterface
						.getInetAddresses();
				while (addresses.hasMoreElements()) {
					ip = (InetAddress) addresses.nextElement();
					if (ip != null && ip instanceof Inet4Address) {
						if(!"127.0.0.1".equals(ip.getHostAddress())){
							if (Ips == null) {
								Ips = new StringBuffer();
								Ips.append(ip.getHostAddress());
							}else{
								Ips.append("/").append(ip.getHostAddress());
							}
						}
					}
				}
			}
			return Ips.toString();
		} catch (Exception e) {
			logger.error("获取服务IP异常!", e);
			return "未知IP";
		}
	}

	
	/**   
	 * @Description: 获取当前登录用户客户端IP地址
	 * @param request
	 * @author zhangwenfeng031  
	 * @date 2016年10月24日 下午3:19:26 
	 * @version Version 1.0.1 
	*/
	public static String getClientIp(HttpServletRequest request) {
		try{
			String ipAddress = request.getHeader("x-forwarded-for");
			if (StringUtils.isEmpty(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
				ipAddress = request.getHeader("Proxy-Client-IP");
			}
			if (StringUtils.isEmpty(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
				ipAddress = request.getHeader("WL-Proxy-Client-IP");
			}
			if (StringUtils.isEmpty(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
				ipAddress = request.getRemoteAddr();
				if (ipAddress != null && (ipAddress.equals("127.0.0.1") || ipAddress.equals("0:0:0:0:0:0:0:1"))) {
					// 根据网卡取本机配置的IP
					InetAddress inet = null;
					try {
						inet = InetAddress.getLocalHost();
						ipAddress = inet==null?null:inet.getHostAddress();
					} catch (Exception e) {
						logger.error("获取客户IP异常!", e);
					}
				}
			}
			// 对于通过多个代理的情况，第一个IP为客户端真实IP,多个IP按照','分割
			if (ipAddress != null && ipAddress.length() > 15) {
				if (ipAddress.indexOf(",") > 0) {
					ipAddress = ipAddress.substring(0, ipAddress.indexOf(","));
				}
			}
			return ipAddress;
		} catch (Exception e) {
			logger.error("获取客户IP异常!", e);
			return "未知IP";
		}
	}
	
	/**   
	 * @Description: 获取当前登录用户
	 * @author zhangwenfeng031
	 * @date 2016年10月24日 下午3:36:01 
	 * @version Version 1.0.1 
	*/
	public static User getCurrentUser(){
		User user = null;
		try{
			Object userObj = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			if (userObj instanceof CustomUserDetails) {
				user = ((CustomUserDetails) userObj).getUser();
			}
		}catch(Exception e){
			logger.error("获取登录用户异常!", e);
		}
		return user;
	}
	
	/**   
	 * @Description: 对象类型转成Map
	 * @author zhangwenfeng031  
	 * @date 2016年10月31日 上午10:04:02 
	 * @version Version 1.0.1 
	*/
	public static Map<String,Object> ObjectToMap(Object obj){
		if(obj == null){
			return null;
		}
		Map<String,Object> map = new HashMap<String,Object>();
		BeanInfo beanInfo;
		try {
			beanInfo = Introspector.getBeanInfo(obj.getClass());
			PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();    
	        for (PropertyDescriptor property : propertyDescriptors) {  
	            Method getter = property.getReadMethod();    
	            if (getter != null) {
	            	Object value = getter.invoke(obj);
	            	map.put(property.getName(), value);
	            }  
	        }
		} catch (Exception e) {
			logger.error("获取登录用户异常!", e);
		}    
		return map;
	}
	
	/**   
	 * @Description: 将String转为Integer
	 * @author zhangwenfeng031  
	 * @date 2016年10月31日 上午10:04:37 
	 * @version Version 1.0.1 
	*/
	public static Integer getInteger(String str){
		if(str == null || str.length() == 0 || str.trim().equals("") || str.trim().equalsIgnoreCase("null")){
			return null;
		}
		return Integer.valueOf(str);
	}
	
	/**   
	 * @Description: 判断字符是否为空：为空，空串，空格，“null"
	 * @author zhangwenfeng031 
	 * @date 2016年10月31日 上午10:06:20 
	 * @version Version 1.0.1 
	*/
	public static boolean isEmpty(String str){
		if(str == null || str.length() == 0 || str.trim().equals("") || str.trim().equalsIgnoreCase("null")){
			return true;
		}
		return false;
	}
	
	/**   
	 * @Description: 字符是否为空：为空，空串，空格，“null"时返回null,其他去除两边空格返回
	 * @author zhangwenfeng031
	 * @date 2016年10月31日 上午10:08:46 
	 * @version Version 1.0.1 
	*/
	public static String format(String str){
		if(str == null || str.length() == 0 || str.trim().equals("") || str.trim().equalsIgnoreCase("null")){
			return null;
		}
		return str.trim();
	}
	
	public static void main(String[] args) throws ParseException{
	}
	
}
