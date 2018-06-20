/*
 * 产品分类参数表
 * BNK_CREDIT_BIZ_TYPE
 */
Ext.define(projectName +'.store.commons.common.BnkCreditBizTypeStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    fields: [
        {name: 'key', type: 'String'},
        {name: 'value', type: 'String'}
    ],
    proxy: {
        type: 'ajax',
        url: basePath + '/common/getKeyValue?type=BNK_CREDIT_BIZ_TYPE',
        reader: {
            type: 'json',
            root: 'listItems'
        }
    }
});