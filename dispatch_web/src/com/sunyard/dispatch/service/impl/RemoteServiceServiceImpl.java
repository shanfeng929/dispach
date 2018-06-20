package com.sunyard.dispatch.service.impl;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import ch.ethz.ssh2.Connection;

import com.rideasoft.commons.util.Page;
import com.sunyard.dispatch.dao.RemoteServiceDao;
import com.sunyard.dispatch.model.RemoteServiceModel;
import com.sunyard.dispatch.model.form.RemoteServiceForm;
import com.sunyard.dispatch.service.RemoteServiceService;
import com.sunyard.dispatch.util.EncryptionDecryption;

@Service("remoteServiceService")
public class RemoteServiceServiceImpl implements RemoteServiceService {

	protected Log logger = LogFactory.getLog(RemoteServiceServiceImpl.class);

	@Resource
	RemoteServiceDao remoteServiceDao;

	@Override
	public Page<RemoteServiceModel> getRemoteServiceList(RemoteServiceForm form) {
		List<RemoteServiceModel> remoteServiceModels = remoteServiceDao.getRemoteServiceList(form);
		Integer total = remoteServiceDao.getRemoteServiceListCount(form);
		return new Page<RemoteServiceModel>(form.getPage(), form.getLimit(),
				total, remoteServiceModels);
	}

	@Override
	public RemoteServiceModel findRemoteById(RemoteServiceForm form) {

		return remoteServiceDao.getRemoteServiceById(form.getId());
	}

	@Override
	public void remoteServiceAdd(RemoteServiceForm form) throws Exception {
		// String remoteIp = form.getRemoteIp();
		if (remoteServiceDao.checkUnique(form).intValue() > 0) {
			throw new Exception("远程服务IP已存在");
		}
		remoteServiceDao.remoteServiceAdd(form);
	}

	@Override
	public void remoteServiceEdit(RemoteServiceForm form) throws Exception {
		// String remoteIp = form.getRemoteIp();
		if (remoteServiceDao.checkUnique(form).intValue() > 1) {
			throw new Exception("远程服务IP已存在");
		}
		// 验证 前台密码与原加密后密码是否一致
		RemoteServiceModel remoteServiceModel = remoteServiceDao
				.getRemoteServiceById(form.getId());
		if (!form.getRemotePasswd()
				.equals(remoteServiceModel.getRemotePasswd())) {
			EncryptionDecryption parser = new EncryptionDecryption();
			String password = parser.encrypt(form.getRemotePasswd());
			form.setRemotePasswd(password);
			// logger.info("前台密码："+ form.getRemotePasswd() +"  数据库密码："+
			// remoteServiceModel.getRemotePasswd());
			// String password =
			// remoteServiceDao.getMD5Password(form.getRemotePasswd());
			// logger.info("加密后密码："+ password);
			// form.setRemotePasswd(password);
		}
		remoteServiceDao.remoteServiceEdit(form);
	}

	// @Override
	// public void remoteServiceDel(String id) {
	// remoteServiceDao.remoteServiceDel(id);
	// }

	@Override
	public void remoteServiceDelByIds(String ids) throws Exception {
		int count = remoteServiceDao.checkIsRelated(ids);
		if(count > 0){
			throw new Exception("远程服务被关联");
		}
		remoteServiceDao.remoteServiceDelByIds(ids);
	}

	@Override
	public void test(RemoteServiceForm form) throws Exception {
		RemoteServiceModel model = remoteServiceDao.getRemoteServiceById(form.getId());
		/*
		 * 判断是否能够连接 w.l
		 */
		String host = model.getRemoteIp();
		String userName = model.getRemoteUserName();
		String password = model.getRemotePasswd();
		EncryptionDecryption parser = new EncryptionDecryption();
		password = parser.decrypt(password);
		Connection connection = null;
		try {
			connection = new Connection(host);
			connection.connect();
			boolean isAuthenticated = connection.authenticateWithPassword(
					userName, password);
			if (!isAuthenticated) {
				throw new Exception("无法登陆服务器");
			}
		} catch (Exception e) {
			throw e;
		} finally {
			if (connection != null) {
				connection.close();
			}
		}
	}

	/**
	 * 若line含有=18ms TTL=16/ttl=144 times=12.12 ms字样,说明已经ping通,返回1,否則返回0.
	 * 
	 * @param line
	 * @return
	 */
	private int getCheckResult(String line, String reg) {

		Pattern pattern = Pattern.compile(reg, Pattern.CASE_INSENSITIVE);
		Matcher matcher = pattern.matcher(line);
		while (matcher.find()) {
			return 1;
		}
		return 0;
	}

	/*
	 * public static void main(String[] args) { Pattern pattern =
	 * Pattern.compile("(ttl=\\d+)(\\s+)(time=\\d+.?\\d+\\s+ms)",
	 * Pattern.CASE_INSENSITIVE); Matcher matcher =
	 * pattern.matcher("icmp_seq=2 ttl=128 time=0.520 ms"); while
	 * (matcher.find()) { System.out.println("1"); } }
	 */

	/*
	 * public static void main(String[] args) {
	 * System.out.println(System.getProperty("os.name"));
	 * System.out.println(System.getProperty("file.separator")); }
	 */

}
