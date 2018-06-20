package com.sunyard.dispatch.model;

public class TimeChartModel {
	
	private Integer times;//最近第几次
	private Double timeHour;//执行时间
	private String startTime;//执行日期
	
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public Integer getTimes() {
		return times;
	}
	public void setTimes(Integer times) {
		this.times = times;
	}
	public Double getTimeHour() {
		return timeHour;
	}
	public void setTimeHour(Double timeHour) {
		this.timeHour = timeHour;
	}
}
