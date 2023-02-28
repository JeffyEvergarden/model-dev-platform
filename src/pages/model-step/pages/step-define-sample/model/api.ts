import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

//按月列表
export async function getMonthDistributionList(data?: { [key: string]: any }) {
  return request(`${baseUrl}/sampleDefinition/monthDistribution`, {
    method: 'POST',
    data,
  });
}

export async function getTotalDistributionList(data?: { [key: string]: any }) {
  return request(`${baseUrl}/sampleDefinition/totalDistribution`, {
    method: 'POST',
    data,
  });
}

export async function exportExcel(data?: { [key: string]: any }) {
  return request(`${baseUrl}/sampleDefinition/exportExcel`, {
    method: 'POST',
    data,
    responseType: 'blob',
  });
}

export async function nextProcess(data?: { [key: string]: any }) {
  return request(`${baseUrl}/sampleDefinition/nextProcess`, {
    method: 'POST',
    data,
  });
}
