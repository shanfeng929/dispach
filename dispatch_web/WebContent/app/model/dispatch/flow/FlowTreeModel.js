/**
 * 流程树model
 */
Ext.define(projectName +'.model.dispatch.flow.FlowTreeModel',{
	extend:'Ext.data.Model',
	alias : 'widget.node',
	fields:[
	    {name:'id',type:'string'},
		{name:'text',type:'string'},
		{name:'leaf',type:'boolean'},
//		{name:'checked',type:'boolean'},
		{name:'children',type:'auto'}
	],
	idProperty:'id',
	associations: [
        {type: 'hasMany',model: projectName +'.model.dispatch.flow.FlowTreeModel',name: 'children'}
    ]
});
/*{

    text : '页面配置管理',
    expanded : true,
    children : [{
    text : '页面配置管理',
    id : 'configManage',
    leaf : true }]

}*/