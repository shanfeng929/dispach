Ext.define(projectName + '.lib.component.PageToolBar',{
	extend:'Ext.PagingToolbar',
	alias:'widget.pagebar',
	
	initComponent:function(){
		var me = this;
		Ext.apply(me,{
			displayInfo : true,
			beforePageText : '第',
			afterPageText : '页 共{0}页',
			firstText : '首页',
			lastText : '末页',
			prevText : '上一页',
			nextText : '下一页',
			refreshText : '刷新',
			displayMsg : '当前显示第{0} - {1} 共 {2}',
			emptyMsg : "没有记录"
		});
		me.callParent(arguments);
	}
});