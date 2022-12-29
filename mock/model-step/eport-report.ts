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

const sampleDividerQueryApi = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    data: {
      total: 6,
      pageSize: 10,
      pageNum: 1,
      list: [
        {
          value1: '训练集',
          value2: '4000',
          value3: '4000',
          value4: '33.33%',
          value5: '12000',
          value6: '4000',
          value7: '33.33%',
        },
        {
          value1: '跨期验证',
          value2: '4000',
          value3: '4000',
          value4: '33.33%',
          value5: '12000',
          value6: '4000',
          value7: '33.33%',
        },
      ],
    },
  });
};

const monthSpreadQueryApi = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    data: {
      total: 6,
      pageSize: 10,
      pageNum: 1,
      list: [
        {
          value1: '2022-01',
          value2: '4000',
          value3: '4000',
          value4: '33.33%',
          value5: '12000',
          value6: '4000',
          value7: '33.33%',
        },
        {
          value1: '2022-02',
          value2: '4000',
          value3: '4000',
          value4: '33.33%',
          value5: '12000',
          value6: '4000',
          value7: '33.33%',
        },
        {
          value1: '总计',
          value2: '4000',
          value3: '4000',
          value4: '33.33%',
          value5: '12000',
          value6: '4000',
          value7: '33.33%',
        },
      ],
    },
  });
};

export default {
  [`POST ${baseUrl}/modelStep/exportReport/sampleDividerQueryApi`]: sampleDividerQueryApi,
  [`POST ${baseUrl}/modelStep/exportReport/monthSpreadQueryApi`]: monthSpreadQueryApi,
};
