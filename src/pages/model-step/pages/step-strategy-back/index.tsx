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
import { successCode } from './model';

// 首页
const StepStrategyBack: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  const [tabType, setTabType] = useState<any>(1); // 导入数据类型 0、1  // 0 -> 是， 1 -> 否

  const [stepType, setStepType] = useState<any>(1); //  1、2  //  1-> 选择条件    2--> 导入进度

  const [selectedKeys, setSelectedKeys] = useState<any[]>([]);

  const { modelId, doneStep } = useModel('step', (model: any) => ({
    modelId: model.modelId,
    doneStep: model.doneStep,
  }));

  // 过程id
  const [processId, setProcessId] = useState<any>('000');

  const onNext = (key: any) => {
    setStepType(2);
    setSelectedKeys(key);
  };

  const again = async () => {
    await reBack({ itmModelRegisCode: modelId }).then((res: any) => {
      if (res?.status?.code == successCode) {
        setStepType(1);
      }
    });
  };

  useEffect(() => {
    {
      /*进入页面调用状态接口判断该步骤状态
        页面是否已提交，仅仅适用于有loading页面的阶段。
        当前阶段状态：0：未开始 1：进行中 2：已完成 3：处理失败
        因部分阶段有loading页面，所以需要给标识，区分是进入loading页面还是参数选择页面的。
        只有（当前阶段状态-进行中+isCommittedPage=true）才会进入loading页面。

        当前阶段状态 1 &isCommittedPage=true --进入loading页面 loading 状态
        当前阶段状态 2 --进入--进入loading页面 完成 状态
        当前阶段状态 0 3 --进入--进入loading页面 处理失败 状态
  */
    }
    getCurrentStage();
  }, []);

  const getCurrentStage = async () => {
    let res = await getWaitResult({ itmModelRegisCode: modelId });
    let data = res.result || {};
    if (data.currentStageStatus == '2' || data.currentStageStatus == '3') {
      setStepType(2);
      setSelectedKeys(data?.backtrackProcessName?.split(',') || []);
    } else if (data?.currentStageStatus == '1' && data?.isCommittedPage == '1') {
      setStepType(2);
      setSelectedKeys(data?.backtrackProcessName?.split(',') || []);
    } else {
      setStepType(1);
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
        <TabOne onNext={onNext} />
      </Condition>

      {/* 步骤二 */}

      <Condition r-if={stepType === 2}>
        <TabTwo
          tabType={tabType}
          processId={processId}
          selectedKeys={selectedKeys}
          again={again}
        ></TabTwo>
      </Condition>
    </div>
  );
};

export default StepStrategyBack;
