/**
 * disableCaching:在启动时需要设断点时用，但是启用后会可能不随时更新js。
 */
Ext.Loader.setConfig({
	// for debug : remove _rc=**** timestamp to prevent caching.
	disableCaching : false,
	enabled : true,
	paths : {
		'DISPATCH' : 'app',
		'Ext.ux' : 'resources/extjs/examples/ux'
	}
});


/**
 * 会话超时处理
 * */
/*Ext.Ajax.on('requestexception',function(conn,response,options) {  
	   if(response.status='999'){ 
	       Ext.Msg.alert('提示', '会话超时，请重新登录!', function(){  
	           window.location = ctx+'/login.jsp';   
	       });  
	   }
});*/