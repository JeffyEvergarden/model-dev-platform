import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

//列表
export async function getStrategyBackList(params?: { [key: string]: any }) {
  return request(`${baseUrl}/strategyBacktrack/getProcessInfo`, {
    method: 'GET',
    params,
  });
}

//提交
export async function backTracking(data?: { [key: string]: any }) {
  return request(`${baseUrl}/strategyBacktrack/backTracking`, {
    method: 'POST',
    data,
  });
}

//查询回溯状态
export async function getStageStatus(params?: { [key: string]: any }) {
  return request(`${baseUrl}/strategyBacktrack/getStageStatus`, {
    method: 'GET',
    params,
  });
}

//跳过，下一流程
export async function skipCurrentStage(data?: { [key: string]: any }) {
  return request(`${baseUrl}/strategyBacktrack/skipCurrentStage`, {
    method: 'POST',
    data,
  });
}

//下一流程
export async function nextStage(data?: { [key: string]: any }) {
  return request(`${baseUrl}/strategyBacktrack/nextStage`, {
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

export async function reBack(data?: { [key: string]: any }) {
  return request(`${baseUrl}/strategyBacktrack/retryBackTracking`, {
    method: 'POST',
    data,
  });
}
