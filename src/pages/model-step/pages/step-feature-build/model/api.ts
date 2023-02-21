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
