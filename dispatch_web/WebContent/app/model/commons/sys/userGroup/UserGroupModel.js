/**
 * 用户组树model
 */
Ext.define(projectName +'.model.commons.sys.userGroup.UserGroupModel',{
	extend:'Ext.data.Model',
	fields:[
		{name:'id',type:'int'},
		{name:'name',type:'string'},
		{name:'text',type:'string'},
		{name:'code',type:'string'},
		{name:'description',type:'string'},
	    {name:'parent_id',type:'int'},
	    {name:'data_status',type:'int'},
	    {name:'des',type:'string'}

	]
});