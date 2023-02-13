import { Fragment, useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { useDefineSample } from '../model';
import styles from './index.less';

export default (props: any) => {
  const { sampleData } = props;

  const columnsTrate: any = [
    {
      title: '样本类型',
      dataIndex: 'dataSetType',
      key: 'dataSetType',
    },
    {
      title: '好样本',
      dataIndex: 'goodCount',
      key: 'goodCount',
    },
    {
      title: '坏样本',
      dataIndex: 'badCount',
      key: 'badCount',
    },
    {
      title: '总计',
      dataIndex: 'totalNum',
      key: 'totalNum',
    },
    {
      title: '坏样本率',
      dataIndex: 'badRate',
      key: 'badRate',
    },
  ];

  const columnsMonth: any = [
    {
      title: '放款年月',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: '好样本',
      dataIndex: 'goodCount',
      key: 'goodCount',
    },
    {
      title: '坏样本',
      dataIndex: 'badCount',
      key: 'badCount',
    },
    {
      title: '总计',
      dataIndex: 'totalNum',
      key: 'totalNum',
    },
    {
      title: '坏样本率',
      dataIndex: 'badRate',
      key: 'badRate',
    },
    {
      title: '中间样本',
      dataIndex: 'midCount',
      key: 'midCount',
    },
    {
      title: '中间样本占比',
      dataIndex: 'midRate',
      key: 'midRate',
    },
  ];
  return (
    <div className={styles.tableBox}>
      <Descriptions bordered column={2} title={<span style={{ fontWeight: 700 }}>样本定义</span>}>
        <Descriptions.Item label="产品">{sampleData?.prodCatList}</Descriptions.Item>
        <Descriptions.Item label="渠道">{sampleData?.channelCatList}</Descriptions.Item>
        <Descriptions.Item label="训练集">{sampleData?.training}</Descriptions.Item>
        <Descriptions.Item label="跨期验证">2020-01~2020-12</Descriptions.Item>
        <Descriptions.Item label="其他验证" span={2}>
          {sampleData?.otherValidList}
        </Descriptions.Item>
        <Descriptions.Item label="表现期" span={2}>
          {sampleData?.performance}
        </Descriptions.Item>
        <Descriptions.Item label="好坏样本定义" span={2}>
          {sampleData?.goodAndBadDef}
        </Descriptions.Item>
      </Descriptions>
      <ProTable
        headerTitle={'整体分布'}
        rowKey={(record: any) => record.id}
        toolBarRender={() => []}
        options={false}
        bordered
        pagination={false}
        search={false}
        columns={columnsTrate}
        dataSource={sampleData?.dataSetList}
        scroll={{ y: 500 }}
      />
      <ProTable
        headerTitle={'按月份分布'}
        rowKey={(record: any) => record.id}
        toolBarRender={() => []}
        options={false}
        bordered
        pagination={{
          pageSize: 10,
        }}
        search={false}
        columns={columnsMonth}
        dataSource={sampleData?.monthList}
      />
    </div>
  );
};
