package com.sunyard.dispatch.common;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class DateUtil {
	
	private Calendar calendar = new GregorianCalendar(); 
	
	/**
	 * 当前登陆日期的周一至周五的日期 比如 现在是2012-06-11 周一是2012-06-11 周五就是 2012-06-15
	 * @return
	 */
	public String currentWeekMondayDate(){
        calendar.set(Calendar.DAY_OF_WEEK, 2);  
//        System.out.println("登录日期的周一：" + print(calendar.getTime()));
        return print(calendar.getTime());
	}
	
	/**
	 * 星期五，第六天
	 * @return
	 */
	public String currentWeekFridayDate(){
        calendar.set(Calendar.DAY_OF_WEEK, 6);  
//        System.out.println("登录日期的周五：" + print(calendar.getTime()));
        return print(calendar.getTime());
	}
	
	/**
	 * 当前月的第一天
	 * @return
	 */
	public String currentMonthFirstDate(){
        calendar.set(Calendar.DAY_OF_MONTH, 1);  
//        System.out.println("当前月的第一天：" + print(calendar.getTime()));
        return print(calendar.getTime());
	}
	
	/**
	 * 当前月的最后一天
	 * @return
	 */
	public String currentMonthLastDate(){
        calendar.add(Calendar.MONTH, 1);  
        calendar.set(Calendar.DAY_OF_MONTH, 0);  
//        System.out.println("当前月的最后一天：" + print(calendar.getTime()));
        return print(calendar.getTime());
	}
	
	/**
	 * 当前季度第一天
	 * @return
	 */
	public String currentQuarterFirstDate(){
        calendar.setTime(new Date());  
        int month = getQuarterInMonth(calendar.get(Calendar.MONTH), true);  
        calendar.set(Calendar.MONTH, month);  
        calendar.set(Calendar.DAY_OF_MONTH, 1);  
//        System.out.println("当季度的第一天：" + print(calendar.getTime()));
        return print(calendar.getTime());
	}
	
	/**
	 * 当前季度最后一天
	 * @return
	 */
	public String currentQuarterLastDate(){
        calendar.setTime(new Date());  
        int month = getQuarterInMonth(calendar.get(Calendar.MONTH), false);  
        calendar.set(Calendar.MONTH, month + 1);  
        calendar.set(Calendar.DAY_OF_MONTH, 0);  
//        System.out.println("当前时间的季度末：" + print(calendar.getTime()));
        return print(calendar.getTime());
	}
		
	// 返回第几个月份，不是几月  
	// 春3，4，5. 夏6，7，8 秋9.10.11 冬12.1.2
    private static int getQuarterInMonth(int month, boolean isQuarterStart) {  
//      int months[] = { 1, 4, 7, 10 };
		int months[] = { Calendar.MARCH, Calendar.JUNE, Calendar.SEPTEMBER, Calendar.DECEMBER };
		if (!isQuarterStart) {  
//        	months = new int[] { 3, 6, 9, 12 };
			months = new int[]{ Calendar.MAY, Calendar.AUGUST, Calendar.NOVEMBER, Calendar.FEBRUARY };
		}  
		if (month >= Calendar.MARCH && month <= Calendar.MAY)  
			return months[0];  
		else if (month >= Calendar.JUNE && month <= Calendar.AUGUST)  
			return months[1];  
		else if (month >= Calendar.SEPTEMBER && month <= Calendar.NOVEMBER)  
			return months[2];  
		else  
			return months[3];  
	}	
	
    /** 
     * 获取指定日期所在周的周一 
     * @Methods Name getMonday 
     * @return Date 
     */  
    public Date getMonday(Date date){  
        Calendar cDay = Calendar.getInstance();     
        cDay.setTime(date);     
        cDay.set(Calendar.DAY_OF_WEEK, 2);//周日定位第一天，周一取第二天  
        return cDay.getTime();     
    }  
    
    /** 
     * 获取指定日期所在周日 
     * @Methods Name getSunday 
     * @return Date 
     */  
    public Date getSunday(Date date){  
        Calendar cDay = Calendar.getInstance();     
        cDay.setTime(date);  
        if(Calendar.DAY_OF_WEEK==cDay.getFirstDayOfWeek()){ //如果刚好是周日，直接返回  
            return date;  
        }else{//如果不是周日，加一周计算  
            cDay.add(Calendar.DAY_OF_YEAR, 7);  
            cDay.set(Calendar.DAY_OF_WEEK, 1);  
            System.out.println(cDay.getTime());  
            return cDay.getTime();  
        }    
    }  
    
    /** 
     * 得到本月第一天的日期 
     * @Methods Name getFirstDayOfMonth 
     * @return Date 
     */  
    public Date getFirstDayOfMonth(Date date)   {     
        Calendar cDay = Calendar.getInstance();     
        cDay.setTime(date);  
        cDay.set(Calendar.DAY_OF_MONTH, 1);  
        System.out.println(cDay.getTime());  
        return cDay.getTime();     
    }
   
    /** 
     * 得到本月最后一天的日期 
     * @Methods Name getLastDayOfMonth 
     * @return Date 
     */  
    public Date getLastDayOfMonth(Date date)   {     
        Calendar cDay = Calendar.getInstance();     
        cDay.setTime(date);  
        cDay.set(Calendar.DAY_OF_MONTH, cDay.getActualMaximum(Calendar.DAY_OF_MONTH));  
        System.out.println(cDay.getTime());  
        return cDay.getTime();     
    }
    
    /** 
     * 得到本季度第一天的日期 
     * @Methods Name getFirstDayOfQuarter 
     * @return Date 
     */  
    public Date getFirstDayOfQuarter(Date date)   {     
        Calendar cDay = Calendar.getInstance();     
        cDay.setTime(date);  
        int curMonth = cDay.get(Calendar.MONTH);  
        if (curMonth >= Calendar.JANUARY && curMonth <= Calendar.MARCH){    
            cDay.set(Calendar.MONTH, Calendar.JANUARY);  
        }  
        if (curMonth >= Calendar.APRIL && curMonth <= Calendar.JUNE){    
            cDay.set(Calendar.MONTH, Calendar.APRIL);  
        }  
        if (curMonth >= Calendar.JULY && curMonth <= Calendar.AUGUST) {    
            cDay.set(Calendar.MONTH, Calendar.JULY);  
        }  
        if (curMonth >= Calendar.OCTOBER && curMonth <= Calendar.DECEMBER) {    
            cDay.set(Calendar.MONTH, Calendar.OCTOBER);  
        }  
        cDay.set(Calendar.DAY_OF_MONTH, cDay.getActualMinimum(Calendar.DAY_OF_MONTH));  
//        System.out.println(cDay.getTime());  
        return cDay.getTime();     
    }
    
    /** 
     * 得到本季度最后一天的日期 
     * @Methods Name getLastDayOfQuarter 
     * @return Date 
     */  
    public Date getLastDayOfQuarter(Date date)   {     
        Calendar cDay = Calendar.getInstance();     
        cDay.setTime(date);  
        int curMonth = cDay.get(Calendar.MONTH);  
        if (curMonth >= Calendar.JANUARY && curMonth <= Calendar.MARCH){   
            cDay.set(Calendar.MONTH, Calendar.MARCH);  
        }  
        if (curMonth >= Calendar.APRIL && curMonth <= Calendar.JUNE){    
            cDay.set(Calendar.MONTH, Calendar.JUNE);  
        }  
        if (curMonth >= Calendar.JULY && curMonth <= Calendar.SEPTEMBER) {    
            cDay.set(Calendar.MONTH, Calendar.SEPTEMBER);  
        }  
        if (curMonth >= Calendar.OCTOBER && curMonth <= Calendar.DECEMBER) {    
            cDay.set(Calendar.MONTH, Calendar.DECEMBER);  
        }  
        cDay.set(Calendar.DAY_OF_MONTH, cDay.getActualMaximum(Calendar.DAY_OF_MONTH));  
//        System.out.println(cDay.getTime());  
        return cDay.getTime();     
    }
    
	private static String print(Date d) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
        return df.format(d);  
    } 
	
	public static void main(String[] args) {
		DateUtil d = new DateUtil();
		System.out.println(d.currentQuarterFirstDate() +"   "+ d.currentQuarterLastDate());
		System.out.println(print(d.getFirstDayOfQuarter(new Date()))+"   "+print(d.getLastDayOfQuarter(new Date())));
		
	}
}

	