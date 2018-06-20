-----------------------------------------------------
-- Export file for user LEODATA                    --
-- Created by LAISHANFENG608 on 2018/6/14, 9:20:11 --
-----------------------------------------------------

spool leodata.log

prompt
prompt Creating table BASE_USER
prompt ========================
prompt
create table BASE_USER
(
  USER_ID     NUMBER not null,
  USER_NAME   VARCHAR2(50),
  PASSWORD    VARCHAR2(100),
  CREATE_DATE DATE
)
;
alter table BASE_USER
  add constraint PK_BASE_USER primary key (USER_ID);

prompt
prompt Creating table C_TEST_TB
prompt ========================
prompt
create table C_TEST_TB
(
  ID   INTEGER,
  TIME TIMESTAMP(6),
  NAME VARCHAR2(2000),
  NUM  NUMBER
)
;

prompt
prompt Creating table DISPATCH_RUNTIME_JOB
prompt ===================================
prompt
create table DISPATCH_RUNTIME_JOB
(
  JOB_ID        NUMBER(10),
  JOB_DEF_ID    VARCHAR2(20 CHAR),
  JOB_NAME      VARCHAR2(50 CHAR),
  PARENT_JOB_ID NUMBER(10),
  START_TIME    VARCHAR2(20 CHAR),
  END_TIME      VARCHAR2(20 CHAR),
  STATE         CHAR(1 CHAR)
)
;
comment on column DISPATCH_RUNTIME_JOB.JOB_ID
  is '???????id';
comment on column DISPATCH_RUNTIME_JOB.JOB_DEF_ID
  is '?????????id';
comment on column DISPATCH_RUNTIME_JOB.JOB_NAME
  is 'job????';
comment on column DISPATCH_RUNTIME_JOB.PARENT_JOB_ID
  is '???id????????0';
comment on column DISPATCH_RUNTIME_JOB.START_TIME
  is '??????';
comment on column DISPATCH_RUNTIME_JOB.END_TIME
  is '??????';
comment on column DISPATCH_RUNTIME_JOB.STATE
  is '????1:?????0:??????????  ,3:??  ?4:??';

prompt
prompt Creating table DISPATCH_RUNTIME_PARAS
prompt =====================================
prompt
create table DISPATCH_RUNTIME_PARAS
(
  ID        NUMBER(20),
  JOBID     NUMBER(10),
  FLOWNAME  VARCHAR2(20),
  PARAID    NUMBER(10),
  PARANAME  VARCHAR2(50),
  PARAVALUE VARCHAR2(200),
  PARATYPE  VARCHAR2(50)
)
;

prompt
prompt Creating table DISPATCH_RUNTIME_TASK
prompt ====================================
prompt
create table DISPATCH_RUNTIME_TASK
(
  TASK_ID     NUMBER(10),
  JOB_ID      NUMBER(10),
  TASK_DEF_ID VARCHAR2(20 CHAR),
  TASK_NAME   VARCHAR2(50 CHAR),
  START_TIME  VARCHAR2(20 CHAR),
  END_TIME    VARCHAR2(20 CHAR),
  STATE       CHAR(1 CHAR)
)
;
comment on column DISPATCH_RUNTIME_TASK.TASK_ID
  is '???????id';
comment on column DISPATCH_RUNTIME_TASK.JOB_ID
  is '??DISPATCH_RUNTIME_JOB????id';
comment on column DISPATCH_RUNTIME_TASK.TASK_DEF_ID
  is '?????????id';
comment on column DISPATCH_RUNTIME_TASK.TASK_NAME
  is '????';
comment on column DISPATCH_RUNTIME_TASK.START_TIME
  is '??????';
comment on column DISPATCH_RUNTIME_TASK.END_TIME
  is '??????';
comment on column DISPATCH_RUNTIME_TASK.STATE
  is '?????1: ????????2????? 3?????';

prompt
prompt Creating table DISPATCH_TASKETL_DATASOURCE
prompt ==========================================
prompt
create table DISPATCH_TASKETL_DATASOURCE
(
  DB_ID       NUMBER(10),
  DB_NAME     VARCHAR2(100 CHAR),
  DRIVER_NAME VARCHAR2(50 CHAR),
  DB_URL      VARCHAR2(200 CHAR),
  USER_NAME   VARCHAR2(20 CHAR),
  PASSWORD    VARCHAR2(50 CHAR)
)
;

prompt
prompt Creating table DISPATCH_TASKETL_FLOWGROUP
prompt =========================================
prompt
create table DISPATCH_TASKETL_FLOWGROUP
(
  ID              NUMBER(10),
  FLOW_GROUP_NAME VARCHAR2(150 CHAR),
  FLOW_GROUP_DESC VARCHAR2(200 CHAR),
  CREATE_BY       VARCHAR2(50 CHAR),
  CREATE_DATE     DATE default SYSDATE,
  UPDATED_BY      VARCHAR2(50 CHAR),
  UPDATED_DATE    DATE,
  PARENT_ID       NUMBER(10)
)
;

prompt
prompt Creating table DISPATCH_TASKETL_FLOWLOGS
prompt ========================================
prompt
create table DISPATCH_TASKETL_FLOWLOGS
(
  ID            NUMBER(10),
  FLOW_ID       VARCHAR2(100 CHAR),
  FLOW_TYPE     VARCHAR2(10 CHAR),
  START_TIME    VARCHAR2(100 CHAR),
  END_TIME      VARCHAR2(100 CHAR),
  FLOW_STATUS   VARCHAR2(100 CHAR),
  HIS_WORK_DATE VARCHAR2(50 CHAR),
  EXEC_RESULT   VARCHAR2(4000 CHAR),
  CREATE_BY     VARCHAR2(50 CHAR),
  CREATE_DATE   DATE default SYSDATE,
  UPDATED_BY    VARCHAR2(50 CHAR),
  UPDATED_DATE  DATE default SYSDATE
)
;

prompt
prompt Creating table DISPATCH_TASKETL_FLOWNAME
prompt ========================================
prompt
create table DISPATCH_TASKETL_FLOWNAME
(
  ID             VARCHAR2(200 CHAR),
  FLOW_NAME      VARCHAR2(100 CHAR),
  FLOW_CN_NAME   VARCHAR2(100 CHAR),
  START_TIME     VARCHAR2(100 CHAR) default SYSDATE,
  END_TIME       VARCHAR2(100 CHAR),
  FLOW_GROUPID   VARCHAR2(100 CHAR),
  FLOW_STATUS    VARCHAR2(100 CHAR),
  EXEC_RESULT    VARCHAR2(4000 CHAR),
  WORK_DATE      VARCHAR2(20 CHAR),
  CREATOR        VARCHAR2(30 CHAR),
  FLOW_DESC      VARCHAR2(2000 CHAR),
  CREATE_BY      VARCHAR2(50 CHAR),
  CREATE_DATE    DATE,
  UPDATED_BY     VARCHAR2(50 CHAR),
  UPDATED_DATE   DATE,
  FLOW_NOTE      VARCHAR2(500 CHAR),
  FLOW_BRANCH    CHAR(1 CHAR),
  FLOW_TYPE      VARCHAR2(11 CHAR),
  JOIN_NUM       NUMBER(10),
  PID            VARCHAR2(200 CHAR),
  TEMPID         VARCHAR2(200 CHAR),
  JOB_ID         NUMBER(10) default '0',
  NEXT_STARTTIME NUMBER(10),
  NEXT_STARTUNIT VARCHAR2(50 CHAR)
)
;

prompt
prompt Creating table DISPATCH_TASKETL_FLOWPARAS
prompt =========================================
prompt
create table DISPATCH_TASKETL_FLOWPARAS
(
  ID        NUMBER(10),
  FLOWID    VARCHAR2(255),
  PARANAME  VARCHAR2(255),
  PARAVALUE VARCHAR2(255),
  PARATYPE  VARCHAR2(64)
)
;

prompt
prompt Creating table DISPATCH_TASKETL_FWDEPENDENCY
prompt ============================================
prompt
create table DISPATCH_TASKETL_FWDEPENDENCY
(
  ID           NUMBER(10),
  FLOW_ID      VARCHAR2(100 CHAR),
  FLOW_PREV_ID VARCHAR2(100 CHAR),
  FLOW_TYPE    VARCHAR2(50 CHAR),
  ENABLED      CHAR(1 CHAR),
  CREATE_BY    VARCHAR2(50 CHAR),
  CREATE_DATE  VARCHAR2(50 CHAR),
  UPDATED_BY   VARCHAR2(50 CHAR),
  UPDATED_DATE VARCHAR2(50 CHAR)
)
;

prompt
prompt Creating table DISPATCH_TASKETL_OPLOGS
prompt ======================================
prompt
create table DISPATCH_TASKETL_OPLOGS
(
  ID          NUMBER(10),
  OPERATOR    VARCHAR2(50 CHAR),
  ADDRESS     VARCHAR2(100 CHAR),
  OPERATION   VARCHAR2(100 CHAR),
  DESCRIPTION VARCHAR2(200 CHAR),
  LOG_LEVEL   VARCHAR2(50 CHAR),
  CREATE_BY   VARCHAR2(10 CHAR),
  CREATE_TIME VARCHAR2(20 CHAR),
  SERVER_IP   VARCHAR2(100 CHAR),
  COST_TIME   VARCHAR2(100 CHAR)
)
;
comment on column DISPATCH_TASKETL_OPLOGS.SERVER_IP
  is '服务器IP,分布式部署时用来区分访问服务器节点';
comment on column DISPATCH_TASKETL_OPLOGS.COST_TIME
  is '服务调用花费时间';

prompt
prompt Creating table DISPATCH_TASKETL_PARAMETERS
prompt ==========================================
prompt
create table DISPATCH_TASKETL_PARAMETERS
(
  PARA_ID      NUMBER(10),
  PARA_NAME    VARCHAR2(100 CHAR),
  PARA_COMMENT VARCHAR2(100 CHAR),
  PARA_TYPE    VARCHAR2(32 CHAR),
  PARA_VALUE   VARCHAR2(512 CHAR),
  STATIC_PARA  VARCHAR2(32 CHAR),
  CREATE_BY    VARCHAR2(32 CHAR),
  CREATE_DATE  DATE,
  UPDATE_BY    VARCHAR2(32 CHAR),
  UPDATE_DATE  DATE
)
;

prompt
prompt Creating table DISPATCH_TASKETL_PARAMETERS_CU
prompt =============================================
prompt
create table DISPATCH_TASKETL_PARAMETERS_CU
(
  CUSTOM_PARA_ID    NUMBER(10),
  CUSTOM_PARA_TYPE  VARCHAR2(32 CHAR),
  CUSTOM_PARA_NAME  VARCHAR2(32 CHAR),
  CUSTOM_PARA_VALUE VARCHAR2(128 CHAR),
  DELETABLE         NUMBER(10)
)
;

prompt
prompt Creating table DISPATCH_TASKETL_REMOTE
prompt ======================================
prompt
create table DISPATCH_TASKETL_REMOTE
(
  ID               NUMBER(10),
  NAME             VARCHAR2(100 CHAR),
  REMOTE_IP        VARCHAR2(200 CHAR),
  REMOTE_TYPE      VARCHAR2(100 CHAR),
  REMOTE_USER_NAME VARCHAR2(100 CHAR),
  REMOTE_PASSWD    VARCHAR2(150 CHAR),
  REMOTE_PORT      NUMBER(10),
  REMOTE_NAMESPACE VARCHAR2(255 CHAR),
  REMOTE_DESC      VARCHAR2(200 CHAR),
  CREATE_BY        VARCHAR2(100 CHAR),
  CREATE_DATE      DATE,
  UPDATED_BY       VARCHAR2(100 CHAR),
  UPDATED_DATE     DATE
)
;

prompt
prompt Creating table DISPATCH_TASKETL_SIGNALHASH
prompt ==========================================
prompt
create table DISPATCH_TASKETL_SIGNALHASH
(
  ID        NUMBER(10),
  PID       NUMBER(10),
  JOBDEFID  VARCHAR2(255 CHAR),
  TASKDEFID VARCHAR2(255 CHAR),
  JOINS     NUMBER(10),
  SIGNALS   NUMBER(3)
)
;

prompt
prompt Creating table DISPATCH_TASKETL_TASKBELONG
prompt ==========================================
prompt
create table DISPATCH_TASKETL_TASKBELONG
(
  ID          NUMBER(10),
  BELONG_NAME VARCHAR2(200 CHAR),
  BELONG_DESC VARCHAR2(200 CHAR)
)
;

prompt
prompt Creating table DISPATCH_TASKETL_TASKLOGS
prompt ========================================
prompt
create table DISPATCH_TASKETL_TASKLOGS
(
  ID           NUMBER(10),
  TASK_ID      VARCHAR2(100 CHAR),
  START_TIME   VARCHAR2(100 CHAR),
  END_TIME     VARCHAR2(100 CHAR) default '0000-00-00 00:00:00',
  TASK_STATUS  VARCHAR2(100 CHAR),
  FLOW_LOG_ID  NUMBER(10),
  EXEC_RESULT  CLOB,
  CREATE_BY    VARCHAR2(50 CHAR),
  CREATE_DATE  DATE,
  UPDATED_BY   VARCHAR2(50 CHAR),
  UPDATED_DATE DATE,
  EXTRA_RESULT CLOB
)
;

prompt
prompt Creating table DISPATCH_TASKETL_TASKNAME
prompt ========================================
prompt
create table DISPATCH_TASKETL_TASKNAME
(
  ID             VARCHAR2(200 CHAR),
  PID            VARCHAR2(200 CHAR),
  TASK_NAME      VARCHAR2(100 CHAR),
  TASK_CN_NAME   VARCHAR2(100 CHAR),
  START_TIME     VARCHAR2(100),
  END_TIME       VARCHAR2(100 CHAR),
  TASK_BELONG    NUMBER(10),
  TASK_STATUS    VARCHAR2(100 CHAR),
  TASK_ADDRESS   VARCHAR2(2000 CHAR),
  TASK_PARAMETER VARCHAR2(2000 CHAR),
  TASK_REMOTE    VARCHAR2(100 CHAR),
  TASK_ERROR     CHAR(1 CHAR),
  TASK_ACTIVE    CHAR(1 CHAR),
  TASK_CUSTOM    VARCHAR2(300 CHAR),
  ERROR_NUM      NUMBER(10),
  TASK_DESC      VARCHAR2(2000 CHAR),
  CREATE_BY      VARCHAR2(50 CHAR),
  CREATE_DATE    DATE,
  UPDATED_BY     VARCHAR2(50 CHAR),
  UPDATED_DATE   DATE,
  JOIN_NUM       NUMBER(10),
  TASK_BRANCH    CHAR(1 CHAR),
  TASK_LOOP      NUMBER(10),
  TEMPID         VARCHAR2(200 CHAR),
  EXEC_RESULT    CLOB
)
;

