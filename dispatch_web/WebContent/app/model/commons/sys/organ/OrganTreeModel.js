/**
 * 部门维度设置部门树model
 */
Ext.define(projectName +'.model.commons.sys.organ.OrganTreeModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'id',
						type : 'int'
					}, {
						name : 'code',
						type : 'string'
					}, {
						name : 'text',
						type : 'string'
					}, {
						name : 'shortname',
						type : 'string'
					}, {
						name : 'path',
						type : 'string'
					}, {
						name : 'parentid',
						type : 'int'
					}, {
						name : 'disorder',
						type : 'int'
					}, {
						name : 'description',
						type : 'string'
					}, {
						name : 'datastatus',
						type : 'int'
					}, {
						 name: 'leaf',
						 type: 'boolean'
					}, {
						 name: 'expanded',
						 type: 'boolean'
					}
			]
		});