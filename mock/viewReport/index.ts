import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

const sampleList = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    data: {
      total: 30,
      pageSize: 10,
      pageNum: 1,
      list: [
        {
          value1: '训练集',
          value2: '2963',
          value3: '1015',
          value4: '3978',
          value5: '25.52%',
        },
        {
          value1: '跨期验证',
          value2: '2963',
          value3: '1015',
          value4: '3978',
          value5: '25.52%',
        },
        {
          value1: '其他验证1',
          value2: '2963',
          value3: '1015',
          value4: '3978',
          value5: '25.52%',
        },
      ],
    },
  });
};

const sampleListByMonthApi = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    data: {
      total: 30,
      pageSize: 10,
      pageNum: 1,
      list: [
        {
          value1: '2019-01',
          value2: '2963',
          value3: '1015',
          value4: '3978',
          value5: '25.52%',
          value6: '21',
          value7: '35.00%',
        },
        {
          value1: '2019-02',
          value2: '2963',
          value3: '1015',
          value4: '3978',
          value5: '25.52%',
          value6: '21',
          value7: '35.00%',
        },
        {
          value1: '2019-03',
          value2: '2963',
          value3: '1015',
          value4: '3978',
          value5: '25.52%',
          value6: '21',
          value7: '35.00%',
        },
      ],
    },
  });
};

export default {
  [`POST ${baseUrl}/robot/testWhiteList/sampleList`]: sampleList,
  [`POST ${baseUrl}/robot/testWhiteList/sampleListByMonthApi`]: sampleListByMonthApi,
};
