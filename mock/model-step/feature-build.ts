import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

const getLostList = (req: any, res: any) => {
  let list = new Array(21).fill(1).map((item: any, index: number) => {
    const obj = {
      1: 'number',
      2: 'string',
      3: 'boolean',
      4: 'datetime',
      5: 'list',
    };
    return {
      variable: '变量名称' + index,
      variableName: '中文名称' + index,
      variableType: obj[Math.ceil(Math.random() * 5)],
      trainMissRate: (Math.random() * 100).toFixed(2) + '%',
      validMissRate: (Math.random() * 100).toFixed(2) + '%',
      trainKs: (Math.random() * 100).toFixed(2) + '%',
      validKs: (Math.random() * 100).toFixed(2) + '%',
      trainIv: (Math.random() * 100).toFixed(2) + '%',
      validIv: (Math.random() * 100).toFixed(2) + '%',
      trainPsi: (Math.random() * 100).toFixed(2) + '%',
      validPsi: (Math.random() * 100).toFixed(2) + '%',
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
      head: [
        {
          name: '变量名称',
          code: 'variable',
        },
        {
          name: '中文名称',
          code: 'variableName',
        },
        {
          name: '变量类型',
          code: 'variableType',
        },
        {
          name: '缺失率_train',
          code: 'trainMissRate',
        },
        {
          name: '缺失率_valid',
          code: 'validMissRate',
        },
        {
          name: 'KS_train',
          code: 'trainKs',
        },
        {
          name: 'KS_valid',
          code: 'validKs',
        },
        {
          name: 'IV_train',
          code: 'trainIv',
        },
        {
          name: 'IV_valid',
          code: 'validIv',
        },
        {
          name: 'PSI_valid',
          code: 'validPsi',
        },
      ],
    },
  });
};

const getVarList = (req: any, res: any) => {
  let page = 1;
  let list = new Array(60).fill(1).map((item: any, index: number) => {
    return {
      variable: index,
      variableName: '阿斯拉大撒大大打啥接口22' + index,
      variableType: 'var' + Math.floor(Math.random() * 10),
      tick: Math.random() * 100 > 50 ? true : false,
    };
  });

  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result:
      // pageSize: req?.pageSize || 10,
      // totalPage: 21,
      // current: 1,
      [...list],
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
    result: [...list],
  });
};

const getVariableListForBinning = (req: any, res: any) => {
  const obj = {
    1: 'number',
    2: 'string',
    3: 'boolean',
    4: 'datetime',
    5: 'list',
  };

  let list = new Array(11).fill(1).map((item: any, index: number) => {
    return {
      variable: 'name' + index,
      variableName: '中文name' + index,
      variableType: obj[Math.ceil(Math.random() * 5)],
      // variableType: obj[index],
      binning: [
        {
          boxGroup: '(-inf,0)',
          trainBoxRate: '10%',
          validBoxRate: '20%',
          trainBadRate: '30%',
          validBadRate: '40%',
          trainKs: '5%',
          validKs: '2%',
          trainIv: '0%',
          validIv: '1%',
          trainPsi: '3%',
          validPsi: '4%',
        },
        {
          boxGroup: '(0,+inf)',
          trainBoxRate: '10%',
          validBoxRate: '20%',
          trainBadRate: '30%',
          validBadRate: '40%',
          trainKs: '5%',
          validKs: '2%',
          trainIv: '0%',
          validIv: '1%',
          trainPsi: '3%',
          validPsi: '4%',
        },
      ],
    };
  });

  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: [...list],
  });
};

export default {
  // 缺失率
  [`POST ${baseUrl}/featureEngineering/getFillFeatureMetrics`]: getLostList,
  [`POST ${baseUrl}/featureEngineering/getVariableMetricsListForBinning`]: getVarList,
  [`GET ${baseUrl}/featureEngineering/getVariableTypeList`]: getVariableTypeList,
  [`POST ${baseUrl}/featureEngineering/getVariableListForBinning`]: getVariableListForBinning,
};
