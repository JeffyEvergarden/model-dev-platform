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

const getList = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    total: 6,
    columns: [
      {
        key: 'period_1',
        label: 'M1',
      },
      {
        key: 'period_2',
        label: 'M2',
      },
      {
        key: 'period_3',
        label: 'M3',
      },
      {
        key: 'period_4',
        label: 'M4',
      },
      {
        key: 'period_5',
        label: 'M5',
      },
    ],
    data: [
      {
        periodName: '1期',
        period_1: 1,
        period_2: 2,
        period_3: 3,
        period_4: 1,
        period_5: 2,
        period_6: 3,
        total: 5000,
      },
      {
        periodName: '2期',
        period_1: 1,
        period_2: 2,
        period_3: 3,
        period_4: 1,
        period_5: 2,
        period_6: 3,
        total: 5000,
      },
      {
        periodName: '3期',
        period_1: 1,
        period_2: 2,
        period_3: 3,
        period_4: 1,
        period_5: 2,
        period_6: 3,
        total: 5000,
      },
      {
        periodName: '4期',
        period_1: 1,
        period_2: 2,
        period_3: 3,
        period_4: 1,
        period_5: 2,
        period_6: 3,
        total: 5000,
      },
      {
        periodName: '5期',
        period_1: 1,
        period_2: 2,
        period_3: 3,
        period_4: 1,
        period_5: 2,
        period_6: 3,
        total: 5000,
      },
      {
        periodName: '6期',
        period_1: 1,
        period_2: 2,
        period_3: 3,
        period_4: 1,
        period_5: 2,
        period_6: 3,
        total: 5000,
      },
    ],
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
        children: [
          {
            key: '0-1-1',
            label: '循环-产品中类-01',
            children: [
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
            children: [
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
        children: [
          {
            key: '0-2-1',
            label: '非循环-产品中类-01',
            children: [
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
        key: 'periodName',
        label: '本期状态',
      },
      {
        key: 'period_0',
        label: 'M0',
      },
      {
        key: 'period_1',
        label: 'M1',
      },
      {
        key: 'period_2',
        label: 'M2',
      },
    ],
    data: [
      {
        periodName: 'M0',
        period_0: '98.45%',
        period_1: '98.45%',
        period_2: '98.45%',
      },
      {
        periodName: 'M1',
        period_0: '33.98%',
        period_1: '33.98%',
        period_2: '33.98%',
      },
    ],
  });
};

const getYaerMonthApi = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    data: [{ value: '2023-01' }, { value: '2023-02' }, { value: '2023-03' }],
  });
};

// 菜单管理相关
export default {
  // 样本定义
  [`POST ${baseUrl}/modelStep/preAnalyze/vintage/list`]: getList,
  [`POST ${baseUrl}/modelStep/preAnalyze/scroll/list`]: getList,
  [`POST ${baseUrl}/modelStep/preAnalyze/scroll/getRateListRequest`]: getRateListRequest,
  [`GET ${baseUrl}/modelStep/preAnalyze/condition/list`]: getConditionList,
  [`POST ${baseUrl}/modelStep/preAnalyze/scroll/getYaerMonthApi`]: getYaerMonthApi,
};
