package com.sunyard.dispatch.common.model;

public class OperationIncludeAuthorityVO extends Operation {

	private static final long serialVersionUID = 1L;

	public OperationIncludeAuthorityVO() {
		super();
	}

	private Authority authority;

	public Authority getAuthority() {
		return authority;
	}

	public void setAuthority(Authority authority) {
		this.authority = authority;
	}
}
