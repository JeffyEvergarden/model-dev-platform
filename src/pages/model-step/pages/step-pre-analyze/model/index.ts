import config from '@/config/index';
import { message } from 'antd';
import { useState, useRef } from 'react';
import { Select } from 'antd';

import {
  getPreAnalyzeVintageList,
  getPreAnalyzeScrollList,
  getSearchConditionList,
  getRateListRequest,
  getYaerMonthApi,
  getCustomerDefinitionOptions,
  nextStage,
  queryProdChannelList,
} from './api';
import { getparamsApi } from '../../step-select-sample/model/api';

export const successCode = config.successCode;

export const useSearchModel = () => {
  const [processList, setProcessList] = useState<any>([]); //编排
  const [productList, setProductList] = useState<any[]>([]); //产品大类
  const [channelMidList, setChannelMidList] = useState<any[]>([]); //渠道中类
  const [channelSmList, setChannelSmList] = useState<any[]>([]); //渠道小类
  const [custCatList, setCustCatList] = useState<any[]>([]); //客群大类
  const [indexList, setIndexList] = useState<any[]>([]); //汇总指标

  const [originChannelMidList, setOriginChannelMidList] = useState<any[]>([]);
  const [originChannelSmList, setOriginChannelSmList] = useState<any[]>([]);
  const [originCustCatList, setOriginCustCatList] = useState<any[]>([]);
  // const [originCustCatSmList, setOriginCustCatSmList] = useState<any[]>([]);

  // let originChannelMidList: any[] = [];
  // let originChannelSmList: any[] = [];

  const getparams = async (params?: any) => {
    let res: any = await getparamsApi(params);
    let tempProcessList: any[] = res?.result?.processList;
    tempProcessList?.unshift({
      value: 'all',
      name: '全部',
    });
    setProcessList(tempProcessList);

    if (res.status?.code === successCode) {
      let data: any = deepFormateData(res.result?.prodTree, 1);

      data?.unshift({
        name: 'all',
        label: '全部',
        children: [],
      });
      setProductList(data);

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
        name: 'all',
        label: '全部',
      });
      channelSmTemp?.unshift({
        name: 'all',
        label: '全部',
      });
      custCatTemp?.unshift({
        name: 'all',
        label: '全部',
      });
      // custCatSmTemp?.unshift({
      //   name: 'all',
      //   label: '全部',
      // });

      setOriginChannelMidList(channelMidTemp);
      setOriginChannelSmList(channelSmTemp);
      setOriginCustCatList(custCatTemp);
      // setOriginCustCatSmList(custCatSmTemp);

      setChannelMidList(channelMidTemp);
      setChannelSmList(channelSmTemp);
      setCustCatList(custCatTemp);
    }
    return true;
  };

  // 数据处理
  const deepFormateData = (arr: any[], level: number) => {
    if (!Array.isArray(arr)) {
      return [];
    }
    arr = arr.map((item: any) => {
      let children = deepFormateData(item.children, level + 1);
      return {
        label: item.name,
        name: item.id,
        children,
      };
    });

    return arr;
  };

  const getConditionList = async () => {
    //
    let res: any = await getSearchConditionList();
    console.log(res);
    if (res.resultCode === successCode) {
      let data: any = deepFormateData(res.data, 1);
      setProductList(data); //
      let cmList: any[] = [];
      let csList: any[] = [];
      data.forEach((ele: any) => {
        if (ele.children) {
          cmList.push(...ele.children);
          ele.children.forEach((subEle: any) => {
            if (subEle.children) {
              csList.push(...subEle.children);
            }
          });
        }
      });

      setOriginChannelMidList(cmList);
      setOriginChannelSmList(csList);
      setChannelMidList(cmList);
      setChannelSmList(csList);
    }
  };

  const getYaerMonthRequest = async (params: any) => {
    let res: any = await getYaerMonthApi(params);
    return res;
  };

  const getProdChannelList = async (params: any) => {
    let res: any = await queryProdChannelList(params);
    let data = res?.result?.indexList || [];
    data = data.map((item: any) => ({ label: item, name: item }));
    setIndexList(data);
    return res;
  };

  return {
    productList,
    channelMidList,
    channelSmList,
    custCatList,
    indexList,

    setProductList,
    setChannelMidList,
    setChannelSmList,
    setCustCatList,

    getparams,
    getConditionList,
    getYaerMonthRequest,
    getProdChannelList,
    originChannelMidList,
    originChannelSmList,
    originCustCatList,
  };
};

