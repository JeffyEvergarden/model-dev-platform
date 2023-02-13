import config from '@/config/index';
import { message } from 'antd';
import { useState, useRef } from 'react';
import {
  getModelStructureParamApi,
  versionListApi,
  getModelResultApi,
  nextStageRequestApi,
} from './api';

export const successCode = config.successCode;

export const useComparePage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const getModelStructureParamRequest = async (params?: any) => {
    setLoading(true);
    const res: any = await getModelStructureParamApi(params);
    setLoading(false);
    return res;
  };

  const versionListRequest = async (params?: any) => {
    setLoading(true);
    const res: any = await versionListApi(params);
    setLoading(false);
    return res;
  };

  const getModelResultRequest = async (params?: any) => {
    setLoading(true);
    const res: any = await getModelResultApi(params);
    setLoading(false);
    return res;
  };

  const nextStageRequest = async (params?: any) => {
    setLoading(true);
    const res: any = await nextStageRequestApi(params);
    setLoading(false);
    return res;
  };

  return {
    loading,
    setLoading,
    versionListRequest,
    getModelStructureParamRequest,
    getModelResultRequest,
    nextStageRequest,
  };
};
