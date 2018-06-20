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
<title>组件集成</title>
<!--[if lt IE 9]>
<?import namespace="v" implementation="#default#VML" ?>
<![endif]-->
<!-- <link type="text/css" rel="stylesheet" href="resources/ecotree/css/ECOTree.css" /> -->
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/extjs/resources/css/ext-all.css" />" />
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/icon.css" />" /> 
<!-- <script type="text/javascript" src="resources/js/ecotrees.js"></script> -->
<script type="text/javascript" src="resources/js/json2.js"></script>
<!-- <script type="text/javascript" src="resources/ecotree/js/ECOTree.js"></script>	 -->
<xml:namespace ns="urn:schemas-microsoft-com:vml" prefix="v" />
<script type="text/javascript" src="<c:url value="/resources/extjs/ext-all.js"/>"></script>
<script type="text/javascript" src="resources/js/date.js"></script>
<script type="text/javascript" src="resources/js/function.js"></script>
<script type="text/javascript" src="<c:url value="/app/app.js"/>"></script>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/resources/css/GooFlow.css"/>
<script type="text/javascript" src="<%=basePath%>/resources/js/jquery.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/resources/js/GooFunc.js"></script>
<script type="text/javascript" src="<%=basePath%>/resources/js/GooFlow.js"></script>
<%-- <script type="text/javascript" src="<%=basePath%>/resources/js/.js"></script> --%>
<script type="text/javascript">

var projectName = 'DISPATCH';
var basePath = '<%=basePath%>';
var property={
	width:1100,
	height:550,
	toolBtns:["start round","end round","linux","sql","java",/*"alarm"*//*,"complex"*/],
	haveHead:true,
	//,"undo","redo","mutiselect"
	//headBtns:["new","save","edit","undo","mutiselect"],//定义上面的工具条的按钮
	headBtns:["new","save","undo","para"],
	haveTool:true,
	haveGroup:false,
	useOperStack:true
};
var remark={
	cursor:"选择指针",
	direct:"节点连线",
	start:"开始节点",
	end:"结束节点",
	linux:"Linux命令节点",
	sql:"SQL节点",
	java:"Java调用节点",
	alarm:"预警节点",
	//complex:"子流程节点"
};
var btnRemark=["新建","保存","清空","配置参数"];
GooFlow.prototype.alertTwoStartNode = function(){
	Ext.MessageBox.alert("注意：","不允许有两个开始节点！");
};

GooFlow.prototype.alertTwoEndNode = function(){
	Ext.MessageBox.alert("注意：","不允许有两个结束节点！");
};

GooFlow.prototype.onBtnReturnClick=function(){
	var id=	parent.getTitle();
	if(id.indexOf('flow')>=0){
		Ext.Ajax.request({
			url : basePath + '/DisPatch/EtlFlow/deletetempid',
			params : {
				'tempId' : id
				},
			success : function(result) {
			
			}
		});
		gooFlow.clearData();
		document.getElementById("demo_btn_direct").style.display = "none";
		document.getElementById("demo_btn_start").style.display = "none";
		document.getElementById("demo_btn_end").style.display = "none";
		document.getElementById("demo_btn_linux").style.display = "none";
	/* 	document.getElementById("demo_btn_alarm").style.display = "none"; */
		//document.getElementById("demo_btn_complex").style.display = "none";
		
		document.getElementById("demo_btn_sql").style.display = "none";
		document.getElementById("demo_btn_java").style.display = "none";
		gooFlow.$title=null;
	}
	
}



GooFlow.prototype.onBtnEditClick = function(){
	var id=	parent.getTitle();
	if( gooFlow.$title==null){
		if(id.indexOf('flow')>=0){
			Ext.Ajax.request({
					url : basePath + '/DisPatch/EtlFlow/selectloaddata',
					params : {
						'flowId':id
					},
					success : function(result) {
						gooFlow.clearData();
						if(result.responseText!=""){
							var	Data=JSON.parse(result.responseText);
							gooFlow.loadData(Data);
						}
						gooFlow.$title=id;
						if(id!=null){
							document.getElementById("demo_btn_direct").style.display = "block";
							document.getElementById("demo_btn_start").style.display = "block";
							document.getElementById("demo_btn_end").style.display = "block";
							document.getElementById("demo_btn_linux").style.display = "block";
							//document.getElementById("demo_btn_complex").style.display = "block";
							/* document.getElementById("demo_btn_alarm").style.display = "block"; */
							document.getElementById("demo_btn_sql").style.display = "block";
							document.getElementById("demo_btn_java").style.display = "block";
						}
						
					}
			});
		}
	
	}else{
		Ext.MessageBox.alert("注意：","请先保存当前流程!");
	}
}




