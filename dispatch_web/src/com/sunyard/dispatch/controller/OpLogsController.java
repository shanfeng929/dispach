package com.sunyard.dispatch.controller;  

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.sunyard.dispatch.annotation.WriteLog;
import com.sunyard.dispatch.common.ExcelView;
import com.sunyard.dispatch.enums.LogDict;
import com.sunyard.dispatch.model.OpLog;
import com.sunyard.dispatch.model.form.OpLogForm;
import com.sunyard.dispatch.service.OpLogsService;
import com.sunyard.dispatch.util.BaseController;
import com.sunyard.dispatch.util.Constant;
import com.sunyard.dispatch.util.JsonResult;


/**
 * 操作日志 控制层
 * @author quan.shen
 *
 */
@RequestMapping(value = "/oplogs")
@Controller
public class OpLogsController extends BaseController{
	@Resource
	private OpLogsService opLogsService;
	
	/**
	 * 分页查询远程服务
	 * @param form
	 * @throws UnsupportedEncodingException 
	 * @return/oplogs/query
	 */
	@WriteLog(log = LogDict.Log_Query)
	@RequestMapping("/query")
	@ResponseBody
	public JsonResult<OpLog> query(OpLogForm form) throws UnsupportedEncodingException {
		JsonResult<OpLog> result = new JsonResult<OpLog>(true, Constant.OperationTips.SUCCESS);
		//转码
		String name = java.net.URLDecoder.decode(form.getCreateBy(),"UTF-8");
		form.setCreateBy(name);
		result.setPageItems(opLogsService.getOpLogsPage(form));
		return result;
	}
	
	@WriteLog(log = LogDict.Log_Download)
	@RequestMapping(value="/excelDownload",method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView download(String level,String operator,String dateStart,String dateEnd) throws UnsupportedEncodingException{
		String operatorStr= java.net.URLDecoder.decode(operator, "UTF-8");
		OpLogForm form = new OpLogForm();
		form.setCreateBy(operatorStr);
		form.setLevel(level);
		form.setDateStart(dateStart);
		form.setDateEnd(dateEnd);
		List<OpLog> dataList = opLogsService.getAllOpLogs(form);
		String[] headers = new String[]{"登录用户","用户IP","用户操作","日志等级","耗时(ms)","服务节点IP","日志时间","日志描述"};
		String[] mappers = new String[]{"operator","address","operation","level","costTime","serverIp","createTime","description"};
		int[] widths = new int[]{10,20,25,10,10,20,20,50};
		short[] aligns = new short[]{ExcelView.align_center,ExcelView.align_left,ExcelView.align_left,ExcelView.align_center,ExcelView.align_center,ExcelView.align_left,ExcelView.align_left,ExcelView.align_left};
		ExcelView viewExcel = new ExcelView("日志监控", "用户操作日志", headers, dataList, mappers, widths, aligns);
	    return new ModelAndView(viewExcel);
	}
	
}
  
