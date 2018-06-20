/* 组件MODEL */
Ext.define(projectName+'.model.dispatch.TemplateManageModel',{
	extend : 'Ext.data.Model',
	fields : [{name:'id', type:'string'},
	          {name:'templateName', type:'string'},//组件名称
	          {name:'templateDesc', type:'string'},//组件描述
	          {name:'templateRemote', type:'string'},//组件远程服务IP
	          {name:'templateCommand', type:'string'},//组件命令(执行语句)
	          {name:'templateParameter', type:'string'},//组件参数
	          {name:'errorNum', type:'int'},//容错次数
	          {name:'templateError', type:'string'},//是否容错
	          {name:'templateActive', type:'string'},//是否有效
	          {name:'templateCustom', type:'string'},//自定义条件
	          {name:'templateBranch', type:'string'},//是否是分支
	          {name:'templateLoop', type:'int'},//循环次数
	          {name:'paramsVal', type:'string'}
	]
});