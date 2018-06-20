Ext.define(projectName + '.view.dispatch.flow.TaskMonitorGridView', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.taskMonitor',
	layout : 'fit',
	columnLines : true,
	autoScroll : true,
//	selModel : Ext.create('Ext.selection.CheckboxModel'),
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			columns : [ {
				xtype : 'rownumberer',
				text : '序号',
				align : 'center',
				width : 60
			}, {
				text : 'NODE_ID',
				dataIndex : 'NODE_ID',
				hideable : true,
				hidden : true
			}, {
				text : '节点名称',
				align : 'center',
				dataIndex : 'NODE_NAME',
				width : 120
			}, {
				text : '节点状态',
				align : 'center',
				dataIndex : 'NODE_STATUS',
				width : 100,
				renderer:function(val,a,row){
					/*流程--0：未执行；1：运行中；3：暂停；4：终止 */
					/*任务--0:正在执行;1:执行时间 超过2秒;2:执行成功;3:执行失败;4:未执行  */
					var returnVal="";
					if(row.data.NODE_ID.indexOf('task')<0){
						if(val=='0'){
							returnVal="未执行";
						}else if(val=='1'){
							returnVal="<font color=green>运行中</font>";
						}else if(val=='3'){
							returnVal="<font color=orange>暂停</font>";
						}else if(val=='4'){
							returnVal="<font color=red>终止</font>";
						}
					}else{
						if(val=='0'||val=='1'){
							returnVal="<font color=green>正在执行</font>";
						}else if(val=='2'){
							returnVal="<font color=green>执行成功</font>";
						}else if(val=='3'){
							returnVal="<font color=red>执行失败</font>";
						}else if(val=='4'){
							returnVal="未执行";
						}
					}
					return returnVal;
				}
			}]
		});
		me.callParent(arguments);
	}
});