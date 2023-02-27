import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

const getVersionNameList = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '成功',
    },
    result: [
      { name: 'model1-1', value: '1' },
      { name: 'model1-2', value: '2' },
      { name: 'model1-3', value: '3' },
      { name: 'model1-4', value: '4' },
    ],
  });
};

const getModelBuildParam = (req: any, res: any) => {
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

const getModelBuildResult = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '成功',
    },
    result: {
      //变量相关性列表
      variableRelevanceData: {
        rowList: ['fea1', 'fea2', 'fea3'], //行标题
        correlationList: [
          { name: 'fea1', fea1: '1.0', fea2: '0.5', fea3: '0.45' },
          { name: 'fea2', fea1: '0.5', fea2: '1.0', fea3: '0.6' },
          { name: 'fea3', fea1: '0.45', fea2: '0.6', fea3: '1.0' },
        ],
      },
      //集合KS
      collectionKsData: {
        rowList: ['训练集', '验证集', '其他验证集1'], //行标题
        collectionKsList: [
          {
            训练集: '36.25%',
            验证集: '36.25%',
            其他验证集1: '36.25%',
          },
        ],
      },
      //年月ks
      monthKsData: {
        rowList: ['2021-02', '2021-03'], //行标题
        monthKsList: [
          {
            '2021-03': '36.25%',
            '2021-02': '36.25%',
          },
        ],
      },
      //数据集分布（训练集分布列表、验证集分布列表
      dataScoreList: [
        {
          datasetType: '1', //数据集类型
          scoreRang: '(0, 315]', //评分区间
          totalSampleNum: '5040', //总样本数
          goodSampleNum: '489', //好样本数
          badSampleNum: '452', //坏样本数
          badSampleRate: '36.25%', //坏样本率
          totalGoodSampleRate: '36.25%', //累计好样本率
          totalBadSampleRate: '36.25%', //总样本数
          ks: '36.25%',
          lift: '2.03',
        },
        {
          datasetType: '2', //数据集类型
          scoreRang: '(2, 315]', //评分区间
          totalSampleNum: '5040', //总样本数
          goodSampleNum: '489', //好样本数
          badSampleNum: '452', //坏样本数
          badSampleRate: '36.25%', //坏样本率
          totalGoodSampleRate: '36.25%', //累计好样本率
          totalBadSampleRate: '36.25%', //总样本数
          ks: '36.25%',
          lift: '2.03',
        },
      ],
      //模型稳定性
      modelStabilityList: [
        {
          scoreRang: '(2, 315]', //评分区间
          trainRate: '36.25%', //训练集占比
          validRate: '36.25%',
          otherValidRateList: [
            //其他验证
            { name: '验证集1', value: '23%' },
            { name: '验证集2', value: '23%' },
          ],
          PSI_train: '0.2685', //训练集PSI指标值
          PSI_valid: '0.2685', //验证集PSI指标值
          otherValidPsiList: [
            //其他验证1PSI指标值
            { name: 'PSI_valid1', value: '23%' },
            { name: 'PSI_valid2', value: '23%' },
          ],
        },
        {
          scoreRang: '(3, 415]', //评分区间
          trainRate: '37.88%', //训练集占比
          validRate: '37.88%',
          otherValidRateList: [
            //其他验证
            { name: '验证集1', value: '23%' },
            { name: '验证集2', value: '23%' },
          ],
          PSI_train: '0.2685', //训练集PSI指标值
          PSI_valid: '0.2685', //验证集PSI指标值
          otherValidPsiList: [
            //其他验证1PSI指标值
            { name: 'PSI_valid1', value: '23%' },
            { name: 'PSI_valid2', value: '23%' },
          ],
        },
      ],
      //变量稳定性
      variableStabilityList: [
        {
          variable: '变量名称', //变量
          variableName: '中文名称', //变量中文名
          PSI_valid: '0.5232', //验证集变量值PSI指标值
          otherPsiValidList: [
            { name: 'PSI_valid1', value: '0.5232' },
            { name: 'PSI_valid2', value: '0.5232' },
          ],
        },
        {
          variable: '变量名称2', //变量
          variableName: '中文名称2', //变量中文名
          PSI_valid: '0.5232', //验证集变量值PSI指标值
          otherPsiValidList: [
            { name: 'PSI_valid1', value: '0.5232' },
            { name: 'PSI_valid2', value: '0.5232' },
          ],
        },
      ],
    },
  });
};

const normalDel = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '成功',
    },
  });
};

const getInputVariableApi = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '成功',
    },
    result: {
      current: 1,
      pageSize: 10,
      totalSize: 100,
      tableData: [
        {
          id: 0,
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
          id: 1,
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
          id: 2,
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
          id: 3,
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
          id: 4,
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
          id: 5,
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
          id: 6,
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
          id: 7,
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
          id: 8,
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
          id: 9,
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
          id: 10,
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
    },
  });
};

