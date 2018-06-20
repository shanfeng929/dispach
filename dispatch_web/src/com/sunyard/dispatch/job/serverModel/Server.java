package com.sunyard.dispatch.job.serverModel;

public class Server {
	public String ip;
	public String user;
	public String pwd;

	public String getHost() {

		return ip;
	}

	public String getUser() {
		return user;
	}

	public String getPwd() {
		return pwd;
	}

	public int getPort() {
		return 0;
	}

	public String getNamespace() {
		return null;
	}
}
