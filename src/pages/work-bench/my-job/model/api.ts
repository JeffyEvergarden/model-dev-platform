import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

/** 获取所有模型列表 **/
export async function getModelList(data?: Record<string, any>) {
  return request(`${baseUrl}/myWorkbench/getModelInfoList`, {
    method: 'POST',
    data,
  });
}

/** 获取事项 **/
export async function getSummaryList(params?: Record<string, any>) {
  return request(`${baseUrl}/myWorkbench/myModelInfoSummary`, {
    method: 'GET',
    params,
  });
}

/** 获取建模人员 **/
export async function getModelAnalysts(params?: Record<string, any>) {
  return request(`${baseUrl}/myWorkbench/getModelAnalysts`, {
    method: 'GET',
    params,
  });
}

/** 获取单个模型信息 **/
export async function getModelInfo(params?: Record<string, any>) {
  return request(`${baseUrl}/myWorkbench/getModelStageInfo`, {
    method: 'GET',
    params,
  });
}

/** 删除模型 **/
export async function deleteModel(id?: Record<string, any>) {
  return request(`${baseUrl}/myWorkbench/deleteModelReport?itmModelRegisCode=${id}`, {
    method: 'POST',
    // data,
  });
}

/** 添加新模型 **/
export async function addNewModel(data?: Record<string, any>) {
  return request(`${baseUrl}/model/add`, {
    method: 'POST',
    data,
  });
}

export async function exportDataRrequest(data?: Record<string, any>) {
  return request(`${baseUrl}/myWorkbench/downloadModelReport`, {
    method: 'POST',
    data,
    responseType: 'blob',
  });
}
