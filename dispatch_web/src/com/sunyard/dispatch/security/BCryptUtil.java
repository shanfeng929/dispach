package com.sunyard.dispatch.security;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class BCryptUtil {
	
	/**
	 * BCrypt加密算法  
	 * @param passw
	 * @return
	 */
	public static String hashpw(String passw){
		
		String salt = BCrypt.gensalt();
		String pass = BCrypt.hashpw(passw, salt);
		
		return pass;
	}
	
	/**
	 * BCrypt 验证密码是否匹配  plaintext是明文  hashed是密文
	 * @param plaintext
	 * @param hashed
	 * @return
	 */
	public static boolean checkpw(String plaintext,String hashed ){
		
		return BCrypt.checkpw(plaintext, hashed);
	}
	
	public static void main(String[] args){
		String pass2 = BCryptUtil.hashpw("123");
		System.out.println(pass2);
		System.out.println(BCrypt.checkpw("1234", pass2));
	}
}
