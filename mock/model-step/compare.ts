import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

const codeListData = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    data: {
      total: 10,
      pageSize: 5,
      pageNum: 1,
      list: [],
    },
  });
};

const relateCodeListGet = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    data: {
      total: 60,
      pageSize: 10,
      pageNum: 1,
      list: [
        {
          key: 'row1',
          name: '变量一',
          val_1: '1.00',
          val_2: '0.23',
          val_3: '0.35',
          val_4: '0.05',
          val_5: '0.05',
          val_6: '0.05',
          val_7: '0.05',
          val_8: '0.05',
          val_9: '0.05',
          val_10: '0.05',
        },
        {
          key: 'row2',
          name: '变量二',
          val_1: '0.01',
          val_2: '1.00',
          val_3: '0.15',
          val_4: '0.05',
          val_5: '0.15',
          val_6: '0.05',
          val_7: '0.05',
          val_8: '0.05',
          val_9: '0.05',
          val_10: '0.05',
        },
        {
          key: 'row3',
          name: '变量三',
          val_1: '0.02',
          val_2: '0.14',
          val_3: '1.00',
          val_4: '0.05',
          val_5: '0.45',
          val_6: '0.15',
          val_7: '0.05',
          val_8: '0.05',
          val_9: '0.05',
          val_10: '0.05',
        },
        {
          key: 'row4',
          name: '变量四',
          val_1: '0.16',
          val_2: '-0.02',
          val_3: '0.05',
          val_4: '1.00',
          val_5: '0.05',
          val_6: '0.05',
          val_7: '0.05',
          val_8: '0.05',
          val_9: '0.05',
          val_10: '0.05',
        },
        {
          key: 'row5',
          name: '变量五',
          val_1: '0.56',
          val_2: '0.05',
          val_3: '0.05',
          val_4: '0.05',
          val_5: '1.00',
          val_6: '0.15',
          val_7: '0.05',
          val_8: '0.05',
          val_9: '0.05',
          val_10: '0.05',
        },
        {
          key: 'row7',
          name: '变量七',
          val_1: '-0.09',
          val_2: '-0.52',
          val_3: '0.05',
          val_4: '0.05',
          val_5: '0.05',
          val_6: '1.00',
          val_7: '0.05',
          val_8: '0.05',
          val_9: '0.05',
          val_10: '0.05',
        },
        {
          key: 'row8',
          name: '变量八',
          val_1: '-0.09',
          val_2: '-0.52',
          val_3: '0.05',
          val_4: '0.05',
          val_5: '0.05',
          val_6: '1.00',
          val_7: '0.05',
          val_8: '0.05',
          val_9: '0.05',
          val_10: '0.05',
        },
        {
          key: 'row9',
          name: '变量九',
          val_1: '-0.09',
          val_2: '-0.52',
          val_3: '0.05',
          val_4: '0.05',
          val_5: '0.05',
          val_6: '1.00',
          val_7: '0.05',
          val_8: '0.05',
          val_9: '0.05',
          val_10: '0.05',
        },
        {
          key: 'row10',
          name: '变量十',
          val_1: '-0.09',
          val_2: '-0.52',
          val_3: '0.05',
          val_4: '0.05',
          val_5: '0.05',
          val_6: '1.00',
          val_7: '0.05',
          val_8: '0.05',
          val_9: '0.05',
          val_10: '0.05',
        },
      ],
      columnsRelate: [
        { name: '变量一', dataIndex: 'val_1' },
        { name: '变量二', dataIndex: 'val_2' },
        { name: '变量三', dataIndex: 'val_3' },
        { name: '变量四', dataIndex: 'val_4' },
        { name: '变量五', dataIndex: 'val_5' },
        { name: '变量六', dataIndex: 'val_6' },
        { name: '变量七', dataIndex: 'val_7' },
        { name: '变量八', dataIndex: 'val_8' },
        { name: '变量九', dataIndex: 'val_9' },
        { name: '变量十', dataIndex: 'val_10' },
      ],
    },
  });
};

