import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

//列表
export async function getStrategyBackList(data?: { [key: string]: any }) {
  return request(`${baseUrl}/policyBacktrack/getProcessInfo`, {
    method: 'POST',
    data,
  });
}

//提交
export async function backTracking(data?: { [key: string]: any }) {
  return request(`${baseUrl}/policyBacktrack/backTracking`, {
    method: 'POST',
    data,
  });
}

//查询回溯状态
export async function getStageStatus(data?: { [key: string]: any }) {
  return request(`${baseUrl}/policyBacktrack/getStageStatus`, {
    method: 'POST',
    data,
  });
}

//跳过，下一流程
export async function skipCurrentStage(data?: { [key: string]: any }) {
  return request(`${baseUrl}/policyBacktrack/skipCurrentStage`, {
    method: 'POST',
    data,
  });
}

//下一流程
export async function nextStage(data?: { [key: string]: any }) {
  return request(`${baseUrl}/policyBacktrack/nextStage`, {
    method: 'POST',
    data,
  });
}

export async function getWaitResult(params?: { [key: string]: any }) {
  return request(`${baseUrl}/modelStep/strategyBack/result`, {
    method: 'GET',
    params,
  });
}
