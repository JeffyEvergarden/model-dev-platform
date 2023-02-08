import config from '@/config/index';
import { message } from 'antd';
import { useState } from 'react';
import {
  addNewModel,
  deleteModel,
  getModelAnalysts,
  getModelInfo,
  getModelList,
  getSummaryList,
} from './api';

export const successCode = config.successCode;

// 菜单管理的表格数据
export const useTableModel = () => {
  const [tableList, setTableList] = useState<any[]>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [opLoading, setOpLoading] = useState<boolean>(false);
  const [InfoList, setInfoList] = useState<any[]>([]);
  const [infoLoading, setInfoLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<any[]>([]);

  const getTableList = async (params?: any) => {
    setTableLoading(true);
    let res: any = await getModelList(params);
    setTableLoading(false);
    let { tableData: list = [], totalPage, totalSize } = res.data;
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

  const getItemInfo = async (params?: any) => {
    setInfoLoading(true);
    let res: any = await getModelInfo(params);
    setInfoLoading(false);
    setInfoList(res?.data || []);
  };

  const getUserList = async (params?: any) => {
    let res: any = await getModelAnalysts();

    let data = res?.data?.map((item: any) => {
      return {
        name: item,
        label: item,
      };
    });

    setUserList(data || []);
  };

  return {
    tableList,
    InfoList,
    userList,
    setTableList,
    tableLoading,
    opLoading,
    infoLoading,
    setOpLoading,
    getTableList, // 获取表格数据
    getItemInfo, //详情
    getUserList, //获取建模人员
  };
};

// 机器人管理相关操作接口
export const useOpModel = () => {
  const [loading, setLoading] = useState<boolean>(false);

  // 获取模型id
  const getInfo = async (params: any) => {
    let res = await getModelInfo(params);
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
  const _deleteModel = async (datas: any) => {
    setLoading(true);
    let res: any = await deleteModel(datas);
    setLoading(false);
    if (res.resultCode === successCode) {
      return true;
    } else {
      message.error(res?.resultDesc || '未知系统异常');
    }
  };

  const _addNewModel = async (datas: any) => {
    setLoading(true);
    let res: any = await addNewModel(datas);
    setLoading(false);
    if (res.resultCode === successCode) {
      message.success('创建机器人成功');
      return res;
    } else {
      message.error(res?.resultDesc || '未知系统异常');
    }
  };

  return {
    deleteModel: _deleteModel, // 删除机器人接口
    addNewModel: _addNewModel, // 添加机器人
    opLoading: loading,
    getInfo,
  };
};

//事项
export const useSummaryModel = () => {
  const [allItemNum, setAllItemNum] = useState<any>();
  const [incompleteNum, setIncompleteNum] = useState<any>();
  const [completeNum, setCompleteNum] = useState<any>();

  const getSummaryInfo = async (params?: any) => {
    let res: any = await getSummaryList(params);
    if (res?.status?.code == successCode) {
      setAllItemNum(res?.data?.allItemNum);
      setIncompleteNum(res?.data?.incompleteNum);
      setCompleteNum(res?.data?.completeNum);
    }
  };

  return {
    allItemNum,
    incompleteNum,
    completeNum,
    getSummaryInfo,
  };
};
