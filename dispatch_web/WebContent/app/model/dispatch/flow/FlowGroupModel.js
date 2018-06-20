
Ext.define(projectName +'.model.dispatch.flow.FlowGroupModel', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'id', type: 'string'},
		{name: 'flowGroupName',type: 'string'},//流程分组名称
		{name: 'flowGroupDesc',type: 'string'},//流程分组备注
		{name: 'createBy', type: 'string'}, //创建者
		{name: 'createDate',type: 'string'}, //创建日期
		{name: 'updatedBy', type: 'string'},//更新者
		{name: 'updatedDate', type: 'string'},//更新日期
	]
});