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

const getList = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    status: {
      code: successCode,
      desc: '',
    },
    result: {
      head: [
        '期数',
        'M1',
        'M2',
        'period_3',
        'period_4',
        '1111111',
        '22222222',
        '333333',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
      ],
      data: [
        ['mob00', '-', '-', '-', '-', '-', '-', '-', '4', '5', '6', '7', '8', '9', '0'],
        [
          'mob01',
          '2.25%',
          '-',
          '3.25%',
          '4.25%',
          '6.8%',
          '6.6%',
          '6.9%',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '0',
        ],
        [
          'mob03',
          '6.7%',
          '9.25%',
          '8.25%',
          '6.25%',
          '5.25%',
          '2.25%',
          '3.25%',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '0',
        ],
      ],
    },
  });
};

const getConditionList = (req: any, res: any) => {
  res.json({
    // 产品大类
    resultCode: successCode,
    data: [
      // 产品大类
      {
        key: '0-1',
        label: '循环',
        // 产品种类
        monthList: [
          {
            key: '0-1-1',
            label: '循环-产品中类-01',
            monthList: [
              {
                key: '0-1-1-1',
                label: '循环-产品小类1-01',
              },
              {
                key: '0-1-1-2',
                label: '循环-产品小类1-02',
              },
            ],
          },
          {
            key: '0-1-2',
            label: '循环-产品中类-02',
            monthList: [
              {
                key: '0-1-2-1',
                label: '循环-产品小类2-01',
              },
              {
                key: '0-1-2-2',
                label: '循环-产品小类2-02',
              },
            ],
          },
        ],
      },
      {
        key: '0-2',
        label: '非循环',
        monthList: [
          {
            key: '0-2-1',
            label: '非循环-产品中类-01',
            monthList: [
              {
                key: '0-2-1-1',
                label: '非循环-产品小类-01',
              },
              {
                key: '0-2-1-2',
                label: '非循环-产品小类-02',
              },
            ],
          },
          {
            key: '0-2-2',
            label: '非循环-产品中类-02',
          },
        ],
      },
    ],
  });
};

const getRateListRequest = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    total: 6,
    columns: [
      {
        key: 'name',
        label: '本期状态',
      },
      {
        key: 'M0',
        label: 'M0',
      },
      {
        key: 'M1',
        label: 'M1',
      },
      {
        key: 'M2',
        label: 'M2',
      },
    ],
    status: {
      code: successCode,
      desc: '',
    },
    result: [
      {
        // key: 1,
        name: 'M0',
        m0: '98.45%',
        m1: '98.45%',
        m2: '98.45%',
        monthList: [
          {
            // key: '11',
            name: '2021-12',
            m0: '98.45%',
            m1: '98.45%',
            m2: '98.45%',
            monthList: [
              {
                // key: '111',
                name: '2021-12',
                m0: '98.45%',
                m1: '98.45%',
                m2: '98.45%',
              },
            ],
          },
          {
            // key: '12',
            name: '2022-01',
            m0: '98.45%',
            m1: '98.45%',
            m2: '98.45%',
            monthList: [
              {
                // key: '111',
                name: '2021-12',
                m0: '98.45%',
                m1: '98.45%',
                m2: '98.45%',
              },
            ],
          },
          {
            // key: '13',
            name: '2022-02',
            m0: '98.45%',
            m1: '98.45%',
            m2: '98.45%',
          },
        ],
      },
      {
        // key: 2,
        name: 'M1',
        m0: '33.98%',
        m1: '33.98%',
        m2: '33.98%',
        monthList: [
          {
            // key: '21',
            name: '2021-12',
            m0: '98.45%',
            m1: '98.45%',
            m2: '98.45%',
          },
          {
            // key: '22',
            name: '2022-01',
            m0: '98.45%',
            m1: '98.45%',
            m2: '98.45%',
          },
          {
            // key: '23',
            name: '2022-02',
            m0: '98.45%',
            m1: '98.45%',
            m2: '98.45%',
          },
        ],
      },
    ],
  });
};

const getYaerMonthApi = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    result: ['1', '2', '3'],
  });
};

const getCustomerList = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: [{ featureCode: '11', featureName: '22' }],
  });
};

const backshow = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: {
      defaultSelection: {
        // prodCat: '全部',
        // channelCatM: '全部',
        // channelCatS: '全部',
        // custCatL: '全部',
        dimension: '进件层',
        index: 'xxx',
      },
      prodTreeDto: [
        {
          id: 1,
          parentId: 0,
          name: '产品大类1',
          children: [
            {
              id: 2,
              parentId: 1,
              name: '渠道中类1',
              children: [
                {
                  id: 3,
                  parentId: 2,
                  name: '渠道小类1',
                  children: [
                    {
                      id: 4,
                      parentId: 3,
                      name: '客群大类1',
                      children: [
                        {
                          id: 5,
                          parentId: 6,
                          name: '客群小类1',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 123,
          parentId: 0,
          name: '产品大类1',
          children: [
            {
              id: 332,
              parentId: 1,
              name: '渠道中类1',
              children: [
                {
                  id: 322,
                  parentId: 2,
                  name: '渠道小类11',
                  children: [
                    {
                      id: 433,
                      parentId: 3,
                      name: '客群大类2',
                      children: [
                        {
                          id: 544,
                          parentId: 6,
                          name: '客群小类1',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 11,
          parentId: 0,
          name: '产品大类1',
          children: [
            {
              id: 12,
              parentId: 11,
              name: '渠道中类2',
              children: [
                {
                  id: 13,
                  parentId: 12,
                  name: '渠道小类2',
                  children: [
                    {
                      id: 14,
                      parentId: 13,
                      name: '客群大类2',
                      children: [
                        {
                          id: 15,
                          parentId: 14,
                          name: '客群小类2',
                        },
                        {
                          id: 16,
                          parentId: 14,
                          name: '客群小类2',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  });
};

// 菜单管理相关
export default {
  // 样本定义
  [`POST ${baseUrl}/preanalysis/vintageResult`]: getList,
  [`POST ${baseUrl}/modelStep/preAnalyze/scroll/list`]: getList,
  [`POST ${baseUrl}/preanalysis/rollRateResult`]: getRateListRequest,
  [`GET ${baseUrl}/modelStep/preAnalyze/condition/list`]: getConditionList,
  [`GET ${baseUrl}/preanalysis/vintageLoanTerms`]: getYaerMonthApi,
  [`GET ${baseUrl}/preanalysis/customerDefinitionOptions`]: getCustomerList,
  [`POST ${baseUrl}/preanalysis/nextStage`]: normalDeal,
  [`GET ${baseUrl}/preanalysis/prodChannelList`]: backshow,
};
