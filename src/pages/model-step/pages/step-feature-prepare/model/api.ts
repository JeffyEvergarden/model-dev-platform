import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

/** 获取树**/
export async function getDatabaseList(params?: { [key: string]: any }) {
  return request(`${baseUrl}/featurePrepare/getFeatureCatTree`, {
    method: 'GET',
    params,
  });
}

/** 获取所有数据库列表 **/
export async function getVarList(data?: { [key: string]: any }) {
  return request(`${baseUrl}/featurePrepare/findFeatureByCategoryName`, {
    method: 'POST',
    data,
  });
}

/** 搜索列表 **/
export async function getKeyVarList(data?: { [key: string]: any }) {
  return request(`${baseUrl}/featurePrepare/findFeature`, {
    method: 'POST',
    data,
  });
}

/** 保存 **/
export async function saveFeature(data?: { [key: string]: any }) {
  return request(`${baseUrl}/featurePrepare/submit`, {
    method: 'POST',
    data,
  });
}
// 获取详情
export async function getInfo(params?: { [key: string]: any }) {
  return request(`${baseUrl}/featurePrepare/getModelStageInfo`, {
    method: 'GET',
    params,
  });
}

// 下一流程
export async function nextStage(data?: { [key: string]: any }) {
  return request(`${baseUrl}/featurePrepare/nextStage`, {
    method: 'POST',
    data,
  });
}

// 下一流程
export async function resetPrepare(data?: { [key: string]: any }) {
  return request(`${baseUrl}/featurePrepare/reset`, {
    method: 'POST',
    data,
  });
}
