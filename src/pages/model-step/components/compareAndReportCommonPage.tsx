import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import styles from './style.less';
import { useComparePage } from './../pages/step-model-compare/model';
import { useModel, history } from 'umi';

export default (props: any) => {
  const { pageType, modelResult, optimalVersion } = props;

  const actionRef = useRef<any>();

  const {
    getModelDatasetDistributionRequest,
    getModelStabilityRequest,
    getVariableStabilityRequest,
    getModelSortInfoRequest,
  } = useComparePage();

  const [trateAndVerifyData, setTrateAndVerifyData] = useState<any>({});
  const [modelStabilityList, setModelStabilityList] = useState<any>({});
  const [sortData, setSortData] = useState<any>({});
  const [psiHeadList, setPsiHeadList] = useState<any>([]);

  const { modelId } = useModel('step', (model: any) => ({
    modelId: model.modelId,
  }));

  useEffect(() => {
    getModelDatasetDistribution();
    getModelStability();
    getSortData();
  }, []);

  const getCollectColumns = (data: any, type: string) => {
    let tempColumn: any[] = [
      {
        title: `${type}`,
        dataIndex: 'KS',
        key: 'KS',
        width: 100,
        render: () => {
          return <div>KS</div>;
        },
      },
      // {
      //   title: '训练集',
      //   dataIndex: 'trainKsValue',
      //   key: 'trainKsValue',
      // },
      // {
      //   title: '验证集',
      //   dataIndex: 'validKsValue',
      //   key: 'validKsValue',
      // },
    ];
    data?.map((item: any) => {
      tempColumn.push({
        title: item,
        dataIndex: item,
        key: item,
      });
    });
    return tempColumn;
  };

  const getSortColums = (data: any) => {
    let tempColumn: any[] = [
      {
        title: `评分区间`,
        dataIndex: 'scoreRange',
        key: 'scoreRange',
      },
    ];
    data?.map((item: any) => {
      tempColumn.push({
        title: item,
        dataIndex: item,
        key: item,
      });
    });
    return tempColumn;
  };

  const getStableColums = (data: any) => {
    let tempColumn: any[] = [
      {
        title: '评分区间',
        dataIndex: 'scoreRange',
        key: 'scoreRange',
        ellipsis: true,
        fixed: 'left',
      },
      {
        title: '占比',
        children: [
          // {
          //   title: '训练集占比',
          //   dataIndex: 'validRate',
          //   key: 'validRate',
          // },
          // {
          //   title: '验证集占比',
          //   dataIndex: 'trainRate',
          //   key: 'trainRate',
          // },
        ],
      },
      {
        title: 'PSI',
        children: [
          // {
          //   title: 'PSI_valid',
          //   dataIndex: 'PSI_valid',
          //   key: 'PSI_valid',
          //   render: (t: any, r: any, i: any) => {
          //     return <span style={{ color: r.PSI_valid == '合计' ? 'red' : '' }}>{t}</span>;
          //   },
          // },
        ],
      },
    ];
    data?.rateHeadList?.map((item: any) => {
      tempColumn?.[1]?.children?.push({
        title: item,
        dataIndex: item,
        key: item,
      });
    });
    data?.psiHeadList?.map((item: any, index: any) => {
      tempColumn?.[2]?.children?.push({
        title: item,
        dataIndex: item,
        key: item,
        render: (t: any, r: any, i: any) => {
          return (
            <span
              style={{ color: r.scoreRange == '总计' && pageType == 'comparePage' ? 'red' : '' }}
            >
              {t}
            </span>
          );
        },
      });
    });
    return tempColumn;
  };

  const getVarCodeStableColums = (data: any) => {
    let tempColumn: any[] = [
      {
        title: '变量名称',
        dataIndex: 'variable',
        key: 'variable',
        ellipsis: true,
      },
      {
        title: '中文名字',
        dataIndex: 'variableName',
        key: 'variableName',
        ellipsis: true,
      },
      // {
      //   title: 'PSI_valid',
      //   dataIndex: 'PSI_valid',
      //   key: 'PSI_valid',
      // },
    ];
    data?.map((item: any) => {
      tempColumn.push({
        title: item,
        dataIndex: item,
        key: item,
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

  //12.6 训练集分布/验证集分布接口
  const getModelDatasetDistribution = async () => {
    let params = {
      itmModelRegisCode: modelId,
      modelVersion: optimalVersion,
    };
    let res = await getModelDatasetDistributionRequest(params);
    setTrateAndVerifyData(res?.result);
  };

  //12.7 模型稳定性列表
  const getModelStability = async () => {
    let params = {
      itmModelRegisCode: modelId,
      modelVersion: optimalVersion,
    };
    let res = await getModelStabilityRequest(params);
    setModelStabilityList(res?.result);
  };

  //12.8 变量稳定性列表
  const getVariableStability = async (payload: any) => {
    let params = {
      page: payload?.current,
      pageSize: payload?.pageSize,
      itmModelRegisCode: modelId,
      modelVersion: optimalVersion,
    };
    let res = await getVariableStabilityRequest(params);
    setPsiHeadList(res?.result?.psiHeadList);
    return {
      data: res?.result?.tableData || [],
      total: res?.result?.totalSize || 0,
      current: payload?.current || 1,
      pageSize: payload?.pageSize || 10,
    };
  };

  //12.9 模型排序性
  const getSortData = async () => {
    let params = {
      itmModelRegisCode: modelId,
      modelVersion: optimalVersion,
    };
    let res = await getModelSortInfoRequest(params);
    setSortData(res?.result);
  };

  const columnsTrate: any = [
    {
      title: '评分区间',
      dataIndex: 'scoreRange',
      key: 'scoreRange',
      ellipsis: true,
    },
    {
      title: '总样本数',
      dataIndex: 'sampleTotal',
      key: 'sampleTotal',
      ellipsis: true,
    },
    {
      title: '好样本数',
      dataIndex: 'sampleGood',
      key: 'sampleGood',
      ellipsis: true,
    },
    {
      title: '坏样本数',
      dataIndex: 'sampleBad',
      key: 'sampleBad',
      ellipsis: true,
    },
    {
      title: '坏样本率',
      dataIndex: 'sampleBadRate',
      key: 'sampleBadRate',
      ellipsis: true,
    },
    {
      title: '累计好样本率',
      dataIndex: 'addupGoodRate',
      key: 'addupGoodRate',
      ellipsis: true,
    },
    {
      title: '累计坏样本率',
      dataIndex: 'addupBadRate',
      key: 'addupBadRate',
      ellipsis: true,
    },
    {
      title: 'KS',
      dataIndex: 'ks',
      key: 'ks',
      ellipsis: true,
    },
    {
      title: 'lift',
      dataIndex: 'lift',
      key: 'lift',
      ellipsis: true,
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
          columns={getCollectColumns(modelResult?.collectionKsData?.rowList, '集合')}
          dataSource={modelResult?.collectionKsData?.collectionKsList}
          scroll={{
            y: 500,
            x: getCollectColumns(modelResult?.collectionKsData?.rowList, '集合')?.length * 150,
          }}
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
          columns={getCollectColumns(modelResult?.monthKsData?.rowList, '年月')}
          dataSource={modelResult?.monthKsData?.monthKsList}
          scroll={{
            y: 500,
            x: getCollectColumns(modelResult?.monthKsData?.rowList, '年月')?.length * 150,
          }}
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
          dataSource={trateAndVerifyData?.trainDataset}
          scroll={{ y: 500, x: columnsTrate?.length * 150 }}
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
          dataSource={trateAndVerifyData?.validDataset}
          scroll={{ y: 500, x: columnsTrate?.length * 150 }}
        />
      </div>
      {pageType == 'modelEffect' && (
        <div className={styles.tableBox}>
          <ProTable
            headerTitle={<span style={{ fontWeight: 700 }}>模型排序性</span>}
            rowKey={(record: any) => record?.id}
            toolBarRender={() => []}
            options={false}
            bordered
            pagination={false}
            search={false}
            columns={getSortColums(sortData?.rateHeadList)}
            dataSource={sortData?.modelSortInfoList}
            scroll={{ y: 500, x: getSortColums(sortData?.rateHeadList)?.length * 150 }}
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
          rowKey={(record: any) => record?.id}
          toolBarRender={() => []}
          options={false}
          bordered
          pagination={false}
          search={false}
          columns={getStableColums(modelStabilityList)}
          dataSource={modelStabilityList?.modelStabilityList}
          scroll={{
            y: 500,
            x:
              (getStableColums(modelStabilityList)?.[1]?.children?.length +
                getStableColums(modelStabilityList)?.[2]?.children?.length +
                2) *
              150,
          }}
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
          scroll={{ x: getVarCodeStableColums(psiHeadList)?.length * 150 }}
          columns={getVarCodeStableColums(psiHeadList)}
          // dataSource={modelResult?.variableStabilityList}
          request={async (params = {}, sort, filter) => {
            return getVariableStability({ ...params, sort, filter });
          }}
        />
      </div>
    </div>
  );
};
