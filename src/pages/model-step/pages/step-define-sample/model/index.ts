import config from '@/config/index';
import { message } from 'antd';
import { useState, useRef } from 'react';

import { getMonthDistributionList, getTotalDistributionList } from './api';

export const successCode = config.successCode;

//

// 策略分析
export const useDefineSampleModel = () => {
  const [tableList, setTableList] = useState<any[]>([]);
  const [tableTotal, setTableTotal] = useState<number>(0);
  const [resultTableList, setResultTableList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultLoading, setResultLoading] = useState<boolean>(false);

  const getSampleTableList = async (params?: any) => {
    setLoading(true);
    const res: any = await getMonthDistributionList(params);
    setLoading(false);
    // 策略分析
    if (res?.status?.code === successCode) {
      let data: any[] = res?.result || [];
      setTableTotal(res?.totalSize || 0);
      setTableList(data);
    }
  };

  const getResultTableList = async (params?: any) => {
    setResultLoading(true);
    const res: any = await getTotalDistributionList(params);
    setResultLoading(false);
    // 策略分析
    if (res?.status?.code === successCode) {
      let data: any[] = res?.result || [];
      setResultTableList(data);
    }
  };

  return {
    loading,
    resultLoading,
    tableList,
    resultTableList,
    tableTotal,
    getSampleTableList,
    getResultTableList,
  };
};
