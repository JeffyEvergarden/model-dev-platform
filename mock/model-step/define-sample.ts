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
const monthDistributionList = (req: any, res: any) => {
  let list = new Array(11).fill(1).map((item: any, index: number) => {
    return {
      advMonth: '202302',
      goodSample: '10',
      badSample: '1',
      total: '11',
      badRate: '1%',
      midSample: '5',
      midRate: '50%',
    };
  });
  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    current: 1,
    pageSize: 10,
    totalSize: 21,
    result: list,
  });
};

const totalDistributionList = (req: any, res: any) => {
  let list = new Array(11).fill(1).map((item: any, index: number) => {
    return {
      sampleType: 'x',
      goodSample: '10',
      badSample: '1',
      total: '11',
      badRate: '1%',
    };
  });
  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: list,
  });
};

// 菜单管理相关
export default {
  // 样本定义
  [`POST ${baseUrl}/modelDev/sampleDefinition/monthDistribution`]: monthDistributionList,
  [`POST ${baseUrl}/modelDev/sampleDefinition/totalDistribution`]: totalDistributionList,
};
