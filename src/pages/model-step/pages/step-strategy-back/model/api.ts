import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

export async function getStrategyBackList(params?: { [key: string]: any }) {
  return request(`${baseUrl}/modelStep/strategyBack/list`, {
    method: 'GET',
    params,
  });
}

export async function getWaitResult(params?: { [key: string]: any }) {
  return request(`${baseUrl}/modelStep/strategyBack/result`, {
    method: 'GET',
    params,
  });
}
