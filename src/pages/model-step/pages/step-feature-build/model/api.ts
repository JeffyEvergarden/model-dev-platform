import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

export async function getExportReportList(params?: { [key: string]: any }) {
  return request(`${baseUrl}/modelStep/var/list`, {
    method: 'GET',
    params,
  });
}

export async function getFillFeatureMetrics(data?: { [key: string]: any }) {
  return request(`${baseUrl}/featureEngineering/getFillFeatureMetrics`, {
    method: 'POST',
    data,
  });
}

export async function getVariableTypeList(params?: { [key: string]: any }) {
  return request(`${baseUrl}/featureEngineering/getVariableTypeList`, {
    method: 'GET',
    params,
  });
}

export async function getVariableMetricsListForBinning(data?: { [key: string]: any }) {
  return request(`${baseUrl}/featureEngineering/getVariableMetricsListForBinning`, {
    method: 'POST',
    data,
  });
}

export async function getVariableListForBinning(data?: { [key: string]: any }) {
  return request(`${baseUrl}/featureEngineering/getVariableListForBinning`, {
    method: 'POST',
    data,
  });
}

export async function getVariableBoxTypeList(data?: { [key: string]: any }) {
  return request(`${baseUrl}/featureEngineering/getVariableTypeList`, {
    method: 'GET',
    params: data,
  });
}
//缺失下载
export async function lostExport(data?: { [key: string]: any }) {
  return request(`${baseUrl}/featureEngineering/downloadMissReport`, {
    method: 'POST',
    data,
    responseType: 'blob',
  });
}
//分箱下载
export async function boxExport(data?: { [key: string]: any }) {
  return request(`${baseUrl}/featureEngineering/downloadBinningReport`, {
    method: 'POST',
    data,
    responseType: 'blob',
  });
}

//下一流程
export async function nextProcess(data?: { [key: string]: any }) {
  return request(`${baseUrl}/featureEngineering/nextStage`, {
    method: 'POST',
    data,
  });
}
