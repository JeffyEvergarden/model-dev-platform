import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

export async function getPreAnalyzeVintageList(data?: { [key: string]: any }) {
  return request(`${baseUrl}/modelStep/preAnalyze/vintage/list`, {
    method: 'POST',
    data,
  });
}

export async function getPreAnalyzeScrollList(data?: { [key: string]: any }) {
  return request(`${baseUrl}/modelStep/preAnalyze/scroll/list`, {
    method: 'POST',
    data,
  });
}

export async function getSearchConditionList(params?: { [key: string]: any }) {
  return request(`${baseUrl}/modelStep/preAnalyze/condition/list`, {
    method: 'GET',
    params,
  });
}
