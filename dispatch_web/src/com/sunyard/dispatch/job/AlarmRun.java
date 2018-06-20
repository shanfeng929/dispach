package com.sunyard.dispatch.job;

import java.sql.DriverManager;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import com.sunyard.dispatch.common.Const;
import com.sunyard.dispatch.job.extraModel.ProcedureModel;
import com.sunyard.dispatch.job.serverModel.DispatchDataSource;

/**
 * 在多线程下执行存储过程的类
 * 
 * @author WeiLai
 */
public class AlarmRun implements Runnable {
	private ProcedureModel proce;
	private DispatchDataSource dds;
	private AtomicInteger count;
	private List<ProcedureModel> resultList;

	public AlarmRun(ProcedureModel p, DispatchDataSource dds,
			AtomicInteger count, List<ProcedureModel> resultList) {
		this.proce = p;
		this.dds = dds;
		this.count = count;
		this.resultList = resultList;
	}

	public void run() {
		java.sql.Connection connectionA = null;
		java.sql.CallableStatement callStatement = null;
		try {
			Class.forName(dds.getDriverName());
			String sql = proce.getSql();
			System.out.println("【测试】" + sql);

			connectionA = DriverManager.getConnection(dds.getDbUrl(),
					dds.getUserName(), dds.getPassword());
			callStatement = connectionA.prepareCall("call " + sql);
			List<Object> currentList = proce.getParas();
			for (int i = 0; i < currentList.size(); i++) {
				callStatement.setObject(i + 1, currentList.get(i));
			}
			if (proce.getRuleType() == Const.CRWM_RULETYPE_PROCEDURE) {
				callStatement.registerOutParameter(currentList.size() + 1,
						java.sql.Types.VARCHAR);
				callStatement.registerOutParameter(currentList.size() + 2,
						java.sql.Types.VARCHAR);
			}
			callStatement.execute();
			if (proce.getRuleType() == Const.CRWM_RULETYPE_PROCEDURE) {
				String result1 = callStatement.getString(currentList.size() + 1);
				String result2 = callStatement.getString(currentList.size() + 2);
				proce.setResult1(result1);
				proce.setResult2(result2);
				System.out.println("【线程测试】" + result1 + "," + result2);
			}
			
			// Thread.sleep(10000); //测试用
			try {
				callStatement.close();
				connectionA.close();
			} catch (Exception e) {
			}
			proce.setSuccessful(true);
		} catch (Exception e) {
			e.printStackTrace();
			proce.setSuccessful(false);
		} finally {
			resultList.add(proce);
			count.decrementAndGet();
		}

	}

}