const getScoreCardList = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    data: {
      total: 6,
      pageSize: 10,
      pageNum: 1,
      list: [
        {
          id: 'a',
          name: '变量名称1',
          nameZH: '中文含义',
          dividerList: [
            {
              id: 1,
              divider: '[-inf ~ 3.0)或nan',
              score: '64.29',
              badRate: '36.25%',
              trateRate: '36.25%',
              trateCurrentRate: '36.25%',
              verifyCurrentRate: '36.25%',
            },
            {
              id: 2,
              divider: '[3.0 ~ 5.0)',
              score: '39.45',
              badRate: '34.89%',
              trateRate: '34.89%',
              trateCurrentRate: '34.89%',
              verifyCurrentRate: '34.89%',
            },
            {
              id: 3,
              divider: '[5.0 ~ inf)',
              score: '12.28',
              badRate: '56.92%',
              trateRate: '56.92%',
              trateCurrentRate: '56.92%',
              verifyCurrentRate: '56.92%',
            },
          ],
        },
        {
          id: 'b',
          name: '变量名称2',
          nameZH: '中文含义2',
          dividerList: [
            {
              id: 1,
              divider: '[-inf ~ 3.0)或nan',
              score: '64.29',
              badRate: '36.25%',
              trateRate: '36.25%',
              trateCurrentRate: '36.25%',
              verifyCurrentRate: '36.25%',
            },
            {
              id: 2,
              divider: '[3.0 ~ 5.0)',
              score: '39.45',
              badRate: '34.89%',
              trateRate: '34.89%',
              trateCurrentRate: '34.89%',
              verifyCurrentRate: '34.89%',
            },
            {
              id: 3,
              divider: '[5.0 ~ inf)',
              score: '12.28',
              badRate: '56.92%',
              trateRate: '56.92%',
              trateCurrentRate: '56.92%',
              verifyCurrentRate: '56.92%',
            },
          ],
        },
        {
          id: 'c',
          name: '变量名称3',
          nameZH: '中文含义3',
          dividerList: [
            {
              id: 1,
              divider: '[-inf ~ 3.0)或nan',
              score: '64.29',
              badRate: '36.25%',
              trateRate: '36.25%',
              trateCurrentRate: '36.25%',
              verifyCurrentRate: '36.25%',
            },
            {
              id: 2,
              divider: '[3.0 ~ 5.0)',
              score: '39.45',
              badRate: '34.89%',
              trateRate: '34.89%',
              trateCurrentRate: '34.89%',
              verifyCurrentRate: '34.89%',
            },
            {
              id: 3,
              divider: '[5.0 ~ inf)',
              score: '12.28',
              badRate: '56.92%',
              trateRate: '56.92%',
              trateCurrentRate: '56.92%',
              verifyCurrentRate: '56.92%',
            },
          ],
        },
      ],
    },
  });
};

const trateAndVerifyDataApi = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    data: {
      total: 6,
      pageSize: 10,
      pageNum: 1,
      listTrate: [
        {
          value1: '评分区间',
          value2: '总样本数',
          value3: '好样本数',
          value4: '坏样本数',
          value5: '坏样本率',
          value6: '累计好样本率',
          value7: '累计坏样本率',
          value8: 'KS',
          value9: 'lift',
        },
      ],
      listVerify: [
        {
          value1: '评分区间',
          value2: '总样本数',
          value3: '好样本数',
          value4: '坏样本数',
          value5: '坏样本率',
          value6: '累计好样本率',
          value7: '累计坏样本率',
          value8: 'KS',
          value9: 'lift',
        },
      ],
    },
  });
};

