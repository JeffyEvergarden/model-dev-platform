import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

export async function buildModel(params?: Record<string, any>) {
  return request(`${baseUrl}/modeldev/modelBuild/build`, {
    method: 'POST',
    data: params,
  });
}

export async function rebuildModelApi(params?: Record<string, any>) {
  return request(`${baseUrl}/modeldev/modelBuild/rebuild`, {
    method: 'POST',
    data: params,
  });
}

export async function nextFlowRequestApi(params?: Record<string, any>) {
  return request(`${baseUrl}/modeldev/modelBuild/nextProcess`, {
    method: 'POST',
    data: params,
  });
}
