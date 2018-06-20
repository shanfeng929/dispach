/*获取输入字段的真实长度，包含对中文长度的判断*/
function getFieldRealLength(fieldValue) {  
    var sum = 0;  
    for (var i = 0; i < fieldValue.length; i++) {  
        if ((fieldValue.charCodeAt(i) >= 0) && (fieldValue.charCodeAt(i) <= 255)) {  
            sum = sum + 1;  
        } else {  
            sum = sum + 3; // oracle 数据库字符集设置为 AL32UTF8,一个汉字占3个字符  
        }  
    }  
    return sum;  
}

/*验证字段长度*/
function validateFieldLength(fieldValue,limitLength,objectName){
	if(getFieldRealLength(fieldValue) > limitLength){
		Ext.Msg.alert('长度验证出错，请检查',	objectName+' 当前已输入值长度：'+getFieldRealLength(fieldValue)+',但不允许超过长度为：'+limitLength);
		return false
	}else{
		return true
	}
	
}

/*fieldValue,objectName,isNull,format 要验证的值,提示对象名称,true允许为空/false不允许为空,Y年M月D日*/
function validateDate(fieldValue,objectName,isNull,format)  
{    
	 var year='';
     var month='';
     var date='';
     var fieldValueDate='';
	try    
    {
	 if(isNull && fieldValue.length == 0){ /*允许为空，并且长度为0*/
		 return true;
	 }
	 if(format == 'Y'){
		 if(fieldValue.length == 4 || fieldValue.length ==6 || fieldValue.length ==8){
			  
		 }else{
			 Ext.Msg.alert("日期格式不正确",objectName+"正确格式为:20151103，长度为4,6,8位");
			 return false;
		 }
	 }else if(format=='M'){
		 if(fieldValue.length ==6 || fieldValue.length ==8){
			  
		 }else{
			 Ext.Msg.alert("日期格式不正确",objectName+"正确格式为:20151103，长度为6,8位");
			 return false;
		 }
	 }else if(format=='D'){
		 if(fieldValue.length ==8){
			  
		 }else{
			 Ext.Msg.alert("日期格式不正确",objectName+"正确格式为:20151103，长度为8位");
			 return false;
		 }
	 }else{
		 Ext.Msg.alert("日期格式不正确",objectName+"正确格式为:20151103，长度为4,6,8位");
		 return false;
	 }
	
	 if(fieldValue.length == 4){
		 year=fieldValue.substring(0,4);
		 fieldValueDate=year;
		 var regex = /^(d{4})$/;
	     var d = new Date(fieldValueDate.replace(regex, '$1'));/*确保能转化成日期格式*/
	     if(!checkYear(year,objectName)){return false;}
	     return true;
	 }else if(fieldValue.length == 6){
		 year=fieldValue.substring(0,4);
		 month=fieldValue.substring(4,6);
		 fieldValueDate=year+'-'+month;
		 var regex = /^(d{4})-(d{2})$/;
	     var d = new Date(fieldValueDate.replace(regex, '$1$2'));/*确保能转化成日期格式*/
	     if(!checkYear(year,objectName)){return false;}
	     if(!checkMonth(month,objectName)){return false;}  
	     return true;
	 }else if(fieldValue.length == 8){
		 year=fieldValue.substring(0,4);
		 month=fieldValue.substring(4,6);
		 date=fieldValue.substring(6,8);
		 fieldValueDate=year+'-'+month+'-'+date;
		 var regex = /^(d{4})-(d{2})-(d{2})$/;
	     var d = new Date(fieldValueDate.replace(regex, '$1$2$3'));/*确保能转化成日期格式*/
	     if(!checkYear(year,objectName)){return false;}
	     if(!checkMonth(month,objectName)){return false;}  
	     if(!checkDate(year,month,date,objectName)){return false;}
	     return true;
	 }
	 
    }    
    catch(e)    
    {    
    	Ext.Msg.alert("日期格式不正确",objectName+" 正确格式为:20151103");
        return false;
    } 
} 

/*fieldValue,objectName,format 要验证的值 1-5 ,提示对象名称,允许的范围分隔符 -/,等*/
function validateScopeWithInteger(fieldValue,objectName,format)  
{    
	try    
    {    
		 var regex = new RegExp('^(\\d+)'+format+'(\\d+)$');
		 
	     if(!regex.test(fieldValue)) {
	    	 Ext.Msg.alert("范围格式不正确",objectName+" 正确范围格式为: 数字-数字(如：1-9999)");
	    	 return false; 
	     }else{
	    	 var startInteger = fieldValue.replace(regex, '$1');
	    	 var endInteger = fieldValue.replace(regex, '$2');
	    	 if(parseInt(startInteger) <= parseInt(endInteger)){
	    		 return true;
	    	 }else{
	    		 Ext.Msg.alert("范围格式不正确",objectName+" 开始范围: "+startInteger+"<= 结束范围:"+endInteger);
		    	 return false; 
	    	 }
	     }
	     return true;
    }    
    catch(e)    
    {    
    	Ext.Msg.alert("范围格式不正确",objectName+" 正确范围格式为: 数字-数字(如：1-9999)");
        return false;
    }
}

/*验证必须输入为数字*/
function validateInteger(fieldValue,objectName)    
{    
      try    
      {    
    	  var regex =/^\d+$/;
    	  if(!regex.test(fieldValue)){ 
    		  Ext.Msg.alert("格式不正确",objectName+" 请输入正确的数字");
		  return false;} 
     return true;    
      }    
      catch(e)    
      {    
    	  Ext.Msg.alert("格式不正确",objectName+" 请输入正确的数字");
          return false;    
      }    
}

/*创建业务日期durDate,calFormat,dateFormat:时间天数 1,计算格式'+'或者'-',日期格式20151109 'Ymd'*/
function createWorkDate(durDate,calFormat,dateFormat)    
{    
      try    
      {    
    	  var durDateSeconds=parseInt(durDate)*24*60*60*1000;
    	  if(calFormat == '+'){
    		  var dt = Ext.Date.add(new Date(), Ext.Date.DAY, durDate);
    		  var workDate=Ext.Date.format(new Date(dt), 'Ymd');
    	  }else if(calFormat == '-'){
    		  durDate = -durDate;
    		  var dt = Ext.Date.add(new Date(), Ext.Date.DAY, durDate);
    		  var workDate=Ext.Date.format(new Date(dt), 'Ymd');
    	  }else{
    		  Ext.Msg.alert("异常"," calFormat，请检查参数");
    	  }
          return workDate;
      }    
      catch(e)    
      {    
    	  Ext.Msg.alert("异常"," createWorkDate出错，请检查参数");
          return workDate;
      }    
}


//检测特殊字符
function CheckStr(str){
	  var myReg = /[\f\n\r\/\\\*\?@#$%^&()！……￥!]/;
      if(myReg.test(str))
    	{return true;}
    else{
    return false;
    }
   }


