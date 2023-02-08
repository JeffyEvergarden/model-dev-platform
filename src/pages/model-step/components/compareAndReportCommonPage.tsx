import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import styles from './style.less';
import { useComparePage } from './../pages/step-model-compare/model';

export default (props: any) => {
  const { pageType, modelResult } = props;

  const actionRef = useRef<any>();

  const { trateAndVerifyData, modelSortList, varCodeStableQuery, stableDataQuery } =
    useComparePage();

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
  const [columnsModelStable, setColumnsModelStable] = useState<any>([]);
  const [dataSourceModelStable, setDataSourceModelStable] = useState<any>([]);

  const getCollectColumns = (data: any) => {
    let tempColumn: any[] = [
      {
        title: '集合',
        dataIndex: 'KS',
        key: 'KS',
        width: 100,
        render: () => {
          return <div>KS</div>;
        },
      },
      {
        title: '训练集',
        dataIndex: 'trainKsValue',
        key: 'trainKsValue',
      },
      {
        title: '验证集',
        dataIndex: 'validKsValue',
        key: 'validKsValue',
      },
    ];
    data?.otherValidKsList?.map((item: any) => {
      tempColumn.push({
        title: item?.name,
        dataIndex: item?.value,
        key: item?.value,
        render: (t: any, r: any, i: any) => {
          return <Fragment>{item?.value}</Fragment>;
        },
      });
    });
    return tempColumn;
  };

  const getMonthColumns = (data: any) => {
    let tempColumn: any = [
      {
        title: '集合',
        dataIndex: 'KS',
        key: 'KS',
        width: 100,
        render: () => {
          return <div>KS</div>;
        },
      },
    ];
    if (data) {
      Object.keys(data)?.map((item: any) => {
        tempColumn.push({
          title: item,
          dataIndex: item,
          key: item,
        });
      });
    }
    return tempColumn;
  };

  const getDataSource = (data: any) => {
    let temp: any[] = [];
    if (data) {
      temp.push(data);
    }
    return temp;
  };

  const getDataScoreList = (type: any, data: any) => {
    let tempData = data?.filter((item: any) => item?.datasetType == type);
    return tempData;
  };

  const getStableColums = (data: any) => {
    let tempColumn: any[] = [
      {
        title: '评分区间',
        dataIndex: 'scoreRang',
        key: 'scoreRang',
      },
      {
        title: '占比',
        children: [
          {
            title: '训练集占比',
            dataIndex: 'validRate',
            key: 'validRate',
          },
          {
            title: '验证集占比',
            dataIndex: 'trainRate',
            key: 'trainRate',
          },
        ],
      },
      {
        title: 'PSI',
        children: [
          {
            title: 'PSI_valid',
            dataIndex: 'PSI_valid',
            key: 'PSI_valid',
            render: (t: any, r: any, i: any) => {
              return <span style={{ color: r.PSI_valid == '合计' ? 'red' : '' }}>{t}</span>;
            },
          },
        ],
      },
    ];
    data?.[0]?.otherValidRateList?.map((item: any) => {
      tempColumn?.[1]?.children?.push({
        title: item?.name,
        dataIndex: item?.value,
        key: item?.value,
        render: (t: any, r: any, i: any) => {
          return <Fragment>{item?.value}</Fragment>;
        },
      });
    });
    data?.[0]?.otherValidPsiList?.map((item: any) => {
      tempColumn?.[2]?.children?.push({
        title: item?.name,
        dataIndex: item?.value,
        key: item?.value,
        render: (t: any, r: any, i: any) => {
          return <span style={{ color: item.value == '合计' ? 'red' : '' }}>{item?.value}</span>;
        },
      });
    });
    return tempColumn;
  };

  const AddStandard = (data: any) => {
    let temp: any[] = [];
    if (data) {
      temp = [...data];
      temp.push(
        {
          scoreRang: '基准线1', //评分区间
          trainRate: '-', //训练集占比
          validRate: '-',
          otherValidRateList: [
            //其他验证
            { name: '验证集1', value: '-' },
            { name: '验证集2', value: '-' },
          ],
          PSI_train: '0.1', //训练集PSI指标值
          PSI_valid: '0.1', //验证集PSI指标值
          otherValidPsiList: [
            //其他验证1PSI指标值
            { name: 'PSI_valid1', value: '0.1' },
            { name: 'PSI_valid2', value: '0.1' },
          ],
        },
        {
          scoreRang: '基准线1', //评分区间
          trainRate: '-', //训练集占比
          validRate: '-',
          otherValidRateList: [
            //其他验证
            { name: '验证集1', value: '-' },
            { name: '验证集2', value: '-' },
          ],
          PSI_train: '0.25', //训练集PSI指标值
          PSI_valid: '0.25', //验证集PSI指标值
          otherValidPsiList: [
            //其他验证1PSI指标值
            { name: 'PSI_valid1', value: '0.25' },
            { name: 'PSI_valid2', value: '0.25' },
          ],
        },
      );
    }
    return temp;
  };

  const getVarCodeStableColums = (data: any) => {
    let tempColumn: any[] = [
      {
        title: '变量名称',
        dataIndex: 'variable',
        key: 'variable',
      },
      {
        title: '中文名字',
        dataIndex: 'variableName',
        key: 'variableName',
      },
      {
        title: 'PSI_valid',
        dataIndex: 'PSI_valid',
        key: 'PSI_valid',
      },
    ];
    data?.[0]?.otherPsiValidList?.map((item: any) => {
      tempColumn.push({
        title: item?.name,
        dataIndex: item?.value,
        key: item?.value,
        render: (t: any, r: any, i: any) => {
          return <Fragment>{item?.value}</Fragment>;
        },
      });
    });
    tempColumn.push(
      {
        title: '基准线1',
        render: (t: any, r: any, i: any) => {
          return <Fragment>0.1</Fragment>;
        },
      },
      {
        title: '基准线1',
        render: (t: any, r: any, i: any) => {
          return <Fragment>0.25</Fragment>;
        },
      },
    );
    return tempColumn;
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
      dataIndex: 'scoreRang',
      key: 'scoreRang',
    },
    {
      title: '总样本数',
      dataIndex: 'totalSampleNum',
      key: 'totalSampleNum',
    },
    {
      title: '好样本数',
      dataIndex: 'goodSampleNum',
      key: 'goodSampleNum',
    },
    {
      title: '坏样本数',
      dataIndex: 'badSampleNum',
      key: 'badSampleNum',
    },
    {
      title: '坏样本率',
      dataIndex: 'badSampleRate',
      key: 'badSampleRate',
    },
    {
      title: '累计好样本率',
      dataIndex: 'totalGoodSampleRate',
      key: 'totalGoodSampleRate',
    },
    {
      title: '累计坏样本率',
      dataIndex: 'totalBadSampleRate',
      key: 'totalBadSampleRate',
    },
    {
      title: 'KS',
      dataIndex: 'ks',
      key: 'ks',
    },
    {
      title: 'lift',
      dataIndex: 'lift',
      key: 'lift',
    },
  ];

  return (
    <div>
      <div className={styles.tableBox}>
        <ProTable
          headerTitle={
            pageType == 'modelEffect' ? <span style={{ fontWeight: 700 }}>模型效果</span> : ''
          }
          rowKey={(record: any) => record?.index}
          toolBarRender={() => []}
          options={false}
          bordered
          pagination={false}
          search={false}
          columns={getCollectColumns(modelResult?.collectionKsObj)}
          dataSource={getDataSource(modelResult?.collectionKsObj)}
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
          columns={getMonthColumns(modelResult?.monthKsObj)}
          dataSource={getDataSource(modelResult?.monthKsObj)}
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
          dataSource={getDataScoreList('1', modelResult?.dataScoreList)}
          scroll={{ y: 500 }}
        />
      </div>
      <div className={styles.tableBox}>
        <ProTable
          headerTitle={pageType == 'modelEffect' ? '验证集' : '验证集分布'}
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          options={false}
          bordered
          pagination={false}
          search={false}
          columns={columnsTrate}
          dataSource={getDataScoreList('2', modelResult?.dataScoreList)}
          scroll={{ y: 500 }}
        />
      </div>
      {/* {pageType == 'modelEffect' && (
        <div className={styles.tableBox}>
          <ProTable
            headerTitle={<span style={{ fontWeight: 700 }}>模型稳定性</span>}
            rowKey={(record: any) => record?.id}
            toolBarRender={() => []}
            options={false}
            bordered
            pagination={false}
            search={false}
            columns={getStableColums(modelResult?.modelStabilityList)}
            dataSource={dataSourceModelSort}
            scroll={{ y: 500 }}
          />
        </div>
      )} */}
      <div className={styles.tableBox}>
        <ProTable
          headerTitle={
            pageType == 'modelEffect' ? (
              <span style={{ fontWeight: 700 }}>模型稳定性</span>
            ) : (
              '模型稳定性'
            )
          }
          rowKey={(record: any) => record?.id}
          toolBarRender={() => []}
          options={false}
          bordered
          pagination={false}
          search={false}
          columns={getStableColums(modelResult?.modelStabilityList)}
          dataSource={AddStandard(modelResult?.modelStabilityList)}
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
          columns={getVarCodeStableColums(modelResult?.variableStabilityList)}
          dataSource={modelResult?.variableStabilityList}
        />
      </div>
    </div>
  );
};
