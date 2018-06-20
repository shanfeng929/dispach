package com.sunyard.dispatch.common;

public class Err extends RuntimeException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public Err(String message){
		super(message);
	}

	public Err(String string, Throwable e) {
		super(string, e);
	}

	public Err(Exception e) {
		super(e);
	}

	public String getCode(){
		
		return null;
	}
	
	public static Err onCode(String code){
		
		return null;
	}
}
