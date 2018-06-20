
Ext.define(projectName +'.model.commons.sys.user.UserModel', {
    extend: 'Ext.data.Model',
    fields: [{name: 'id', type: 'int'},
     		 {name: 'realName',type: 'string'},
             {name: 'organName',type: 'string'},
             {name: 'loginName', type: 'string'}, 
    	     {name: 'roles',type: 'string'}, 
    	     {name: 'password', type: 'string'},
    	     {name: 'code', type: 'string'},
    	     {name: 'phone', type: 'string'},
    	     {name: 'locked', type: 'boolean'},
    	     {name: 'post',type: 'string'},
    	     {name: 'alpha', type: 'string'},
    	     {name: 'expiredAt',type: 'date'},
    	     {name: 'passwordExpiredAt',type: 'date'},
    	     {name: 'dataStatus', type: 'string'}
    	     ]
//    	     ,
//    associations: [
//    	{type: 'hasOne',model: 'LRM.model.sys.organ.OrganModel',name: 'organ'
//        },
//        {type: 'hasMany',model: 'LRM.model.sys.role.RoleModel',name: 'roles'
//        }
//     ]
});