<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!DOCTYPE html>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()+ path;
	pageContext.setAttribute("ctxBase", path);
	String currentName = (String )request.getAttribute("current");
%>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>子流程组件</title>
<!--[if lt IE 9]>
<?import namespace="v" implementation="#default#VML" ?>
<![endif]-->
<!-- <link type="text/css" rel="stylesheet" href="resources/ecotree/css/ECOTree.css" /> -->
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/extjs/resources/css/ext-all.css" />" />
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/icon.css" />" /> 

<!-- <script type="text/javascript" src="resources/js/ecotrees.js"></script> -->
<script type="text/javascript" src="resources/js/json2.js"></script>
<!-- <script type="text/javascript" src="resources/ecotree/js/ECOTree.js"></script> -->	
<xml:namespace ns="urn:schemas-microsoft-com:vml" prefix="v" />
<script type="text/javascript" src="<c:url value="/resources/extjs/ext-all.js"/>"></script>
<script type="text/javascript" src="resources/js/date.js"></script>
<script type="text/javascript" src="resources/js/function.js"></script>
<script type="text/javascript" src="<c:url value="/app/app.js"/>"></script>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/resources/css/GooFlow.css"/>
<script type="text/javascript" src="<%=basePath%>/resources/js/jquery.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/resources/js/GooFunc.js"></script>
<script type="text/javascript" src="<%=basePath%>/resources/js/GooFlow.js"></script>
<script type="text/javascript">
var projectName = 'DISPATCH';
var basePath = '<%=basePath%>';
var property={
	width:1100,
	height:600,
	toolBtns:[],
	haveHead:true,
	headBtns:[],//å¦æhaveHead=trueï¼åå®ä¹HEADåºçæé®
	haveTool:true,
	haveGroup:false,
	useOperStack:true
};
var remark={
		cursor:"选择指针",
		direct:"结点连线",
		start:"开始结点",
		end:"结束结点",
	//	java:"java调用结点",
		linux:"linux命令结点",
	//	node:"存储过程结点",
		//chat:"远程脚本结点",
		complex:"子服务结点"
	};
GooFlow.prototype.alertTwoStartNode = function(){
	Ext.MessageBox.alert("注意：","不允许有两个开始节点！");
};

GooFlow.prototype.alertTwoEndNode = function(){
	Ext.MessageBox.alert("注意：","不允许有两个结束节点！");
};

GooFlow.prototype.onBtnEditClick = function(){
	gooFlow.$title='<%=(String )request.getParameter("id")%>';
	document.getElementById("demo_btn_direct").style.display = "block";
	document.getElementById("demo_btn_start").style.display = "block";
	document.getElementById("demo_btn_end").style.display = "block";
	document.getElementById("demo_btn_linux").style.display = "block";
	document.getElementById("demo_btn_complex").style.display = "block";


} 











GooFlow.prototype.openNodeDialog = function(node,id){
	if (node.type=="linux"){
		parent.linuxshow(id,'check');
		}
		else if (node.type=="complex"){
		parent.checkSubFlow(id);
		}
}




var gooFlow;

$(document).ready(function(){
	property.width = document.documentElement.clientWidth;

	gooFlow=$.createGooFlow($("#demo"),property);
	gooFlow.setNodeRemarks(remark);
	gooFlow.onItemDel=function(id,type){
		return true;
	}

	//gooFlow.loadData(jsondata);
	
});

var subflowid='<%=(String )request.getParameter("id")%>';
Ext.Ajax.request({
	url : basePath + '/DisPatch/EtlFlow/selectloaddata',
	params : {
		'flowId':subflowid
	},
	success : function(result) {
		gooFlow.clearData();
		if(result.responseText!="")
		{
	var	Data=JSON.parse(result.responseText);
		 gooFlow.loadData(Data);
			}
		
		
		}
		
	});


</script>
</head>
<body>
<div id="demo" style="margin:0; padding:0"></div>
</body>
</html>

