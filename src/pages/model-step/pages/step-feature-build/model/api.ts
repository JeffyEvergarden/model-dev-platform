import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

export async function getExportReportList(params?: { [key: string]: any }) {
  return request(`${baseUrl}/modelStep/var/list`, {
    method: 'GET',
    params,
  });
}
