import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

export async function sampleDividerQueryApi(params?: Record<string, any>) {
  return request(`${baseUrl}/modelStep/exportReport/sampleDividerQueryApi`, {
    method: 'POST',
    data: params,
  });
}

export async function monthSpreadQueryApi(params?: Record<string, any>) {
  return request(`${baseUrl}/modelStep/exportReport/monthSpreadQueryApi`, {
    method: 'POST',
    data: params,
  });
}
