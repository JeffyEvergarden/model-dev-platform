import { Button, Divider, Space } from 'antd';
import React, { useEffect, useRef } from 'react';

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
  const { modelId, isHadReported, operate } = useModel('step', (model: any) => ({
    modelId: model.modelId,
    isHadReported: model.isHadReported,
    operate: model.operate,
  }));

  const { nextStep } = useNextStep();

  const _nextFlow = async () => {
    let reqData = {
      itmModelRegisCode: modelId,
      featureMetricsResult: '',
      featureBinningResults: '',
    };
    await nextProcess(reqData).then((res) => {
      if (res.status.code == successCode) {
        nextStep();
      }
    });
  };

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>
        <span>特征工程</span>
        <TitleStatus index={7}></TitleStatus>
      </div>

      <MissingValueFilling />
      <Divider></Divider>
      <VariableSubBox />
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
