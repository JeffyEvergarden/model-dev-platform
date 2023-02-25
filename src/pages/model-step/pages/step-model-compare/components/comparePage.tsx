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

  const { loading, setLoading, getModelStructureParamRequest, getModelResultRequest } =
    useComparePage();

  const actionRef = useRef<any>();
  const relateModalRef = useRef<any>({});

  //模型构建参数
  const [modelParams, setModelParams] = useState<any>({});

  //模型结果
  const [modelResult, setModelResult] = useState<any>({});

  const [pageInfo, setPageInfo] = useState<any>([]);

  //变量相关性
  const [dataSourceRelate, setDataSourceRelate] = useState<any>([]);
  const [columnsRelate, setColumnsRelate] = useState<any>([]);

  const { modelId } = useModel('step', (model: any) => ({
    modelId: model.modelId,
  }));

  useEffect(() => {
    //模型构建参数
    getModelStructureParam();

    //模型结果
    getModelResult();
  }, [activeKey]);

  const getModelStructureParam = async () => {
    let params = {
      itmModelRegisCode: '',
      modelVersionName: activeKey,
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
      itmModelRegisCode: '',
      modelVersionName: activeKey,
    };
    setLoading(true);
    let res = await getModelResultRequest(params);
    if (res?.status?.code === successCode) {
      setLoading(false);
      let resultData = res.result;
      if (resultData.scoreCardLogicList) {
        resultData.scoreCardLogicList = togetherData(resultData.scoreCardLogicList);
      }
      setModelResult(resultData);
    } else {
      setLoading(false);
      message.error(res?.status?.desc || '异常');
    }
  };

  const togetherData = (data: any) => {
    let tempArr: any = [];
    data?.map((item: any, index: any) => {
      item?.boxList?.map((el: any) => {
        tempArr.push({
          idx: index,
          id: el?.variable,
          variable: item?.variable,
          variableName: item?.variableName,
          boxGroup: el?.boxGroup,
          boxGroupScore: el?.boxGroupScore,
          trainBadRate: el?.trainBadRate,
          validBadRate: el?.validBadRate,
          trainGroupRate: el?.trainGroupRate,
          validGroupRate: el?.validGroupRate,
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
          rowKey={(record: any) => record?.name}
          actionRef={actionRef}
          pageInfo={pageInfo}
          dataSource={modelResult?.inputVariableList}
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
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          actionRef={actionRef}
          // request={async (params = {}) => {
          //   return scoreCardList(params);
          // }}
          dataSource={modelResult?.scoreCardLogicList}
        />
      </div>
      <CompareAndReportCommonPage pageType="comparePage" modelResult={modelResult} />
      <RelateModal
        // columnsRelate={columnsRelate}
        data={modelResult?.variableRelevanceData}
        cref={relateModalRef}
      />
    </div>
  );
};
