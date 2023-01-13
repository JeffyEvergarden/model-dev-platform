import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

export async function getPreAnalyzeVintageList(data?: Record<string, any>) {
  return request(`${baseUrl}/modelStep/preAnalyze/vintage/list`, {
    method: 'POST',
    data,
  });
}

export async function getPreAnalyzeScrollList(data?: Record<string, any>) {
  return request(`${baseUrl}/modelStep/preAnalyze/scroll/list`, {
    method: 'POST',
    data,
  });
}

export async function getRateListRequest(data?: Record<string, any>) {
  return request(`${baseUrl}/modelStep/preAnalyze/scroll/getRateListRequest`, {
    method: 'POST',
    data,
  });
}

export async function getYaerMonthApi(data?: Record<string, any>) {
  return request(`${baseUrl}/modelStep/preAnalyze/scroll/getYaerMonthApi`, {
    method: 'POST',
    data,
  });
}

export async function getSearchConditionList(params?: Record<string, any>) {
  return request(`${baseUrl}/modelStep/preAnalyze/condition/list`, {
    method: 'GET',
    params,
  });
}