GooFlow.prototype.onBtnSaveClick = function(){
	var a= gooFlow.exportData();
	//获取界面线条指向
	var arrow='<arrows>';
	var taskid='';
	var startnum=0;
	var endnum=0;
	var fromlinenum=0;
	var tolinenum=0;
	var flowid=gooFlow.$title;
	var update='';
	var insert='';
	if(flowid!=null){
		for(var i in a.nodes){
			fromlinenum=0;
			tolinenum=0;
			if(a.nodes[i].id!=1){
				var joinNum=0;
				var fromid='';
				taskid=taskid+','+a.nodes[i].id;
			
				for(var y in a.lines){
						if(a.nodes[i].id==a.lines[y].to){
							fromlinenum=fromlinenum+1;
							if(a.nodes[i].id!=2){
								if(joinNum==0){
									fromid=a.lines[y].from
								}else{
									fromid=fromid+','+a.lines[y].from
								}
								joinNum=joinNum+1;
							}
							arrow=arrow+' <arrow from=\"'+a.lines[y].from+'\" to=\"'+ a.lines[y].to+'\" name=\"'+ charformat(a.lines[y].name)+'\" /> ';
						} else if (a.nodes[i].id==a.lines[y].from){
							tolinenum=tolinenum+1;
						}
				};  
				if((fromlinenum<1||tolinenum<1)&&a.nodes[i].id!=2&&startnum!=0&&endnum!=0){
					Ext.MessageBox.alert("注意：","节点[ ID:"+a.nodes[i].id+" name:"+a.nodes[i].name+" ]没有配置依赖关系,保存失败");
					return false;
				}
				var updateid='';
				if(a.nodes[i].id!=2){
					if(a.nodes[i].id.indexOf('flow')>=0){
						update=update+ " UPDATE DISPATCH_TASKETL_FLOWNAME SET PID='"+flowid+"',JOIN_NUM="+joinNum+" WHERE ID='"+a.nodes[i].id+"';";
						insert=insert + " UPDATE DISPATCH_TASKETL_TSDEPENDENCY SET FLOW_ID='"+flowid+"',TASK_PREV_ID='"+fromid+"' WHERE TASK_ID='"+a.nodes[i].id+"';"
					} else if(a.nodes[i].id.indexOf('flow')<0){
						update=update+" UPDATE DISPATCH_TASKETL_TASKNAME SET PID='"+flowid+"',JOIN_NUM="+joinNum+" WHERE ID='"+a.nodes[i].id+"';";
						insert=insert+" UPDATE DISPATCH_TASKETL_TSDEPENDENCY SET FLOW_ID='"+flowid+"',TASK_PREV_ID='"+fromid+"' WHERE TASK_ID='"+a.nodes[i].id+"';"
					}
				}
			} else{
				startnum=startnum+1;
			}
			if (a.nodes[i].id==2){
				endnum=endnum+1;
			}
		}
		arrow=arrow+' </arrows>';
		if(taskid==',2'){
			Ext.MessageBox.alert("注意：","因绘图面板上没有有效任务节点，任务链未能保存");
			return false;
		}
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
					gooFlow.$title=null;	
					gooFlow.clearData();
					document.getElementById("demo_btn_direct").style.display = "none";
					document.getElementById("demo_btn_start").style.display = "none";
					document.getElementById("demo_btn_end").style.display = "none";
					document.getElementById("demo_btn_linux").style.display = "none";
					//document.getElementById("demo_btn_complex").style.display = "none";
					/* document.getElementById("demo_btn_alarm").style.display = "none"; */
					document.getElementById("demo_btn_sql").style.display = "none";
					document.getElementById("demo_btn_java").style.display = "none";
					/* if(a.initNum==1){
						Ext.MessageBox.alert("注意：","因没有节点，流程未保存");
						return false;
					} */
					Ext.Msg.show({
							title : '提示',
							msg : json.message,
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.INFO
					});
				}
			});
		}else{
			if(startnum==0&&endnum==0){
				Ext.MessageBox.alert("注意：","请放入开始节点和结束节点！");
			} else if (startnum==0&&endnum>0){
				Ext.MessageBox.alert("注意：","请放入开始节点！");
			} else if (endnum==0&&startnum>0){
				Ext.MessageBox.alert("注意：","请放入结束节点!");
			}
		}
	}
	
}

