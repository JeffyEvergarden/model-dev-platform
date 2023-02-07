import { Fragment, useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { useDefineSample } from '../model';
import styles from './index.less';

export default () => {
  const [dataSourceTrate, setDataSourceTrate] = useState<any>([]);

  const { getDefineSample, sampleListByMonth } = useDefineSample();

  useEffect(() => {
    getTrateAndVerifyData();
  }, []);

  const getsampleBymonth = async (payload: any) => {
    let params = {};
    let res = await sampleListByMonth(params);
    return {
      data: res?.data?.list || [],
      total: res?.data?.totalPage || 0,
      current: payload.current,
      pageSize: payload.pageSize,
    };
  };

  const getTrateAndVerifyData = async () => {
    let params = {};
    let res = await getDefineSample(params);
    setDataSourceTrate(res?.data?.list);
  };

  const columnsTrate: any = [
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
      title: '总计',
      dataIndex: 'value4',
      key: 'value4',
    },
    {
      title: '坏样本率',
      dataIndex: 'value5',
      key: 'value5',
    },
  ];

  const columnsMonth: any = [
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
      title: '总计',
      dataIndex: 'value4',
      key: 'value4',
    },
    {
      title: '坏样本率',
      dataIndex: 'value5',
      key: 'value5',
    },
    {
      title: '中间样本',
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
    <div className={styles.tableBox}>
      <Descriptions bordered column={2} title={<span style={{ fontWeight: 700 }}>样本定义</span>}>
        <Descriptions.Item label="产品">10120099</Descriptions.Item>
        <Descriptions.Item label="渠道">-</Descriptions.Item>
        <Descriptions.Item label="训练集">2019-01~2019-12</Descriptions.Item>
        <Descriptions.Item label="跨期验证">2020-01~2020-12</Descriptions.Item>
        <Descriptions.Item label="其他验证" span={2}>
          2020-01~2020-12
        </Descriptions.Item>
        <Descriptions.Item label="表现期" span={2}>
          通过分析vintage，在mob26之后，M2+逾期金额占比增速放缓。为了保证样本的新鲜度，同时兼顾风险暴露情况，将表现期定为至少12期。
        </Descriptions.Item>
        <Descriptions.Item label="好坏样本定义" span={2}>
          在表现期内曾逾期M2+为坏样本，从未逾期为好样本，其他为中间样本。
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
        dataSource={dataSourceTrate}
        scroll={{ y: 500 }}
      />
      <ProTable
        headerTitle={'整体分布'}
        rowKey={(record: any) => record.id}
        toolBarRender={() => []}
        options={false}
        bordered
        pagination={false}
        search={false}
        columns={columnsTrate}
        dataSource={dataSourceTrate}
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
        request={async (params = {}) => {
          return getsampleBymonth(params);
        }}
      />
    </div>
  );
};
