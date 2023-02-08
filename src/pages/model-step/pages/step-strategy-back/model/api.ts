import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

//列表
export async function getStrategyBackList(params?: { [key: string]: any }) {
  return request(`${baseUrl}/policyBacktrack/getProcessInfo`, {
    method: 'POST',
    params,
  });
}

//提交
export async function backTracking(params?: { [key: string]: any }) {
  return request(`${baseUrl}/policyBacktrack/backTracking`, {
    method: 'POST',
    params,
  });
}

//查询回溯状态
export async function getStageStatus(params?: { [key: string]: any }) {
  return request(`${baseUrl}/policyBacktrack/getStageStatus`, {
    method: 'POST',
    params,
  });
}

//跳过，下一流程
export async function skipCurrentStage(params?: { [key: string]: any }) {
  return request(`${baseUrl}/policyBacktrack/skipCurrentStage`, {
    method: 'POST',
    params,
  });
}

//下一流程
export async function nextStage(params?: { [key: string]: any }) {
  return request(`${baseUrl}/policyBacktrack/nextStage`, {
    method: 'POST',
    params,
  });
}

export async function getWaitResult(params?: { [key: string]: any }) {
  return request(`${baseUrl}/modelStep/strategyBack/result`, {
    method: 'GET',
    params,
  });
}
