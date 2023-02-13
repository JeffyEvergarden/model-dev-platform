import { request } from '@/services/request';
import config from '@/config/index';
const baseUrl: string = config.basePath;

// 获取已填信息 回显表单
export async function getStepOneForm(data?: Record<string, any>) {
  return request(`${baseUrl}/summary/getSummaryDetail`, {
    method: 'GET',
    params: data,
  });
}

// 提交信息
export async function submitStepOneForm(data?: Record<string, any>) {
  return request(`${baseUrl}/summary/saveInfo`, {
    method: 'POST',
    data,
  });
}
