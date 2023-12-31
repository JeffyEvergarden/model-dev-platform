import React, { useRef, useState, useEffect } from 'react';
import { Descriptions } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import styles from './index.less';

export default (props: any) => {
  const { sampleData } = props;
  const actionRef = useRef<any>();

  const columnsSample: any[] = [
    {
      title: '样本类型',
      dataIndex: 'sampleType',
      key: 'sampleType',
    },
    {
      title: '好样本',
      dataIndex: 'goodSample',
      key: 'goodSample',
    },
    {
      title: '坏样本',
      dataIndex: 'badSample',
      key: 'badSample',
    },
    {
      title: '坏样本率',
      dataIndex: 'badRate',
      key: 'badRate',
    },
    {
      title: '总计',
      dataIndex: 'total',
      key: 'total',
    },
    // {
    //   title: '中间客户',
    //   dataIndex: 'value6',
    //   key: 'value6',
    // },
    // {
    //   title: '中间样本占比',
    //   dataIndex: 'value7',
    //   key: 'value7',
    // },
  ];

  const columnsMonth: any[] = [
    {
      title: '放款年月',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: '好样本',
      dataIndex: 'goodSample',
      key: 'goodSample',
    },
    {
      title: '坏样本',
      dataIndex: 'badSample',
      key: 'badSample',
    },
    {
      title: '坏样本率',
      dataIndex: 'badRate',
      key: 'badRate',
    },
    {
      title: '总计',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: '中间客户',
      dataIndex: 'midSample',
      key: 'midSample',
    },
    {
      title: '中间样本占比',
      dataIndex: 'midRate',
      key: 'midRate',
    },
  ];

  return (
    <div className={styles.sampleDefinationPage}>
      <Descriptions title="样本定义" bordered column={2}>
        <Descriptions.Item label="产品">{sampleData?.prodCat}</Descriptions.Item>
        <Descriptions.Item label="渠道">{sampleData?.channelCat}</Descriptions.Item>
        <Descriptions.Item label="训练集">{sampleData?.training}</Descriptions.Item>
        <Descriptions.Item label="验证集">{sampleData?.validation}</Descriptions.Item>
        <Descriptions.Item label="表现期">{sampleData?.performance}</Descriptions.Item>
        {/* <Descriptions.Item label="观察期">---</Descriptions.Item> */}
        <Descriptions.Item label="好坏样本定义">{sampleData?.goodAndBadDef}</Descriptions.Item>
      </Descriptions>
      <div className={styles.tableBox}>
        <span className={styles.tableTitle}>样本划分</span>
        <ProTable
          headerTitle="整体分布"
          rowKey={(record: any, index) => record.sampleType + index}
          toolBarRender={() => []}
          options={false}
          // bordered
          actionRef={actionRef}
          pagination={false}
          search={false}
          columns={columnsSample}
          dataSource={sampleData?.totalSetList}
        />
      </div>
      <div className={styles.tableBox}>
        <ProTable
          headerTitle="按月份分布"
          rowKey={(record: any) => record.month}
          toolBarRender={() => []}
          options={false}
          // bordered
          actionRef={actionRef}
          pagination={false}
          search={false}
          columns={columnsMonth}
          dataSource={sampleData?.monthList}
        />
      </div>
    </div>
  );
};
