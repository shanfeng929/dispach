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
	toolBtns:["start round","end round","linux","complex"],
	haveHead:true,
	headBtns:["edit","save"],//å¦æhaveHead=trueï¼åå®ä¹HEADåºçæé®
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


GooFlow.prototype.onBtnSaveClick = function(){
	var a= gooFlow.exportData();
	//获取界面线条指向
	var arrow='<arrows>';
	var taskid='';
	gooFlow.$title='<%=(String )request.getParameter("id")%>';
	var flowid='<%=(String )request.getParameter("id")%>';
//	alert(flowid);
	var update='';
	var insert='';
	var startnum=0;
	var endnum=0;
	var fromlinenum=0;
	var tolinenum=0;
//	debugger;
	if(flowid!=null){
	for(var i in a.nodes){
		fromlinenum=0;
		tolinenum=0;
		if(a.nodes[i].id!=1)
			{
		var joinNum=0;
		var fromid='';
		taskid=taskid+','+a.nodes[i].id;
  for(var y in a.lines){
			if(a.nodes[i].id==a.lines[y].to){
				fromlinenum=fromlinenum+1;
				if(a.nodes[i].id!=2){
				if(joinNum==0){
					fromid=a.lines[y].from
				}
				else{
					fromid=fromid+','+a.lines[y].from
				}
				joinNum=joinNum+1;
				}
				
				arrow=arrow+' <arrow from=\"'+a.lines[y].from+'\" to=\"'+ a.lines[y].to+'\" /> ';
			}
			else if (a.nodes[i].id==a.lines[y].from){
				tolinenum=tolinenum+1;
			}	
		};  
		if((fromlinenum<1||tolinenum<1)&&a.nodes[i].id!=2&&startnum!=0&&endnum!=0){
			Ext.MessageBox.alert("注意：","节点ID"+a.nodes[i].id+"没有配置依赖关系,保存失败");
			return false;
		}
		
		var updateid='';
		if(a.nodes[i].id!=2){
		if(a.nodes[i].id.indexOf('flow')>=0){
					update=update+ " UPDATE DISPATCH_TASKETL_FLOWNAME SET PID='"+flowid+"',join_num='"+ joinNum+"' where id='"+a.nodes[i].id+"';";
					insert=insert + " UPDATE DISPATCH_TASKETL_TSDEPENDENCY SET FLOW_ID='"+flowid+"',task_prev_id='"+fromid+"' where task_id='"+a.nodes[i].id+"';"
					}
		else if(a.nodes[i].id.indexOf('flow')<0){
			update=update+" UPDATE DISPATCH_TASKETL_TASKNAME SET PID='"+flowid+"',JOIN_NUM='"+ joinNum+"' WHERE ID='"+a.nodes[i].id+"';";
			insert=insert+" UPDATE DISPATCH_TASKETL_TSDEPENDENCY SET FLOW_ID='"+flowid+"',TASK_PREV_ID='"+fromid+"' WHERE TASK_ID='"+a.nodes[i].id+"';"
		}
		}
		
				
	}else{
		startnum=startnum+1;
	}
		 if (a.nodes[i].id==2){
				endnum=endnum+1;
			}

		};
		
		arrow=arrow+' </arrows>'
		
		
		if(startnum>0&&endnum>0){
		Ext.Ajax.request({
			url : basePath + '/DisPatch/EtlFlow/insertxml',
			params : {
				'taskId' : taskid,
				'flowId':flowid,
				'loadData':JSON.stringify(a),
				'update' : update,
				'insert' : insert,
				'arrow' : arrow
					 },
			success : function(result) {
				 var json = Ext.decode(result.responseText);
				if(a.initNum==1){
					Ext.MessageBox.alert("注意：","因没有节点，流程未保存");
					return false
				} 
				
				
				
				Ext.Msg.show({
					title : '提示',
					msg : json.message,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.INFO
				});
			}});
		}
		else{
			if(startnum==0&&endnum==0){
				Ext.MessageBox.alert("注意：","请放入开始节点和结束节点！");
			}
			else if (startnum==0&&endnum>0){
				Ext.MessageBox.alert("注意：","请放入开始节点！");
			}
			else if (endnum==0&&startnum>0){
				Ext.MessageBox.alert("注意：","请放入结束节点!");
			}
		}
		
	}
		
	

	
	
	
	
	
}


GooFlow.prototype.onBtnNewClick = function(){

	alert(gooFlow.$title);

		
	


//新增流程


	
	
	

}
GooFlow.prototype.onContextClick = function(){
	
}


function alertNodeName(id,name){
	gooFlow.$nodeData[id].name=name;
}
GooFlow.prototype.openNodeDialog = function(node,id){
	if (node.type=="linux"){
		parent.linuxshow(id);
		}
		else if (node.type=="complex"){
		parent.subDraw(id);
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

