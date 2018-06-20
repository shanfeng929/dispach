package com.sunyard.dispatch.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.sunyard.dispatch.common.model.User;
import com.sunyard.dispatch.model.Model;
import com.sunyard.dispatch.model.form.OpLogForm;
import com.sunyard.dispatch.security.authentication.CustomUserDetails;
import com.sunyard.dispatch.service.OpLogsService;

/**
 * <b>SpringMVC中controller基类，封装通用功能以及controller级别的异常捕获</b><br>
 *
 * @author Guoyan
 * @version 1.0
 */
public class BaseController {

    @Resource
    protected OpLogsService opLogsService;

    /**
     * 日志框架
     */
    protected Logger logger = LoggerFactory.getLogger(getClass());
    /**
     * Http各种对象
     */
    protected HttpServletRequest request;
    protected HttpServletResponse response;
    protected HttpSession session;
    /**
     * 基路径
     */
    protected String basePath;
    /**
     * 操作 （用于记录日志）
     */
    public String operation = "";

    public BaseController() {
        super();
    }

    /**
     * 异常处理 <br/>
     * 此方法会在Controller方法执行过程出现异常时执行。设置状态及前台反显消息。
     *
     * @param exception
     * @return
     */
    @ExceptionHandler
    @ResponseBody
    public JsonResult<String> handleException(Exception exception) {
        logger.error("Controller异常捕获",exception);
        this.addLogger("Controller异常捕获", exception.getMessage(), Constant.LogLevel.ERROR);
        return new JsonResult<String>(false,null != exception.getMessage() ? exception.getMessage() : Constant.OperationTips.ERROR);
    }

    /**
     * 定义日期类型的数据绑定
     *
     * @param request
     * @param binder
     * @throws Exception
     */
    @InitBinder
    public void initBinder(WebDataBinder binder) throws Exception {
        binder.registerCustomEditor(Date.class, new DateEditor());
    }

    @ModelAttribute
    protected void initRequestResponseSession(HttpServletRequest request, HttpServletResponse response,
                                              RedirectAttributes redirectAttributes) {
        this.request = request;
        this.response = response;
        this.session = request.getSession();

        String path = request.getContextPath();
        basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
    }

    /**
     * 提供文件下载
     *
     * @param inputStream
     * @param file
     * @param fileName
     * @return
     */
    public void toDownload(HttpServletRequest request, HttpServletResponse response, FileInputStream inputStream,
                           File file, String fileName) throws Exception {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        BufferedInputStream in = null;
        BufferedOutputStream out = null;
        fileName = new String(fileName.getBytes("GBK"), "ISO8859-1");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/x-msdownload");
        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
        response.setHeader("Content-Length", String.valueOf(file.length()));
        try {
            in = new BufferedInputStream(inputStream);
            out = new BufferedOutputStream(response.getOutputStream());
            byte[] data = new byte[2048];
            int len = 0;
            while (-1 != (len = in.read(data, 0, data.length))) {
                out.write(data, 0, len);
            }
        } catch (Exception e) {
            logger.error(fileName+"文件下载异常：",e);
        } finally {
            if (null != in) {
                in.close();
            }
            if (null != out) {
                out.close();
            }
        }
    }

    /**
     * 设置对象通用属性
     *
     * @param user  当前登陆用户
     * @param model 模型
     */
    protected <T extends Model> T setGeneralAttribute(User user, T model) {
        Date now = new Date();
        if (null == model.getId()) {
            //model.setCreator((Integer) user.getId());
            model.setDateCreated(now);
        }
        //model.setModifier((Integer) user.getId());
        model.setDateUpdated(now);
        return model;
    }
    
    
    /**
     * 获取session中的用户信息
     * @return
     */
    public CustomUserDetails getUserBySession(){
    	Object temp = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	if(temp instanceof CustomUserDetails){
    		return (CustomUserDetails)temp;
    	}
    	return null;
    }
    
    /**
     * 日志添加 接口
     * @param operation 操作
     * @param description 操作描述
     * @param level 日志等级
     */
    public void addLogger(String operation, String description, Integer level ){
    	CustomUserDetails user = getUserBySession();
    	OpLogForm opLog = new OpLogForm(operation, description, level.toString());
    	opLog.setAddress(request.getRemoteAddr());
    	opLog.setCreateBy(user.getLoginName());
    	opLog.setOperator(user.getUser().getId().toString());
    	opLogsService.addLogger(opLog);
    
    }
    
    
}
