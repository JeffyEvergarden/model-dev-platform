import React from 'react';
import { ProTable } from '@ant-design/pro-components';
import styles from './style.less';

export default (props: any) => {
  const { headerTitle, rowKey, actionRef, pageInfo, request } = props;

  const columns: any[] = [
    {
      title: '序号',
      width: 50,
      dataIndex: 'index',
      render: (t: any, r: any, index: number) => {
        return (Number(pageInfo.pageNum) - 1) * Number(pageInfo.pageSize) + Number(index);
      },
    },
    {
      title: '变量名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '中文名称',
      dataIndex: 'nameZH',
      ellipsis: true,
    },
    ,
    {
      title: '变量来源',
      dataIndex: 'source',
      ellipsis: true,
    },
    {
      title: '自由度',
      dataIndex: 'free',
      ellipsis: true,
    },
    {
      title: 'coef_',
      dataIndex: 'coef_',
      ellipsis: true,
    },
    {
      title: 'VIF',
      dataIndex: 'VIF',
      ellipsis: true,
    },
    {
      title: 'wald_test',
      dataIndex: 'wald_test',
      ellipsis: true,
    },
    {
      title: 'p_value',
      dataIndex: 'p_value',
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
        request={async (params = {}) => {
          return request(params);
        }}
      />
    </div>
  );
};
