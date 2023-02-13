import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

/** 获取树**/
export async function getDatabaseList(params?: { [key: string]: any }) {
  return request(`${baseUrl}/modelDev/featurePrepare/getFeatureCatTree`, {
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

export async function getWaitResult(params?: { [key: string]: any }) {
  return request(`${baseUrl}/modelStep/selectSample/result`, {
    method: 'GET',
    params,
  });
}
