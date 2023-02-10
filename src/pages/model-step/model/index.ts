import config from '@/config/index';
import { message } from 'antd';
import { useState, useRef } from 'react';
import { getModelStepInfo, getModelStepDetail } from './api';

//
export const useBaseInfoModel = () => {
  // 加载标识
  const [hasDone, setHasDone] = useState<any>(false);

  const getModelInfo = async (id: any) => {
    let res: any = await getModelStepInfo({
      itmModelRegisCode: id,
    });

    if (res?.status?.code === process.env.API_SUCCESS_CODE) {
      setHasDone(true);
      return res.result;
    } else {
      // message.warning('获取模型阶段信息失败');
      return false;
    }
  };

  const getModelDetail = () => {};

  return {
    hasDone,
    getModelInfo,
    getModelDetail,
  };
};
