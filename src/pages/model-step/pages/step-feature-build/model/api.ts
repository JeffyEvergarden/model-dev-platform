import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

export async function getExportReportList(params?: { [key: string]: any }) {
  return request(`${baseUrl}/modelStep/var/list`, {
    method: 'GET',
    params,
  });
}

export async function getFillFeatureMetrics(params?: { [key: string]: any }) {
  return request(`${baseUrl}/modelMange/featureEngineering/getFillFeatureMetrics`, {
    method: 'POST',
    params,
  });
}

export async function getVariableTypeList(params?: { [key: string]: any }) {
  return request(`${baseUrl}/modelMange/featureEngineering/getVariableTypeList`, {
    method: 'GET',
    params,
  });
}

export async function getVariableMetricsListForBinning(params?: { [key: string]: any }) {
  return request(`${baseUrl}/modelMange/featureEngineering/getVariableMetricsListForBinning`, {
    method: 'POST',
    params,
  });
}

export async function getVariableListForBinning(params?: { [key: string]: any }) {
  return request(`${baseUrl}/modelMange/featureEngineering/getVariableListForBinning`, {
    method: 'POST',
    params,
  });
}
