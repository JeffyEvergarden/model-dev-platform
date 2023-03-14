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
  const [nextLoading, setNextLoading] = useState<boolean>(false);

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
      if (params?.first) {
        setResultTableList(res?.result?.sampleTotalDistributionList || []);
        setTableResultTotal(res?.result?.sampleTotalDistributionList?.length || 0);
      }
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
      let arr: any = [];
      data?.forEach((item: any, index: any) => {
        if (index == 0) {
          console.log(data?.find((item) => item.sampleType == '训练集'));
          arr.push(data?.find((item) => item.sampleType == '训练集'));
        } else if (index == 1) {
          arr.push(data?.find((item) => item.sampleType == '跨期验证'));
        } else {
          arr.push(data?.find((item) => item.sampleType == '其他验证' + (index - 1)) || {});
        }
      });
      console.log(arr);

      setTableResultTotal(res?.totalSize || data?.length || 0);
      setResultTableList(arr);
    } else {
      setTableResultTotal(0);
      setResultTableList([]);
      message.error(res?.status?.desc);
    }
  };

  //下一流程
  const nextFlow = async (params: any) => {
    setNextLoading(true);
    let res: any = await nextProcess(params);
    setNextLoading(false);
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
    nextLoading,
    getSampleTableList,
    getResultTableList,
    nextFlow,
  };
};
