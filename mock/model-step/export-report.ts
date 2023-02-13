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
      prodCatList: ['产品列表1', '产品列表2'],
      channelCatList: ['渠道列表1'],
      training: '训练集',
      validation: '验证集',
      otherValidList: ['其他验证'],
      performance: '表现期',
      goodAndBadDef: '好坏样本定义',
      dataSetList: [
        {
          dataSetType: '训练集',
          goodCount: 4000,
          badCount: 4000,
          badRate: '33.33%',
          totalNum: 12000,
        },
      ],
      monthList: [
        {
          month: '2022-12',
          goodCount: 4000,
          badCount: 4000,
          totalNum: 12000,
          badRate: '33.33%',
          midCount: 4000,
          midRate: '33.33%',
        },
      ],
    },
  });
};
export default {
  [`GET ${baseUrl}/reporting/getSampleDefineDetail`]: getSampleDefineDetail,
  [`POST ${baseUrl}/reporting/createReport`]: normalDeal,
};
