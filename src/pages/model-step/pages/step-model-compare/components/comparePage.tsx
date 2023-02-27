import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Descriptions, Button, Space, Progress, message } from 'antd';
import styles from './index.less';
import { ProTable } from '@ant-design/pro-components';
import { useComparePage } from './../model';
import { useModel, history } from 'umi';
import classnames from 'classnames';
import { ZoomInOutlined } from '@ant-design/icons';
import RelateModal from './relateModal';
import InputVariableTable from '@/pages/model-step/components/inputVariableTable';
import VarCodeRelateTable from '@/pages/model-step/components/varCodeRelateTable';
import ScoreCardTable from '@/pages/model-step/components/scoreCardTable';
import CompareAndReportCommonPage from '@/pages/model-step/components/compareAndReportCommonPage';
import { changeData } from '@/utils';
import config from '@/config';
const successCode = config.successCode;

export default (props: any) => {
  const { activeKey } = props;

  const {
    loading,
    setLoading,
    getModelStructureParamRequest,
    getModelResultRequest,
    getInputVariable,
    scoreCardListReuqest,
  } = useComparePage();

  const actionRef = useRef<any>();
  const relateModalRef = useRef<any>({});

  //模型构建参数
  const [modelParams, setModelParams] = useState<any>({});

  //模型结果
  const [modelResult, setModelResult] = useState<any>({});

  const { modelId } = useModel('step', (model: any) => ({
    modelId: model.modelId,
  }));

  useEffect(() => {
    //模型构建参数
    getModelStructureParam();

    //模型结果-变量相关性/集合KS/年月KS
    getModelResult();
  }, [activeKey]);

  //入模变量
  const inputVariableRequest = async (payload: any) => {
    let params = {
      page: payload?.current,
      pageSize: payload?.pageSize,
      itmModelRegisCode: modelId,
      modelVersion: activeKey,
    };
    let res = await getInputVariable(params);
    return {
      data: res?.result?.tableData || [],
      total: res?.result?.totalSize || 0,
      current: payload?.current || 1,
      pageSize: payload?.pageSize || 10,
    };
  };

  //评分卡
  const scoreCardList = async (payload: any) => {
    let params = {
      page: payload?.current,
      pageSize: payload?.pageSize,
      itmModelRegisCode: modelId,
      modelVersion: activeKey,
    };
    let res = await scoreCardListReuqest(params);
    let resultData = togetherData(res?.result?.tableData);
    return {
      data: resultData || [],
      total: res?.result?.totalSize || 0,
      current: payload?.current || 1,
      pageSize: payload?.pageSize || 10,
    };
  };

  const getModelStructureParam = async () => {
    let params = {
      itmModelRegisCode: modelId,
      modelVersion: activeKey,
    };
    setLoading(true);
    let res = await getModelStructureParamRequest(params);
    if (res?.status?.code === successCode) {
      setLoading(false);
      setModelParams(res?.result);
    } else {
      setLoading(false);
      message.error(res?.status?.desc || '异常');
    }
  };

  const getModelResult = async () => {
    let params = {
      itmModelRegisCode: modelId,
      modelVersion: activeKey,
    };
    setLoading(true);
    let res = await getModelResultRequest(params);
    if (res?.status?.code === successCode) {
      setLoading(false);
      let resultData = res.result;
      setModelResult(resultData);
    } else {
      setLoading(false);
      message.error(res?.status?.desc || '异常');
    }
  };

  const togetherData = (data: any) => {
    let tempArr: any = [];
    data?.map((item: any, index: any) => {
      item?.scoreItemList?.map((el: any) => {
        tempArr.push({
          idx: index,
          id: el?.variable,
          variable: item?.variable,
          variableName: item?.variableName,
          boxGroup: el?.boxGroup,
          score: el?.score,
          trainBadRate: el?.trainBadRate,
          validBadRate: el?.validBadRate,
          trainRate: el?.trainRate,
          validRate: el?.validRate,
        });
      });
    });
    return changeData(tempArr, 'variable');
  };

  const openMax = () => {
    relateModalRef?.current?.open();
  };

  return (
    <div className={styles.comparePage}>
      <div className={styles.mouldTitile}>
        <b>模型构建参数</b>
      </div>
      <Descriptions title="LogisticRegression参数" bordered column={4}>
        <Descriptions.Item label="惩罚项">{modelParams?.penalty}</Descriptions.Item>
        <Descriptions.Item label="solver">{modelParams?.solver}</Descriptions.Item>
        <Descriptions.Item label="正则化系数">{modelParams?.lrc}</Descriptions.Item>
        <Descriptions.Item label="迭代次数">{modelParams?.lrMaxIter}</Descriptions.Item>
      </Descriptions>
      <Descriptions title="变量分箱" bordered column={4}>
        <Descriptions.Item label="分箱方式">{modelParams?.varBinningType}</Descriptions.Item>
        <Descriptions.Item label="箱数">{modelParams?.boxNum}</Descriptions.Item>
        <Descriptions.Item label="每箱最小样本占比">{modelParams?.minSampleRate}</Descriptions.Item>
        <Descriptions.Item label="空值单独分箱">{modelParams?.emptySeparate}</Descriptions.Item>
      </Descriptions>
      <Descriptions title="逐步回归" bordered column={4}>
        <Descriptions.Item label="estimator">{modelParams?.estimator}</Descriptions.Item>
        <Descriptions.Item label="方向">{modelParams?.direction}</Descriptions.Item>
        <Descriptions.Item label="评判标准">{modelParams?.criteria}</Descriptions.Item>
        <Descriptions.Item label="最大循环次数">{modelParams?.stepwiseMaxIter}</Descriptions.Item>
      </Descriptions>
      <Descriptions title="多重共线性检验" bordered column={4}>
        <Descriptions.Item label="VIF阈值设置" span={3}>
          {modelParams?.vifOperator}
          {modelParams?.vifThreshold}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="标准评分卡" bordered column={4}>
        <Descriptions.Item label="标准分">{modelParams?.baseScore}</Descriptions.Item>
        <Descriptions.Item label="Pdo">{modelParams?.pdo}</Descriptions.Item>
        <Descriptions.Item label="Base Odds">{modelParams?.baseOdds}</Descriptions.Item>
        <Descriptions.Item label="Rate">{modelParams?.rate}</Descriptions.Item>
        <Descriptions.Item label="评分分箱方式" span={3}>
          {modelParams?.scoreBinningType}
        </Descriptions.Item>
      </Descriptions>
      <div className={styles.tableBox}>
        <span className={styles.tableTitle}>模型结果</span>
        <InputVariableTable
          headerTitle="入模变量"
          rowKey={(record: any, index: any) => record?.id + index}
          actionRef={actionRef}
          // dataSource={modelResult?.inputVariableList}
          requestMethod={inputVariableRequest}
        />
      </div>
      <div className={classnames(styles.relateTable)}>
        <VarCodeRelateTable
          headerTitle="变量相关性"
          rowKey={(record: any) => record.id}
          toolBarRender={() => [
            <div
              key={'ZoomInOutlined'}
              onClick={openMax}
              style={{ color: 'rgb(24, 144, 255)', cursor: 'pointer' }}
            >
              <Space>
                <ZoomInOutlined />
                放大查看
              </Space>
            </div>,
          ]}
          // columns={columnsRelate}
          data={modelResult?.variableRelevanceData}
        />
      </div>
      <div className={classnames(styles.relateTable)}>
        <ScoreCardTable
          pageType="compareAndReport"
          headerTitle="评分卡-计算逻辑"
          rowKey={(record: any, index: any) => record?.id + index}
          toolBarRender={() => []}
          actionRef={actionRef}
          requestMethod={scoreCardList}
          // dataSource={modelResult?.scoreCardLogicList}
        />
      </div>
      <CompareAndReportCommonPage
        pageType="comparePage"
        modelResult={modelResult}
        activeKey={activeKey}
      />
      <RelateModal
        // columnsRelate={columnsRelate}
        data={modelResult?.variableRelevanceData}
        cref={relateModalRef}
      />
    </div>
  );
};
