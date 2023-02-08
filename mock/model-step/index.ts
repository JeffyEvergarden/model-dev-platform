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
      // processDataList: [
      //   {
      //     id: 1,
      //     processName: '独角兽一号',
      //     sampleCount: 1000,
      //   },
      //   {
      //     id: 2,
      //     processName: '报丧女妖二号',
      //     sampleCount: 1200,
      //   },
      //   {
      //     id: 3,
      //     processName: '菲尼克斯三号',
      //     sampleCount: 1300,
      //   },
      //   {
      //     id: 4,
      //     processName: '沙扎比',
      //     sampleCount: 1300,
      //   },
      // ],
      processName: '编排1,编排2',
      backtrackProcessName: '编排1,编排2',
    },
  });
};

// 菜单管理相关
export default {
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