const stableDataQueryApi = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    data: {
      total: 6,
      pageSize: 10,
      pageNum: 1,
      list: [
        {
          value1: '评分区间',
          value2: '训练集占比',
          value3: '验证集占比',
          value4: '其他验证1占比',
          value5: '其他验证2占比',
          value6: 'PSI_valid',
          value7: 'PSI_valid1',
          value8: 'PSI_valid2',
        },
        {
          value1: '合计',
          value2: '训练集占比_合计',
          value3: '验证集占比_合计',
          value4: '其他验证1占比_合计',
          value5: '其他验证2占比_合计',
          value6: 'PSI_valid_合计',
          value7: 'PSI_valid1_合计',
          value8: 'PSI_valid2_合计',
        },
        {
          value1: '基准线1',
          value2: '-',
          value3: '-',
          value4: '-',
          value5: '-',
          value6: '0.1',
          value7: '0.1',
          value8: '0.1',
        },
        {
          value1: '基准线2',
          value2: '-',
          value3: '-',
          value4: '-',
          value5: '-',
          value6: '0.25',
          value7: '0.25',
          value8: '0.1',
        },
      ],
      otherVerifyList: [
        {
          name: '其他验证1占比',
          dataIndex: 'value4',
        },
        {
          name: '其他验证2占比',
          dataIndex: 'value5',
        },
      ],
      PSI_valid_List: [
        {
          name: 'PSI_valid1',
          dataIndex: 'value7',
        },
        {
          name: 'PSI_valid2',
          dataIndex: 'value8',
        },
      ],
    },
  });
};

const varCodeStableQueryApi = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    data: {
      total: 6,
      pageSize: 10,
      pageNum: 1,
      list: [
        {
          value1: '变量名称',
          value2: '中文名称',
          value3: 'PSI_valid',
          value4: 'PSI_valid1',
          value5: 'PSI_valid2',
          value6: '基准线1',
          value7: '基准线2',
        },
        {
          value1: '变量名称',
          value2: '中文名称',
          value3: 'PSI_valid',
          value4: 'PSI_valid1',
          value5: 'PSI_valid2',
          value6: '基准线1',
          value7: '基准线2',
        },
      ],
      columnsVarCodeStableLsit: [
        {
          name: 'PSI_valid1',
          dataIndex: 'value4',
        },
        {
          name: 'PSI_valid2',
          dataIndex: 'value5',
        },
        {
          name: '基准线1',
          dataIndex: 'value6',
        },
        {
          name: '基准线2',
          dataIndex: 'value7',
        },
      ],
    },
  });
};

const getVersionNameList = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '成功',
    },
    result: ['model1-1', 'model1-2', 'model1-3', 'model1-4'],
  });
};

const getModelStructureParam = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '成功',
    },
    result: {
      modelBuildMethod: '建模方法',
      penalty: '惩罚项',
      solver: 'solver',
      lrc: '正则化系数',
      lrMaxIter: '迭代次数',
      variables: 'variables',
      varBinningType: '分箱方式',
      boxNum: '箱数',
      minSampleRate: '每箱最小样本占比',
      emptySeparate: '空值单独分箱',
      isStepwise: '1', //是否进行逐步回归，1-是 0-否
      estimator: 'estimator值',
      direction: '方向',
      criteria: '评判标准',
      stepwiseMaxIter: '最大循环次数',
      isVif: '1', //是否进行多重共线性检验，1-是 0-否
      vifOperator: '<',
      vifThreshold: '10',
      baseScore: '基准分数',
      pdo: '比率翻倍的分值',
      baseOdds: '基准好坏比',
      rate: '设定的比base_odds好坏的倍数',
      scoreBinningType: '评分分箱方式',
    },
  });
};

