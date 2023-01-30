import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

/** 获取所有模型列表 **/
export async function getModelList(params?: { [key: string]: any }) {
  return request(`${baseUrl}/model/list`, {
    method: 'GET',
    params,
  });
}

/** 获取单个模型信息 **/
export async function getModelInfo(params?: { [key: string]: any }) {
  return request(`${baseUrl}/model/info`, {
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
