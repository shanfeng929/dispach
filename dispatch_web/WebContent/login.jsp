<!DOCTYPE>
<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<%@ page session="false"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	pageContext.setAttribute("ctxBase", path);
%>
<html>
<head>
<base href="<%=basePath%>">
<title>登录</title>
<script type="text/javascript">
	document.createElement('menu');
	document.createElement('figure');
	document.createElement('nav');
	document.createElement('footer');
	document.createElement('section');
	document.createElement('header');
	document.createElement('dialog');
	document.createElement('aside');
	document.createElement('article');
	
</script>

<style type="text/css">
body {
	position: relative;
	background-image: url(resources/images/login/lg1/bg_dispatch.jpg);
	background-repeat: no-repeat;
	background-size: cover;
	/* filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://localhost:8080/alm/resources/images/login/lg1/bg1.png',sizingMethod='scale'); */
	overflow:hidden;
}

fieldset {
	vertical-align: middle;
	position: relative;
	border:none; 
}

.wrap {
	position: relative;
	float: right;
	margin-top:223px;
	margin-right:133px;
	/*border:solid 2px #ccc;	调试位置使用 */
	width:362px;
	height:361px;
	background-image: url(resources/images/login/lg1/formbg.png) ;
	background-repeat: no-repeat;
}
.form {
	border: none;
}
fieldset input[type=text]{
	/* border:solid 2px #ccc; */
	position: relative;
	float:left;
	margin-left: 40px;
	border:none;
	background:none;
	height:40px;
	line-height:40px;
	width:250px; 
	/* text-indent:40px; */
}

fieldset input[type=password]{
	position: relative;
	float:left;
	margin-left: 40px;
	border:none;
	background:none;
	height:40px;
	line-height:40px;
	width:250px; 
	/* text-indent:40px; */
}

fieldset input[type=submit] {
	position: relative;
	float:	right;
	border: none;
	margin-top:	35px;
	margin-right: 34px;
	width:	290px;
	height:	40px;
	background: url(resources/images/login/lg1/btn1.png); 
}

fieldset input[type=submit]:hover {
	background: url(resources/images/login/lg1/btn2.png); 
}

.textWrap{
	position: relative;
	float:right;
	margin-top:89px;
	margin-right:34px;
	width:290px;
	height:40px;
	background:#FFFFFF url(resources/images/login/lg1/user.png) no-repeat 4% center;
}

.passwordWrap {
	position: relative; 
	float:right;
	margin-top:27px;
	margin-right:34px;
	width:290px;
	height:40px;
	background:#FFFFFF url(resources/images/login/lg1/password.png) no-repeat 4% center;
}

.errorWrap {
	position: relative; 
	float:left;
	margin-top:10px;
	margin-left:34px;
	font-size:12px;
	color:red;
}

/* .buttonWrap {
	position: relative;
	float:	right;
	border: none;
	margin-top:	35px;
	margin-right: 34px;
	width:	290px;
	height:	40px;
	background-image: url(resources/images/login/lg1/btn1.png); 
} */
</style>
</head>
<body style="width:100%;height:100%">
	<div class="wrap">
		<form action="<%=path%>/j_spring_security_check" method="post">
				<div class="form">
					<fieldset>
						<div class="textWrap">
							<input type="text" name="j_username" placeholder="用户名" autofocus="autofocus"/>
						</div>
						<div class="passwordWrap">
							<input type="password" name="j_password" placeholder="密码"/>
						</div>
					</fieldset>
					<fieldset>
						<!-- <div class="buttonWrap"> -->
							<input type="submit" value="">
						<!-- </div> -->
					</fieldset>
					<fieldset>
						<div class="errorWrap">
							<font class="errorMsg">${msg }</font>
						</div>
					</fieldset>
				</div>
		</form>
	</div>
</body>
</html>