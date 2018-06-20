/**
 * Ajax 工具类
 */
Ext.define(projectName +'.lib.functions.AjaxUtil', {
	singleton : true,
	/**
	 * 
	 * @param requestUrl:请求地址
	 * @param requestParams：请求参数
	 * @param callback：回调函数
	 */
	request : function(requestUrl, requestParams, callback) {
		Ext.Ajax.request({
			url : requestUrl,
			params : requestParams,
			success : function(response, gsp) {
				callback(response);
			},
			failure : function(response) {
				LRM.lib.FRMConstants.Exception(response);
			}
		});
	}
});