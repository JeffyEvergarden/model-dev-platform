import React, { useState, useEffect, useRef } from 'react';
import InputVariableTable from '@/pages/model-step/components/inputVariableTable';
import VarCodeRelateTable from '@/pages/model-step/components/varCodeRelateTable';
import { useComparePage } from './../../step-model-compare/model';
import styles from './index.less';
import classnames from 'classnames';

export default (props: any) => {
  const { modelResult } = props;

  const actionRef = useRef<any>();

  //变量相关性
  const [dataSourceRelate, setDataSourceRelate] = useState<any>([]);
  const [columnsRelate, setColumnsRelate] = useState<any>([]);

  useEffect(() => {}, []);

  return (
    <div className={styles.inputvariablePage}>
      <InputVariableTable
        headerTitle={<span style={{ fontWeight: 700 }}>入模变量相关参数</span>}
        rowKey={(record: any) => record.id}
        actionRef={actionRef}
        dataSource={modelResult?.inputVariableList}
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
