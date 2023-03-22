import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

const normalDeal = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '成功',
    },
  });
};

const rebuild = (req: any, res: any) => {
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
      desc: '成功',
    },
    result: {
      itmModelRegisCode: '123',
      sampleTable: '样本数据表名',
      modelBuildMethod: '建模方法',
      penalty: '惩罚项',
      solver: 'solver',
      lrc: 'lrc',
      lrMaxIter: '迭代次数',
      varBinningType: '分箱方式',
      varBoxNum: 10,
      minSampleRate: '0.1',
      emptySeparate: '1',
      variableList: [
        { variable: 1, variableName: '变量1' },
        { variable: 2, variableName: '变量2' },
      ],
      isStepwise: '1',
      estimator: 'estimator',
      direction: 'forward',
      criterion: 'aic',
      stepwiseMaxIter: '12',
      isVif: '1',
      vifOperator: '1',
      vifThreshold: '12',
      baseScore: '1',
      baseOdds: '12',
      rate: '1',
      scoreBinningType: '',
      scoreBoxNum: 12,
      preanalysisRollRateCondition: {
        paymentTime: '2023-01,2023-02',
        loadTerm: '',
      },
      featureMetricsRequest: {
        binningType: '卡方分箱',
        categoryCustomValue: '2',
        categoryFillType: '自定义',
        numberFillType: '均值',
      },
      featureBinningResults: [...list],
      variables: 'name0,name1',
    },
  });
};

export default {
  [`POST ${baseUrl}/modelBuild/build`]: normalDeal,
  [`POST ${baseUrl}/modelBuild/rebuild`]: rebuild,
  [`POST ${baseUrl}/stage/getDetailInfo`]: rebuild,
  [`POST ${baseUrl}/modelBuild/nextProcess`]: normalDeal,
};