prompt
prompt Creating table DISPATCH_TASKETL_TASKPARAS
prompt =========================================
prompt
create table DISPATCH_TASKETL_TASKPARAS
(
  ID        NUMBER(10),
  TASKNAME  VARCHAR2(255 CHAR),
  FLOWNAME  VARCHAR2(255 CHAR),
  INPARAIDS VARCHAR2(2000),
  OUTPARA   VARCHAR2(20),
  SETTING   VARCHAR2(255 CHAR)
)
;

prompt
prompt Creating table DISPATCH_TASKETL_TEMPLATE
prompt ========================================
prompt
create table DISPATCH_TASKETL_TEMPLATE
(
  ID                 VARCHAR2(200 CHAR),
  TEMPLATE_NAME      VARCHAR2(100 CHAR),
  TEMPLATE_DESC      VARCHAR2(2000 CHAR),
  TEMPLATE_REMOTE    VARCHAR2(100 CHAR),
  TEMPLATE_COMMAND   VARCHAR2(2000 CHAR),
  TEMPLATE_PARAMETER VARCHAR2(2000 CHAR),
  ERROR_NUM          NUMBER(10),
  TEMPLATE_ERROR     CHAR(1 CHAR),
  TEMPLATE_ACTIVE    CHAR(1 CHAR),
  TEMPLATE_CUSTOM    VARCHAR2(300 CHAR),
  TEMPLATE_BRANCH    CHAR(1 CHAR),
  TEMPLATE_LOOP      NUMBER(10),
  PARAMS_VAL         VARCHAR2(2000 CHAR)
)
;

prompt
prompt Creating table DISPATCH_TASKETL_TSDEPENDENCY
prompt ============================================
prompt
create table DISPATCH_TASKETL_TSDEPENDENCY
(
  ID           NUMBER(10),
  FLOW_ID      VARCHAR2(100 CHAR),
  TASK_ID      VARCHAR2(100 CHAR),
  TASK_PREV_ID VARCHAR2(300 CHAR),
  TASK_TYPE    VARCHAR2(50 CHAR),
  ENABLED      CHAR(1 CHAR),
  CREATE_BY    VARCHAR2(50 CHAR),
  CREATE_DATE  DATE default SYSDATE,
  UPDATED_BY   VARCHAR2(50 CHAR),
  UPDATED_DATE DATE
)
;

prompt
prompt Creating table DISPATCH_TASKETL_XML
prompt ===================================
prompt
create table DISPATCH_TASKETL_XML
(
  ID           NUMBER(10),
  FLOW_ID      VARCHAR2(100 CHAR),
  XML          CLOB,
  LOAD_DATA    CLOB,
  CREATE_BY    VARCHAR2(50 CHAR),
  CREATE_DATE  DATE default SYSDATE,
  UPDATED_BY   VARCHAR2(50 CHAR),
  UPDATED_DATE DATE
)
;

prompt
prompt Creating table LEO_BAS_CRNCY
prompt ============================
prompt
create table LEO_BAS_CRNCY
(
  CRNCY_NM       VARCHAR2(50),
  CHAR_CRNCY_CD  VARCHAR2(10),
  FRGN_CRNCY_IND INTEGER,
  PRCNG_TYP_CD   INTEGER,
  PRCNG_UNIT     INTEGER,
  NMRC_CRNCY_CD  VARCHAR2(20)
)
;
comment on table LEO_BAS_CRNCY
  is '币种表';
comment on column LEO_BAS_CRNCY.CRNCY_NM
  is '币种名称';
comment on column LEO_BAS_CRNCY.CHAR_CRNCY_CD
  is '币种英文代码';
comment on column LEO_BAS_CRNCY.FRGN_CRNCY_IND
  is '本外币标志
1:本币
2:外币';
comment on column LEO_BAS_CRNCY.PRCNG_TYP_CD
  is '标价方式
1:直接标价
2:间接标价';
comment on column LEO_BAS_CRNCY.PRCNG_UNIT
  is '标价单位
默认：100';

prompt
prompt Creating table LEO_BAS_FRGN_EXCH_RT
prompt ===================================
prompt
create table LEO_BAS_FRGN_EXCH_RT
(
  CRNCY_CD         VARCHAR2(10),
  FRGN_EXCH_RT_VAL NUMBER(20,4),
  DAT_DT           DATE
)
;
comment on table LEO_BAS_FRGN_EXCH_RT
  is '汇率表';
comment on column LEO_BAS_FRGN_EXCH_RT.CRNCY_CD
  is '币种';
comment on column LEO_BAS_FRGN_EXCH_RT.FRGN_EXCH_RT_VAL
  is '汇率';
comment on column LEO_BAS_FRGN_EXCH_RT.DAT_DT
  is '数据日期';

prompt
prompt Creating table LEO_BAS_GL_ACCT
prompt ==============================
prompt
create table LEO_BAS_GL_ACCT
(
  GL_ACCT_NM        VARCHAR2(150),
  GL_ACCT_NUM       VARCHAR2(20),
  PARNT_GL_ACCT_KEY VARCHAR2(20),
  GL_ACCT_TYP_CD    VARCHAR2(5),
  BAL_FLG           VARCHAR2(5)
)
;
comment on table LEO_BAS_GL_ACCT
  is '科目表';
comment on column LEO_BAS_GL_ACCT.GL_ACCT_NM
  is '科目名称';
comment on column LEO_BAS_GL_ACCT.GL_ACCT_NUM
  is '科目代码';
comment on column LEO_BAS_GL_ACCT.GL_ACCT_TYP_CD
  is '资产负债类型
A-资产类
L-负债类
F-资产负债共通类
E-所有者权益类
R-损益类
O-表外业务类';
comment on column LEO_BAS_GL_ACCT.BAL_FLG
  is '余额方向
1-借
2-贷';

prompt
prompt Creating table LEO_BAS_ORG
prompt ==========================
prompt
create table LEO_BAS_ORG
(
  ORG_CD   VARCHAR2(50),
  ORG_NM   VARCHAR2(50),
  PARNT_CD VARCHAR2(50),
  DAT_DT   DATE
)
;
comment on table LEO_BAS_ORG
  is '机构表';
comment on column LEO_BAS_ORG.ORG_CD
  is '机构编码';
comment on column LEO_BAS_ORG.ORG_NM
  is '机构名称';
comment on column LEO_BAS_ORG.PARNT_CD
  is '上级机构编码';
comment on column LEO_BAS_ORG.DAT_DT
  is '数据日期';

prompt
prompt Creating table LEO_DAT_BND
prompt ==========================
prompt
create table LEO_DAT_BND
(
  BNK_NUM      VARCHAR2(50),
  SUBJT_NUM    VARCHAR2(50),
  ACCT_NUM     VARCHAR2(100),
  CUST_NM      VARCHAR2(200),
  CUST_NUM     VARCHAR2(100),
  CRNCY_CD     VARCHAR2(50),
  PAR_VAL      NUMBER(20,4),
  ENDING_BAL   NUMBER(20,4),
  BAS_RT       NUMBER(10,8),
  RT_SPREED    NUMBER(18,6),
  SPREED_TYP   CHAR(1),
  RT_MK        CHAR(1),
  RPRC_FREQ    VARCHAR2(20),
  ORIG_DT      DATE,
  MTRTY_DT     DATE,
  ACTL_RT      NUMBER(10,8),
  ACCRUE_BASIS VARCHAR2(100),
  ACCRUE_FREQ  VARCHAR2(100),
  CRDT_FREQ    VARCHAR2(100),
  BND_TYP      CHAR(1),
  DIVIDE_TYP   VARCHAR2(100),
  ACCT_TYP     CHAR(1),
  DAT_DT       DATE
)
;
comment on table LEO_DAT_BND
  is '发行债券
本行发行的次级债、混合资本债和金融债';
comment on column LEO_DAT_BND.BNK_NUM
  is '机构码，对应机构表SYS_ORG的ID';
comment on column LEO_DAT_BND.SUBJT_NUM
  is '科目号，对应科目表BAS_GL_ACCT的ID';
comment on column LEO_DAT_BND.ACCT_NUM
  is '账号';
comment on column LEO_DAT_BND.CUST_NM
  is '债券名称或代码';
comment on column LEO_DAT_BND.CUST_NUM
  is '客户名称 ';
comment on column LEO_DAT_BND.CRNCY_CD
  is '币种，对应币种表BAS_CRNCY的ID';
comment on column LEO_DAT_BND.PAR_VAL
  is '票面金额';
comment on column LEO_DAT_BND.ENDING_BAL
  is '期末余额';
comment on column LEO_DAT_BND.BAS_RT
  is '基准利率';
comment on column LEO_DAT_BND.RT_SPREED
  is '名义利率点差';
comment on column LEO_DAT_BND.SPREED_TYP
  is '点差类型
A-加减点差
B-浮动利率点差';
comment on column LEO_DAT_BND.RT_MK
  is '利率标志
F-固定利率
A-可调整利率，根据重定价周期进行重定价
V-浮动利率，可随时重定价，为了拆现金流方便，按照重定价周期按月';
comment on column LEO_DAT_BND.RPRC_FREQ
  is '重定价周期
B1M21D-按月
B3M21D-按季
B6M21D-按半年
B1M-每月对日
B3M-每季对日
B6M-每半年对日
B12M-每年对日
G1M1D-每年1月1日';
comment on column LEO_DAT_BND.ORIG_DT
  is '起息日';
comment on column LEO_DAT_BND.MTRTY_DT
  is '到期日';
comment on column LEO_DAT_BND.ACTL_RT
  is '实际利率';
comment on column LEO_DAT_BND.ACCRUE_BASIS
  is '计结息规则
ACTUAL/ACTUAL
ACTUAL/360
ACTUAL/365
M/12
30/360';
comment on column LEO_DAT_BND.ACCRUE_FREQ
  is '计结息频率
QE-每季末
M20-每月20日
M-每月对日
Q-每季对日
Y-每年对日
T-到期
ME-每月末
Q20-每季20日
S-每半年对日';
comment on column LEO_DAT_BND.CRDT_FREQ
  is '收付息频率
QE-每季末
M20-每月20日
M-每月对日
Q-每季对日
Y-每年对日
T-到期
ME-每月末
Q20-每季20日
S-每半年对日';
comment on column LEO_DAT_BND.BND_TYP
  is '债券类别
A-金融债
B-次级债券
C-混合资本债券';
comment on column LEO_DAT_BND.DIVIDE_TYP
  is '账户划分类型 1-交易账户 2-可供出售类 3-持有至到期类 4-贷款及应收款类 ';
comment on column LEO_DAT_BND.ACCT_TYP
  is '总账类型
A-资产类
L-负债类
E-所有者权益类
I-收入类
P-支出类
O-表外业务类';
comment on column LEO_DAT_BND.DAT_DT
  is '数据日期';

prompt
prompt Creating table LEO_DAT_CA
prompt =========================
prompt
create table LEO_DAT_CA
(
  BNK_NUM    VARCHAR2(50),
  SUBJT_NUM  VARCHAR2(50),
  ACCT_NUM   VARCHAR2(100),
  CUST_NM    VARCHAR2(200),
  CUST_NUM   VARCHAR2(100),
  CRNCY_CD   VARCHAR2(50),
  ENDING_BAL NUMBER(20,4),
  ENGAGE_DT  DATE,
  DFLT_RT    NUMBER(10,8),
  ACCT_TYP   CHAR(1),
  DAT_DT     DATE,
  OVRDUE_FLG VARCHAR2(5)
)
;
comment on table LEO_DAT_CA
  is '信用透支
信用卡和协议透支';
comment on column LEO_DAT_CA.BNK_NUM
  is '机构码，对应机构表SYS_ORG的ID';
comment on column LEO_DAT_CA.SUBJT_NUM
  is '科目号，对应科目表BAS_GL_ACCT的ID';
comment on column LEO_DAT_CA.ACCT_NUM
  is '账号';
comment on column LEO_DAT_CA.CUST_NM
  is '客户名称';
comment on column LEO_DAT_CA.CUST_NUM
  is '身份代码';
comment on column LEO_DAT_CA.CRNCY_CD
  is '币种，对应币种表BAS_CRNCY的ID';
comment on column LEO_DAT_CA.ENDING_BAL
  is '期末余额';
comment on column LEO_DAT_CA.ENGAGE_DT
  is '还款日
等于账单日+免息期';
comment on column LEO_DAT_CA.DFLT_RT
  is '罚息利率';
comment on column LEO_DAT_CA.ACCT_TYP
  is '总账类型
A-资产类（默认）
L-负债类
E-所有者权益类
I-收入类
P-支出类
O-表外业务类';
comment on column LEO_DAT_CA.DAT_DT
  is '数据日期';
comment on column LEO_DAT_CA.OVRDUE_FLG
  is '逾期标志 , "Y-是 N-否"';

prompt
prompt Creating table LEO_DAT_CI
prompt =========================
prompt
create table LEO_DAT_CI
(
  BNK_NUM    VARCHAR2(50),
  SUBJT_NUM  VARCHAR2(50),
  ACCT_NUM   VARCHAR2(100),
  CUST_NM    VARCHAR2(200),
  CUST_NUM   VARCHAR2(100),
  CRNCY_CD   VARCHAR2(50),
  ENDING_BAL NUMBER(20,4),
  EFCT_DT    DATE,
  MTRTY_DT   DATE,
  PCT        NUMBER(18,6),
  ACCT_TYP   CHAR(1),
  DAT_DT     DATE
)
;
comment on table LEO_DAT_CI
  is '表外数据
银行承兑汇票、信用证、保函、承诺等或有资产和或有负债项目';
comment on column LEO_DAT_CI.BNK_NUM
  is '机构码，对应机构表SYS_ORG的ID';
comment on column LEO_DAT_CI.SUBJT_NUM
  is '科目号，对应科目表BAS_GL_ACCT的ID';
comment on column LEO_DAT_CI.ACCT_NUM
  is '账号';
comment on column LEO_DAT_CI.CUST_NM
  is '客户名称';
comment on column LEO_DAT_CI.CUST_NUM
  is '身份代码';
comment on column LEO_DAT_CI.CRNCY_CD
  is '币种，对应币种表BAS_CRNCY的ID';
comment on column LEO_DAT_CI.ENDING_BAL
  is '期末余额';
comment on column LEO_DAT_CI.EFCT_DT
  is '合约生效日';
comment on column LEO_DAT_CI.MTRTY_DT
  is '到期日';
