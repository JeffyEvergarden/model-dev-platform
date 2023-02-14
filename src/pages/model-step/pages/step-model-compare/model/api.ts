import { request } from '@/services/request';
import config from '@/config/index';
const baseUrl: string = config.basePath;

export async function getModelStructureParamApi(data?: Record<string, any>) {
  return request(`${baseUrl}/compare/getModelStructureParam`, {
    method: 'GET',
    params: data,
  });
}

export async function versionListApi(data?: Record<string, any>) {
  return request(`${baseUrl}/compare/getVersionNameList`, {
    method: 'GET',
    params: data,
  });
}

export async function getModelResultApi(data?: Record<string, any>) {
  return request(`${baseUrl}/compare/getModelStructureResult`, {
    method: 'GET',
    params: data,
  });
}

export async function nextStageRequestApi(data?: Record<string, any>) {
  return request(`${baseUrl}/compare/nextStage`, {
    method: 'POST',
    data,
  });
}
