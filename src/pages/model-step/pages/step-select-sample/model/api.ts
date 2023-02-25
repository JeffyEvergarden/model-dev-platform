import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

export async function getWaitResult(params?: Record<string, any>) {
  return request(`${baseUrl}/stage/getCurrentStage`, {
    method: 'GET',
    params,
  });
}

//样本选取-提交
export async function submitSampleRequestApi(params?: Record<string, any>) {
  return request(`${baseUrl}/sampleSelection/submit`, {
    method: 'POST',
    data: params,
  });
}

//样本选取-确认
export async function confirmSunmitRequestApi(params?: Record<string, any>) {
  return request(`${baseUrl}/sampleSelection/confirm`, {
    method: 'POST',
    data: params,
  });
}

export async function sampleNextApi(params?: Record<string, any>) {
  return request(`${baseUrl}/sampleSelection/nextStage`, {
    method: 'POST',
    data: params,
  });
}

//分群建模标签-
export async function labelListApi(params?: Record<string, any>) {
  return request(`${baseUrl}/sampleSelection/getModelLabelList`, {
    method: 'GET',
    params,
  });
}

//分群建模标签-
export async function selectionListApi(params?: Record<string, any>) {
  return request(`${baseUrl}/sampleSelection/getSelectionList`, {
    method: 'GET',
    params,
  });
}

//产品大类、渠道中类、渠道小类、客群大类、客群小类
export async function getparamsApi(params?: Record<string, any>) {
  return request(`${baseUrl}/sampleSelection/getParams`, {
    method: 'GET',
    params,
  });
}

//样本选取-详情
export async function getSampleApi(params?: Record<string, any>) {
  return request(`${baseUrl}/sampleSelection/getSample`, {
    method: 'GET',
    params,
  });
}
