package com.sunyard.dispatch.common.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sunyard.dispatch.common.service.OperationService;


@Controller
@RequestMapping("/commons/operation")
public class OperationController {
	@Resource
	OperationService oper;
	
	
	@RequestMapping("/operationTree")
	@ResponseBody
	public List<Map<String, Object>> operationTree(Integer authId){
		return oper.revealOperationTree(authId);
	}
}
