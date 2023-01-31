import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

const normalDeal = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    resultMsg: '成功',
  });
};

export default {
  [`POST ${baseUrl}/modeldev/modelBuild/build`]: normalDeal,
  [`POST ${baseUrl}/modeldev/modelBuild/rebuild`]: normalDeal,
  [`POST ${baseUrl}/modeldev/modelBuild/nextProcess`]: normalDeal,
};
