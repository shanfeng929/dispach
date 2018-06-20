package com.sunyard.dispatch.controller;

import java.io.InputStream;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sunyard.dispatch.common.Const;
import com.sunyard.dispatch.util.BaseController;

@RequestMapping(value = "/transmit")
@Controller
public class TransmitController extends BaseController {

	// 之后要改成连接池

	@RequestMapping(value = "/**", produces = "text/html;charset=utf-8")
	@ResponseBody
	public String transmit() {
		CloseableHttpClient hClient = HttpClients.createDefault();
		CloseableHttpResponse remoteResponse = null;
		HttpEntity remoteEntity = null;
		InputStream in = null;
		String result = null;

		String requestUri = request.getRequestURI();
		for (int i = 0; i < 3; i++) {
			int j = requestUri.indexOf("/");
			requestUri = requestUri.substring(j + 1);
		}
		// System.out.println(request.getRequestURI().substring(18));
		String params = request.getQueryString();
		// System.out.println(params);
		String fullURL = Const.CRWM_URL + requestUri + '?' + params;
		System.out.println(fullURL);
		HttpGet hGet = new HttpGet(fullURL);
		try {
			remoteResponse = hClient.execute(hGet);
			remoteEntity = remoteResponse.getEntity();
			in = remoteEntity.getContent();
			byte[] read = new byte[1024];
			byte[] all = new byte[0];
			int num;
			while ((num = in.read(read)) > 0) {
				byte[] temp = new byte[all.length + num];
				System.arraycopy(all, 0, temp, 0, all.length);
				System.arraycopy(read, 0, temp, all.length, num);
				all = temp;
			}
			result = new String(all, "UTF-8");
			System.out.println(result);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (in != null) {
					in.close();
				}
				hGet.abort();
			} catch (Exception e) {
				e.printStackTrace();
			}
			try {
				remoteResponse.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			try {
				hClient.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return result;
	}
}
