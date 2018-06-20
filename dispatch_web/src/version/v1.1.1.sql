-- Add/modify columns 
alter table DISPATCH_TASKETL_OPLOGS add server_ip VARCHAR2(100 CHAR);
alter table DISPATCH_TASKETL_OPLOGS add cost_time VARCHAR2(100 CHAR);
-- Add comments to the columns 
comment on column DISPATCH_TASKETL_OPLOGS.server_ip
  is '服务器IP,分布式部署时用来区分访问服务器节点';
comment on column DISPATCH_TASKETL_OPLOGS.cost_time
  is '服务调用花费时间';
  
alter table DISPATCH_TASKETL_OPLOGS modify LOG_LEVEL VARCHAR2(50 CHAR);