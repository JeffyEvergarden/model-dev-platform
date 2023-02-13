import { useState } from 'react';
import { getVarList } from '../../step-feature-prepare/model/api';
import config from '@/config/index';
import { getFillFeatureMetrics } from './api';

const successCode = config.successCode;

export const useExportReportModel = () => {
  const [tableList, setTableList] = useState<any[]>([]);
  const [tableTotal, setTableTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getLostList = async (params?: any) => {
    setLoading(true);
    const res: any = await getFillFeatureMetrics(params);
    setLoading(false);
    const { code, desc } = res?.status;

    // 策略分析
    if (code === successCode) {
      let data: any[] = res?.result?.variableList || [];
      setTableList(data);
    }
  };

  const getVarCardList = async (params?: any) => {
    setLoading(true);
    const res: any = await getVarList(params);
    setLoading(false);
    console.log(res);

    // 策略分析
    if (res.resultCode === successCode) {
      let data: any[] = res?.data?.list || [];
      setTableTotal(res?.data?.totalPage || 0);
      setTableList(data);
      return { page: res?.data?.page, pageSize: data?.length };
    }
  };

  return {
    loading,
    tableList,
    tableTotal,
    getVarCardList,
    getLostList,
  };
};
