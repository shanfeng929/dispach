package com.sunyard.dispatch.service;  

import org.springframework.transaction.annotation.Transactional;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.model.RemoteServiceModel;
import com.sunyard.dispatch.model.form.RemoteServiceForm;

/**
 * 远程服务 业务逻辑处理层
 * @author quan.shen
 *
 */
public interface RemoteServiceService {
	
	/**
	 * 分页查询远程服务列表
	 * @param form
	 * @return
	 */
	@Transactional
	public Page<RemoteServiceModel> getRemoteServiceList(RemoteServiceForm form);
	
	/**
	 * 根据主键查找远程服务
	 * @param form
	 * @return
	 */
	@Transactional
	public RemoteServiceModel findRemoteById(RemoteServiceForm form);
	
	/**
	 * 远程服务新增
	 * @param form
	 * @throws Exception
	 */
	@Transactional
	public void remoteServiceAdd(RemoteServiceForm form) throws Exception;
	
	/**
	 * 远程服务修改
	 * @param form
	 * @throws Exception
	 */
	@Transactional
	public void remoteServiceEdit(RemoteServiceForm form) throws Exception;
	
	/**
	 * 根据ID删除远程服务
	 * @param id
	 */
//	@Transactional
//	public void remoteServiceDel(String id);
	
	/**
	 * 根据拼接而成的ids,批量删除远程服务
	 * @param ids
	 */
	@Transactional
	public void remoteServiceDelByIds(String ids) throws Exception;

	/**
	 * 测试远程服务IP能否ping通
	 * @param form
	 * @throws Exception
	 */
	public void test(RemoteServiceForm form) throws Exception;

	
}
  
