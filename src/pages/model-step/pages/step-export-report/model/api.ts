import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

export async function getSampleDefineDetailApi(params?: Record<string, any>) {
  return request(`${baseUrl}/reporting/getSampleDefineDetail`, {
    method: 'GET',
    params,
  });
}

export async function exportPageRequestApi(params?: Record<string, any>) {
  return request(`${baseUrl}/reporting/createReport`, {
    method: 'POST',
    data: params,
  });
}
