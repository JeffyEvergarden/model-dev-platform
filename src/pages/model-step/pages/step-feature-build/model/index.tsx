import { useState } from 'react';
import { getVarList } from '../../step-feature-prepare/model/api';
import config from '@/config/index';
import {
  getFillFeatureMetrics,
  getVariableMetricsListForBinning,
  getVariableTypeList,
} from './api';

const successCode = config.successCode;

export const useExportReportModel = () => {
  const [tableList, setTableList] = useState<any[]>([]);
  const [varList, setVarList] = useState<any[]>([]);
  const [varTypeList, setVarTypeList] = useState<any[]>([]);
  const [tableInfo, setTableInfo] = useState<any>();
  const [tableTotal, setTableTotal] = useState<number>(0);
  const [varTotal, setVarTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getLostList = async (params?: any) => {
    setLoading(true);
    const res: any = await getFillFeatureMetrics(params);
    setLoading(false);
    const { code, desc } = res?.status;

    // 策略分析
    if (code === successCode) {
      let data: any[] = res?.result?.variableList || [];
      setTableInfo(res?.result || {});
      setTableList(data);
    }
  };

  const getVarCardList = async (params?: any, type?: any) => {
    setLoading(true);
    const res: any = await getVariableMetricsListForBinning(params);
    setLoading(false);
    console.log(res);
    const { code, desc } = res?.status;
    // 策略分析
    if (code === successCode) {
      let data: any[] = res?.result?.variableList || [];
      if (type) {
        data = data.filter((item) => item?.variableType == type);
      }

      setVarList(data);
      setVarTotal(data?.length || 0);
    }
  };

  const getVarTypeList = async (params?: any) => {
    const res: any = await getVariableTypeList(params);
    // 策略分析
    if (res?.status?.code === successCode) {
      let data: any[] = res?.result?.typeList || [];
      setVarTypeList(data);
    }
  };

  return {
    loading,
    tableInfo,
    tableList,
    varList,
    varTypeList,
    tableTotal,
    varTotal,
    getVarCardList,
    getLostList,
    getVarTypeList,
  };
};
