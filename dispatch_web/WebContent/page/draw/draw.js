GooFlow.prototype.alertTwoStartNode = function(){
	Ext.MessageBox.alert("注意：","不允许有两个开始节点！");
}
GooFlow.prototype.onBtnNewClick = function(){
	Ext.MessageBox.prompt('新建服务', '请输入您的服务名称:', function(btn, txt){
		if(btn === 'ok'){
			GooFlow.prototype.$title = txt;
		}
	});
}
GooFlow.prototype.onContextClick = function(){
//	var me = Ext.create('Ext.Window', {
//        title: '配置上下文变量',
//        width: 600,
//        height: 400,
//        x: 100,
//        y: 100,
//        modal: true,
//        layout: 'fit',
//        buttons : [{
//			height : 25,
//			text : '保存',
//			iconCls:'save',
//			action : 'save'
//		}, {
//			height : 25,
//			text : '取消',
//			iconCls: 'exit',
//			handler : function() {
//				me.close();
//			}
//		}]
//    }).show();
//	var window = Ext.create(projectName+'.view.dispatch.etldispatch.TemplateAddView');
//	window.show();
}
GooFlow.prototype.openNodeDialog = function(node){
	var me = Ext.create('Ext.Window', {
        title: node.name,
        width: 600,
        height: 400,
        x: 100,
        y: 100,
        layout: 'fit',
        buttons : [{
			height : 25,
			text : '保存',
			iconCls:'save',
			action : 'save'
		}, {
			height : 25,
			text : '取消',
			iconCls: 'exit',
			handler : function() {
				me.close();
			}
		}]
    }).show();
	return '22222';
}
