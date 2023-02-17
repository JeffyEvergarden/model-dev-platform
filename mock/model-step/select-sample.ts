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

export default {
  [`POST ${baseUrl}/sampleSelection/submit`]: submit,
  [`POST ${baseUrl}/stage/getDetailInfo`]: getDetailInfo,
  [`POST ${baseUrl}/sampleSelection/confirm`]: normalDeal,
  [`POST ${baseUrl}/sampleSelection/getSample`]: getSample,
  [`POST ${baseUrl}/sampleSelection/nextStage`]: normalDeal,
};
