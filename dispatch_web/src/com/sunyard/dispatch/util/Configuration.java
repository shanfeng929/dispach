package com.sunyard.dispatch.util;

import com.sunyard.dispatch.common.model.User;

public class Configuration {
	private User user;
	
	private static Configuration configuration = new Configuration();
	private Configuration(){
	}
	public static  Configuration getInstance(){
		return configuration;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}

}
