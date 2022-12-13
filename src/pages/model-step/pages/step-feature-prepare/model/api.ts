import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

/** 获取所有数据库列表 **/
export async function getTreeList(params?: { [key: string]: any }) {
  return request(`${baseUrl}/modelStep/featurePrepare/tree/list`, {
    method: 'GET',
    params,
  });
}
