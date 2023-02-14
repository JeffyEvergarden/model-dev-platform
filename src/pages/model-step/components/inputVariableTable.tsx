import React from 'react';
import { ProTable } from '@ant-design/pro-components';
import styles from './style.less';

export default (props: any) => {
  const { headerTitle, rowKey, actionRef, dataSource } = props;

  const columns: any[] = [
    {
      title: '序号',
      width: 50,
      dataIndex: 'sortId',
      // render: (t: any, r: any, index: number) => {
      //   return (Number(pageInfo.pageNum) - 1) * Number(pageInfo.pageSize) + Number(index);
      // },
    },
    {
      title: '变量名称',
      dataIndex: 'variable',
      ellipsis: true,
    },
    {
      title: '中文名称',
      dataIndex: 'variableName',
      ellipsis: true,
    },
    ,
    {
      title: '变量来源',
      dataIndex: 'variableSource',
      ellipsis: true,
    },
    {
      title: '自由度',
      dataIndex: 'freeDegree',
      ellipsis: true,
    },
    {
      title: 'coef_',
      dataIndex: 'coef_',
      ellipsis: true,
    },
    {
      title: 'VIF',
      dataIndex: 'vif',
      ellipsis: true,
    },
    {
      title: 'wald_test',
      dataIndex: 'waldTest',
      ellipsis: true,
    },
    {
      title: 'p_value',
      dataIndex: 'pvalue',
      ellipsis: true,
    },
    {
      title: 'iv',
      dataIndex: 'iv',
      ellipsis: true,
    },
  ];
  return (
    <div className={styles.TableCommonSty}>
      <ProTable
        headerTitle={headerTitle}
        rowKey={rowKey}
        toolBarRender={() => []}
        options={false}
        bordered
        actionRef={actionRef}
        pagination={{
          pageSize: 10,
        }}
        scroll={{ x: columns?.length * 150 }}
        search={false}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};
