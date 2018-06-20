/**
 * 文件上传下载工具类
 */
Ext.define(projectName +'.lib.functions.FileLoadUtil', {
    singleton: true,
    /**
     *
     * @param _url:请求地址
     * @param _params:请求地址
     * @param _callback：回调函数
     */
    upload: function (_url, _params, _suffix, _callback) {
        var form = Ext.create("Ext.form.Panel", {
            frame: true,
            buttonAlign: "right",
            //padding: 24,
            defaults: {
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                }
            },
            items: [
                {
                    xtype: 'filefield',
                    id: 'uploadfilename',
                    name: 'file',
                    fieldLabel: '上传文件',
                    labelWidth: 60,
                    width: 320,
                    //padding: 6,
                    buttonText: '浏览'
                }
            ],
            buttons: [
                {
                    text: '上传',
                    formBind: true,
                    disabled: true,
                    handler: function () {
                        var filename = form.getChildByElement('uploadfilename').getValue();
                        var msg = LRM.lib.functions.FileLoadUtil.validateFileSuffix(filename, _suffix);
                        if (msg != '') {
                            Ext.MessageBox.alert(LRM.lib.Constants.MSG_TITLE_INFO, msg);
                            return;
                        }
                        var mask = Ext.MessageBox.show({
                            title: LRM.lib.Constants.MSG_TITLE_INFO,
                            msg: '文件上传中,请稍后...',
                            iconCls: 'spinner',
                            width: 240,
                            closable: false
                        });
                        form.submit({
                            url: _url,
                            params: _params,
                            method: 'post',
                            success: function (form, action) {
                                mask.hide();
                                win.close();
                                Ext.MessageBox.alert(LRM.lib.Constants.MSG_TITLE_INFO, LRM.lib.Constants.MSG_RESULT_SUCCESS);
                                _callback(form, action);
                            },
                            failure: function (form, action) {
                                mask.hide();
                                Ext.MessageBox.alert(LRM.lib.Constants.MSG_TITLE_INFO, LRM.lib.Constants.MSG_RESULT_FAILURE);
                                _callback(form, action);
                            }
                        });
                    }
                },
                {
                    text: '取消',
                    handler: function () {
                        win.close()
                    }
                }
            ]
        });
        var win = Ext.create('Ext.Window', {
            title: "选择导入文件",
            layout: 'fit',
            width: 400,
            modal: true,
            resizable: false,
            items: [form]
        }).show();
    },
    /**
     * @param _filename
     * @param suffixArray 符合条件的文件格式数组：['xls','xlsx']
     * @returns {boolean}
     */
    validateFileSuffix: function (_filename, _suffixArray) {
        if (_suffixArray != undefined && _suffixArray != null && _suffixArray.length != 0) {
            if (_filename == undefined || _filename == '') {
                return '请选择需要上传的文件！';
            }
            var pass = false;
            var arr = _filename.split('.');
            var fileSuffix = arr[arr.length - 1];
            for (var k = 0; k < _suffixArray.length; k++) {
                if (fileSuffix == _suffixArray[k]) {
                    pass = true;
                }
            }
            if (pass == false) {
                return '文件格式错误，正确格式应包含：' + _suffixArray.join(',');
            }
        }
        return '';
    }
});