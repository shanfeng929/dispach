var mytree = null;

function createTree() {
	
	mytree = new ECOTree('mytree','myTreeContainer1');
	
	mytree.config.iRootOrientation = ECOTree.RO_LEFT;
	mytree.config.selectMode = ECOTree.SL_MULTIPLE;
	mytree.config.defaultNodeWidth = 100;
	mytree.config.defaultNodeHeight = 45;
	
	//id,pid,name,width,height
	mytree.add(0,-1,'债项RWA',100,45);
	mytree.add(1,0,'未缓释RWA',100,45);
	mytree.add(2,0,'已缓释RWA',100,45);
	mytree.add(3,1,'风险暴露EAD',100,45);
	mytree.add(4,1,'债项权重',100,45);
	mytree.add(5,2,'缓释1的RWA',100,45);
	mytree.add(6,2,'缓释2的RWA',100,45);
	mytree.add(7,5,'风险暴露EAD',100,45);
	mytree.add(8,5,'债项权重',100,45);
	mytree.add(9,6,'风险暴露EAD',100,45);
	mytree.add(10,6,'债项权重',100,45);	
	
	
	mytree.UpdateTree();
}
