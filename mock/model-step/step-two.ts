import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

const getDatabaseList = (req: any, res: any) => {
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

const getColumnsList = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    data: [
      {
        key: 'name',
        name: '姓名',
        isIndex: true,
      },
      {
        key: 'age',
        name: '年龄',
        isIndex: false,
      },
      {
        key: 'address',
        name: '住址',
        isIndex: false,
      },
      {
        key: 'useName',
        name: '用户名',
        isIndex: false,
      },
      {
        name: '创建时间',
        key: 'creator',
        isIndex: false,
      },
      {
        name: '主机',
        key: 'ip',
        isIndex: false,
      },
    ],
  });
};

const normalDeal = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
  });
};

// 菜单管理相关
export default {
  // 模型管理相关
  [`GET ${baseUrl}/database/list`]: getDatabaseList, // 获取模型管理列表
  [`GET ${baseUrl}/database/columnlist`]: getColumnsList,
};
