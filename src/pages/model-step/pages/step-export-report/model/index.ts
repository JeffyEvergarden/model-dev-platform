import config from '@/config/index';
import { message } from 'antd';
import { useState, useRef } from 'react';

import { getOptimalVersionApi, getSampleDefineDetailApi, exportPageRequestApi } from './api';

export const successCode = config.successCode;

export const useExportReportModel = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const getSampleDefineDetail = async (params?: any) => {
    setLoading(true);
    const res: any = await getSampleDefineDetailApi(params);
    setLoading(false);
    return res;
  };

  const exportPageRequest = async (params?: any) => {
    setLoading(true);
    const res: any = await exportPageRequestApi(params);
    setLoading(false);
    return res;
  };

  const getOptimalVersionRquest = async (params?: any) => {
    setLoading(true);
    const res: any = await getOptimalVersionApi(params);
    setLoading(false);
    return res;
  };

  return {
    loading,
    setLoading,
    getOptimalVersionRquest,
    getSampleDefineDetail,
    exportPageRequest,
  };
};
