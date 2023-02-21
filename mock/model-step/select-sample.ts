import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

const normalDeal = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '',
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

const getDetailInfo = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: {
      sampleParam: {
        importType: '0',
        startTime: '2023-12-23',
        endTime: '2023-12-24',
        businessType: '数据维度',
        prodCat: '产品大类',
        channelCatM: '渠道中类',
        channelCatS: '渠道小类',
        custCatS: '客群小类',
        processName: '编排',
        featureLabel: {
          tableName: 'hive表名，importType=1时有值',
          dimensionField: 'hive维度id字段，importType=1时有值',
          featureCode: '字段名',
          operator: '<',
          params: '10',
        },
      },
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
        startTime: '2023-12-23',
        endTime: '2023-12-24',
        businessType: '数据维度',
        prodCat: '产品大类',
        channelCatM: '渠道中类',
        channelCatS: '渠道小类',
        custCat: '客群大类',
        custCatS: '客群小类',
        processName: '编排',
        featureLabel: {
          tableName: 'hive表名，importType=1时有值',
          dimensionField: 'hive维度id字段，importType=1时有值',
          featureCode: '字段名',
          operator: '<',
          params: '10',
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

export default {
  [`POST ${baseUrl}/sampleSelection/submit`]: submit,
  [`POST ${baseUrl}/stage/getDetailInfo`]: getDetailInfo,
  [`POST ${baseUrl}/sampleSelection/confirm`]: normalDeal,
  [`POST ${baseUrl}/sampleSelection/getSample`]: getSample,
  [`POST ${baseUrl}/sampleSelection/nextStage`]: normalDeal,
  [`GET ${baseUrl}/sampleSelection/getModelLabelList`]: getModelLabelList,
  [`GET ${baseUrl}/sampleSelection/getSelectionList`]: getSelectionList,
};
