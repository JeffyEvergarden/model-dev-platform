import { request } from '@/services/request';
import config from '@/config/index';
const baseUrl: string = config.basePath;

export async function codeListData(data?: Record<string, any>) {
  return request(`${baseUrl}/robot/testWhiteList/codeListData`, {
    method: 'POST',
    data,
  });
}

export async function relateCodeListGet(data?: Record<string, any>) {
  return request(`${baseUrl}/robot/testWhiteList/relateCodeListGet`, {
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

export async function trateAndVerifyDataApi(data?: Record<string, any>) {
  return request(`${baseUrl}/robot/testWhiteList/trateAndVerifyDataApi`, {
    method: 'POST',
    data,
  });
}

export async function stableDataQueryApi(data?: Record<string, any>) {
  return request(`${baseUrl}/robot/testWhiteList/stableDataQueryApi`, {
    method: 'POST',
    data,
  });
}

export async function varCodeStableQueryApi(data?: Record<string, any>) {
  return request(`${baseUrl}/robot/testWhiteList/varCodeStableQueryApi`, {
    method: 'POST',
    data,
  });
}

export async function modelSortListApi(data?: Record<string, any>) {
  return request(`${baseUrl}/robot/testWhiteList/modelSortListApi`, {
    method: 'POST',
    data,
  });
}
