import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

const getList = (req: any, res: any) => {
  let list = new Array(11).fill(1).map((item: any, index: number) => {
    return {
      modelName: '阿斯拉大' + index,
      itmModelRegisCode: 100 + index,
      modelNo: index + 1,
      modelType: ['A', 'B', 'C', 'F', '其他'][Math.floor(Math.random() * 5)],
      currentStage: Math.floor(Math.random() * 10) + 1,
      modelStatus: Math.floor(Math.random() * 100) > 50 ? 0 : 1,
      creator: 'creater',
      createDate: '2023-01-31 11:11:11',
      currentStageStatus: Math.floor(Math.random() * 4),
      operate: Math.floor(Math.random() * 100) > 50 ? 'scan' : 'edit',
    };
  });

  res.json({
    status: { code: successCode, desc: '' },
    result: {
      totalPage: 7,
      totalSize: 7,
      pageSize: 10,
      current: 1,
      tableData: list,
    },
  });
};

const getInfo = (req: any, res: any) => {
  let list = new Array(41).fill(1).map((item: any, index: number) => {
    return {
      dataSet: '数据集' + index,
      modelStage: Math.floor(Math.random() * 10) + 1,
      database: '存放库' + index,
    };
  });

  res.json({
    status: { code: successCode, desc: '' },
    result: list,
  });
};

const getSummaryList = (req: any, res: any) => {
  res.json({
    status: { code: successCode, desc: '' },

    result: {
      allItemNum: 10,
      incompleteNum: 7,
      completeNum: 3,
    },
  });
};

const normalDeal = (req: any, res: any) => {
  res.json({
    status: { code: successCode, desc: '' },
    desc: '成功',
  });
};

const userList = (req: any, res: any) => {
  res.json({
    status: { code: successCode, desc: '' },
    result: ['梁山伯', '梁博'],
  });
};

// 菜单管理相关
export default {
  // 模型管理相关
  [`POST ${baseUrl}/myWorkbench/getModelInfoList`]: getList, // 获取模型管理列表
  [`POST ${baseUrl}/myWorkbench/myModelInfoSummary`]: getSummaryList,
  [`POST ${baseUrl}/model/add`]: normalDeal,
  [`POST ${baseUrl}/myWorkbench/deleteModelReport`]: normalDeal,
  [`GET ${baseUrl}/myWorkbench/getModelStageInfo`]: getInfo,
  [`GET ${baseUrl}/myWorkbench/getModelAnalysts`]: userList,
};
