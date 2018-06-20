package com.sunyard.dispatch.security.authentication;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.transaction.annotation.Transactional;

public interface CustomUserDetailsService extends UserDetailsService {

	/**
	 * encrypt the raw passwrd and save.
	 *
	 * @throws IllegalArgumentException
	 *             <ul>
	 *             <li>if id not represent a exist user</li>
	 *             <li>if oldPassword not cocrrect</li>
	 *             <li>if rawPassword not valid</li>
	 *             </ul>
	 */
	@Transactional
	void updatePassword(Integer id, String oldPassword, String rawPassword) throws IllegalArgumentException;
}
