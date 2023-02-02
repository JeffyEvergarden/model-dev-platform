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
          ipaddress: '11.113.2.14',
          sourceName: '文本机器人',
          robotDesc:
            '电视动画《冰菓》改编自日本推理小说家米泽穗信原作的《古典部系列》小说，以该系列的第1部《冰菓》为标题。2011年11月29日，在京都动画官方网站内，宣布了《冰菓》TV动画化的决',
          databaseName: '营销',
          sourceType: 0, // 0：文本   1：语音
          status: 0, // 0：启用 1：停用
          onlineTime: '2022-01-12',
          creator: '折木奉太郎',
          createTime: '2022-01-15 20:00:00',
        },
        {
          ipaddress: 1,
          sourceName: '语音机器人',
          robotDesc:
            '电视动画《冰菓》改编自日本推理小说家米泽穗信原作的《古典部系列》小说，以该系列的第1部《冰菓》为标题。2011年11月29日，在京都动画官方网站内，宣布了《冰菓》TV动画化的决',
          databaseName: '客服',
          sourceType: 1, // 0：文本   1：语音
          status: 0, // 0：启用 1：停用
          onlineTime: '2022-01-12',
          creator: '折木奉太郎',
          createTime: '2022-01-15 20:00:00',
        },
        {
          ipaddress: 2,
          sourceName: '冰果2',
          robotDesc:
            '电视动画《冰菓》改编自日本推理小说家米泽穗信原作的《古典部系列》小说，以该系列的第1部《冰菓》为标题。2011年11月29日，在京都动画官方网站内，宣布了《冰菓》TV动画化的决',
          databaseName: '风险',
          sourceType: 0, // 0：文本   1：语音
          status: 0, // 0：启用 1：停用
          onlineTime: '2022-01-12',
          creator: '折木奉太郎',
          createTime: '2022-01-15 20:00:00',
        },
        {
          ipaddress: 3,
          sourceName: '冰果3',
          robotDesc:
            '电视动画《冰菓》改编自日本推理小说家米泽穗信原作的《古典部系列》小说，以该系列的第1部《冰菓》为标题。2011年11月29日，在京都动画官方网站内，宣布了《冰菓》TV动画化的决',
          databaseName: '催收',
          sourceType: 0, // 0：文本   1：语音
          status: 0, // 0：启用 1：停用
          onlineTime: '2022-01-12',
          creator: '折木奉太郎',
          createTime: '2022-01-15 20:00:00',
        },
        {
          ipaddress: 4,
          sourceName: '冰果4',
          robotDesc:
            '电视动画《冰菓》改编自日本推理小说家米泽穗信原作的《古典部系列》小说，以该系列的第1部《冰菓》为标题。2011年11月29日，在京都动画官方网站内，宣布了《冰菓》TV动画化的决',
          databaseName: '审批',
          sourceType: 0, // 0：文本   1：语音
          status: 0, // 0：启用 1：停用
          onlineTime: '2022-01-12',
          creator: '折木奉太郎',
          createTime: '2022-01-15 20:00:00',
        },
        {
          ipaddress: 5,
          sourceName: '冰果5',
          robotDesc:
            '电视动画《冰菓》改编自日本推理小说家米泽穗信原作的《古典部系列》小说，以该系列的第1部《冰菓》为标题。2011年11月29日，在京都动画官方网站内，宣布了《冰菓》TV动画化的决',
          databaseName: '渠道',
          sourceType: 0, // 0：文本   1：语音
          status: 0, // 0：启用 1：停用
          onlineTime: '2022-01-12',
          creator: '折木奉太郎',
          createTime: '2022-01-15 20:00:00',
        },
        {
          ipaddress: 6,
          sourceName: '冰果6',
          robotDesc:
            '电视动画《冰菓》改编自日本推理小说家米泽穗信原作的《古典部系列》小说，以该系列的第1部《冰菓》为标题。2011年11月29日，在京都动画官方网站内，宣布了《冰菓》TV动画化的决',
          databaseName: '渠道',
          sourceType: 0, // 0：文本   1：语音
          status: 0, // 0：启用 1：停用
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
  [`GET ${baseUrl}/datasourceManage/findDatasourceList`]: getList, // 获取模型管理列表
  [`POST ${baseUrl}/dataSource/add`]: normalDeal,
  [`POST ${baseUrl}/dataSource/delete`]: normalDeal,
  [`POST ${baseUrl}/dataSource/info`]: normalDeal,
};
