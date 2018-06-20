/**
 * 首页标题菜单
 * @author			LiHao
 * @date 			2015年10月30日
 * @modify by		LiHao
 * @modify date     2015年10月30日
 * */
Ext.define('DISPATCH.view.facade.Banner', {
	extend : 'Ext.container.Container',
	alias : 'widget.banner',
	region : 'north',
	layout : 'column',
	cls : 'r-banner',
	items : [{
		columnWidth: 0.8,
		xtype : 'image',
		cls : 'r-logo'
	}, 
//	{
//		columnWidth: 0.45,
//		xtype : 'container',
//		cls : 'r-img-menu',				//此处调整菜单图标与左边距位置margin: 0 0 0 100px
//		items : [{
//			id : '100',
//			xtype : 'bannerImage',
//			cls : 'r-banner-menu-image r-sys'
//		}, 
////			{
////			id : '108',
////			xtype : 'bannerImage',
////			cls : 'r-banner-menu-image r-dat'
////		}, {
////			id : '111',
////			xtype : 'bannerImage',
////			cls : 'r-banner-menu-image r-par'
////		}, {
////			id : '113',
////			xtype : 'bannerImage',
////			cls : 'r-banner-menu-image r-exp'
////		},
//			{
//			id : '116',
//			xtype : 'bannerImage',
//			cls : 'r-banner-menu-image r-lab'
//		}/*, {
//			id : '6',
//			xtype : 'bannerImage',
//			cls : 'r-banner-menu-image r-inn'
//		}, {
//			id : '7',
//			xtype : 'bannerImage',
//			cls : 'r-banner-menu-image r-out'
//		}, {
//			id : '8',
//			xtype : 'bannerImage',
//			cls : 'r-banner-menu-image r-dec'
//		}, {
//			id : '9',
//			xtype : 'bannerImage',
//			cls : 'r-banner-menu-image r-eng'
//		}*/]
//	}, 
	{
		columnWidth: 0.15,
		xtype : 'container',
		layout:'hbox',
		items : [{
			xtype : 'container',
			width : '80%',
			html  : '<div style="float:right;margin-top:30px;">'+
					'<a style="margin-top:20px;">用户：</a>'+currentName+
					'</div>'
		},{
			xtype : 'container',
			width : '20%',
			html  : '<div style="float:right;margin-top:30px;margin-right:10px">'+
					'<a href="login/logout">退出</a>'+
					'</div>'
		}]
	}],
	initComponent : function(){
		this.callParent();
	}
});                              
/**
 * 定义系统大图标
 * */
Ext.define('DISPATCH.view.facade.TopImage', {
	extend : 'Ext.Img',
	alias : 'widget.bannerImage',
	cls:'r-banner-menu-image'
});