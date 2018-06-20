function checkYear(year,objectName){  
	if(isNaN(parseInt(year))){  
		Ext.Msg.alert("年份",objectName+" 年份输入有误,请重新输入!");  
	    return false;  
	}  
	else if(parseInt(year)<1950 || parseInt(year) >2050)  
	{   
	    Ext.Msg.alert("年份",objectName+" 年份应该在1950-2050之间!"); 
	    return false;  
	}  
	else return true;  
}

function checkMonth(month,objectName){  
	if(isNaN(parseInt(month,10))){
		Ext.Msg.alert("月份",objectName+" 月份输入有误,请重新输入!");
		return false;
	}else if(parseInt(month,10)<1 || parseInt(month,10) >12){ 
		Ext.Msg.alert("月份",objectName+" 月份应该在1-12之间!");
        return false;
    }  
    else return true;
}

function checkDate(year,month,date,objectName){
    var daysOfMonth=CalDays(parseInt(year),parseInt(month));  
    if(isNaN(parseInt(date))){
    	Ext.Msg.alert("日期",objectName+" 日期输入有误,请重新输入!");
    	return false;
    } else if(parseInt(date)<1||parseInt(date)>daysOfMonth){ 
    	Ext.Msg.alert("日期",objectName+" 日期应该在1-"+daysOfMonth+"之间!");
    	return false;
    }  
    else return true;  
}

function CalDays(year,month){  
    var date= new Date(year,month,0);  
    return date.getDate(); 
}

function isLeapYear(year){  
    if((year %4==0 && year %100!=0) || (year %400==0)) return true;  
    else return false;  
}