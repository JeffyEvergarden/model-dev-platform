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
      variableList: [...list],
    },
  });
};

export default {
  // 缺失率
  [`GET ${baseUrl}/modelMange/featureEngineering/getFillFeatureMetrics`]: getLostList,
};