comment on column LEO_DAT_CI.PCT
  is '预计发生垫款概率
作为系统参数与业务约定';
comment on column LEO_DAT_CI.ACCT_TYP
  is '总账类型
A-资产类
L-负债类
E-所有者权益类
I-收入类
P-支出类
O-表外业务类（默认）';
comment on column LEO_DAT_CI.DAT_DT
  is '数据日期';

prompt
prompt Creating table LEO_DAT_CSH
prompt ==========================
prompt
create table LEO_DAT_CSH
(
  BNK_NUM    VARCHAR2(50),
  SUBJT_NUM  VARCHAR2(50),
  ACCT_NUM   VARCHAR2(100),
  CRNCY_CD   VARCHAR2(50),
  ENDING_BAL NUMBER(20,4),
  ACCT_TYP   CHAR(1),
  DAT_DT     DATE
)
;
comment on table LEO_DAT_CSH
  is '现金资产表
现金和贵金属';
comment on column LEO_DAT_CSH.BNK_NUM
  is '机构码，对应机构表SYS_ORG的ID';
comment on column LEO_DAT_CSH.SUBJT_NUM
  is '科目号，对应科目表BAS_GL_ACCT的ID';
comment on column LEO_DAT_CSH.ACCT_NUM
  is '账号';
comment on column LEO_DAT_CSH.CRNCY_CD
  is '币种，对应币种表BAS_CRNCY的ID';
comment on column LEO_DAT_CSH.ENDING_BAL
  is '期末余额';
comment on column LEO_DAT_CSH.ACCT_TYP
  is '总账类型
A-资产类（默认）
L-负债类
E-所有者权益类
I-收入类
P-支出类
O-表外业务类';
comment on column LEO_DAT_CSH.DAT_DT
  is '数据日期';

prompt
prompt Creating table LEO_DAT_DCF
prompt ==========================
prompt
create table LEO_DAT_DCF
(
  BNK_NUM      VARCHAR2(50),
  SUBJT_NUM    VARCHAR2(50),
  ACCT_NUM     VARCHAR2(100),
  CUST_NM      VARCHAR2(200),
  CUST_NUM     VARCHAR2(100),
  CRNCY_CD     VARCHAR2(50),
  ENDING_BAL   NUMBER(20,4),
  ACTL_RT      NUMBER(10,8),
  ACCRUE_BASIS VARCHAR2(100),
  ACCRUE_FREQ  VARCHAR2(100),
  CRDT_FREQ    VARCHAR2(100),
  RL           VARCHAR2(100),
  ACCT_TYP     CHAR(1),
  DAT_DT       DATE
)
;
comment on table LEO_DAT_DCF
  is '同业往来活期
存放同业活期、同业存放活期、存放央行款项和联行往来资金';
comment on column LEO_DAT_DCF.BNK_NUM
  is '机构码，对应机构表SYS_ORG的ID';
comment on column LEO_DAT_DCF.SUBJT_NUM
  is '科目号，对应科目表BAS_GL_ACCT的ID';
comment on column LEO_DAT_DCF.ACCT_NUM
  is '账号';
comment on column LEO_DAT_DCF.CUST_NM
  is '客户名称';
comment on column LEO_DAT_DCF.CUST_NUM
  is '身份代码';
comment on column LEO_DAT_DCF.CRNCY_CD
  is '币种，对应币种表BAS_CRNCY的ID';
comment on column LEO_DAT_DCF.ENDING_BAL
  is '期末余额';
comment on column LEO_DAT_DCF.ACTL_RT
  is '利率';
comment on column LEO_DAT_DCF.ACCRUE_BASIS
  is '计结息规则
ACTUAL/ACTUAL
ACTUAL/360
ACTUAL/365
M/12
30/360';
comment on column LEO_DAT_DCF.ACCRUE_FREQ
  is '计结息频率
QE-每季末
M20-每月20日
M-每月对日
Q-每季对日
Y-每年对日
T-到期
ME-每月末
Q20-每季20日
S-每半年对日';
comment on column LEO_DAT_DCF.CRDT_FREQ
  is '收付息频率
QE-每季末
M20-每月20日
M-每月对日
Q-每季对日
Y-每年对日
T-到期
ME-每月末
Q20-每季20日
S-每半年对日';
comment on column LEO_DAT_DCF.RL
  is '业务关系
A-托管目的
B-清算目的
C-现金管理目的
D-网络合作
E-无业务关系';
comment on column LEO_DAT_DCF.ACCT_TYP
  is '总账类型
A-资产类
L-负债类
E-所有者权益类
I-收入类
P-支出类
O-表外业务类';
comment on column LEO_DAT_DCF.DAT_DT
  is '数据日期';

prompt
prompt Creating table LEO_DAT_DD
prompt =========================
prompt
create table LEO_DAT_DD
(
  BNK_NUM       VARCHAR2(50),
  SUBJT_NUM     VARCHAR2(50),
  ACCT_NUM      VARCHAR2(100),
  CUST_NM       VARCHAR2(200),
  CUST_NUM      VARCHAR2(100),
  CRNCY_CD      VARCHAR2(50),
  ENDING_BAL    NUMBER(20,4),
  ACTL_RT       NUMBER(10,8),
  ACCRUE_BASIS  VARCHAR2(100),
  ACCRUE_FREQ   VARCHAR2(100),
  CRDT_FREQ     VARCHAR2(100),
  PMT_ARNG      VARCHAR2(100),
  TRDE_CLSFC    VARCHAR2(100),
  ENTERPRIS_FLG CHAR(1),
  ACCT_TYP      CHAR(1),
  CURR_DEP_TYP  INTEGER,
  DAT_DT        DATE
)
;
comment on table LEO_DAT_DD
  is '活期存款
通知存款、定活两便存款、协定存款和所有活期存款';
comment on column LEO_DAT_DD.BNK_NUM
  is '机构码，对应机构表SYS_ORG的ID';
comment on column LEO_DAT_DD.SUBJT_NUM
  is '科目号，对应科目表BAS_GL_ACCT的ID';
comment on column LEO_DAT_DD.ACCT_NUM
  is '账号';
comment on column LEO_DAT_DD.CUST_NM
  is '客户名称';
comment on column LEO_DAT_DD.CUST_NUM
  is '身份代码';
comment on column LEO_DAT_DD.CRNCY_CD
  is '币种，对应币种表BAS_CRNCY的ID';
comment on column LEO_DAT_DD.ENDING_BAL
  is '期末余额';
comment on column LEO_DAT_DD.ACTL_RT
  is '实际利率';
comment on column LEO_DAT_DD.ACCRUE_BASIS
  is '计结息规则
ACTUAL/ACTUAL
ACTUAL/360
ACTUAL/365
M/12
30/360';
comment on column LEO_DAT_DD.ACCRUE_FREQ
  is '计结息频率
QE-每季末
M20-每月20日
M-每月对日
Q-每季对日
Y-每年对日
T-到期
ME-每月末
Q20-每季20日
S-每半年对日';
comment on column LEO_DAT_DD.CRDT_FREQ
  is '收付息频率
QE-每季末
M20-每月20日
M-每月对日
Q-每季对日
Y-每年对日
T-到期
ME-每月末
Q20-每季20日
S-每半年对日';
comment on column LEO_DAT_DD.PMT_ARNG
  is '本金偿付约定
A-无约定
B-1天通知
C-7天通知';
comment on column LEO_DAT_DD.TRDE_CLSFC
  is '行业分类
A-农、林、牧、渔业
B-采矿业
C-制造业
D-电力、热力、燃气及水生产和供应业
E-建筑业，F批发和零售业
G-交通运输、仓储和邮政业
H-住宿和餐饮业
I-信息传输、软件和信息技术服务业
J-金融业
K-房地产业
L-租赁和商务服务业
M-科学研究和技术服务业
N-水利、环境和公共设施管理业
O-民服务、修理和其他服务业
P-教育
Q-卫生和社会工作
R-文化、体育和娱乐业
S-公共管理、社会保障和社会组织
T-国际组织
U-个人
V-买断式转贴现
W-境外';
comment on column LEO_DAT_DD.ENTERPRIS_FLG
  is '中小企业标志
Y-是
N-否';
comment on column LEO_DAT_DD.ACCT_TYP
  is '总账类型
A-资产类
L-负债类（默认）
E-所有者权益类
I-收入类
P-支出类
O-表外业务类';
comment on column LEO_DAT_DD.CURR_DEP_TYP
  is '活期类型
1-个人
2-对公';
comment on column LEO_DAT_DD.DAT_DT
  is '数据日期';

prompt
prompt Creating table LEO_DAT_FP
prompt =========================
prompt
create table LEO_DAT_FP
(
  BNK_NUM       VARCHAR2(50),
  SUBJT_NUM     VARCHAR2(50),
  ACCT_NUM      VARCHAR2(100),
  CUST_NM       VARCHAR2(200),
  CUST_NUM      VARCHAR2(100),
  CRNCY_CD      VARCHAR2(50),
  ENDING_BAL    NUMBER(20,4),
  PREINSTALL_RT NUMBER(10,8),
  ACCRUE_BASIS  VARCHAR2(100),
  ACCRUE_FREQ   VARCHAR2(100),
  CRDT_FREQ     VARCHAR2(100),
  ORIG_DT       DATE,
  MTRTY_DT      DATE,
  FNC_TYP       INTEGER,
  ACCT_TYP      CHAR(1),
  DAT_DT        DATE
)
;
comment on table LEO_DAT_FP
  is '理财及结构性产品';
comment on column LEO_DAT_FP.BNK_NUM
  is '机构码，对应机构表SYS_ORG的ID';
comment on column LEO_DAT_FP.SUBJT_NUM
  is '科目号，对应科目表BAS_GL_ACCT的ID';
comment on column LEO_DAT_FP.ACCT_NUM
  is '账号';
comment on column LEO_DAT_FP.CUST_NM
  is '客户名称';
comment on column LEO_DAT_FP.CUST_NUM
  is '身份代码';
comment on column LEO_DAT_FP.CRNCY_CD
  is '币种，对应币种表BAS_CRNCY的ID';
comment on column LEO_DAT_FP.ENDING_BAL
  is '期末余额';
comment on column LEO_DAT_FP.PREINSTALL_RT
  is '预期收益率';
comment on column LEO_DAT_FP.ACCRUE_BASIS
  is '计结息规则
ACTUAL/ACTUAL
ACTUAL/360
ACTUAL/365
M/12
30/360';
comment on column LEO_DAT_FP.ACCRUE_FREQ
  is '计结息频率
QE-每季末
M20-每月20日
M-每月对日
Q-每季对日
Y-每年对日
T-到期
ME-每月末
Q20-每季20日
S-每半年对日';
comment on column LEO_DAT_FP.CRDT_FREQ
  is '收付息频率
QE-每季末
M20-每月20日
M-每月对日
Q-每季对日
Y-每年对日
T-到期
ME-每月末
Q20-每季20日
S-每半年对日';
comment on column LEO_DAT_FP.ORIG_DT
  is '起息日';
comment on column LEO_DAT_FP.MTRTY_DT
  is '到期日';
comment on column LEO_DAT_FP.FNC_TYP
  is '理财产品类型
1-封闭式
2-开放式
';
comment on column LEO_DAT_FP.ACCT_TYP
  is '总账类型
A-资产类
L-负债类
E-所有者权益类
I-收入类
P-支出类
O-表外业务类
待客理财算资产
发行理财算负值';
comment on column LEO_DAT_FP.DAT_DT
  is '数据日期';

prompt
prompt Creating table LEO_DAT_GL
prompt =========================
prompt
create table LEO_DAT_GL
(
  BNK_NUM    VARCHAR2(50),
  SUBJT_NUM  VARCHAR2(50),
  CRNCY_CD   VARCHAR2(50),
  ENDING_BAL NUMBER(20,4),
  SUM_BAL    NUMBER(20,4),
  ACCT_TYP   CHAR(1),
  DAT_DT     DATE
)
;
comment on table LEO_DAT_GL
  is '总账数据表
主要用于总分校验和核对，包括资产负债表内外按会计科目汇总的所有数据';
comment on column LEO_DAT_GL.BNK_NUM
  is '机构码，对应机构表SYS_ORG的ID';
comment on column LEO_DAT_GL.SUBJT_NUM
  is '科目号，对应科目表BAS_GL_ACCT的ID';
comment on column LEO_DAT_GL.CRNCY_CD
  is '币种，对应币种表BAS_CRNCY的ID';
comment on column LEO_DAT_GL.ENDING_BAL
  is '期末余额';
comment on column LEO_DAT_GL.SUM_BAL
  is '从分账汇总的余额';
comment on column LEO_DAT_GL.ACCT_TYP
  is '总账类型
A-资产类
L-负债类
E-所有者权益类
I-收入类
P-支出类
O-表外业务类';
comment on column LEO_DAT_GL.DAT_DT
  is '数据日期';

prompt
prompt Creating table LEO_DAT_INV
prompt ==========================
prompt
create table LEO_DAT_INV
(
  BNK_NUM      VARCHAR2(50),
  SUBJT_NUM    VARCHAR2(50),
  ACCT_NUM     VARCHAR2(100),
  CUST_NM      VARCHAR2(200),
  CUST_NUM     VARCHAR2(100),
  CRNCY_CD     VARCHAR2(50),
  ENDING_BAL   NUMBER(20,4),
  PAR_VAL      NUMBER(20,4),
  BAS_RT       NUMBER(10,8),
  RT_SPREED    NUMBER(18,6),
  SPREED_TYP   CHAR(1),
  RT_MK        CHAR(1),
  ACTL_RT      NUMBER(10,8),
  RPRC_FREQ    VARCHAR2(20),
  ORIG_DT      DATE,
  MTRTY_DT     DATE,
  ACCRUE_BASIS VARCHAR2(100),
  ACCRUE_FREQ  VARCHAR2(100),
  CRDT_FREQ    VARCHAR2(100),
  BND_TYP      CHAR(1),
  DIVIDE_TYP   VARCHAR2(100),
  ACCT_TYP     CHAR(1),
  DAT_DT       DATE
)
;
comment on table LEO_DAT_INV
  is '债券投资
本行持有的所有债券投资';
comment on column LEO_DAT_INV.BNK_NUM
  is '机构码，对应机构表SYS_ORG的ID';
comment on column LEO_DAT_INV.SUBJT_NUM
  is '科目号，对应科目表BAS_GL_ACCT的ID';
comment on column LEO_DAT_INV.ACCT_NUM
  is '账号';
comment on column LEO_DAT_INV.CUST_NM
  is '客户名称';
comment on column LEO_DAT_INV.CUST_NUM
  is '身份代码';
