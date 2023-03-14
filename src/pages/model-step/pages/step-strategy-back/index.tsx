import React, { useEffect, useRef } from 'react';
import styles from '../style.less';
import { useState } from 'react';
import Condition from '@/components/Condition';
import TabOne from './tab-one';
import TabTwo from './tab-two';
import TitleStatus from '../../components/title-status';
import { useModel } from 'umi';
import { getWaitResult } from '../step-select-sample/model/api';
import { reBack } from './model/api';
import { successCode, useStrategyBackModel, useStrategyBackUploadAwaitModel } from './model';
import TabThree from './tab-three';
import { formateStatus } from '../../config';

// 首页
const StepStrategyBack: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  const [tabType, setTabType] = useState<any>(1); // 导入数据类型 0、1  // 0 -> 是， 1 -> 否

  const [stepType, setStepType] = useState<any>(1); //  1、2  //  1-> 选择条件    2--> 导入进度

  const [selectedKeys, setSelectedKeys] = useState<any[]>([]);

  const {
    modelId,
    doneStep,
    curStep,
    setDoneStepStatus,
    setDoneStep,
    resetScroll,
    setResetScroll,
  } = useModel('step', (model: any) => ({
    modelId: model.modelId,
    doneStep: model.doneStep,
    curStep: model.curStep,
    setDoneStepStatus: model.setDoneStepStatus,
    setDoneStep: model.setDoneStep,
    resetScroll: model.resetScroll,
    setResetScroll: model.setResetScroll,
  }));

  // 过程id
  const [processId, setProcessId] = useState<any>('000');

  const { getStrategyTableList } = useStrategyBackModel();

  const onNext = (key: any) => {
    setResetScroll(resetScroll + 1);
    setStepType(2);
    setSelectedKeys(key);
  };

  const again = async () => {
    await reBack({ itmModelRegisCode: modelId }).then((res: any) => {
      if (res?.status?.code == successCode) {
        setDoneStepStatus(formateStatus(Number(1)));
        setDoneStep(3);
        setStepType(1);
        setResetScroll(resetScroll + 1);
      }
    });
  };

  const skip = async () => {
    setStepType(3);
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
    let res = await getWaitResult({ itmModelRegisCode: modelId });
    let data = res.result || {};
    let dStep = data.currentStage || 3;

    setDoneStep(dStep);
    if (3 < dStep) {
      getStrategyTableList({ itmModelRegisCode: modelId }).then((res) => {
        if (res.isSkipCurrentStage) {
          setStepType(1); //如果跳过后回来
        } else {
          setStepType(2);
        }
      });
    } else if (3 == dStep) {
      if (data.currentStageStatus == '2' || data.currentStageStatus == '3') {
        setStepType(2);
        setSelectedKeys(data?.backtrackProcessName?.split(',') || []);
      } else if (data?.currentStageStatus == '1' && data?.isCommittedPage == '1') {
        setStepType(2);
        setSelectedKeys(data?.backtrackProcessName?.split(',') || []);
      } else {
        setStepType(1);
      }
    }
  };

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>
        <span>策略回溯</span>
        <TitleStatus index={3}></TitleStatus>
      </div>

      {/* 步骤一 */}
      <Condition r-if={stepType === 1}>
        <TabOne onNext={onNext} skip={skip} />
      </Condition>

      {/* 步骤二 */}

      <Condition r-if={stepType === 2}>
        <TabTwo
          tabType={tabType}
          stepType={stepType}
          selectedKeys={selectedKeys}
          again={again}
        ></TabTwo>
      </Condition>

      <Condition r-if={stepType === 3}>
        <TabThree></TabThree>
      </Condition>
    </div>
  );
};

export default StepStrategyBack;
