package com.sunyard.dispatch.util;

import java.util.List;

import com.alibaba.fastjson.JSON;

/**
 * 
 * ClassName: JsonResultData <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason: TODO ADD REASON(可选). <br/>
 * date: 2015年9月25日 下午4:54:58 <br/>
 * 变量 count 返回的总行数大小 变量 list 查询返回的map对象的list 变量 jsonResult 返回json字符串
 * 
 * @author hardy
 * @version
 * @since JDK 1.6
 */
public class JsonResultData<T> {
	private int		count;
	private List<T>	list;
	private String	jsonResult;
	private Boolean	success;
	private String	message;

	public JsonResultData() {
		super();
	}

	public JsonResultData(Boolean success, String message) {
		this.success = success;
		this.message = message;
	}

	/* 设置总行数 */
	public void setCount(int count) {
		this.count = count;
	}

	/* 设置mapsql语句的查询list */
	public void setList(List<T> list) {
		this.list = list;
	}

	/* 返回json字符串 */
	public String getJsonResult() {
		String result = JSON.toJSONString(list);
		jsonResult = "{totalProperty:" + count + ",root:" + result + "}";
		return jsonResult;
	}

	/* 返回List字符串 */
	public String getListResult() {
		String result = JSON.toJSONString(list);
		return result;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public Boolean getSuccess() {
		return success;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public int getCount() {
		return count;
	}

	public List<T> getList() {
		return list;
	}

	public void setJsonResult(String jsonResult) {
		this.jsonResult = jsonResult;
	}

}
