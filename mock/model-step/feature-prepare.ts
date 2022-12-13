import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;
// 样本选择
const getTreeList = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    data: [
      {
        key: 'db_01',
        name: '数据库1',
        children: [
          {
            key: 'db_table_01',
            name: '表_01',
          },
          {
            key: 'db_table_02',
            name: '表_02',
          },
        ],
      },
      {
        key: 'db_02',
        name: '数据库2',
        children: [
          {
            key: 'db_table_03',
            name: '表_03',
          },
          {
            key: 'db_table_04',
            name: '表_04',
          },
        ],
      },
    ],
  });
};

// 菜单管理相关
export default {
  // 样本定义
  [`GET ${baseUrl}/modelStep/featurePrepare/tree/list`]: getTreeList,
};
