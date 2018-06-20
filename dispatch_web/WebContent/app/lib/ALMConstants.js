/**
 * 系统基础框架的通用资源
 * 不参杂任务业务上的数据
 */
Ext.define(projectName +'.lib.ALMConstants', {
    statics: {
        JSON_CONTENT_TYPE: 'application/json;charset=UTF-8',

        /**
         * @param response
         * @constructor
         */
        Exception: function (response) {
            if (response.status == 200) {
                var json = Ext.decode(response.responseText);
                if (json.success == false) {
                    Ext.MessageBox.alert('消息提示', json.message);
                }
                return;
            }
            if (response.status == 500) {
                Ext.MessageBox.alert('消息提示', "请求无响应，连接超时或服务器异常！");
                return;
            }

            Ext.MessageBox.alert('消息提示', "请求失败，连接超时或服务器异常，错误代码：" + response.status);
        },
        /**
         * 翻译字典
         * @param value
         * @param store
         * @returns {*}
         * @constructor*/
        DecodeDict: function (value, store) {
            var v = store.find('ITEM_CODE', value);
            var res = store.getAt(v);
            if (res == undefined)
                return value;
            return store.getAt(v).get('ITEM_NAME');
        }
    }
});


/**
 * 封装Ajax请求时包含对象和集合的参数。
 *
 * 用法示例：LRM.controller.ftpPrice.pricingManagement.FairPriceForecastController.fairPriceForecastSave()
 *
 * map格式：   var map = {id:1000,name:'FTP公允预测模型'}
 * data格式：  var data = [{term_id:10020,term_name:'一个月',value:0.5,{term_id:10022,term_name:'三个月',value:0.6}]
 *
 * @param map
 * @param data
 * @constructor
 */
function AjaxJson(map, data) {
    this.map = map;
    this.data = data;
}