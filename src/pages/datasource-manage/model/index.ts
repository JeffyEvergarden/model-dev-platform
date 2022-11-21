import config from '@/config/index';
import { message } from 'antd';
import { useState } from 'react';
import { addNewDataSource, deleteDataSource, getDataSourceInfo, getDataSourceList } from './api';

export const successCode = config.successCode;

// 菜单管理的表格数据
export const useTableModel = () => {
  const [tableList, setTableList] = useState<any[]>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [opLoading, setOpLoading] = useState<boolean>(false);

  const getTableList = async (params?: any) => {
    setTableLoading(true);
    let res: any = await getDataSourceList(params);
    setTableLoading(false);
    let { list = [], totalPage, totalSize } = res.data;
    if (!Array.isArray(list)) {
      list = [];
    }
    list = list.map((item: any, index: number) => {
      return {
        ...item,
        title: item.name,
        index,
      };
    });
    // console.log('tableList', datas);
    setTableList(list || []);
    return { data: list, total: totalPage };
  };

  return {
    tableList,
    setTableList,
    tableLoading,
    opLoading,
    setOpLoading,
    getTableList, // 获取表格数据
  };
};

// 机器人管理相关操作接口
export const useOpModel = () => {
  const [loading, setLoading] = useState<boolean>(false);

  // 获取模型id
  const getInfo = async (params: any) => {
    let res = await getDataSourceInfo(params);
    if (res.resultCode === successCode) {
      let data: any = res?.data || {};
      let obj: any = {
        robotTypeLabel: res?.data?.robotType ? 'voice' : 'text',
      };
      return { ...data, ...obj };
    } else {
      message.warning('获取不到机器人信息');
      return null;
    }
  };

  // -----
  const _deleteDataSource = async (datas: any) => {
    setLoading(true);
    let res: any = await deleteDataSource(datas);
    setLoading(false);
    if (res.resultCode === successCode) {
      return true;
    } else {
      message.error(res?.resultDesc || '未知系统异常');
    }
  };

  const _addNewDataSource = async (datas: any) => {
    setLoading(true);
    let res: any = await addNewDataSource(datas);
    setLoading(false);
    if (res.resultCode === successCode) {
      message.success('创建机器人成功');
      return res;
    } else {
      message.error(res?.resultDesc || '未知系统异常');
    }
  };

  return {
    deleteDataSource: _deleteDataSource, // 删除机器人接口
    addNewDataSource: _addNewDataSource, // 添加机器人
    opLoading: loading,
    getInfo,
  };
};
