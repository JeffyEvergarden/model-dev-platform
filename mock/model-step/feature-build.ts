import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

const getLostList = (req: any, res: any) => {
  let list = new Array(21).fill(1).map((item: any, index: number) => {
    return {
      variable: '变量名称' + index,
      variableName: '中文名称' + index,
      variableType: index + 1 * 100,
      trainMissRate: '',
      validMissRate: '',
      trainKs: '',
      validKs: '',
      trainIv: '',
      validIv: '',
      trainPsi: '',
      validPsi: '',
    };
  });

  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: {
      // pageSize: req?.pageSize || 10,
      // totalPage: 21,
      // current: 1,
      variableNum: '1000',
      numTypeNum: '500',
      otherTypeNum: '300',
      variableList: [...list],
    },
  });
};

const getVarList = (req: any, res: any) => {
  let page = 1;
  let list = new Array(60).fill(1).map((item: any, index: number) => {
    return {
      variable: index,
      variableName: '阿斯拉大' + index,
      variableType: Math.floor(Math.random() * 10),
    };
  });

  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: {
      // pageSize: req?.pageSize || 10,
      // totalPage: 21,
      // current: 1,
      variableList: [...list],
    },
  });
};

const getVariableTypeList = (req: any, res: any) => {
  let list = new Array(11).fill(1).map((item: any, index: number) => {
    return {
      typeCode: index,
      typeName: 'var' + index,
    };
  });

  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: {
      typeList: [...list],
    },
  });
};

const getVariableListForBinning = (req: any, res: any) => {
  let list = new Array(11).fill(1).map((item: any, index: number) => {
    return {
      variable: 'name' + index,
      variableName: '中文name' + index,
      variableType: '',
      boxGoup: '',
      trainBoxRate: '',
      validBoxRate: '',
      trainBadRate: '',
      validBadRate: '',
      trainKs: '',
      validKs: '',
      trainIv: '',
      validIv: '',
      trainPsi: '',
      validPsi: '',
    };
  });

  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: {
      variableMetricsList: [...list],
    },
  });
};

export default {
  // 缺失率
  [`GET ${baseUrl}/modelMange/featureEngineering/getFillFeatureMetrics`]: getLostList,
  [`GET ${baseUrl}/modelMange/featureEngineering/getVariableMetricsListForBinning`]: getVarList,
  [`GET ${baseUrl}/modelMange/featureEngineering/getVariableTypeList`]: getVariableTypeList,
  [`GET ${baseUrl}/modelMange/featureEngineering/getVariableListForBinning`]:
    getVariableListForBinning,
};