comment on column LEO_DAT_INV.CRNCY_CD
  is '币种，对应币种表BAS_CRNCY的ID';
comment on column LEO_DAT_INV.ENDING_BAL
  is '期末余额';
comment on column LEO_DAT_INV.PAR_VAL
  is '票面金额';
comment on column LEO_DAT_INV.BAS_RT
  is '基准利率';
comment on column LEO_DAT_INV.RT_SPREED
  is '名义利率点差';
comment on column LEO_DAT_INV.SPREED_TYP
  is '点差类型
A-加减点差
B-浮动利率点差';
comment on column LEO_DAT_INV.RT_MK
  is '利率标志
F-固定利率
A-可调整利率，根据重定价周期进行重定价
V-浮动利率，可随时重定价，为了拆现金流方便，按照重定价周期按月';
comment on column LEO_DAT_INV.ACTL_RT
  is '实际利率';
comment on column LEO_DAT_INV.RPRC_FREQ
  is '重定价周期
B1M21D-按月
B3M21D-按季
B6M21D-按半年
B1M-每月对日
B3M-每季对日
B6M-每半年对日
B12M-每年对日
G1M1D-每年1月1日';
comment on column LEO_DAT_INV.ORIG_DT
  is '起息日';
comment on column LEO_DAT_INV.MTRTY_DT
  is '到期日';
comment on column LEO_DAT_INV.ACCRUE_BASIS
  is '计结息规则
ACTUAL/ACTUAL
ACTUAL/360
ACTUAL/365
M/12
30/360';
comment on column LEO_DAT_INV.ACCRUE_FREQ
  is '计结息频率
QE-每季末
M20-每月20日
M-每月对日
Q-每季对日
Y-每年对日
T-到期
ME-每月末
Q20-每季20日
S-每半年对日';
comment on column LEO_DAT_INV.CRDT_FREQ
  is '收付息频率
QE-每季末
M20-每月20日
M-每月对日
Q-每季对日
Y-每年对日
T-到期
ME-每月末
Q20-每季20日
S-每半年对日';
comment on column LEO_DAT_INV.BND_TYP
  is '债券类别
A-国债
B-央票
C-政策性金融债
D-商业银行金融债
E-企业债
F-次级债券
G-混合资本债券
I-其他工具';
comment on column LEO_DAT_INV.DIVIDE_TYP
  is '账户划分类型
1-交易账户
2-可供出售类
3-持有至到期类
4-贷款及应收款类';
comment on column LEO_DAT_INV.ACCT_TYP
  is '总账类型
A-资产类（默认）
L-负债类
E-所有者权益类
I-收入类
P-支出类
O-表外业务类';
comment on column LEO_DAT_INV.DAT_DT
  is '数据日期';

prompt
prompt Creating table LEO_DAT_LN
prompt =========================
prompt
create table LEO_DAT_LN
(
  BNK_NUM         VARCHAR2(50),
  SUBJT_NUM       VARCHAR2(50),
  ACCT_NUM        VARCHAR2(100),
  CUST_NM         VARCHAR2(200),
  CUST_NUM        VARCHAR2(100),
  CRNCY_CD        VARCHAR2(50),
  ENDING_BAL      NUMBER(20,4),
  BAS_RT          NUMBER(10,6),
  RT_SPREED       NUMBER(18,6),
  SPREED_TYP      CHAR(1),
  RPRC_FREQ       VARCHAR2(20),
  ORIG_DT         DATE,
  MTRTY_DT        DATE,
  PMT_TYP         CHAR(1),
  ACCR_FLG        CHAR(1),
  ACTL_RT         NUMBER(10,8),
  RT_MK           CHAR(1),
  ACCRUE_BASIS    VARCHAR2(100),
  ACCRUE_FREQ     VARCHAR2(100),
  CRDT_FREQ       VARCHAR2(100),
  PMT_FREQ        VARCHAR2(100),
  OVRDUE_FLG      CHAR(1),
  DFLT_RT         NUMBER(10,8),
  TRDE_CLSFC      VARCHAR2(100),
  ENTERPRIS_FLG   VARCHAR2(10),
  REFER_PEASANT   VARCHAR2(10),
  ACCT_TYP        CHAR(1),
  LN_TYP          INTEGER,
  DAT_DT          DATE,
  ZERORATEFLAG    VARCHAR2(5),
  REMAININGYIELDS NUMBER(20,4)
)
;
comment on table LEO_DAT_LN
  is '贷款
直贴、贷款';
comment on column LEO_DAT_LN.BNK_NUM
  is '机构码，对应机构表SYS_ORG的ID';
comment on column LEO_DAT_LN.SUBJT_NUM
  is '科目号，对应科目表BAS_GL_ACCT的ID';
comment on column LEO_DAT_LN.ACCT_NUM
  is '账号';
comment on column LEO_DAT_LN.CUST_NM
  is '账户名称';
comment on column LEO_DAT_LN.CUST_NUM
  is '身份代码';
comment on column LEO_DAT_LN.CRNCY_CD
  is '币种，对应币种表BAS_CRNCY的ID';
comment on column LEO_DAT_LN.ENDING_BAL
  is '期末余额';
comment on column LEO_DAT_LN.BAS_RT
  is '基准利率';
comment on column LEO_DAT_LN.RT_SPREED
  is '名义利率点差';
comment on column LEO_DAT_LN.SPREED_TYP
  is '点差类型
A-加减点差
B-浮动利率点差';
comment on column LEO_DAT_LN.RPRC_FREQ
  is '重定价周期
B1M21D-按月
B3M21D-按季
B6M21D-按半年
B1M-每月对日
B3M-每季对日
B6M-每半年对日
B12M-每年对日
G1M1D-每年1月1日';
comment on column LEO_DAT_LN.ORIG_DT
  is '起息日';
comment on column LEO_DAT_LN.MTRTY_DT
  is '到期日';
comment on column LEO_DAT_LN.PMT_TYP
  is '本金偿付类型
P-等额还款
A-等本还款
T-到期还本
S-分期还款';
comment on column LEO_DAT_LN.ACCR_FLG
  is '应计息标志
Y-是
N-否';
comment on column LEO_DAT_LN.ACTL_RT
  is '实际利率';
comment on column LEO_DAT_LN.RT_MK
  is '利率标志
F-固定利率
A-可调整利率，根据重定价周期进行重定价
V-浮动利率，可随时重定价，为了拆现金流方便，按照重定价周期按月';
comment on column LEO_DAT_LN.ACCRUE_BASIS
  is '计结息规则
ACTUAL/ACTUAL
ACTUAL/360
ACTUAL/365
M/12
30/360';
comment on column LEO_DAT_LN.ACCRUE_FREQ
  is '计结息频率
QE-每季末
M20-每月20日
M-每月对日
Q-每季对日
Y-每年对日
T-到期
ME-每月末
Q20-每季20日
S-每半年对日';
comment on column LEO_DAT_LN.CRDT_FREQ
  is '收付息频率
QE-每季末
M20-每月20日
M-每月对日
Q-每季对日
Y-每年对日
T-到期
ME-每月末
Q20-每季20日
S-每半年对日';
comment on column LEO_DAT_LN.PMT_FREQ
  is '还款计划
xMyD,每隔x个月的y日,例如1M26D表示每月26日，2M26D表示每2个月的26日
xM,每隔x个月的对日';
comment on column LEO_DAT_LN.OVRDUE_FLG
  is '逾期标志
Y-是
N-否';
comment on column LEO_DAT_LN.DFLT_RT
  is '罚息利率';
comment on column LEO_DAT_LN.TRDE_CLSFC
  is '行业分类
A-农、林、牧、渔业
B-采矿业
C-制造业
D-电力、热力、燃气及水生产和供应业
E-建筑业，F批发和零售业
G-交通运输、仓储和邮政业
H-住宿和餐饮业
I-信息传输、软件和信息技术服务业
J-金融业
K-房地产业
L-租赁和商务服务业
M-科学研究和技术服务业
N-水利、环境和公共设施管理业
O-民服务、修理和其他服务业
P-教育
Q-卫生和社会工作
R-文化、体育和娱乐业
S-公共管理、社会保障和社会组织
T-国际组织
U-个人
V-买断式转贴现
W-境外';
comment on column LEO_DAT_LN.ENTERPRIS_FLG
  is '中小企业标志
Y-是
N-否';
comment on column LEO_DAT_LN.REFER_PEASANT
  is '是否涉农
Y-是
N-否';
comment on column LEO_DAT_LN.ACCT_TYP
  is '总账类型
A-资产类（默认）
L-负债类
E-所有者权益类
I-收入类
P-支出类
O-表外业务类';
comment on column LEO_DAT_LN.LN_TYP
  is '贷款类型
1-个人
2-对公';
comment on column LEO_DAT_LN.DAT_DT
  is '数据日期';
comment on column LEO_DAT_LN.ZERORATEFLAG
  is '待摊余额标志,"Y-是 N-否"      默认：N';
comment on column LEO_DAT_LN.REMAININGYIELDS
  is '待摊余额  ,如果待摊余额=null或空，则根据利率和期末余额计算出待摊余额';

prompt
prompt Creating table LEO_DAT_NS
prompt =========================
prompt
create table LEO_DAT_NS
(
  BNK_NUM    VARCHAR2(50),
  SUBJT_NUM  VARCHAR2(50),
  ACCT_NUM   VARCHAR2(100),
  CRNCY_CD   VARCHAR2(50),
  ENDING_BAL NUMBER(20,4),
  ACCT_TYP   CHAR(1),
  DAT_DT     DATE
)
;
comment on table LEO_DAT_NS
  is '表内非敏感性数据表
除现金外的所有非生息资产、非生息负债、表外垫款和所有者权益类数据，但逾期类贷款除外，此类数据无需每笔账户明细，可按会计科目汇总';
comment on column LEO_DAT_NS.BNK_NUM
  is '机构码，对应机构表SYS_ORG的ID';
comment on column LEO_DAT_NS.SUBJT_NUM
  is '科目号，对应科目表BAS_GL_ACCT的ID';
comment on column LEO_DAT_NS.ACCT_NUM
  is '账号';
comment on column LEO_DAT_NS.CRNCY_CD
  is '币种，对应币种表BAS_CRNCY的ID';
comment on column LEO_DAT_NS.ENDING_BAL
  is '期末余额
根据卡片资产负债属性，如果和总账类型相符，数据汇总时按正值，不相符时按负值';
comment on column LEO_DAT_NS.ACCT_TYP
  is '总账类型
A-资产类
L-负债类
E-所有者权益类
I-收入类
P-支出类
O-表外业务类
根据科目做一一映射，其中对于资产负债共通类数据，需要做扎差，借方余额-贷方余额为正，表示资产，为负表示负值';
comment on column LEO_DAT_NS.DAT_DT
  is '数据日期';

prompt
prompt Creating table LEO_DAT_TCF
prompt ==========================
prompt
create table LEO_DAT_TCF
(
  BNK_NUM         VARCHAR2(50),
  SUBJT_NUM       VARCHAR2(50),
  ACCT_NUM        VARCHAR2(100),
  CUST_NM         VARCHAR2(500),
  CUST_NUM        VARCHAR2(300),
  CRNCY_CD        VARCHAR2(50),
  ENDING_BAL      NUMBER(20,4),
  BAS_RT          NUMBER(10,8),
  RT_SPREED       NUMBER(18,6),
  SPREED_TYP      CHAR(1),
  RT_MK           CHAR(1),
  RPRC_FREQ       VARCHAR2(20),
  ORIG_DT         DATE,
  MTRTY_DT        DATE,
  ACTL_RT         NUMBER(10,8),
  ACCRUE_BASIS    VARCHAR2(100),
  ACCRUE_FREQ     VARCHAR2(100),
  CRDT_FREQ       VARCHAR2(100),
  RL              VARCHAR2(100),
  ACCT_TYP        CHAR(1),
  DAT_DT          DATE,
  DFLT_RT         NUMBER(10,8),
  OVRDUE_FLG      VARCHAR2(5),
  ZERORATEFLAG    VARCHAR2(5),
  REMAININGYIELDS NUMBER(20,4)
)
;
comment on table LEO_DAT_TCF
  is '同业往来定期
存放同业定期、同业存放定期、拆放同业、同业拆放、回购（包括买入返售资产和卖出回购票据）、向央行借款和再贴现';
comment on column LEO_DAT_TCF.BNK_NUM
  is '机构码，对应机构表SYS_ORG的ID';
comment on column LEO_DAT_TCF.SUBJT_NUM
  is '科目号，对应科目表BAS_GL_ACCT的ID';
comment on column LEO_DAT_TCF.ACCT_NUM
  is '账号';
comment on column LEO_DAT_TCF.CUST_NM
  is '客户名称';
comment on column LEO_DAT_TCF.CUST_NUM
  is '身份代码';
comment on column LEO_DAT_TCF.CRNCY_CD
  is '币种，对应币种表BAS_CRNCY的ID';
comment on column LEO_DAT_TCF.ENDING_BAL
  is '期末余额';
comment on column LEO_DAT_TCF.BAS_RT
  is '基准利率';
comment on column LEO_DAT_TCF.RT_SPREED
  is '名义利率点差';
comment on column LEO_DAT_TCF.SPREED_TYP
  is '点差类型
A-加减点差
B-浮动利率点差';
comment on column LEO_DAT_TCF.RT_MK
  is '利率标志
F-固定利率
A-可调整利率，根据重定价周期进行重定价
V-浮动利率，可随时重定价，为了拆现金流方便，按照重定价周期按月';
comment on column LEO_DAT_TCF.RPRC_FREQ
  is '重定价周期
B1M21D-按月
B3M21D-按季
B6M21D-按半年
B1M-每月对日
B3M-每季对日
B6M-每半年对日
B12M-每年对日
G1M1D-每年1月1日';
comment on column LEO_DAT_TCF.ORIG_DT
  is '起息日';
comment on column LEO_DAT_TCF.MTRTY_DT
  is '到期日';
comment on column LEO_DAT_TCF.ACTL_RT
  is '实际利率';
comment on column LEO_DAT_TCF.ACCRUE_BASIS
  is '计结息规则
ACTUAL/ACTUAL
ACTUAL/360
ACTUAL/365
M/12
30/360';
comment on column LEO_DAT_TCF.ACCRUE_FREQ
  is '计结息频率
QE-每季末
M20-每月20日
M-每月对日
Q-每季对日
Y-每年对日
T-到期
ME-每月末
Q20-每季20日
S-每半年对日';
comment on column LEO_DAT_TCF.CRDT_FREQ
  is '收付息频率
