/**
 * 左侧树通用组件;封装内容：
 * 1、树形展示;
 * 2、查找功能;
 * 3、优化树 Store 加载方式,配置给树的Store 的root配置项初始化时需设置为空,如若不然，则Store会自动加载一次,
 *   store 配置参考：<LRM.store.example.TreeWithDynamicRootStore>,
 *   另：该组件自动给配置给该组件的store添加了load 事件，加载完成后展开树，避免store加载完成后树不显示的问题;
 * 
 * 备注:其他待后续完善;
 * 
 * 2015/3/3:
 *  1、增加右键点击选项，新建、修改、删除选择可配置
 *  参考内容：
 *  	LRM.view.example.TreePanelExample,
 *      LRM.controller.example.exampleController#treePanelExampleReady函数
 * 
 */
Ext.define(projectName + '.lib.component.AccountItemTreePanel',{
	extend: 'Ext.tree.Panel',
	alias: 'widget.accountItemTreePanel',
	requires: ['Ext.example.*','Ext.ux.PreviewPlugin',projectName + '.lib.component.RightItemMenus'],
	rootVisible: false,
	flex: 1,
	resizable: false,
	//右键选项数组
	contextMenus: [],
	relevanceStore : null,
	isParentItemClick: false,
	initComponent: function() {
		 var me = this ;
		 Ext.applyIf(me,{
			contextMenu: Ext.create(projectName + '.lib.component.RightItemMenus',{
				itemEntitys: me.contextMenus
			}),
			dockedItems:  [{
	    	    xtype: 'toolbar',
	    	    dock: 'top',
	    	    width:250,
	    	    items: [
	    	        {xtype: 'textfield',enableKeyEvents:true,id: me.id + '_tf_tree_queryContent', value:'',width:150},
	    	        {xtype: 'button',id: me.id + '_btn_tree_QueryButton', iconCls:'search',text: '查询'}
	    	    ]
	    	}],
            viewConfig: {
            	stripeRows: true,
		        listeners: {
		            itemcontextmenu: function(view, rec, node, index, e) {
						me.relevanceStore.load({
							params: {id: rec.raw.id, isRecursive:true}
						});
		                e.stopEvent();
		                me.contextMenu.showAt(e.getXY());
		                //传入项待需调整
		                me.contextMenu.setHanderRecord(rec);
		                return false;
		            }
		        },
                plugins: [{
                   ptype: 'treeviewdragdrop',
                   enableDrag: true,
                   enableDrop: false
                }]
            },
            listeners: {
            	boxready: function(treepanel, width, height, eOpts) {
                    treepanel.store.on({
        				load: {
        					fn: function(store,node,records,successful) {
        						if(successful) {
        							treepanel.expandPath('/root');
        						}
        					}
        				}
        			});
            		//给查询按钮增加‘click’事件:点击按钮开始执行查询操作
            		Ext.getCmp(me.id + '_btn_tree_QueryButton').on({
            			click: {
            				fn: function(querybutton) {
            					 treepanel.getRootNode().cascadeBy(function(node) {
            							if (!node.isLeaf() && !node.isLoaded()) {
            								//暂时不考虑异步动态加载节点
            								return true;
            							}
            							if (node.data.text.indexOf(Ext.getCmp(me.id + '_tf_tree_queryContent').getValue()) > -1) {
            								treepanel.expandPath(node.getPath());
            								treepanel.getSelectionModel().select(node);
            								//找到节点后，触发当前节点 ‘click’事件
            								//node.fireEvent('click', node);
            								//只查找一个符合条件的节点
            								return false; 
            							}
            				    });		            					
            				}
            			}
            		});
            		//给查询条件输入框添加‘回车’事件: 自动查询，调用查询按钮‘click’事件
            		Ext.getCmp(me.id + '_tf_tree_queryContent').on({
            			keyup: {
            				fn: function(field,e) {
            					if(e.getKey() == Ext.EventObject.ENTER) {
            						Ext.getCmp(me.id + '_btn_tree_QueryButton').fireEvent('click');
            					}
            				}
            			}
            		});
            	},
            	itemclick: function(view,record) {
        			if(!me.isParentItemClick && !record.data.leaf) {
        				return false;
        			}            		
            	}
            }            
		 });
		 me.callParent(arguments);
	},
	getContextMenu: function() {
		return this.contextMenu;
	}
});