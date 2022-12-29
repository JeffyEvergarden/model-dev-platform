import React, { useState, useEffect, useRef } from 'react';
import InputVariableTable from '@/pages/model-step/components/inputVariableTable';
import VarCodeRelateTable from '@/pages/model-step/components/varCodeRelateTable';
import { useComparePage } from './../../step-model-compare/model';
import styles from './index.less';
import classnames from 'classnames';

export default (props: any) => {
  const actionRef = useRef<any>();

  const { codeList, relateCodeList } = useComparePage();

  const [pageInfo, setPageInfo] = useState<any>([]);

  //变量相关性
  const [dataSourceRelate, setDataSourceRelate] = useState<any>([]);
  const [columnsRelate, setColumnsRelate] = useState<any>([]);

  useEffect(() => {
    getVarCode(); //变量相关性
  }, []);

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

  const getVarCode = async () => {
    let params = {};
    let res = await relateCodeList(params);
    setDataSourceRelate(res?.data?.list);
    setColumnsRelate(res?.data?.columnsRelate);
  };

  return (
    <div className={styles.inputvariablePage}>
      <InputVariableTable
        headerTitle={<span style={{ fontWeight: 700 }}>入模变量相关参数</span>}
        rowKey={(record: any) => record.id}
        actionRef={actionRef}
        pageInfo={pageInfo}
        request={async (params = {}) => {
          return varCodeList(params);
        }}
      />
      <div>
        <VarCodeRelateTable
          headerTitle={<span style={{ fontWeight: 700 }}>变量相关性</span>}
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          columns={columnsRelate}
          dataSource={dataSourceRelate}
        />
      </div>
    </div>
  );
};
