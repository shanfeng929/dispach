/**
 * 机构设置,'commons.sys.organ.OrganTreeView','ALM.view.commons.sys.organ.OrganTreeView'
 */
Ext.define(projectName + '.view.commons.sys.organ.OrganListView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.organList',
	requires : [projectName + '.lib.component.AlmTreePanel',
	            projectName + '.view.commons.sys.organ.OrganFormView'],
	layout : {
		type : 'hbox',
		align : 'stretch'
	},
	autoScroll : true,
	initComponent : function() {
		var me = this;
		var store = Ext.create(projectName + '.store.commons.sys.organ.OrganTreeStore');
		this.items = [{
			xtype : 'almTreePanel',
			id : 'organTree',
			rootVisible : false,
			isParentItemClick : true,
			name : 'organTree',
			isHidden:true,
			store : store,
			width : '20%',
			contextMenus : [{
				text : '修改',
				itemId : 'editOrgan',
				handlerFunction : function(record, item) {
					var parentId = record.data.parentid;
					if (record.data.id == null) {
						alert(DISPATCH.lib.Constants.MSG_SELECT_CHILD_NODE);
					}
					var organForm = Ext.getCmp("organForm");
					Ext.getCmp('organ_save').setVisible(true);
					organForm.form.findField("id").setValue(record.data.id);
					organForm.form.findField("dataStatus")
							.setValue(record.data.datastatus);
					organForm.form.findField("parentId").setValue(parentId);
					organForm.form.findField("disOrder")
							.setValue(record.data.disorder);
					organForm.form.findField("name").setValue(record.data.text)
							.setReadOnly(false);
					organForm.form.findField("code").setValue(record.data.code)
							.setReadOnly(false);
					organForm.form.findField("shortName")
							.setValue(record.data.shortname).setReadOnly(false);

					organForm.form.findField("description")
							.setValue(record.data.description)
							.setReadOnly(false);

					if (parentId != null) {
						Ext.Ajax.request({
									url : basePath + '/commons/organ/'
											+ parentId + '/getParentName',
									success : function(response) {
										var json = Ext
												.decode(response.responseText);
										organForm.form.findField("parentName")
												.setValue(json.mapItems.NAME);
									},
									failure : function(response) {

									}

								});
					}

				}

			}, {
				text : '新建',
				itemId : 'addOrgan',
				handlerFunction : function(record, item) {
					var organForm = Ext.getCmp('organForm');
					var parentId = record.data.id;
					organForm.form.findField('id').setValue(null);
					organForm.form.findField('parentId').setValue(parentId);
					organForm.form.findField('dataStatus').setValue('1');
					organForm.form.findField('disOrder').setValue('');

					organForm.form.findField('name').setValue('')
							.setReadOnly(false);
					organForm.form.findField('code').setValue('')
							.setReadOnly(false);
					organForm.form.findField('shortName').setValue('')
							.setReadOnly(false);

					organForm.form.findField('description').setValue('')
							.setReadOnly(false);

					Ext.getCmp('organ_save').setVisible(true);

					if (parentId != null) {
						Ext.Ajax.request({
									url : basePath + '/commons/organ/'
											+ parentId + '/getParentName',
									success : function(response) {
										var json = Ext
												.decode(response.responseText);
										organForm.form.findField("parentName")
												.setValue(json.mapItems.NAME);
									},
									failure : function(response) {
									}

								});

					}
				}
			}, {
				text : '删除',
				itemId : 'deleteOrgan',
				handlerFunction : function(record, item) {
					var id = record.data.id;
					var leaf = record.data.leaf;
					if (leaf != true) {
						alert('此机构含有子机构，不能删除！');
						return;
					}
					Ext.MessageBox.confirm(DISPATCH.lib.Constants.MSG_TITLE_INFO,
							DISPATCH.lib.Constants.MSG_DELETE_CONFIRM, function(btn,
									text) {
								if (btn == 'yes') {
									var organTree = Ext.getCmp('organTree');
									Ext.Ajax.request({
										url : basePath + '/commons/organ/' + id
												+ '/deleteOrgan',
										success : function(response, resgsp) {
											var json = Ext
													.decode(response.responseText);
											Ext.example
													.msg(
															DISPATCH.lib.Constants.MSG_TITLE_INFO,
															json.message);
											organTree.store.load();
//											console.dir(this);
											me.reloadInitOrganForm(me);
										}
									});
								}
							});
				}
			}]
		}, {
			xtype : 'organForm',
			id : 'olv_organForm',
			region : 'center',
			width : '80%'
		}]
		this.callParent(arguments);
	},
	
	
	reloadInitOrganForm: function(organList) {
		organList.remove('olv_organForm');
    			
		var newViewForm = Ext.create('widget.organForm',{
			id : 'olv_organForm',
			region : 'center',
			width : '75%'
		});
		
		organList.items.add(newViewForm);
		organList.doLayout(true);//调用后listView才加载
		newViewForm.getChildByElement('organ_save',true).setVisible(false);
	}
	
});
