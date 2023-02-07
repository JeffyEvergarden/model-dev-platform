import { useState } from 'react';
import InputVariableTable from '@/pages/model-step/components/inputVariableTable';
import { useDefineSample } from '../model';

export default () => {
  const { codeList } = useDefineSample();

  const [pageInfo, setPageInfo] = useState<any>([]);

  const varCodeList = async (payload: any) => {
    let params = {};

    let res = await codeList(params);
    setPageInfo(res?.data);
    return {
      data: res?.data?.list || [],
      total: res?.data?.total || 0,
      current: payload.current,
      pageSize: payload.pageSize,
    };
  };

  return (
    <div>
      <InputVariableTable
        headerTitle="入模变量"
        rowKey={(record: any) => record.id}
        // actionRef={actionRef}
        pageInfo={pageInfo}
        request={async (params = {}) => {
          return varCodeList(params);
        }}
      />
    </div>
  );
};
