import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;
// 样本选择
const getTreeList = (req: any, res: any) => {
  res.json({
    status: {
      code: '',
      desc: '',
    },
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

const getVarList = (req: any, res: any) => {
  let page = 1;
  const jsonObj: any = {
    id: '1',
    robotId: '100',
    question: '问题',
    similarNum: 5, //相似数
    sumViewNum: 10, //总浏览次数
    viewNum: 5, //浏览次数
    likeNum: 555,
    unlikeNum: 22,
    faqTypeId: '0-0-1', //问题类型
    approvalStatus: 1, //审批状态
    questionRecommend: 1, //推荐 0关  1开
    recycle: 0, //是否在回收站
    creator: 'jiangjiahao',
    createTime: '2022-05-10 15:55:55',
    updateTime: '2022-05-10 15:55:55',
    updateBy: '',
    answerList: [
      {
        answerViewNum: 2, //浏览
        answer: 'dadada', //回复
        enable: 0, //是否启用 0否 1是
        enableStartTime: '2022-05-10 15:55:55',
        enableEndTime: '2022-05-10 15:55:55',
        answerId: '1',
        approvalStatus: 4, //审批状态
        channelList: ['all'],
        answerLikeNum: 10,
        answerUnlikeNum: 1,
        creator: 'jiangjiahao',
        createTime: '2022-05-10 15:55:55',
        updateTime: '2022-05-10 15:55:55',
      },
      {
        answerViewNum: 3, //浏览
        answer: 'gagaga', //回复
        enable: 1, //是否启用 0否 1是
        enableStartTime: '2022-05-10 15:55:55',
        enableEndTime: '2022-05-10 15:55:55',
        answerId: '2',
        approvalStatus: 3, //审批状态
        channelList: ['app'],
        answerLikeNum: 102,
        answerUnlikeNum: 11,
        creator: 'jiangjiahao',
        createTime: '2022-05-10 15:55:55',
        updateTime: '2022-05-10 15:55:55',
      },
    ],
  };
  let list = new Array(50).fill(1).map((item: any, index: number) => {
    return {
      ...jsonObj,
      name: '阿斯拉大' + index,
      times: 100 + index,
      id: index + 1 + page * 100,
      recycle: index % 2 == 0 ? 0 : 1,
      suggest: Math.floor(Math.random() * 100) > 50 ? 0 : 1,
    };
  });

  res.json({
    resultCode: successCode,
    resultDesc: '成功',
    requestId: '111',
    success: true,
    data: {
      pageSize: req?.pageSize || 10,
      totalPage: 100,
      page: 1,
      similarNum: 20,
      list: [...list],
    },
  });
};

// 菜单管理相关
export default {
  // 样本定义
  [`GET ${baseUrl}/modelStep/featurePrepare/tree/list`]: getTreeList,
  [`GET ${baseUrl}/modelStep/featurePrepare/var/list`]: getVarList,
};