QE-每季末
M20-每月20日
M-每月对日
Q-每季对日
Y-每年对日
T-到期
ME-每月末
Q20-每季20日
S-每半年对日';
comment on column LEO_DAT_TCF.RL
  is '业务关系
A-托管目的
B-清算目的
C-现金管理目的
D-网络合作
E-无业务关系';
comment on column LEO_DAT_TCF.ACCT_TYP
  is '总账类型
A-资产类
L-负债类
E-所有者权益类
I-收入类
P-支出类
O-表外业务类';
comment on column LEO_DAT_TCF.DAT_DT
  is '数据日期';
comment on column LEO_DAT_TCF.DFLT_RT
  is '   罚息利率';
comment on column LEO_DAT_TCF.OVRDUE_FLG
  is ' 逾期标志 ,"Y-是 N-否"';
comment on column LEO_DAT_TCF.ZERORATEFLAG
  is ' 待摊余额标志,"Y-是 N-否"      默认：N';
comment on column LEO_DAT_TCF.REMAININGYIELDS
  is '  待摊余额,如果待摊余额=null或空，则根据利率和期末余额计算出待摊余额';

prompt
prompt Creating table LEO_DAT_TD
prompt =========================
prompt
create table LEO_DAT_TD
(
  BNK_NUM       VARCHAR2(50),
  SUBJT_NUM     VARCHAR2(50),
  ACCT_NUM      VARCHAR2(100),
  CUST_NM       VARCHAR2(200),
  CUST_NUM      VARCHAR2(100),
  CRNCY_CD      VARCHAR2(50),
  ENDING_BAL    NUMBER(20,4),
  BAS_RT        NUMBER(10,8),
  RT_SPREED     NUMBER(18,6),
  SPREED_TYP    CHAR(1),
  ACTL_RT       NUMBER(10,8),
  RT_MK         CHAR(1),
  RPRC_FREQ     VARCHAR2(20),
  ORIG_DT       DATE,
  MTRTY_DT      DATE,
  ACCRUE_BASIS  VARCHAR2(100),
  ACCRUE_FREQ   VARCHAR2(100),
  CRDT_FREQ     VARCHAR2(100),
  PMT_TYP       VARCHAR2(100),
  TRDE_CLSFC    VARCHAR2(100),
  ENTERPRIS_FLG CHAR(1),
  ACCT_TYP      CHAR(1),
  TM_DEP_TYP    INTEGER,
  DAT_DT        DATE,
  PMT_FREQ      VARCHAR2(20)
)
;
comment on table LEO_DAT_TD
  is '定期存款
单位协议定期存款、定期存款';
comment on column LEO_DAT_TD.BNK_NUM
  is '机构码，对应机构表SYS_ORG的ID';
comment on column LEO_DAT_TD.SUBJT_NUM
  is '科目号，对应科目表BAS_GL_ACCT的ID';
comment on column LEO_DAT_TD.ACCT_NUM
  is '账号';
comment on column LEO_DAT_TD.CUST_NM
  is '客户名称';
comment on column LEO_DAT_TD.CUST_NUM
  is '身份代码';
comment on column LEO_DAT_TD.CRNCY_CD
  is '币种，对应币种表BAS_CRNCY的ID';
comment on column LEO_DAT_TD.ENDING_BAL
  is '期末余额';
comment on column LEO_DAT_TD.BAS_RT
  is '基准利率';
comment on column LEO_DAT_TD.RT_SPREED
  is '名义利率点差';
comment on column LEO_DAT_TD.SPREED_TYP
  is '点差类型
A-加减点差
B-浮动利率点差';
comment on column LEO_DAT_TD.ACTL_RT
  is '实际利率';
comment on column LEO_DAT_TD.RT_MK
  is '利率标志
F-固定利率
A-可调整利率，根据重定价周期进行重定价
V-浮动利率，可随时重定价，为了拆现金流方便，按照重定价周期按月';
comment on column LEO_DAT_TD.RPRC_FREQ
  is '重定价周期
B1M21D-按月
B3M21D-按季
B6M21D-按半年
B1M-每月对日
B3M-每季对日
B6M-每半年对日
B12M-每年对日
G1M1D-每年1月1日';
comment on column LEO_DAT_TD.ORIG_DT
  is '起息日';
comment on column LEO_DAT_TD.MTRTY_DT
  is '到期日';
comment on column LEO_DAT_TD.ACCRUE_BASIS
  is '计结息规则
ACTUAL/ACTUAL
ACTUAL/360
ACTUAL/365
M/12
30/360';
comment on column LEO_DAT_TD.ACCRUE_FREQ
  is '计结息频率
QE-每季末
M20-每月20日
M-每月对日
Q-每季对日
Y-每年对日
T-到期
ME-每月末
Q20-每季20日
S-每半年对日';
comment on column LEO_DAT_TD.CRDT_FREQ
  is '收付息频率
QE-每季末
M20-每月20日
M-每月对日
Q-每季对日
Y-每年对日
T-到期
ME-每月末
Q20-每季20日
S-每半年对日';
comment on column LEO_DAT_TD.PMT_TYP
  is '本金偿付类型
T-到期支取、存本取息、零存整取
A-整存零取';
comment on column LEO_DAT_TD.TRDE_CLSFC
  is '行业分类
A-农、林、牧、渔业
B-采矿业
C-制造业
D-电力、热力、燃气及水生产和供应业
E-建筑业，F批发和零售业
G-交通运输、仓储和邮政业
H-住宿和餐饮业
I-信息传输、软件和信息技术服务业
J-金融业
K-房地产业
L-租赁和商务服务业
M-科学研究和技术服务业
N-水利、环境和公共设施管理业
O-民服务、修理和其他服务业
P-教育
Q-卫生和社会工作
R-文化、体育和娱乐业
S-公共管理、社会保障和社会组织
T-国际组织
U-个人
V-买断式转贴现
W-境外';
comment on column LEO_DAT_TD.ENTERPRIS_FLG
  is '中小企业标志
Y-是
N-否';
comment on column LEO_DAT_TD.ACCT_TYP
  is '总账类型
A-资产类
L-负债类（默认）
E-所有者权益类
I-收入类
P-支出类
O-表外业务类';
comment on column LEO_DAT_TD.TM_DEP_TYP
  is '定期类型
1-个人
2-对公';
comment on column LEO_DAT_TD.DAT_DT
  is '数据日期';
comment on column LEO_DAT_TD.PMT_FREQ
  is '偿付计划,"偿付计划 xMyD,每隔x个月的y日,例如1M26D表示每月26日，2M26D表示每2个月的26日 xM,每隔x个月的对日"  ';

prompt
prompt Creating table R_CLUSTER
prompt ========================
prompt
create table R_CLUSTER
(
  ID_CLUSTER             INTEGER not null,
  NAME                   VARCHAR2(255),
  BASE_PORT              VARCHAR2(255),
  SOCKETS_BUFFER_SIZE    VARCHAR2(255),
  SOCKETS_FLUSH_INTERVAL VARCHAR2(255),
  SOCKETS_COMPRESSED     CHAR(1),
  DYNAMIC_CLUSTER        CHAR(1)
)
;
alter table R_CLUSTER
  add primary key (ID_CLUSTER);

prompt
prompt Creating table R_CLUSTER_SLAVE
prompt ==============================
prompt
create table R_CLUSTER_SLAVE
(
  ID_CLUSTER_SLAVE INTEGER not null,
  ID_CLUSTER       INTEGER,
  ID_SLAVE         INTEGER
)
;
alter table R_CLUSTER_SLAVE
  add primary key (ID_CLUSTER_SLAVE);

prompt
prompt Creating table R_CONDITION
prompt ==========================
prompt
create table R_CONDITION
(
  ID_CONDITION        INTEGER not null,
  ID_CONDITION_PARENT INTEGER,
  NEGATED             CHAR(1),
  OPERATOR            VARCHAR2(255),
  LEFT_NAME           VARCHAR2(255),
  CONDITION_FUNCTION  VARCHAR2(255),
  RIGHT_NAME          VARCHAR2(255),
  ID_VALUE_RIGHT      INTEGER
)
;
alter table R_CONDITION
  add primary key (ID_CONDITION);

prompt
prompt Creating table R_DATABASE
prompt =========================
prompt
create table R_DATABASE
(
  ID_DATABASE         INTEGER not null,
  NAME                VARCHAR2(255),
  ID_DATABASE_TYPE    INTEGER,
  ID_DATABASE_CONTYPE INTEGER,
  HOST_NAME           VARCHAR2(255),
  DATABASE_NAME       CLOB,
  PORT                INTEGER,
  USERNAME            VARCHAR2(255),
  PASSWORD            VARCHAR2(255),
  SERVERNAME          VARCHAR2(255),
  DATA_TBS            VARCHAR2(255),
  INDEX_TBS           VARCHAR2(255)
)
;
alter table R_DATABASE
  add primary key (ID_DATABASE);

prompt
prompt Creating table R_DATABASE_ATTRIBUTE
prompt ===================================
prompt
create table R_DATABASE_ATTRIBUTE
(
  ID_DATABASE_ATTRIBUTE INTEGER not null,
  ID_DATABASE           INTEGER,
  CODE                  VARCHAR2(255),
  VALUE_STR             CLOB
)
;
alter table R_DATABASE_ATTRIBUTE
  add primary key (ID_DATABASE_ATTRIBUTE);

prompt
prompt Creating table R_DATABASE_CONTYPE
prompt =================================
prompt
create table R_DATABASE_CONTYPE
(
  ID_DATABASE_CONTYPE INTEGER not null,
  CODE                VARCHAR2(255),
  DESCRIPTION         VARCHAR2(255)
)
;
alter table R_DATABASE_CONTYPE
  add primary key (ID_DATABASE_CONTYPE);

prompt
prompt Creating table R_DATABASE_TYPE
prompt ==============================
prompt
create table R_DATABASE_TYPE
(
  ID_DATABASE_TYPE INTEGER not null,
  CODE             VARCHAR2(255),
  DESCRIPTION      VARCHAR2(255)
)
;
alter table R_DATABASE_TYPE
  add primary key (ID_DATABASE_TYPE);

prompt
prompt Creating table R_DEPENDENCY
prompt ===========================
prompt
create table R_DEPENDENCY
(
  ID_DEPENDENCY     INTEGER not null,
  ID_TRANSFORMATION INTEGER,
  ID_DATABASE       INTEGER,
  TABLE_NAME        VARCHAR2(255),
  FIELD_NAME        VARCHAR2(255)
)
;
alter table R_DEPENDENCY
  add primary key (ID_DEPENDENCY);

prompt
prompt Creating table R_DIRECTORY
prompt ==========================
prompt
create table R_DIRECTORY
(
  ID_DIRECTORY        INTEGER not null,
  ID_DIRECTORY_PARENT INTEGER,
  DIRECTORY_NAME      VARCHAR2(255)
)
;
alter table R_DIRECTORY
  add primary key (ID_DIRECTORY);

prompt
prompt Creating table R_ELEMENT
prompt ========================
prompt
create table R_ELEMENT
(
  ID_ELEMENT      INTEGER not null,
  ID_ELEMENT_TYPE INTEGER,
  NAME            CLOB
)
;
alter table R_ELEMENT
  add primary key (ID_ELEMENT);

prompt
prompt Creating table R_ELEMENT_ATTRIBUTE
prompt ==================================
prompt
create table R_ELEMENT_ATTRIBUTE
(
  ID_ELEMENT_ATTRIBUTE        INTEGER not null,
  ID_ELEMENT                  INTEGER,
  ID_ELEMENT_ATTRIBUTE_PARENT INTEGER,
  ATTR_KEY                    VARCHAR2(255),
  ATTR_VALUE                  CLOB
)
;
alter table R_ELEMENT_ATTRIBUTE
  add primary key (ID_ELEMENT_ATTRIBUTE);

prompt
prompt Creating table R_ELEMENT_TYPE
prompt =============================
prompt
create table R_ELEMENT_TYPE
(
  ID_ELEMENT_TYPE INTEGER not null,
  ID_NAMESPACE    INTEGER,
  NAME            CLOB,
  DESCRIPTION     CLOB
)
;
alter table R_ELEMENT_TYPE
  add primary key (ID_ELEMENT_TYPE);

prompt
prompt Creating table R_JOB
prompt ====================
prompt
create table R_JOB
(
  ID_JOB               INTEGER not null,
  ID_DIRECTORY         INTEGER,
  NAME                 VARCHAR2(255),
  DESCRIPTION          CLOB,
  EXTENDED_DESCRIPTION CLOB,
  JOB_VERSION          VARCHAR2(255),
  JOB_STATUS           INTEGER,
  ID_DATABASE_LOG      INTEGER,
  TABLE_NAME_LOG       VARCHAR2(255),
  CREATED_USER         VARCHAR2(255),
  MODIFIED_USER        VARCHAR2(255),
  USE_BATCH_ID         CHAR(1),
  PASS_BATCH_ID        CHAR(1),
  USE_LOGFIELD         CHAR(1),
  SHARED_FILE          VARCHAR2(255),
  CREATED_DATE         DATE,
  MODIFIED_DATE        DATE
)
;
alter table R_JOB
  add primary key (ID_JOB);

prompt
prompt Creating table R_JOBENTRY
prompt =========================
prompt
create table R_JOBENTRY
(
  ID_JOBENTRY      INTEGER not null,
  ID_JOB           INTEGER,
  ID_JOBENTRY_TYPE INTEGER,
  NAME             VARCHAR2(255),
  DESCRIPTION      CLOB
)
;
alter table R_JOBENTRY
  add primary key (ID_JOBENTRY);

prompt
prompt Creating table R_JOBENTRY_ATTRIBUTE
prompt ===================================
prompt
create table R_JOBENTRY_ATTRIBUTE
(
  ID_JOBENTRY_ATTRIBUTE INTEGER not null,
  ID_JOB                INTEGER,
  ID_JOBENTRY           INTEGER,
  NR                    INTEGER,
  CODE                  VARCHAR2(255),
  VALUE_NUM             NUMBER(13,2),
  VALUE_STR             CLOB
)
;
alter table R_JOBENTRY_ATTRIBUTE
  add primary key (ID_JOBENTRY_ATTRIBUTE);

prompt
prompt Creating table R_JOBENTRY_COPY
prompt ==============================
prompt
create table R_JOBENTRY_COPY
(
  ID_JOBENTRY_COPY INTEGER not null,
  ID_JOBENTRY      INTEGER,
  ID_JOB           INTEGER,
  ID_JOBENTRY_TYPE INTEGER,
  NR               INTEGER,
  GUI_LOCATION_X   INTEGER,
  GUI_LOCATION_Y   INTEGER,
  GUI_DRAW         CHAR(1),
  PARALLEL         CHAR(1)
)
;
alter table R_JOBENTRY_COPY
  add primary key (ID_JOBENTRY_COPY);

