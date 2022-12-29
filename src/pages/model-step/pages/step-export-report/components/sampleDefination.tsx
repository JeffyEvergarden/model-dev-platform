import React, { useRef, useState, useEffect } from 'react';
import { Descriptions } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { useExportReportModel } from './../model';
import styles from './index.less';

export default (props: any) => {
  const actionRef = useRef<any>();

  const { sampleDividerQuery, monthSpreadQuery } = useExportReportModel();

  const [dataSourceSample, setDataSourceSample] = useState<any>([]);
  const [dataSourceMonth, setDataSourceMonth] = useState<any>([]);

  useEffect(() => {
    getSampleDivider(); //样本划分-整体分布
    getMonthSpread(); //按月份分布
  }, []);

  const getSampleDivider = async () => {
    let params = {};
    let res = await sampleDividerQuery();
    setDataSourceSample(res?.data?.list);
  };

  const getMonthSpread = async () => {
    let params = {};
    let res = await monthSpreadQuery();
    setDataSourceMonth(res?.data?.list);
  };

  const columnsSample: any[] = [
    {
      title: '样本类型',
      dataIndex: 'value1',
      key: 'value1',
    },
    {
      title: '好样本',
      dataIndex: 'value2',
      key: 'value2',
    },
    {
      title: '坏样本',
      dataIndex: 'value3',
      key: 'value3',
    },
    {
      title: '坏样本率',
      dataIndex: 'value4',
      key: 'value4',
    },
    {
      title: '总计',
      dataIndex: 'value5',
      key: 'value5',
    },
    {
      title: '中间客户',
      dataIndex: 'value6',
      key: 'value6',
    },
    {
      title: '中间样本占比',
      dataIndex: 'value7',
      key: 'value7',
    },
  ];

  const columnsMonth: any[] = [
    {
      title: '放款年月',
      dataIndex: 'value1',
      key: 'value1',
    },
    {
      title: '好样本',
      dataIndex: 'value2',
      key: 'value2',
    },
    {
      title: '坏样本',
      dataIndex: 'value3',
      key: 'value3',
    },
    {
      title: '坏样本率',
      dataIndex: 'value4',
      key: 'value4',
    },
    {
      title: '总计',
      dataIndex: 'value5',
      key: 'value5',
    },
    {
      title: '中间客户',
      dataIndex: 'value6',
      key: 'value6',
    },
    {
      title: '中间样本占比',
      dataIndex: 'value7',
      key: 'value7',
    },
  ];

  return (
    <div className={styles.sampleDefinationPage}>
      <Descriptions title="样本定义" bordered column={2}>
        <Descriptions.Item label="产品">---</Descriptions.Item>
        <Descriptions.Item label="渠道">---</Descriptions.Item>
        <Descriptions.Item label="训练集">2022-01~2022-03</Descriptions.Item>
        <Descriptions.Item label="验证集">2022-01~2022-03</Descriptions.Item>
        <Descriptions.Item label="表现期">---</Descriptions.Item>
        <Descriptions.Item label="观察期">---</Descriptions.Item>
        <Descriptions.Item label="好坏样本定义" span={2}>
          ---
        </Descriptions.Item>
      </Descriptions>
      <div className={styles.tableBox}>
        <span className={styles.tableTitle}>样本划分</span>
        <ProTable
          headerTitle="整体分部"
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          options={false}
          // bordered
          actionRef={actionRef}
          pagination={false}
          search={false}
          columns={columnsSample}
          dataSource={dataSourceSample}
        />
      </div>
      <div className={styles.tableBox}>
        <ProTable
          headerTitle="按月份分布"
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          options={false}
          // bordered
          actionRef={actionRef}
          pagination={false}
          search={false}
          columns={columnsMonth}
          dataSource={dataSourceMonth}
        />
      </div>
    </div>
  );
};
