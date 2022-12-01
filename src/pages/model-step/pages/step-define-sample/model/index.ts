import config from '@/config/index';
import { message } from 'antd';
import { useState, useRef } from 'react';

import { getPostResult, getDefineSampleList } from './api';

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
    const res: any = await getDefineSampleList(params);
    setLoading(false);
    // 策略分析
    if (res.resultCode === successCode) {
      let data: any[] = res.data || [];
      setTableTotal(res.total || 0);
      setTableList(data);
    }
  };

  const getResultTableList = async (params?: any) => {
    setResultLoading(true);
    const res: any = await getPostResult(params);
    setResultLoading(false);
    // 策略分析
    if (res.resultCode === successCode) {
      let data: any[] = res.data || [];
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
