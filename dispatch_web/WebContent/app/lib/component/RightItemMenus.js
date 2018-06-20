/**
 * 右键选择项通用组件;
 * 
 * 该组件增加三个事件分别对应点击新建、修改、删除三个选项：NewAction，UpdateAction，DeleteAction
 * 使用该组件时可按需为新建、修改、删除选项的对应事件实现事件的实现；
 * 
 * 提供配置项：isNeedAddAction，isNeedUpdateAction，isNeedDeleteAction，分别对应是否显示新建、修改、删除项；
 * 提供设置点击右键时对应项记录方法 setHanderRecord，使用时调用组件需调用此方法设置值(也可以是对象)；
 * 
 * 参考内容：
 * 	   组件使用：LRM.lib.component.LrmTreePanel，LRM.view.example.TreePanelExample
 * 	   事件绑定：LRM.controller.example.exampleController#treePanelExampleReady函数；
 * 
 * 20150312更新：
 *   更新内容：
 *     1、调整内部选项添加机制及事件绑定机制,新机制更方便，参考：LRM.view.example.TreePanelExample
 *     注：contextMenu中的选项可以自由配置
 */
Ext.define(projectName + '.lib.component.RightItemMenus',{
	extend: 'Ext.menu.Menu',
	
	alias: 'widget.rightItemMenu',
	
	//对应每个选项的text,event...
	itemEntitys: [],
	
	//触发右键事件对应记录
	handerRecord:'',
	
	initComponent: function() {
		var me = this;
		
		Ext.applyIf(me,{
			items: me.itemEntitys,
			listeners:{
				click:function(menu,item,e,eOpts) {
					if(Ext.isFunction(item.handlerFunction)) {
						item.handlerFunction.call(this,menu.handerRecord,item);
					}
				}
			}
		});
		
		me.callParent(arguments);
	},
	setHanderRecord: function(rec) {
		this.handerRecord = rec;
	}
});