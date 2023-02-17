import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

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
      variableRelevanceData: {
        rowList: ['fea1', 'fea2', 'fea3'], //行标题
        correlationList: [
          { name: 'fea1', fea1: '1.0', fea2: '0.5', fea3: '0.45' },
          { name: 'fea2', fea1: '0.5', fea2: '1.0', fea3: '0.6' },
          { name: 'fea3', fea1: '0.45', fea2: '0.6', fea3: '1.0' },
        ],
      },
      //评分卡-计算逻辑
      scoreCardLogicList: [
        {
          variable: '变量名称1',
          variableName: '变量中文名1',
          boxList: [
            {
              boxGroup: '[-inf ~ 3.0)或nan', //分箱范围
              boxGroupScore: '64.29', //分箱对应分数
              trainBadRate: '36.25%', //训练坏比率
              validBadRate: '36.25%', //验证坏比率
              trainGroupRate: '36.25%', //训练该箱占比
              validGroupRate: '36.25%', //验证该箱占比
            },
            {
              boxGroup: '[3.0 ~ 5.0)',
              boxGroupScore: '39.45',
              trainBadRate: '34.89%',
              validBadRate: '34.89%',
              trainGroupRate: '34.89%',
              validGroupRate: '34.89%',
            },
            {
              boxGroup: '[5.0 ~ inf)',
              boxGroupScore: '12.28',
              trainBadRate: '56.92%',
              validBadRate: '56.92%',
              trainGroupRate: '56.92%',
              validGroupRate: '56.92%',
            },
          ],
        },
        {
          variable: '变量名称2',
          variableName: '中文含义2',
          boxList: [
            {
              boxGroup: '[-inf ~ 3.0)或nan', //分箱范围
              boxGroupScore: '64.29', //分箱对应分数
              trainBadRate: '36.25%', //训练坏比率
              validBadRate: '36.25%', //验证坏比率
              trainGroupRate: '36.25%', //训练该箱占比
              validGroupRate: '36.25%', //验证该箱占比
            },
            {
              boxGroup: '[3.0 ~ 5.0)',
              boxGroupScore: '39.45',
              trainBadRate: '34.89%',
              validBadRate: '34.89%',
              trainGroupRate: '34.89%',
              validGroupRate: '34.89%',
            },
            {
              boxGroup: '[5.0 ~ inf)',
              boxGroupScore: '12.28',
              trainBadRate: '56.92%',
              validBadRate: '56.92%',
              trainGroupRate: '56.92%',
              validGroupRate: '56.92%',
            },
          ],
        },
      ],
      //集合KS
      collectionKsObj: {
        trainKsValue: '36.25%',
        validKsValue: '55.25%',
        otherValidKsList: [
          { name: '验证集1', value: '23%' },
          { name: '验证集2', value: '23%' },
        ],
      },
      //年月ks
      monthKsObj: {
        '2022-01-02': '36.25%',
        '2022-01-03': '36.25%',
        '2022-01-04': '36.25%',
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

export default {
  [`GET ${baseUrl}/compare/getVersionNameList`]: getVersionNameList,
  [`GET ${baseUrl}/compare/getModelStructureParam`]: getModelStructureParam,
  [`GET ${baseUrl}/compare/getModelStructureResult`]: getModelStructureResult,
  [`POST ${baseUrl}/compare/nextStage`]: normalDel,
};
