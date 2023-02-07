import { request } from '@/services/request';
import config from '@/config/index';
const baseUrl: string = config.basePath;

export async function sampleList(data?: Record<string, any>) {
  return request(`${baseUrl}/robot/testWhiteList/sampleList`, {
    method: 'POST',
    data,
  });
}

export async function sampleListByMonthApi(data?: Record<string, any>) {
  return request(`${baseUrl}/robot/testWhiteList/sampleListByMonthApi`, {
    method: 'POST',
    data,
  });
}

export async function codeListData(data?: Record<string, any>) {
  return request(`${baseUrl}/robot/testWhiteList/codeListData`, {
    method: 'POST',
    data,
  });
}

export async function scoreCardListApi(data?: Record<string, any>) {
  return request(`${baseUrl}/robot/testWhiteList/scoreCardListApi`, {
    method: 'POST',
    data,
  });
}
