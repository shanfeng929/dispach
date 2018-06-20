package com.sunyard.dispatch.common;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.springframework.web.context.WebApplicationContext;

import com.sunyard.dispatch.job.TimedJobLauncher;

/**
 * 嵌入workflow嵌入其它APP时，需要公用它们的数据源
 * @author Administrator
 *
 */
public class EngineLauncher extends HttpServlet {
	private static final long serialVersionUID = -80546763612936798L;
	Logger LOG =null;
	
	
	@Override
	public void init(ServletConfig config) throws ServletException { 
		super.init(config);
		String dataSourceName = getInitParameter("dataSourceName");
		if(Tool.isBlank(dataSourceName)){
			dataSourceName = "dataSource";
		}
		WebApplicationContext wac = (WebApplicationContext)config.getServletContext().getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
		if(wac ==null){
			throw new Err("DataSourceLoader启动时，Spring WEB容器还不存在");
		}
		
		Object ds = wac.getBean(dataSourceName);
		if(ds == null){
			throw new Err("Spring容器中没有bean名称为["+dataSourceName+"]的数据源");
		}
		DataSource dataSource = (DataSource)ds;
		ConnPool.setDataSource(dataSource);
		System.out.println("Job引擎已初始化，并启动");
		new TimedJobLauncher().start();
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		super.destroy();
		ThreadPool.close();
	}
}
