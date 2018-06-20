Ext.define(projectName + '.model.dispatch.EtlDispatchModel', {
	extend : 'Ext.data.Model',
	alias : 'widget.EtlDispatchModel',
	fields : [
  	// 定义属性
  	{
  		name : 'reMote',
  		type : 'String'
  	},{
  		name :'paraId',
  		type : 'String'
  	},{
  		name :'paraName',
  		type : 'String'
  	},{
  		name :'paraValue',
  		type : 'String'
  	},{
  		name : 'display',
  		type : 'String'
  	}],
	init : function() {
	}

})
  	
  	