const getModelStructureResult = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '成功',
    },
    result: {
      //入模变量列表
      inputVariableList: [
        {
          sortId: 0,
          variable: '变量名称1',
          variableName: '中文名称',
          variableSource: '变量来源',
          freeDegree: '自由度',
          coef_: 'coef_',
          vif: 'VIF',
          waldTest: 'wald_test',
          pvalue: 'p_value',
          iv: 'iv',
        },
        {
          sortId: 1,
          variable: '变量名称2',
          variableName: '中文名称',
          variableSource: '变量来源',
          freeDegree: '自由度',
          coef_: 'coef_',
          vif: 'VIF',
          waldTest: 'wald_test',
          pvalue: 'p_value',
          iv: 'iv',
        },
        {
          sortId: 2,
          variable: '变量名称3',
          variableName: '中文名称',
          variableSource: '变量来源',
          freeDegree: '自由度',
          coef_: 'coef_',
          vif: 'VIF',
          waldTest: 'wald_test',
          pvalue: 'p_value',
          iv: 'iv',
        },
        {
          sortId: 3,
          variable: '变量名称4',
          variableName: '中文名称',
          variableSource: '变量来源',
          freeDegree: '自由度',
          coef_: 'coef_',
          vif: 'VIF',
          waldTest: 'wald_test',
          pvalue: 'p_value',
          iv: 'iv',
        },
        {
          sortId: 4,
          variable: '变量名称5',
          variableName: '中文名称',
          variableSource: '变量来源',
          freeDegree: '自由度',
          coef_: 'coef_',
          vif: 'VIF',
          waldTest: 'wald_test',
          pvalue: 'p_value',
          iv: 'iv',
        },
        {
          sortId: 5,
          variable: '变量名称6',
          variableName: '中文名称',
          variableSource: '变量来源',
          freeDegree: '自由度',
          coef_: 'coef_',
          vif: 'VIF',
          waldTest: 'wald_test',
          pvalue: 'p_value',
          iv: 'iv',
        },
        {
          sortId: 6,
          variable: '变量名称7',
          variableName: '中文名称',
          variableSource: '变量来源',
          freeDegree: '自由度',
          coef_: 'coef_',
          vif: 'VIF',
          waldTest: 'wald_test',
          pvalue: 'p_value',
          iv: 'iv',
        },
        {
          sortId: 7,
          variable: '变量名称8',
          variableName: '中文名称',
          variableSource: '变量来源',
          freeDegree: '自由度',
          coef_: 'coef_',
          vif: 'VIF',
          waldTest: 'wald_test',
          pvalue: 'p_value',
          iv: 'iv',
        },
        {
          sortId: 8,
          variable: '变量名称9',
          variableName: '中文名称',
          variableSource: '变量来源',
          freeDegree: '自由度',
          coef_: 'coef_',
          vif: 'VIF',
          waldTest: 'wald_test',
          pvalue: 'p_value',
          iv: 'iv',
        },
        {
          sortId: 9,
          variable: '变量名称10',
          variableName: '中文名称',
          variableSource: '变量来源',
          freeDegree: '自由度',
          coef_: 'coef_',
          vif: 'VIF',
          waldTest: 'wald_test',
          pvalue: 'p_value',
          iv: 'iv',
        },
        {
          sortId: 10,
          variable: '变量名称11',
          variableName: '中文名称',
          variableSource: '变量来源',
          freeDegree: '自由度',
          coef_: 'coef_',
          vif: 'VIF',
          waldTest: 'wald_test',
          pvalue: 'p_value',
          iv: 'iv',
        },
      ],
      //变量相关性列表
      variableRelevanceList: [],
      //评分卡-计算逻辑
      scoreCardLogicList: [],
      //集合KS
      collectionKsObj: {},
      //年月ks
      monthKsObj: {},
      //数据集分布（训练集分布列表、验证集分布列表
      dataScoreList: [],
      //模型稳定性
      modelStabilityList: [],
      //变量稳定性
      variableStabilityList: [],
    },
  });
};

export default {
  [`POST ${baseUrl}/robot/testWhiteList/codeListData`]: codeListData,
  [`POST ${baseUrl}/robot/testWhiteList/relateCodeListGet`]: relateCodeListGet,
  [`POST ${baseUrl}/robot/testWhiteList/scoreCardListApi`]: getScoreCardList,
  [`POST ${baseUrl}/robot/testWhiteList/trateAndVerifyDataApi`]: trateAndVerifyDataApi,
  [`POST ${baseUrl}/robot/testWhiteList/stableDataQueryApi`]: stableDataQueryApi,
  [`POST ${baseUrl}/robot/testWhiteList/varCodeStableQueryApi`]: varCodeStableQueryApi,
  [`GET ${baseUrl}/compare/getVersionNameList`]: getVersionNameList,
  [`GET ${baseUrl}/compare/getModelStructureParam`]: getModelStructureParam,
  [`GET ${baseUrl}/compare/getModelStructureResult`]: getModelStructureResult,
};
