import { request } from '@/services/request';
import config from '@/config/index';
const baseUrl: string = config.basePath;

export async function codeListData(data?: { [key: string]: any }) {
  return request(`${baseUrl}/robot/testWhiteList/codeListData`, {
    method: 'POST',
    data,
  });
}

export async function relateCodeListGet(data?: { [key: string]: any }) {
  return request(`${baseUrl}/robot/testWhiteList/relateCodeListGet`, {
    method: 'POST',
    data,
  });
}

export async function scoreCardListApi(data?: { [key: string]: any }) {
  return request(`${baseUrl}/robot/testWhiteList/scoreCardListApi`, {
    method: 'POST',
    data,
  });
}
