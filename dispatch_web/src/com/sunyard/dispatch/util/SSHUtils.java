package com.sunyard.dispatch.util;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import ch.ethz.ssh2.Connection;
import ch.ethz.ssh2.SFTPv3Client;
import ch.ethz.ssh2.SFTPv3FileHandle;

public class SSHUtils {
	
	private SFTPv3Client client;
	
	
	
	public SSHUtils(String hostname, String username, String password) {
		Connection conn = null;
		try {
			//建立连接
			conn = new Connection(hostname, 22);
			conn.connect();
			//登入
			boolean isauth = conn.authenticateWithPassword(username, password);
			if(!isauth){
				System.out.println("用户名:"+ username+ " 没有权限!");
				return;
			}
			//建一个sftp客户端
			SFTPv3Client sftpClient = new SFTPv3Client(conn);
			this.client =  sftpClient;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	
	//关闭资源
	public  void closeClient() {
		this.client.close();
	}
	
	public  String getContent(String fileName) {
		SFTPv3Client sftpClient = this.client;
		try{
			SFTPv3FileHandle sftpFileHandle = sftpClient.openFileRO(fileName);
			byte[] dst = new byte[1];
			StringBuilder builder = new StringBuilder();
			int i = 0;
			while(sftpClient.read(sftpFileHandle,  i, dst, 0, dst.length) != -1){
				builder.append(byteArrayToString(dst));
				i += 1;
			}
			sftpClient.closeFile(sftpFileHandle);
			return builder.toString();
		}catch(IOException e){
			return null;
		}
		
		
	}
	
	public static String byteArrayToString(byte[] bytes) throws UnsupportedEncodingException{
		return new String(bytes);
	}

}
