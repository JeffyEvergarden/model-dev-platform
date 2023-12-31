import config from '@/config/index';
import { message } from 'antd';
import { useState, useRef } from 'react';
import { useModel } from 'umi';

import {
  getWaitResult,
  getStrategyBackList,
  backTracking,
  skipCurrentStage,
  getStageStatus,
  nextStage,
} from './api';

export const successCode = config.successCode;

export const StageStatus = {
  '1': 'loading',
  '2': 'finish',
  '3': 'error',
};

// 策略分析
export const useStrategyBackModel = () => {
  const [tableList, setTableList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getStrategyTableList = async (params: any) => {
    setLoading(true);
    const res: any = await getStrategyBackList(params);
    setLoading(false);
    // 策略分析
    if (res?.status?.code === successCode) {
      let data: any[] =
        res?.result?.processName?.split(',')?.map((item: any) => ({
          processName: item,
        })) || [];
      setTableList(data);
      return res?.result;
    }
  };

  return {
    loading,
    tableList,
    getStrategyTableList,
  };
};

export const useStrategyBackUploadAwaitModel = () => {
  const [processType, setProcessType] = useState<any>('loading'); // 0未开始 1进行中 2完成 3失败
  const [errorMsg, setErrorMsg] = useState<any>('');
  const [dataList, setDataList] = useState<any>('');
  const [successMsg, setSuccessMsg] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);

  const fake = useRef<any>({});

  //提交
  const submitProcess = async (params: any) => {
    let res: any = await backTracking(params);
    if (res?.status?.code == successCode) {
      return true;
    } else {
      message.error(res?.status?.desc);
      return false;
    }
  };

  //跳过
  const passBackStep = async (params: any) => {
    let res: any = await skipCurrentStage(params);
    if (res?.status?.code == successCode) {
      return res;
    } else {
      message.error(res?.status?.desc);
      return false;
    }
  };

  //下一流程
  const nextFlow = async (params: any) => {
    setLoading(true);
    let res: any = await nextStage(params);
    setLoading(false);
    if (res?.status?.code == successCode) {
      return true;
    } else {
      message.error(res?.status?.desc);
      return false;
    }
  };

  const awaitResult = async (params?: any, setDoneStep?: any) => {
    let res: any = await getStageStatus(params);
    let data = res?.result || {};
    console.log(data);

    if (data?.currentStage) {
      setDoneStep(data?.currentStage);
    }
    setDataList(data?.backtrackProcessName || '');
    setSuccessMsg(data?.sampleTableName?.split('.'));
    if (StageStatus[data?.currentStageStatus] === 'finish') {
      setProcessType('finish');
      return 'finish';
    } else if (StageStatus[data?.currentStageStatus] === 'loading') {
      setProcessType('loading');
      return 'loading';
    } else if (StageStatus[data?.currentStageStatus] === 'error') {
      setErrorMsg(data?.currentStageDesc || '未知错误');
      setProcessType('error');
      return 'error';
    }
  };

  const startLoop = async (params: any, setStatus?: any, status?: any) => {
    // if (time > 10) {
    //   // 当这次查询时长超过20s取消
    //   setProcessType('error');
    //   message.warning('查询超时异常');
    //   return;
    // }

    let res: any = await awaitResult(params, setStatus);
    if (status == 'finish') {
      setProcessType('finish');
      return 'finish';
    }
    if (res == 'finish') {
      clearTimeout(fake.current.timeFn);
    } else if (res == 'loading') {
      // 439 待机回调中
      fake.current.timeFn = setTimeout(async () => {
        startLoop(params, setStatus);
      }, 10 * 1000);
    }
  };

  const clearTime = () => {
    clearTimeout(fake.current.timeFn);
  };

  return {
    successMsg,
    processType,
    errorMsg,
    dataList,
    loading,
    clearTime,
    awaitResult,
    startLoop,
    submitProcess,
    passBackStep,
    nextFlow,
  };
};
