/**
 * 菜单model
 */
Ext.define(projectName +'.model.commons.sys.menu.MenuListModel',{
	extend:'Ext.data.Model',
	alias : 'widget.node',
	fields:[
		{name:'text',type:'string'},
		{name:'id',type:'int'},
		{name:'view',type:'string'},
		{name:'controller',type:'String'},
		{name:'leaf',type:'boolean'},
		{name:'disOrder',type:'int'},
		{name:'parentid',type:'int'},
		{name:'code',type:'string'},
		{name:'dataStatus',type:'int'},
		{name:'children',type:'auto'}
	],
	idProperty:'id',
	associations: [
        {type: 'hasMany',model: projectName +'.model.commons.sys.menu.MenuListModel',name: 'children'}
     ]
});