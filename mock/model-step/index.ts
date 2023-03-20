import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

let time = 0;

// 新增方式通用
const normalDeal = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: {
      // skipCurrentStageStatus: '1',
    },
  });
};

const getStepOneForm = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: {
      itmModelRegisCode: '模型单号',
      modelDevTarget: '模型开发目标',
      modelPresentSituation: '现有评分应用现状',
      modelSceneThought: '模型应用场景和思路',
      modelPerformanceMetrics: '模型主要性能指标',
      modelInnovation: '模型主要创新点',
      modelDevStartTime: '2012-12-12',
      modelDevEndTime: '2012-12-13',
      modelPolicyCounterpart: '政策对接人',
      modelName: '模型名称',
      modelAnalyst: '模型开发人',
    },
  });
};

const postStepOneForm = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: {},
  });
};

// 提交过程 通用
const getWaitResult = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: {
      modelName: '模型名称',
      currentStage: '4',
      currentStageStatus: '1', //：0：未开始 1：进行中 2：已完成 3：处理失败
      isCommittedPage: '0',
      currentStageDesc: '0',
      modelBuildStatus: '0',
      reportFilePath: '',
      backtrackProcessName: '编排1,编排2',
      operate: 'EDIT',
      sampleTableName: '库名.表名',
    },
  });
};

// 样本选择
const getDatabaseList = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    data: [
      {
        key: 'db_01',
        name: '数据库1',
        children: [
          {
            key: 'db_table_01',
            name: '表_01',
          },
          {
            key: 'db_table_02',
            name: '表_02',
          },
        ],
      },
      {
        key: 'db_02',
        name: '数据库2',
        children: [
          {
            key: 'db_table_03',
            name: '表_03',
          },
          {
            key: 'db_table_04',
            name: '表_04',
          },
        ],
      },
    ],
  });
};

const getColumnsList = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    data: [
      {
        key: 'name',
        name: '姓名',
        isIndex: true,
      },
      {
        key: 'age',
        name: '年龄',
        isIndex: false,
      },
      {
        key: 'address',
        name: '住址',
        isIndex: false,
      },
      {
        key: 'useName',
        name: '用户名',
        isIndex: false,
      },
      {
        name: '创建时间',
        key: 'creator',
        isIndex: false,
      },
      {
        name: '主机',
        key: 'ip',
        isIndex: false,
      },
    ],
  });
};

// 策略回溯
const getStrategyBackList = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: {
      processName: '编排1,编排2',
      backtrackProcessName: '编排1,编排2',
      isSkipCurrentStage: false,
    },
  });
};

// 菜单管理相关
export default {
  // 基础模块
  [`GET ${baseUrl}/stage/getCurrentStage`]: getWaitResult,

  // 模型概况
  [`GET ${baseUrl}/summary/getSummaryDetail`]: getStepOneForm,
  [`POST ${baseUrl}/summary/saveInfo`]: postStepOneForm,
  // 样本选择
  // 样本选择 - 获取数据源
  [`GET ${baseUrl}/database/list`]: getDatabaseList, // 获取模型管理列表
  [`GET ${baseUrl}/database/columnlist`]: getColumnsList,
  // [`GET ${baseUrl}/stage/getCurrentStage`]: getWaitResult,

  // 策略回溯
  [`GET ${baseUrl}/strategyBacktrack/getProcessInfo`]: getStrategyBackList,
  [`GET ${baseUrl}/strategyBacktrack/getStageStatus`]: getWaitResult,
  [`POST ${baseUrl}/strategyBacktrack/backTracking`]: normalDeal,
  [`POST ${baseUrl}/strategyBacktrack/nextStage`]: normalDeal,
  [`POST ${baseUrl}/strategyBacktrack/skipCurrentStage`]: normalDeal,
  [`POST ${baseUrl}/strategyBacktrack/retryBackTracking`]: normalDeal,
};
