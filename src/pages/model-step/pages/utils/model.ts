import { request } from '@/services/request';
import config from '@/config/index';
const baseUrl: string = config.basePath;

export async function nextStep<T extends any>(id: T): Promise<any> {
  return request(`${baseUrl}/summary/getSummaryDetail`, {
    method: 'POST',
    params: {
      itmModelRegisCode: id,
    },
  });
}
