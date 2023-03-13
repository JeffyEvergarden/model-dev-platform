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
      variableNames: '变量1,变量2',
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
    },
  });
};

export default {
  [`POST ${baseUrl}/modelBuild/build`]: normalDeal,
  [`POST ${baseUrl}/modelBuild/rebuild`]: rebuild,
  [`POST ${baseUrl}/stage/getDetailInfo`]: rebuild,
  [`POST ${baseUrl}/modelBuild/nextProcess`]: normalDeal,
};
