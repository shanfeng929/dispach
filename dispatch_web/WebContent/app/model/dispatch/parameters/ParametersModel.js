//参数配置表的模型
Ext.define(projectName + '.model.dispatch.parameters.ParametersModel',{
	extend:'Ext.data.Model',
	fields:['para_id','para_name','para_comment','para_type','para_value','static_para','create_by','create_date',
	        'update_by',
	        'update_date'
    ]
});