import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

export async function getModelStepInfo(params?: { [key: string]: any }) {
  return request(`${baseUrl}/stage/getCurrentStage`, {
    method: 'GET',
    params,
  });
}

export async function getModelStepDetail(data?: { [key: string]: any }) {
  return request(`${baseUrl}/stage/getDetailInfo`, {
    method: 'POST',
    data,
  });
}
