/**
 * MVC模式的入口Controller,app.js初始化加载的Controller
 * @author			LiHao
 * @date 			2015年10月30日
 * @modify by		LiHao
 * @modify date     2015年10月30日
 * */
Ext.define('DISPATCH.controller.AppLaunchCtrl', {
	extend : 'Ext.app.Controller',
//	views:['ALM.view.commons.sys.user.ModifyPassView'],
	models:['Node'],
	refs : [{//上右下左
		ref : 'banner',
		selector : 'banner'
	},{
		ref : 'tabPanel',
		selector : 'tabPanel'
	},{
		ref : 'bottom',
		selector : 'bottom'
	},{
		ref : 'navigation',
		selector : 'navigation'
	}],
	init : function() {
		var me = this;
		this.control({
			'viewport' : {
				render : me.onRender					//Viewport渲染后
			},
			'banner bannerImage' : {
				render : me.onChooseMenu				//标题菜单点击事件
			}
		});
	},

	/**
	 * 渲染Viewport后的监听
	 * 查询后台所有标题菜单数据,生成左侧树菜单结构,默认初始化为系统管理菜单
	 * */
	onRender:function(){
		var me = this;
		Ext.Ajax.request({
			url:basePath+'/common/menu/selectRootMenuList',
			async:true,
			params : {
				pid : '0',
				id : '116'
			},
			callback:function(options,success,response){
				me.createTree(Ext.JSON.decode(response.responseText));				
			}
		});
	},
	/**
	 * 动态创建左侧菜单树
	 * 
	 * */
	createTree: function(datas){
		var me = this;
		Ext.each(datas, function(data){
			var tree = Ext.create('Ext.tree.Panel',{
				border : 0,									//不显示tree边框
				iconCls: data.iconCls,						//树节点图标
				useArrows : true,
				autoScroll : true,
				rootVisible : false,
				viewConfig : {
					loadingText : "正在加载..."
				},
				store : me.createTreeStore(data.id)
			});
			tree.on('itemdblclick', me.onTreeItemClick, me);	//注册树双击事件
			me.getNavigation().setTitle(data.text);			//设置左侧Navigation标题
			me.getNavigation().add(tree);					//将树装入容器中
		});
	},
	/**
	 * 使用Ext中TreeStore动态加载数据
	 * 
	 * */
	createTreeStore: function(id){
		var me = this;
		return Ext.create('Ext.data.TreeStore',{
			defaultRootId : id,
			model: me.getNodeModel().$className,
			proxy: {
				type: 'ajax',
				url: basePath+'/common/menu/selectChildMenuLists'
			},
			clearOnLoad: true,
			nodeParam: 'pid'								//treestore将自动传入id的值
		});
	},
	/**
	 * 选择菜单
	 * @param button : 	点击事件触发的按钮
	 * @param pressed : 按钮是否是按下，是的话是加载相关菜单
	 */
	onChooseMenu : function(button, pressed, eOpts) {
		var me = this;
		var btnId = button.getId();
		button.getEl().addListener('click',function(){
//			me.getNavigation().removeAll(true);
			me.onLoadLeftTree(btnId);
		});
	},
	/**
	 * 系统加载左侧功能树
	 * @param id : 菜单图标id，对应数据库pid为0的一级数据id
	 * */
	onLoadLeftTree : function(imageId){
		var me = this;
		me.getNavigation().removeAll(true);
		Ext.Ajax.request({
			url : basePath+'/common/menu/selectRootMenuList',// 动态获取面板的地址
			params : {
				pid : '0',
				id : imageId
			},
			method : 'GET',
			callback : function(options, success, response) {
				me.createTree(Ext.JSON.decode(response.responseText));
			}
		});
	},
	/**
	 * 左侧功能树节点点击事件
	 * 
	 * */
	onTreeItemClick: function(view, node){
		var me = this;
		var tab = me.getTabPanel();
		if (node.data.controller == "" || node.data.controller == null || node.data.view == ""
				|| node.data.view == null) {
			return;
		}
		if (node.isLeaf()) { 								//判断是否是根节点,进入为子节点
//			debugger;
			this.application.widget(tab,					//引入其他系统界面
					node.data.controller,
					node.data.view, 
					node,
					node.data.code);
		}
	},
	onSysExit : function() {
		Ext.MessageBox.confirm('提示',"是否确定<span style='color:red'>退出</span>系统？", 
			function(btn) {
				if (btn == 'yes') {
					window.location.href = basePath
							+ '/login/logout';
				}
			}
		);
	},
	modifyPass:function() {
		var view=Ext.create('DISPATCH.view.commons.sys.user.ModifyPassView');
		view.show();
	},
	save:function(){
		var view=this.getPassModify();
		var form=view.getComponent('userPassModifyForm').getForm();
		if(form.findField("password").getValue() ==""){
			Ext.example.msg("提示","原始密码为空！");
		}else if(form.findField("newPassword").getValue() == "" || form.findField("repeatpassword").getValue()=="") {
			Ext.example.msg("提示","新密码或者确认密码为空!");
		}else if(form.findField("repeatpassword").getValue() != form.findField("newPassword").getValue()){
			Ext.example.msg("提示","两次新密码不匹配!");
		}else {
			form.submit({
				url: basePath+'/commons/user/modifyUserPassword',
				success: function (form,action) {
					Ext.example.msg("提示",action.result.message);
					view.close();
				},failure: function (form,action) {
					Ext.example.msg("提示",action.result.message);
						view.close();
				}
			});
		}
	},
	OnReady : function() {
		Ext.getCmp('currLoginUserText').btnInnerEl.setStyle('color',"red");
	}
});