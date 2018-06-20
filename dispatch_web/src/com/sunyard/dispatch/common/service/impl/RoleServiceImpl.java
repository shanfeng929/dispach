package com.sunyard.dispatch.common.service.impl;

import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.common.dao.RoleAuthDao;
import com.sunyard.dispatch.common.dao.RoleDao;
import com.sunyard.dispatch.common.model.RoleAuth;
import com.sunyard.dispatch.common.model.RoleGrid;
import com.sunyard.dispatch.common.model.RoleNew;
import com.sunyard.dispatch.common.model.form.RoleForm;
import com.sunyard.dispatch.common.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {
	
	@Resource
	RoleDao roleDao;
	@Resource
	RoleAuthDao roleAuthDao;

	@Override
	public Page<RoleGrid> getRoleByName(RoleForm roleForm) {
		try {
			roleForm.setName(java.net.URLDecoder.decode(roleForm.getName(),"UTF-8"));
		} catch (UnsupportedEncodingException e) {
			  
			// TODO Auto-generated catch block  
			e.printStackTrace();  
			
		}
		int total = roleDao.getCount(roleForm);
		List<RoleNew> roleList = roleDao.queryAllRole(roleForm);
		
		List<RoleGrid> gridList=new ArrayList<RoleGrid>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒 E");
		for(RoleNew role:roleList){
			RoleGrid grid=new RoleGrid();
			grid.setId(role.getId());

				grid.setName(role.getName());
			
			grid.setDescription(role.getDescription());
			grid.setDataStatus(role.getDataStatus());
			grid.setCreator(role.getCreator());
			grid.setModifier(role.getModifier());
			grid.setCreatorName(role.getCreatorName());
			grid.setModifierName(role.getModifierName());
			grid.setDateCreated(sdf.format(role.getDateCreated()));
			grid.setDateUpdated(role.getDateUpdated()==null?" ":sdf.format(role.getDateUpdated()));
			gridList.add(grid);
		}
		return new Page<RoleGrid>(roleForm.getPage(), roleForm.getLimit(), total, gridList);
		
	}

	@Override
	public void saveRole(RoleNew role) {
		role.setDataStatus(0);
		roleDao.saveRole(role);
		for (int i = 0; i < role.getRoleAuth().size(); i++) {
			RoleAuth roleAuth = new RoleAuth();
			roleAuth.setRoleId(role.getId());
			roleAuth.setAuthId(role.getRoleAuth().get(i).getAuthId());
			roleAuthDao.saveRoleAuth(roleAuth);
		}
	}

	@Override
	public void updateOneRole(RoleNew role) {
		role.setDataStatus(0);
		roleDao.updateRole(role);
		roleAuthDao.deleteRoleAuth(role.getId());
		for (int i = 0; i < role.getRoleAuth().size(); i++) {
			RoleAuth roleAuth = new RoleAuth();
			roleAuth.setRoleId(role.getId());
			roleAuth.setAuthId(role.getRoleAuth().get(i).getAuthId());
			roleAuthDao.saveRoleAuth(roleAuth);
		}
	}

	@Override
	public List<RoleNew> queryOneRole(Integer id) {
		RoleNew role = roleDao.selectOneRoleById(id);
		List<RoleNew> list = new ArrayList<RoleNew>();
		list.add(role);
		return list;
	}

	@Override
	public void batchDeleteRole(List<Integer> list) {
		roleDao.batchDelete(list);
	}

	@Override
	public Integer repeatedRole(RoleNew roleNew) {
		return roleDao.repeatedRole(roleNew);
	}

	@Override
	public String selectRoleName(RoleNew roleNew) {
		return roleDao.selectRoleNameById(roleNew.getId());
	}

}
