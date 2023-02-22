import { extend } from 'umi-request';
import { message } from 'antd';
import config from '../config';
// import { history } from 'umi';

const request = extend({
  timeout: 10000, // 超时10s就报错提示
  withCredentials: true,
  // headers: {
  //   'Content-Type': 'multipart/form-data',
  // },
  // params: {
  //   token: 'xxx', // 所有请求默认带上 token 参数
  // },
  errorHandler: function (error: any) {
    // 捕获错误
    console.log('捕获错误');
    // console.log(error);
    // console.log(Object.keys(error));
    // console.log(Object.keys(error).map((it: any) => error[it]));
    // 权限无验证 跳转 统一认证页面
    if (error?.response.status === 401) {
      if (!process.env.mock) {
        window.location.href = `${config.originPath}/login`; // 填写统一认证地址，地址不固定
      }
    }
    if (error?.type === 'Timeout') {
      message.warning('请求超时');
    }
    return error;
    /* 异常处理 */
  },
});

// 赋值头部
request.interceptors.request.use((url: any, options: any) => {
  const headers = {
    // 这里也是为了统一认证进行的，未登录不会返回302页面而是返回401的结果
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };
  return {
    url,
    options: { ...options, headers },
  };
});

export { request };
