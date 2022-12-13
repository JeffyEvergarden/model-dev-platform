import config from '@/config/index';
import { message } from 'antd';
import { useState, useRef } from 'react';

import { getExportReportList } from './api';

export const successCode = config.successCode;

export const useExportReportModel = () => {
  const [tableList, setTableList] = useState<any[]>([]);
  const [tableTotal, setTableTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getReportTableList = async (params?: any) => {
    setLoading(true);
    const res: any = await getExportReportList(params);
    setLoading(false);
    // 策略分析
    if (res.resultCode === successCode) {
      let data: any[] = res.data || [];
      setTableTotal(res.total || 0);
      setTableList(data);
    }
  };

  return {
    loading,
    tableList,
    tableTotal,
    getReportTableList,
  };
};
