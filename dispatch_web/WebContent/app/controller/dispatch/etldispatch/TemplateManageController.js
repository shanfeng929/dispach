/**
 * 组件管理 控制
 */
Ext.define(projectName + '.controller.dispatch.etldispatch.TemplateManageController',{
		// 继承ext控制器
		extend : 'Ext.app.Controller',
		// 引用视图
		views : [
		         projectName+ '.view.dispatch.template.TemplateManageListView',
		         projectName+ '.view.dispatch.template.TemplateManageGridView',
		         projectName+'.view.dispatch.etldispatch.TemplateConfigView'
		],
		refs : [{
			ref : 'templateManageList',
			selector : 'templateManageList'
		}, {
			ref : 'templateManageGrid',
			selector : 'templateManageGrid'
		}, {
			ref : 'templateConfig',
			selector : 'templateConfig'
		}],
		init : function() {
			this.control({
				'templateManageList':{boxready: this.init_templateList},
				'templateManageList button[action=search]': {click: this.search_template_btn},
				'templateManageList button[action=add]' : {click: this.add_template_btn},
				'templateManageList button[action=edit]' : {click: this.edit_template_btn},
				'templateConfig button[action=save]' : {click: this.save_template_btn},
				'templateConfig button[action=parameterButton]' : {click : this.parameterButton},
				'templateManageList button[action=delete]' : {click: this.del_template_btn}
			});
		},
		init_templateList : function(){
			 var view = this.getTemplateManageList();
		     view.getChildByElement('btn_tpmlv_search', true).fireEvent('click');
		     // 有关双击打开编辑的修改_weilai
		var me = this;
		this.getTemplateManageGrid().on('itemdblclick', function() {
			var selected = me.getTemplateManageGrid().getSelectionModel()
					.getSelection();
			if (selected.length = 1) {
				me.edit_template_btn();
			}

		});
		},
		search_template_btn : function(){
			var viewList=this.getTemplateManageList();
	    	var view = this.getTemplateManageGrid();
	    	var templateName = encodeURI(viewList.getChildByElement('tf_tpmlv_name', true).getValue());
	    	Ext.apply(view.store.proxy.extraParams,{
				'templateName':templateName,
				'page': '1',
				'limit': DISPATCH.lib.Constants.PAGE_SIZE
			});
			view.getStore().loadPage(1);
		},
		add_template_btn : function(){
			var window = Ext.create(projectName+'.view.dispatch.etldispatch.TemplateConfigView');
			window.show();
		},
		edit_template_btn : function(){
			var templateList = this.getTemplateManageGrid();
			var selected = templateList.getSelectionModel().getSelection();
			if(selected.length != 1){
				Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_SELECTED_NOT_SINGLE);
				return;
			}
			var id = selected[0].data.id;
			Ext.Ajax.request({
				url: basePath+'/dispatch/template/findTemplateById',
				async:false,
				params : {
					id : id
				},
				success:function(response){
					var responseJson = Ext.decode(response.responseText);
					var window = Ext.create(projectName+'.view.dispatch.etldispatch.TemplateConfigView',{'record':responseJson.mapItems});
					Ext.getCmp(projectName + '.view.dispatch.etldispatch.TemplateConfigView.templateError').setValue(responseJson.mapItems.templateError);
					Ext.getCmp(projectName + '.view.dispatch.etldispatch.TemplateConfigView.templateBranch').setValue(responseJson.mapItems.templateBranch);
					Ext.getCmp(projectName + '.view.dispatch.etldispatch.TemplateConfigView.templateActive').setValue(responseJson.mapItems.templateActive);
					window.title = "修改组件配置";
					window.show();
				},
				failure:function(response){
					var responseJson = Ext.decode(response.responseText);
					Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,responseJson.message);
				}
			});
		},
		save_template_btn : function(){
			var view = this.getTemplateConfig();
			var viewList = this.getTemplateManageGrid();
			var store = viewList.getStore();
			var templateForm=Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateForm');
			var templateStrategyForm=Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateStrategyForm');
			if(templateForm.getForm().isValid()&&templateStrategyForm.getForm().isValid()){
				var id=Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.id').getValue();
				var templateName= Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateName').getValue();
				var templateType=Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateType').getValue();
				var templateDesc= Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateDesc').getValue();
				var templateRemote=Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateRemote').getValue();
				var templateCommand=Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateCommand').getValue();
				var templateParameter=Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateParameter').getValue();
				var errorNum=Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.errorNum').getValue();
				var templateError=Ext.getCmp(projectName + '.view.dispatch.etldispatch.TemplateConfigView.templateError').getValue();
				var templateActive=Ext.getCmp(projectName + '.view.dispatch.etldispatch.TemplateConfigView.templateActive').getValue();
				var templateCustom=Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateCustom').getValue();
				var templateBranch=Ext.getCmp(projectName + '.view.dispatch.etldispatch.TemplateConfigView.templateBranch').getValue();
				var templateLoop=Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateLoop').getValue();
				if(templateActive=='是'||templateActive=='1'){
					templateActive='1';
				}else{
					templateActive='0';
				}
				if(templateError=='是'||templateError=='1'){
					templateError='1';
				}else{
					templateError='0';
				}
				if(templateBranch=='不是分支节点'||templateBranch=='0'){
					templateBranch=0;
				}else if(templateBranch=='正确分支节点'||templateBranch=='1'){
					templateBranch=1;
				}else if (templateBranch=='错误分支节点'){
					templateBranch=2;
				}
				var objString = encodeURI("id: "+id+"; templateName: "+templateName+"; templateType: "+templateType+"; templateDesc: "+templateDesc+"; templateRemote: "+templateRemote
					+"; templateCommand: "+templateCommand+"; templateParameter: "+templateParameter+"; errorNum: "+errorNum+"; templateError: "+templateError
					+"; templateActive: "+templateActive+"; templateCustom: "+templateCustom+"; templateBranch: "+templateBranch+"; templateLoop: "+templateLoop);
				Ext.Ajax.request({
					url : basePath + '/dispatch/template/saveOrUpdate',
					async:false,
					params : {
						'id':id,
						'templateName' : templateName,
						'templateDesc':templateDesc,
						'templateRemote':templateRemote,
						'templateCommand':templateCommand,
						'templateParameter':templateParameter,
						'errorNum':errorNum,
						'templateError':templateError,
						'templateActive':templateActive,
						'templateCustom':templateCustom,
						'templateBranch':templateBranch,
						'templateLoop':templateLoop,
						'paramsVal':objString
					},
					success : function(result) {
						var json = Ext.decode(result.responseText);
						store.load();
						view.close();
						Ext.Msg.show({
							title : '提示',
							msg : json.message,
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.INFO
						});
					},
					failure : function(form, action) {
						Ext.Msg.show({
							title : '提示',
							msg : json.message,
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
					}
				});
			}
		},
		parameterButton : function(){
			var paraCommand = Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateCommand').getValue();
			var paraName=Ext.getCmp(projectName+'.view.dispatch.etlflowdispatch.TemplateConfigView.paraName').getValue();
			var paraName_raw=Ext.getCmp(projectName+'.view.dispatch.etlflowdispatch.TemplateConfigView.paraName').getRawValue();
			var paraValue= Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.paraValue').getValue();
			if(paraName != ""){
				if (paraValue==""){
					Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateParameter').setValue(Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateParameter').getValue()+' '+paraName);	
					Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateCommand').setValue(paraCommand+' '+paraName_raw);
				}else{
					Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateParameter').setValue(Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateParameter').getValue()+' '+paraName+'='+paraValue);	
					Ext.getCmp(projectName+'.view.dispatch.etldispatch.TemplateConfigView.templateCommand').setValue(paraCommand+' '+paraName_raw);
				}
			}
		},
		del_template_btn : function(){
	    	var templateList = this.getTemplateManageGrid();
	    	var selected = templateList.getSelectionModel().getSelection();
	    	if(selected.length < 1){
	    		Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,DISPATCH.lib.Constants.MSG_SELECTED_ONE);
				return;
			}
	    	var store = templateList.getStore();
//	    	var id = selected[0].data.id;
	    	var ids = '';
	    	for(var i=0;i<selected.length;i++){
	    		ids += "'"+selected[i].data.id +"',";
	    	}
	    	ids = ids.substring(0,ids.length-1);
	    	Ext.MessageBox.confirm('提示','确定删除选中项吗？',function(optional){
	    		if(optional == 'yes'){
	    			Ext.Ajax.request({
	    				url: basePath+'/dispatch/template/deleteByIds',
	    				async:false,
	    				params : {
	    					ids : ids
	    				},
	    				success:function(response){
	    					var responseJson = Ext.decode(response.responseText);
	    					Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,responseJson.message);
	    				},
	    				failure:function(response){
	    					var responseJson = Ext.decode(response.responseText);
	    					Ext.Msg.alert(DISPATCH.lib.Constants.MSG_TITLE_INFO,responseJson.message);
	    				}
					});
			    	store.load();
	    		}
	    	});
	    }
});
				

		
		