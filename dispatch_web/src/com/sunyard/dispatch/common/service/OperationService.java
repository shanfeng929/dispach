package com.sunyard.dispatch.common.service;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.sunyard.dispatch.common.model.Operation;
import com.sunyard.dispatch.common.model.OperationIncludeAuthorityVO;

public interface OperationService {

	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	List<Operation> selectOperationByAuthority(Integer id);

	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	List<OperationIncludeAuthorityVO> selectOperationWithAuthorityCode();
	
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	List<Map<String, Object>> revealOperationTree(Integer authId);
}
