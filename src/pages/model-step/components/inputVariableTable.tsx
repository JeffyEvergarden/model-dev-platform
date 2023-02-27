import React from 'react';
import { ProTable } from '@ant-design/pro-components';
import styles from './style.less';
import { useModel, history } from 'umi';
import { useComparePage } from '@/pages/model-step/pages/step-model-compare/model';

export default (props: any) => {
  const { headerTitle, rowKey, actionRef, optimalVersion, paramObj } = props;

  const { modelId } = useModel('step', (model: any) => ({
    modelId: model.modelId,
  }));

  const { getInputVariableRequest } = useComparePage();

  const getInputVariable = async (payload: any) => {
    let params = {
      page: payload?.current,
      pageSize: payload?.pageSize,
      itmModelRegisCode: modelId,
      modelVersion: optimalVersion,
    };
    let res = await getInputVariableRequest(params);
    return {
      data: res?.result?.tableData || [],
      total: res?.result?.totalSize || 0,
      current: payload?.current || 1,
      pageSize: payload?.pageSize || 10,
    };
  };

  const columns: any[] = [
    {
      title: '序号',
      width: 50,
      dataIndex: 'index',
      valueType: 'index',
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
      dataIndex: 'coef',
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
        // params={paramObj}
        request={async (params = {}, sort, filter) => {
          return getInputVariable({ ...params, sort, filter });
        }}
        // dataSource={dataSource}
      />
    </div>
  );
};
