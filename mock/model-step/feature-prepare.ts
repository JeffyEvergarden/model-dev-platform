import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;
// 样本选择
const getTreeList = (req: any, res: any) => {
  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    resultCode: successCode,
    result: [
      {
        parentId: 'db_01',
        featureCategoryName: '数据库1',
        featureCategoryCode: '000db_01',
        categoryPath: '/000db_01',
        child: [
          {
            parentId: 'db_table_01',
            featureCategoryName: '表_01',
            featureCategoryCode: '000db_table_01',
            categoryPath: '/000db_table_01',
          },
          {
            parentId: 'db_table_02',
            featureCategoryName: '表_02',
            featureCategoryCode: '000db_table_02',
            categoryPath: '/000db_table_02',
          },
        ],
      },
      {
        parentId: 'db_02',
        featureCategoryName: '数据库2',
        featureCategoryCode: '000db_02',
        categoryPath: '/000db_02',
        child: [
          {
            parentId: 'db_table_03',
            featureCategoryName: '表_03',
            featureCategoryCode: '000db_table_03',
            categoryPath: '/000db_table_03',
          },
          {
            parentId: 'db_table_04',
            featureCategoryName: '表_04',
            featureCategoryCode: '000db_table_04',
            categoryPath: '/000db_table_04',
          },
        ],
      },
    ],
  });
};

const getVarList = (req: any, res: any) => {
  let page = 1;
  let list = new Array(21).fill(1).map((item: any, index: number) => {
    let num = Math.ceil(Math.random() * 1000);
    return {
      featureName: '阿斯拉大' + num,
      featureCode: num,
    };
  });

  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: { tableData: [...list] },
  });
};

const getInfo = (req: any, res: any) => {
  let list = new Array(21).fill(1).map((item: any, index: number) => {
    return {
      featureName: '阿斯拉大' + index,
      featureCode: index,
    };
  });

  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    result: {
      featureVOList: [...list],
    },
  });
};

// 菜单管理相关
export default {
  // 样本定义
  [`GET ${baseUrl}/featurePrepare/getFeatureCatTree`]: getTreeList,
  [`POST ${baseUrl}/featurePrepare/findFeatureByCategoryName`]: getVarList,
  [`POST ${baseUrl}/featurePrepare/findFeature`]: getVarList,
  [`POST ${baseUrl}/featurePrepare/submit`]: getVarList,
  [`GET ${baseUrl}/featurePrepare/getModelStageInfo`]: getInfo,
  [`post ${baseUrl}/featurePrepare/reset`]: getInfo,
};
