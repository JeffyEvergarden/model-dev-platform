import config from '@/config/index';
import { message } from 'antd';
import { useState, useRef } from 'react';

import { getWaitResult, getStrategyBackList } from './api';

export const successCode = config.successCode;

//

// 策略分析
export const useStrategyBackModel = () => {
  const [tableList, setTableList] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const getStrategyTableList = async (params: any) => {
    setLoading(true);
    const res: any = await getStrategyBackList(params);
    setLoading(false);
    // 策略分析
    if (res.resultCode === successCode) {
      let data: any[] = res.data || [];
      setTableList(data);
    }
  };

  return {
    loading,
    tableList,
    getStrategyTableList,
  };
};

export const useStrategyBackUploadAwaitModel = () => {
  const [processType, setProcessType] = useState<any>('loading');

  const fake = useRef<any>({});

  const awaitResult = async (params?: any) => {
    let res: any = await getWaitResult(params);
    let data = res.data || {};
    if (data.type === 'finish') {
      setProcessType('finish');
      return 'finish';
    } else if (data.type === 'loading') {
      setProcessType('loading');
      return 'loading';
    } else {
      setProcessType('error');
      return 'error';
    }
  };

  const startLoop = async (params: any, time: any) => {
    if (time > 10) {
      // 当这次查询时长超过20s取消
      setProcessType('error');
      message.warning('查询超时异常');
      return;
    }

    let res: any = await awaitResult(params);
    if (res == 'finish') {
      clearTimeout(fake.current.timeFn);
    } else if (res == 'loading') {
      // 439 待机回调中
      fake.current.timeFn = setTimeout(async () => {
        startLoop(params, time + 2);
      }, time * 1000);
    } else {
      message.error(res?.resultMsg || '未知系统异常');
    }
  };

  return {
    processType,
    awaitResult,
    startLoop,
  };
};
