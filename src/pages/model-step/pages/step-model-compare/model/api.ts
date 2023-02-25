import { request } from '@/services/request';
import config from '@/config/index';
const baseUrl: string = config.basePath;

export async function getModelStructureParamApi(data?: Record<string, any>) {
  return request(`${baseUrl}/compare/getModelStructureParam`, {
    method: 'GET',
    params: data,
  });
}

export async function versionListApi(data?: Record<string, any>) {
  return request(`${baseUrl}/compare/getVersionNameList`, {
    method: 'GET',
    params: data,
  });
}

export async function getModelResultApi(data?: Record<string, any>) {
  return request(`${baseUrl}/compare/getModelBuildResult`, {
    method: 'GET',
    params: data,
  });
}

export async function nextStageRequestApi(data?: Record<string, any>) {
  return request(`${baseUrl}/compare/nextStage`, {
    method: 'POST',
    data,
  });
}

export async function getInputVariableApi(data?: Record<string, any>) {
  return request(`${baseUrl}/compare/getInputVariablee`, {
    method: 'POST',
    data,
  });
}

export async function scoreCardListApi(data?: Record<string, any>) {
  return request(`${baseUrl}/compare/getModelScoreCalcLogic`, {
    method: 'POST',
    data,
  });
}

export async function getModelDatasetDistributionApi(data?: Record<string, any>) {
  return request(`${baseUrl}/compare/getModelDatasetDistribution`, {
    method: 'POST',
    data,
  });
}

export async function getModelStabilityApi(data?: Record<string, any>) {
  return request(`${baseUrl}/compare/getModelStability`, {
    method: 'POST',
    data,
  });
}

export async function getVariableStabilityApi(data?: Record<string, any>) {
  return request(`${baseUrl}/compare/getVariableStability`, {
    method: 'POST',
    data,
  });
}
