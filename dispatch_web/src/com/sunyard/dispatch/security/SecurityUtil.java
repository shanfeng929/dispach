package com.sunyard.dispatch.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

/**
 * Utils for Security.
 */
public class SecurityUtil {

	/**
	 * 创建 {@link GrantedAuthority} 实例，保证了两点：
	 * <ul>
	 * <li>所有字符均大写</li>
	 * <li>使用相同类，以优化后续检查权限时的效率和实现方式</li>
	 * </ul>
	 *
	 * @param code
	 *            权限名（约定，表示角色的权限以‘AUTH_’做前缀）
	 * @return
	 */
	public static SimpleGrantedAuthority createAuthority(String code) {
		return new SimpleGrantedAuthority(code.toUpperCase());
	}
}
