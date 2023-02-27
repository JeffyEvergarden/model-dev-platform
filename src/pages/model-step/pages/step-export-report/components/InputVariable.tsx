import React, { useState, useEffect, useRef } from 'react';
import InputVariableTable from '@/pages/model-step/components/inputVariableTable';
import VarCodeRelateTable from '@/pages/model-step/components/varCodeRelateTable';
import styles from './index.less';

export default (props: any) => {
  const { optimalVersion, modelResult } = props;

  const actionRef = useRef<any>();

  return (
    <div className={styles.inputvariablePage}>
      <InputVariableTable
        headerTitle={<span style={{ fontWeight: 700 }}>入模变量相关参数</span>}
        rowKey={(record: any) => record.id}
        actionRef={actionRef}
        optimalVersion={optimalVersion}
        // requestMethod={inputVariableRequest}
      />
      <div>
        <VarCodeRelateTable
          headerTitle={<span style={{ fontWeight: 700 }}>变量相关性</span>}
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          // columns={columnsRelate}
          data={modelResult?.variableRelevanceData}
        />
      </div>
    </div>
  );
};
