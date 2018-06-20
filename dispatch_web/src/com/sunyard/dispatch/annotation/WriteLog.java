package com.sunyard.dispatch.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.sunyard.dispatch.enums.LogDict;

/**   
 * @Description: 日志注解，请在需要打印日志的方法上加入该注解
 * @author zhangwenfeng031  
 * @date 2016年10月24日 下午3:22:10 
 * @version Version 1.0.1
*/
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface WriteLog {
	
	/**   
	 * @Description: 必输项，限定日志说明
	 * @author zhangwenfeng031
	 * @date 2016年10月26日 下午5:47:37 
	 * @version Version 1.0.1 
	*/
	LogDict log() default LogDict.Un_Know;
	
	/***   
	 * @Description: 非必输项，默认为  true . 当为 false时，日志记录不写入数据库。
	 * @author zhangwenfeng031
	 * @date 2016年10月26日 下午5:47:41 
	 * @version Version 1.0.1   
	*/
	boolean db() default true;
}
