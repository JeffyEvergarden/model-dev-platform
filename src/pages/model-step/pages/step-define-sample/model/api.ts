import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

export async function getDefineSampleList(params?: { [key: string]: any }) {
  return request(`${baseUrl}/modelStep/defineSample/list`, {
    method: 'GET',
    params,
  });
}

export async function getPostResult(data?: { [key: string]: any }) {
  return request(`${baseUrl}/modelStep/defineSample/resultlist`, {
    method: 'POST',
    data,
  });
}
