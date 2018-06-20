/** 日期工具类 */
Ext.define(projectName +'.lib.functions.DateUtil', {
	singleton : true,

	/**
	 * 年份(四位数字)
	 */
	getYear : function(d) {
		var date = d != null ? d : new Date();
		return date.getFullYear();
	},
	/**
	 * 月份(1~12)
	 */
	getMonth : function(d) {
		var date = d != null ? d : new Date();
		return date.getMonth() + 1;
	},
	/**
	 * 一个月中的某一天 (1~31)
	 */
	getDate : function(d) {
		var date = d != null ? d : new Date();
		return date.getDate();
	},
	/**
	 * 一周中的某一天 (1~7)
	 */
	getDay : function(d) {
		var date = d != null ? d : new Date();
		return date.getDay() + 1;
	},
	/**
	 * 某月的第一天
	 */
	getFirstDayOfMonth : function(year, month) {
		var d = new Date(year, month - 1, 1);
		return Ext.Date.format(d, 'Y-m-d');
	},
	/**
	 * 某月的最后一天
	 * 
	 * @param year
	 *            this.getYear()
	 * @param month
	 *            this.getMonth()
	 * @return format 'Y-m-d'
	 */
	getEndDayOfMonth : function(year, month) {
		var d = new Date(year, month - 1, this.getDaysOfMonth(year, month));
		return Ext.Date.format(d, 'Y-m-d');
	},
	/**
	 * 某月的天数
	 * 
	 * @param year
	 *            this.getYear()
	 * @param month
	 *            this.getMonth()
	 */
	getDaysOfMonth : function(year, month) {
		var first = new Date(year, month - 1, 1);
		var end = new Date(year, month, 1);
		return (end - first) / (1000 * 60 * 60 * 24);
	},
	/**
	 * 某周的第一天
	 * 
	 * @param year
	 *            this.getYear()
	 * @param month
	 *            this.getMonth()
	 * @param day
	 *            this.getDate()
	 * @param dayOfWeek
	 *            this.getDay()
	 * @return format 'Y-m-d'
	 */
	getFirstDateOfWeek : function(year, month, day, dayOfWeek) {
		var d = new Date(year, month - 1, day + 1 - dayOfWeek)
		return Ext.Date.format(d, 'Y-m-d');
	},
	/**
	 * 某周的最后一天
	 * 
	 * @param year
	 *            this.getYear()
	 * @param month
	 *            this.getMonth()
	 * @param day
	 *            this.getDate()
	 * @param dayOfWeek
	 *            this.getDay()
	 * @return format 'Y-m-d'
	 */
	getEndDateOfWeek : function(year, month, day, dayOfWeek) {
		var d = new Date(year, month - 1, day + (7 - dayOfWeek));
		return Ext.Date.format(d, 'Y-m-d');
	},
	/**
	 * 某年有多少周（元旦后第一个星期日算起）
	 * 
	 * @param year
	 *            this.getYear()
	 */
	getNumOfWeeks : function(year) {
		var d = new Date(year, 0, 1);
		var yt = ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) ? 366
				: 365;
		return Math.ceil((yt - d.getDay()) / 7.0);
	},
	/**
	 * 根据日期获得所在一年中第几周
	 */
	getIndexOfWeeks : function(d) {
		var date = d != null ? d : new Date();
		var firstDay = this.getFirstWeekDayOfYear(date.getFullYear());
		if (date < firstDay) {
			date = this.getFirstWeekDayOfYear(date.getFullYear() - 1);
		}
		date = Math.floor((date.valueOf() - firstDay.valueOf())
				/ (1000 * 60 * 60 * 24));
		// 与后台calendar计算一致 ，计算结果加2
		return Math.floor(date / 7) + 2;
	},

	/**
	 * 获取某年第一周的第一天（元旦后第一个星期日）
	 */
	getFirstWeekDayOfYear : function(year) {
		var date = new Date(year, 0, 1);
		var temp = date.getDay();
		if (temp == 0)
			return date;
		date.setDate(date.getDate() + (7 - temp));
		return date;
	}
});