export const usePreAnalyzeModel = () => {
  const [vintageList, setVintageList] = useState<any[]>([]);
  const [vintageTotal, setVintageTotal] = useState<number>(0);
  const [vloading, setVLoading] = useState<boolean>(false);
  const [vColumns, setVColumns] = useState<any[]>([]);
  const [vChartColumns, setVChartColumns] = useState<any[]>([]);

  const [scrollList, setScrollList] = useState<any[]>([]);
  const [scrollTotal, setScrollTotal] = useState<number>(0);
  const [sloading, setSLoading] = useState<boolean>(false);
  const [sColumns, setSColumns] = useState<any[]>([]);

  const [goodList, setGoodList] = useState<any[]>([]);
  const [badList, setBadList] = useState<any[]>([]);
  const [midList, setMidList] = useState<any[]>([]);

  const getVintageList = async (params?: any) => {
    console.log(params);
    let reqData = {
      ...params,
      prodCat: params?.prodCat?.join(),
      channelCatM: params?.channelCatM?.join(),
      channelCatS: params?.channelCatS?.join(),
      custCatL: params?.custCatL?.join(),
    };
    setVLoading(true);
    const res: any = await getPreAnalyzeVintageList(reqData);
    setVLoading(false);
    // 策略分析
    if (res?.status?.code === successCode) {
      let columns: any[] = res?.result?.head || [];
      let total = res?.result?.data?.length || 0;
      columns = columns?.map?.((item: any) => {
        return {
          title: item,
          dataIndex: item,
          search: false,
          ellipsis: true,
          width: 120,
        };
      });
      let data: any[] =
        res?.result?.data?.map?.((item: any, i: number) => {
          let obj = {};
          columns?.forEach((col, index) => {
            obj[col?.title] = item[index];
          });
          obj['key'] = i;
          return obj;
        }) || [];
      console.log(columns, data);

      setVintageTotal(total);
      setVintageList(res?.result?.data); //用于图表（未加工）
      setVColumns(columns); //用于图表（未加工）
      setVChartColumns(res?.result?.head);
      return {
        data,
        total,
      };
    } else {
      return {
        data: [],
        total: 0,
      };
    }
  };
  // ------------------

  const getScrollList = async (params?: any) => {
    setSLoading(true);
    const res: any = await getPreAnalyzeScrollList(params);
    setSLoading(false);
    // 策略分析
    if (res.resultCode === successCode) {
      let data: any[] = res.data || [];
      let columns: any[] = res.columns || [];
      let total = res.total || 0;
      columns = columns?.map?.((item: any) => {
        return {
          ...item,
          title: item?.label,
          dataIndex: item?.key,
          search: false,
          ellipsis: true,
          width: 120,
        };
      });
      columns.push({
        title: '总计',
        dataIndex: 'total',
        search: false,
        ellipsis: true,
        width: 120,
      });
      setScrollTotal(total);
      setScrollList(data);
      setSColumns(columns);
      return {
        data,
        total,
      };
    } else {
      return {
        data: [],
        total: 0,
      };
    }
  };

  const getRateList = async (params?: any) => {
    setSLoading(true);
    const res: any = await getRateListRequest(params);
    setSLoading(false);
    return res;
  };

  const getCustomerList = async (params?: any) => {
    const res: any = await getCustomerDefinitionOptions(params);
    if (res?.status?.code == successCode) {
      setGoodList(res?.result || []);
      setBadList(res?.result || []);
      setMidList(res?.result || []);
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

  return {
    vloading,
    vintageList,
    vintageTotal,
    getVintageList,
    vColumns,
    vChartColumns,
    // -------
    sloading,
    scrollList,
    scrollTotal,
    getScrollList,
    sColumns,
    // -------
    getRateList,
    // -------
    getCustomerList,
    goodList,
    badList,
    midList,
    // -------
    nextFlow,
  };
};
