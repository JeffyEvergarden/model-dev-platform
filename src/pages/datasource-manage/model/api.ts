import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

/** 获取所有模型列表 **/
export async function getDataSourceList(params?: { [key: string]: any }) {
  return request(`${baseUrl}/datasourceManage/findDatasourceList`, {
    method: 'GET',
    params,
  });
}

/** 获取单个模型信息 **/
export async function getDataSourceInfo(params?: { [key: string]: any }) {
  return request(`${baseUrl}/dataSource/info`, {
    method: 'GET',
    params,
  });
}

/** 删除模型 **/
export async function deleteDataSource(data?: { [key: string]: any }) {
  return request(`${baseUrl}/dataSource/delete`, {
    method: 'POST',
    data,
  });
}

/** 添加新模型 **/
export async function addNewDataSource(data?: { [key: string]: any }) {
  return request(`${baseUrl}/dataSource/add`, {
    method: 'POST',
    data,
  });
}
