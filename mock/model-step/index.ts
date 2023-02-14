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
  });
};

const getStepInfo = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: {
      currentStage: 7, // 1~10
      currentStageStatus: 1, // 0~3
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
      modelAnalyst: '日番谷冬狮郎',
      modelDevStartTime: '2023-01-10',
      modelDevEndTime: '2023-01-31',
      modelInnovation: '日番谷冬狮郎',
      modelName: '日番谷冬狮郎',
      modelPerformanceMetrics: '日番谷冬狮郎',
      modelPolicyCounterpart: '日番谷冬狮郎',
      modelPresentSituation: '日番谷冬狮郎',
      modelSceneThought: '日番谷冬狮郎',
      targetDesc: '日番谷冬狮郎',
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
  // res.json({
  //   status: {
  //     code: successCode,
  //     desc: '',
  //   },
  // });
  if (time >= 2) {
    time = 0;
    res.json({
      status: {
        code: successCode,
        desc: '',
      },
      result: {
        currentStage: '3',
        currentStageStatus: '2', //完成
        currentStageDesc: '1',
        backtrackProcessName: '编排1,编排2',
      },
    });
  } else {
    time++;
    res.json({
      status: {
        code: successCode,
        desc: '',
      },
      result: {
        currentStage: '3',
        currentStageStatus: '1', //进行中
        currentStageDesc: '1',
        backtrackProcessName: '编排1,编排2',
      },
    });
  }
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
    },
  });
};

// 菜单管理相关
export default {
  // 基础模块
  [`GET ${baseUrl}/stage/getCurrentStage`]: getStepInfo,

  // 模型概况
  [`GET ${baseUrl}/summary/getSummaryDetail`]: getStepOneForm,
  [`POST ${baseUrl}/summary/saveInfo`]: postStepOneForm,
  // 样本选择
  // 样本选择 - 获取数据源
  [`GET ${baseUrl}/database/list`]: getDatabaseList, // 获取模型管理列表
  [`GET ${baseUrl}/database/columnlist`]: getColumnsList,
  [`GET ${baseUrl}/modelStep/selectSample/result`]: getWaitResult,

  // 策略回溯
  [`POST ${baseUrl}/policyBacktrack/getProcessInfo`]: getStrategyBackList,
  [`POST ${baseUrl}/policyBacktrack/getStageStatus`]: getWaitResult,
  [`POST ${baseUrl}/policyBacktrack/backTracking`]: normalDeal,
  [`POST ${baseUrl}/policyBacktrack/nextStage`]: normalDeal,
};
