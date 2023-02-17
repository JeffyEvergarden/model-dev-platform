import config from '@/config/index';
import { message } from 'antd';
import { useState, useRef } from 'react';

import {
  getDatabaseList,
  getDatacolumnsList,
  getWaitResult,
  submitSampleRequestApi,
  getCurrentDetailRequestApi,
  confirmSunmitRequestApi,
  getSampleRequstApi,
  sampleNextApi,
} from './api';

export const successCode = config.successCode;

// 菜单管理的表格数据
//  导入 -> 是 ， 选数据源和数据字段
export const useStepSelectModel = () => {
  const [treeList, setTreeList] = useState<any[]>([]);
  const [tableList, setTableList] = useState<any[]>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [opLoading, setOpLoading] = useState<boolean>(false);

  const [total, setTotal] = useState<any>(0);

  const processTreeData = (data: any[], parent?: any) => {
    if (!Array.isArray(data)) {
      return [];
    }
    let _data = data.map((item: any) => {
      let obj: any = {
        title: item.featureCategoryName,
        value: item.parentId,
        key: item.parentId,
        parent: parent || item.parent || undefined,
        deep: parent?.deep + 1 || 1,
      };
      let children: any = processTreeData(item.child, obj);

      obj.children = children;
      return obj;
    });
    return _data;
  };

  const getTreeList = async (params?: any) => {
    let res: any = await getDatabaseList(params);
    let list: any[] = res?.result || [];
    if (!Array.isArray(list)) {
      list = [];
    }
    list = processTreeData(list);
    console.log('treeList', list);
    setTreeList(list || []);
    return true;
  };

  const getTableList = async (params?: any) => {
    setTableLoading(true);
    let res: any = await getDatacolumnsList(params);
    setTableLoading(false);
    let list: any[] = res.data;
    let total: any = res.total || 0;

    if (!Array.isArray(list)) {
      list = [];
    }
    list = list.map((item: any, index: number) => {
      return {
        ...item,
        title: item.name,
        index,
      };
    });
    // console.log('tableList', datas);
    setTableList(list || []);
    setTotal(total);
    return true;
  };

  return {
    treeList,
    tableList,
    setTableList,
    tableLoading,
    opLoading,
    setOpLoading,
    getTreeList, // 获取表格数据
    getTableList,
    total,
  };
};

//
export const useSampleUploadAwaitModel = () => {
  const [processType, setProcessType] = useState<any>('');
  const [desc, setDesc] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fake = useRef<any>({});

  const awaitResult = async (params?: any) => {
    let res: any = await getWaitResult(params);
    let data = res.result || {};
    setDesc(data?.currentStageDesc);
    if (data.currentStageStatus === '2') {
      setProcessType('finish');
      return 'finish';
    } else if (data.currentStageStatus === '1') {
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
    // if (!fake.current.id) {
    //   // huo
    //   // setLoading(false);
    //   message.warning('获取不到异步请求信号id');
    //   return;
    // }

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

  const submitSampleRequest = async (params?: any) => {
    setLoading(true);
    let res: any = await submitSampleRequestApi(params);
    setLoading(false);
    return res;
  };

  const getCurrentDetailRequest = async (params?: any) => {
    setLoading(true);
    let res: any = await getCurrentDetailRequestApi(params);
    setLoading(false);
    return res;
  };

  const confirmSunmitRequest = async (params?: any) => {
    setLoading(true);
    let res: any = await confirmSunmitRequestApi(params);
    setLoading(false);
    return res;
  };

  return {
    loading,
    processType,
    desc,
    setProcessType,
    awaitResult,
    startLoop,
    submitSampleRequest,
    getCurrentDetailRequest,
    confirmSunmitRequest,
  };
};

export const useSample = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const submitSampleRequest = async (params?: any) => {
    setLoading(true);
    let res: any = await submitSampleRequestApi(params);
    setLoading(false);
    return res;
  };

  const getCurrentDetailRequest = async (params?: any) => {
    setLoading(true);
    let res: any = await getCurrentDetailRequestApi(params);
    setLoading(false);
    return res;
  };

  const confirmSunmitRequest = async (params?: any) => {
    setLoading(true);
    let res: any = await confirmSunmitRequestApi(params);
    setLoading(false);
    return res;
  };

  const getSampleRequst = async (params?: any) => {
    setLoading(true);
    let res: any = await getSampleRequstApi(params);
    setLoading(false);
    return res;
  };

  const sampleNext = async (params?: any) => {
    setLoading(true);
    let res: any = await sampleNextApi(params);
    setLoading(false);
    return res;
  };

  return {
    loading,
    submitSampleRequest,
    getCurrentDetailRequest,
    confirmSunmitRequest,
    getSampleRequst,
    sampleNext,
  };
};
