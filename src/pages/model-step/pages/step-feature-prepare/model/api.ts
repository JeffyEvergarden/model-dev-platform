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

/** 获取所有数据库列表 **/
export async function getVarList(params?: { [key: string]: any }) {
  return request(`${baseUrl}/modelDev/featurePrepare/findFeatureByCategoryName`, {
    method: 'POST',
    params,
  });
}

/** 保存 **/
export async function saveFeature(params?: { [key: string]: any }) {
  return request(`${baseUrl}/modelDev/featurePrepare/submit`, {
    method: 'POST',
    params,
  });
}
// 获取详情
export async function getInfo(params?: { [key: string]: any }) {
  return request(`${baseUrl}/modelDev/featurePrepare/getModelStageInfo`, {
    method: 'GET',
    params,
  });
}
