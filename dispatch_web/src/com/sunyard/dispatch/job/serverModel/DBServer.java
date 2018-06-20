package com.sunyard.dispatch.job.serverModel;

public class DBServer extends ShellServer {
	public int port;
	public String namespace;
	public int getPort() {
		return port;
	}

	public String getNamespace() {
		return namespace;
	}
}
