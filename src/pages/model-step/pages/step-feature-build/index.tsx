import { Button, Divider, message, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import styles from '../style.less';
import MissingValueFilling from './missing-value-filling';
import VariableSubBox from './variable-sub-box';
import TitleStatus from '../../components/title-status';
import Condition from '@/components/Condition';
import NextStepButton from '../../components/nextstep-button';
import { useModel } from 'umi';
import { nextProcess } from './model/api';
import { successCode } from '../step-model-compare/model';
import { useNextStep } from '../../config';
import { getWaitResult } from '../step-select-sample/model/api';
import { getModelStepDetailApi } from '../../model/api';

// 首页
const StepFeaturePrepare: React.FC<any> = (props: any) => {
  const lostRef = useRef<any>();
  const boxRef = useRef<any>();

  const [loading, setLoading] = useState<any>(false);

  const { modelId, isHadReported, operate } = useModel('step', (model: any) => ({
    modelId: model.modelId,
    isHadReported: model.isHadReported,
    operate: model.operate,
  }));

  const { nextLoading, nextStep } = useNextStep();

  const _nextFlow = async () => {
    console.log(boxRef);

    if (!lostRef?.current?.tableList?.length) {
      message.warning('请查询缺失值填充');
      return;
    }
    if (!boxRef?.current?.tableRef?.current?.originTableList?.length) {
      message.warning('请查询变量分箱结果');
      return;
    }
    let reqData = {
      itmModelRegisCode: modelId,
      featureMetricsRequest: lostRef?.current?.searchData, //缺失值条件
      featureMetricsResult: lostRef?.current?.tableInfo, //缺失值table
      featureSelectRequest: boxRef?.current?.featureSelectRequest(), //分箱 选择变量条件
      featureBinningRequest: {
        binningType: boxRef?.current?.tableRef?.current?.binningType,
        binningNumber: boxRef?.current?.tableRef?.current?.binningNum,
        selectedVariables: boxRef?.current?.varRef?.current?.selectList?.join(','), //分箱勾选
      },
      featureBinningResults: boxRef?.current?.tableRef?.current?.originTableList, //分箱table
      variables: boxRef?.current?.tableRef?.current?.selectList?.join(','), //table选中值
    };
    console.log(reqData);
    setLoading(true);
    await nextProcess(reqData).then((res) => {
      setLoading(false);
      if (res?.status?.code == successCode) {
        nextStep();
      } else {
        message.error(res?.status?.desc || '');
      }
    });
  };

  useEffect(() => {
    getCurrentStage();
  }, []);

  const getCurrentStage = async () => {
    let res = await getWaitResult({ itmModelRegisCode: modelId });
    if (res?.status?.code == successCode) {
      let data = res?.result || {};
      if (data?.currentStage > 7) {
        getSubmitValue(); //回显
      }
    }
  };

  const getSubmitValue = async () => {
    //回显
    await getModelStepDetailApi({ stage: '7', itmModelRegisCode: modelId }).then((res) => {
      if (res?.status?.code == successCode) {
        let data = res?.result || {};
        lostRef?.current?.backSetForm(data?.featureMetricsRequest); //回显缺失条件
        lostRef?.current?.setLostTable(data?.featureMetricsResult); //回显缺失表格
        boxRef?.current?.backSetForm(data); //回显变量条件
        boxRef?.current?.tableRef?.current?.backSetForm(data); //分箱表格回显
      } else {
        message.error(res?.status?.desc);
      }
    });
  };

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>
        <span>特征工程</span>
        <TitleStatus index={7}></TitleStatus>
      </div>

      <MissingValueFilling cref={lostRef} />
      <Divider></Divider>
      <VariableSubBox cref={boxRef} />

      <Condition r-if={operate == 'EDIT' && !isHadReported}>
        <NextStepButton
          btnNode={
            <Space>
              <Button
                onClick={() => {
                  _nextFlow();
                }}
                size="large"
                type="primary"
                loading={loading || nextLoading}
              >
                下一流程
              </Button>
            </Space>
          }
        />
      </Condition>
    </div>
  );
};

export default StepFeaturePrepare;
