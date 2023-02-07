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
    };
  });

  res.json({
    status: {},
    code: successCode,
    desc: '',
    totalPage: 7,
    pageSize: 10,
    current: 1,
    tableData: list,
  });
};

const getSummaryList = (req: any, res: any) => {
  res.json({
    status: {},
    code: successCode,
    desc: '',
    data: {
      allItemNum: 10,
      incompleteNum: 7,
      completeNum: 3,
    },
  });
};

const normalDeal = (req: any, res: any) => {
  res.json({
    code: successCode,
  });
};

// 菜单管理相关
export default {
  // 模型管理相关
  [`POST ${baseUrl}/myWorkbench/getModelInfoList`]: getList, // 获取模型管理列表
  [`POST ${baseUrl}/myWorkbench/myModelInfoSummary`]: getSummaryList,
  [`POST ${baseUrl}/model/add`]: normalDeal,
  [`POST ${baseUrl}/model/delete`]: normalDeal,
  [`POST ${baseUrl}/model/info`]: normalDeal,
};
