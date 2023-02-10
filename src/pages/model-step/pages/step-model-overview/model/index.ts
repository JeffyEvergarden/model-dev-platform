import { getStepOneForm, submitStepOneForm } from './api';
import { message } from 'antd';

export const useFormSelect = () => {
  const getForm = async (data: any) => {
    let res = await getStepOneForm();
    console.log(process.env.API_SUCCESS_CODE);
    if (res?.status?.code === process.env.API_SUCCESS_CODE) {
      return res.result;
    } else {
      message.error('获取已填写表单失败');
      return false;
    }
  };

  const postForm = async (data: any) => {
    let res = await submitStepOneForm(data);
    if (res?.status?.code === process.env.API_SUCCESS_CODE) {
      return res.result;
    } else {
      message.error('模型概况-提交表单失败');
      return false;
    }
  };

  return {
    getForm,
    postForm,
  };
};
