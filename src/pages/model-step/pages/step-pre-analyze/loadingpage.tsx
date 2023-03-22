import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, DatePicker, Row, Col, Select, Space, Button } from 'antd';
import styles from './style.less';
import NextStepButton from '../../components/nextstep-button';
import CommonPage from '../../components/common-page';
import Condition from '@/components/Condition';
import { successCode } from './model';
import { formateStatus, useNextStep } from '../../config';
import { useModel } from 'umi';
import { getWaitResult } from '../step-select-sample/model/api';

// 首页
const TabThree: React.FC<any> = (props: any) => {
  const { back } = props;
  const fake = useRef<any>({});
  const { modelId, setDoneStepStatus, setDoneStep, doneStep } = useModel('step', (model: any) => ({
    modelId: model.modelId,
    setDoneStepStatus: model.setDoneStepStatus,
    setDoneStep: model.setDoneStep,
    doneStep: model.doneStep,
  }));

  const { nextStep } = useNextStep();

  const getloading = async () => {
    let res = await getWaitResult({ itmModelRegisCode: modelId });
    let data = res?.result || {};
    if (res?.status?.code == successCode) {
      if (data?.currentStage) {
        setDoneStep(data?.currentStage);
      }
      if (data?.currentStageStatus) {
        setDoneStepStatus(formateStatus(Number(data?.currentStageStatus)));
      }
      if (
        data?.currentStage == 4 &&
        data?.currentStageStatus == '1' &&
        data?.isCommittedPage == '1'
      ) {
      } else if (data?.currentStage == 4 && data?.currentStageStatus == '3') {
        clearTimeout(fake.current.timeFn);
        back();
      } else {
        clearTimeout(fake.current.timeFn);
        nextStep();
      }
    } else {
      clearTimeout(fake.current.timeFn);
      back();
    }
  };

  useEffect(() => {
    if (doneStep == 4) {
      setDoneStepStatus('process');
    }

    fake.current.timeFn = setInterval(async () => {
      getloading();
    }, 10 * 1000);
    return () => {
      clearTimeout(fake.current.timeFn);
    };
  }, []);

  return (
    <div>
      <CommonPage
        loadingContent={
          <>
            <div className={styles['title']}>正在处理中</div>
            <div className={styles['desc']}></div>
          </>
        }
        pageType={'loading'}
      />
    </div>
  );
};

export default TabThree;
