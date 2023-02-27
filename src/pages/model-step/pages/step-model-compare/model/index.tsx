import config from '@/config/index';
import { message } from 'antd';
import { useState, useRef } from 'react';
import {
  getModelStructureParamApi,
  versionListApi,
  getModelResultApi,
  nextStageRequestApi,
  getInputVariableApi,
  scoreCardListApi,
  getModelDatasetDistributionApi,
  getModelStabilityApi,
  getVariableStabilityApi,
  getModelSortInfoApi,
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

  const getInputVariableRequest = async (params?: any) => {
    setLoading(true);
    const res: any = await getInputVariableApi(params);
    setLoading(false);
    return res;
  };

  const scoreCardListReuqest = async (params?: any) => {
    setLoading(true);
    const res: any = await scoreCardListApi(params);
    setLoading(false);
    return res;
  };

  const getModelDatasetDistributionRequest = async (params?: any) => {
    setLoading(true);
    const res: any = await getModelDatasetDistributionApi(params);
    setLoading(false);
    return res;
  };

  const getModelStabilityRequest = async (params?: any) => {
    setLoading(true);
    const res: any = await getModelStabilityApi(params);
    setLoading(false);
    return res;
  };

  const getVariableStabilityRequest = async (params?: any) => {
    setLoading(true);
    const res: any = await getVariableStabilityApi(params);
    setLoading(false);
    return res;
  };

  const getModelSortInfoRequest = async (params?: any) => {
    setLoading(true);
    const res: any = await getModelSortInfoApi(params);
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

    getInputVariableRequest,
    scoreCardListReuqest,
    getModelDatasetDistributionRequest,
    getModelStabilityRequest,
    getVariableStabilityRequest,
    getModelSortInfoRequest,
  };
};
