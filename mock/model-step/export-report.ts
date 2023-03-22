import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

// 新增方式通用
const normalDeal = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '成功',
    },
  });
};

const getSampleDefineDetail = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '成功',
    },
    result: {
      prodCat: '产品列表1,产品列表2',
      channelCat: '渠道列表1',
      training: '训练集',
      validation: '验证集',
      otherValidList: '其他验证',
      performance: '表现期',
      goodAndBadDef: '好坏样本定义',
      totalSetList: [
        {
          sampleType: '训练集',
          goodSample: 4000,
          badSample: 4000,
          badRate: '33.33%',
          total: 12000,
        },
      ],
      monthList: [
        {
          month: '2022-12',
          goodSample: 4000,
          badSample: 4000,
          total: 12000,
          badRate: '33.33%',
          midSample: 4000,
          midRate: '33.33%',
        },
        {
          month: '2022-12',
          goodSample: 4000,
          badSample: 4000,
          total: 12000,
          badRate: '33.33%',
          midSample: 4000,
          midRate: '33.33%',
        },
        {
          month: '2022-12',
          goodSample: 4000,
          badSample: 4000,
          total: 12000,
          badRate: '33.33%',
          midSample: 4000,
          midRate: '33.33%',
        },
      ],
    },
  });
};

const getOptimalVersion = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '成功',
    },
    result: 'model-1',
  });
};

export default {
  [`GET ${baseUrl}/reporting/getSampleDefineDetail`]: getSampleDefineDetail,
  [`POST ${baseUrl}/reporting/createReport`]: normalDeal,

  [`GET ${baseUrl}/reporting/getOptimalVersion`]: getOptimalVersion,
};
