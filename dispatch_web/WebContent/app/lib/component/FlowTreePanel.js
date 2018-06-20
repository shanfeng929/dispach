/**
 * 左侧树通用组件;封装内容：
 * 1、树形展示;
 * 2、查找功能;
 * 3、优化树 Store 加载方式,配置给树的Store 的root配置项初始化时需设置为空,如若不然，则Store会自动加载一次,
 *   store 配置参考：<LRM.store.example.TreeWithDynamicRootStore>,
 *   另：该组件自动给配置给该组件的store添加了load 事件，加载完成后展开树，避免store加载完成后树不显示的问题;
 * 
 * 备注:其他待后续完善;
 * 
 * 2015/3/3:
 *  1、增加右键点击选项，新建、修改、删除选择可配置
 *  参考内容：
 *  	LRM.view.example.TreePanelExample,
 *      LRM.controller.example.exampleController#treePanelExampleReady函数
 * 
 */
Ext.define(projectName + '.lib.component.FlowTreePanel',{
	extend: 'Ext.tree.Panel',
	alias: 'widget.flowTreePanel',
	requires: [],
//	flex: 1,
	width: '20%',
	resizable: true,
	singleExpand: false,//同时只能打开一个树,当打开其中任何一个树时,将会关闭其他已经打开的树目录     
    useArrows: true,//树形目录使用visita中树目录显示效果(三角形代替+号)
    expanded : true,//展开
	initComponent: function() {
		 var me = this ;
		 Ext.applyIf(me,{
			 viewConfig: {
				 stripeRows: true//斑马纹
			 },
			 dockedItems : [{
					xtype : 'toolbar',
					dock : 'top',
					style : 'background-color: #fff;',
					border : false,
					items : [{
						fieldLabel : '任务链名称',
						xtype: 'textfield',
						id: 'tf_ftp_name',
						width: 160,
						labelWidth: 60,
						margin: '0 0 0 5'
					},{
						xtype: 'button',
						text: '搜索',
						iconCls: 'icon-search',
						id: 'btn_ftp_search',
						action: 'search',
						margin: '0 0 0 5'
					}]
				}
				,{
					xtype : 'toolbar',
					dock : 'bottom',
					style : 'background-color: #fff;',
					border : false,
					items : [{
						xtype: 'button',
						text: '移动任务',
						iconCls: 'icon-open-menu',
						action: 'move',
						margin: '0 0 0 70'
					}]
				}
				]
		 });
		 me.callParent(arguments);
	}
});