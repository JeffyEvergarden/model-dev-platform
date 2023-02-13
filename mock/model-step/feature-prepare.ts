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
        featureCategoryCode: 'db_01',
        categoryPath: '',
        child: [
          {
            parentId: 'db_table_01',
            featureCategoryName: '表_01',
            featureCategoryCode: 'db_table_01',
            categoryPath: '',
          },
          {
            parentId: 'db_table_02',
            featureCategoryName: '表_02',
            featureCategoryCode: 'db_table_02',
            categoryPath: '',
          },
        ],
      },
      {
        parentId: 'db_02',
        featureCategoryName: '数据库2',
        featureCategoryCode: 'db_02',
        categoryPath: '',
        child: [
          {
            parentId: 'db_table_03',
            featureCategoryName: '表_03',
            featureCategoryCode: 'db_table_03',
            categoryPath: '',
          },
          {
            parentId: 'db_table_04',
            featureCategoryName: '表_04',
            featureCategoryCode: 'db_table_04',
            categoryPath: '',
          },
        ],
      },
    ],
  });
};

const getVarList = (req: any, res: any) => {
  let page = 1;
  let list = new Array(21).fill(1).map((item: any, index: number) => {
    return {
      featureName: '阿斯拉大' + index,
      featureCode: index + 1 + page * 100,
    };
  });

  res.json({
    status: {
      code: successCode,
      desc: '',
    },
    data: {
      pageSize: req?.pageSize || 10,
      totalPage: 21,
      current: 1,
      tableData: [...list],
    },
  });
};

// 菜单管理相关
export default {
  // 样本定义
  [`GET ${baseUrl}/modelDev/featurePrepare/getFeatureCatTree`]: getTreeList,
  [`POST ${baseUrl}/modelDev/featurePrepare/findFeatureByCategoryName`]: getVarList,
  [`POST ${baseUrl}/modelDev/featurePrepare/submit`]: getVarList,
};
