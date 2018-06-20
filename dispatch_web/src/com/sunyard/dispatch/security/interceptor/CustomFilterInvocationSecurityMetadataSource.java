package com.sunyard.dispatch.security.interceptor;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import com.sunyard.dispatch.common.model.OperationIncludeAuthorityVO;
import com.sunyard.dispatch.common.service.OperationService;

public class CustomFilterInvocationSecurityMetadataSource implements FilterInvocationSecurityMetadataSource {

	private OperationService operationService;
	private static Map<String, Collection<ConfigAttribute>> resourceMap = null;
	private RequestMatcher _urlMatcher = null;

	public CustomFilterInvocationSecurityMetadataSource(OperationService operationService) {
		this.operationService = operationService;
		this.loadResources();
	}

	public void loadResources() {
		resourceMap = new HashMap<String, Collection<ConfigAttribute>>();
		ConfigAttribute configAttribute = null;

		List<OperationIncludeAuthorityVO> operations = operationService.selectOperationWithAuthorityCode();
		for (OperationIncludeAuthorityVO operation : operations) {
			String _auth = null == operation.getAuthority() ||null == operation.getAuthority().getCode() || "".equals(operation.getAuthority().getCode())
					? "unauthorized".toUpperCase() : operation.getAuthority().getCode().toUpperCase();
			String _prefix = operation.getPrefix();
			String _suffix = operation.getSuffix();
			String _url = (null == _prefix || "".equals(_prefix) ? "" : _prefix)
					+ (null == _suffix || "".equals(_suffix) ? "" : _suffix);

			configAttribute = new SecurityConfig("AUTH_" + _auth);
			if (resourceMap.containsKey(_url)) {
				Collection<ConfigAttribute> value = resourceMap.get(_url);
				value.add(configAttribute);
				resourceMap.put(_url, value);
			} else {
				Collection<ConfigAttribute> value = new ArrayList<ConfigAttribute>();
				value.add(configAttribute);
				resourceMap.put(_url, value);
			}
		}
	}

	@Override
	public Collection<ConfigAttribute> getAllConfigAttributes() {
		return null;
	}

	@Override
	public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
		Set<ConfigAttribute> _configures = new HashSet<ConfigAttribute>();
		// 获取filterInvocation
		FilterInvocation filterInvocation = (FilterInvocation) object;

		Iterator<String> iterator = resourceMap.keySet().iterator();
		while (iterator.hasNext()) {
			String _url = iterator.next();
			_urlMatcher = new AntPathRequestMatcher(_url);
			if (_urlMatcher.matches(filterInvocation.getHttpRequest())) {
				_configures.addAll(resourceMap.get(_url));
			}
		}
		if (_configures.isEmpty()) {
			return null;
		} else {
			return _configures;
		}
	}

	@Override
	public boolean supports(Class<?> clazz) {
		return true;
	}
}
