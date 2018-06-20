package com.sunyard.dispatch.common.service;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.sunyard.dispatch.common.model.Authority;
import com.sunyard.dispatch.common.model.AuthorityNew;

public interface AuthorityService {

	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	List<Map<String, Object>> revealAuthorityGroupTree();

	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	List<Authority> selectAuthorityContainsOperations();

	List<Authority> getAuthList();

	List<Map<String, Object>> revealAuthorityTree();
	@Transactional
	void saveAuth(AuthorityNew auth, Integer[] opeaIds, Integer[] menuIds);
	@Transactional
	void updateAuth(AuthorityNew auth, Integer[] opeaIds, Integer[] menuIds);
	@Transactional
	void delete(Integer authId);
	
	Integer repeatedAuthName(AuthorityNew auth);
	
	Integer repeatedAuthCode(AuthorityNew auth);

}
