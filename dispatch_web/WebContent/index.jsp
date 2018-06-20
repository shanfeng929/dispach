<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	pageContext.setAttribute("ctxBase", path);
	String currentName = (String )request.getAttribute("current");
%>
<html xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- <meta http-equiv="X-UA-Compatible" content="IE=quirks" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />  -->
<title>信雅达任务调度平台</title>
<!-- <link rel="stylesheet" type="text/css"  href="resources/ecotree/css/ECOTree.css"/> -->
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/extjs/resources/css/ext-all.css" />" />
<%-- <link rel="stylesheet" type="text/css" href="<c:url value="resources/extjs/resources/css/ext-all-gray-debug.css" />" /> --%><!--  更换主题   -->
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/icon.css" />" /> 
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/ext-add.css" />" /> 
<%-- <link rel="stylesheet" type="text/css" href="<c:url value="resources/extjs/resources/css/example.css" />" /> --%>
<%-- <link rel="stylesheet" type="text/css" href="<c:url value="resources/extjs/examples/ux/css/ItemSelector.css" />" /> --%>
<style>v\:roundrect{ behavior:url(#default#VML);}</style>
<style>v\:fill{ behavior:url(#default#VML);}</style>
<style>v\:shadow{ behavior:url(#default#VML);}</style>
<style>v\:polyline{ behavior:url(#default#VML);}</style>
<!-- <script type="text/javascript" src="resources/js/ecotrees.js"></script> -->
<script type="text/javascript" src="resources/js/json2.js"></script>
<!-- <script type="text/javascript" src="resources/ecotree/js/ECOTree.js"></script> -->	
<xml:namespace ns="urn:schemas-microsoft-com:vml" prefix="v" />
<script type="text/javascript" src="<c:url value="/resources/extjs/ext-all.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/extjs/locale/ext-lang-zh_CN.js"/>"></script>
<%-- <script type="text/javascript" src="<c:url value="resources/extjs/examples/examples.js"/>"></script> --%>
<script type="text/javascript" src="resources/js/date.js"></script>
<script type="text/javascript" src="resources/js/function.js"></script>
<script type="text/javascript" src="resources/js/EtlWindowShowFunction.js"></script>
<script type="text/javascript" src="<c:url value="app/app.js"/>"></script>
<%-- <script type="text/javascript" src="<c:url value="resources/extjs/examples/ux/form/ItemSelector.js"/>"></script> --%>
<%-- <script type="text/javascript" src="<c:url value="resources/extjs/examples/calendar/src/util/Date.js"/>"></script> --%>
<%-- <script type="text/javascript" src="<c:url value="resources/extjs/examples/ux/upload/Basic.js"/>"></script> --%>
<script type="text/javascript" src="<%=basePath%>/resources/js/GooFlow.js"></script>
<script type="text/javascript">
	//base on context path.
	var ctx = Ext.ctx = '<%=basePath.substring(0, basePath.length() - 1)%>';
	var basePath = ctx;
	var currentName='<%=currentName%>';
	var projectName = 'DISPATCH';
	if(currentName){
		//去除原来在app.js中直接渲染界面方式,避免登录成功后,返回数据未被加载而被app使用
		Ext.onReady(function(){
			Ext.create(projectName + '.desktop.Desktop');
		});
	}
	
</script>
</head>

<body>
<form name="integrationForm" method="post"></form>
<%--存储当前登录用户--%>
<c:set var="current" value="${current}" scope="application" />
</body>
</html>