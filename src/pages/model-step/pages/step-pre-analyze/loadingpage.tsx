import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, DatePicker, Row, Col, Select, Space, Button } from 'antd';
import styles from './style.less';
import NextStepButton from '../../components/nextstep-button';
import CommonPage from '../../components/common-page';
import Condition from '@/components/Condition';
import { successCode } from './model';
import { useNextStep } from '../../config';
import { useModel } from 'umi';
import { getWaitResult } from '../step-select-sample/model/api';

// 首页
const TabThree: React.FC<any> = (props: any) => {
  const { back } = props;
  const fake = useRef<any>({});
  const { modelId } = useModel('step', (model: any) => ({
    modelId: model.modelId,
  }));

  const { nextStep } = useNextStep();

  const getloading = async () => {
    let res = await getWaitResult({ itmModelRegisCode: modelId });

    let data = res?.result || {};
    if (
      data?.currentStage == 4 &&
      data?.currentStageStatus == '1' &&
      data?.isCommittedPage == '1'
    ) {
      setTimeout(async () => {
        getloading();
      }, 10 * 1000);
    } else if (data?.currentStage == 4 && data?.currentStageStatus == '3') {
      back();
    } else {
      nextStep();
    }
  };

  useEffect(() => {
    fake.current.timeFn = setTimeout(async () => {
      getloading();
    }, 10 * 1000);
    return () => {
      fake.current.timeFn = null;
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
