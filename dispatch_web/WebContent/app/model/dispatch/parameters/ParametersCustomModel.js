// 自定义参数表的模型
Ext.define(projectName + '.model.dispatch.parameters.ParametersCustomModel', {
			extend : 'Ext.data.Model',
			fields : ['custom_para_id', 'custom_para_type', 'custom_para_name',
					'custom_para_value', 'deletable']
		});