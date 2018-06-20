Ext.define(projectName + '.view.dispatch.etldispatch.ops.TreeTabView', {
			extend : 'Ext.tab.Panel',
			autoDestroy : true,
			alias : 'widget.treeTab',
			requires : [
					projectName + '.view.dispatch.etldispatch.ops.*',
					projectName
							+ '.view.dispatch.etldispatch.ops.ModelTreeMenu'],
			tabPosition : 'bottom',
			layout : 'fit',
			initComponent : function() {
				var me = this;
				var organStore = Ext.create('Ext.data.TreeStore', {
							autoLoad:true,
							// model : titleModel,
							fields : ["children", "parentId", "leaf",
									"checked", "orgId", "orgCode", "bankNum",
									"shortName", "orgName", "orgType",
									"orgLevel", "parentOrgId", "contUser",
									"phoneNum", "address", "postCode", "email",
									"orgState", "remark", "innerCode"],
							proxy : {
								type : 'ajax',
								url : basePath+'/transmit/org/63950',
								writer : {
									writeAllFields : true,
									encode : true
								}
							}
						});
				var titleStore = Ext.create('Ext.data.TreeStore', {
							autoLoad:true,
							valueField : 'id',
							fields : ["children", "parentId", "leaf",
									"checked", "id", "title", "titleLevel"],
							model : projectName
									+ '.model.dispatch.etlflowdispatch.ops.TitleModel',
							displayField : 'title',
							proxy : {
								type : 'ajax',
								url : basePath+'/transmit/modeltitle/modelTitleList'
							}
						});
				Ext.apply(this, {
							defaults : {
								autoScroll : true
							},
							activeTab : 0,
							border : false,
							items : [{
										xtype : 'modelTree',
										/*
										 * fields : ["children", "parentId",
										 * "leaf", "checked", "orgId",
										 * "orgCode", "bankNum", "shortName",
										 * "orgName", "orgType", "orgLevel",
										 * "parentOrgId", "contUser",
										 * "phoneNum", "address", "postCode",
										 * "email", "orgState", "remark",
										 * "innerCode"],
										 */
										itemId : 'organTree',
										valueField : 'orgId',
										fields : ['orgType', 'orgName', 'orgId'],
										title : '机构',
										store : organStore,
										//width:200,
										displayField : 'orgName'
									}, {
										xtype : 'modelTree',
										itemId : 'titleTree',
										valueField : 'id',
										id : 'testPosition1',
										displayField : 'title',
										title : '主题',
										store : titleStore
									}]
						});
				this.callParent(arguments);
				// organStore.load();
				// titleStore.load();
				// debugger;
				/*var pos = Ext.getCmp('testPosition1');
				pos.on('itemdblclick', function(node, e) {
							// Ext.MessageBox.alert('','');
							// Ext.MessageBox.alert('a', '');
							var select = pos.getSelectionModel().getSelection();
							// Ext.MessageBox.alert(e.data.text,'');
							if (e.data.leaf == true) {
								debugger;
								Ext.MessageBox.alert(e.data.leaf, '');
							}
						})*/
			}
		});