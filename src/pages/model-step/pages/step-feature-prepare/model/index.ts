import { message } from 'antd';
import { useState } from 'react';
import { getVarList } from './api';
export const useFaqModal = () => {
  // 列表
  const [loading, setLoading] = useState<boolean>(false);
  const [faqList, setFaqList] = useState<any[]>([]);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [resData, setResData] = useState<any>();

  const getFaqList = async (params: any) => {
    setLoading(true);
    let res: any = await getVarList({ ...params });
    setLoading(false);
    if (res.resultCode === '0000') {
      let data = res?.data?.list || [];
      setFaqList(data);
      setTotalSize(res?.data?.totalPage || 0);
      setResData(res?.data);
      return { data, total: res?.data?.totalPage };
    } else {
      setFaqList([]);
      message.warning(res?.resultDesc);
      return false;
    }
  };

  return {
    loading,
    resData,
    faqList,
    totalSize,
    setFaqList,
    getFaqList,
  };
};
