import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

//按月列表
export async function getMonthDistributionList(data?: { [key: string]: any }) {
  return request(`${baseUrl}/modelDev/sampleDefinition/monthDistribution`, {
    method: 'POST',
    data,
  });
}

export async function getTotalDistributionList(data?: { [key: string]: any }) {
  return request(`${baseUrl}/modelDev/sampleDefinition/totalDistribution`, {
    method: 'POST',
    data,
  });
}