const getModelScoreCalcLogic = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '成功',
    },
    result: {
      current: 1,
      pageSize: 10,
      totalSize: 100,
      tableData: [
        {
          variable: '变量名称1',
          variableName: '变量中文名1',
          scoreItemList: [
            {
              boxGroup: '[-inf ~ 3.0)或nan', //分箱范围
              score: '64.29', //分箱对应分数
              trainBadRate: '36.25%', //训练坏比率
              validBadRate: '36.25%', //验证坏比率
              trainRate: '36.25%', //训练该箱占比
              validRate: '36.25%', //验证该箱占比
            },
            {
              boxGroup: '[3.0 ~ 5.0)',
              score: '39.45',
              trainBadRate: '34.89%',
              validBadRate: '34.89%',
              trainRate: '34.89%',
              validRate: '34.89%',
            },
            {
              boxGroup: '[3.0 ~ 5.0)',
              score: '39.45',
              trainBadRate: '34.89%',
              validBadRate: '34.89%',
              trainRate: '34.89%',
              validRate: '34.89%',
            },
          ],
        },
        {
          variable: '变量名称2',
          variableName: '中文含义2',
          scoreItemList: [
            {
              boxGroup: '[3.0 ~ 5.0)',
              score: '39.45',
              trainBadRate: '34.89%',
              validBadRate: '34.89%',
              trainRate: '34.89%',
              validRate: '34.89%',
            },
            {
              boxGroup: '[3.0 ~ 5.0)',
              score: '39.45',
              trainBadRate: '34.89%',
              validBadRate: '34.89%',
              trainRate: '34.89%',
              validRate: '34.89%',
            },
            {
              boxGroup: '[3.0 ~ 5.0)',
              score: '39.45',
              trainBadRate: '34.89%',
              validBadRate: '34.89%',
              trainRate: '34.89%',
              validRate: '34.89%',
            },
          ],
        },
      ],
    },
  });
};

const getModelDatasetDistribution = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '成功',
    },
    result: {
      trainDataset: [
        {
          scoreRange: '评分区间',
          sampleTotal: '总样本数',
          sampleGood: '好样本数',
          sampleBad: '坏样本数',
          sampleBadRate: '坏样本率',
          addupGoodRate: '累计好样本率',
          addupBadRate: '累计坏样本率',
          ks: '30.01%',
          lift: '2.03',
        },
      ],
      validDataset: [
        {
          scoreRange: '评分区间',
          sampleTotal: '总样本数',
          sampleGood: '好样本数',
          sampleBad: '坏样本数',
          sampleBadRate: '坏样本率',
          addupGoodRate: '累计好样本率',
          addupBadRate: '累计坏样本率',
          ks: '30.01%',
          lift: '2.03',
        },
      ],
    },
  });
};

const getModelStability = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '成功',
    },
    result: {
      rateHeadList: ['训练集占比', '验证集占比', '其他验证1占比', '其他验证2占比'],
      psiHeadList: ['PSI_valid', 'PSI_valid1', 'PSI_valid2'],
      modelStabilityList: [
        {
          scoreRange: '(0,100)',
          训练集占比: '20.01%',
          验证集占比: '30.01%',
          其他验证1占比: '40.01%',
          其他验证2占比: '50.01%',
          PSI_valid: '0.003',
          PSI_valid1: '0.002',
          PSI_valid2: '0.001',
        },
        {
          scoreRange: '(100,200)',
          训练集占比: '20.01%',
          验证集占比: '30.01%',
          其他验证1占比: '40.01%',
          其他验证2占比: '50.01%',
          PSI_valid: '0.003',
          PSI_valid1: '0.002',
          PSI_valid2: '0.001',
        },
        {
          scoreRange: '基准线1',
          训练集占比: '-',
          验证集占比: '-',
          其他验证1占比: '-',
          其他验证2占比: '-',
          PSI_valid: '0.1',
          PSI_valid1: '0.1',
          PSI_valid2: '0.1',
        },
      ],
    },
  });
};

const getVariableStability = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '成功',
    },
    result: {
      psiHeadList: ['PSI_valid', 'PSI_valid1'],
      current: 1,
      pageSize: 2,
      totalSize: 10,
      tableData: [
        {
          variable: 'age',
          variableName: '年龄',
          PSI_valid: '0.02',
          PSI_valid1: '0.04',
        },
        {
          variable: 'sex',
          variableName: '性别',
          PSI_valid: '0.02',
          PSI_valid1: '0.04',
        },
      ],
    },
  });
};

const getModelSortInfo = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '成功',
    },
    result: {
      rateHeadList: ['训练集', '跨期验证', '其他验证1'],
      modelSortInfoList: [
        {
          scoreRange: '(0,100)',
          训练集: '23.01%',
          跨期验证: '33.1%',
          其他验证1: '34.1%',
        },
        {
          scoreRange: '(100,200)',
          训练集: '23.01%',
          跨期验证: '33.1%',
          其他验证1: '34.1%',
        },
      ],
    },
  });
};

export default {
  [`GET ${baseUrl}/compare/getVersionInfoList`]: getVersionNameList,
  [`GET ${baseUrl}/compare/getModelBuildParam`]: getModelBuildParam,
  [`POST ${baseUrl}/compare/getModelBuildResult`]: getModelBuildResult,
  [`POST ${baseUrl}/compare/nextStage`]: normalDel,

  [`POST ${baseUrl}/compare/getInputVariable`]: getInputVariableApi,
  [`POST ${baseUrl}/compare/getModelScoreCalcLogic`]: getModelScoreCalcLogic,
  [`POST ${baseUrl}/compare/getModelDatasetDistribution`]: getModelDatasetDistribution,
  [`POST ${baseUrl}/compare/getModelStability`]: getModelStability,
  [`POST ${baseUrl}/compare/getVariableStability`]: getVariableStability,
  [`POST ${baseUrl}/compare/getModelSortInfo`]: getModelSortInfo,
};
