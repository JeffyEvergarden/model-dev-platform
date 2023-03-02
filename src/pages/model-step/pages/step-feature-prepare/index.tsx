import React, { useEffect, useRef, useState } from 'react';
import styles from '../style.less';
import Condition from '@/components/Condition';
import SelectModal from './tab-one';
import TabTwo from './tab-two';
import TitleStatus from '../../components/title-status';
import { getWaitResult } from '../step-select-sample/model/api';
import { useModel } from 'umi';
import { resetPrepare } from './model/api';
import { successCode } from '../step-strategy-back/model';

// 首页
const StepFeaturePrepare: React.FC<any> = (props: any) => {
  const [tabType, setTabType] = useState<any>(1); // 导入数据类型 0、1  // 0 -> 是， 1 -> 否

  const [stepType, setStepType] = useState<any>(1); //  1、2  //  1-> 选择条件    2--> 导入进度
  const { modelId, doneStep, curStep, setDoneStepStatus } = useModel('step', (model: any) => ({
    modelId: model.modelId,
    doneStep: model.doneStep,
    curStep: model.curStep,
    setDoneStepStatus: model.setDoneStepStatus,
  }));
  // 过程id
  const [processId, setProcessId] = useState<any>('000');

  const [selectList, setSelectList] = useState<any>([]);

  const onNext = (list: any) => {
    setSelectList(list || []);
    setStepType(2);
  };

  const reset = async () => {
    await resetPrepare({ itmModelRegisCode: modelId }).then((res) => {
      if (res?.status?.code == successCode) {
        setDoneStepStatus('loading');
        setStepType(1);
      }
    });
  };

  useEffect(() => {
    {
      /*
      1、curStep<doneStep:直接进入状态页面
      2、curStep==doneStep ：调用getCurrentStage 如下
      ①currentStageStatus==1且isCommittedPage == '1'进入状态页面，
      ②currentStageStatus == '2'||currentStageStatus == '3'(已完成和失败)进入状态页面
  */
    }

    getCurrentStage();
  }, []);

  const getCurrentStage = async () => {
    console.log(curStep, doneStep);

    if (6 < doneStep) {
      setStepType(2);
    } else if (6 == doneStep) {
      let res = await getWaitResult({ itmModelRegisCode: modelId });
      let data = res.result || {};
      if (data.currentStageStatus == '2' || data.currentStageStatus == '3') {
        setStepType(2);
      } else if (data?.currentStageStatus == '1' && data?.isCommittedPage == '1') {
        setStepType(2);
      } else {
        setStepType(1);
      }
    }
  };

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-box']}>
        <div className={styles['step-title']}>
          <span>特征准备</span>
          <TitleStatus index={6}></TitleStatus>
        </div>
      </div>

      <Condition r-if={stepType === 1}>
        <SelectModal onNext={onNext}></SelectModal>
      </Condition>

      <Condition r-if={stepType === 2}>
        <TabTwo
          tabType={tabType}
          processId={processId}
          selectList={selectList}
          reset={reset}
        ></TabTwo>
      </Condition>
    </div>
  );
};

export default StepFeaturePrepare;
