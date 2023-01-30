import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import styles from './style.less';
import { useComparePage } from './../pages/step-model-compare/model';

export default (props: any) => {
  const { pageType } = props;

  const actionRef = useRef<any>();

  const { trateAndVerifyData, modelSortList, varCodeStableQuery, stableDataQuery } =
    useComparePage();

  //集合
  const [columnsCollect, setColumnsCollect] = useState<any>([
    {
      title: '集合',
      dataIndex: 'KS',
      key: 'KS',
      render: () => {
        return <div>KS</div>;
      },
    },
  ]);
  const [dataSourceCollect, setDataSourceCollect] = useState<any>([]);

  //年月
  const [columnsMonth, setColumnsMonth] = useState<any>([
    {
      title: '年月',
      dataIndex: 'KS',
      key: 'KS',
      render: () => {
        return <div>KS</div>;
      },
    },
  ]);
  const [dataSourceMonth, setDataSourceMonth] = useState<any>([]);

  //训练集、验证集
  const [dataSourceTrate, setDataSourceTrate] = useState<any>([]);
  const [dataSourceVerify, setDataSourceVerify] = useState<any>([]);

  //模型排序性
  const [columnsModelSort, setColumnsModelSort] = useState<any>([
    {
      title: '评分区间',
      dataIndex: 'scoreSection',
      key: 'scoreSection',
    },
  ]);
  const [dataSourceModelSort, setDataSourceModelSort] = useState<any>([]);

  //模型稳定性
  const [columnsModelStable, setColumnsModelStable] = useState<any>([
    {
      title: '评分区间',
      dataIndex: 'value1',
      key: 'value1',
    },
    {
      title: '占比',
      children: [
        {
          title: '训练集占比',
          dataIndex: 'value2',
          key: 'value2',
        },
        {
          title: '验证集占比',
          dataIndex: 'value3',
          key: 'value3',
        },
        // {
        //   title: '其他验证1占比',
        //   dataIndex: 'value4',
        //   key: 'value4'
        // }, {
        //   title: '其他验证2占比',
        //   dataIndex: 'value5',
        //   key: 'value5'
        // }
      ],
    },
    {
      title: 'PSI',
      children: [
        {
          title: 'PSI_valid',
          dataIndex: 'value6',
          key: 'value6',
          render: (t: any, r: any, i: any) => {
            return <span style={{ color: r.value1 == '合计' ? 'red' : '' }}>{t}</span>;
          },
        },
        // {
        //   title: 'PSI_valid1',
        //   dataIndex: 'value7',
        //   key: 'value7'
        // }, {
        //   title: 'PSI_valid2',
        //   dataIndex: 'value8',
        //   key: 'value8'
        // }
      ],
    },
  ]);
  const [dataSourceModelStable, setDataSourceModelStable] = useState<any>([]);

  //变量稳定性
  const [columnsVarCodeStable, setColumnsVarCodeStable] = useState<any>([
    {
      title: '变量名称',
      dataIndex: 'value1',
      key: 'value1',
    },
    {
      title: '中文名字',
      dataIndex: 'value2',
      key: 'value2',
    },
    {
      title: 'PSI_valid',
      dataIndex: 'value3',
      key: 'value3',
    },
  ]);

  useEffect(() => {
    getCollect();
    getTrateAndVerifyData();
    getModelSortList();
    getStableData();
  }, []);

  const getCollect = () => {
    let temp = [
      { name: '训练集', dataIndex: 'trate' },
      { name: '验证集', dataIndex: 'verify' },
      { name: '其他验证集', dataIndex: 'other' },
    ];
    let dataTemp = [{ trate: '36.25%', verify: '55.25%', other: '46.55%' }];
    let tempColumn = [...columnsCollect];
    temp.map((item: any) => {
      tempColumn.push({
        title: item?.name,
        dataIndex: item?.dataIndex,
        key: item?.name,
      });
    });
    setColumnsCollect(tempColumn);
    setDataSourceCollect(dataTemp);

    let tempMonth = [
      { name: '2021-02', dataIndex: '2021-02' },
      { name: '2021-03', dataIndex: '2021-03' },
      { name: '2021-04', dataIndex: '2021-04' },
    ];
    let dataTempMonth = [{ '2021-02': '36.25%', '2021-03': '55.25%', '2021-04': '46.55%' }];
    let tempColumnMonth = [...columnsMonth];
    tempMonth.map((item: any) => {
      tempColumnMonth.push({
        title: item?.name,
        dataIndex: item?.dataIndex,
        key: item?.name,
      });
    });
    setColumnsMonth(tempColumnMonth);
    setDataSourceMonth(dataTempMonth);
  };

  const getTrateAndVerifyData = async () => {
    let params = {};
    let res = await trateAndVerifyData(params);
    setDataSourceTrate(res?.data?.listTrate);
    setDataSourceVerify(res?.data?.listVerify);
  };

  const getModelSortList = async () => {
    let params = {};
    let res = await modelSortList(params);
    let columnsModelSortTemp = [...columnsModelSort];
    res?.data?.columnsList.map((item: any) => {
      columnsModelSortTemp.push({
        title: item?.name,
        dataIndex: item?.dataIndex,
        key: item?.name,
      });
    });
    setColumnsModelSort(columnsModelSortTemp);
    setDataSourceModelSort(res?.data?.dataList);
  };

  const getVarCodeStable = async (payload: any) => {
    let params = {};
    let res = await varCodeStableQuery(params);
    let columnsVarCodeStableTemp: any[] = [...columnsVarCodeStable];
    res?.data?.columnsVarCodeStableLsit.map((item: any) => {
      columnsVarCodeStableTemp.push({
        title: item?.name,
        dataIndex: item?.dataIndex,
        key: item?.dataIndex,
      });
    });
    setColumnsVarCodeStable(columnsVarCodeStableTemp);
    return {
      data: res?.data?.list || [],
      total: res?.data?.totalPage || 0,
      current: payload.current,
      pageSize: payload.pageSize,
    };
  };

  const getStableData = async () => {
    let params = {};
    let res = await stableDataQuery(params);
    setDataSourceModelStable(res?.data?.list);
    let columnsModelStableTemp: any[] = [...columnsModelStable];
    res?.data?.otherVerifyList?.map((item: any) => {
      columnsModelStableTemp?.[1]?.children?.push({
        title: item?.name,
        dataIndex: item?.dataIndex,
        key: item?.name,
      });
    });
    res?.data?.PSI_valid_List?.map((item: any) => {
      columnsModelStableTemp?.[2]?.children?.push({
        title: item?.name,
        dataIndex: item?.dataIndex,
        key: item?.name,
        render: (t: any, r: any, i: any) => {
          return <span style={{ color: r.value1 == '合计' ? 'red' : '' }}>{t}</span>;
        },
      });
    });
    setColumnsModelStable(columnsModelStableTemp);
  };

  const columnsTrate: any = [
    {
      title: '评分区间',
      dataIndex: 'value1',
      key: 'value1',
    },
    {
      title: '总样本数',
      dataIndex: 'value2',
      key: 'value2',
    },
    {
      title: '好样本数',
      dataIndex: 'value3',
      key: 'value3',
    },
    {
      title: '坏样本数',
      dataIndex: 'value4',
      key: 'value4',
    },
    {
      title: '坏样本率',
      dataIndex: 'value5',
      key: 'value5',
    },
    {
      title: '累计好样本率',
      dataIndex: 'value6',
      key: 'value6',
    },
    {
      title: '累计坏样本率',
      dataIndex: 'value7',
      key: 'value7',
    },
    {
      title: 'KS',
      dataIndex: 'value8',
      key: 'value8',
    },
    {
      title: 'lift',
      dataIndex: 'value9',
      key: 'value9',
    },
  ];

  return (
    <div>
      <div className={styles.tableBox}>
        <ProTable
          headerTitle={
            pageType == 'modelEffect' ? <span style={{ fontWeight: 700 }}>模型效果</span> : ''
          }
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          options={false}
          bordered
          pagination={false}
          search={false}
          columns={columnsCollect}
          dataSource={dataSourceCollect}
          scroll={{ y: 500 }}
        />
      </div>
      <div className={styles.tableBox}>
        <ProTable
          headerTitle=""
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          options={false}
          bordered
          pagination={false}
          search={false}
          columns={columnsMonth}
          dataSource={dataSourceMonth}
          scroll={{ y: 500 }}
        />
      </div>
      <div className={styles.tableBox}>
        <ProTable
          headerTitle={pageType == 'modelEffect' ? '训练集' : '训练集分布'}
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
      </div>
      <div className={styles.tableBox}>
        <ProTable
          headerTitle={pageType == 'modelEffect' ? '训练集' : '训练集分布'}
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          options={false}
          bordered
          pagination={false}
          search={false}
          columns={columnsTrate}
          dataSource={dataSourceVerify}
          scroll={{ y: 500 }}
        />
      </div>
      {pageType == 'modelEffect' && (
        <div className={styles.tableBox}>
          <ProTable
            headerTitle={<span style={{ fontWeight: 700 }}>模型稳定性</span>}
            rowKey={(record: any) => record.id}
            toolBarRender={() => []}
            options={false}
            bordered
            pagination={false}
            search={false}
            columns={columnsModelSort}
            dataSource={dataSourceModelSort}
            scroll={{ y: 500 }}
          />
        </div>
      )}
      <div className={styles.tableBox}>
        <ProTable
          headerTitle={
            pageType == 'modelEffect' ? (
              <span style={{ fontWeight: 700 }}>模型稳定性</span>
            ) : (
              '模型稳定性'
            )
          }
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          options={false}
          bordered
          pagination={false}
          search={false}
          columns={columnsModelStable}
          dataSource={dataSourceModelStable}
          scroll={{ y: 500 }}
        />
      </div>
      <div className={styles.tableBox}>
        <ProTable
          headerTitle={
            pageType == 'modelEffect' ? (
              <span style={{ fontWeight: 700 }}>变量稳定性</span>
            ) : (
              '变量稳定性'
            )
          }
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          options={false}
          bordered
          actionRef={actionRef}
          pagination={{
            pageSize: 10,
          }}
          search={false}
          columns={columnsVarCodeStable}
          request={async (params = {}) => {
            return getVarCodeStable(params);
          }}
        />
      </div>
    </div>
  );
};
