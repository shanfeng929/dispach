/**
 * 菜单model
 */
Ext.define(projectName +'.model.commons.sys.menu.Node',{
	extend:'Ext.data.Model',
	fields:[
		{name:'text',type:'string'},
		{name:'itemId',type:'int'},
		{name:'view',type:'string'},
		{name:'controller',type:'String'},
		{name:'leaf',type:'boolean'},
		{name:'sequence',type:'int'},
		{name:'parent_id',type:'int'},
		 {name:'code',type:'string'},
		{name:'menu',type:'string'}
	]
});