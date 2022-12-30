import config from '@/config/index';
import { message } from 'antd';
import { useState, useRef } from 'react';
import {
  codeListData,
  relateCodeListGet,
  scoreCardListApi,
  trateAndVerifyDataApi,
  stableDataQueryApi,
  varCodeStableQueryApi,
  modelSortListApi,
} from './api';

export const successCode = config.successCode;

export const useComparePage = () => {
  const [loading, setLoading] = useState<boolean>(false);

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

  return {
    loading,
    codeList,
    relateCodeList,
    getScoreCardList,
    trateAndVerifyData,
    stableDataQuery,
    varCodeStableQuery,
    modelSortList,
  };
};
