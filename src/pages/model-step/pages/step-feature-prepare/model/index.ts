import { message } from 'antd';
import { useRef, useState } from 'react';
import { successCode } from '../../step-model-compare/model';
import { getWaitResult } from '../../step-select-sample/model/api';
import { StageStatus } from '../../step-strategy-back/model';
import { getDatabaseList, getInfo, getKeyVarList, getVarList, nextStage, saveFeature } from './api';
export const useVarSelectModal = () => {
  // 列表
  const [treeList, setTreeList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [varList, setVarList] = useState<any[]>([]);
  const [listType, setListType] = useState<any>('tree'); // tree search
  const [totalSize, setTotalSize] = useState<number>(0);
  const [processType, setProcessType] = useState<any>('loading'); // 0未开始 1进行中 2完成 3失败
  const [dataList, setDataList] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<any>('');

  const fake = useRef<any>({});

  const processTreeData = (data: any[], parent?: any) => {
    if (!Array.isArray(data)) {
      return [];
    }
    let _data = data.map((item: any) => {
      let obj: any = {
        title: item?.featureCategoryName,
        value: item?.featureCategoryCode,
        path: item?.categoryPath,
        key: item?.featureCategoryCode,
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

  const getVarInfo = async (params: any) => {
    setLoading(true);
    let res: any = await getVarList({ ...params });
    setLoading(false);
    if (res?.status?.code === successCode) {
      let data = res?.result?.tableData || [];
      if (!params?.searchType) {
        setVarList(data);
        setListType('tree');
        setTotalSize(res?.result?.totalSize || 0);
      }
      return { data, total: res?.result?.totalSize };
    } else {
      if (!params?.searchType) {
        setVarList([]);
      }
      message.warning(res?.resultDesc);
      return false;
    }
  };

  const getKeyVarInfo = async (params: any) => {
    setLoading(true);
    let res: any = await getKeyVarList({ ...params });
    setLoading(false);
    if (res?.status?.code === successCode) {
      let data = res?.result?.tableData || [];
      setVarList(data);
      setListType('search');
      setTotalSize(res?.result?.totalSize || data?.length || 0);
      return { data, total: res?.result?.totalSize || data?.length };
    } else {
      setVarList([]);
      message.warning(res?.resultDesc);
      return false;
    }
  };

  const submitFeature = async (params: any) => {
    let res: any = await saveFeature({ ...params });
    if (res?.status?.code === successCode) {
      return true;
    } else {
      message.warning(res?.status?.desc);
      return false;
    }
  };

  //下一流程
  const nextFlow = async (params: any) => {
    let res: any = await nextStage(params);
    if (res?.status?.code == successCode) {
      return true;
    } else {
      message.error(res?.status?.desc);
      return false;
    }
  };

  const getModelStageInfo = async (params: any) => {
    setLoading(true);
    let res: any = await getInfo({ ...params });
    setLoading(false);
    if (res?.status?.code === successCode) {
      let data = res?.result || {};
      return data?.featureVOList || [];
    } else {
      message.error(res?.status?.desc || '');
      return;
    }
  };

  const awaitResult = async (params?: any) => {
    let res: any = await getWaitResult(params);
    let data = res?.result || {};
    console.log(data);

    setDataList(data?.featureVOList || '');
    if (StageStatus[data?.modelStageStatus] === 'finish') {
      setProcessType('finish');
      return 'finish';
    } else if (StageStatus[data?.modelStageStatus] === 'loading') {
      setProcessType('loading');
      return 'loading';
    } else if (StageStatus[data?.modelStageStatus] === 'error') {
      setErrorMsg(res?.modelStageDesc || '未知错误');
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

    let res: any = await awaitResult(params);
    if (status == 'finish') {
      setProcessType('finish');
      return 'finish';
    }
    if (res == 'finish') {
      clearTimeout(fake.current.timeFn);
    } else if (res == 'loading') {
      // 439 待机回调中
      fake.current.timeFn = setTimeout(async () => {
        startLoop(params, time + 2);
      }, 10 * 1000);
    } else {
      message.error(res?.resultMsg || '未知系统异常');
    }
  };

  const clearTime = () => {
    clearTimeout(fake.current.timeFn);
  };

  return {
    loading,
    treeList,
    varList,
    totalSize,
    listType,
    processType,
    dataList,
    errorMsg,
    clearTime,
    nextFlow,
    getTreeList,
    getVarInfo,
    getKeyVarInfo,
    submitFeature,
    getModelStageInfo,
    startLoop,
  };
};
