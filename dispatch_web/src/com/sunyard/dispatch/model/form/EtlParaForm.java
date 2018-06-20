package com.sunyard.dispatch.model.form;

public class EtlParaForm implements Cloneable{
		private int id;
		private String taskId;
		private String paraName;
		private String paraValue;
		private int paraId;
		private String overall;

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public String getTaskId() {
			return taskId;
		}

		public void setTaskId(String taskId) {
			this.taskId = taskId;
		}

		public String getParaName() {
			return paraName;
		}

		public void setParaName(String paraName) {
			this.paraName = paraName;
		}

		public String getParaValue() {
			return paraValue;
		}

		public void setParaValue(String paraValue) {
			this.paraValue = paraValue;
		}

		public int getParaId() {
			return paraId;
		}

		public void setParaId(int paraId) {
			this.paraId = paraId;
		}

		public String getOverall() {
			return overall;
		}

		public void setOverall(String overall) {
			this.overall = overall;
		}

	}
