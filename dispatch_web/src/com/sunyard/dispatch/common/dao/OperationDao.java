package com.sunyard.dispatch.common.dao;

import java.util.List;
import java.util.Map;

import com.sunyard.dispatch.common.model.Operation;
import com.sunyard.dispatch.common.model.OperationIncludeAuthorityVO;

public interface OperationDao {

	List<Operation> selectOperationByAuthority(Integer id);

	List<OperationIncludeAuthorityVO> selectOperationWithAuthorityCode();
	
	List<Map<String, Object>> selectRootOperation();
	
	List<Map<String, Object>> selectChildrenByGroupId(Integer groupId);
	
}
