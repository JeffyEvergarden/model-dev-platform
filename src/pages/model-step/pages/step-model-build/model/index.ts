import config from '@/config/index';
import { message } from 'antd';
import { useState, useRef } from 'react';

import { buildModel, rebuildModelApi, nextFlowRequestApi } from './api';

export const useBuildModel = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const beginBuildModel = async (params?: any) => {
    setLoading(true);
    const res: any = await buildModel(params);
    setLoading(false);
    return res;
  };

  const rebuildModel = async (params?: any) => {
    setLoading(true);
    const res: any = await rebuildModelApi(params);
    setLoading(false);
    return res;
  };

  const nextFlowRequest = async (params?: any) => {
    setLoading(true);
    const res: any = await nextFlowRequestApi(params);
    setLoading(false);
    return res;
  };

  return {
    beginBuildModel,
    rebuildModel,
    nextFlowRequest,
    loading,
    setLoading,
  };
};
