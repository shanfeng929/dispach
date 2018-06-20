/**
 * 格式化工具类
 */
Ext.define(projectName +'.lib.functions.Formater', {
	singleton : true,

	/**
	 * 金额格式化函数
	 * 
	 * @param {number}
	 *            value before format
	 * @return {number} value after format
	 */
	numberRender : function(v) {
		return Ext.util.Format.number(v, '0,000.0000');
	},

	/**
	 * 数字转换为百分比
	 * 
	 * @param {number}
	 *            value
	 * @param {boolean}
	 *            isNeedDivide if the value need to divide 100.
	 */
	changeNumberToPercent : function(value, isNeedDivide) {
		if (!!isNeedDivide) {
			value = value / 100;
		}
		return value + '%';
	},

	changeTextColorByTrueOrFalse : function(value, reverse) {
		value = value || '', reverse = reverse || false;
		var trueColor = 'green', falseColor = 'red';
		if (reverse) {
			trueColor = 'red', falseColor = 'green';
		}
		if (value == '是' || value == 1 || value == 'true') {
			return '<span style="color:' + trueColor + ';">' + value
					+ '</span>';
		}
		if (value == '否' || value == 0 || value == 'false') {
			return '<span style="color:' + falseColor + ';">' + value
					+ '</span>';
		}
		return value;
	},

	formartDate : function(date) {
		var bdate;
		if (Ext.isIE) {
			bdate = Ext.Date.format(date, 'Y-m-d H:m:s');
		} else {
			bdate = date;
		}
		if (bdate != null) {
			if (bdate.length > 10) {
				var date = bdate.substring(0, 10) + ' '
						+ bdate.substring(11, bdate.length);
				return date;
			} else {
				return '-';
			}
		} else {
			return '-';
		}
	},

	changeDateFormat : function(date) {
		if (date == null) {
			return null;
		} else {
			if (Ext.isIE) {
				var bdate = date.toString().replace(/-/g, "/").replace(/T/g,
						" ");
				return new Date(Date.parse(bdate));
			} else {
				return date;
			}
		}
	},

	getUpperAmount : function(money) {
		if (money >= 10000 * 100000000) {
			return '一万亿+';
		}

		var nums = [ '零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖' ];
		var units = [ '分', '角', '元', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿',
				'拾', '佰', '仟', '万' ];

		money = Math.round(money * 100);

		if (money < 1) {
			return '零元整';
		}

		var result = '';

		for (var i = 0; money > 0; i++, money = (money - money % 10) / 10) {
			result = nums[money % 10] + units[i] + result;
		}

		return result.replace(/(零[分角拾佰仟])+/g, '零').replace(/零?零([亿万元])/g, '$1')
				.replace(/零+$/, '').replace(/元$/, '元整').replace(/亿万/, '亿');
	},
	// FineReport url 编码,避免中文参数问题
	cjkEncode : function(url) {
		if (url == null) {
			return "";
		}
		var encodedUrl = "";
		for (var i = 0; i < url.length; i++) {
			var code = url.charCodeAt(i);
			if (code >= 128 || code == 91 || code == 93) { // 91 is "[", 93 is
															// "]".
				encodedUrl += "[" + code.toString(16) + "]";
			} else {
				encodedUrl += url.charAt(i);
			}
		}
		return encodedUrl;
	},
	
	formatColumn : function(value, type) {
		var returnValue;
		type = type || '';
		switch (type) {
		case 'date':
			returnValue = this.formartDate(value);
			break;
		default:
			returnValue = value;
		}
		return returnValue;
	}
});