import config from '@/config/index';
import { message } from 'antd';
import { useState, useRef } from 'react';
import {
  getModelStructureParamApi,
  codeListData,
  relateCodeListGet,
  scoreCardListApi,
  trateAndVerifyDataApi,
  stableDataQueryApi,
  varCodeStableQueryApi,
  modelSortListApi,
  versionListApi,
  getModelResultApi,
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

  const codeList = async (params?: any) => {
    setLoading(true);
    const res: any = await codeListData(params);
    setLoading(false);
    return res;
  };

  const relateCodeList = async (params?: any) => {
    setLoading(true);
    const res: any = await relateCodeListGet(params);
    setLoading(false);
    return res;
  };

  const getScoreCardList = async (params?: any) => {
    setLoading(true);
    const res: any = await scoreCardListApi(params);
    setLoading(false);
    return res;
  };

  const trateAndVerifyData = async (params?: any) => {
    setLoading(true);
    const res: any = await trateAndVerifyDataApi(params);
    setLoading(false);
    return res;
  };

  const stableDataQuery = async (params?: any) => {
    setLoading(true);
    const res: any = await stableDataQueryApi(params);
    setLoading(false);
    return res;
  };

  const varCodeStableQuery = async (params?: any) => {
    setLoading(true);
    const res: any = await varCodeStableQueryApi(params);
    setLoading(false);
    return res;
  };

  const modelSortList = async (params?: any) => {
    setLoading(true);
    const res: any = await modelSortListApi(params);
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

  return {
    loading,
    setLoading,
    codeList,
    relateCodeList,
    getScoreCardList,
    trateAndVerifyData,
    stableDataQuery,
    varCodeStableQuery,
    modelSortList,
    versionListRequest,
    getModelStructureParamRequest,
    getModelResultRequest,
  };
};