prompt
prompt Creating table R_JOBENTRY_DATABASE
prompt ==================================
prompt
create table R_JOBENTRY_DATABASE
(
  ID_JOB      INTEGER,
  ID_JOBENTRY INTEGER,
  ID_DATABASE INTEGER
)
;
create index IDX_R_JOBENTRY_DATABASE_LU1 on R_JOBENTRY_DATABASE (ID_JOB);
create index IDX_R_JOBENTRY_DATABASE_LU2 on R_JOBENTRY_DATABASE (ID_DATABASE);

prompt
prompt Creating table R_JOBENTRY_TYPE
prompt ==============================
prompt
create table R_JOBENTRY_TYPE
(
  ID_JOBENTRY_TYPE INTEGER not null,
  CODE             VARCHAR2(255),
  DESCRIPTION      VARCHAR2(255)
)
;
alter table R_JOBENTRY_TYPE
  add primary key (ID_JOBENTRY_TYPE);

prompt
prompt Creating table R_JOB_ATTRIBUTE
prompt ==============================
prompt
create table R_JOB_ATTRIBUTE
(
  ID_JOB_ATTRIBUTE INTEGER not null,
  ID_JOB           INTEGER,
  NR               INTEGER,
  CODE             VARCHAR2(255),
  VALUE_NUM        INTEGER,
  VALUE_STR        CLOB
)
;
alter table R_JOB_ATTRIBUTE
  add primary key (ID_JOB_ATTRIBUTE);

prompt
prompt Creating table R_JOB_HOP
prompt ========================
prompt
create table R_JOB_HOP
(
  ID_JOB_HOP            INTEGER not null,
  ID_JOB                INTEGER,
  ID_JOBENTRY_COPY_FROM INTEGER,
  ID_JOBENTRY_COPY_TO   INTEGER,
  ENABLED               CHAR(1),
  EVALUATION            CHAR(1),
  UNCONDITIONAL         CHAR(1)
)
;
alter table R_JOB_HOP
  add primary key (ID_JOB_HOP);

prompt
prompt Creating table R_JOB_LOCK
prompt =========================
prompt
create table R_JOB_LOCK
(
  ID_JOB_LOCK  INTEGER not null,
  ID_JOB       INTEGER,
  ID_USER      INTEGER,
  LOCK_MESSAGE CLOB,
  LOCK_DATE    DATE
)
;
alter table R_JOB_LOCK
  add primary key (ID_JOB_LOCK);

prompt
prompt Creating table R_JOB_NOTE
prompt =========================
prompt
create table R_JOB_NOTE
(
  ID_JOB  INTEGER,
  ID_NOTE INTEGER
)
;

prompt
prompt Creating table R_LOG
prompt ====================
prompt
create table R_LOG
(
  ID_LOG          INTEGER not null,
  NAME            VARCHAR2(255),
  ID_LOGLEVEL     INTEGER,
  LOGTYPE         VARCHAR2(255),
  FILENAME        VARCHAR2(255),
  FILEEXTENTION   VARCHAR2(255),
  ADD_DATE        CHAR(1),
  ADD_TIME        CHAR(1),
  ID_DATABASE_LOG INTEGER,
  TABLE_NAME_LOG  VARCHAR2(255)
)
;
alter table R_LOG
  add primary key (ID_LOG);

prompt
prompt Creating table R_LOGLEVEL
prompt =========================
prompt
create table R_LOGLEVEL
(
  ID_LOGLEVEL INTEGER not null,
  CODE        VARCHAR2(255),
  DESCRIPTION VARCHAR2(255)
)
;
alter table R_LOGLEVEL
  add primary key (ID_LOGLEVEL);

prompt
prompt Creating table R_NAMESPACE
prompt ==========================
prompt
create table R_NAMESPACE
(
  ID_NAMESPACE INTEGER not null,
  NAME         VARCHAR2(1999)
)
;
alter table R_NAMESPACE
  add primary key (ID_NAMESPACE);

prompt
prompt Creating table R_NOTE
prompt =====================
prompt
create table R_NOTE
(
  ID_NOTE                      INTEGER not null,
  VALUE_STR                    CLOB,
  GUI_LOCATION_X               INTEGER,
  GUI_LOCATION_Y               INTEGER,
  GUI_LOCATION_WIDTH           INTEGER,
  GUI_LOCATION_HEIGHT          INTEGER,
  FONT_NAME                    CLOB,
  FONT_SIZE                    INTEGER,
  FONT_BOLD                    CHAR(1),
  FONT_ITALIC                  CHAR(1),
  FONT_COLOR_RED               INTEGER,
  FONT_COLOR_GREEN             INTEGER,
  FONT_COLOR_BLUE              INTEGER,
  FONT_BACK_GROUND_COLOR_RED   INTEGER,
  FONT_BACK_GROUND_COLOR_GREEN INTEGER,
  FONT_BACK_GROUND_COLOR_BLUE  INTEGER,
  FONT_BORDER_COLOR_RED        INTEGER,
  FONT_BORDER_COLOR_GREEN      INTEGER,
  FONT_BORDER_COLOR_BLUE       INTEGER,
  DRAW_SHADOW                  CHAR(1)
)
;
alter table R_NOTE
  add primary key (ID_NOTE);

prompt
prompt Creating table R_PARTITION
prompt ==========================
prompt
create table R_PARTITION
(
  ID_PARTITION        INTEGER not null,
  ID_PARTITION_SCHEMA INTEGER,
  PARTITION_ID        VARCHAR2(255)
)
;
alter table R_PARTITION
  add primary key (ID_PARTITION);

prompt
prompt Creating table R_PARTITION_SCHEMA
prompt =================================
prompt
create table R_PARTITION_SCHEMA
(
  ID_PARTITION_SCHEMA  INTEGER not null,
  NAME                 VARCHAR2(255),
  DYNAMIC_DEFINITION   CHAR(1),
  PARTITIONS_PER_SLAVE VARCHAR2(255)
)
;
alter table R_PARTITION_SCHEMA
  add primary key (ID_PARTITION_SCHEMA);

prompt
prompt Creating table R_REPOSITORY_LOG
prompt ===============================
prompt
create table R_REPOSITORY_LOG
(
  ID_REPOSITORY_LOG INTEGER not null,
  REP_VERSION       VARCHAR2(255),
  LOG_USER          VARCHAR2(255),
  OPERATION_DESC    CLOB,
  LOG_DATE          DATE
)
;
alter table R_REPOSITORY_LOG
  add primary key (ID_REPOSITORY_LOG);

prompt
prompt Creating table R_SLAVE
prompt ======================
prompt
create table R_SLAVE
(
  ID_SLAVE        INTEGER not null,
  NAME            VARCHAR2(255),
  HOST_NAME       VARCHAR2(255),
  PORT            VARCHAR2(255),
  WEB_APP_NAME    VARCHAR2(255),
  USERNAME        VARCHAR2(255),
  PASSWORD        VARCHAR2(255),
  PROXY_HOST_NAME VARCHAR2(255),
  PROXY_PORT      VARCHAR2(255),
  NON_PROXY_HOSTS VARCHAR2(255),
  MASTER          CHAR(1)
)
;
alter table R_SLAVE
  add primary key (ID_SLAVE);

prompt
prompt Creating table R_STEP
prompt =====================
prompt
create table R_STEP
(
  ID_STEP           INTEGER not null,
  ID_TRANSFORMATION INTEGER,
  NAME              VARCHAR2(255),
  DESCRIPTION       CLOB,
  ID_STEP_TYPE      INTEGER,
  DISTRIBUTE        CHAR(1),
  COPIES            INTEGER,
  GUI_LOCATION_X    INTEGER,
  GUI_LOCATION_Y    INTEGER,
  GUI_DRAW          CHAR(1),
  COPIES_STRING     VARCHAR2(255)
)
;
alter table R_STEP
  add primary key (ID_STEP);

prompt
prompt Creating table R_STEP_ATTRIBUTE
prompt ===============================
prompt
create table R_STEP_ATTRIBUTE
(
  ID_STEP_ATTRIBUTE INTEGER not null,
  ID_TRANSFORMATION INTEGER,
  ID_STEP           INTEGER,
  NR                INTEGER,
  CODE              VARCHAR2(255),
  VALUE_NUM         INTEGER,
  VALUE_STR         CLOB
)
;
alter table R_STEP_ATTRIBUTE
  add primary key (ID_STEP_ATTRIBUTE);

prompt
prompt Creating table R_STEP_DATABASE
prompt ==============================
prompt
create table R_STEP_DATABASE
(
  ID_TRANSFORMATION INTEGER,
  ID_STEP           INTEGER,
  ID_DATABASE       INTEGER
)
;

prompt
prompt Creating table R_STEP_TYPE
prompt ==========================
prompt
create table R_STEP_TYPE
(
  ID_STEP_TYPE INTEGER not null,
  CODE         VARCHAR2(255),
  DESCRIPTION  VARCHAR2(255),
  HELPTEXT     VARCHAR2(255)
)
;
alter table R_STEP_TYPE
  add primary key (ID_STEP_TYPE);

prompt
prompt Creating table R_TRANSFORMATION
prompt ===============================
prompt
create table R_TRANSFORMATION
(
  ID_TRANSFORMATION    INTEGER not null,
  ID_DIRECTORY         INTEGER,
  NAME                 VARCHAR2(255),
  DESCRIPTION          CLOB,
  EXTENDED_DESCRIPTION CLOB,
  TRANS_VERSION        VARCHAR2(255),
  TRANS_STATUS         INTEGER,
  ID_STEP_READ         INTEGER,
  ID_STEP_WRITE        INTEGER,
  ID_STEP_INPUT        INTEGER,
  ID_STEP_OUTPUT       INTEGER,
  ID_STEP_UPDATE       INTEGER,
  ID_DATABASE_LOG      INTEGER,
  TABLE_NAME_LOG       VARCHAR2(255),
  USE_BATCHID          CHAR(1),
  USE_LOGFIELD         CHAR(1),
  ID_DATABASE_MAXDATE  INTEGER,
  TABLE_NAME_MAXDATE   VARCHAR2(255),
  FIELD_NAME_MAXDATE   VARCHAR2(255),
  OFFSET_MAXDATE       NUMBER(12,2),
  DIFF_MAXDATE         NUMBER(12,2),
  CREATED_USER         VARCHAR2(255),
  MODIFIED_USER        VARCHAR2(255),
  SIZE_ROWSET          INTEGER,
  CREATED_DATE         DATE,
  MODIFIED_DATE        DATE
)
;
alter table R_TRANSFORMATION
  add primary key (ID_TRANSFORMATION);

prompt
prompt Creating table R_TRANS_ATTRIBUTE
prompt ================================
prompt
create table R_TRANS_ATTRIBUTE
(
  ID_TRANS_ATTRIBUTE INTEGER not null,
  ID_TRANSFORMATION  INTEGER,
  NR                 INTEGER,
  CODE               VARCHAR2(255),
  VALUE_NUM          INTEGER,
  VALUE_STR          CLOB
)
;
alter table R_TRANS_ATTRIBUTE
  add primary key (ID_TRANS_ATTRIBUTE);

prompt
prompt Creating table R_TRANS_CLUSTER
prompt ==============================
prompt
create table R_TRANS_CLUSTER
(
  ID_TRANS_CLUSTER  INTEGER not null,
  ID_TRANSFORMATION INTEGER,
  ID_CLUSTER        INTEGER
)
;
alter table R_TRANS_CLUSTER
  add primary key (ID_TRANS_CLUSTER);

prompt
prompt Creating table R_TRANS_HOP
prompt ==========================
prompt
create table R_TRANS_HOP
(
  ID_TRANS_HOP      INTEGER not null,
  ID_TRANSFORMATION INTEGER,
  ID_STEP_FROM      INTEGER,
  ID_STEP_TO        INTEGER,
  ENABLED           CHAR(1)
)
;
alter table R_TRANS_HOP
  add primary key (ID_TRANS_HOP);

prompt
prompt Creating table R_TRANS_LOCK
prompt ===========================
prompt
create table R_TRANS_LOCK
(
  ID_TRANS_LOCK     INTEGER not null,
  ID_TRANSFORMATION INTEGER,
  ID_USER           INTEGER,
  LOCK_MESSAGE      CLOB,
  LOCK_DATE         DATE
)
;
alter table R_TRANS_LOCK
  add primary key (ID_TRANS_LOCK);

prompt
prompt Creating table R_TRANS_NOTE
prompt ===========================
prompt
create table R_TRANS_NOTE
(
  ID_TRANSFORMATION INTEGER,
  ID_NOTE           INTEGER
)
;

prompt
prompt Creating table R_TRANS_PARTITION_SCHEMA
prompt =======================================
prompt
create table R_TRANS_PARTITION_SCHEMA
(
  ID_TRANS_PARTITION_SCHEMA INTEGER not null,
  ID_TRANSFORMATION         INTEGER,
  ID_PARTITION_SCHEMA       INTEGER
)
;
alter table R_TRANS_PARTITION_SCHEMA
  add primary key (ID_TRANS_PARTITION_SCHEMA);

prompt
prompt Creating table R_TRANS_SLAVE
prompt ============================
prompt
create table R_TRANS_SLAVE
(
  ID_TRANS_SLAVE    INTEGER not null,
  ID_TRANSFORMATION INTEGER,
  ID_SLAVE          INTEGER
)
;
alter table R_TRANS_SLAVE
  add primary key (ID_TRANS_SLAVE);

prompt
prompt Creating table R_TRANS_STEP_CONDITION
prompt =====================================
prompt
create table R_TRANS_STEP_CONDITION
(
  ID_TRANSFORMATION INTEGER,
  ID_STEP           INTEGER,
  ID_CONDITION      INTEGER
)
;

prompt
prompt Creating table R_USER
prompt =====================
prompt
create table R_USER
(
  ID_USER     INTEGER not null,
  LOGIN       VARCHAR2(255),
  PASSWORD    VARCHAR2(255),
  NAME        VARCHAR2(255),
  DESCRIPTION VARCHAR2(255),
  ENABLED     CHAR(1)
)
;
alter table R_USER
  add primary key (ID_USER);

prompt
prompt Creating table R_VALUE
prompt ======================
prompt
create table R_VALUE
(
  ID_VALUE   INTEGER not null,
  NAME       VARCHAR2(255),
  VALUE_TYPE VARCHAR2(255),
  VALUE_STR  VARCHAR2(255),
  IS_NULL    CHAR(1)
)
;
alter table R_VALUE
  add primary key (ID_VALUE);

