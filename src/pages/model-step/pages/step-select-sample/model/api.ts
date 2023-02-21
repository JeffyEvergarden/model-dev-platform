import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

/** 获取树**/
export async function getDatabaseList(params?: Record<string, any>) {
  return request(`${baseUrl}/modelDev/featurePrepare/getFeatureCatTree`, {
    method: 'GET',
    params,
  });
}

/** 获取单个数据库信息 **/
export async function getDatacolumnsList(params?: Record<string, any>) {
  return request(`${baseUrl}/database/columnlist`, {
    method: 'GET',
    params,
  });
}

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

//5.4 样本选取-获取详情
export async function getCurrentDetailRequestApi(params?: Record<string, any>) {
  return request(`${baseUrl}/stage/getDetailInfo`, {
    method: 'POST',
    data: params,
  });
}

// 样本选取-选取详情
export async function getSampleRequstApi(params?: Record<string, any>) {
  return request(`${baseUrl}/sampleSelection/getSample`, {
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
