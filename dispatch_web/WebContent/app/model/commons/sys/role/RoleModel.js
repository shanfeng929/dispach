
Ext.define(projectName +'.model.commons.sys.role.RoleModel', {
    extend: 'Ext.data.Model',
    fields: [{name: 'id', type: 'int'},
             {name: 'code',type: 'string'},
             {name: 'name', type: 'string'}, 
    	     {name: 'description',type: 'string'},
    	     {name: 'dataStatus',type: 'string'},
    	     {name: 'creator',type: 'int'},
    	     {name: 'modifier',type: 'int'},
    	     {name: 'creatorName', type: 'string'},
    	     {name: 'dateCreated', type: 'string'},
    	     {name: 'modifierName', type: 'string'},
    	     {name: 'dateUpdated', type: 'string'}
    	     ]
});

 function changeDateFormat(date){
	 if(date==null){
		 return null;
	 }else{
		 if(Ext.isIE){
			 var bdate=date.toString().replace(/-/g,"/").replace(/T/g," ");
			 return new Date(Date.parse(bdate));
		 }else{
			 return date;
		 }
	 }
 }