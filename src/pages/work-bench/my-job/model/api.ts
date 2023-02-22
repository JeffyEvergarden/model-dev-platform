import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

/** 获取所有模型列表 **/
export async function getModelList(data?: { [key: string]: any }) {
  return request(`${baseUrl}/myWorkbench/getModelInfoList`, {
    method: 'POST',
    data,
  });
}

/** 获取事项 **/
export async function getSummaryList(params?: { [key: string]: any }) {
  return request(`${baseUrl}/myWorkbench/myModelInfoSummary`, {
    method: 'GET',
    params,
  });
}

/** 获取建模人员 **/
export async function getModelAnalysts(params?: { [key: string]: any }) {
  return request(`${baseUrl}/myWorkbench/getModelAnalysts`, {
    method: 'GET',
    params,
  });
}

/** 获取单个模型信息 **/
export async function getModelInfo(params?: { [key: string]: any }) {
  return request(`${baseUrl}/myWorkbench/getModelStageInfo`, {
    method: 'GET',
    params,
  });
}

/** 删除模型 **/
export async function deleteModel(data?: { [key: string]: any }) {
  return request(`${baseUrl}/model/delete`, {
    method: 'POST',
    data,
  });
}

/** 添加新模型 **/
export async function addNewModel(data?: { [key: string]: any }) {
  return request(`${baseUrl}/model/add`, {
    method: 'POST',
    data,
  });
}
