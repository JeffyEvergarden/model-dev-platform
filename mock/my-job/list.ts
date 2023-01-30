import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

const getList = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    data: {
      totalPage: 7,
      pageSize: 10,
      page: 1,
      list: [
        {
          itmModelRegisCode: 100,
          modelName: '文本机器人',
          modelDesc:
            '电视动画《冰菓》改编自日本推理小说家米泽穗信原作的《古典部系列》小说，以该系列的第1部《冰菓》为标题。2011年11月29日，在京都动画官方网站内，宣布了《冰菓》TV动画化的决',
          modelType: '营销',
          currentStage: 0, // 0：文本   1：语音
          modelStatus: 0, // 0：启用 1：停用
          onlineTime: '2022-01-12',
          creator: '折木奉太郎',
          createTime: '2022-01-15 20:00:00',
        },
        {
          itmModelRegisCode: 1,
          modelName: '语音机器人',
          modelDesc:
            '电视动画《冰菓》改编自日本推理小说家米泽穗信原作的《古典部系列》小说，以该系列的第1部《冰菓》为标题。2011年11月29日，在京都动画官方网站内，宣布了《冰菓》TV动画化的决',
          modelType: '客服',
          currentStage: 1, // 0：文本   1：语音
          modelStatus: 0, // 0：启用 1：停用
          onlineTime: '2022-01-12',
          creator: '折木奉太郎',
          createTime: '2022-01-15 20:00:00',
        },
        {
          itmModelRegisCode: 2,
          modelName: '冰果2',
          modelDesc:
            '电视动画《冰菓》改编自日本推理小说家米泽穗信原作的《古典部系列》小说，以该系列的第1部《冰菓》为标题。2011年11月29日，在京都动画官方网站内，宣布了《冰菓》TV动画化的决',
          modelType: '风险',
          currentStage: 0, // 0：文本   1：语音
          modelStatus: 0, // 0：启用 1：停用
          onlineTime: '2022-01-12',
          creator: '折木奉太郎',
          createTime: '2022-01-15 20:00:00',
        },
        {
          itmModelRegisCode: 3,
          modelName: '冰果3',
          modelDesc:
            '电视动画《冰菓》改编自日本推理小说家米泽穗信原作的《古典部系列》小说，以该系列的第1部《冰菓》为标题。2011年11月29日，在京都动画官方网站内，宣布了《冰菓》TV动画化的决',
          modelType: '催收',
          currentStage: 0, // 0：文本   1：语音
          modelStatus: 0, // 0：启用 1：停用
          onlineTime: '2022-01-12',
          creator: '折木奉太郎',
          createTime: '2022-01-15 20:00:00',
        },
        {
          itmModelRegisCode: 4,
          modelName: '冰果4',
          modelDesc:
            '电视动画《冰菓》改编自日本推理小说家米泽穗信原作的《古典部系列》小说，以该系列的第1部《冰菓》为标题。2011年11月29日，在京都动画官方网站内，宣布了《冰菓》TV动画化的决',
          modelType: '审批',
          currentStage: 0, // 0：文本   1：语音
          modelStatus: 0, // 0：启用 1：停用
          onlineTime: '2022-01-12',
          creator: '折木奉太郎',
          createTime: '2022-01-15 20:00:00',
        },
        {
          itmModelRegisCode: 5,
          modelName: '冰果5',
          modelDesc:
            '电视动画《冰菓》改编自日本推理小说家米泽穗信原作的《古典部系列》小说，以该系列的第1部《冰菓》为标题。2011年11月29日，在京都动画官方网站内，宣布了《冰菓》TV动画化的决',
          modelType: '渠道',
          currentStage: 0, // 0：文本   1：语音
          modelStatus: 0, // 0：启用 1：停用
          onlineTime: '2022-01-12',
          creator: '折木奉太郎',
          createTime: '2022-01-15 20:00:00',
        },
        {
          itmModelRegisCode: 6,
          modelName: '冰果6',
          modelDesc:
            '电视动画《冰菓》改编自日本推理小说家米泽穗信原作的《古典部系列》小说，以该系列的第1部《冰菓》为标题。2011年11月29日，在京都动画官方网站内，宣布了《冰菓》TV动画化的决',
          modelType: '渠道',
          currentStage: 0, // 0：文本   1：语音
          modelStatus: 0, // 0：启用 1：停用
          onlineTime: '2022-01-12',
          creator: '折木奉太郎',
          createTime: '2022-01-15 20:00:00',
        },
      ],
    },
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
  [`GET ${baseUrl}/myWorkbench/getModelInfoList`]: getList, // 获取模型管理列表
  [`POST ${baseUrl}/model/add`]: normalDeal,
  [`POST ${baseUrl}/model/delete`]: normalDeal,
  [`POST ${baseUrl}/model/info`]: normalDeal,
};
