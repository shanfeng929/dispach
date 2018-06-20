Ext.define('DISPATCH.controller.sys.Main', {
	extend : 'Ext.app.Controller',
	requires:['Ext.example.*',projectName + '.lib.Constants'],
	views: ['facade.Main','facade.Menu'],
	refs: [
	      {
			   ref: 'main',
			   selector: 'main'
	      }
	],
	init : function() {
		this.control({
			'xmenu button' : {
				mouseover: this.onMouseOver
			},
			'xmenu menu' : {
				click : this.onClick,
				mouseleave : this.onMouseLeave
			},
			'xmenu button[action=exit]': {
				click : this.userExit
			}
		});
		this.application.on({
			navigateView : this.navigateView,
			scope : this
		});
	},
	
	userExit : function() {
		//console.log('-----------------------');
	},
	
	onMouseLeave:function(menu, e, eOpts){
	
		menu.hide();
	},
	
	onMouseOver:function(menu, item, e, eOpts){
		
		menu.showMenu();
	},
	
	onClick : function(menu, item, e, eOpts) {
		this.navigatePath(item.itemId, item.text);
	},
	
	navigatePath : function(rawPath, title) {
		var viewPath = rawPath.match(/^!(.*)/i);
		viewPath ? this.navigateView(viewPath[1],title) : this.navigateExternal(rawPath);
	},
	
	navigateView : function(path, title) {
		
		var main = this.getMain();
		Ext.suspendLayouts();
		
		if(main.getComponent(path)){//判断选中menu对应的View是否已存在,如果存在,则直接激活
			main.setActiveTab(path);
			Ext.resumeLayouts(true);
			return ;
		}
		
		var viewClass = this.getView(path);
		var newItem = viewClass.create({
			someConfig:true
		});
		
		newItem.title = title;
		newItem.itemId=path;
		newItem.closable=true; 
		main.add(viewClass ? newItem : {
			html : '<span>devException: not found the view:' + path + '; if not dynamic load,need add it\'s controller(or itself) to app\'s controllers(or views)</span>'
		});
		main.setActiveTab(path);
		newItem.on({
		 	activate:function() {newItem.fireEvent('boxready');}
		});
		Ext.resumeLayouts(true);
		if(main.items.getCount() > 10){
			Ext.Msg.alert('系统提示','目前您打开页面过多，为了方便您的使用，请关闭不常用页面!');
		}
	},
	navigateExternal : function(url) {
		var main = this.getMain();
		main.removeAll(true);
		main.add({
			xtype : 'container',
			id : "externalView",
			html : '<iframe frameBorder="0" class="external" style="width:100%; height:100%; border:none;" src="' + url + '"></iframe>',
			flex : 1,
			border : false,
			bodyStyle : "border:0px; padding:0px; margin:0px;background-color:transparent;"
		});
	}
	
});