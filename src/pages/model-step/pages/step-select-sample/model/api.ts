import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

/** 获取所有数据库列表 **/
export async function getDatabaseList(params?: { [key: string]: any }) {
  return request(`${baseUrl}/database/list`, {
    method: 'GET',
    params,
  });
}

/** 获取单个数据库信息 **/
export async function getDatacolumnsList(params?: { [key: string]: any }) {
  return request(`${baseUrl}/database/columnlist`, {
    method: 'GET',
    params,
  });
}
