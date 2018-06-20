package com.sunyard.dispatch.job.extraModel;

import java.util.List;

public class ProcedureModel {
	String sql;
	String modelCode;
	String result1;
	String result2;
	Boolean successful;
	Integer ruleType;
	public Integer getRuleType() {
		return ruleType;
	}
	public void setRuleType(Integer ruleType) {
		this.ruleType = ruleType;
	}
	List<Object> paras;
	public String getSql() {
		return sql;
	}
	public void setSql(String sql) {
		this.sql = sql;
	}
	public String getModelCode() {
		return modelCode;
	}
	public void setModelCode(String modelCode) {
		this.modelCode = modelCode;
	}
	public String getResult1() {
		return result1;
	}
	public void setResult1(String result1) {
		this.result1 = result1;
	}
	public String getResult2() {
		return result2;
	}
	public void setResult2(String result2) {
		this.result2 = result2;
	}
	public Boolean getSuccessful() {
		return successful;
	}
	public void setSuccessful(Boolean successful) {
		this.successful = successful;
	}
	public List<Object> getParas() {
		return paras;
	}
	public void setParas(List<Object> paras) {
		this.paras = paras;
	}
	public void putPara(Object para){
		paras.add(para);
	}
	public Boolean isSuccessful() {
		return this.successful;
	}
}
