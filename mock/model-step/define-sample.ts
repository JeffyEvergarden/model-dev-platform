import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

let time = 0;

// 新增方式通用
const normalDeal = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
  });
};
// 提交过程 通用
const getWaitResult = (req: any, res: any) => {
  if (time >= 2) {
    time = 0;
    res.json({
      resultCode: successCode,
      data: {
        type: 'finish',
      },
    });
  } else {
    time++;
    res.json({
      resultCode: successCode,
      data: {
        type: 'loading',
      },
    });
  }
};

// 策略回溯

const getDefineSampleList = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    total: 6,
    data: [
      {
        month: '2022-02',
        goodNum: 4000,
        badNum: 1000,
        total: 5000,
        badPercent: 0.3,
        midNum: 2000,
        midPercent: 0.3333,
      },
      {
        month: '2022-03',
        goodNum: 4000,
        badNum: 1000,
        total: 5000,
        badPercent: 0.3,
        midNum: 2000,
        midPercent: 0.3333,
      },
      {
        month: '2022-04',
        goodNum: 4000,
        badNum: 1000,
        total: 5000,
        badPercent: 0.3,
        midNum: 2000,
        midPercent: 0.3333,
      },
      {
        month: '2022-05',
        goodNum: 4000,
        badNum: 1000,
        total: 5000,
        badPercent: 0.3,
        midNum: 2000,
        midPercent: 0.3333,
      },
      {
        month: '2022-06',
        goodNum: 4000,
        badNum: 1000,
        total: 5000,
        badPercent: 0.3,
        midNum: 2000,
        midPercent: 0.3333,
      },
      {
        month: '2022-07',
        goodNum: 4000,
        badNum: 1000,
        total: 5000,
        badPercent: 0.3,
        midNum: 2000,
        midPercent: 0.3333,
      },
    ],
  });
};

// 菜单管理相关
export default {
  // 样本定义
  [`GET ${baseUrl}/modelStep/defineSample/list`]: getDefineSampleList,
  [`POST ${baseUrl}/modelStep/defineSample/resultlist`]: getDefineSampleList,
};
