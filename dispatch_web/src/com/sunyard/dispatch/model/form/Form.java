package com.sunyard.dispatch.model.form;

/**
 * 封装Extjs传递过来的分页参数(如果页面有用到分页则查询表单继承此类)<br />
 * 根据当前页数以及每页显示条数计算分页sql语句的起始条数以及终止条数
 * 
 * @author Guoyan
 * @version 1.0
 */
public class Form {

	private Integer page;

	private Integer limit;
	
	private Integer start;

	public Integer getPage() {
		return ((start/limit)+1);
	}


	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	/**
	 * 根据当前页数以及每页显示条数，计算开始条数，在分页中直接使用>即可
	 * 
	 * @return startNumber
	 */
	public Integer getStart() {
//		return (this.page - 1) * this.limit;
		return start;
	}

	/**
	 * 根据当前页数以及每页显示条数，计算开始条数，在分页中直接使用<即可
	 * 
	 * @return endNumber
	 */
	public Integer getEnd() {
//		return this.page * this.limit + 1;
		return this.start+this.limit+1;
	}

	public void setStart(Integer start) {
		this.start = start;
	}
}
