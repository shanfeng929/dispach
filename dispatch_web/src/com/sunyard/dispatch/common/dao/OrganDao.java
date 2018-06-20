package com.sunyard.dispatch.common.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.sunyard.dispatch.common.model.Organ;
import com.sunyard.dispatch.common.model.form.OrganForm;

public interface OrganDao {

	public void addOraganItem(Organ form);

	public List<Organ> selectOrganTreeList();

	public List<Organ> selectOrganTest();

	List<Map<String, Object>> selectRootOrganGroup(Integer organId);

	List<Map<String, Object>> selectChildrenByOrganId(Integer organId);

	Map<String, Object> queryParentName(Integer id);

	Integer repeatedOrganName(OrganForm organForm);
	
	Integer repeatedOrganCode(OrganForm organForm);
	
	Organ selectOrganById(Integer id);

	void modifyOrgan(OrganForm organForm);

	void insertOrgan(OrganForm organForm);

	void deleteOrgan(Integer id);

	List<Integer> selectUserIdByOrganId(Integer id);
	
	/**
	 * 查询机构树 
	 * @author zhx
	 * @param organId
	 * @return
	 */
	List<Map<String, Object>> selectOrganByOrganId(@Param("organId")String organId, @Param("dataStatus")int dataStatus);

	public Integer selectOrganByUserId(Integer userId);
}
