Ext.define(projectName + '.view.dispatch.etldispatch.DisPatchPackageListView', {
	extend : 'Ext.panel.Panel',
	// 别名
	alias : 'widget.disPatchPackageListView',
	requires: [projectName + '.lib.component.AlmTreePanel'],
	layout : 'border', 
	initComponent : function() {
		var me = this;
		var treestore = Ext.create(projectName +'.store.dispatch.flow.FlowGroupTreeStore');
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			errorSummary:false,
			saveBtnText:'添加',
			cancelBtnText:'取消',
			listeners:{
				
			}
		});
		rowEditing.on('edit', function(editor, e) {
    		if(e.record.data.FLOW_GROUP_NAME == ''){
    			Ext.Msg.alert("错误","下级任务链包名称不能为空");
//    			return;
    			gridPanel.getStore().remove(e.record);
    		}
		});
		var gridStore = Ext.create('Ext.data.Store', {
							fields : ['id','parent_id','flow_group_name','flow_group_desc'],
//     						model: 'DISPATCH.model.dispatch.etldispatch.PackageModel',
     						proxy: {
         						type: 'ajax',
         						url: basePath + '/dispatch/flowGroup/getChildPackage',
         						reader: {
             						type: 'json'
         						}
     						},
     						autoLoad: false
 		});
		var gridPanel = Ext.create('Ext.grid.Panel', {
			tbar: [{
				xtype:'button',
				text: '增加', 
				iconCls: 'icon-add',
				handler : function() {
		                rowEditing.cancelEdit();
		                // Create a model instance
		                var r = Ext.create('DISPATCH.model.dispatch.etlflowdispatch.PackageModel');
		                gridPanel.getStore().insert(0, r);
		                rowEditing.startEdit(0, 0);
				}
			}],
			store : gridStore,
    		columns : [{
				dataIndex : 'id',
//				hideable : true,
				hidden : true
			},{
				dataIndex : 'parent_id',
//				hideable : true,
				hidden : true
			},{
				text : '下级任务链包名称',
				align : 'center',
				dataIndex : 'flow_group_name',
				flex : 1,
				editor:{
					xtype:'textfield',
//					allowBlank:false,
					emptyText:'输入字段名称'
				}
			}, {
				text : '下级任务链包描述',
				align : 'center',
				dataIndex : 'flow_group_desc',
				flex : 1,
				editor:'textfield'
			},   {
				text : '操作',
				align : 'center',
				xtype : 'actioncolumn',
				width:100,
				items: [{
				    iconCls: 'icon-del',  // Use a URL in the icon config
				    tooltip: '删除',
				    handler: function(grid, rowIndex, colIndex) {
				    	Ext.MessageBox.confirm(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_DELETE_CONFIRM, function(btn, text){
						    if (btn == 'yes'){
						    	var store = grid.getStore();
				    			var rec = store.getAt(rowIndex).data;
//				    			debugger;
				    			if(rec.id==0||rec.id==null){
						    		//本地store删除
						    		var record = store.getAt(rowIndex);
						    		store.remove(record);
				    			}else{
				    				Ext.Ajax.request({
										url:basePath + '/dispatch/flowGroup/deleteFlowGroup',
										async:false,
										params:{
											'id':rec.id
										},
										callback : function(options, success, response) {
							//				debugger;
											var json = Ext.decode(response.responseText)
											if(response.status==200&&json.success){
												Ext.Msg.alert("提示",json.message);
												gridStore.reload();
											}else{
												Ext.Msg.alert("错误","删除失败");
												gridStore.reload();
											}
											treestore.load();
										}
									});
				    			}
								
						   	}
						});
				    }
				}]
			}],
			selType: 'rowmodel',
			plugins: [
				rowEditing
			],
    		height: 300,
    		width: 850
		}); 
		Ext.applyIf(me, {
			items : [{
				 // 变量视图引用
				xtype : 'almTreePanel',
				width:'20%',
				//rootVisible : false,
			//	forceFit: true,
				region:'west',
				//collapsible:true,
				//isHidden:true,
				store : treestore,
				isHidden : true,
				//autoScroll: true,
				//containerScroll: true,
				rootVisible: false,
				disableSelection: false,
//				id : '', 
				listeners:{
			     	itemclick : function(t, record, item, index, e, eOpts ){
			     		Ext.getCmp('packageName').setValue(record.raw.text);
			     		Ext.getCmp('comment').setValue(record.raw.flow_group_desc);
			     		Ext.getCmp('packageId').setValue(record.raw.id);
			     		gridStore.proxy.extraParams = {'pid' : record.data.id};
 						gridStore.load();
// 						debugger;
			     	}
				}
			},{
			region:'center',
			xtype : 'form',
			id : 'packageAddForm',
			border : false,
			padding : '5 5 0 5',
			style : 'background-color: #fff;',
			frame : true,
			maxHeight : 800,
			layout : {
				type : 'table',
				columns : 1
			},
			defaultType : 'textfield',
			defaults : {
				labelSeparator : ' ',
				labelWidth : 80,
				labelAlign : 'left',
				allowBlank : false,
				//readOnly : true,
				margin : '5 5 0 20'
			},
			items : [{
				xtype : 'container', 
				layout : {type : 'table', columns : 1},
				items: [{
					xtype:'fieldset',  
					title:'新增/修改任务链包',
					width:900,
					height:450,
					margin:'20 0 20 0',
					items:[{
						xtype:'form',
						id:'packageInfoForm',
						layout : {type : 'table', columns :2},
						width:850,
						margin:'10 0 10 0',
						items:[
						{
							xtype: 'textfield',
							id : 'packageId',
							name : 'packageId',
							hidden:true
						},
						{
							xtype: 'textfield',
							id : 'packageName',
							name : 'packageName',
							fieldLabel : '任务链包名称<font color="red">*</font>',
							labelWidth:100,
							margin:'10 280 10 20',
							allowBlank:false,
							colspan: 1
						},{
							xtype: 'textfield',
							id : 'comment',
							name : 'comment',
							fieldLabel : '任务链包描述',
							labelWidth:100,
							margin:'10 50 10 0',
							colspan: 1
						}]
					},
					gridPanel
					,{
						xtype:'toolbar',
						width:850,
						margin:'10 0 0 0',
						items:[{
							xtype:'button',
							text: '保存', 
							iconCls: 'icon-save',
							handler:function(){
									var packageName = Ext.getCmp('packageName').getValue();
									if('' == packageName || null == packageName){
										Ext.Msg.alert("提示","任务链包名称不能为空")
									}
									var models = gridPanel.getStore().getModifiedRecords();
									var list = [];
									var parentId = Ext.getCmp('packageId').getValue();
									var desc = Ext.getCmp('comment').getValue();
									list.push({'id':parentId,'flowGroupName':packageName,'flowGroupDesc':desc});
									if(models.length>0){
										for(var i = 0;i < models.length;i++){
											var model = models[i].data;
											list.push({'id':model.id,'flowGroupName':model.flow_group_name,'flowGroupDesc':model.flow_group_desc,'parentId':parentId});
										}
									}
									var data = JSON.stringify(list)
//									debugger;
									Ext.Ajax.request({
							//			type:'post',
							//			contentType: 'application/json',
										url:basePath + '/dispatch/flowGroup/insertOrUpateFlowGroup',
										async:false,
										params:{
											'flowGroupForms':data
										},
										callback : function(options, success, response) {
//											debugger;
											var json = Ext.decode(response.responseText)
											if(response.status==200&&json.success){
												Ext.Msg.alert("提示","更新成功");
//												debugger;
												if(typeof json.id == 'undefined'){
													gridStore.reload();
												}else{
													Ext.getCmp('packageId').setValue(json.id);
													gridStore.load({params:{pid:json.id}});
													
												}
												treestore.load();
											}else{
												Ext.Msg.alert("错误","更新失败");
												gridStore.reload();
											}
										}
									});
							},
							margin: '0 0 0 5'
						}]	
					}]
				}]
			}]
		}]
		});
		me.callParent(arguments);
	}
});