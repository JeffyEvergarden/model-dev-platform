import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

export async function getPreAnalyzeVintageList(data?: Record<string, any>) {
  return request(`${baseUrl}/preanalysis/vintageResult`, {
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
  return request(`${baseUrl}/preanalysis/rollRateResult`, {
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

export async function getCustomerDefinitionOptions(params?: Record<string, any>) {
  return request(`${baseUrl}/preanalysis/customerDefinitionOptions`, {
    method: 'GET',
    params,
  });
}

export async function nextStage(data?: Record<string, any>) {
  return request(`${baseUrl}/preanalysis/nextStage`, {
    method: 'POST',
    data,
  });
}

export async function queryProdChannelList(params?: Record<string, any>) {
  return request(`${baseUrl}/preanalysis/prodChannelList`, {
    method: 'GET',
    params,
  });
}

//滚动率贷款枚举
export async function queryVintageLoanTerms(params?: Record<string, any>) {
  return request(`${baseUrl}/preanalysis/vintageLoanTerms`, {
    method: 'GET',
    params,
  });
}

export async function exportExcel(data?: { [key: string]: any }) {
  return request(`${baseUrl}/preanalysis/export`, {
    method: 'POST',
    data,
    responseType: 'blob',
  });
}