function charformat(condition){
	var str = condition.replace(/&/g,"&amp;");
	str = str.replace(/>/g,"&gt;");
	str = str.replace(/</g,"&lt;");
	str = str.replace(/\"/g,"&quot;");
	return str;
}


function alertNodeName(id,name){
	gooFlow.$nodeData[id].name=name;
}

//新增任务链
GooFlow.prototype.onBtnNewClick = function(){
	var flowid;
	var branch=0;
	//GooFlow.prototype.$title=null;
	if( gooFlow.$title==null){
		Ext.Ajax.request({
			url : basePath + '/DisPatch/EtlFlow/maxflowid',
			success : function(result) {
				flowid=result.responseText;	
				 parent.flowWindowShow(flowid,branch);
				 gooFlow.$title = flowid;
				 //显示控件按钮
				if(flowid!=null){
					document.getElementById("demo_btn_direct").style.display = "block";
					document.getElementById("demo_btn_start").style.display = "block";
					document.getElementById("demo_btn_end").style.display = "block";
					document.getElementById("demo_btn_linux").style.display = "block";
					//document.getElementById("demo_btn_complex").style.display = "block";
					/* document.getElementById("demo_btn_alarm").style.display = "block"; */
					document.getElementById("demo_btn_sql").style.display = "block";
					document.getElementById("demo_btn_java").style.display = "block";
				}
			}
		});
	}else{
		Ext.MessageBox.alert("注意：","请先保存当前流程!");
	}
}

GooFlow.prototype.onBtnParaClick= function(){
	if(gooFlow.$title!=null&&gooFlow.$title!=''){
		parent.paraWindowShow(gooFlow.$title);
	}
} 

function deletetempId() {
	if(gooFlow.$title!=null){ 
		return gooFlow.$title;
	}
}
	
function titlenull(){
	gooFlow.$title=null
}

function loadXML(id){
	//var id=	parent.getTitle();
	if( gooFlow.$title==null){
		//if(id.indexOf('flow')>=0){
		Ext.Ajax.request({
			url : basePath + '/DisPatch/EtlFlow/selectloaddata',
			params : {
				'flowId':id
			},
			success : function(result) {
				gooFlow.clearData();
				if(result.responseText!=""){
					var	Data=JSON.parse(result.responseText);
					gooFlow.loadData(Data);
				}
				gooFlow.$title=id;
				if(id!=null){
					document.getElementById("demo_btn_direct").style.display = "block";
					document.getElementById("demo_btn_start").style.display = "block";
					document.getElementById("demo_btn_end").style.display = "block";
					document.getElementById("demo_btn_linux").style.display = "block";
					//document.getElementById("demo_btn_complex").style.display = "block";
					
					document.getElementById("demo_btn_sql").style.display = "block";
					document.getElementById("demo_btn_java").style.display = "block";
					/* document.getElementById("demo_btn_alarm").style.display = "block"; */
					
				}
				
			}
		});
		//}
	}else{
		Ext.Ajax.request({
			url : basePath + '/DisPatch/EtlFlow/selectloaddata',
			params : {
				'flowId':gooFlow.$title
			},
			success : function(result) {
				if(result.responseText!=""){
					var	Data=result.responseText;
					var newData = JSON.stringify(gooFlow.exportData());
					Data = Data.replace(/,"alt":true/g,"");
					newData = newData.replace(/,"alt":true/g,"");
					//alert(Data);
					//alert(newData);
					if(Data == newData){
						Ext.Ajax.request({
							url : basePath + '/DisPatch/EtlFlow/selectloaddata',
							params : {
								'flowId':id
							},
							success : function(result) {
								gooFlow.clearData();
								if(result.responseText!=""){
									var	Data=JSON.parse(result.responseText);
									gooFlow.loadData(Data);
								}
								gooFlow.$title=id;
								if(id!=null){
									document.getElementById("demo_btn_direct").style.display = "block";
									document.getElementById("demo_btn_start").style.display = "block";
									document.getElementById("demo_btn_end").style.display = "block";
									document.getElementById("demo_btn_linux").style.display = "block";
									//document.getElementById("demo_btn_complex").style.display = "block";
									
									document.getElementById("demo_btn_sql").style.display = "block";
									document.getElementById("demo_btn_java").style.display = "block";
									/* document.getElementById("demo_btn_alarm").style.display = "block"; */
								}
							}
						});
					}else{
						Ext.MessageBox.alert("注意：","请先保存当前流程!");
					}
				}
			}
		});
	}
}
 
GooFlow.prototype.onContextClick = function(){
	var id=	parent.getTitle();
	parent.checkFlow(id);
	
}
GooFlow.prototype.openNodeDialog = function(node,id){
	if (node.type=="linux"){
		parent.linuxshow(id);
	} /*else if (node.type=="complex"){
		parent.subDraw(id);
	} */else if (node.type=="sql"){
		parent.sqlshow(id);
	} else if (node.type=="java"){
		parent.javashow(id);
	} else if (node.type=='alarm'){
		parent.alarmshow(id);
	}
	
}

var gooFlow;
$(document).ready(function(){
	property.width = document.documentElement.clientWidth;
	gooFlow=$.createGooFlow($("#demo"),property);
	gooFlow.setNodeRemarks(remark);
	gooFlow.setBtnRemarks(btnRemark);
	gooFlow.onItemDel=function(id,type){
		return true;
	}
	//gooFlow.loadData(jsondata);
	
});

</script>

</head>
<body>
<div id="demo" style="margin:0; padding:0"></div>
</body>
</html>