prompt
prompt Creating table R_VERSION
prompt ========================
prompt
create table R_VERSION
(
  ID_VERSION    INTEGER not null,
  MAJOR_VERSION INTEGER,
  MINOR_VERSION INTEGER,
  IS_UPGRADE    CHAR(1),
  UPGRADE_DATE  DATE
)
;
alter table R_VERSION
  add primary key (ID_VERSION);

prompt
prompt Creating table SYS_APP_LOG
prompt ==========================
prompt
create table SYS_APP_LOG
(
  BANK_NAME      VARCHAR2(200),
  SYSTEM_NAME    VARCHAR2(200),
  OPERATION      VARCHAR2(200),
  LOG_LEVEL      VARCHAR2(50),
  OPERATE_DESC   VARCHAR2(500),
  COST_TIME      NUMBER,
  CLIENT_IP      VARCHAR2(50),
  SERVER_IP      VARCHAR2(50),
  OPERATE_STATUS VARCHAR2(20),
  OPERATOR       VARCHAR2(100),
  CREATE_TIME    VARCHAR2(50)
)
;

prompt
prompt Creating table SYS_APP_STATUS
prompt =============================
prompt
create table SYS_APP_STATUS
(
  BANK_NAME   VARCHAR2(200),
  SYSTEM_NAME VARCHAR2(200),
  SERVER_ID   VARCHAR2(50),
  CPU_RATE    NUMBER,
  MEMORY_RATE NUMBER,
  UPDATE_TIME VARCHAR2(50)
)
;
comment on column SYS_APP_STATUS.BANK_NAME
  is '客户银行名称';
comment on column SYS_APP_STATUS.SYSTEM_NAME
  is '系统名称';
comment on column SYS_APP_STATUS.SERVER_ID
  is '服务器IP';
comment on column SYS_APP_STATUS.CPU_RATE
  is 'CPU使用率';
comment on column SYS_APP_STATUS.MEMORY_RATE
  is '内存使用率';
comment on column SYS_APP_STATUS.UPDATE_TIME
  is '更新时间';

prompt
prompt Creating table SYS_AUTHORITY_GROUP_TB
prompt =====================================
prompt
create table SYS_AUTHORITY_GROUP_TB
(
  ID            NUMBER(8),
  NAME          VARCHAR2(200),
  CODE          VARCHAR2(200),
  DESCRIPTION   VARCHAR2(200),
  PARENT_ID     NUMBER(8),
  CREATOR_ID    NUMBER(8),
  MODIFIER_ID   NUMBER(8),
  DATE_CREATED  TIMESTAMP(6),
  DATE_MODIFIED TIMESTAMP(6),
  DATA_STATUS   NUMBER(1)
)
;

prompt
prompt Creating table SYS_AUTHORITY_TB
prompt ===============================
prompt
create table SYS_AUTHORITY_TB
(
  ID            NUMBER(8),
  CODE          VARCHAR2(150),
  NAME          VARCHAR2(200),
  DESCRIPTION   VARCHAR2(200),
  CREATOR_ID    NUMBER(8),
  MODIFIER_ID   NUMBER(8),
  DATE_CREATED  TIMESTAMP(6),
  DATE_MODIFIED TIMESTAMP(6),
  DATA_STATUS   NUMBER(1)
)
;

prompt
prompt Creating table SYS_LOG
prompt ======================
prompt
create table SYS_LOG
(
  BANK_NAME      VARCHAR2(200),
  SYSTEM_NAME    VARCHAR2(200),
  OPERATION      VARCHAR2(200),
  LOG_LEVEL      VARCHAR2(50),
  OPERATE_DESC   VARCHAR2(500),
  COST_TIME      NUMBER,
  CLIENT_IP      VARCHAR2(50),
  SERVER_IP      VARCHAR2(50),
  OPERATE_STATUS VARCHAR2(20),
  OPERATOR       VARCHAR2(100),
  CREATE_TIME    VARCHAR2(50)
)
;
comment on column SYS_LOG.BANK_NAME
  is '客户银行名称';
comment on column SYS_LOG.SYSTEM_NAME
  is '系统名称';
comment on column SYS_LOG.OPERATION
  is '用户操作';
comment on column SYS_LOG.LOG_LEVEL
  is '日志等级：信息;警告;紧急;严重;事故;危险';
comment on column SYS_LOG.OPERATE_DESC
  is '操作描述';
comment on column SYS_LOG.COST_TIME
  is '耗时(ms)';
comment on column SYS_LOG.CLIENT_IP
  is '客户端IP';
comment on column SYS_LOG.SERVER_IP
  is '服务端IP';
comment on column SYS_LOG.OPERATE_STATUS
  is '执行结果：操作成功; 操作失败';
comment on column SYS_LOG.OPERATOR
  is '登录用户';
comment on column SYS_LOG.CREATE_TIME
  is '日志记录时间';

prompt
prompt Creating table SYS_MAP_AUTH_AUTHGROUP_TB
prompt ========================================
prompt
create table SYS_MAP_AUTH_AUTHGROUP_TB
(
  AUTH_ID      NUMBER(8),
  AUTHGROUP_ID NUMBER(8)
)
;

prompt
prompt Creating table SYS_MAP_AUTH_MENU_TB
prompt ===================================
prompt
create table SYS_MAP_AUTH_MENU_TB
(
  AUTH_ID NUMBER(8),
  MENU_ID NUMBER(8)
)
;

prompt
prompt Creating table SYS_MAP_AUTH_OPEA_TB
prompt ===================================
prompt
create table SYS_MAP_AUTH_OPEA_TB
(
  AUTH_ID NUMBER(8),
  OPEA_ID NUMBER(8)
)
;

prompt
prompt Creating table SYS_MAP_ROLE_AUTH_TB
prompt ===================================
prompt
create table SYS_MAP_ROLE_AUTH_TB
(
  ROLE_ID NUMBER(8),
  AUTH_ID NUMBER(8)
)
;

prompt
prompt Creating table SYS_MAP_ROLE_USERGROUP_TB
prompt ========================================
prompt
create table SYS_MAP_ROLE_USERGROUP_TB
(
  ROLE_ID      NUMBER(8),
  USERGROUP_ID NUMBER(8)
)
;

prompt
prompt Creating table SYS_MAP_USER_ORGAN_TB
prompt ====================================
prompt
create table SYS_MAP_USER_ORGAN_TB
(
  USER_ID  NUMBER(8),
  ORGAN_ID NUMBER(8)
)
;

prompt
prompt Creating table SYS_MAP_USER_ROLE_TB
prompt ===================================
prompt
create table SYS_MAP_USER_ROLE_TB
(
  USER_ID NUMBER(8),
  ROLE_ID NUMBER(8)
)
;

prompt
prompt Creating table SYS_MAP_USER_USERGROUP_TB
prompt ========================================
prompt
create table SYS_MAP_USER_USERGROUP_TB
(
  USER_ID      NUMBER(8),
  USERGROUP_ID NUMBER(8)
)
;

prompt
prompt Creating table SYS_MENU_TB
prompt ==========================
prompt
create table SYS_MENU_TB
(
  ID            NUMBER(8),
  CODE          VARCHAR2(200),
  NAME          VARCHAR2(200),
  URL_          VARCHAR2(200),
  CLS           VARCHAR2(200),
  PARENT_ID     NUMBER(8),
  MENU_VIEW     VARCHAR2(200),
  LEAF          CHAR(1),
  DESCRIPTION   VARCHAR2(200),
  DIS_ORDER     NUMBER(8),
  CREATOR_ID    NUMBER(8),
  MODIFIER_ID   NUMBER(8),
  DATE_CREATED  TIMESTAMP(6),
  DATE_MODIFIED TIMESTAMP(6),
  DATA_STATUS   NUMBER(1)
)
;

prompt
prompt Creating table SYS_OPERATION_TB
prompt ===============================
prompt
create table SYS_OPERATION_TB
(
  ID            NUMBER(8),
  CODE          VARCHAR2(150),
  NAME          VARCHAR2(200),
  PARENT_ID     NUMBER(8),
  LEAF          CHAR(1),
  DESCRIPTION   VARCHAR2(200),
  DIS_ORDER     NUMBER(8),
  PREFIX        VARCHAR2(100),
  SUFFIX        VARCHAR2(100),
  CREATOR_ID    NUMBER(8),
  MODIFIER_ID   NUMBER(8),
  DATE_CREATED  TIMESTAMP(6),
  DATE_MODIFIED TIMESTAMP(6),
  DATA_STATUS   NUMBER(1)
)
;

prompt
prompt Creating table SYS_ORGAN_TB
prompt ===========================
prompt
create table SYS_ORGAN_TB
(
  ID            NUMBER(8),
  CODE          VARCHAR2(100),
  NAME          VARCHAR2(200),
  SHORT_NAME    VARCHAR2(200),
  PARENT_ID     NUMBER(8),
  DIS_ORDER     NUMBER(8),
  DESCRIPTION   VARCHAR2(200),
  CREATOR_ID    NUMBER(8),
  MODIFIER_ID   NUMBER(8),
  DATE_CREATED  TIMESTAMP(6),
  DATE_MODIFIED TIMESTAMP(6),
  DATA_STATUS   NUMBER(1)
)
;

prompt
prompt Creating table SYS_ROLE_TB
prompt ==========================
prompt
create table SYS_ROLE_TB
(
  ID            NUMBER(8),
  CODE          VARCHAR2(150),
  NAME          VARCHAR2(200),
  DESCRIPTION   VARCHAR2(200),
  TYPE_         VARCHAR2(50),
  CREATOR_ID    NUMBER(8),
  MODIFIER_ID   NUMBER(8),
  DATE_CREATED  TIMESTAMP(6),
  DATE_MODIFIED TIMESTAMP(6),
  DATA_STATUS   NUMBER(1)
)
;

prompt
prompt Creating table SYS_USER_GROUP_TB
prompt ================================
prompt
create table SYS_USER_GROUP_TB
(
  ID            NUMBER(8),
  NAME          VARCHAR2(200),
  CODE          VARCHAR2(200),
  DESCRIPTION   VARCHAR2(200),
  PARENT_ID     NUMBER(8),
  CREATOR_ID    NUMBER(8),
  MODIFIER_ID   NUMBER(8),
  DATE_CREATED  TIMESTAMP(6),
  DATE_MODIFIED TIMESTAMP(6),
  DATA_STATUS   NUMBER(1)
)
;

prompt
prompt Creating table SYS_USER_TB
prompt ==========================
prompt
create table SYS_USER_TB
(
  ID                  NUMBER(8),
  CODE                VARCHAR2(150),
  LOGIN_NAME          VARCHAR2(200),
  REAL_NAME           VARCHAR2(200),
  ALPHA               VARCHAR2(1),
  PASSWORD            VARCHAR2(150),
  PHONE               VARCHAR2(50),
  POST                VARCHAR2(75),
  EXPIRED_AT          TIMESTAMP(6),
  PASSWORD_EXPIRED_AT TIMESTAMP(6),
  CREATOR_ID          NUMBER(8),
  MODIFIER_ID         NUMBER(8),
  DATE_CREATED        TIMESTAMP(6),
  DATE_MODIFIED       TIMESTAMP(6),
  DATA_STATUS         NUMBER(1)
)
;

prompt
prompt Creating table TEST1
prompt ====================
prompt
create table TEST1
(
  ID   VARCHAR2(10),
  TIME DATE
)
;

prompt
prompt Creating table T_WORKDATE
prompt =========================
prompt
create table T_WORKDATE
(
  ID          INTEGER not null,
  C_WORKDATE  VARCHAR2(20),
  C_STARTTIME TIMESTAMP(6),
  C_ENDTIME   TIMESTAMP(6),
  C_STATUS    VARCHAR2(10),
  MEM         VARCHAR2(100)
)
;
comment on table T_WORKDATE
  is '跑批任务状态表';
comment on column T_WORKDATE.C_WORKDATE
  is '跑数日期';
comment on column T_WORKDATE.C_STARTTIME
  is '开始时间';
comment on column T_WORKDATE.C_ENDTIME
  is '结束时间';
comment on column T_WORKDATE.C_STATUS
  is '跑数状态';
comment on column T_WORKDATE.MEM
  is '其他';

prompt
prompt Creating sequence DISPATCH_TASKETL_DATASOURCE_DB
prompt ================================================
prompt
create sequence DISPATCH_TASKETL_DATASOURCE_DB
minvalue 1
maxvalue 999999999999999999999999
start with 141
increment by 1
cache 20;

prompt
prompt Creating sequence DISPATCH_TASKETL_FLOWGROUP_ID_
prompt ================================================
prompt
create sequence DISPATCH_TASKETL_FLOWGROUP_ID_
minvalue 1
maxvalue 999999999999999999999999
start with 263
increment by 1
cache 20;

prompt
prompt Creating sequence DISPATCH_TASKETL_FLOWNAME_ID
prompt ==============================================
prompt
create sequence DISPATCH_TASKETL_FLOWNAME_ID
minvalue 1
maxvalue 9999999999999999999999
start with 1400
increment by 1
cache 20
order;

prompt
prompt Creating sequence DISPATCH_TASKETL_FWDEPENDENCY_
prompt ================================================
prompt
create sequence DISPATCH_TASKETL_FWDEPENDENCY_
minvalue 1
maxvalue 999999999999999999999999
start with 21
increment by 1
cache 20;

prompt
prompt Creating sequence DISPATCH_TASKETL_OPLOGS_ID_SEQ
prompt ================================================
prompt
create sequence DISPATCH_TASKETL_OPLOGS_ID_SEQ
minvalue 1
maxvalue 999999999999999999999999
start with 16648
increment by 1
cache 20;

prompt
prompt Creating sequence DISPATCH_TASKETL_PARAMETERS_PA
prompt ================================================
prompt
create sequence DISPATCH_TASKETL_PARAMETERS_PA
minvalue 2000
maxvalue 999999999999999999999999
start with 2420
increment by 1
cache 20;

prompt
prompt Creating sequence DISPATCH_TASKETL_PARAMETERS__2
prompt ================================================
prompt
create sequence DISPATCH_TASKETL_PARAMETERS__2
minvalue 1
maxvalue 999999999999999999999999
start with 21
increment by 1
cache 20;

prompt
prompt Creating sequence DISPATCH_TASKETL_REMOTE_ID_SEQ
prompt ================================================
prompt
create sequence DISPATCH_TASKETL_REMOTE_ID_SEQ
minvalue 1
maxvalue 999999999999999999999999
start with 121
increment by 1
cache 20;

prompt
prompt Creating sequence DISPATCH_TASKETL_SIGNALHASH_ID
prompt ================================================
prompt
create sequence DISPATCH_TASKETL_SIGNALHASH_ID
minvalue 1
maxvalue 999999999999999999999999
start with 81
increment by 1
cache 20;

