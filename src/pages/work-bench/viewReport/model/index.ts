import { useState } from 'react';
import config from '@/config/index';
import { sampleList, sampleListByMonthApi, codeListData, scoreCardListApi } from './api';

export const useDefineSample = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const getDefineSample = async (params?: any) => {
    setLoading(true);
    const res: any = await sampleList(params);
    setLoading(false);
    return res;
  };

  const sampleListByMonth = async (params?: any) => {
    setLoading(true);
    const res: any = await sampleListByMonthApi(params);
    setLoading(false);
    return res;
  };

  const codeList = async (params?: any) => {
    setLoading(true);
    const res: any = await codeListData(params);
    setLoading(false);
    return res;
  };

  const getScoreCardList = async (params?: any) => {
    setLoading(true);
    const res: any = await scoreCardListApi(params);
    setLoading(false);
    return res;
  };

  return {
    loading,
    getDefineSample,
    sampleListByMonth,
    codeList,
    getScoreCardList,
  };
};
