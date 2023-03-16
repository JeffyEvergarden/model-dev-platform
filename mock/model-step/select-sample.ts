import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

const normalDeal = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '123rg',
    },
  });
};

const submit = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: {
      prepareSql: "insert overwrite dal.application_no_import select 字段名, '批次号' from 表名",
      batchNo: '111111111111',
    },
  });
};

const getSample = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: {
      sampleParam: {
        importType: '0',
        startTime: '2023-12-12',
        endTime: '2023-12-22',
        businessType: 'SX',
        prodCat: '产品大类1,产品大类2',
        channelCatM: '渠道中类',
        channelCatS: '渠道小类',
        custCat: '客群大类',
        custCatS: '客群小类',
        processName: '编排',
        tableName: 'hive表名',
        dimensionField: 'dimensionField',
        featureLabel: {
          featureCode: '1',
          // featureType: 'number',
          // operator: 'betweenAnd',
          // params: '10,10',

          // featureType: 'datetime',
          // operator: 'equal',
          // params: '2023-12-12 12:12:12',

          // featureType: 'datetime',
          // operator: 'betweenAnd',
          // params: '2023-12-12 12:12:12, 2023-12-13 13:12:13',

          featureType: 'string',
          operator: 'equal',
          params: '12',
        },
      },
    },
  });
};

const getModelLabelList = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: {
      featureList: [
        {
          featureCode: '0',
          featureName: 'boolean',
          featureType: 'boolean', //类型，如list/boolean
        },
        {
          featureCode: '1',
          featureName: 'string',
          featureType: 'string', //类型，如list/boolean
        },
        {
          featureCode: '2',
          featureName: 'number',
          featureType: 'number', //类型，如list/boolean
        },
        {
          featureCode: '3',
          featureName: 'datetime',
          featureType: 'datetime', //类型，如list/boolean
        },
        {
          featureCode: '4',
          featureName: 'list',
          featureType: 'list', //类型，如list/boolean
        },
      ],
      featureOperatorMap: {
        boolean: [
          { name: '等于', value: 'equal' }, //无
          { name: '为空', value: 'regMatch' }, //无
        ],
        string: [
          { name: '等于', value: 'equal' }, //下拉框
          { name: '为空', value: 'regMatch' }, //字符输入框
        ],
        number: [
          { name: '等于', value: 'equal' }, //数字输入框
          { name: '为空', value: 'betweenAnd' }, //数字范围
        ],
        datetime: [
          { name: '等于', value: 'equal' }, //日期时间选择
          { name: '为空', value: 'betweenAnd' }, //日期时间范围选择
        ],
        list: [
          { name: '等于', value: 'equal' }, //下拉框
          { name: '为空', value: 'betweenAnd' }, //无
        ],
      },
    },
  });
};

const getSelectionList = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: [
      { name: '操作符1', value: '11' },
      { name: '操作符2', value: '12' },
    ],
  });
};

const getParams = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: {
      prodTree: [
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
      processList: [
        { name: '编排1', value: '1' },
        { name: '编排1', value: '1' },
      ],
    },
  });
};

const getProcessList = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: [
      { name: '编排1', value: '11' },
      { name: '编排2', value: '12' },
    ],
  });
};

export default {
  [`POST ${baseUrl}/sampleSelection/submit`]: submit,
  [`POST ${baseUrl}/sampleSelection/confirm`]: normalDeal,
  [`POST ${baseUrl}/sampleSelection/nextStage`]: normalDeal,
  [`GET ${baseUrl}/sampleSelection/getModelLabelList`]: getModelLabelList,
  [`GET ${baseUrl}/sampleSelection/getSelectionList`]: getSelectionList,
  [`GET ${baseUrl}/sampleSelection/getParams`]: getParams,
  [`GET ${baseUrl}/sampleSelection/getSample`]: getSample,
  [`GET ${baseUrl}/sampleSelection/getProcessList`]: getProcessList,
};
