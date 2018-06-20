Ext.define(projectName + '.view.commons.sys.user.UserGridView', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.userGrid',
	layout : 'fit',
	columnLines : true,
	selModel : Ext.create('Ext.selection.CheckboxModel'),
	initComponent : function() {
		var me = this;

		Ext.applyIf(this, {
			columns : [ {
				xtype : 'rownumberer',
				text : '序号',
				align : 'center',
				width : 60
			}, {
				text : 'id',
				dataIndex : 'id',
				hideable : true,
				hidden : true,
				flex : 1
			}, {
				text : '机构',
				align : 'center',
				dataIndex : 'organName',
				flex : 1
			}, {
				text : '登录名',
				align : 'center',
				dataIndex : 'loginName',
				flex : 1
			}, {
				text : '姓名',
				align : 'center',
				dataIndex : 'realName',
				flex : 1
			}, {
				text : '角色',
				align : 'center',
				dataIndex : 'roles',
				flex : 1
			}, {
				text : '电话',
				align : 'center',
				dataIndex : 'phone',
				flex : 1
			}, {
				text : '邮箱',
				align : 'center',
				dataIndex : 'post',
				flex : 1
			}, {
				text : '状态',
				align : 'center',
				dataIndex : 'dataStatus',
				flex : 1,
				renderer : function(r){
					if(r==4){
						return "禁用";
					}else{
						return "可用";
					}
				}
			} ]

		});
		me.callParent(arguments);
	}
});