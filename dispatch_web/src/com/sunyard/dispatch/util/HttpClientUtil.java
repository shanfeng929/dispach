package com.sunyard.dispatch.util;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**   
 * @Description: Http请求工具类
 * @author zhangwenfeng031  
 * @date 2016年11月8日 下午5:39:11 
 * @version V1.3.1   
*/
public class HttpClientUtil {
	private static HttpClientUtil instance = null;
	private static PoolingHttpClientConnectionManager poolManager = null;
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	private PoolingHttpClientConnectionManager getPoolManager() {
		return poolManager;
	}

	private void setPoolManager(PoolingHttpClientConnectionManager poolManager) {
		HttpClientUtil.poolManager = poolManager;
	}

	/**   
	 * @Description: 单例模式
	 * @author zhangwenfeng031
	 * @date 2016年11月8日 下午5:39:36 
	 * @version V1.3.1   
	 * @return 
	*/
	private static HttpClientUtil getInstance(){
		if(instance == null){
			instance = new HttpClientUtil();
			if (instance.getPoolManager() == null) {
				PoolingHttpClientConnectionManager poolManager = new PoolingHttpClientConnectionManager();
				poolManager.setMaxTotal(50);// 整个连接池最大连接数
				poolManager.setDefaultMaxPerRoute(5);// 每路由最大连接数，默认值是2
				instance.setPoolManager(poolManager);
			}
		}
		return instance;
	}
	
	/**   
	 * @Description: 获取连接
	 * @author zhangwenfeng031
	 * @date 2016年11月8日 下午5:48:39 
	 * @version V1.3.1   
	 * @return 
	*/
	private CloseableHttpClient getHttpClient() {
		HttpClientBuilder clientBuilder = HttpClients.custom();
		CloseableHttpClient httpClient = clientBuilder.setConnectionManager(poolManager).build();
		return httpClient;
	}

	/**   
	 * @Description: 访问URL，获取返回值
	 * @author zhangwenfeng031
	 * @date 2016年11月8日 下午5:51:23 
	 * @version V1.3.1   
	 * @param url
	 * @param paramList
	 * @return 
	*/
	private String doAction(String url, List<BasicNameValuePair> paramList){
		String result = null;
		CloseableHttpClient httpclient = null;
		try {
			httpclient = instance.getHttpClient();
			//httpclient = HttpClients.createDefault();
			UrlEncodedFormEntity entity = new UrlEncodedFormEntity(paramList, "UTF-8");
			HttpPost post = new HttpPost(url);
			post.setEntity(entity);
			CloseableHttpResponse response = httpclient.execute(post);
			result = EntityUtils.toString(response.getEntity(), "UTF-8");
		} catch (UnsupportedEncodingException e) {
			logger.error("远程调用Encoding异常,url = " + url + ",params = {"+ paramList.toString() + "}. ", e);
		} catch (ClientProtocolException e) {
			logger.error("远程调用Client异常,url = " + url + ",params = {"+ paramList.toString() + "}. ", e);
		} catch (IOException e) {
			logger.error("远程调用IO异常,url = " + url + ",params = {"+ paramList.toString() + "}. ", e);
		}
		return result;
	}

	/**   
	 * @Description: POST调用，无参
	 * @author zhangwenfeng031  
	 * @date 2016年11月8日 下午5:51:48 
	 * @version V1.3.1   
	 * @param url
	 * @return 
	*/
	public static String doPost(String url){
		HttpClientUtil httpClient = HttpClientUtil.getInstance();
		return httpClient.doAction(url, new ArrayList<BasicNameValuePair>());
	}
	
	/**   
	 * @Description: POST调用，有参
	 * @author zhangwenfeng031  
	 * @date 2016年11月8日 下午5:51:48 
	 * @version V1.3.1   
	 * @param url
	 * @return 
	*/
	public static String doPost(String url, Map<String,String> params){
		List<BasicNameValuePair> paramList = new ArrayList<BasicNameValuePair>();
		for(Map.Entry<String, String> entity:params.entrySet()){
			BasicNameValuePair nameValue = new BasicNameValuePair(entity.getKey(),entity.getValue());
			paramList.add(nameValue);
		}
		HttpClientUtil httpClient = HttpClientUtil.getInstance();
		return httpClient.doAction(url, paramList);
	}
}