import config from '@/config/index';
import { message } from 'antd';
import { useState, useRef } from 'react';

import { getMonthDistributionList, getTotalDistributionList, nextProcess } from './api';

export const successCode = config.successCode;

//

// 策略分析
export const useDefineSampleModel = () => {
  const [tableList, setTableList] = useState<any[]>([]);
  const [tableTotal, setTableTotal] = useState<number>(0);
  const [tableResultTotal, setTableResultTotal] = useState<number>(0);
  const [resultTableList, setResultTableList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultLoading, setResultLoading] = useState<boolean>(false);

  const getSampleTableList = async (params?: any) => {
    setLoading(true);
    const res: any = await getMonthDistributionList(params);
    setLoading(false);
    // 策略分析
    if (res?.status?.code === successCode) {
      let data: any[] = res?.result?.sampleMonthDistributionList || [];
      setTableTotal(res?.totalSize || 0);
      setTableList(data);
      //回显整体
      setResultTableList(res?.sampleTotalDistributionList || []);
      setTableResultTotal(res?.sampleTotalDistributionList?.length || 0);
      return res?.result || {};
    }
  };

  const getResultTableList = async (params?: any) => {
    setResultLoading(true);
    const res: any = await getTotalDistributionList(params);
    setResultLoading(false);
    // 策略分析
    if (res?.status?.code === successCode) {
      let data: any[] = res?.result?.sampleTotalDistributionList || [];
      setTableResultTotal(res?.totalSize || 0);
      setResultTableList(data);
    } else {
      setTableResultTotal(0);
      setResultTableList([]);
      message.error(res?.status?.desc);
    }
  };

  //下一流程
  const nextFlow = async (params: any) => {
    let res: any = await nextProcess(params);
    if (res?.status?.code == successCode) {
      return true;
    } else {
      message.error(res?.status?.desc);
      return false;
    }
  };

  return {
    loading,
    resultLoading,
    tableList,
    resultTableList,
    tableTotal,
    tableResultTotal,
    getSampleTableList,
    getResultTableList,
    nextFlow,
  };
};
