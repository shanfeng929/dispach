package com.sunyard.dispatch.common.dao;

import java.util.List;

import com.sunyard.dispatch.common.model.AuthOperation;

public interface AuthOperationDao {
	
	void insertAuthOpea(AuthOperation authOpea); 
	
	void updateAuthOpea(AuthOperation authOpea);
	
	void delete(Integer id);
	
	List<AuthOperation> selectAllAuthOpea(Integer authId);
}
