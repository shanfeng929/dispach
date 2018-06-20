package com.sunyard.dispatch.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sunyard.dispatch.util.BaseController;

@Controller
public class LoginController extends BaseController {

	@RequestMapping("/")
	public String index() {
		return "forward:/main";
	}

	/**
	 * 登录信息封装
	 *
	 * @param model
	 *            模型
	 * @return 具体页面
	 */
	@RequestMapping(value = "/main")
	public String main(Model model, Integer roleId) {
		// try {
		// Writer writer = new StringWriter();
		// Role role = (Role)
		// SecurityUtil.getLoginUser().getRoles().toArray()[0];
		// new ObjectMapper().writeValue(writer, SecurityUtil.getUserDetails());
		// model.addAttribute("userDetails", writer.toString());
		// model.addAttribute("systemDate", new Date().getTime());
		// model.addAttribute("roleId", roleId == null ? role.getId() : roleId);
		// model.addAttribute("systemWeekIndex", DateUtil.getWeekOfYear());
		// model.addAttribute("systemWeekNum", DateUtil.getWeekNumOfYear(null));
		// } catch (IOException e) {
		// logger.error("登录失败!", e);
		// }
		model.addAttribute("current",getUserBySession().getUser().getLoginName());
		return "index";
	}

	/**
	 * 登录控制方法
	 *
	 * @param module
	 *            路径后缀
	 * @param model
	 *            模型
	 * @return 具体页面
	 */
	@RequestMapping(value = "/login/{module}")
    public String toPage(@PathVariable String module, Model model) {
        if ("logout".equals(module)) {
            return "login";
        } else if ("fail".equals(module)) {
            model.addAttribute("msg", "用户名或密码错误");
            return "login";
        } else if ("expired".equals(module)) {
            model.addAttribute("msg", "账户已经被他人登录，请联系管理员修改密码后重新登录");
            return "login";
        }
        return "login";
    }
	
}
