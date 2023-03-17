import config from '@/config/index';
import { message } from 'antd';
import { useModel } from 'umi';
import { useState, useRef } from 'react';
import { unique } from '@/utils';

import {
  getWaitResult,
  submitSampleRequestApi,
  confirmSunmitRequestApi,
  sampleNextApi,
  labelListApi,
  selectionListApi,
  getparamsApi,
  getSampleApi,
  getProcessListAPi,
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

  {
    /* 分群建模标签*/
  }
  const [labelList, setLabelList] = useState<any>([]);
  const [featureOperatorMap, setFeatureOperatorMap] = useState<any>([]);
  const [featureType, setFeatureType] = useState<any>('');
  const [operationList, setOperationList] = useState<any>([]);
  const [paramType, setParamType] = useState<any>('');

  {
    /* 产品大类、渠道中类、渠道小类、客群大类、客群小类*/
  }
  const [processList, setProcessList] = useState<any>([]); //编排
  const [productList, setProductList] = useState<any[]>([]); //产品大类
  const [channelMidList, setChannelMidList] = useState<any[]>([]); //渠道中类
  const [channelSmList, setChannelSmList] = useState<any[]>([]); //渠道小类
  const [custCatList, setCustCatList] = useState<any[]>([]); //客群大类
  const [custCatSmList, setCustCatSmList] = useState<any[]>([]); //客群小类

  const [originProductList, setOriginProductList] = useState<any[]>([]); //产品大类
  const [originChannelMidList, setOriginChannelMidList] = useState<any[]>([]);
  const [originChannelSmList, setOriginChannelSmList] = useState<any[]>([]);
  const [originCustCatList, setOriginCustCatList] = useState<any[]>([]);
  const [originCustCatSmList, setOriginCustCatSmList] = useState<any[]>([]);

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

  const labelListRequest = async (params?: any) => {
    setTableLoading(true);
    let res: any = await labelListApi(params);
    if (res?.status?.code == successCode) {
      setLabelList(res?.result?.featureList);
      setFeatureOperatorMap(res?.result?.featureOperatorMap);
      setTableLoading(false);
    }
    return true;
  };

  const getSelectionList = async (params?: any) => {
    setTableLoading(true);
    let res: any = await selectionListApi(params);
    setTableLoading(false);
    // setParamList(res?.result);
    return res;
  };

  // 数据处理
  const deepFormateData = (arr: any[], level: number) => {
    if (!Array.isArray(arr)) {
      return [];
    }
    arr = arr.map((item: any) => {
      let children = deepFormateData(item.children, level + 1);
      return {
        name: item.name,
        value: item.name,
        children,
      };
    });

    return arr;
  };

  const getparams = async (params?: any) => {
    setTableLoading(true);
    let res: any = await getparamsApi(params);
    setTableLoading(false);
    if (res.status?.code === successCode) {
      let data: any = deepFormateData(res.result?.prodTree, 1);
      data?.unshift({
        value: 'all',
        name: '全部',
        children: [],
      });
      setProductList(unique(data, 'name'));
      setOriginProductList(data);

      let channelMidTemp: any[] = []; //渠道中类
      let channelSmTemp: any[] = []; //渠道小类
      let custCatTemp: any[] = []; //客群大类
      let custCatSmTemp: any[] = []; //客群小类
      data.forEach((ele: any) => {
        if (ele.children) {
          channelMidTemp.push(...ele.children);
          ele.children.forEach((subItem: any) => {
            if (subItem) {
              channelSmTemp.push(...subItem.children);
              subItem.children.forEach((threeItem: any) => {
                if (threeItem.children) {
                  custCatTemp.push(...threeItem.children);
                  threeItem.children.forEach((fourItem: any) => {
                    custCatSmTemp.push(...fourItem.children);
                  });
                }
              });
            }
          });
        }
      });

      channelMidTemp?.unshift({
        value: 'all',
        name: '全部',
      });
      channelSmTemp?.unshift({
        value: 'all',
        name: '全部',
      });
      custCatTemp?.unshift({
        value: 'all',
        name: '全部',
      });
      custCatSmTemp?.unshift({
        value: 'all',
        name: '全部',
      });

      setOriginChannelMidList(channelMidTemp);
      setOriginChannelSmList(channelSmTemp);
      setOriginCustCatList(custCatTemp);
      setOriginCustCatSmList(custCatSmTemp);
      setChannelMidList(unique(channelMidTemp, 'name'));

      setChannelSmList(unique(channelSmTemp, 'name'));
      setCustCatList(unique(custCatTemp, 'name'));
      setCustCatSmList(unique(custCatSmTemp, 'name'));
    }
    return true;
  };

  const getProcessList = async () => {
    setTableLoading(true);
    let res: any = await getProcessListAPi();
    let tempProcessList: any[] = res?.result;
    tempProcessList?.unshift({
      value: 'all',
      name: '全部',
    });
    setProcessList(tempProcessList);
    setTableLoading(false);
  };

  return {
    treeList,
    tableList,
    setTableList,
    tableLoading,
    opLoading,
    setOpLoading,
    // getTreeList, // 获取表格数据
    // getTableList,
    total,

    //分类建群标签
    labelListRequest,
    labelList,
    featureOperatorMap,
    featureType,
    setFeatureType,
    operationList,
    setOperationList,
    getSelectionList,
    // paramList,
    // setParamList,
    paramType,
    setParamType,

    //产品大类、渠道中类、渠道小类、客群大类、客群小类、编排
    getparams,
    getProcessList,
    processList,
    setProcessList,
    productList,
    setProductList,
    channelMidList,
    setChannelMidList,
    channelSmList,
    setChannelSmList,
    custCatList,
    setCustCatList,
    custCatSmList,
    setCustCatSmList,

    originProductList,
    originChannelMidList,
    originChannelSmList,
    originCustCatList,
    originCustCatSmList,
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

  const startLoop = async (params: any, time: any, status?: any) => {
    // if (time > 10) {
    //   // 当这次查询时长超过20s取消
    //   setProcessType('error');
    //   message.warning('查询超时异常');
    //   return;
    // }
    // if (!fake.current.id) {
    //   // huo
    //   // setLoading(false);
    //   message.warning('获取不到异步请求信号id');
    //   return;
    // }
    if (status == 'finish') {
      setProcessType('finish');
      return 'finish';
    }
    let res: any = await awaitResult(params);
    if (res == 'finish') {
      clearTimeout(fake.current.timeFn);
    } else if (res == 'loading') {
      // 439 待机回调中
      fake.current.timeFn = setTimeout(async () => {
        startLoop(params, time);
      }, time * 1000);
    }
    // else {
    //   message.error(res?.status?.desc);
    // }
  };

  return {
    loading,
    processType,
    desc,
    fake,
    setProcessType,
    awaitResult,
    startLoop,
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

  const confirmSunmitRequest = async (params?: any) => {
    setLoading(true);
    let res: any = await confirmSunmitRequestApi(params);
    setLoading(false);
    return res;
  };

  const sampleNext = async (params?: any) => {
    setLoading(true);
    let res: any = await sampleNextApi(params);
    setLoading(false);
    return res;
  };

  const getSample = async (params?: any) => {
    setLoading(true);
    let res: any = await getSampleApi(params);
    setLoading(false);
    return res;
  };

  const getCurrentStageRequest = async (params?: any) => {
    setLoading(true);
    let res: any = await getWaitResult(params);
    setLoading(false);
    return res;
  };

  return {
    loading,
    getSample,
    submitSampleRequest,
    confirmSunmitRequest,
    sampleNext,
    getCurrentStageRequest,
  };
};
