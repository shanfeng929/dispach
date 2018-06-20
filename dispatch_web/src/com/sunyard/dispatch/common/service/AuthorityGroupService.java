package com.sunyard.dispatch.common.service;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.sunyard.dispatch.common.model.Authority;
import com.sunyard.dispatch.common.model.form.AuthorityGroupForm;

/**
 * @author fengqibei
 * @date 2015-8-24 上午11:55:01
 */
public interface AuthorityGroupService {

	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	List<Map<String, Object>> revealAuthorityGroupTree();

	List<Authority> queryAuthority();

	List<Authority> querySelectedAuthority(Integer id);

	Integer repeatedAuthority(AuthorityGroupForm authorityGroupForm);

	String selectNameById(Integer id);

	@Transactional
	void momdifyAuthorityGroup(AuthorityGroupForm authorityGroupForm, List<Integer> authoritys);

	@Transactional
	void insertAuthorityGroup(AuthorityGroupForm authorityGroupForm, List<Integer> authoritys);

	@Transactional
	void deleteAuthorityGroup(Integer id);
}