prompt
prompt Creating sequence DISPATCH_TASKETL_TASKNAME_ID
prompt ==============================================
prompt
create sequence DISPATCH_TASKETL_TASKNAME_ID
minvalue 1
maxvalue 99999999999999999999999
start with 1737
increment by 1
cache 20
order;

prompt
prompt Creating sequence DISPATCH_TASKETL_TASKPARAS_I_1
prompt ================================================
prompt
create sequence DISPATCH_TASKETL_TASKPARAS_I_1
minvalue 1
maxvalue 999999999999999999999999
start with 542
increment by 1
cache 20;

prompt
prompt Creating sequence DISPATCH_TASKETL_TSDEPENDENCY_
prompt ================================================
prompt
create sequence DISPATCH_TASKETL_TSDEPENDENCY_
minvalue 1
maxvalue 999999999999999999999999
start with 761
increment by 1
cache 20;

prompt
prompt Creating sequence DISPATCH_TASKETL_XML_ID_SEQ
prompt =============================================
prompt
create sequence DISPATCH_TASKETL_XML_ID_SEQ
minvalue 1
maxvalue 999999999999999999999999
start with 341
increment by 1
cache 20;

prompt
prompt Creating sequence LEO_BAS_CRNCY_SEQ
prompt ===================================
prompt
create sequence LEO_BAS_CRNCY_SEQ
minvalue 1
maxvalue 9999999999999999999999999999
start with 141
increment by 1
cache 20;

prompt
prompt Creating sequence LEO_BAS_FRGN_EXCH_RT_SEQ
prompt ==========================================
prompt
create sequence LEO_BAS_FRGN_EXCH_RT_SEQ
minvalue 1
maxvalue 9999999999999999999999999999
start with 34261
increment by 1
cache 20;

prompt
prompt Creating sequence LEO_BAS_GL_ACCT_SEQ
prompt =====================================
prompt
create sequence LEO_BAS_GL_ACCT_SEQ
minvalue 1
maxvalue 9999999999999999999999999999
start with 38941
increment by 1
cache 20;

prompt
prompt Creating sequence LEO_BAS_ORG_SEQ
prompt =================================
prompt
create sequence LEO_BAS_ORG_SEQ
minvalue 1
maxvalue 9999999999999999999999999999
start with 1281
increment by 1
cache 20;

prompt
prompt Creating sequence LEO_DAT_BND_SEQ
prompt =================================
prompt
create sequence LEO_DAT_BND_SEQ
minvalue 1
maxvalue 999999999999999999999
start with 1901
increment by 1
cache 20;

prompt
prompt Creating sequence LEO_DAT_CA_SEQ
prompt ================================
prompt
create sequence LEO_DAT_CA_SEQ
minvalue 1
maxvalue 999999999999999999999
start with 2797461
increment by 1
cache 20;

prompt
prompt Creating sequence LEO_DAT_CI_SEQ
prompt ================================
prompt
create sequence LEO_DAT_CI_SEQ
minvalue 1
maxvalue 999999999999999999999
start with 2721
increment by 1
cache 20;

prompt
prompt Creating sequence LEO_DAT_CSH_SEQ
prompt =================================
prompt
create sequence LEO_DAT_CSH_SEQ
minvalue 1
maxvalue 999999999999999999999
start with 8621
increment by 1
cache 20;

prompt
prompt Creating sequence LEO_DAT_DCF_SEQ
prompt =================================
prompt
create sequence LEO_DAT_DCF_SEQ
minvalue 1
maxvalue 999999999999999999999
start with 1021
increment by 1
cache 20;

prompt
prompt Creating sequence LEO_DAT_DD_SEQ
prompt ================================
prompt
create sequence LEO_DAT_DD_SEQ
minvalue 1
maxvalue 999999999999999999999
start with 26826301
increment by 1
cache 20;

prompt
prompt Creating sequence LEO_DAT_FP_SEQ
prompt ================================
prompt
create sequence LEO_DAT_FP_SEQ
minvalue 1
maxvalue 999999999999999999999
start with 5461
increment by 1
cache 20;

prompt
prompt Creating sequence LEO_DAT_FUTR_SEQ
prompt ==================================
prompt
create sequence LEO_DAT_FUTR_SEQ
minvalue 1
maxvalue 999999999999999999999
start with 1
increment by 1
cache 20;

prompt
prompt Creating sequence LEO_DAT_GL_SEQ
prompt ================================
prompt
create sequence LEO_DAT_GL_SEQ
minvalue 1
maxvalue 999999999999999999999
start with 479621
increment by 1
cache 20;

prompt
prompt Creating sequence LEO_DAT_INV_SEQ
prompt =================================
prompt
create sequence LEO_DAT_INV_SEQ
minvalue 1
maxvalue 999999999999999999999
start with 13281
increment by 1
cache 20;

prompt
prompt Creating sequence LEO_DAT_LN_SEQ
prompt ================================
prompt
create sequence LEO_DAT_LN_SEQ
minvalue 1
maxvalue 999999999999999999999
start with 811641
increment by 1
cache 20;

prompt
prompt Creating sequence LEO_DAT_NS_SEQ
prompt ================================
prompt
create sequence LEO_DAT_NS_SEQ
minvalue 1
maxvalue 999999999999999999999
start with 24041
increment by 1
cache 20;

prompt
prompt Creating sequence LEO_DAT_SWAP_SEQ
prompt ==================================
prompt
create sequence LEO_DAT_SWAP_SEQ
minvalue 1
maxvalue 999999999999999999999
start with 1
increment by 1
cache 20;

prompt
prompt Creating sequence LEO_DAT_TCF_SEQ
prompt =================================
prompt
create sequence LEO_DAT_TCF_SEQ
minvalue 1
maxvalue 999999999999999999999
start with 19361
increment by 1
cache 20;

prompt
prompt Creating sequence LEO_DAT_TD_SEQ
prompt ================================
prompt
create sequence LEO_DAT_TD_SEQ
minvalue 1
maxvalue 999999999999999999999
start with 13344921
increment by 1
cache 20;

prompt
prompt Creating sequence SYS_AUTHORITY_GROUP_SEQ
prompt =========================================
prompt
create sequence SYS_AUTHORITY_GROUP_SEQ
minvalue 1
maxvalue 99999999
start with 200
increment by 1
cache 100;

prompt
prompt Creating sequence SYS_AUTHORITY_GROUP_TB_ID_SEQ
prompt ===============================================
prompt
create sequence SYS_AUTHORITY_GROUP_TB_ID_SEQ
minvalue 1
maxvalue 999999999999999999999999
start with 1
increment by 1
cache 20;

prompt
prompt Creating sequence SYS_AUTHORITY_SEQ
prompt ===================================
prompt
create sequence SYS_AUTHORITY_SEQ
minvalue 1
maxvalue 99999999
start with 200
increment by 1
cache 100;

prompt
prompt Creating sequence SYS_AUTHORITY_TB_ID_SEQ
prompt =========================================
prompt
create sequence SYS_AUTHORITY_TB_ID_SEQ
minvalue 1
maxvalue 999999999999999999999999
start with 1
increment by 1
cache 20;

prompt
prompt Creating sequence SYS_ELEMENT_SEQ
prompt =================================
prompt
create sequence SYS_ELEMENT_SEQ
minvalue 1
maxvalue 99999999
start with 200
increment by 1
cache 100;

prompt
prompt Creating sequence SYS_ELEMENT_TB_ID_SEQ
prompt =======================================
prompt
create sequence SYS_ELEMENT_TB_ID_SEQ
minvalue 1
maxvalue 999999999999999999999999
start with 1
increment by 1
cache 20;

prompt
prompt Creating sequence SYS_FILE_SEQ
prompt ==============================
prompt
create sequence SYS_FILE_SEQ
minvalue 1
maxvalue 99999999
start with 200
increment by 1
cache 100;

prompt
prompt Creating sequence SYS_FILE_TB_ID_SEQ
prompt ====================================
prompt
create sequence SYS_FILE_TB_ID_SEQ
minvalue 1
maxvalue 999999999999999999999999
start with 1
increment by 1
cache 20;

prompt
prompt Creating sequence SYS_LOGGER_SEQ
prompt ================================
prompt
create sequence SYS_LOGGER_SEQ
minvalue 1
maxvalue 99999999
start with 29442
increment by 1
cache 100;

prompt
prompt Creating sequence SYS_LOGGER_TB_ID_SEQ
prompt ======================================
prompt
create sequence SYS_LOGGER_TB_ID_SEQ
minvalue 1
maxvalue 999999999999999999999999
start with 28841
increment by 1
cache 20;

prompt
prompt Creating sequence SYS_MENU_SEQ
prompt ==============================
prompt
create sequence SYS_MENU_SEQ
minvalue 1
maxvalue 99999999
start with 300
increment by 1
cache 100;

prompt
prompt Creating sequence SYS_MENU_TB_ID_SEQ
prompt ====================================
prompt
create sequence SYS_MENU_TB_ID_SEQ
minvalue 1
maxvalue 999999999999999999999999
start with 1
increment by 1
cache 20;

prompt
prompt Creating sequence SYS_OPERATION_SEQ
prompt ===================================
prompt
create sequence SYS_OPERATION_SEQ
minvalue 1
maxvalue 99999999
start with 200
increment by 1
cache 100;

prompt
prompt Creating sequence SYS_ORGAN_SEQ
prompt ===============================
prompt
create sequence SYS_ORGAN_SEQ
minvalue 1
maxvalue 99999999
start with 200
increment by 1
cache 100;

prompt
prompt Creating sequence SYS_ORGAN_TB_ID_SEQ
prompt =====================================
prompt
create sequence SYS_ORGAN_TB_ID_SEQ
minvalue 1
maxvalue 999999999999999999999999
start with 1
increment by 1
cache 20;

prompt
prompt Creating sequence SYS_ROLE_SEQ
prompt ==============================
prompt
create sequence SYS_ROLE_SEQ
minvalue 1
maxvalue 99999999
start with 200
increment by 1
cache 100;

prompt
prompt Creating sequence SYS_ROLE_TB_ID_SEQ
prompt ====================================
prompt
create sequence SYS_ROLE_TB_ID_SEQ
minvalue 1
maxvalue 999999999999999999999999
start with 1
increment by 1
cache 20;

prompt
prompt Creating sequence SYS_USER_GROUP_SEQ
prompt ====================================
prompt
create sequence SYS_USER_GROUP_SEQ
minvalue 1
maxvalue 99999999
start with 300
increment by 1
cache 100;

prompt
prompt Creating sequence SYS_USER_GROUP_TB_ID_SEQ
prompt ==========================================
prompt
create sequence SYS_USER_GROUP_TB_ID_SEQ
minvalue 1
maxvalue 999999999999999999999999
start with 1
increment by 1
cache 20;

prompt
prompt Creating sequence SYS_USER_SEQ
prompt ==============================
prompt
create sequence SYS_USER_SEQ
minvalue 1
maxvalue 99999999
start with 200
increment by 1
cache 100;

prompt
prompt Creating sequence SYS_USER_TB_ID_SEQ
prompt ====================================
prompt
create sequence SYS_USER_TB_ID_SEQ
minvalue 1
maxvalue 999999999999999999999999
start with 1
increment by 1
cache 20;

prompt
prompt Creating sequence T_WORKDATE_SEQ
prompt ================================
prompt
create sequence T_WORKDATE_SEQ
minvalue 1
maxvalue 9999999999999999999999999999
start with 43
increment by 1
cache 20;

prompt
prompt Creating procedure MY_TEST
prompt ==========================
prompt
create or replace procedure my_test is
temp varchar(10);
begin
  select count(*) into temp from leo_dat_bnd;
end my_test;
/

prompt
prompt Creating procedure TOTALSCORECHECK
prompt ==================================
prompt
create or replace procedure totalScoreCheck (c_workdate in String,flg out number)
is
     cursor cor is
(select sum(ending_bal) as sum_bal,subjt_num,crncy_cd,bnk_num from 
(select subjt_num,crncy_cd,ending_bal,bnk_num from leo_dat_dd where dat_dt=to_date(c_workdate,'YYYY-mm-dd') union all
select subjt_num,crncy_cd,ending_bal,bnk_num from leo_dat_td where dat_dt=to_date(c_workdate,'YYYY-mm-dd') union all
select subjt_num,crncy_cd,ending_bal,bnk_num from leo_dat_ca where dat_dt=to_date(c_workdate,'YYYY-mm-dd') union all
select subjt_num,crncy_cd,ending_bal,bnk_num from leo_dat_ci where dat_dt=to_date(c_workdate,'YYYY-mm-dd') union all
select subjt_num,crncy_cd,ending_bal,bnk_num from leo_dat_fp where dat_dt=to_date(c_workdate,'YYYY-mm-dd') union all
select subjt_num,crncy_cd,ending_bal,bnk_num from leo_dat_inv where dat_dt=to_date(c_workdate,'YYYY-mm-dd') union all
select subjt_num,crncy_cd,ending_bal,bnk_num from leo_dat_dcf where dat_dt=to_date(c_workdate,'YYYY-mm-dd') union all
select subjt_num,crncy_cd,ending_bal,bnk_num from leo_dat_tcf where dat_dt=to_date(c_workdate,'YYYY-mm-dd') union all
select subjt_num,crncy_cd,ending_bal,bnk_num from leo_dat_csh where dat_dt=to_date(c_workdate,'YYYY-mm-dd') union all
select subjt_num,crncy_cd,ending_bal,bnk_num from leo_dat_ns where dat_dt=to_date(c_workdate,'YYYY-mm-dd') union all
select subjt_num,crncy_cd,ending_bal,bnk_num from leo_dat_ln where dat_dt=to_date(c_workdate,'YYYY-mm-dd') union all
select subjt_num,crncy_cd,ending_bal,bnk_num from leo_dat_bnd where dat_dt=to_date(c_workdate,'YYYY-mm-dd'))
group by subjt_num,crncy_cd,bnk_num );
         c_row cor%rowtype;
begin


     open cor;
     loop
      fetch cor into c_row;
      exit when cor%notfound;
            update leo_dat_gl set sum_bal=c_row.sum_bal where subjt_num=c_row.subjt_num and crncy_cd=c_row.crncy_cd and bnk_num=c_row.bnk_num;
     end loop;
     close cor;
     
     select count(*) into flg from leo_dat_gl where dat_dt=to_date(c_workdate,'YYYY-mm-dd') and ending_bal<>sum_bal;

exception when others then
     flg:=1;
     rollback;
end totalScoreCheck;
/


spool off
