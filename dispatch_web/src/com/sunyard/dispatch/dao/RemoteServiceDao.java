package com.sunyard.dispatch.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sunyard.dispatch.model.RemoteServiceModel;
import com.sunyard.dispatch.model.form.RemoteServiceForm;

public interface RemoteServiceDao {

	/**
	 * 查询远程服务列表
	 * @param form
	 * @return
	 */
	List<RemoteServiceModel> getRemoteServiceList(RemoteServiceForm form);

	/**
	 * 条件查询远程服务列表总条数
	 * @param form
	 * @return
	 */
	Integer getRemoteServiceListCount(RemoteServiceForm form);

	/**
	 * 远程服务新增
	 * @param form
	 */
	void remoteServiceAdd(RemoteServiceForm form);

	/**
	 * 远程服务修改
	 * @param form
	 */
	void remoteServiceEdit(RemoteServiceForm form);

//	/**
//	 * 根据ID删除远程服务
//	 * @param id
//	 */
//	void remoteServiceDel(@Param("id")String id);

	/**
	 * 根据拼接而成的ids,批量删除远程服务
	 * @param ids
	 */
	void remoteServiceDelByIds(@Param("ids")String ids);
	
	/**
	 * 检查远程服务IP唯一性
	 * @param remoteIp
	 * @return
	 */
	Integer checkUnique(RemoteServiceForm form);

	/**
	 * 通过ID查找远程服务
	 * @param id
	 * @return
	 */
	RemoteServiceModel getRemoteServiceById(@Param("id")Integer id);

	int checkIsRelated(@Param("ids") String ids);

	/**
	 * 获取MD5加密后的密码
	 * @param remotePasswd
	 * @return
	 */
//	String getMD5Password(@Param("remotePasswd")String remotePasswd);


}
