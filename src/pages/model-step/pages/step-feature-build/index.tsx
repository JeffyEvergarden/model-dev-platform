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
      featureMetricsResult: lostRef?.current?.tableList,
      featureBinningResults: boxRef?.current?.tableRef?.current?.originTableList,
    };
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
