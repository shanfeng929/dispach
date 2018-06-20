package com.sunyard.dispatch.common.service;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.sunyard.dispatch.common.model.Organ;
import com.sunyard.dispatch.common.model.form.OrganForm;


/**
 * 系统管理 <br />
 * &nbsp;&nbsp;&nbsp;&nbsp;-->机构服务类 <br />
 * 主要为机构{@link Organ}的基本操作提供调用方法
 *
 */

public interface OrganService {
	/**
	 * 新增加一个机构
	 * @param form
	 * @return
	 *	
	 */
	@Transactional
	public void addOraganItem(Organ form);
	
	/**
	 * 查询机构集合，用作机构列表树形展示;
	 * @return
	*	List<Organ>
	 */
//	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
//	public List<Organ>	selectOrganTreeList();
	
	@Transactional
	List<Map<String, Object>> revealOrganTree(Integer organId);
	Map<String,Object> queryParentName(Integer id);
	
	Integer repeatedOrganName(OrganForm organForm); //机构名称是否重复
	
	Integer repeatedOrganCode(OrganForm organForm); //机构代码是否重复
	
	Organ selectOrganById(OrganForm organForm);
	
	List<Integer> selectUserIdByOrganId(Integer id);
	
	@Transactional
	void modifyOrgan(OrganForm organForm);
	@Transactional
	void insertOrgan(OrganForm organForm);
	@Transactional
	void deleteOrgan(Integer id);
	
	/**
	 * 机构树 用于下拉
	 * @author zhx
	 * @param type  值：code，id  
	 * @return
	 */
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public List<Map<String, Object>> getOrganTreeComBox(String type ,String organId);

	public Integer selectOrganByUserId(Integer userId);
}
