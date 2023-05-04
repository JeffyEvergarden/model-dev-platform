import { useState } from 'react';
import { getVarList } from '../../step-feature-prepare/model/api';
import config from '@/config/index';
import {
  getFillFeatureMetrics,
  getVariableMetricsListForBinning,
  getVariableTypeList,
} from './api';
import { message } from 'antd';

const successCode = config.successCode;

export const useExportReportModel = () => {
  const [tableList, setTableList] = useState<any[]>([]);
  const [column, setColumn] = useState<any>([
    {
      name: '变量名称',
      code: 'variable',
    },
    {
      name: '中文名称',
      code: 'variableName',
    },
    {
      name: '变量类型',
      code: 'variableType',
    },
    {
      name: '缺失率_train',
      code: 'trainMissRate',
    },
    {
      name: '缺失率_valid',
      code: 'validMissRate',
    },
    {
      name: 'KS_train',
      code: 'trainKs',
    },
    {
      name: 'KS_valid',
      code: 'validKs',
    },
    {
      name: 'IV_train',
      code: 'trainIv',
    },
    {
      name: 'IV_valid',
      code: 'validIv',
    },
    {
      name: 'PSI_valid',
      code: 'validPsi',
    },
  ]);
  const [varList, setVarList] = useState<any[]>([]);
  const [varTypeList, setVarTypeList] = useState<any[]>([]);
  const [tableInfo, setTableInfo] = useState<any>();
  const [tableTotal, setTableTotal] = useState<number>(0);
  const [varTotal, setVarTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getLostList = async (params?: any) => {
    setLoading(true);
    const res: any = await getFillFeatureMetrics(params).catch((err: any) => {
      setLoading(false);
    });
    setLoading(false);

    // 策略分析
    if (res?.status?.code === successCode) {
      let data: any[] = res?.result?.variableList || [];
      setTableInfo(res?.result || {}); //导出用
      setTableList(data);
      setColumn(res?.result?.head || []);
    } else {
      setTableInfo({}); //导出用
      setTableList([]);
      message.error(res?.status?.desc);
    }
  };

  const getVarCardList = async (params?: any, type?: any) => {
    setLoading(true);
    const res: any = await getVariableMetricsListForBinning(params).catch((err: any) => {
      setLoading(false);
    });
    setLoading(false);
    console.log(res, type);
    // 策略分析
    if (res?.status?.code === successCode) {
      let data: any[] = res?.result || [];

      setVarList(data);
      setVarTotal(data?.length || 0);
    } else {
      setVarList([]);
      setVarTotal(0);
      message.error(res?.status?.desc);
    }
  };

  const getVarTypeList = async (params?: any) => {
    const res: any = await getVariableTypeList(params).catch((err: any) => {
      setLoading(false);
    });
    // 策略分析
    if (res?.status?.code === successCode) {
      let data: any[] = res?.result || [];
      setVarTypeList(data);
    } else {
      setVarTypeList([]);
      message.error(res?.status?.desc);
    }
  };

  return {
    loading,
    tableInfo,
    column,
    tableList,
    varList,
    varTypeList,
    tableTotal,
    varTotal,
    getVarCardList,
    getLostList,
    getVarTypeList,
    setTableList,
    setColumn,
    setTableInfo,
  };
};
