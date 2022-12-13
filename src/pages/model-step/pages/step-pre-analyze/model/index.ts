import config from '@/config/index';
import { message } from 'antd';
import { useState, useRef } from 'react';

import { getPreAnalyzeVintageList, getPreAnalyzeScrollList, getSearchConditionList } from './api';

export const successCode = config.successCode;

export const useSearchModel = () => {
  const [productList, setProductList] = useState<any[]>([]);
  const [channelMidList, setChannelMidList] = useState<any[]>([]);
  const [channelSmList, setChannelSmList] = useState<any[]>([]);

  let originChannelMidList: any[] = [];
  let originChannelSmList: any[] = [];

  // 数据处理
  const deepFormateData = (arr: any[], level: number) => {
    if (!Array.isArray(arr)) {
      return [];
    }
    arr = arr.map((item: any) => {
      let children = deepFormateData(item.children, level + 1);

      return {
        name: item.key,
        label: item.label,
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

      originChannelMidList = cmList;
      originChannelSmList = csList;

      setChannelMidList(cmList);
      setChannelSmList(csList);
    }
  };

  return {
    productList,
    channelMidList,
    channelSmList,
    setChannelMidList,
    setChannelSmList,
    getConditionList,
    originChannelMidList,
    originChannelSmList,
  };
};

export const usePreAnalyzeModel = () => {
  const [vintageList, setVintageList] = useState<any[]>([]);
  const [vintageTotal, setVintageTotal] = useState<number>(0);
  const [vloading, setVLoading] = useState<boolean>(false);
  const [vColumns, setVColumns] = useState<any[]>([]);

  const [scrollList, setScrollList] = useState<any[]>([]);
  const [scrollTotal, setScrollTotal] = useState<number>(0);
  const [sloading, setSLoading] = useState<boolean>(false);
  const [sColumns, setSColumns] = useState<any[]>([]);

  const getVintageList = async (params?: any) => {
    setVLoading(true);
    const res: any = await getPreAnalyzeVintageList(params);
    setVLoading(false);
    // 策略分析
    if (res.resultCode === successCode) {
      let data: any[] =
        res?.data?.map((item: any, i: number) => {
          return {
            ...item,
            index: i,
          };
        }) || [];
      let columns: any[] = res.columns || [];
      let total = res.total || 0;
      columns = columns.map((item: any) => {
        return {
          ...item,
          title: item.label,
          dataIndex: item.key,
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
      setVintageTotal(total);
      setVintageList(data);
      setVColumns(columns);
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
      columns = columns.map((item: any) => {
        return {
          ...item,
          title: item.label,
          dataIndex: item.key,
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

  return {
    vloading,
    vintageList,
    vintageTotal,
    getVintageList,
    vColumns,
    // -------
    sloading,
    scrollList,
    scrollTotal,
    getScrollList,
    sColumns,
  };
};
