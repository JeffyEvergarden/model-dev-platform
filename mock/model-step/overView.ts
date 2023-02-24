import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

const normalDeal = (req: any, res: any) => {
  res.json({
    code: successCode,
    desc: '成功',
  });
};

export default {
  [`POST ${baseUrl}/summary/saveInfo`]: normalDeal,
  [`POST ${baseUrl}/summary/nextStageApi`]: normalDeal,
};
