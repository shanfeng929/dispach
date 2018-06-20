prompt PL/SQL Developer import file
prompt Created on 2018年6月14日 by LAISHANFENG608
set feedback off
set define off
prompt Disabling triggers for SYS_APP_LOG...
alter table SYS_APP_LOG disable all triggers;
prompt Disabling triggers for SYS_APP_STATUS...
alter table SYS_APP_STATUS disable all triggers;
prompt Disabling triggers for SYS_AUTHORITY_GROUP_TB...
alter table SYS_AUTHORITY_GROUP_TB disable all triggers;
prompt Disabling triggers for SYS_AUTHORITY_TB...
alter table SYS_AUTHORITY_TB disable all triggers;
prompt Disabling triggers for SYS_LOG...
alter table SYS_LOG disable all triggers;
prompt Disabling triggers for SYS_MAP_AUTH_AUTHGROUP_TB...
alter table SYS_MAP_AUTH_AUTHGROUP_TB disable all triggers;
prompt Disabling triggers for SYS_MAP_AUTH_MENU_TB...
alter table SYS_MAP_AUTH_MENU_TB disable all triggers;
prompt Disabling triggers for SYS_MAP_AUTH_OPEA_TB...
alter table SYS_MAP_AUTH_OPEA_TB disable all triggers;
prompt Disabling triggers for SYS_MAP_ROLE_AUTH_TB...
alter table SYS_MAP_ROLE_AUTH_TB disable all triggers;
prompt Disabling triggers for SYS_MAP_ROLE_USERGROUP_TB...
alter table SYS_MAP_ROLE_USERGROUP_TB disable all triggers;
prompt Disabling triggers for SYS_MAP_USER_ORGAN_TB...
alter table SYS_MAP_USER_ORGAN_TB disable all triggers;
prompt Disabling triggers for SYS_MAP_USER_ROLE_TB...
alter table SYS_MAP_USER_ROLE_TB disable all triggers;
prompt Disabling triggers for SYS_MAP_USER_USERGROUP_TB...
alter table SYS_MAP_USER_USERGROUP_TB disable all triggers;
prompt Disabling triggers for SYS_MENU_TB...
alter table SYS_MENU_TB disable all triggers;
prompt Disabling triggers for SYS_OPERATION_TB...
alter table SYS_OPERATION_TB disable all triggers;
prompt Disabling triggers for SYS_ORGAN_TB...
alter table SYS_ORGAN_TB disable all triggers;
prompt Disabling triggers for SYS_ROLE_TB...
alter table SYS_ROLE_TB disable all triggers;
prompt Disabling triggers for SYS_USER_GROUP_TB...
alter table SYS_USER_GROUP_TB disable all triggers;
prompt Disabling triggers for SYS_USER_TB...
alter table SYS_USER_TB disable all triggers;
prompt Deleting SYS_USER_TB...
delete from SYS_USER_TB;
commit;
prompt Deleting SYS_USER_GROUP_TB...
delete from SYS_USER_GROUP_TB;
commit;
prompt Deleting SYS_ROLE_TB...
delete from SYS_ROLE_TB;
commit;
prompt Deleting SYS_ORGAN_TB...
delete from SYS_ORGAN_TB;
commit;
prompt Deleting SYS_OPERATION_TB...
delete from SYS_OPERATION_TB;
commit;
prompt Deleting SYS_MENU_TB...
delete from SYS_MENU_TB;
commit;
prompt Deleting SYS_MAP_USER_USERGROUP_TB...
delete from SYS_MAP_USER_USERGROUP_TB;
commit;
prompt Deleting SYS_MAP_USER_ROLE_TB...
delete from SYS_MAP_USER_ROLE_TB;
commit;
prompt Deleting SYS_MAP_USER_ORGAN_TB...
delete from SYS_MAP_USER_ORGAN_TB;
commit;
prompt Deleting SYS_MAP_ROLE_USERGROUP_TB...
delete from SYS_MAP_ROLE_USERGROUP_TB;
commit;
prompt Deleting SYS_MAP_ROLE_AUTH_TB...
delete from SYS_MAP_ROLE_AUTH_TB;
commit;
prompt Deleting SYS_MAP_AUTH_OPEA_TB...
delete from SYS_MAP_AUTH_OPEA_TB;
commit;
prompt Deleting SYS_MAP_AUTH_MENU_TB...
delete from SYS_MAP_AUTH_MENU_TB;
commit;
prompt Deleting SYS_MAP_AUTH_AUTHGROUP_TB...
delete from SYS_MAP_AUTH_AUTHGROUP_TB;
commit;
prompt Deleting SYS_LOG...
delete from SYS_LOG;
commit;
prompt Deleting SYS_AUTHORITY_TB...
delete from SYS_AUTHORITY_TB;
commit;
prompt Deleting SYS_AUTHORITY_GROUP_TB...
delete from SYS_AUTHORITY_GROUP_TB;
commit;
prompt Deleting SYS_APP_STATUS...
delete from SYS_APP_STATUS;
commit;
prompt Deleting SYS_APP_LOG...
delete from SYS_APP_LOG;
commit;
prompt Loading SYS_APP_LOG...
prompt Table is empty
prompt Loading SYS_APP_STATUS...
insert into SYS_APP_STATUS (BANK_NAME, SYSTEM_NAME, SERVER_ID, CPU_RATE, MEMORY_RATE, UPDATE_TIME)
values ('启东农商银行', '资产负债管理系统', '10.59.97.17', 52.32, 32.21, '2016-11-04 12:36:21');
insert into SYS_APP_STATUS (BANK_NAME, SYSTEM_NAME, SERVER_ID, CPU_RATE, MEMORY_RATE, UPDATE_TIME)
values ('启东农商银行', '任务调度管理平台', '10.59.97.17', 23.25, 14.35, '2016-11-04 12:36:21');
commit;
prompt 2 records loaded
prompt Loading SYS_AUTHORITY_GROUP_TB...
prompt Table is empty
prompt Loading SYS_AUTHORITY_TB...
insert into SYS_AUTHORITY_TB (ID, CODE, NAME, DESCRIPTION, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (1, '1', '超级管理员', ' ', null, null, null, null, 1);
commit;
prompt 1 records loaded
prompt Loading SYS_LOG...
prompt Table is empty
prompt Loading SYS_MAP_AUTH_AUTHGROUP_TB...
prompt Table is empty
prompt Loading SYS_MAP_AUTH_MENU_TB...
insert into SYS_MAP_AUTH_MENU_TB (AUTH_ID, MENU_ID)
values (1, 116);
insert into SYS_MAP_AUTH_MENU_TB (AUTH_ID, MENU_ID)
values (1, 213);
insert into SYS_MAP_AUTH_MENU_TB (AUTH_ID, MENU_ID)
values (1, 215);
insert into SYS_MAP_AUTH_MENU_TB (AUTH_ID, MENU_ID)
values (1, 216);
insert into SYS_MAP_AUTH_MENU_TB (AUTH_ID, MENU_ID)
values (1, 224);
insert into SYS_MAP_AUTH_MENU_TB (AUTH_ID, MENU_ID)
values (1, 219);
insert into SYS_MAP_AUTH_MENU_TB (AUTH_ID, MENU_ID)
values (1, 221);
insert into SYS_MAP_AUTH_MENU_TB (AUTH_ID, MENU_ID)
values (1, 223);
insert into SYS_MAP_AUTH_MENU_TB (AUTH_ID, MENU_ID)
values (1, 225);
insert into SYS_MAP_AUTH_MENU_TB (AUTH_ID, MENU_ID)
values (1, 226);
insert into SYS_MAP_AUTH_MENU_TB (AUTH_ID, MENU_ID)
values (1, 217);
insert into SYS_MAP_AUTH_MENU_TB (AUTH_ID, MENU_ID)
values (1, 218);
insert into SYS_MAP_AUTH_MENU_TB (AUTH_ID, MENU_ID)
values (1, 220);
insert into SYS_MAP_AUTH_MENU_TB (AUTH_ID, MENU_ID)
values (1, 224);
insert into SYS_MAP_AUTH_MENU_TB (AUTH_ID, MENU_ID)
values (1, 227);
insert into SYS_MAP_AUTH_MENU_TB (AUTH_ID, MENU_ID)
values (1, 228);
insert into SYS_MAP_AUTH_MENU_TB (AUTH_ID, MENU_ID)
values (1, 229);
insert into SYS_MAP_AUTH_MENU_TB (AUTH_ID, MENU_ID)
values (1, 230);
commit;
prompt 10 records loaded
prompt Loading SYS_MAP_AUTH_OPEA_TB...
prompt Table is empty
prompt Loading SYS_MAP_ROLE_AUTH_TB...
insert into SYS_MAP_ROLE_AUTH_TB (ROLE_ID, AUTH_ID)
values (1, 1);
insert into SYS_MAP_ROLE_AUTH_TB (ROLE_ID, AUTH_ID)
values (2, 1);
commit;
prompt 2 records loaded
prompt Loading SYS_MAP_ROLE_USERGROUP_TB...
prompt Table is empty
prompt Loading SYS_MAP_USER_ORGAN_TB...
insert into SYS_MAP_USER_ORGAN_TB (USER_ID, ORGAN_ID)
values (2, 1);
insert into SYS_MAP_USER_ORGAN_TB (USER_ID, ORGAN_ID)
values (3, 1);
insert into SYS_MAP_USER_ORGAN_TB (USER_ID, ORGAN_ID)
values (4, 1);
commit;
prompt 3 records loaded
prompt Loading SYS_MAP_USER_ROLE_TB...
insert into SYS_MAP_USER_ROLE_TB (USER_ID, ROLE_ID)
values (1, 1);
insert into SYS_MAP_USER_ROLE_TB (USER_ID, ROLE_ID)
values (2, 1);
insert into SYS_MAP_USER_ROLE_TB (USER_ID, ROLE_ID)
values (3, 1);
insert into SYS_MAP_USER_ROLE_TB (USER_ID, ROLE_ID)
values (4, 1);
commit;
prompt 4 records loaded
prompt Loading SYS_MAP_USER_USERGROUP_TB...
prompt Table is empty
prompt Loading SYS_MENU_TB...
insert into SYS_MENU_TB (ID, CODE, NAME, URL_, CLS, PARENT_ID, MENU_VIEW, LEAF, DESCRIPTION, DIS_ORDER, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (116, 'MENU_M0116', '任务调度配置', 'CONTROLLER', 'CLS', 0, 'VIEW', '0', '流程管理', 116, 1, 1, to_timestamp('25-03-2016 13:57:52.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), to_timestamp('02-06-2016 12:35:09.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), 1);
insert into SYS_MENU_TB (ID, CODE, NAME, URL_, CLS, PARENT_ID, MENU_VIEW, LEAF, DESCRIPTION, DIS_ORDER, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (213, 'MENU_M0120', '任务流程管理', 'CONTROLLER', null, 116, 'VIEW', '0', null, 120, 1, null, to_timestamp('02-06-2016 13:50:18.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), to_timestamp('02-06-2016 13:53:53.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), 1);
insert into SYS_MENU_TB (ID, CODE, NAME, URL_, CLS, PARENT_ID, MENU_VIEW, LEAF, DESCRIPTION, DIS_ORDER, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (215, 'MENU_M0124', '任务链定义', 'dispatch.etldispatch.DisPatchController', null, 213, 'dispatchlistview', '1', null, 124, 1, 1, to_timestamp('02-06-2016 13:53:53.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), to_timestamp('16-07-2016 14:19:55.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), 1);
insert into SYS_MENU_TB (ID, CODE, NAME, URL_, CLS, PARENT_ID, MENU_VIEW, LEAF, DESCRIPTION, DIS_ORDER, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (216, 'MENU_M125', '任务调度管理', 'dispatch.flow.FlowManageController', null, 213, 'flowManageList', '1', null, 125, 1, 1, to_timestamp('02-06-2016 14:08:56.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), to_timestamp('16-07-2016 14:19:01.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), 1);
insert into SYS_MENU_TB (ID, CODE, NAME, URL_, CLS, PARENT_ID, MENU_VIEW, LEAF, DESCRIPTION, DIS_ORDER, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (217, 'MENU_M126', '流程组配置', 'dispatch.flow.FlowGroupController', null, 213, 'flowGroupList', '1', null, 126, 1, null, to_timestamp('02-06-2016 14:11:54.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), null, 1);
insert into SYS_MENU_TB (ID, CODE, NAME, URL_, CLS, PARENT_ID, MENU_VIEW, LEAF, DESCRIPTION, DIS_ORDER, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (218, 'MENU_M0215', '任务组件', 'dispatch.etldispatch.TemplateManageController', null, 213, 'templateManageList', '1', null, 215, 1, 1, to_timestamp('02-06-2016 14:14:05.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), to_timestamp('06-06-2016 10:21:53.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), 1);
insert into SYS_MENU_TB (ID, CODE, NAME, URL_, CLS, PARENT_ID, MENU_VIEW, LEAF, DESCRIPTION, DIS_ORDER, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (219, 'MENU_M0146', '参数管理', 'CONTROLLER', null, 116, 'VIEW', '0', null, 146, 1, null, to_timestamp('02-06-2016 14:16:12.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), to_timestamp('02-06-2016 14:18:06.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), 1);
insert into SYS_MENU_TB (ID, CODE, NAME, URL_, CLS, PARENT_ID, MENU_VIEW, LEAF, DESCRIPTION, DIS_ORDER, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (220, 'MENU_M0981', '运行参数配置', 'dispatch.parameters.ParametersController', null, 219, 'parametersList', '1', null, 981, 1, null, to_timestamp('02-06-2016 14:18:06.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), null, 1);
insert into SYS_MENU_TB (ID, CODE, NAME, URL_, CLS, PARENT_ID, MENU_VIEW, LEAF, DESCRIPTION, DIS_ORDER, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (221, 'MENU_M0134', '远程服务配置', 'dispatch.remoteservice.RemoteServiceController', null, 219, 'remoteserviceList', '1', null, 134, 1, null, to_timestamp('02-06-2016 14:19:46.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), null, 1);
insert into SYS_MENU_TB (ID, CODE, NAME, URL_, CLS, PARENT_ID, MENU_VIEW, LEAF, DESCRIPTION, DIS_ORDER, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (223, 'MENU_M0184', '任务链包管理', 'dispatch.etldispatch.DisPatchController', null, 219, 'disPatchPackageListView', '1', null, 184, 1, 1, to_timestamp('15-07-2016 15:25:43.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), to_timestamp('15-07-2016 16:12:13.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), 1);
insert into SYS_MENU_TB (ID, CODE, NAME, URL_, CLS, PARENT_ID, MENU_VIEW, LEAF, DESCRIPTION, DIS_ORDER, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (224, 'MENU_M127', '任务执行监控', 'dispatch.flow.FlowMonitorController', null, 213, 'flowMonitorList', '1', null, 127, 1, 1, to_timestamp('16-07-2016 15:25:43.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), to_timestamp('16-07-2016 15:25:43.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), 1);
insert into SYS_MENU_TB (ID, CODE, NAME, URL_, CLS, PARENT_ID, MENU_VIEW, LEAF, DESCRIPTION, DIS_ORDER, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (225, 'MENU_M0225', '数据源配置', 'dispatch.parameters.DataSourceController', null, 219, 'dataSourceList', '1', null, 225, 1, 1, to_timestamp('21-07-2016 17:41:43.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), to_timestamp('21-07-2016 17:41:43.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), 1);
insert into SYS_MENU_TB (ID, CODE, NAME, URL_, CLS, PARENT_ID, MENU_VIEW, LEAF, DESCRIPTION, DIS_ORDER, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (226, 'MENU_M0226', '操作日志', 'dispatch.parameters.OpLogsController', null, 219, 'opLogsList', '1', null, 226, 1, null, to_timestamp('25-07-2016 15:56:38.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), null, 1);
insert into SYS_MENU_TB (ID, CODE, NAME, URL_, CLS, PARENT_ID, MENU_VIEW, LEAF, DESCRIPTION, DIS_ORDER, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (227, 'MENU_M01001', '权限管理', 'commons.sys.authority.AuthorityController', null, 219, 'authorityList', '1', null, 1001, 1, null, to_timestamp('26-07-2016 10:38:09.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), null, 1);
insert into SYS_MENU_TB (ID, CODE, NAME, URL_, CLS, PARENT_ID, MENU_VIEW, LEAF, DESCRIPTION, DIS_ORDER, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (228, 'MENU_M01002', '角色管理', 'commons.sys.role.RoleController', null, 219, 'roleList', '1', null, 1002, 1, null, to_timestamp('26-07-2016 13:55:04.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), null, 1);
insert into SYS_MENU_TB (ID, CODE, NAME, URL_, CLS, PARENT_ID, MENU_VIEW, LEAF, DESCRIPTION, DIS_ORDER, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (229, 'MENU_M01003', '用户管理', 'commons.sys.user.UserController', null, 219, 'userList', '1', null, 1003, 1, null, to_timestamp('26-07-2016 13:58:20.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), null, 1);
insert into SYS_MENU_TB (ID, CODE, NAME, URL_, CLS, PARENT_ID, MENU_VIEW, LEAF, DESCRIPTION, DIS_ORDER, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (230, 'MENU_M1004', '菜单管理', 'commons.sys.menu.MenuListController', null, 219, 'menuList', '1', null, 1004, 1, null, to_timestamp('26-07-2016 14:01:23.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), null, 1);
commit;
prompt 17 records loaded
prompt Loading SYS_OPERATION_TB...
prompt Table is empty
prompt Loading SYS_ORGAN_TB...
insert into SYS_ORGAN_TB (ID, CODE, NAME, SHORT_NAME, PARENT_ID, DIS_ORDER, DESCRIPTION, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (1, '1', '数据管理平台', '总行', 0, 0, null, null, null, to_timestamp('03-11-2015 13:21:51.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), to_timestamp('03-11-2015 13:21:51.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), 1);
insert into SYS_ORGAN_TB (ID, CODE, NAME, SHORT_NAME, PARENT_ID, DIS_ORDER, DESCRIPTION, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (2, '1111', '111', ' ', 1, null, ' ', 1, null, to_timestamp('13-07-2016 17:03:19.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), null, 1);
commit;
prompt 2 records loaded
prompt Loading SYS_ROLE_TB...
insert into SYS_ROLE_TB (ID, CODE, NAME, DESCRIPTION, TYPE_, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (1, '1', '管理员角色', '系统初始化管理员角色', null, 1, 1, to_timestamp('03-11-2015 13:21:51.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), to_timestamp('03-11-2015 13:21:51.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), 0);
commit;
prompt 1 records loaded
prompt Loading SYS_USER_GROUP_TB...
prompt Table is empty
prompt Loading SYS_USER_TB...
insert into SYS_USER_TB (ID, CODE, LOGIN_NAME, REAL_NAME, ALPHA, PASSWORD, PHONE, POST, EXPIRED_AT, PASSWORD_EXPIRED_AT, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (1, null, 'admin', 'admin', null, '$2a$10$D6enx5E4W3JvKHus8YcAPOrj8OLnjL.y9eTUvY91EMIA9yejYwiTa', ' 12345678901', '123@163.com', null, null, null, null, to_timestamp('03-11-2015 13:21:51.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), to_timestamp('05-08-2016 09:20:11.656000', 'dd-mm-yyyy hh24:mi:ss.ff'), 0);
insert into SYS_USER_TB (ID, CODE, LOGIN_NAME, REAL_NAME, ALPHA, PASSWORD, PHONE, POST, EXPIRED_AT, PASSWORD_EXPIRED_AT, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (2, null, 'lucien', 'lucien', null, '$2a$10$LIxKMIIap0g9Nm2BqpDDSOkmXJozrBIFRgD.nqhXOh.VE5ClYu9di', '12345678901', 'user@example.com', null, null, null, null, to_timestamp('25-04-2016 16:11:16.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), null, 0);
insert into SYS_USER_TB (ID, CODE, LOGIN_NAME, REAL_NAME, ALPHA, PASSWORD, PHONE, POST, EXPIRED_AT, PASSWORD_EXPIRED_AT, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (3, null, 'cs', 'cs', null, '$2a$10$OYmfF8k65fzl6dkaxAFPaO67z5DWoU8VOdtd.HFP50E8XkHyRfnnK', ' ', ' ', null, null, null, null, to_timestamp('17-05-2016 13:23:53.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), to_timestamp('17-05-2016 13:24:36.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), 0);
insert into SYS_USER_TB (ID, CODE, LOGIN_NAME, REAL_NAME, ALPHA, PASSWORD, PHONE, POST, EXPIRED_AT, PASSWORD_EXPIRED_AT, CREATOR_ID, MODIFIER_ID, DATE_CREATED, DATE_MODIFIED, DATA_STATUS)
values (4, null, 'weil', '魏', null, '$2a$10$kYfjBEgBd6NBdbC08CfLxeiNq.BdSJeGCZ5q/X0q9/K5dmcV.j/bm', '10086100861', 'sometimesNaive@GuojiEryuan.com', null, null, null, null, to_timestamp('28-06-2016 16:49:03.000000', 'dd-mm-yyyy hh24:mi:ss.ff'), to_timestamp('02-08-2016 14:18:32.531000', 'dd-mm-yyyy hh24:mi:ss.ff'), 0);
commit;
prompt 4 records loaded
prompt Enabling triggers for SYS_APP_LOG...
alter table SYS_APP_LOG enable all triggers;
prompt Enabling triggers for SYS_APP_STATUS...
alter table SYS_APP_STATUS enable all triggers;
prompt Enabling triggers for SYS_AUTHORITY_GROUP_TB...
alter table SYS_AUTHORITY_GROUP_TB enable all triggers;
prompt Enabling triggers for SYS_AUTHORITY_TB...
alter table SYS_AUTHORITY_TB enable all triggers;
prompt Enabling triggers for SYS_LOG...
alter table SYS_LOG enable all triggers;
prompt Enabling triggers for SYS_MAP_AUTH_AUTHGROUP_TB...
alter table SYS_MAP_AUTH_AUTHGROUP_TB enable all triggers;
prompt Enabling triggers for SYS_MAP_AUTH_MENU_TB...
alter table SYS_MAP_AUTH_MENU_TB enable all triggers;
prompt Enabling triggers for SYS_MAP_AUTH_OPEA_TB...
alter table SYS_MAP_AUTH_OPEA_TB enable all triggers;
prompt Enabling triggers for SYS_MAP_ROLE_AUTH_TB...
alter table SYS_MAP_ROLE_AUTH_TB enable all triggers;
prompt Enabling triggers for SYS_MAP_ROLE_USERGROUP_TB...
alter table SYS_MAP_ROLE_USERGROUP_TB enable all triggers;
prompt Enabling triggers for SYS_MAP_USER_ORGAN_TB...
alter table SYS_MAP_USER_ORGAN_TB enable all triggers;
prompt Enabling triggers for SYS_MAP_USER_ROLE_TB...
alter table SYS_MAP_USER_ROLE_TB enable all triggers;
prompt Enabling triggers for SYS_MAP_USER_USERGROUP_TB...
alter table SYS_MAP_USER_USERGROUP_TB enable all triggers;
prompt Enabling triggers for SYS_MENU_TB...
alter table SYS_MENU_TB enable all triggers;
prompt Enabling triggers for SYS_OPERATION_TB...
alter table SYS_OPERATION_TB enable all triggers;
prompt Enabling triggers for SYS_ORGAN_TB...
alter table SYS_ORGAN_TB enable all triggers;
prompt Enabling triggers for SYS_ROLE_TB...
alter table SYS_ROLE_TB enable all triggers;
prompt Enabling triggers for SYS_USER_GROUP_TB...
alter table SYS_USER_GROUP_TB enable all triggers;
prompt Enabling triggers for SYS_USER_TB...
alter table SYS_USER_TB enable all triggers;
set feedback on
set define on
prompt Done.
