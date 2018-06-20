/**
 * 菜单model
 */
Ext.define(projectName +'.model.Node',{
	extend:'Ext.data.Model',
	fields:[
		{name:'text',type:'string'},
		{name:'id',type:'String'},
		{name:'parentid',type:'String'},
		{name:'view',type:'string'},
		{name:'controller',type:'String'},
		{name:'leaf',type:'boolean'},
		{name:'code',type:'string'}
	]
});