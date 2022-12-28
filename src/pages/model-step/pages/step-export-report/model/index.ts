import config from '@/config/index';
import { message } from 'antd';
import { useState, useRef } from 'react';

import { sampleDividerQueryApi, monthSpreadQueryApi } from './api';

export const successCode = config.successCode;

export const useExportReportModel = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const sampleDividerQuery = async (params?: any) => {
    setLoading(true);
    const res: any = await sampleDividerQueryApi(params);
    setLoading(false);
    return res;
  };

  const monthSpreadQuery = async (params?: any) => {
    setLoading(true);
    const res: any = await monthSpreadQueryApi(params);
    setLoading(false);
    return res;
  };

  return {
    loading,
    sampleDividerQuery,
    monthSpreadQuery,
  };
};
