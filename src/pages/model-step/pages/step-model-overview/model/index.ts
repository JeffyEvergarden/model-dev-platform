import React, { useState } from 'react';
import { getStepOneForm, submitStepOneForm, saveInfoApi, nextStageApi } from './api';
import { message } from 'antd';

export const useFormSelect = () => {
  const [loading, setLoading] = useState<any>();

  const getForm = async (data: any) => {
    setLoading(true);
    let res = await getStepOneForm({ itmModelRegisCode: data });
    console.log(process.env.API_SUCCESS_CODE);
    if (res?.status?.code === process.env.API_SUCCESS_CODE) {
      setLoading(false);
      return res;
    } else {
      setLoading(false);
      message.error('获取已填写表单失败');
      return false;
    }
  };

  const postForm = async (data: any) => {
    let res = await submitStepOneForm(data);
    if (res?.status?.code === process.env.API_SUCCESS_CODE) {
      return true;
    } else {
      message.error('模型概况-提交表单失败');
      return false;
    }
  };

  const saveInfo = async (data: any) => {
    setLoading(true);
    let res = await saveInfoApi(data);
    setLoading(false);
    return res;
  };

  const nextStage = async (data: any) => {
    setLoading(true);
    let res = await nextStageApi(data);
    setLoading(false);
    return res;
  };

  return {
    getForm,
    postForm,
    saveInfo,
    nextStage,
    loading,
    setLoading,
  };
};
